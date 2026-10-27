// Uso: node build.mjs <flujos.json> <salida.html>
// Genera <salida.html> (fragmento para publicar como Artifact) y <salida>.standalone.html (se abre con doble clic).
import fs from 'node:fs';

const [, , input, output] = process.argv;
if (!input || !output) {
  console.error('Uso: node build.mjs <flujos.json> <salida.html>');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(input, 'utf8'));
if (!Array.isArray(data.flows) || !data.flows.length) throw new Error('flujos.json necesita "flows": [ ... ]');

// Comprobaciones que evitan un diagrama roto en silencio.
for (const f of data.flows) {
  const ids = new Set(f.nodes.map((n) => n.id));
  if (ids.size !== f.nodes.length) throw new Error(`${f.id}: ids de nodo repetidos`);
  for (const e of f.edges) {
    if (!ids.has(e.from) || !ids.has(e.to)) throw new Error(`${f.id}: arista con nodo que no existe (${e.from} -> ${e.to})`);
  }
  const cells = new Set();
  for (const n of f.nodes) {
    const key = `${n.col},${n.row}`;
    if (cells.has(key)) throw new Error(`${f.id}: dos nodos en la misma celda (${key})`);
    cells.add(key);
  }
}

const template = fs.readFileSync(new URL('./template.html', import.meta.url), 'utf8');
const escHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const json = JSON.stringify(data).replace(/</g, '\\u003c');
const fragment = template.replace('__TITLE__', () => escHtml(data.title || 'Flujos')).replace('__DATA__', () => json);

fs.writeFileSync(output, fragment);
const standalone = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{color-scheme:light}</style>${fragment}</html>`;
fs.writeFileSync(output.replace(/\.html$/, '') + '.standalone.html', standalone);
console.log(`OK · ${data.flows.length} flujo(s) · ${output}`);
