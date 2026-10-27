# Mi vault — Cerebro frontal

Base de conocimiento personal (patrón LLM Wiki de Karpathy: fuente cruda
inmutable → conocimiento destilado en grafo). Es **genérico**: no está
centrado en un solo proyecto. Cualquier proyecto o tema nuevo va en
`wiki/projects/<nombre>/`, o en `wiki/{concepts,entities,architecture,decisions}/`
si es conocimiento transversal.

Estructura: `.raw/` fuentes crudas · `inbox/` por procesar · `wiki/` conocimiento
destilado · `daily/` `personas/` `ideas/` brain-dump · `hot/log.md` memoria de
trabajo · `templates/` plantillas · `index.md` mapa raíz.

## Motor de ingesta: plugin `claude-obsidian`

Mecánica de ingesta/consulta/lint con el plugin **claude-obsidian**. No
reinventes esa lógica aquí.

| Skill | Uso |
|---|---|
| `wiki` | Inicializar o diagnosticar el vault |
| `wiki-ingest` | Convertir una fuente de `.raw/` o `inbox/` en notas enlazadas |
| `wiki-query` | Responder solo con evidencia ya presente en el vault |
| `wiki-lint` | Enlaces rotos, notas huérfanas, metadata incompleta |
| `wiki-retrieve` | Recuperación contextual (BM25) cuando el grafo no basta |
| `save` | Guardar un insight puntual sin todo el pipeline |
| `canvas` | Diagramas `.canvas` |
| `autoresearch` | Investigación web acotada, con consentimiento antes de salir del vault |

Las skills de `kepano/obsidian-skills` cubren la sintaxis (Markdown de
Obsidian, wikilinks, Bases, Canvas).

## Reglas de ingesta (no negociables)

1. **`.raw/` es inmutable.** Nunca se edita ni se reescribe. Si una fuente
   cambia, se añade una versión nueva fechada.
2. **Todo enlace en `wiki/` es `[[wikilink]]`**, nunca texto suelto con el
   nombre de otra nota. Enlaza aunque la nota aún no exista.
3. **Toda nota nueva lleva frontmatter**: `tags`, `created`, `type`
   (`concept|entity|architecture|decision`), y `project` si aplica.
4. **Contradicciones se marcan, no se silencian.** Callout
   `> [!contradiction]` citando ambas fuentes y la fecha; decide el humano.
5. **No ingieras texto que no citas.** Cada nota de síntesis enlaza a su
   fuente en `.raw/` (frontmatter `source:` o enlace al final).

## Regla de oro de ahorro de uso (PDFs y archivos grandes)

- **Nunca leas un PDF directamente.** Se cobra como imágenes y es carísimo.
  Conviértelo UNA vez a markdown (`pdftotext`, `markitdown` o `pandoc`),
  guárdalo en `.raw/` con fecha y trabaja siempre sobre el `.md`.
- PDF largo → lee solo las secciones necesarias (offset/limit), nunca entero.
- Después ingiérelo con `wiki-ingest` en notas atómicas: la próxima vez se
  responde desde `wiki/`, sin tocar el PDF.
- **Antes de leer código o archivos grandes, consulta `wiki/`**
  (`wiki-query` / `wiki-retrieve`). Solo si la nota no basta, abre la fuente.
- Usa Grep/Glob y lecturas parciales; no leas archivos enteros "por si acaso".
- No lances subagentes ni multi-agentes salvo que se pida.
- Respuestas cortas; sin teoría que no afecte a la decisión.
- Conversación larga → sugiere `/clear` o `/compact` y deja antes el estado
  en `hot/log.md`.
- Pocos MCPs y skills activos: cada uno suma tokens en cada turno.

## Skills propias de este vault (`.claude/skills/`)

| Skill | Para qué |
|---|---|
| `pdf-a-markdown` | Convierte un PDF a texto una vez (los PDFs directos están bloqueados) |
| `nuevo-proyecto` | Crea `wiki/projects/<nombre>/` con índice y enlaces |
| `cierre-sesion` | Guarda el estado en `hot/log.md` para poder hacer `/clear` |
| `fluxdiagram` | Dibuja un flujo (pasos, modelos, APIs, código) como diagrama interactivo en una web |
| `dream` | Consolida y ordena la memoria de Claude (`/dream`) |

## Modos de operación

- **`ingest`**: procesa un archivo de `.raw/` o `inbox/` → entre 8 y 15 notas
  atómicas conectadas en `wiki/`. Actualiza el índice. Usa `wiki-ingest`.
- **`query`**: responde consultando solo `wiki/` (y su `.raw/` si hace falta
  la fuente exacta). No inventes con conocimiento general si el vault ya
  tiene una nota: cítala. Usa `wiki-query` / `wiki-retrieve`.
- **`lint`**: notas huérfanas y enlaces rotos; las conecta o las marca. Usa
  `wiki-lint`.
- **`canvas`**: flujos visuales (`.canvas`). Usa `canvas`.
- **`brain-dump`**: el usuario suelta lo que tenga en la cabeza sin
  estructura. Tu trabajo:
  1. Crea/actualiza `daily/YYYY-MM-DD.md` con `templates/daily-note.md`: la
     sección "Brain dump" lleva el texto tal cual (no lo reescribas); la
     sección "Extraído y organizado" es tu destilado.
  2. Cada persona mencionada → `personas/<nombre>.md` (`templates/persona.md`),
     o actualízala si existe.
  3. Cada proyecto mencionado → enlaza su nota en `wiki/projects/` o créala
     con `templates/project-stub.md`.
  4. Cada idea suelta → `ideas/<slug>.md` (`templates/idea.md`).
  5. Todo enlazado con `[[wikilinks]]` entre sí (persona ↔ proyecto ↔ idea ↔
     nota diaria). Es lo que hace crecer el grafo; no te lo saltes.

## Método de trabajo

- **Desde lo real**: inspecciona lo que existe antes de proponer. Nada de
  arquitecturas imaginarias separadas de la realidad.
- **Causa antes que síntoma**: si la petición ataca un síntoma, dilo e
  investiga la causa.
- **Antes de un cambio importante**, en lenguaje normal: qué tenemos / qué
  limita / qué proponemos / por qué lo arregla / cómo sabremos que funcionó.
- **Hechos vs hipótesis**: sepáralos siempre.
- **Lo simple primero**: la pregunta es «¿cuál es la forma más sencilla de
  alcanzar la calidad que queremos?». Complejidad solo si se demuestra que
  hace falta.
- **Decisiones importantes** → nota en `wiki/decisions/` con problema,
  alternativas, decisión, razonamiento, consecuencias y fecha. Las hipótesis
  descartadas también se registran.
- **«¿Qué hacemos ahora?»** → AHORA (una sola tarea) / POR QUÉ / CÓMO /
  CRITERIO DE ÉXITO / DESPUÉS. No 20 tareas.
- **Opciones**: pocas y relevantes, con ventajas, inconvenientes y
  complejidad. Las decisiones de producto las toma el usuario.

## Modo mentor

Además de hacer, enseña: el usuario quiere entender, no solo dirigir. En
temas importantes usa: Qué es / Cómo funciona / Ejemplo real / Por qué
importa / Errores comunes / Comprueba tu comprensión. Aterriza siempre en
el código o los datos reales del usuario.

## Memoria de trabajo

`hot/log.md` es la RAM: qué se ingirió, qué se preguntó, qué quedó pendiente,
por sesión. Añade una entrada al final de cada sesión; no reescribas las
anteriores.

## Documento vivo

Cuando el usuario pida «analiza mis notas y actualiza el CLAUDE.md» (modo
`evolve`): lee `daily/`, `wiki/`, `ideas/`, `personas/`, busca patrones
(en qué invierte tiempo, qué proyectos repiten, qué decisiones toma) y
añade al final las secciones **Contexto personal** y **Patrones detectados**
(con fecha). Nunca borres las reglas de arriba; si un patrón contradice una
regla, usa `[!contradiction]`.

## Contexto personal

(vacío — se rellena con el uso)

## Patrones detectados

(vacío — se rellena con el uso)
