---
title: Current State
tier: 0
type: index
owns: "the live working-memory snapshot / dashboard of active workstreams"
does_not_own: "per-workstream detail (that lives in each feature spec's ## Current state), decisions (decisions/), history (CHANGELOG.md)"
status: current
health: green           # green | yellow (blocked) | red (broken build)
---
<!-- `updated` lives in the body, not front-matter, so parallel rewrites don't churn a metadata field. -->

# Current State

> Keep this SMALL and **overwrite it, don't append**. It is a *regenerated
> snapshot* — on a merge conflict do NOT hand-merge; take either side and rewrite
> from the branch list + feature specs (`DOCS_SYSTEM.md §10`). Promote anything
> with lasting value (a decision, a learned constraint, a term) to its owner doc
> before dropping it from here.

<!--
Two modes. Use SOLO for single-branch/single-session work (the common case). Switch
to DASHBOARD only when ≥2 workstreams are active in parallel (branches/worktrees).
Don't add dashboard machinery to a project that has no parallel work.
-->

## ── SOLO MODE (default; ≤ ~400 tokens) ──

_Updated: YYYY-MM-DD · branch: `<branch>` · session: N_

### Now
One paragraph: what is being worked on and its immediate status.

### In progress
- [ ] <task> — <rough % / state>

### Next steps
1. <ordered, resumable next action>

### Open questions
- Q: <question blocking a clean decision>

### Blockers
- <blocker, or "None.">

### Do-not-repeat (learned this session)
- <gotcha a fresh session would otherwise rediscover the hard way>

### Uncommitted work
- <files modified but not committed, or "Working tree clean.">

## ── DASHBOARD MODE (≥2 parallel workstreams; ≤ ~200 tokens) ──

_Updated: YYYY-MM-DD_

> One row per in-flight workstream. Live detail lives in each linked spec's
> `## Current state`. A row changes when a workstream starts/ends — not per step.
> Before claiming a workstream, write its row; if a fresh row for your branch is
> owned by another agent, coordinate — don't stomp.

| Workstream | Scope | Branch | Agent | Detail | Health |
|------------|-------|--------|-------|--------|--------|
| FEAT-0007 checkout | web | feat/checkout | cc-1 | features/FEAT-0007-checkout.md#current-state | green |

### Shared blockers
- None.

### Do-not-repeat (repo-wide)
- None.
