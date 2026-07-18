# Examples (reference only)

These are **filled-in examples** of Tier-1 docs, shown so you can see what a
populated doc looks like. They are **not** part of the live docs tree and are not
read at session start.

Claude Code creates the real versions at their canonical paths (`docs/features/`,
`docs/api/`, `docs/conventions/`) when a trigger fires (see
`docs/_meta/DOCS_SYSTEM.md §3–4`). Blank schemas live in `docs/_meta/templates/`.

| Example | Demonstrates | Canonical path when real |
|---------|--------------|--------------------------|
| `FEAT-0001-example.md` | a feature spec | `docs/features/FEAT-NNNN-<slug>.md` |
| `api-overview.example.md` | API-wide conventions | `docs/api/api-overview.md` |
| `ui-ux-guidelines.example.md` | web design-system reference | `docs/conventions/ui-ux-guidelines.md` |
| `implementation-map.example.md` | the build ledger (done/next + how-notes) | `docs/implementation-map.md` |
| `guardrails.example.md` | negative knowledge (must/never · pitfalls · failed) | `docs/guardrails.md` |
