---
type: concept
tags: [reels, analisis, gemini, referencias]
created: 2026-10-23
---

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
