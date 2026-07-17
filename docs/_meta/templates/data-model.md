---
title: Data Model
tier: 1
type: reference
owns: "the logical data model: entities, relationships, invariants"
does_not_own: "physical schema/DDL (that lives in migrations/code)"
status: current
updated: YYYY-MM-DD
related: [docs/architecture.md]
---

# Data Model

> Logical model only. Physical schema lives in migrations/code — link paths, don't
> copy DDL.

## Entity overview

```mermaid
erDiagram
    USER ||--o{ ORDER : places
    ORDER ||--|{ ORDER_ITEM : contains
```

## Entities

### <Entity>
- **Fields:** name (type, constraints) …
- **Invariants:** rules that must always hold (e.g. "email is unique").
- **PII:** which fields are personal data.

## Relationships

| From | To | Cardinality | Notes |
|------|----|-------------|-------|
| User | Order | 1..* | … |

## Data lifecycle

Retention, soft-delete, anonymisation. Migrations strategy → link `operations/` if present.
