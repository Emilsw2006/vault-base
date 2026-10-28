# Reels explicativos virales: todo en un archivo

Generado a partir de `.claude/skills/video-explicativo-viral/` (la skill + sus 8 notas de datos). Si cambias la skill, regenera este archivo.

---

# PARTE 1 — La skill (reglas y pipeline)

# Skill: reel explicativo viral (hecho en código)

Basada en la medición de 67 reels de 11 cuentas. El detalle está en `references/` (junto a esta skill): `analisis-fotogramas-67-reels.md`, `guiones-de-los-reels.md`, `medidas-color-ritmo-y-temas.md`, `webs-de-la-competencia.md`, `ganchos-y-temas-que-funcionan.md`, `cuentas-y-metricas-instagram.md`, `analisis-5-reels-gemini.md` y `metodo-videos-explicativos-codigo.md`. Los scripts de medición están en `scripts/`. **Estado: reglas derivadas de datos, aún sin probar produciendo un reel; no afirmes que «funciona» hasta pasar el crítico y ver métricas reales.**

## 0. Elige la familia (decide ritmo y look)
| Familia | Cuándo | Duración | Eventos visuales/min | Subtítulos |
|---|---|---|---|---|
| **P · Pregunta de objeto** (seethroughworks, resultaaquee) | un aparato cotidiano, 1 mecanismo | **15–30 s**, ~50–110 palabras | 20–25 | palabra a palabra, 2–4 palabras, clave en color |
| **S · Estándar con firma** (decoyreport, factsunfolded, so.thats.how) | mito → mecanismo → firma | 40–60 s, 110–280 palabras | 4–10 (diagramas) o ~50 (3D) | palabra a palabra o frases cortas |
| **T · Técnico continuo** (1cell1lifee, 1bit1pixel, 1action1reaction, scroll.engineer) | un proceso que se transforma | 90–160 s, 250–450 palabras | 1–11 | rótulos con línea, poco subtítulo |
Si el vídeo promociona un producto: familia **P** o **S**; el producto va **solo al final** como resolución, nunca al principio.

## 1. Tema
Objeto que el espectador usa a diario + creencia errónea obvia + mecanismo físico/lógico **dibujable**. Mina los comentarios de otras cuentas («¿cómo funciona X?»). Sin fuente primaria o medición propia el dato **no sale**; lo ilustrativo se rotula.

## 2. Guion (plantilla medida)
1. **Frase 1 (~10 palabras, voz desde 0,1 s, sin saludo):** mito negado («X no hace lo que crees»), pregunta con objeto cotidiano («¿Por qué el gancho del metro está suelto?») o situación imposible/concreta. La primera toma ya es el sujeto y sirve de portada.
2. Frases de **8–14 palabras**, una idea por frase, **2,5–3,4 palabras/s**.
3. Planteamiento breve (lo que ya sabe) → **mecanismo** (cada elemento sale al nombrarlo) → giro contrario a lo esperado, con un número o causa.
4. **Cierre con frase-firma repetible** (≤8 palabras: «Loose on purpose.», «Same foot, different paperwork.») + si hay objetivo de seguidores: CTA contextual con humor/reenvío («envíaselo a ese amigo que…») o pregunta final.
Esqueletos: «¿Por qué es así?» · «X contra Y» (veredicto claro) · «Cómo funciona de verdad».

## 3. Look
- Fondo **casi negro con tinte frío** (`#05–#0f`, p. ej. `#0b1014`, `#060d12`); nunca `#000` puro salvo motivo. Claro solo en estilo infografía (gris cálido `#d7d7d5`).
- **Un acento cálido ámbar** (`#f4aa37`–`#fbaf39`) **o dos complementarios** (verde `#05ab6e` + magenta `#f40179`; cian `#00e2fb` + amarillo `#ecfc00`) + blanco para texto. Saturación baja en el resto.
- Subtítulo inferior, blanco, palabra activa en el acento; 2–4 palabras por vez. Marca discreta fija en cabecera; en 40–60 s, tarjeta de marca final.
- Una idea por fotograma: cifra → contador que sube; secuencia → diagrama que se dibuja en orden; contraste → pantalla partida. Zonas seguras de la plataforma.

## 4. Ritmo
- Evento visual cada **~2–3 s** en P (más en 3D), cada 5–14 s en diagramas continuos. 1–1,2 eventos en los 3 primeros segundos.
- Atar cada animación a una **palabra** (tiempos de Scribe/Deepgram); la sincronía real medida con inicios de frase es modesta (39 %): no cortes en cada frase por sistema.
- Música ambient baja bajo la voz, SFX escasos y solo cuando un elemento aterriza. Mezcla a −14 LUFS (Instagram la normaliza igual).

## 5. Pipeline (herramientas; se instalan con `instalar-mac.sh`)
1. Investigar con fuente por dato (`facts.json`: frase → fuente). 2. Guion (plantilla §2). 3. Voz: ElevenLabs (clave con permisos *Text to Speech* y *Voices*) o tu propia locución; tiempos por palabra con ElevenLabs Scribe o Deepgram. 4. Mapa de tiempos palabra→animación. 5. Escenas en HTML/GSAP y render con HyperFrames (`heygen-com/hyperframes`, Apache 2.0). 6. Mezcla con ffmpeg. 7. **Crítico independiente** (otro agente, sin haberlo construido).
Las claves (ElevenLabs, Deepgram, Gemini) van en un `.env` local, **nunca** en el vault ni en el chat. Descargar referencias: `yt-dlp`.

## 6. Crítico (obligatorio antes de entregar)
Medir, no opinar. Con ffmpeg: hoja de contactos 1 fps y primeros 5 s a 5 fps; `signalstats` a 8 fps (eventos/min y eventos en 3 s); histograma de color (fondo + acentos); transcripción con tiempos (palabras/s, 1.ª palabra <0,5 s, frase 1 ≈10 palabras, ¿frase-firma?). Compara con la familia elegida (§0). Veredicto «ship» o «otra pasada» con lista de fallos concretos. Scripts de referencia en `scripts/`: `frames.mjs` (señal por fotograma, 4 fps), `frames2.mjs` (color real y ritmo a 8 fps) y `rhythm.mjs` (resumen de ritmo). Uso: `node scripts/frames.mjs <carpeta-de-mp4> <salida>` (necesitan ffmpeg y ffprobe).

## 7. Criterio de éxito de la primera prueba
Un reel de 15 s (familia P) con voz real, que cumpla §2–§4 medidos y pase el crítico; después publicar y comparar vistas con las referencias (sin prometer cifras).

---

# PARTE 2 — analisis-fotogramas-67-reels

# Análisis por fotogramas de 67 reels (11 cuentas), sin IA

**Cómo:** lista de reels sacada de Chrome con sesión de Instagram abierta (pestaña Reels de cada perfil, con vistas reales), los **6 más vistos por cuenta** descargados con yt-dlp (62) + los 5 del primer análisis (`analisis-5-reels-gemini.md`). Medición **determinista con ffmpeg** a 4 fps (`signalstats`: luminosidad, saturación, diferencia entre fotogramas) y hojas de contactos (1 fotograma/2 s) que he **mirado yo** (10 reels, uno por cuenta). Script: `scripts/frames.mjs`. Complementa a Gemini: aquí los números no dependen de un modelo.

## Tres familias visuales distintas (no un solo estilo)
| Familia | Cuentas | Dur. media | Fondo oscuro | Cortes duros/min | Movimiento | Cómo se ve |
|---|---|---|---|---|---|---|
| **A. Cámara técnica continua** | 1cell1lifee, 1bit1pixel, 1action1reaction, factsunfolded, tapwisehq | 42–143 s | 80–100 % | 0–7 | bajo | Una sola escena que se transforma (zoom/pan sobre un esquema). Etiquetas con línea y escala (`50 µm`), colores neón sobre azul/negro, **casi sin subtítulos hablados**; texto solo para rotular (FOLÍCULO, 2023) |
| **B. 3D/personajes con subtítulo palabra a palabra** | zackdfilms, so.thats.how, seethroughworks | 18–95 s | 2–41 % | 12–64 | alto | Escenas 3D realistas, **cambio cada 1–5 s**, subtítulo inferior en blanco con **palabra activa resaltada** (naranja/azul/amarillo) |
| **C. Infografía/UI limpia** | decoyreport, resultaaquee, scroll.engineer | 47–101 s | 17–81 % | 6–12 | medio | Tarjetas de interfaz, gráficos (hipérbola, barras, relojes), píldora de subtítulo corta; decoyreport en fondo claro con **cierre de marca + «follow for more»** |

## Cifras que sí se sostienen (medidas, no opinadas)
- **Duración y vistas no se correlacionan:** seethroughworks **18 s → 31,4 M**; zackdfilms 51 s → 29,7 M; 1cell1lifee 134 s → 9 M; scroll.engineer 125 s → 1,2 M. Un reel de ~15 s tiene precedente real (seethroughworks, 17–19 s en los 6 medidos).
- **El ritmo depende de la familia:** zackdfilms ≈ 64 cortes/min; 1bit1pixel ≈ 0,4. Un mismo «hay que cambiar de plano cada 3 s» sería falso para la familia A.
- **Paleta:** saturación media baja en todas (5–20 de 255): fondos oscuros apagados + **1–2 acentos** (cian/verde neón, naranja, amarillo, magenta). Zackdfilms es la excepción (sat 20, colores de dibujos 3D).
- **Subtítulos:** familia B y C sí; familia A rotula en vez de subtitular.
- **Estructura visible:** el objeto/gancho del primer fotograma ya es el sujeto del vídeo (cinta métrica, ave en V, fregadero de personas); el último fotograma cierra con frase-resumen (`Loose on purpose`, `Same foot, different paperwork`) o marca (DECOY).
- **Resuelto:** `p/DekLxHqxen5` es el reel del teclado de iPhone (resultaaquee): **3,6 M de vistas**, no un reel distinto → la contradicción de cifras de `cuentas-y-metricas-instagram.md` se debe a crecimiento del mismo reel.

## Qué NO se puede sacar de esta medición
- **Volumen (LUFS):** −14 en los 67 → Instagram normaliza el audio; no distingue nada.
- **Cortes duros:** subestima transiciones animadas (ver contradicción en `analisis-5-reels-gemini.md`); sirve para comparar familias, no para contar escenas.
- **Guion/voz:** no analizado aún (ni transcripción ni qué reels llevan voz). Pendiente: transcribir con un transcriptor con ElevenLabs Scribe y sacar estructura narrativa.
- **Texto exacto, tipografía, easing/duración de animaciones:** requiere medir fotograma a fotograma recortes concretos (siguiente paso).
- Mirados a mano solo 10 de 67; el resto, solo números.

## Siguiente (propuesta)
1. Transcribir los 67 con un transcriptor con ElevenLabs Scribe (gratis en local o coste bajo) → guion, palabras/s, estructura.
2. Elegir 3 reels por familia y medir en detalle: color de subtítulo y palabra activa, ratio de pantalla ocupada por texto, tiempo de entrada de elementos (curvas de movimiento a 12–24 fps).
3. Con eso, y `metodo-videos-explicativos-codigo.md`, escribir la skill por familia (no una sola).

Vuelve al índice (`../SKILL.md`).

---

# PARTE 3 — medidas-color-ritmo-y-temas

# Color, ritmo y temas de los 67 reels (medido)

Complementa `analisis-fotogramas-67-reels.md` (familias) y `guiones-de-los-reels.md` (voz y guion). Color: histograma sobre 2 fotogramas/s (8 niveles por canal). Ritmo: diferencia de imagen a **8 fps** (un «evento visual» = pico >10 con ≥0,5 s de separación), cruzado con los inicios de frase de las transcripciones.

## Color
- **Fondo oscuro en 56 de 67** reels. Casi nunca negro puro: **negro azulado/verdoso** (`#05–#0f` con más azul/verde: `#0b1014`, `#060d12`, `#050e15`). Claros: decoyreport (`#d7d7d5`, gris cálido), so.thats.how lavavajillas/lavadora (`#cdcbce`) y 3D de zackdfilms (azules `#6aaec9`, `#33b7e6`).
- **Acento dominante: ámbar/naranja (30 de 67)** y azul (25); luego cian y rojo/naranja (14), verde (12), magenta/rojo (11). Ejemplos medidos: ámbar `#fbaf39`/`#f4aa37` (factsunfolded, la pieza «amarillo y cian» más limpia), `#e2b77c`/`#eed577` (seethroughworks); verde `#0e9467` + magenta `#f40179` (1bit1pixel); azul `#2b6ae9`/`#75d2ef` (Spott, scroll.engineer); cian `#00e2fb` + amarillo `#ecfc00` (Alyxia).
- **Regla que sale:** fondo casi negro con tinte frío + **un acento cálido (ámbar)** o **dos acentos complementarios** (verde+magenta, cian+amarillo) y blanco para el texto. Color identitario por cuenta: decoy = gris claro + azul; 1bit1pixel = verde+magenta; factsunfolded = negro+ámbar.

## Ritmo (eventos visuales por minuto, 8 fps)
| Cuenta | Eventos/min | Mediana entre eventos | Eventos en los 3 primeros s |
|---|---|---|---|
| 1bit1pixel | 1,3 | 22 s | 0,2 |
| factsunfolded | 4,2 | 14 s | 0,2 |
| 1action1reaction | 7,1 | 9 s | 1,0 |
| decoyreport | 9,8 | 5 s | 0,5 |
| 1cell1lifee | 11,1 | 3,9 s | 0,2 |
| tapwisehq | 15,3 | — | 1,0 |
| resultaaquee | 18,8 | 2,6 s | 1,2 |
| scroll.engineer / seethroughworks | 25,4 | 1,8–2,4 s | 1,2 |
| so.thats.how | 49,5 | 0,8 s | 3,7 |
| zackdfilms | 63,6 | 0,8 s | 3,7 |
- Media de los 67: **21 eventos/min**. Cuanto más «3D de cámara» (B), más eventos; cuanto más «diagrama continuo» (A), menos.
- **Sincronía con la voz:** el 39 % de los eventos cae a ≤0,4 s del inicio de una frase, frente a un 27 % esperable por azar. Es una **sincronía modesta**, mayor en decoyreport (59 % vs 36 %), factsunfolded (56 % vs 33 %) y resultaaquee (46 % vs 22 %); en zackdfilms (18 %) el ritmo lo marca la acción 3D, no la frase. No es una regla rígida «cada frase = un corte».
- **Gancho:** primeros 3 s con **1–1,2 eventos** en C y A+, 3–4 en B.

## Temas (clasificados a mano sobre los 67 ganchos)
| Tema | ≈ nº | Ejemplos reales |
|---|---|---|
| Aparato/objeto cotidiano y cómo funciona | ~35 | cinta métrica, grapadora, hervidor, cinturón, ascensor, lavavajillas, microondas, Wi-Fi, embrague, bomba de gasolina, teclado del móvil |
| Cuerpo, naturaleza, biología | ~13 | cana, hormigueo, óvulo, cachalote, calamar, trucha muerta, viróloga |
| Matemática, medida o paradoja cotidiana | ~9 | por qué 60 minutos, agujeros de una pajita, regla del 37 %, dólar perdido |
| Precios, marketing, psicología de venta | ~7 | decoyreport: MacBook inclinado, yogur con cuenco pesado, coma en el precio |
| Noticias/ingeniería de actualidad | ~6 | iPhone plegable, Tesla volador, Honda carretera cargadora |
- **Mismos temas en cuentas distintas:** gancho del metro (seethroughworks y resultaaquee), pajita (1bit1pixel y resultaaquee), teclado del iPhone (resultaaquee y reel de Alyxia), iPhone plegable y Tesla volador (decoyreport y scroll.engineer). **El nicho recicla temas probados en poco tiempo**, e incluso en idiomas distintos.
- Casi todos los temas tienen: (1) un objeto que el espectador usa a diario, (2) una creencia errónea obvia, (3) un mecanismo físico dibujable.

## Límites
- Clasificación de temas manual y aproximada; los eventos visuales dependen del umbral 10 (transiciones lentas no cuentan); LUFS inútil (Instagram normaliza a −14).
- Sin datos de retención ni de calidad de la voz.

Vuelve al índice (`../SKILL.md`).

---

# PARTE 4 — guiones-de-los-reels

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

---

# PARTE 5 — webs-de-la-competencia

# Qué cuentan las webs (leídas el 23/10)

Todo es **autodeclarado** por sus autores; las cifras de vistas no están verificadas por mí. Mediciones propias de los vídeos en `medidas-color-ritmo-y-temas.md`.

## resultaaquee.com — el método que ya usamos, vendido a 49 € + IVA
- Producto de una persona (Jorge Canseco Real, según el pie): **instrucciones y herramientas para que ChatGPT o Claude produzcan reels** a partir de una frase. Pago único, Gumroad, 14 días de garantía.
- **5 pasos declarados:** investigación con fuentes → guion → dibujos → animación con cada frase atada a su palabra + subtítulos palabra a palabra → revisión. El usuario sube el vídeo (no publica solo).
- **Stack nombrado:** Claude Code o Codex como ejecutor, **ElevenLabs** (≈0,25 €/vídeo), Mac o Windows. Salida MP4 1080×1920, portada y texto del post. Estilo personal guardado (fuentes y colores). Castellano (España) e inglés.
- Cifras propias de la web (16/10): 7,4 M, 5,4 M, 345 K, 96,7 K en reels concretos. → Coincide con nuestro pipeline de `metodo-videos-explicativos-codigo.md`: es una confirmación de la ruta, no una novedad.

## Reel Motor (reelmotor.io) — servicio gestionado
- Málaga. Pegas tu web → saca marca (colores, tipografía, logo, qué hace el negocio) → describes el vídeo en una línea → montaje en ~10 min → cambios con palabras. Primer vídeo 4,99 €; 47,99 / 97,99 / 397,99 €/mes (5 / 11 / 50 vídeos), 20 créditos por vídeo.
- **Estructura de guion de su ejemplo (Duolingo):** problema ~4 s (mostrado, no explicado) → solución ~5 s → después ~3 s → frase de cierre ~2 s → marca ~3 s (≈17 s).
- Series recurrentes («Day N», pixel-art con una historia al día). Casos de 700 K vistas en dos vídeos de teoría de juegos (DiviFriends), no verificado.

## BrainrotShorts (brainrotshorts.com) — la receta más explícita
Es un producto, pero su blog publica la fórmula de una cuenta de 108 K seguidores (@rick.theengineer; top 607 K / 749 K / 954 K; cifras suyas, ago 2026).
- **4 tiempos:** gancho 0–3 s (un misterio o hueco de conocimiento; la primera toma ya es la portada) → planteamiento 3–15 s (lo que el espectador ya sabe, sin rodeos) → mecanismo 15–60 s (cada elemento sale cuando la voz lo nombra) → resolución en los últimos 5–10 s (una frase estampada en grande, repetible a un amigo). Guion de menos de 3 min.
- **Una idea por fotograma:** cifra → contador; secuencia → diagrama que se dibuja en orden; contraste → pantalla partida.
- **Subtítulos palabra a palabra** grandes (son lo que retiene con sonido apagado); activarlos solo si el texto es parte del mensaje. Elementos dentro de zonas seguras de la plataforma.
- **Audio:** música que no pisa la voz, efectos que caen cuando el elemento aparece; se oye la voz antes de animar.
- **3 esqueletos de guion:** «¿Por qué es así?» (la causa de una molestia cotidiana) · «X contra Y» (veredicto claro) · «Cómo funciona de verdad» (dibujar lo invisible).
- **Estrategia:** serie con mismo personaje/estilo/ritmo; mismo MP4 en Reels, TikTok y Shorts; **sacar guiones de comentarios** («¿cómo funciona X?»).
- Técnica: no nombra modelos. Tiene MCP (planes desde 49 $/mes) y API REST. Render 30–80 min en calidades altas. Su `llms.txt` lista guías por formato.

## Tweet de @brainextends (16/10/2026) — JabMaxx
- Cuenta de app de boxeo (JabMaxx) con **14,35 M de vistas y 77 K seguidores en un mes**, «todo hecho con IA» (autor del tweet; 46,6 K vistas el tweet). Gancho citado: **«los luchadores bajos no pierden contra los altos»** — un enunciado contraintuitivo que obliga a ver el porqué.

> [!note] Coherencia con las mediciones
> Gancho = afirmación contraria a lo que crees, una sola idea por escena, voz desde el segundo 0 y cierre repetible: lo que dicen las tres webs es lo mismo que sale de los 67 reels medidos (`guiones-de-los-reels.md`).

Vuelve al índice (`../SKILL.md`).

---

# PARTE 6 — ganchos-y-temas-que-funcionan

# Qué funciona y qué no

**Hallazgo principal:** gana el vídeo que responde una duda que el espectador *ya
tiene porque lo ha visto* (boli que no funciona en la pantalla: 9,3 M; gancho del
metro suelto: 6,2 M). Debajo: cosas cotidianas que nunca te preguntaste (2,6 M,
801 K). Lo que no has vivido y las noticias: 17 K–724 K. Cotidiano gana a noticia por 10–100×.

## Plantilla de guion (se repite en todas)
Paradoja en la primera frase → «¿cómo es posible?» → mecanismo en 3–4 pasos → segundo
truco → «eso sí» (matiz honesto) → «envíaselo a ese amigo que…» (busca compartidos).

## Formato medido
Voz desde el fotograma 0, 190–205 palabras/min en castellano, casi 0 cortes duros,
subtítulo palabra a palabra, fuente pequeña abajo, −14,1 LUFS.

## Cautela
21–22 vídeos, dos cuentas, edades distintas: pista fuerte, no ley. Mandará medir los nuestros.

---

# PARTE 7 — cuentas-y-metricas-instagram

# Enlaces de Instagram y métricas

Método: `yt-dlp -j` reel a reel (me gusta y comentarios). **Las visualizaciones no
salen sin sesión**, y yt-dlp ya no lista perfiles (error «Unsupported URL»). Para

## Reels medidos hoy (2026-10-23)
| Reel | Cuenta | Fecha | Me gusta | Coment. | Nota |
|---|---|---|---|---|---|
| `reel/DeeMfY7tEbS` | Alyxia (tecnología, castellano) | 14/10 | 64.525 | 341 | «Hay veces que la tecnología nos sorprende» |
| `reel/DcIx2kwAaFQ` | m8d | 17/08 | 8.606 | 76 | Luces y router que nunca desenchufas; castellano |
| `reel/Deh-4X1v0F5` | Scroll Engineer | 15/10 | 38.967 | 156 | Qué pasa al hacer una llamada (inglés) |
| `p/DekLxHqxen5` | Resulta que (resultaaquee) | 16/10 | 230.898 | 9.388 | Probablemente el del teclado (111.956 / 4.869 el 17/10): **sin confirmar** |
| `reel/DexfUKMgtId` | Spott (spott.ar) | 21/10 | 15.833 | 56 | Añadido el 23/10; tema sin analizar |

## Perfiles de la lista (sin métricas todavía)
@so.thats.how · @factsunfoldedstudio · @1action1reaction · @1cell1lifee ·
@seethroughworks · @tapwisehq · @zackdfilms · @1bit1pixel · @decoyreport · @scroll.engineer (120K seguidores el 17/10) —
**pendientes**: Instagram bloquea la lectura sin sesión. Los nombres sugieren el formato
«1 X, 1 Y» y cuentas de explicación visual, pero **no los he visto**: no hay análisis.

## Cuentas ya medidas (17/10)
- @resultaaquee: 37,9K seguidores a los 3 días; pantalla táctil 611K me gusta / 7,4 M vistas; gancho del metro 270K / 5,4 M.
- @scroll.engineer (120K seg.): AirTag 214K, Google Maps 183K, Apple Watch 140K; noticias 4,6K–34K.

> [!contradiction] Cifras del teclado
> 17/10: 111.956 me gusta / 4.869 comentarios (repo `01-cuentas-y-negocio.md`). 23/10: `p/DekLxHqxen5` marca 230.898 / 9.388. Si es el mismo reel, ha crecido; si no, es otro. Decide el humano abriendo el enlace.

Vuelve al índice (`../SKILL.md`) · patrones en `ganchos-y-temas-que-funcionan.md`.

---

# PARTE 8 — analisis-5-reels-gemini

# Análisis de 5 reels con el analizador de vídeo con Gemini (Gemini)

**Cómo:** `yt-dlp` descarga cada reel → la API de Gemini (vídeo a 2 fps, modelo flash) con un prompt de análisis de reel → JSON. Coste total ≈ 0,05 $. Reels: ver `cuentas-y-metricas-instagram.md`.

## Lo que repiten los 5 (hipótesis de trabajo, n=5)
| Rasgo | Resultado |
|---|---|
| Duración | **70–148 s**, no 15 s (92, 84, 148, 84, 70) |
| Estilo | 5/5 animación por código / motion graphics, fondo oscuro, paleta mínima (negro/blanco + 1–2 acentos) |
| Gancho | paradoja o frustración cotidiana: 3 contraste, 1 dato sorprendente, 1 pregunta |
| Voz | 4/5 humana, 2,2–2,6 palabras/s |
| Subtítulos | palabra a palabra con resalte en 4/5 (≈100 % del guion) |
| Escenas | una nueva cada 3,6–8,8 s (conteo de Gemini: 8–24 por reel) |
| Música / SFX | ambient/lo-fi bajo; SFX escasos (3–5 por reel) |
| Cierre | CTA contextual en 3/5 (uno es un anuncio de la app en los últimos 3 s: Spott); bucle visual al inicio en 2/5 |
| Estructura | gancho → problema → desarrollo → giro → cierre |
| Reproducible con código | 3 «alto», 2 «medio» (3D y footage son lo difícil) |

## Reglas candidatas para la skill (de los `leccionesParaLaSkill`, por confirmar)
1. Abrir con un hábito cotidiano que el dato desmonta.
2. Cifras como barras/relojes que crecen, no listas de números.
3. Un solo hilo visual (coche, dedo, calle) que se mantiene todo el vídeo.
4. Cerrar volviendo al encuadre del gancho o con CTA que apele al humor/amigo.
5. Producto propio solo al final, como resolución del problema.

## Qué NO es fiable (límites medidos hoy)
> [!contradiction] Cortes: Gemini vs ffmpeg
> Gemini cuenta 8–24 cambios de escena por reel; el detector de ffmpeg (umbral 0,3) da 7, 5, 2, 1 y 0. En motion graphics los cambios son transiciones animadas, no cortes duros: ffmpeg no los ve. **Ninguno de los dos números es «la verdad»**; para ritmo hay que medir por otra vía (frames cada 0,5 s). Decide el humano cuál usar.

- Tiempos de estructura mal formados en 2 de 5 (`117-83`, `undefined`): hay que validar el JSON antes de fiarse.
- «Voz sintética» del reel de Alyxia es juicio de Gemini sin contraste.
- Solo 5 de ~14 fuentes: los 9 perfiles siguen sin métricas (Instagram pide sesión).

## Siguiente
1. Leer resultaaquee.com, brainrotshorts.com (scroll.engineer) y reelmotor.io.
2. Con esto + `metodo-videos-explicativos-codigo.md`, escribir la skill; criterio: reel de prueba de 15 s con voz real que pase un crítico independiente.

Vuelve al índice (`../SKILL.md`).

---

# PARTE 9 — metodo-videos-explicativos-codigo

# Método: vídeos «cómo funciona X» hechos en código

## Idea central
**No es IA de vídeo.** Claude Code escribe código que dibuja cada escena (SVG,
Three.js, HTML/CSS reconstruyendo apps) y se renderiza fotograma a fotograma
(HyperFrames o Remotion) + ffmpeg. La voz es ElevenLabs (~0,25 € por vídeo según
@resultaaquee). Cero Sora/Veo. Medido en 4 reels (antenas, teclado, viróloga, PS5).

## Pipeline (reconstruido, no publicado por nadie)
1. Tema → 2. investigación con fuente por dato (`facts.json`) → 3. guion de plantilla fija
→ ◆ control → 4. voz con tiempos por palabra → 5. mapa de tiempos (cada animación
atada a una palabra) → 6. estilo/look por tema → ◆ → 7. escenas en código →
8. render → 9. mezcla a −14 LUFS → 10. **crítico** (agente que no construyó el
vídeo, saca fotogramas y decide «ship» u «otra pasada») → 11. entrega.
Tarda ~1 h o más por vídeo y gasta cuota de modelo: eso no lo dicen.

## El prompt de Min Choi («director de motion graphics»)
Es el mismo método en una lista de reglas: primer fotograma ya terminado,
transiciones hechas de contenido (nunca corte duro sin motivo), todo función del
fotograma (sin timers), texto como movimiento, audio primero y recortado a beat,
−14 LUFS, `facts.json` con la frase exacta de cada afirmación, lo generado se
etiqueta, y **critic loop** con ledger. Modos: showreel / product / launch-story /
explainer. Para un producto propio encajan **product** y **explainer**.


## Repos útiles
`anything2explainer` (más completo, licencia **no comercial**), `claude-faceless-shorts-creator`
(MIT, shorts verticales), `explainroo` (MIT, gratis y local), `heygen-com/hyperframes`
(Apache 2.0, el motor que ya usamos). Nadie publica el paquete «full-visual» de @resultaaquee.

## Honestidad (regla nuestra)
Sin fuente primaria o medición propia el dato no sale. Lo dibujado se rotula
Vuelve al índice (`../SKILL.md`).

---

# Scripts de medición

Están en `.claude/skills/video-explicativo-viral/scripts/` (`frames.mjs`, `frames2.mjs`, `rhythm.mjs`); necesitan ffmpeg y ffprobe.
