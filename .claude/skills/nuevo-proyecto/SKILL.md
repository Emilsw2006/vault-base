---
name: nuevo-proyecto
description: Crea la estructura de un proyecto nuevo en wiki/projects/<nombre>/ con su índice, decisiones y enlaces. Úsala cuando el usuario empiece o mencione un proyecto que aún no tiene nota.
---

# Nuevo proyecto

1. Pregunta solo lo imprescindible: nombre, qué es en una frase, estado actual.
2. Copia `wiki/projects/_plantilla-proyecto/` a `wiki/projects/<slug>/`.
3. Rellena `index.md` con lo que el usuario dijo (no inventes nada).
4. Enlaza el proyecto con `[[wikilinks]]` desde `wiki/projects/index.md` y desde
   la nota diaria de hoy si existe.
5. Añade el proyecto a `index.md` raíz, sección Proyectos.
6. Apunta una línea en `hot/log.md`.
