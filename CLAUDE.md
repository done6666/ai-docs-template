# Operating Rules for Claude Code

<!-- ai-docs-template:managed:start (template v1.5.0) — Machinery, upstream-owned.
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

## 2. Working a task (read path)

At session start read **`docs/INDEX.md`** then **`docs/STATE.md`**. Then, for any
task, orient cheaply and stay grounded (full detail: `DOCS_SYSTEM.md §14`):

1. **Locate.** From the task's nouns (feature, entity, endpoint, subsystem), use
   `INDEX.md`'s routing/load rules to pick the **minimal** doc set. Open only what
   the task implicates — never re-read the whole tree.
2. **Read shallow-first.** A doc's front-matter (`owns`) + ≤5-line summary tell you
   if it's relevant *before* you open the body; then read the relevant
   **section/anchor**, not the whole file. `related[]` links are for traceability —
   follow one only if you need that exact fact, not on sight.
3. **Ground — don't hallucinate.** Base your plan on specific statements you
   actually read in the docs or code. **Code is authoritative for *what*, ADRs for
   *why*.** If a needed fact is in neither the docs nor the code you've checked, say
   "not documented" and read the code or ask — never invent it. Before writing code
   in an area, check `docs/guardrails.md` — don't retry a `FAILED` approach or
   violate a `MUST`/`NEVER`.
   - **Don't follow a stale doc blindly.** Trust stable/low-stakes docs (why, scope,
     terms) as-is. But for a **volatile, high-stakes fact you'll code against** (a
     field, a contract, a path) — especially if the doc is *suspect*
     (`last_verified` missing/older than `updated`, or its code changed since) —
     spot-check that one fact against the code the doc points to first. Cheap check;
     avoids confident-wrong code (`DOCS_SYSTEM.md §15`).
4. **Resume fast.** For work already in progress, `STATE.md` + the active feature's
   `## Current state` is your on-ramp — don't re-derive what they already say. For
   "what's left / what was last built / how was X built", read
   `docs/implementation-map.md` — one cheap doc instead of scanning the codebase.

## 3. Write as you work (triggers)

Apply these without being asked (full semantics in `docs/_meta/DOCS_SYSTEM.md §4`):

| Trigger | Action → target |
|---------|-----------------|
| Session ending / context compacting | Update the active feature's `## Current state` (keep current *as you work*); refresh `docs/STATE.md`. Use `/handoff` to flush deliberately |
| Decision with a lasting trade-off | Append `docs/decisions/ADR-NNNN-*`, link from `architecture.md` |
| Non-trivial feature starting | Create `docs/features/FEAT-*` **before** coding |
| Implementation unit finished | Flip it to `[x]` in `docs/implementation-map.md`, add a "how built" note + code path, update **Last implemented** (create if first) |
| Failed approach / must-never rule / recurring bug learned | Record it in `docs/guardrails.md` (promote out of `STATE` Do-not-repeat so it persists; create if first) |
| Feature completed | Mark spec shipped; fold into `STATE.md`; update `architecture.md` if structure changed; mark units done in `implementation-map.md` |
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

At **large scale** (a doc can't stay under its cap, many subsystems, monorepo):
partition the overflowing doc into a directory + index and federate the INDEX
instead of appending — **Tier 3 / federated mode** (`DOCS_SYSTEM.md §13`). Small
projects ignore this.

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
