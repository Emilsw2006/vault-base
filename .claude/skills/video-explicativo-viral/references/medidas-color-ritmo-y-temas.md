---
type: concept
tags: [reels, color, ritmo, temas, medidas]
created: 2026-10-23
---

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
