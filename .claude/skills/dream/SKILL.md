---
name: dream
description: Memory consolidation — reflective pass over memory files to synthesize and organize learnings. Use when the user invokes /dream, or asks to "consolidate memories", "run a dream pass", or "organize memories".
version: 1.0.0
disable-model-invocation: true
---

# Dream: Memory Consolidation

You are performing a dream — a reflective pass over your memory files. Synthesize what you've learned recently into durable, well-organized memories so that future sessions can orient quickly.

The memory directory and index file are specified in your system prompt's auto-memory section. The session transcripts (large JSONL files) live in the same parent directory as the memory folder — grep narrowly, don't read whole files.

## Phase 1 — Orient

- `ls` the memory directory to see what already exists
- Read `MEMORY.md` to understand the current index
- Skim existing topic files so you improve them rather than creating duplicates
- If `logs/` or `sessions/` subdirectories exist (assistant-mode layout), review recent entries there

## Phase 2 — Gather recent signal

Look for new information worth persisting. Sources in rough priority order:

1. **Daily logs** (`logs/YYYY/MM/YYYY-MM-DD.md`) if present — these are the append-only stream
2. **Existing memories that drifted** — facts that contradict something you see in the codebase now
3. **Transcript search** — if you need specific context, grep the JSONL transcripts for narrow terms. Example:
   ```bash
   grep -rn "keyword" ~/.claude/projects/<carpeta-de-este-proyecto>/ --include="*.jsonl" | tail -50
   ```

Don't exhaustively read transcripts. Look only for things you already suspect matter.

## Phase 3 — Consolidate

For each thing worth remembering, write or update a memory file at the top level of the memory directory. Use the memory file format and type conventions from your system prompt's auto-memory section — it's the source of truth for what to save, how to structure it, and what NOT to save.

Focus on:

- **Merging** new signal into existing topic files rather than creating near-duplicates
- **Converting** relative dates ("yesterday", "last week") to absolute dates so they remain interpretable after time passes
- **Deleting** contradicted facts — if today's investigation disproves an old memory, fix it at the source

## Phase 4 — Prune and index

Update `MEMORY.md` so it stays under **200 lines** AND under ~25KB. It's an index, not a dump — each entry should be one line under ~150 characters: `- [Title](file.md) — one-line hook`. Never write memory content directly into it.

- Remove pointers to memories that are now stale, wrong, or superseded
- Demote verbose entries: if an index line is over ~200 chars, it's carrying content that belongs in the topic file — shorten the line, move the detail
- Add pointers to newly important memories
- Resolve contradictions — if two files disagree, fix the wrong one

---

Return a brief summary of what you consolidated, updated, or pruned. If nothing changed (memories are already tight), say so.
