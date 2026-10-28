---
type: concept
tags: [reels, analisis, fotogramas, ffmpeg, referencias]
created: 2026-10-23
---

# Análisis por fotogramas de 67 reels (11 cuentas), sin IA

**Cómo:** lista de reels sacada de Chrome con sesión de Instagram abierta (pestaña Reels de cada perfil, con vistas reales), los **6 más vistos por cuenta** descargados con yt-dlp (62) + los 5 del primer análisis (`analisis-5-reels-gemini.md`). Medición **determinista con ffmpeg** a 4 fps (`signalstats`: luminosidad, saturación, diferencia entre fotogramas) y hojas de contactos (1 fotograma/2 s) que he **mirado yo** (10 reels, uno por cuenta). Script: `../scripts/frames.mjs`. Complementa a Gemini: aquí los números no dependen de un modelo.

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
