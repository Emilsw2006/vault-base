---
type: concept
tags: [reels, guiones, transcripcion, scribe, referencias]
created: 2026-10-23
---

# Guiones de 67 reels (transcritos con Scribe) + ganchos mirados fotograma a fotograma

**Cómo:** un transcriptor con ElevenLabs Scribe (`transcribeScribeVerbatim`, ElevenLabs Scribe v2: palabras con tiempos + eventos de audio; 67/67 sin errores, ≈0,3 $). Métricas calculadas por código (`script.mjs`). Además saqué más fotogramas: **hooks a 5 fps (primeros 5 s, 25 fotogramas)** y **hojas densas a 1 fps de todo el vídeo** de los 67; mirados a mano los ganchos de 6 reels. Contexto: `analisis-fotogramas-67-reels.md` y `analisis-5-reels-gemini.md`.

## Hechos medidos (los 67 llevan voz en off)
| Cuenta | Idioma | Palabras/reel | Palabras/s | Palabras/frase | CTA final |
|---|---|---|---|---|---|
| seethroughworks | EN | **51** (18 s) | 3,1 | 9 | 0/6 |
| zackdfilms | EN | 79 | 2,2 | 12 | 0/6 |
| factsunfolded | EN | 112 | 2,7 | 8 | 0/6 |
| decoyreport | EN | 135 | 3,0 | 9 | **6/6** |
| so.thats.how | EN | 276 | 3,0 | 8 | 1/6 |
| scroll.engineer | EN | 271 | 2,7 | 14 | 0/6 |
| tapwisehq | EN | 320 | 3,1 | 10 | 2/2 |
| 1cell1lifee / 1action1reaction / 1bit1pixel | ES | 250–374 | 2,6–2,7 | 11 | 0/18 |
| resultaaquee | ES | 236 | **3,4** | 14 | 0/6 (pide «sígueme y envíaselo a un amigo» en el cierre) |

- **La voz arranca a los 0,1–0,3 s** en casi todos (zackdfilms, 1,1 s, es la excepción: narra con personajes); cubre el 85–99 % del vídeo. No hay intro, logo ni silencio inicial.
- **Ritmo de habla:** 2,2–3,4 palabras/s; 15–19 s ≈ 50 palabras (seethroughworks, 31 M de vistas).
- **Frases cortas:** 8–14 palabras de media; el primer enunciado ronda **10 palabras**.
- **Música:** Scribe marca «música suave/tranquila/misteriosa/tensa» y efectos reales (`ticking`, `pouring`, `screeching`): el sonido es de ambiente, no de efectos añadidos por cada elemento.

## Cómo abren (hook): patrones reales
Clasificación con regex, **aproximada** (la usé para orientar, no como cifra exacta): 13 de 67 niegan un mito, 11 son pregunta, el resto (≈45) afirman una situación concreta y visualizable.
- **Negar lo que crees:** «Los pájaros que vuelan en V *no* van así para que el primero les corte el viento» · «Una cana *no* es un pelo que se volvió blanco» · «Microwaves *don't* heat your food. They spin the water inside it» · «Your washing machine doesn't wash by spinning».
- **Pregunta con objeto cotidiano (el formato de ~18 s):** «Why is the hook on a tape measure loose?» · «How does a staple fold itself?» · «How does a vending machine catch a fake coin?»
- **Escena imposible o concreta:** «Esta trucha está muerta y aun así avanza contra la corriente» · «Toca esta planta y en un segundo se desmaya» · «Three people check into a hotel room that cost $30».
- **Marca como gancho:** decoyreport «Tesla's flying car isn't for sale. It's there to sell the one that…».
- **Fotogramas del gancho (5 fps):** el sujeto está en pantalla **desde el fotograma 1** (cinta métrica con el gancho en detalle; lavavajillas con título «Dishwasher.»; dedo y bolígrafo sobre la pantalla; coche volando sobre la pista), y en los primeros 5 s hay **1–3 cambios visuales** (zoom con círculo, el gancho se tiñe de rojo con «It isn't broken.»). El texto sale **2–4 palabras cada vez**, la palabra clave en color (amarillo, naranja, azul).

## Cómo cierran
- **Frase-firma repetible (21 de 67):** «So that's how.» (so.thats.how), «Same foot, different paperwork.» (factsunfolded), «Loose on purpose.» (seethroughworks), «Acción y reacción.» (1action1reaction), «That's the decoy. Follow for more.» (decoyreport).
- **CTA en 9 y pregunta final en 9:** «Would you rather have a bigger battery or a road that charges your car?» (scroll.engineer, engagement por comentarios); «Sígueme y envíaselo a ese amigo al que nunca le funciona el móvil con las manos mojadas» (resultaaquee: CTA con humor + reenvío).
- Los de 40–54 s cierran con **tarjeta de marca** (DECOY) o marca en cabecera fija de la primera a la última toma.

> [!note] resultaaquee reproduce temas de cuentas anglosajonas
> `resultaaquee/Dege5ORIPxv` («¿Por qué el gancho del metro está suelto? No, no está roto… a propósito», 31 s, 7 M de vistas) es el mismo tema y casi el mismo guion que `seethroughworks/DeMywLQDmBm` («Why is the hook on a tape measure loose? It isn't broken… Loose on purpose.», 18 s, 31,4 M). Es un hecho comparando transcripciones; que lo hayan copiado o que sea el mismo fenómeno, no lo puedo decir. Útil: **adaptar al castellano un guion probado en inglés tiene precedente que funcionó (7 M).**

## Receta de guion que sale de los datos (hipótesis, n=67)
1. Frase 1 (~10 palabras, 0 s): mito negado, pregunta con objeto cotidiano o situación imposible. Sin saludo.
2. Una idea por frase de 8–14 palabras; 2,5–3,4 palabras/s.
3. Un giro: la explicación contraria a lo que creías, con un número o una causa física.
4. Cierre con frase-firma de la cuenta; en cuentas que quieren seguidores, CTA contextual o pregunta.
5. Longitud: 50 palabras (≈18 s) para formato «pregunta cotidiana»; 110–135 (40–55 s) para el estándar con cierre de marca; 250–450 (90–160 s) para explicaciones técnicas.

## Qué falta / no fiable
- Regex de ganchos aproximada; los clasificadores de «mito/pregunta» pueden fallar en español con acentos.
- Mirados a mano solo 6 ganchos y 10 hojas; el resto, números.
- Sin analizar: calidad de la voz (humana/sintética: no medido), contenido de los comentarios, retención (no hay datos de Instagram).
- Siguen sin leer: x.com/brainextends, resultaaquee.com, brainrotshorts.com, reelmotor.io (leído solo por encima el 23/10).

Vuelve al índice (`../SKILL.md`) · método base `metodo-videos-explicativos-codigo.md` · enlaces `cuentas-y-metricas-instagram.md`.
