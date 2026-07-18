---
title: Architecture Decision Records — Index
tier: 0
type: index
owns: "the status index of all ADRs"
does_not_own: "the decisions themselves (each ADR-NNNN-*.md file)"
status: current
updated: 2026-07-18
related: [docs/architecture.md, docs/_meta/DOCS_SYSTEM.md]
---

# Architecture Decision Records

> One decision per file: `ADR-NNNN-<slug>.md`. Records are **append-only** — a
> reversed decision is marked `superseded`, never deleted. Numbers are zero-padded
> and monotonic. Create new ADRs with `/adr "<title>"` or from
> `_meta/templates/adr.md`.
>
> This flat table is fine while there are few ADRs. **As decisions accumulate or
> supersession chains appear, reorganize this file into a topic-grouped *register*
> that shows only the currently-governing decision per topic** — so "what governs
> auth now?" is one cheap read, not a walk through the whole log
> (`_meta/DOCS_SYSTEM.md §17`). The ADR files stay the immutable *why*; this becomes
> the current-standing index.

| ID | Title | Status | Date |
|----|-------|--------|------|
| [ADR-0001](ADR-0001-adopt-docs-system.md) | Adopt the AI-managed docs system | accepted | 2026-07-17 |

<!--
Register form (adopt when the flat table stops scaling), current standing per topic:

## Auth
- **Current:** [ADR-0119](...) — JWT sessions w/ refresh rotation. (supersedes 0042, 0007)
## Data
- **Current:** [ADR-0180](...) — Postgres + Drizzle.  ⚠ context-stale: rationale cited Heroku; now AWS.
## API
- **Current:** [ADR-0050](...) REST — EXCEPT reporting → [ADR-0181](...) GraphQL.
### Superseded / historical → see each ADR's chain or docs/_archive/.
-->

