---
title: Keys — Name Registry
tier: 1
type: reference
owns: "the mapping from stable keys (permanent identity) to display names (mutable) + roles"
does_not_own: "term definitions (glossary.md); the code that uses the keys"
status: current
updated: YYYY-MM-DD
---

# Keys — Name Registry

> **The key is the permanent identity; the display name is mutable and lives ONLY
> here.** Code and docs reference the stable *key* (e.g. `billing.invoice.create`),
> never the display text. A rename changes the name in this one file — nothing else.
> This is what makes renames and i18n safe: one edit, zero code/doc churn.

## Convention

- Keys are stable, lowercase, namespaced (`<area>.<entity>.<action>`), in English.
- A key, once shipped, **never changes.** Only its display name may change — here.
- Prose uses the **role / registry name**, not a raw key or a brand/vendor name.

## Registry

| Key | Display name | Role / notes |
|-----|--------------|--------------|
| `<area>.<thing>` | <user-facing name> | <what it is; where used> |

<!--
Create this doc (Tier 1) when the project has stable identifiers that carry a
user-facing name and could be renamed — feature keys, permission keys, plan/product
keys, event names, enums with labels. It is distinct from `glossary.md` (which
defines *terms*): keys.md guarantees rename/i18n safety by giving every identity a
stable key whose display name is edited in exactly one place.
-->
