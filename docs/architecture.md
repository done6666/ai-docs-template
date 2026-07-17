---
title: Architecture
tier: 0
type: explanation
owns: "system structure, boundaries, cross-cutting invariants, source map, tech philosophy"
does_not_own: "technology versions (tech-stack.md), decision rationale (decisions/), signatures/file trees (code)"
status: not-bootstrapped
updated: <pending>
related: [docs/tech-stack.md, docs/decisions/README.md]
---

# Architecture

> ⚠️ **NOT BOOTSTRAPPED.** Run **`/docs-init`**. Sections below are the schema.
> This doc owns *structure and invariants*, not code detail — link paths, don't
> copy signatures or file trees.

## Overview

<≤5 lines: the shape of the system at a glance.>

## Components

C4 Level-2 (containers): apps, services, datastores, queues.

| Component | Responsibility | Talks to |
|-----------|----------------|----------|
| <name> | <what it does> | <deps> |

```mermaid
flowchart LR
  User --> Web
  Web --> API
  API --> DB[(Database)]
```

## Boundaries & data flow

<2–4 critical request/data paths, described briefly.>

## Invariants

<Rules that must always hold across the system — the things a change must not break.>

## Tech philosophy

<Guiding principles: e.g. "server-first", "typed end-to-end". Link ADRs for each.>

## Source map

| Path | Responsibility |
|------|----------------|
| `src/...` | <what lives here> |
