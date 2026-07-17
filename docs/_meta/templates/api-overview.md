---
title: API Overview
tier: 1
type: reference
owns: "API-wide conventions: style, auth, versioning, errors, pagination"
does_not_own: "per-endpoint contracts (endpoints.md / openapi.yaml)"
status: current
updated: YYYY-MM-DD
related: [docs/api/endpoints.md, docs/data-model.md]
---

# API Overview

> Cross-cutting API rules. Individual endpoints live in `endpoints.md` (or
> `openapi.yaml` at Tier 2).

## Style & standards

REST / GraphQL / RPC; base URL; content types.

## Authentication

Scheme (e.g. Bearer JWT), token lifecycle, where credentials go (never in query strings).

## Versioning

How versions are expressed (path/header) and the deprecation policy.

## Conventions

- **Errors:** the standard error envelope shape.
- **Pagination:** cursor/offset, params.
- **Filtering / sorting:** conventions.
- **Idempotency:** keys where relevant.

## Rate limiting

Limits and the headers that communicate them.
