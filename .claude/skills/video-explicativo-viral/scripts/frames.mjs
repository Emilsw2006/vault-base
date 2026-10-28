// Medición por fotogramas (sin IA): node frames.mjs <dirMp4> <dirSalida>
import { readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const [dir, out] = process.argv.slice(2);
mkdirSync(join(out, 'sheets'), { recursive: true });
const run = (args) => spawnSync('ffmpeg', ['-hide_banner', '-nostats', ...args], { encoding: 'utf8', maxBuffer: 1 << 28 });
const num = (s) => Number(s);
const results = [];

for (const f of readdirSync(dir).filter((x) => x.endsWith('.mp4'))) {
  const id = f.replace('.mp4', '');
  const p = join(dir, f);
  const probe = spawnSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height,r_frame_rate:format=duration', '-of', 'json', p], { encoding: 'utf8' });
  const pj = JSON.parse(probe.stdout);
  const dur = num(pj.format.duration);
  // 1) señal por fotograma a 4 fps
  const r = run(['-i', p, '-an', '-vf', 'fps=4,scale=108:-2,signalstats,metadata=print:file=-', '-f', 'null', '-']);
  const rows = []; let cur = {};
  for (const line of r.stdout.split('\n')) {
    const m = line.match(/lavfi\.signalstats\.(YAVG|YDIF|SATAVG|HUEMED)=([\d.]+)/);
    if (m) { cur[m[1]] = num(m[2]); if (m[1] === 'HUEMED') { rows.push(cur); cur = {}; } }
  }
  const mean = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);
  const ydif = rows.map((x) => x.YDIF ?? 0);
  const yavg = rows.map((x) => x.YAVG ?? 0);
  const sat = rows.map((x) => x.SATAVG ?? 0);
  const hardCuts = ydif.filter((v) => v > 30).length; // saltos bruscos de imagen
  const bigChanges = ydif.filter((v) => v > 12).length; // transiciones/movimientos fuertes
  // actividad por segundo (media de YDIF en bloques de 4 fotogramas)
  const perSec = []; for (let i = 0; i < ydif.length; i += 4) perSec.push(+mean(ydif.slice(i, i + 4)).toFixed(1));
  // 2) audio
  const lo = run(['-i', p, '-vn', '-af', 'ebur128=peak=true', '-f', 'null', '-']).stderr;
  const lufs = lo.match(/I:\s+(-?[\d.]+) LUFS/g)?.pop()?.match(/-?[\d.]+/)?.[0];
  const sil = run(['-i', p, '-vn', '-af', 'silencedetect=n=-35dB:d=0.4', '-f', 'null', '-']).stderr;
  const silences = (sil.match(/silence_start/g) || []).length;
  // 3) hoja de contactos: 1 fotograma cada 2 s, 8 columnas
  const sheet = join(out, 'sheets', id + '.jpg');
  if (!existsSync(sheet)) run(['-y', '-i', p, '-an', '-vf', 'fps=0.5,scale=135:-2,tile=8x6:padding=2:margin=2', '-frames:v', '1', '-q:v', '4', sheet]);
  results.push({
    id, durSec: +dur.toFixed(1), res: `${pj.streams[0].width}x${pj.streams[0].height}`,
    brightness: +mean(yavg).toFixed(0), darkShare: +(yavg.filter((v) => v < 70).length / yavg.length).toFixed(2),
    saturation: +mean(sat).toFixed(0), motionMean: +mean(ydif).toFixed(1),
    hardCuts, bigChanges, hardCutEverySec: hardCuts ? +(dur / hardCuts).toFixed(1) : null,
    lufs: lufs ? num(lufs) : null, silencePauses: silences, activityPerSec: perSec,
  });
  console.log(id, dur.toFixed(0) + 's', 'cortes', hardCuts, 'mov', mean(ydif).toFixed(1), 'oscuro', (yavg.filter((v) => v < 70).length / yavg.length).toFixed(2));
}
writeFileSync(join(out, 'frames.json'), JSON.stringify(results, null, 1));
