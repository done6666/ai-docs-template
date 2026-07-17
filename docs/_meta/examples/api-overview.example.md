---
title: API Overview
tier: 1
type: reference
owns: "API-wide conventions: style, auth, versioning, errors, pagination"
does_not_own: "per-endpoint contracts (endpoints.md / openapi.yaml)"
status: current
updated: 2026-07-17
related: [docs/api/endpoints.md, docs/data-model.md]
---

# API Overview

> Cross-cutting rules for the HTTP API. Individual endpoints live in
> `endpoints.md`.

## Style & standards

REST over HTTPS. JSON request/response (`application/json`). Base URL `/api`.

## Authentication

Bearer JWT in the `Authorization` header. Access tokens live 15 min; refresh
tokens 30 days, rotated on use. Credentials never appear in query strings.

## Versioning

Path-based: `/api/v1/...`. A version is supported for 6 months after its successor
ships; removal is announced via `CHANGELOG.md`.

## Conventions

- **Errors:** `{ "error": { "code": "string", "message": "string", "details": {} } }`
  with a matching HTTP status.
- **Pagination:** cursor-based — `?cursor=&limit=` → `{ data, next_cursor }`.
- **Filtering / sorting:** `?filter[field]=value`, `?sort=-created_at`.
- **Idempotency:** mutating POSTs accept an `Idempotency-Key` header.

## Rate limiting

100 req/min per token. Responses carry `X-RateLimit-Remaining` and `Retry-After`.
