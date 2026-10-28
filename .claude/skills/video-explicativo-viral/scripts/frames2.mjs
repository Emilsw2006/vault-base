// Color real + ritmo fino (8 fps) por reel. node frames2.mjs <mp4s> <salida.json>
import { readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
const [dir, outFile] = process.argv.slice(2);
const res = [];
const hex = (r, g, b) => '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
for (const f of readdirSync(dir).filter((x) => x.endsWith('.mp4'))) {
  const id = f.replace('.mp4', '');
  // 1) color: 2 fotogramas/s, 36x64 rgb
  const W = 36, H = 64;
  const raw = spawnSync('ffmpeg', ['-v', 'error', '-i', join(dir, f), '-an', '-vf', `fps=2,scale=${W}:${H}`, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], { maxBuffer: 1 << 29 }).stdout;
  const frameBytes = W * H * 3; const n = Math.floor(raw.length / frameBytes);
  const hist = new Map(); let total = 0, textLike = 0;
  for (let k = 0; k < n; k++) {
    for (let p = 0; p < W * H; p++) {
      const o = k * frameBytes + p * 3; const r = raw[o], g = raw[o + 1], b = raw[o + 2];
      const key = ((r >> 5) << 6) | ((g >> 5) << 3) | (b >> 5); // 8 niveles por canal
      const e = hist.get(key) ?? { c: 0, r: 0, g: 0, b: 0 }; e.c++; e.r += r; e.g += g; e.b += b; hist.set(key, e); total++;
    }
  }
  const cols = [...hist.values()].map((e) => ({ share: e.c / total, r: Math.round(e.r / e.c), g: Math.round(e.g / e.c), b: Math.round(e.b / e.c) }));
  cols.sort((a, b) => b.share - a.share);
  const sat = (c) => { const mx = Math.max(c.r, c.g, c.b), mn = Math.min(c.r, c.g, c.b); return mx ? (mx - mn) / mx : 0; };
  const bg = cols[0];
  const accents = cols.filter((c) => sat(c) > 0.45 && Math.max(c.r, c.g, c.b) > 110).slice(0, 4).map((c) => ({ hex: hex(c.r, c.g, c.b), share: +c.share.toFixed(3) }));
  const whiteShare = cols.filter((c) => Math.min(c.r, c.g, c.b) > 200).reduce((s, c) => s + c.share, 0);
  // 2) ritmo fino: YDIF a 8 fps
  const r2 = spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', join(dir, f), '-an', '-vf', 'fps=8,scale=108:-2,signalstats,metadata=print:file=-', '-f', 'null', '-'], { encoding: 'utf8', maxBuffer: 1 << 28 });
  const ydif = []; for (const m of r2.stdout.matchAll(/lavfi\.signalstats\.YDIF=([\d.]+)/g)) ydif.push(+m[1]);
  res.push({ id, bg: hex(bg.r, bg.g, bg.b), bgShare: +bg.share.toFixed(2), accents, whiteShare: +whiteShare.toFixed(3), ydif8: ydif.map((v) => +v.toFixed(1)) });
  console.log(id, hex(bg.r, bg.g, bg.b), accents.map((a) => a.hex).join(' '));
}
writeFileSync(outFile, JSON.stringify(res));
