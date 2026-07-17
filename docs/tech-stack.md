---
title: Tech Stack
tier: 0
type: reference
owns: "the chosen technologies and their versions"
does_not_own: "why each was chosen (decisions/), system structure (architecture.md)"
status: not-bootstrapped
updated: <pending>
related: [docs/architecture.md, docs/decisions/README.md]
---

# Tech Stack

> ⚠️ **NOT BOOTSTRAPPED.** Run **`/docs-init`**. This is the SSOT for *what
> technology + which version*. The *why* lives in ADRs — link, don't restate.
> Keep this in sync with the lockfile/manifest (`/docs-audit` checks it).
>
> **Put the exact package identifier in the `Package` column** (e.g. `next-auth`,
> not "NextAuth") so `/docs-audit` matches it against the lockfile mechanically;
> use `Choice` for the human-friendly name. Omit transitive/peer packages
> (`react-dom`, `@types/*`) — list only dependencies a reader actually chooses.

## Frontend

| Layer | Choice | Package | Version | ADR |
|-------|--------|---------|---------|-----|
| <framework> | <friendly name> | `<pkg-id>` | | |

## Backend

| Layer | Choice | Package | Version | ADR |
|-------|--------|---------|---------|-----|
| <runtime/framework> | | `<pkg-id>` | | |

## Data

| Layer | Choice | Package | Version | ADR |
|-------|--------|---------|---------|-----|
| <database/cache> | | `<pkg-id>` | | |

## Infra / Tooling

| Layer | Choice | Package | Version | ADR |
|-------|--------|---------|---------|-----|
| <build/CI/host> | | `<pkg-id>` | | |

## Version policy

<Upgrade cadence, supported runtimes, how breaking bumps are handled.>
