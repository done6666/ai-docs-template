# Operating Rules for Claude Code

<!-- ai-docs-template:managed:start (template v1.0.0) — Machinery, upstream-owned.
     Do NOT hand-edit; `/docs-upgrade` replaces everything between these markers.
     Put project-specific rules BELOW the :end marker, not inside this block. -->

> This project uses an **AI-managed `docs/` system**. This file is the short
> constitution; the full spec is `docs/_meta/DOCS_SYSTEM.md`. **On conflict, that
> file wins** — reconcile this one to it.

## 1. Docs are yours to maintain

You own `docs/`. **The human never writes or edits documentation — you do**,
autonomously, as a normal part of doing the work. Never ask *"should I update the
docs?"* — updating docs is part of finishing the task. Announce doc changes in one
line; don't request permission for them.

## 2. Read before you act

At the start of every session, before making changes, read **`docs/INDEX.md`**
then **`docs/STATE.md`**. Load further docs on demand using `INDEX.md`'s load
rules and routing table (e.g. touching endpoints → `docs/api/*`; persistence →
`docs/data-model.md`; a named feature → its `docs/features/FEAT-*`). Do **not**
re-read the whole `docs/` tree — read only what the task implicates.

## 3. Write as you work (triggers)

Apply these without being asked (full semantics in `docs/_meta/DOCS_SYSTEM.md §4`):

| Trigger | Action → target |
|---------|-----------------|
| Session ending / context compacting | Update the active feature's `## Current state` (keep current *as you work*); refresh `docs/STATE.md`. Use `/handoff` to flush deliberately |
| Decision with a lasting trade-off | Append `docs/decisions/ADR-NNNN-*`, link from `architecture.md` |
| Non-trivial feature starting | Create `docs/features/FEAT-*` **before** coding |
| Feature completed | Mark spec shipped; fold into `STATE.md`; update `architecture.md` if structure changed |
| Dependency/tool added/removed/major-bumped | Update `docs/tech-stack.md` |
| Module/boundary/data-flow change | Update `docs/architecture.md` |
| Route/endpoint added or changed | Update `docs/api/*` (create if first → Tier 1) |
| Schema / data-model change | Update `docs/data-model.md` (create if first) |
| Recurring non-obvious domain term | Add to `docs/glossary.md` (create if first) |
| User-visible change ships | Add entry under `CHANGELOG.md` `[Unreleased]` |
| Scope / goal / non-goal change | Update `docs/project-brief.md` |
| Code contradicts a doc | Reconcile that doc in the same change |

## 4. Consistency

Docs describe the code **as it is**, not as it was planned. If you change code that
a doc describes, update that doc in the same change. **Code is authoritative for
*what*; ADRs (`docs/decisions/`) are authoritative for *why*.** Reconcile
everything else to those. Bump each touched doc's `updated:` date. Don't store
what code or `git log` already hold — link to it instead.

## 5. Parallel work (only when it happens)

For solo, single-branch work, ignore this. When ≥2 workstreams run in parallel:
work each feature on its own branch, keep its live detail in that feature's
`## Current state`, and let `docs/STATE.md` become a thin dashboard. **Never run two
sessions in the same working directory** — use `git worktree add` per workstream.
`STATE.md`/`INDEX.md` conflicts are **regenerated, not hand-merged** (see
`DOCS_SYSTEM.md §10`).

## 6. Tiering (don't over-document)

Don't create a doc until its tier trigger fires (`DOCS_SYSTEM.md §3`). A tiny
project does not need a glossary or API doc. Prefer updating an existing doc over
spawning a new one. Never delete — archive (`status: archived`).

## 7. Bootstrap

If `docs/` is not yet bootstrapped (`docs/STATE.md` still shows the "not
bootstrapped" marker), tell the user to run **`/docs-init`** for a fresh/empty repo,
or **`/docs-adopt`** for a repo that already has substantial code (it deep-scans the
code and ingests any existing docs without loss). Do not hand-populate docs outside
those flows unless the user asks.

## 8. Full spec

The complete protocol — file inventory, tier triggers, templates, fact-ownership
matrix, size caps, and the audit procedure — lives in
**`docs/_meta/DOCS_SYSTEM.md`**. If these rules and that file conflict, that file
wins; reconcile this file to it. To pull upstream improvements to this system, run
**`/docs-upgrade`** (see `DOCS_SYSTEM.md §12`).

<!-- ai-docs-template:managed:end -->

## Project-specific rules

<!-- Everything below this line is yours. `/docs-upgrade` never touches it. Add your
     project's own build/test/style/agent rules here. Keep them brief and high-signal. -->

_(none yet)_
