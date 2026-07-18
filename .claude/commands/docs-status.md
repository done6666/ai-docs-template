---
description: Read-only project dashboard — where things stand, composed from the docs and git
argument-hint: "[days]  (optional: also digest the last N days of git activity)"
---

# /docs-status — Project status dashboard

Read-only; never writes. Compose a compact status view **in the user's language**.
Read only what's listed below — headings and counts, not bodies; this command must
stay cheap (`DOCS_SYSTEM.md §14.6`).

## Gather

1. `docs/STATE.md` — Now / Next / In progress / Blockers / Open questions /
   health / branch / session. If `status: not-bootstrapped` → report that, point
   to `/docs-init` (new repo) or `/docs-adopt` (existing code), and stop.
2. `docs/implementation-map.md` (if present) — per-area `[x]`/`[~]`/`[ ]` counts
   and `Last implemented`. Don't read the how-notes.
3. `docs/features/README.md` (if present) — features not yet `shipped`.
4. `docs/decisions/README.md` — the 3 most recent ADRs (register form: the
   current standing per topic).
5. `docs/INDEX.md` — `current_tier`; count of `suspect`/`stale?` rows (name them
   if ≤3).
6. Git, cheap: current branch, dirty tree?, date of the last commit. If the user
   passed `[days]`, or `STATE.md`'s `Updated` lags today by more than ~3 days,
   also run `git log --oneline --since=<then>` → a 3–5 bullet "since you left"
   digest.

## Render (≤ ~15 lines, no raw table dumps)

**<project> — <date> · <branch> · <health>**
- **Now:** …
- **Next:** … (queue: N open / M done — `implementation-map.md`)
- **In flight:** FEAT-NNNN <name> (<status>), …
- **Blockers:** … (or omit)
- **Waiting on you:** the `Open questions` from STATE, verbatim — the line that
  matters most; these otherwise sit unseen in a file the human never opens.
- **Recent decisions:** ADR-NNNN <title> (<date>), …
- **Docs:** tier N · K suspect/stale (suggest `/docs-audit` if K > 0)
- **Since you left** (only if triggered): 3–5 bullets from git.

Omit any line with nothing to say. Never invent — every line must trace to a
doc or git fact you actually read (§14.4).
