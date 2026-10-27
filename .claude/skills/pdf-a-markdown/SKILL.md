---
name: pdf-a-markdown
description: Convierte un PDF a markdown UNA vez y lo archiva en .raw/ para no gastar uso leyéndolo como imágenes. Úsala siempre que haya que trabajar con un PDF.
---

# PDF → markdown (ahorro de uso)

Leer un PDF directo se cobra como imágenes y es carísimo (y está bloqueado en
`.claude/settings.json`). Haz esto en su lugar:

1. Nombre destino: `.raw/YYYY-MM-DD-<slug>.md` (si ya existe, no lo repitas: úsalo).
2. Convierte, en este orden de preferencia:
   - `markitdown "<ruta.pdf>" > ".raw/<destino>.md"`
   - `pdftotext -layout "<ruta.pdf>" ".raw/<destino>.md"`
   - `pandoc` si lo anterior no existe
3. Si el resultado sale vacío, el PDF es escaneado: díselo al usuario y pregunta
   antes de usar OCR o de leerlo como imagen (es caro).
4. Añade al principio del `.md` un frontmatter con `source:` (ruta del PDF) y `created:`.
5. Trabaja SOLO sobre el `.md`, leyendo por tramos (offset/limit) si es largo.
6. Ofrece ingerirlo con `wiki-ingest` para que la próxima vez se responda desde `wiki/`.
