---
description: Flush live state to disk before ending or when context compaction looks imminent — updates the active workstream's resume cursor
---

# /handoff — Flush resume state

Deliberately write the current resume point to disk so a compacted or fresh session
continues cleanly. Run this when you sense the session is ending or context is about
to compact. Follow `docs/_meta/DOCS_SYSTEM.md §10`.

## Steps

1. **Identify the active workstream(s).** The current branch → its feature spec
   (`docs/features/FEAT-*`) if one exists.
2. **Update the feature's `## Current state`** (the branch-scoped resume cursor):
   `Status`, `Last done`, `Next step`, `Uncommitted` (from `git status`),
   `Open now`. Keep it ~5 lines.
3. **Update `docs/STATE.md`:**
   - Solo work → refresh the SOLO-mode `Now / Next steps / Uncommitted work` and the
     `Updated`/`branch`/`session` line.
   - Parallel work → refresh this workstream's DASHBOARD row (health, detail link).
4. **Do NOT** promote-and-drop lasting items in a rush — if something belongs in an
   ADR/glossary/architecture, note it in `Next steps` so it's captured next session.
5. Report one line: what state was flushed and the single next action.

If there is no feature spec (early/solo work), just update `docs/STATE.md`. This
command never commits — it only writes docs.
