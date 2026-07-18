# Changelog

All notable, user-visible changes to this project are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versioning: [SemVer](https://semver.org/spec/v2.0.0.html).

> Claude Code adds an entry under `[Unreleased]` whenever a user-visible change
> ships. Detailed *why* lives in ADRs; roadmap "Shipped" only summarises.
>
> **Downstream migration steps** (what an adopting project must do to upgrade) live
> in `docs/_meta/MIGRATIONS.md`, not here.

## [Unreleased]

## [1.6.0] - 2026-07-17

### Added
- Seams & multi-subsystem tasks (`DOCS_SYSTEM.md §16`): a **seam** is a
  cross-subsystem contract (event / internal API / shared invariant) recorded as
  edge · contract · producer · consumer · enforcement path, owned by `architecture`
  (a Seams table at Tier 2+, `architecture/_seams.md` at Tier 3). A task spanning
  multiple subsystems is handled by mapping the blast radius, gathering each
  subsystem shallow + the seam contract (edges, not full nodes), planning against
  the seams, ordering by dependency, and a completeness check — so cross-cutting
  changes stay both complete (no missed subsystem) and cheap (no reading everything
  or guessing the wiring).
- `architecture.md` template gains a Seams section; `/docs-audit` verifies seam
  producer/consumer/enforcement paths (check 4b).

## [1.5.0] - 2026-07-17

### Added
- Trust & verification model (`DOCS_SYSTEM.md §15`): resolves the tension between
  cheap doc reads and stale docs. Trust is calibrated by stakes × volatility ×
  freshness; a volatile, high-stakes fact you'll code against is spot-checked
  **narrowly** against the code the doc points to (O(1), not a re-scan) before you
  depend on it — so a stale doc no longer yields confident-wrong code.
- `last_verified` front-matter generalized to all tiers (trust-time), distinct from
  `updated` (touch-time); `INDEX` `status` gains `suspect`; `/docs-audit` sets
  `last_verified` on confirmed docs and flags the rest `suspect`.

### Changed
- Grounding rule (§14.4) and `CLAUDE.md` read path now include "don't follow a
  suspect doc blindly"; §14.5 notes verification is part of the token economy, not
  opposed to it. `doc-maintainer` skill sets `last_verified` and cites ground-truth
  code paths for volatile facts.

## [1.4.0] - 2026-07-17

### Added
- Guardrails (`guardrails.md`, Tier 1): the AI's negative-knowledge memory —
  project **MUST/NEVER** rules, known **PITFALL**s, and **FAILED** approaches
  (don't-retry), organized by area so a session scans only what it's editing.
  Checked before writing code (grounding rule §14.4) to avoid re-treading failed
  paths, violating project invariants, and reintroducing fixed bugs — a cheap read
  that saves an expensive wrong attempt.
- STATE→guardrails **promotion path**: durable "Do-not-repeat" learnings are
  promoted to `guardrails.md` instead of dying on the next `STATE.md` overwrite.
- Wired into tier + lifecycle triggers, fact-ownership, `/docs-audit` (check 3c),
  routing/load rules, and the `doc-maintainer` skill.

## [1.3.0] - 2026-07-17

### Added
- Implementation map (`implementation-map.md`, Tier 1): the AI's build ledger — a
  checklist of implementation units (`[ ]`/`[~]`/`[x]`), a tight "how it was built"
  note + code path per done unit, and a `Last implemented` pointer. Lets "what's
  left / what was last built / how was X built" be answered from one cheap read
  instead of scanning the codebase. Wired into tier + lifecycle triggers, the
  fact-ownership matrix, the read path (§14.1), `/docs-audit`, routing/load rules,
  and the `doc-maintainer` skill.
- `DOCS_SYSTEM.md §0` now states explicitly that `docs/` content is written **for
  the coding AI** (to stay faithful and efficient), not for humans — the root README
  and `/docs-init` interview being the only human-facing exceptions.

## [1.2.0] - 2026-07-17

### Added
- Read-path optimization (`DOCS_SYSTEM.md §14`): an explicit task-intake procedure
  (classify from the prompt's nouns → route to the minimal doc set → open only
  those), layered reads (INDEX row → front-matter `owns` → summary → section anchor
  → body), stop conditions so the AI doesn't get lost, an anti-hallucination
  grounding rule ("if it's in neither the docs nor the code you checked, say
  'not documented' — never invent"), and the token economy.

### Changed
- `CLAUDE.md` §2 reframed from "Read before you act" into a tight 4-step "Working a
  task (read path)" protocol (locate → read shallow-first → ground → resume fast).
- `doc-maintainer` skill and `INDEX` load rules now point at the §14 read path.

## [1.1.0] - 2026-07-17

### Added
- Large-scale / federated mode (Tier 3): `DOCS_SYSTEM.md §13` — partition an
  overflowing doc into a directory + index (`architecture/<subsystem>.md`,
  `data-model/<domain>.md`), federated index-of-indexes, monorepo federation.
- Per-doc `covers` + `last_verified` front-matter for per-subsystem freshness.
- `/docs-audit` gains an `[area]` argument plus incremental and coverage-report
  modes for auditing large repos a subsystem at a time.
- Tier-2 → Tier-3 escalation triggers (§3).

### Changed
- `tech-stack.md` documents **architecturally-significant** technologies only (link
  the lockfile for the full list); `/docs-audit`'s dep check no longer demands
  exhaustive parity — it flags undocumented framework/major deps instead.

## [1.0.0] - 2026-07-17

### Added
- Initial `ai-docs-template` scaffolding: AI-managed, tiered `docs/` system with
  `CLAUDE.md` rules, `doc-maintainer` skill, and `/docs-init`, `/docs-audit`,
  `/adr`, `/feature` commands.
- Concurrency support: dual-mode `STATE.md` (solo + parallel dashboard), per-feature
  `## Current state` resume cursor, `/handoff` command, `.gitattributes`
  (EOL normalization + `CHANGELOG merge=union`), and `DOCS_SYSTEM.md §10`
  (branches, worktrees, regenerate-don't-merge).
- Existing-project adoption: `/docs-adopt` (deep scan, `_ingest/` quarantine,
  tier detection, evidence-only retroactive ADRs), `/docs-init` redirect heuristic,
  retroactive-ADR flag in the ADR template, and `DOCS_SYSTEM.md §11`.
- Template versioning: `docs/_meta/VERSION` + `MIGRATIONS.md`, `/docs-upgrade`
  command, `CLAUDE.md` managed-block markers (machinery vs project rules),
  `template_version`/`template_source` in `INDEX`, and `DOCS_SYSTEM.md §12`.

### Changed
- Live-test fixes (from a full `/docs-init` dry run on a sample Next.js project):
  `tech-stack.md` gains an exact-`Package`-id column and `/docs-audit` matches
  against it (so friendly names like "NextAuth" vs `next-auth` no longer false-flag,
  and peer/transitive deps are ignored); `INDEX.md` size cap raised 600 → 900 with a
  split-the-Areas-manifest escape hatch, since static routing/load tables were
  already near the old cap at Tier-0.
