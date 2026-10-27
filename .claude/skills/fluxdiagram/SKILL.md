---
name: fluxdiagram
description: Dibuja un flujo (cómo viaja un dato por pasos, modelos, APIs y código) como diagrama interactivo tipo n8n, en blanco y negro, y lo abre en una web. Úsala cuando el usuario diga «fluxdiagram», «hazme un fluxdiagram», «dibújame el flujo de X», «diagrama de flujo», «cómo va X de principio a fin» o pida ver una arquitectura o un pipeline como diagrama.
---

# fluxdiagram

Visor de flujos para el creador (no programa): cada paso es un nodo con qué recibe, qué hace y qué devuelve. Se pueden tener varios flujos en pestañas (por ejemplo «lo nuestro» y «lo de la competencia»), recorrerlos con las flechas, buscar y filtrar por fase.

## Regla que manda sobre todo lo demás

**El diagrama se dibuja desde el sistema real, no desde la memoria.** Antes de escribir un solo nodo, lee el código (Grep/Read) del recorrido que te piden. Cada nodo lleva en `where` la ruta real del archivo. Lo que no hayas verificado se marca `"status": "hyp"`; lo que existe pero está apagado, `"off"`; un fallo medido, `"fail"`; un riesgo conocido, `"risk"`. No pongas costes ni modelos que no hayas leído.

## Pasos

1. **Averigua el flujo.** Sigue el dato desde que entra hasta que sale: qué llama a qué, qué modelo, qué devuelve. Si el usuario habla de una app de terceros, solo describe lo que puedas observar (archivos instalados, trazas, documentación pública) y márcalo como tal.
2. **Escribe el JSON** (esquema abajo). Parte de `examples/ejemplo-pedido.json` para el tono y el nivel de detalle.
3. **Construye:** `node ~/.claude/skills/fluxdiagram/build.mjs flujos.json salida.html`. Genera `salida.html` (para publicar como Artifact) y `salida.standalone.html` (se abre con doble clic). El build falla si hay ids repetidos, aristas a nodos que no existen o dos nodos en la misma celda.
4. **Ábrelo.** Publica `salida.html` con la herramienta Artifact (icono `diagram`) y da el enlace. Antes de publicar, carga la skill `artifact-design`: el visor ya sigue sus reglas, no lo rediseñes. Si el usuario quiere el archivo, dale la ruta del `.standalone.html`.
5. **Responde en pocas líneas:** el enlace, qué muestra y qué marcaste como hipótesis. No repitas el contenido del diagrama en el chat.

## Esquema del JSON

```json
{
  "title": "Nombre del documento (2-4 palabras)",
  "phases": ["Entrada", "Proceso", "Salida"],
  "flows": [{
    "id": "slug-ascii", "tab": "Texto de la pestaña",
    "title": "Título del flujo", "summary": "Una o dos frases.",
    "known": ["Lo que se ha verificado"], "unknown": ["Lo que no se sabe"],
    "nodes": [{
      "id": "x", "col": 1, "row": 0,
      "kind": "user | code | ai | store | ext",
      "icon": "ver lista", "status": "ok | hyp | off | risk | fail",
      "tag": "texto del sello en status fail",
      "phase": "una de phases",
      "title": "máx. ~26 caracteres", "sub": "máx. 2 líneas cortas",
      "model": "", "cost": "", "where": "ruta/archivo.ts",
      "in": "Qué recibe", "does": "Qué hace", "out": "Qué devuelve",
      "example": "texto o JSON recortado", "exampleNote": "forma real, valores de ejemplo",
      "note": "Lo que hay que saber: riesgos, mediciones, dudas",
      "detail": "Explicación larga para la ventana ampliada. Párrafos separados por línea en blanco; «- » = viñeta; «## » = subtítulo; «> » = cita literal.",
      "sources": ["archivo o URL de donde sale cada afirmación"]
    }],
    "edges": [{ "from": "x", "to": "y", "label": "≤ 20 caracteres", "dashed": false }]
  }]
}
```

- **Iconos:** user, instagram, download, upload, queue, wave, film, pause, db, api, gemini, claude, brain, list, sliders, eye, ruler, doc, play, warn, code, compare, check, chat. Son glifos genéricos dibujados en el visor, no logotipos oficiales. Para añadir uno, edita `ICONS` en `template.html`.
- **kind:** `ai` = un modelo decide (nodo con icono invertido y sello IA). `code` = determinista. `user` = una persona. `store` = datos guardados. `ext` = servicio de un tercero.
- **phase:** fases del flujo que elijas tú en `phases` (por ejemplo Entrada → Proceso → Salida). Sirven para filtrar y ubicar dónde falla algo.

## Cómo colocar los nodos

- Es un flujo de arriba abajo: `row` es la etapa, `col` la rama en paralelo (0, 1, 2; admite decimales).
- Pasos únicos en `col` 1; cuando algo se abre en paralelo, `col` 0, 1 y 2 en la misma fila, y se vuelven a juntar en la fila siguiente.
- La columna central es la espina. Un bucle de vuelta (de un nodo posterior a uno anterior) sale por la derecha: deja libre esa zona y pon el nodo del bucle en la columna de la derecha de la espina, nunca en una columna con nodos entre medias.
- Un nodo por cosa. Si el título necesita «y», son dos nodos.
- Las etiquetas de las flechas dicen qué dato viaja («segundos de corte», «asset_id»), no verbos genéricos.
- Hasta ~25 nodos por flujo se lee bien; más, divídelo en dos pestañas.

## Ampliar una caja y dejar feedback (añadido 27/10)

- **Ampliar ⤢** (botón en el panel de cada paso): abre una ventana grande con «Dónde encaja» (de qué paso viene → este → a cuál va, con la etiqueta del dato que viaja), recibe / hace / devuelve en tres tarjetas, ejemplo, nota y ficha. Por eso conviene rellenar bien `in`, `does`, `out` y las etiquetas de las aristas, y escribir `detail` (explicación larga con párrafos, viñetas y citas) y `sources` en los pasos importantes: la ventana muestra todo.
- **Tu feedback**: cada paso tiene su caja de comentarios (en el panel y en la ventana ampliada). Las cajas con comentarios llevan un sello «n ✎». El botón **Feedback** de la barra abre todos los comentarios, deja uno general y **Copiar todo para pasárselo a Claude** genera un texto agrupado por flujo y paso (con la ruta `where`) para pegarlo en el chat.
- Los comentarios se guardan en el navegador de quien los escribe (`localStorage`, clave `fluxdiagram:<título>`): no los ve nadie más ni llegan solos a Claude. Si hace falta feedback compartido que Claude pueda leer, carga la skill `artifact-capabilities` y cambia `getCm`/`setCm` de `template.html` por la capacidad de base de datos del artifact.
- Probado el 27/10 con Playwright (Chrome headless): abrir, ampliar, comentar, copiar, recargar y vista móvil, sin errores de consola.

## Qué hace el visor

Arrastrar para mover, Ctrl + rueda para zoom, «Todo» para ver el flujo entero. Clic en un nodo: panel con recibe / hace / devuelve / ejemplo / modelo / coste / archivo / de dónde viene y a dónde va. Flechas del teclado para recorrer los pasos, Esc para volver al resumen, `f` para encajar al ancho. Buscador y filtro por fase atenúan lo que no coincide. Tema claro y oscuro.
