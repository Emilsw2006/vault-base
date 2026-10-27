# Primer arranque en el Mac

## 1. Descargar el vault (Terminal)
```
git clone https://github.com/Emilsw2006/vault-base.git ~/Vault
cd ~/Vault
```
Si te pide instalar las «herramientas de línea de comandos», acepta y repite.
Si el repo es privado, necesitas que te hayan dado acceso y entrar con tu cuenta
de GitHub (`gh auth login` o el login del navegador al clonar).

## 2. Claude Code
Si aún no lo tienes: `curl -fsSL https://claude.ai/install.sh | bash`
y abre una Terminal nueva. Luego, dentro de `~/Vault`:
```
claude
```
(La primera vez te pedirá iniciar sesión con tu cuenta de Claude.)

## 3. Pega este prompt
```
Eres mi asistente de instalación. Este vault es nuevo y está vacío; léelo todo
desde CLAUDE.md y PRIMER-ARRANQUE.md.

1) Ejecuta ./instalar-mac.sh (instala Homebrew, Obsidian, git, node, poppler,
   markitdown y Claude Code; salta lo que ya esté). Si algo falla, explícamelo
   en lenguaje simple y arréglalo; no sigas a ciegas.
2) Los plugins claude-obsidian y obsidian-skills están declarados en
   .claude/settings.json: confirma con /plugin que quedan instalados y
   activos; si no, instálalos tú.
3) Abre el vault en Obsidian (open -a Obsidian ~/Vault) y dime si cargó.
4) Haz el diagnóstico con la skill `wiki`: carpetas, skills y plugins activos.
5) Pregúntame UNA vez, en lista corta: a qué me dedico, qué proyectos tengo y
   qué quiero conseguir. Con eso rellena «Contexto personal» en CLAUDE.md y
   crea un proyecto por cada uno con la skill `nuevo-proyecto`.
6) Termina con un resumen de lo instalado y qué comprobaste de verdad.
```

## Cómo gastar poco
- `/clear` entre tareas distintas; antes, di «cierra sesión» (skill `cierre-sesion`).
- PDFs: nunca directos. Están bloqueados en `.claude/settings.json`; la skill
  `pdf-a-markdown` los convierte una vez a texto.
- El modelo por defecto es Sonnet (más barato). Cambia a uno mayor solo si hace falta.
- Pocos MCPs y skills extra: cada uno se carga en cada turno.
- Terminal o app da igual: el gasto son tokens, no la interfaz.
