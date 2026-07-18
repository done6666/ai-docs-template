---
id: ADR-NNNN
title: <short imperative title>
tier: 0
type: decision
owns: "the rationale for this one decision"
does_not_own: "the current tech list (tech-stack.md), the structure it affects (architecture.md)"
status: proposed        # proposed | accepted | superseded | deprecated
date: YYYY-MM-DD
supersedes: []          # e.g. [ADR-0003]
superseded_by: null     # e.g. ADR-0012
reconstructed: false    # true when reverse-engineered from code during /docs-adopt
context_review: null    # YYYY-MM-DD if the rationale should be re-checked; see context-stale (§17.2)
related: []
---

# ADR-NNNN: <title>

> One-line summary of the decision and why it matters.

<!-- Include this banner ONLY when reconstructed: true -->
> **Reconstructed retroactively** from the codebase during docs adoption. The
> decision is evident in code (see the paths in `related`); the rationale below is
> inferred and unconfirmed unless a line cites a human-confirmed source.

## Context

The forces at play: constraints, requirements, and the problem that forced a
choice. What is true right now that makes this decision necessary?

## Decision

What we chose, stated in active voice ("We will use X"). Be specific and testable.

## Consequences

- **Positive:** what this makes easier/safer/faster.
- **Negative:** what it costs, what it rules out, new risks.
- **Follow-ups:** any work this decision creates.

## Alternatives Considered

- **<Option B>** — why not.
- **<Option C>** — why not.
