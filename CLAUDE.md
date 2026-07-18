# Operating Rules for Claude Code

<!-- ai-docs-template:managed:start (template v1.13.0) — Machinery, upstream-owned.
     Do NOT hand-edit; `/docs-upgrade` replaces everything between these markers.
     Put project-specific rules BELOW the :end marker, not inside this block. -->

> AI-managed `docs/` system. This file is the short constitution; the full spec is
> `docs/_meta/DOCS_SYSTEM.md` — **on conflict, that file wins.**

## 1. Docs are yours to maintain

You own `docs/`. **The human never writes docs — you do**, autonomously, as part of
finishing the task. Never ask permission; announce doc changes in one line.

## 2. Working a task (read path)

At session start read **`docs/INDEX.md`** then **`docs/STATE.md`**, and **open your
first reply with a resume brief** — 2–3 lines in the user's language: where work
left off, the immediate next action, blockers, and any `Open questions` awaiting the
user. Skip it only if docs aren't bootstrapped; `/docs-status` is the fuller
on-demand dashboard (§14.6). Then (detail: §14–§17):

1. **Locate** the *minimal* doc set from the task's nouns via INDEX routing/load
   rules — open only what the task implicates, never the whole tree. Multi-subsystem
   task → first map the blast radius (subsystem catalog + `architecture` **Seams**),
   read edges not full nodes, completeness-check before finishing (§16).
2. **Read shallow-first**: front-matter `owns` + summary gauge relevance before the
   body; read the section/anchor, not the file. `related[]` isn't a reading queue.
3. **Ground — don't hallucinate**: base every claim on docs/code you actually read
   (code = *what*, ADRs = *why*). In neither? Say "not documented", don't invent.
   Check `guardrails.md` before coding (no `FAILED` retry, no `MUST`/`NEVER` breach).
   For a volatile, high-stakes fact from a **suspect** doc (`last_verified`
   missing/older than `updated`, or its code changed since), spot-check it against the
   code first (§15).
4. **Resume** from `STATE.md` + the active feature's `## Current state`. For "what's
   left / last built / how", read `implementation-map.md`; for "why / can I change X",
   the decisions **register** (`decisions/README.md`) — a `superseded` ADR isn't
   current truth (§17).

## 3. Write as you work (triggers)

Apply without being asked, **proportionally**: a trivial change updates only the
doc whose facts changed; batch updates at checkpoints (unit done, session end), not
every micro-edit. Core triggers (full table: §4):

- **Session end / compacting** → the active feature's `## Current state` + `STATE.md` (`/handoff` to flush).
- **Lasting decision** → append `decisions/ADR-NNNN-*` + register; link from `architecture.md`.
- **Non-trivial feature starting** → `features/FEAT-*` **before** coding.
- **Implementation unit done** → flip `[x]` in `implementation-map.md` + how-note + code path.
- **Failed approach / must-never / recurring bug** → `guardrails.md`.
- **Code contradicts a doc** → reconcile it in the same change.

Other triggers (deps→`tech-stack`, structure→`architecture`, routes→`api/`,
schema→`data-model`, terms→`glossary`, renamable keys→`keys.md`, shipped→`CHANGELOG`,
scope→`project-brief`): see §4.

## 4. Consistency & single source of truth

Docs describe code **as it is**. Change code a doc describes → fix the doc in the same
change; bump its `updated:`. **Code = *what*, ADRs = *why***; reconcile the rest to
those. Don't store what code or `git log` hold — link. **One home per fact:**
done/next queue = `implementation-map.md`; live session cursor = `STATE.md`; an
in-flight feature's resume = its `## Current state` (drop it when shipped) — don't
restate the same status in all three. If you must echo a fact for convenience, label
it a **mirror** (`> Mirror — home: X`); an unlabeled restatement is a silent second
home that drifts (§6).

## 5. Parallel & large scale (only when it happens)

Solo single-branch work ignores this. ≥2 parallel workstreams → each on its own
branch, live detail in its `## Current state`, `STATE.md` a thin dashboard; never two
sessions in one working dir (use `git worktree`); regenerate `STATE`/`INDEX`
conflicts, don't hand-merge (§10). A doc over its cap / many subsystems / monorepo →
partition + federate (Tier 3, §13).

## 6. Tiering (don't over-document)

Don't create a doc until its tier trigger fires (§3). Prefer updating over spawning.
Never delete — archive (`status: archived`).

## 7. Bootstrap

If `docs/` isn't bootstrapped (`STATE.md` shows the "not bootstrapped" marker), tell
the user to run **`/docs-init`** (fresh repo) or **`/docs-adopt`** (existing code).
Don't hand-populate outside those flows.

## 8. Full spec & upgrades

Full protocol — inventory, triggers, templates, fact-ownership, caps, audit — in
**`docs/_meta/DOCS_SYSTEM.md`** (it wins on conflict). Pull upstream improvements with
**`/docs-upgrade`** (§12).

<!-- ai-docs-template:managed:end -->

## Project-specific rules

<!-- Everything below this line is yours. `/docs-upgrade` never touches it. Add your
     project's own build/test/style/agent rules here. Keep them brief and high-signal. -->

_(none yet)_
