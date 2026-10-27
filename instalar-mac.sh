#!/usr/bin/env bash
# Instala todo lo necesario en un Mac para usar este vault con Claude Code.
# Es seguro repetirlo: salta lo que ya está instalado.
set -u

say() { printf '\n==> %s\n' "$1"; }
have() { command -v "$1" >/dev/null 2>&1; }

say "Homebrew"
if ! have brew; then
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  [ -x /opt/homebrew/bin/brew ] && eval "$(/opt/homebrew/bin/brew shellenv)"
  [ -x /usr/local/bin/brew ] && eval "$(/usr/local/bin/brew shellenv)"
fi
have brew && echo "OK brew" || { echo "FALLO: brew no se instaló"; exit 1; }

say "Obsidian"
if [ -d "/Applications/Obsidian.app" ]; then echo "OK ya instalado"; else brew install --cask obsidian; fi

say "Git, Node y poppler (pdftotext)"
for f in git node poppler; do brew list "$f" >/dev/null 2>&1 || brew install "$f"; done

say "markitdown (PDF -> markdown)"
if ! have markitdown; then
  have pipx || brew install pipx
  pipx ensurepath >/dev/null 2>&1 || true
  pipx install "markitdown[pdf]" || echo "AVISO: markitdown falló; se usará pdftotext"
fi

say "Claude Code"
have claude && echo "OK ya instalado" || curl -fsSL https://claude.ai/install.sh | bash

say "Resumen"
for c in brew git node pdftotext markitdown claude; do
  have "$c" && echo "  OK  $c" || echo "  --  $c (no encontrado; abre una Terminal nueva y reintenta)"
done
[ -d "/Applications/Obsidian.app" ] && echo "  OK  Obsidian" || echo "  --  Obsidian"
echo
echo "Listo. Abre Obsidian > 'Abrir carpeta como vault' > esta carpeta."
