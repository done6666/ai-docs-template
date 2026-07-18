---
title: Guardrails
tier: 1
type: reference
owns: "project must/never rules, known pitfalls, and failed approaches (don't-retry)"
does_not_own: "positive coding style (conventions/), design rationale (decisions/), structural invariants (architecture.md)"
status: current
updated: 2026-07-18
---

# Guardrails

> The AI's "do NOT do X" memory — checked before writing code in an area. Prevents
> re-treading failed approaches, violating project invariants, and reintroducing bugs.

## Legend
**MUST / NEVER** (a hard rule) · **PITFALL** (a known trap) · **FAILED** (tried, doesn't work — don't retry).

## Data access
- **NEVER** import `db` directly in a route — go through `src/lib/repo/*`.
  > Why: enforces per-user scoping + query logging. Applies: `src/app/api/**`.
- **MUST** scope every query by `ownerId`.
  > Why: multi-tenant isolation; a missing scope leaks data. Fixed once in `a1b2c3d`.

## Rendering
- **FAILED** Edge runtime for the PDF route — `@react-pdf` needs Node APIs; use
  `export const runtime = "nodejs"`. Tried 2026-07-14.

## Caching
- **PITFALL** forgetting `await revalidatePath()` after a mutation → stale UI.
