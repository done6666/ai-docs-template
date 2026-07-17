---
title: Documentation System — Authoritative Specification
tier: 0
type: reference
owns: "the full rules, tiers, triggers, templates, and audit procedure for this docs/ system"
does_not_own: "project-specific content (that lives in the docs it describes)"
status: current
updated: 2026-07-17
related: [CLAUDE.md, docs/INDEX.md]
---

# Documentation System — Authoritative Specification

> **This file is the constitution of `docs/`.** `CLAUDE.md` is a short summary of
> it. **If the two ever conflict, THIS FILE WINS** — reconcile `CLAUDE.md` to it.
> If you are an AI session where `CLAUDE.md`'s documentation rules are missing,
> reduced, or overwritten, **restore them from this file.**

## 0. First principle

**The human never writes or edits documentation. You (Claude Code) create and
maintain 100% of `docs/` autonomously**, as an ordinary part of doing the work —
not as a separate task to ask permission for. The only doc work you announce is a
one-line note of what you changed.

Documentation exists so that a **fresh, amnesiac session** can (a) orient in
minimal tokens, (b) resume exactly where the last session stopped, and (c) make
the same decisions the last session would have. Everything below serves those
three goals, in that priority order.

---

## 1. Design invariants

1. **One boot path, no crawling.** Session start reads exactly, in order:
   `CLAUDE.md` → `docs/INDEX.md` → `docs/STATE.md`. Everything else is loaded on
   demand using `INDEX.md`'s load rules. Never discover docs by listing the tree.
2. **Determinism over discovery.** Every fact type has exactly one canonical path,
   given by the routing table in `INDEX.md`. Never guess where to write.
3. **Store *why* and *live state*; never duplicate what code/git already hold.**
   Inclusion test before writing any line: *"Could a fresh agent recover this from
   the code or `git log` in under a minute?"* If yes → link to where it lives,
   don't copy it. Only *why*, *intent/constraints*, and *live working state* are
   worth storing.
4. **Single Source of Truth (SSOT) per fact.** Every doc declares `owns` /
   `does_not_own` in front-matter. A fact belongs to exactly one doc; everyone
   else links to it (see the Fact-Ownership Matrix, §6).
5. **Tiers are additive, never migratory.** Escalating a tier *adds* files; it
   never moves or renames existing ones. A Tier-0 path stays valid forever, so
   cross-links never break. De-escalation never deletes — set `status: archived`.
6. **Cheap to read.** Front-matter + a ≤5-line summary at the top of every doc
   must answer "do I need to open the body?". Size caps + archival (§7) keep the
   hot path small.
7. **Self-healing.** This file is authoritative and points back at `CLAUDE.md`;
   `CLAUDE.md` points here. Either can reconstruct the other.

---

## 2. File inventory & tiers

Docs grow with the project. Create a doc only when its tier trigger fires (§3).

### Tier 0 — Core (present in every project; created by `/docs-init`)

| Path | Purpose |
|------|---------|
| `CLAUDE.md` (repo root) | Short constitution + boot rule. Always loaded. |
| `docs/INDEX.md` | Manifest + routing table + freshness. Boot read #1. |
| `docs/STATE.md` | Resume / working memory. Boot read #2. Overwritten, capped. |
| `docs/project-brief.md` | Vision, users, scope, non-goals, constraints. |
| `docs/architecture.md` | System shape, boundaries, invariants, source map, tech philosophy. |
| `docs/tech-stack.md` | Technologies + versions (SSOT). Rationale → ADRs. |
| `docs/decisions/README.md` | ADR status index. |
| `docs/decisions/ADR-0001-adopt-docs-system.md` | Records adopting this system; ADR exemplar. |
| `docs/_meta/DOCS_SYSTEM.md` | This file. |
| `docs/_meta/templates/*` | Templates copied when creating new docs. |

### Tier 1 — Growing (real feature work begins)

| Path | Purpose |
|------|---------|
| `docs/requirements.md` | Functional + non-functional requirements (REQ-IDs). |
| `docs/roadmap.md` | Now / Next / Later; links to features. |
| `docs/data-model.md` | Entities, relationships, invariants — **logical** model only. |
| `docs/api/api-overview.md` | Style, auth, versioning, error/pagination conventions. |
| `docs/api/endpoints.md` | Human endpoint reference (defers to `openapi.yaml` at Tier 2). |
| `docs/features/README.md` | Feature index (status table). |
| `docs/features/FEAT-NNNN-<slug>.md` | One spec per feature. |
| `docs/conventions/coding-standards.md` | Language/style/structure/testing rules. |
| `docs/conventions/naming-conventions.md` | Files, vars, branches, commits. |
| `docs/conventions/ui-ux-guidelines.md` | Web design system: tokens, patterns, a11y, responsive. |
| `docs/glossary.md` | Domain + naming vocabulary. |
| `docs/guides/getting-started.md` | Tutorial: clone → run locally. |

### Tier 2 — Complex (large / production / multi-container)

| Path | Purpose |
|------|---------|
| `docs/api/openapi.yaml` | Machine contract SSOT (`endpoints.md` becomes a derived view). |
| `docs/architecture-components.md` | C4 L3 component breakdown per container. |
| `docs/operations/deployment.md` | Environments, pipeline, secrets *strategy* (never values). |
| `docs/operations/runbook.md` | Incident + routine procedures. |
| `docs/operations/observability.md` | Logging, metrics, alerts, dashboards. |
| `docs/guides/how-to-<task>.md` | Task-oriented how-tos. |

---

## 3. Tier escalation triggers

Evaluate after each work chunk. Escalation **adds** the new schema'd files (empty
but with front-matter + section headers) and logs the escalation in `INDEX.md`.

**Tier 0 → Tier 1** — when *any* fires:
- The first real feature is being implemented (not scaffolding/setup).
- A second architectural layer appears (e.g. API + DB), or >~3 source modules.
- The first decision needing recorded rationale → create `decisions/` ADR beyond 0001.
- Any HTTP endpoint or persisted entity is introduced → `api/` and/or `data-model.md`.
- Distinct capabilities exceed ~5 (outgrows the brief's Scope section) → `requirements.md`.

**Tier 1 → Tier 2** — when *any* fires:
- More than one deployable/runnable container (e.g. frontend + backend + worker).
- The project is deployed to a shared/production environment → `operations/*`.
- API surface exceeds ~15 endpoints or has external consumers → promote `openapi.yaml` to SSOT.
- More than one contributor, or a handoff is expected → `guides/how-to-*`.
- Any incident-response / on-call need → `runbook.md`.

Record the current tier and the escalation history in `INDEX.md` front-matter
(`current_tier`) and its **Escalation ledger** section.

---

## 4. Lifecycle triggers → actions

These are the events that make the docs maintain themselves. Apply them without
being asked. Each is detectable from work you are already doing.

| Trigger event | Action | Target |
|---------------|--------|--------|
| Session ending / context about to compact | Rewrite current focus, changes, next steps, open questions, blockers, uncommitted work | `STATE.md` |
| A decision with a lasting trade-off (framework, pattern, boundary, build-vs-buy) | Append an ADR; link it from `architecture.md` | `decisions/ADR-NNNN-*.md` |
| A non-trivial feature is starting (>1-file change; new user-visible capability) | Create the feature spec **before** writing code | `features/FEAT-NNNN-*.md` |
| A feature is completed | Mark spec `shipped`; fold a summary into `STATE.md`; update `architecture.md` if structure changed | feature spec + `STATE.md` |
| A dependency/tool is added, removed, or major-version bumped | Update the stack table + rationale pointer | `tech-stack.md` |
| A module/subsystem is added, or a boundary/data-flow changes | Update structure + diagram/description | `architecture.md` |
| A route/endpoint is added or changed | Update the API inventory (create `api/` if first → Tier 1) | `api/endpoints.md` / `openapi.yaml` |
| A schema / data model changes | Update the logical model (create if first) | `data-model.md` |
| A domain term is used repeatedly (≥ ~3 uses, non-obvious) | Add a glossary entry (create if first) | `glossary.md` |
| Scope / goal / non-goal changes | Update the charter | `project-brief.md` |
| A user-visible change ships | Add an entry under `[Unreleased]` | `CHANGELOG.md` |
| Code you just read contradicts a doc | Reconcile the doc in the same change | affected doc |

**Definitions** (so triggers are unambiguous):
- *Lasting trade-off* = a choice a future session could reasonably reverse or
  question, and whose rationale is not obvious from the code. If reversing it
  would be expensive or confusing without knowing *why*, write an ADR.
- *Non-trivial feature* = a new user-visible capability, or any change spanning
  more than one file / module. A one-line fix is not a feature.
- *Precedence when docs disagree*: **code is authoritative for *what*; ADRs are
  authoritative for *why*.** Reconcile everything else to those two.

Two triggers are the autonomy backbone: **STATE.md at session end** (enables cold
resume) and **ADR on decisions** (captures the *why* code can never recover).

---

## 5. Document templates

Copy from `docs/_meta/templates/` when creating a doc. Every content doc opens
with the front-matter contract, then a ≤5-line summary, then the schema sections.

### Front-matter contract (every content doc)

```yaml
---
title: <human title>
tier: 0 | 1 | 2
type: reference | explanation | decision | spec | index | tutorial | how-to
owns: "<the one class of fact this doc is the SSOT for>"
does_not_own: "<facts that live elsewhere; name where>"
status: current | draft | superseded | archived
updated: YYYY-MM-DD
related: [<ID or path>, ...]
---
```

Template files shipped:
- `templates/adr.md` — Architecture Decision Record.
- `templates/feature.md` — feature spec.
- `templates/state.md` — the STATE.md skeleton.
- `templates/requirements.md` — requirements doc.
- `templates/data-model.md` — logical data model.
- `templates/api-overview.md` — API conventions.
- `templates/convention.md` — a generic conventions/reference doc.

Section skeletons (summarised; see the template files for the full form):
- **ADR:** `Context · Decision · Consequences · Alternatives Considered`. Front-matter adds `id, status, date, supersedes, superseded_by, reconstructed`. A retroactive ADR (from `/docs-adopt`) sets `reconstructed: true`, `status: accepted`, shows the inferred-rationale banner, and cites the code paths that prove it in `related` — if it can't cite proof, it isn't written.
- **Feature spec:** `Current state · Summary · User stories / acceptance criteria · UX notes · API changes · Data changes · Rollout/flags · Open questions`. Front-matter adds `id, requirements[], adrs[]`. The `## Current state` subsection is the branch-scoped live resume cursor (§10.1), kept current as you work.
- **STATE:** `Now · In progress · Next steps · Open questions · Blockers · Do-not-repeat · Uncommitted work`. Front-matter adds `session, branch, health`.
- **project-brief:** `Problem · Target users · Value proposition · Scope · Non-goals · Success metrics · Constraints`.
- **architecture:** `Overview (≤5 lines) · Components (C4 L2 table + Mermaid) · Boundaries & data flow · Invariants · Tech philosophy · Source map (path → responsibility)`.
- **tech-stack:** `Frontend · Backend · Data · Infra/Tooling · Version policy` (tables: layer | choice | version | ADR ref).

---

## 6. Fact-Ownership Matrix (SSOT)

Before writing any fact, find its owner here. If owned elsewhere, **link** instead
of restating. If genuinely new, place it at the canonical path and update that
doc's `owns` field.

| Fact | Owner (SSOT) | Everyone else |
|------|--------------|---------------|
| *What* tech + which version | `tech-stack.md` | link to it |
| *Why* a tech/pattern was chosen | ADR (`decisions/`) | link to the ADR |
| Logical entities & relationships | `data-model.md` | link |
| Physical schema / DDL | migrations (code) | `data-model.md` links out |
| Endpoint contracts | `openapi.yaml`, else `api/endpoints.md` | features link |
| Requirements (normative) | `requirements.md` (REQ-IDs) | features reference REQ-IDs |
| Feature design | `features/FEAT-*` | roadmap links |
| Shipped history | `CHANGELOG.md` | roadmap "Shipped" summarises only |
| Domain terms | `glossary.md` | all docs link on first use |
| System structure & invariants | `architecture.md` | features link |
| Scope / goals / non-goals | `project-brief.md` | requirements link |
| Function/class signatures, file trees | **code** (do not store) | docs point to paths |
| Commit history / authorship / "what changed" | **git** (do not store) | — |

**Abstraction ladder** (a fact belongs to exactly one altitude): product (*why*) →
architecture (*how, structural*) → api + data (*how, contract*) → features (*how,
specific*) → code (*how, literal*).

---

## 7. Consistency, size caps & archival

- **`updated` on every write.** Every doc carries `updated: YYYY-MM-DD` in
  front-matter; bump it whenever you touch the doc.
- **Two-layer reads.** Front-matter + ≤5-line summary must let a reader decide
  whether to open the body. `INDEX.md`'s `tokens~` and `status` columns make the
  budget explicit.
- **Size caps (self-check on write):** `STATE.md` ≤ ~400 tokens (it is a snapshot,
  not a journal); `INDEX.md` ≤ ~600; any core/content doc ≤ ~1,500; area/reference
  doc ≤ ~1,200. On exceeding a cap: **split, summarise, or archive** — never keep
  appending.
- **Archival, not deletion.** When `decisions/` or a history doc grows, move
  superseded/old entries to `docs/_archive/<name>-YYYYqN.md`, mark `status:
  archived`, and update `INDEX.md`. Archived docs are never read unless a task
  explicitly needs history.
- **STATE is overwritten, never appended, and regenerated — not hand-merged.**
  Anything in STATE with lasting value (a decision, a learned constraint, a term)
  must be **promoted** to its owner doc (ADR / glossary / architecture) *before* it
  is dropped from STATE. STATE and INDEX are derivable snapshots; on a merge
  conflict, take either side and rewrite from the branch list + feature specs
  (§10). For parallel work, per-workstream detail lives in each feature spec's
  `## Current state`, and STATE becomes a thin dashboard (§10).
- **Stable anchors.** Section headers are fixed; cross-link by anchor
  (`architecture.md#invariants`) so links survive edits.
- **Tables & bullets over prose** — cheaper to read, diff, and update.

---

## 8. Audit procedure (what `/docs-audit` runs)

Read-only by default; produces a `doc | claim | reality | severity` report, then
offers to fix mechanical drift and lists judgment calls for confirmation.

1. **Deps:** every entry in `tech-stack.md` exists in the lockfile/manifest, and
   vice-versa for major deps.
2. **Routes:** endpoints in `api/` match the router/source; flag missing/extra.
3. **Structure:** modules/paths in `architecture.md` **Source map** resolve on disk.
4. **State freshness:** `STATE.md` "next steps" vs recent `git log`; flag if the
   branch/health looks stale.
5. **Freshness:** any doc whose `updated` is old relative to related code churn →
   mark `status: stale?` in `INDEX.md`.
6. **Index integrity:** every *content* doc on disk appears in `INDEX.md`, and
   every INDEX row points to an existing file. `docs/_meta/**` (this spec,
   `templates/`, `examples/`) and `docs/_ingest/**` (pre-adoption originals, §11)
   are infrastructure, not content — exempt from the manifest (except
   `DOCS_SYSTEM.md`, listed for freshness). A content doc not in INDEX is invisible
   by rule.
7. **Contradiction scan:** no two docs `own` the same fact class; no accepted ADR
   contradicts a later accepted ADR without a `superseded_by` link.
8. **Cross-links:** every `related[]` path and routing-table path resolves.

---

## 9. Recovery clause

`CLAUDE.md` is a **summary** of this document. If you find them in conflict, or
find `CLAUDE.md`'s doc rules missing or reduced, **this document is authoritative**
— act on it and reconcile `CLAUDE.md` back to it in the same session. `ADR-0001`
records the *decision* to adopt this system; this file is its living *specification*.

---

## 10. Concurrency, branches & worktrees

STATE and INDEX are *derivable snapshots* — they hold nothing not recoverable from
branches, feature specs, and `git log`. Everything here follows from that. **None of
this applies to solo, single-branch work** — don't add concurrency machinery to a
project that has no parallel work.

### 10.1 Where live state lives
- **Per-workstream live detail is owned by that workstream's feature spec**, in its
  `## Current state` subsection — branch-scoped, so it travels with the branch that
  implements the feature and merges cleanly (different features = different files).
- **`STATE.md` has two modes.** *Solo* (default): the classic
  `Now / Next / Blockers` snapshot. *Dashboard* (activates at ≥2 concurrent
  workstreams): one row per in-flight workstream (scope, branch, agent, link to the
  spec's `#current-state`, health). A dashboard row changes when a workstream
  starts/ends — not per step.

### 10.2 Branches
- Never trust a single `branch:` field as global truth. The dashboard lists every
  active branch; the branch you are on tells you which feature spec is authoritative.
- Work a feature on its own branch; its `## Current state` is edited only there.

### 10.3 Worktrees & parallel sessions (preferred pattern)
- Two Claude sessions must **never share one working directory.** For parallel work,
  use `git worktree add ../<repo>-<slug> <branch>` (or a second clone) — one
  worktree per workstream. Each has its own tree, branch, STATE checkout, and spec,
  so sessions can't stomp each other; contention is deferred to merge time.
- Before claiming a workstream, write its dashboard row (branch + agent). If you boot
  and see a fresh row for your branch owned by another agent, coordinate — don't
  overwrite their work.

### 10.4 Merge conflicts in STATE.md / INDEX.md — regenerate, don't hand-merge
- These two are regenerated, never hand-merged. On conflict/rebase:
  `git checkout --theirs docs/STATE.md docs/INDEX.md` (or `--ours`) to clear it, then
  **rewrite from ground truth** (active branches + feature specs) before continuing.
- Do NOT `merge=union` STATE/INDEX (their YAML front-matter would gain duplicate
  keys). `merge=union` is set only on `CHANGELOG.md` (append-only) via
  `.gitattributes`. Feature specs, ADRs, and other content docs merge normally —
  resolve them by hand.

### 10.5 Compaction safety
- The feature `## Current state` is the resume anchor and is kept current *as you
  work*, so a mid-task compaction loses nothing already on disk. Run **`/handoff`**
  before ending, or when compaction looks imminent, to flush state deliberately.

### 10.6 Monorepos
- Default to one root `docs/`; tag dashboard rows with a `scope` (package) value.
  Escalate to `packages/<pkg>/docs/` only at Tier 2, when a package is independently
  deployed/owned. The root boot path and root STATE dashboard remain the single
  entry point regardless.

### 10.7 Teams
- The single-writer rule is really single-writer-per-file-per-branch, preserved by
  §10.1–10.3. Dashboard rows carry an agent/owner tag for visibility. Humans still
  don't edit docs; the AI reconciles on merge via §10.4.

---

## 11. Adopting into an existing project

Greenfield repos run `/docs-init`. Repos that already have real code (and often
ad-hoc docs) run **`/docs-adopt`** instead. Adoption inverts init's emphasis: **the
codebase is the primary source; the human interview is minimal.**

1. **Reconstruct, don't ask.** Anything recoverable from code or `git log` (stack,
   structure, endpoints, entities, contributors, releases) is scanned, never asked.
   The interview covers only what code can't hold: vision, non-goals, roadmap, and
   the *why* behind decisions the code shows but doesn't explain.
2. **Land at the real tier.** Existing projects are usually Tier-1/2. Adoption
   evaluates the §3 triggers against the scan and creates ALL docs up to the highest
   satisfied tier, **populated from code** — not just Tier-0. Log each escalation in
   the INDEX ledger as "adopted into existing project".
3. **Additive and non-destructive — always.** Never overwrite or delete human
   content. Source-of-record files (`README`, `CONTRIBUTING`, `.github/**`) are left
   in place and referenced, their *why*-content extracted into docs. A pre-existing
   `docs/` file colliding with a reserved schema path is **moved to
   `docs/_ingest/<original-path>`** (a quarantine preserving structure + content),
   then folded into the new canonical doc. `docs/_ingest/**` is infrastructure like
   `_meta/**` — exempt from the manifest, never auto-read after adoption.
4. **Retroactive ADRs, evidence-only.** Record the 3–7 most consequential decisions
   the code makes evident. Each is `status: accepted`, `reconstructed: true`, with
   the inferred-rationale banner and `related:` links to the evidencing paths.
   **Never fabricate a rationale:** state only what code proves; route ambiguous
   "why"s to the interview; if still unknown, write "rationale not recorded at the
   time." Retroactive ADRs start at ADR-0002 (0001 stays the adopt-the-system record).
5. **One confirmation gate.** Nothing is written until a full preview
   (create / move-to-`_ingest` / reference / retroactive-ADRs / detected tier) is
   shown and explicitly approved.
6. **Idempotency.** `status: active` → reconcile mode (run `/docs-audit`, fill only
   gaps). A prior partial run → resume: keep already-written docs, propose only the
   rest.

**Handoff.** After adoption the ordinary triggers (§4) and the `doc-maintainer`
skill maintain everything — no special mode persists. The one recommended follow-up
is **`/docs-audit`**, because reconstructed architecture/API/data-model docs are
inferred from a first-pass scan and should be verified against reality once before
the project trusts them.
