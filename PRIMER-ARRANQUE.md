# Primer arranque en el Mac

## 1. Descargar el vault e instalar todo (Terminal)
```
git clone https://github.com/Emilsw2006/vault-base.git ~/Vault
cd ~/Vault
bash instalar-mac.sh
```
- Si te pide instalar las «herramientas de línea de comandos», acepta y repite.
- Homebrew te pedirá la **contraseña del Mac** (no se ve al escribirla) y que
  pulses **Enter**. Por eso este paso lo haces tú y no Claude.
- Tarda unos minutos. Al final sale un resumen con `OK` o `--` por cada cosa.

## 2. Abrir Claude
Cierra la Terminal, abre una **nueva** y escribe:
```
cd ~/Vault && claude
```
- La primera vez te pide iniciar sesión con tu cuenta de Claude.
- Si pregunta si confías en la carpeta: **sí**.
- Si pregunta si instalar los plugins `claude-obsidian` y `obsidian`: **sí**.
  Después cierra Claude (`/exit`) y vuelve a abrirlo con `claude`: los plugins
  solo se cargan al arrancar.

## 3. Pega este prompt
```
Eres mi asistente de instalación. Este vault es nuevo y está vacío; léelo todo
desde CLAUDE.md y PRIMER-ARRANQUE.md.

1) Ya ejecuté instalar-mac.sh en la Terminal. Vuelve a correr
   `bash instalar-mac.sh` (salta lo instalado) y dime qué queda con `--`.
   Si algo falla, explícamelo en lenguaje simple y arréglalo; si necesita mi
   contraseña, dime el comando exacto para pegarlo yo en la Terminal.
2) Comprueba que las skills de los plugins claude-obsidian y obsidian-skills
   están cargadas (por ejemplo, la skill `wiki`). Si no, dime que escriba
   /plugin para instalarlos y que reinicie claude; no sigas sin ellas.
3) Abre el vault en Obsidian (open -a Obsidian ~/Vault) y dime si cargó.
4) Haz el diagnóstico con la skill `wiki`: carpetas, skills y plugins activos.
5) Pregúntame UNA vez, en lista corta: a qué me dedico, qué proyectos tengo y
   qué quiero conseguir. Con eso rellena «Contexto personal» en CLAUDE.md y
   crea un proyecto por cada uno con la skill `nuevo-proyecto` (sin volver a
   preguntarme lo que ya te dije).
6) Termina con un resumen de lo instalado y qué comprobaste de verdad.
```

## Cómo gastar poco
- `/clear` entre tareas distintas; antes, di «cierra sesión» (skill `cierre-sesion`).
- PDFs: nunca directos. Están bloqueados en `.claude/settings.json`; la skill
  `pdf-a-markdown` los convierte una vez a texto.
- El modelo por defecto es Sonnet (más barato). Cambia a uno mayor solo si hace falta.
- Pocos MCPs y skills extra: cada uno se carga en cada turno.
- Terminal o app da igual: el gasto son tokens, no la interfaz.

## Dejar listo el entorno para reels explicativos (skill `video-explicativo-viral`)
Todo está en `.claude/skills/video-explicativo-viral/` (reglas, 8 notas de datos y
3 scripts de medición). El mismo contenido en un solo archivo: `REELS-EXPLICATIVOS-TODO-EN-UNO.md`.
Este prompt **solo instala y comprueba**; no crea ningún reel:
```
Usa la skill video-explicativo-viral, pero SOLO para dejar el entorno listo.
NO crees ningún reel, guion ni vídeo de ejemplo.

1) Haz git pull en ~/Vault y vuelve a correr `bash instalar-mac.sh` (salta lo
   instalado). Si necesita mi contraseña, dime el comando exacto para pegarlo
   yo en la Terminal.
2) Instala HyperFrames (el motor HTML -> vídeo, repo heygen-com/hyperframes,
   Apache 2.0). No adivines el comando: léelo del README oficial del repo y dime
   cuál usaste. Instala también lo que ese README exija (por ejemplo Chrome o
   Chromium para renderizar). GSAP no se instala global: va dentro de cada
   proyecto de reel.
3) Crea ~/Vault/.env copiando .env.example (sin claves; las pongo yo). Comprueba
   que .env está en .gitignore y que git no lo ve (git status).
4) Verifica cada herramienta con un comando que NO genere contenido
   (--version o --help): node, ffmpeg, ffprobe, yt-dlp, markitdown, pdftotext,
   hyperframes. Comprueba también que `node .claude/skills/video-explicativo-viral/scripts/frames.mjs`
   arranca (sin carpeta de entrada debe fallar con su mensaje de uso, eso es correcto).
5) Termina con una tabla: herramienta | versión | OK o FALTA. Lo que no hayas
   podido comprobar, dilo como "sin comprobar"; no marques OK por suposición.
6) Dime qué claves necesito y de dónde sacarlas (ElevenLabs: permisos Text to
   Speech y Voices; Deepgram; Gemini) y que las pegue yo en .env, nunca en el chat.
```
