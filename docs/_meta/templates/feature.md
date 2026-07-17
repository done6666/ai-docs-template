---
id: FEAT-NNNN
title: <feature name>
tier: 1
type: spec
owns: "the design of this one feature"
does_not_own: "requirements (requirements.md), endpoint contracts (api/), data model (data-model.md)"
status: draft           # draft | approved | building | shipped | archived
date: YYYY-MM-DD
requirements: []        # e.g. [REQ-014, REQ-015]
adrs: []                # e.g. [ADR-0009]
related: []
---

# FEAT-NNNN: <feature name>

> One-line summary of what this feature does and for whom.

## Summary

The user-facing capability in a short paragraph. Link the goal it serves in
`roadmap.md` / `project-brief.md`.

## User stories / acceptance criteria

- As a <user>, I can <do X> so that <benefit>.
- **Acceptance:** given <state>, when <action>, then <observable outcome>.

## UX notes

Flows, states (empty/loading/error), responsive/a11y considerations. Link
`conventions/ui-ux-guidelines.md`; do not restate the design system here.

## API changes

New/changed endpoints. Link `api/endpoints.md` (or `openapi.yaml`); do not restate
full contracts here.

## Data changes

New/changed entities. Link `data-model.md`.

## Rollout / flags

Feature flag, migration order, backward-compatibility notes.

## Open questions

- Q: … (resolve → move to an ADR or the relevant doc, then delete here)
