---
name: doc-maintainer
description: Keep this project's docs/ in sync with the code, autonomously. Use whenever finishing a task or work session, making an architectural or technology decision, starting or completing a feature, or changing dependencies, routes, data models, or module structure — i.e. any time the codebase changes in a way a doc in docs/ should reflect. The human never edits docs; you do.
---

# doc-maintainer

This project uses the AI-managed, tiered `docs/` system. **You own `docs/`; the
human never edits it.** Maintaining docs is part of finishing the task, not a
separate thing to ask permission for. Announce doc changes in one line.

The authoritative spec is `docs/_meta/DOCS_SYSTEM.md` — consult it for full
semantics, templates, and the fact-ownership matrix. This skill is the operational
checklist.

## Before you write: orient

If you haven't this session, read `docs/INDEX.md` then `docs/STATE.md`. Use
`INDEX.md`'s **routing table** to decide *where* a fact goes and its **load rules**
to decide *what* to open. Never crawl the tree. Follow the read-path protocol
(`DOCS_SYSTEM.md §14`): open only what the task implicates, read the section not the
whole file, and ground every claim in a doc or code you actually read — if a fact is
in neither, say "not documented" rather than invent it.

## Triggers → actions

Apply these as they occur:

| Trigger | Action → target |
|---------|-----------------|
| Session ending / context compacting | Update the active feature's `## Current state`, then in `docs/STATE.md` set immediate focus/blockers/uncommitted and **point Next at the map's `[ ]` items** (don't re-list). `/handoff` flushes deliberately (§10) |
| Decision with a lasting trade-off | Append `docs/decisions/ADR-NNNN-*` (template: `_meta/templates/adr.md`); link from `architecture.md`; add/move the topic in the `decisions/README.md` register |
| A past decision is reversed / superseded | Set the old ADR's `superseded_by` **and** move that topic in the register to the new ADR (same change). A `superseded` ADR is not current truth (§17) |
| Non-trivial feature starting | Create `docs/features/FEAT-*` **before** coding (template: `_meta/templates/feature.md`) |
| Implementation unit finished | Flip it to `[x]` in `docs/implementation-map.md`, add a tight "how built" note + code path, update **Last implemented** (create the map if first) |
| Failed approach / must-never rule / recurring bug learned | Record it in `docs/guardrails.md` (rule · why · where); promote out of `STATE` Do-not-repeat so it persists (create if first) |
| Feature completed | Mark spec `shipped`; fold summary into `STATE.md`; update `architecture.md` if structure changed; add a `CHANGELOG.md` `[Unreleased]` entry |
| Dependency/tool added/removed/major-bumped | Update `docs/tech-stack.md` |
| Module/boundary/data-flow change | Update `docs/architecture.md` (Components / Source map / Invariants) |
| Cross-subsystem contract added/changed (event, internal API, shared invariant) | Record/update the **seam** (edge · contract · producer · consumer · enforcement path) in `architecture` Seams / `architecture/_seams.md` |
| Route/endpoint added or changed | Update `docs/api/*` (create the `api/` area if first → Tier 1) |
| Schema / data-model change | Update `docs/data-model.md` (create if first) |
| A design fact chosen for a user-facing UI (reference, palette, type, spacing, layout rule) | Record in `docs/conventions/ui-ux-guidelines.md` (the design SSOT; template: `_meta/templates/ui-ux-guidelines.md`). After UI work, verify the screen against this doc — fix code or change the doc, never drift silently |
| Recurring non-obvious domain term (≥~3 uses) | Add to `docs/glossary.md` (create if first) |
| Stable identifier gains a renamable user-facing name (feature/permission/plan key, event, enum) | Register `key → display name` in `docs/keys.md` (create if first) |
| Scope / goal / non-goal change | Update `docs/project-brief.md` |
| User-visible change ships | Add entry under `CHANGELOG.md` `[Unreleased]` |
| Code contradicts a doc | Reconcile that doc in the same change |

## Rules that keep docs trustworthy

- **SSOT:** before writing a fact, check the fact-ownership matrix
  (`DOCS_SYSTEM.md §6`). If owned elsewhere, **link** — don't restate. Each doc's
  `owns`/`does_not_own` front-matter is the boundary.
- **Don't duplicate code/git:** if a fresh agent could recover it from the code or
  `git log` in under a minute, link to the path — don't copy it in.
- **Precedence:** code = *what*; ADRs = *why*. Reconcile everything else to those.
- **Freshness & trust:** bump `updated:` on every doc you touch; when you've
  confirmed a doc matches code, set `last_verified:` too (they differ — touch-time vs
  trust-time, §15). Cite the ground-truth code path for volatile facts (fields,
  contracts, paths) so future sessions can spot-check cheaply. Don't follow a
  `suspect` doc blindly — verify its high-stakes facts against that code first. Keep
  `INDEX.md` rows (`status`/`updated`) in sync.
- **Size caps:** `STATE.md` ≤ ~400 tokens (overwrite, don't append; promote lasting
  items to their owner doc first); `INDEX.md` ≤ ~900; other docs ≤ ~1,200–1,500.
  On overflow: split, summarise, or archive — never keep appending (§7 is the
  authoritative cap list).
- **Tiering:** don't create a doc until its trigger fires; prefer updating over
  spawning; archive (`status: archived`), never delete. Log tier escalations in
  `INDEX.md`.
- **Proportionality:** update only the doc(s) whose facts changed; batch updates at
  checkpoints (unit done, session end), not every micro-edit. A trivial change
  doesn't need the full ceremony. **One home per fact** — done/next queue lives in
  `implementation-map.md`; `STATE` and feature `## Current state` point to it, they
  don't restate it.

## Parallel work (only when it happens)

Solo/single-branch work ignores this. With ≥2 workstreams: each feature on its own
branch, live detail in that feature's `## Current state`, `docs/STATE.md` as a thin
dashboard. Never two sessions in one working dir — use `git worktree`. `STATE.md`/
`INDEX.md` conflicts are **regenerated, not hand-merged** (`DOCS_SYSTEM.md §10`).

## Session end

The single most important habit: **before you stop, update the resume cursor** — the
active feature's `## Current state` (branch-scoped) and `docs/STATE.md` — so the next
amnesiac session resumes cleanly: current focus, next action, blockers, and whether
the working tree is dirty. `/handoff` does this on demand.
