---
name: video-explicativo-viral
description: Crear un reel vertical «cómo funciona X» hecho en código (HyperFrames/GSAP + voz + subtítulos palabra a palabra) con las reglas medidas en 67 reels virales. Úsala cuando se pida un reel explicativo, un guion de ese tipo o revisar uno ya hecho.
---

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
