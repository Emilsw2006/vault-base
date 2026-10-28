---
type: concept
tags: [video, hyperframes, claude-code, pipeline]
created: 2026-10-23
---

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
