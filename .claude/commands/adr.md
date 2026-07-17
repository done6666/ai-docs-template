---
description: Scaffold the next Architecture Decision Record from the template
argument-hint: "<decision title>"
---

# /adr — New Architecture Decision Record

Create a new ADR for: **$ARGUMENTS**

## Steps

1. Find the next number: scan `docs/decisions/` for the highest `ADR-NNNN-*.md`
   and increment (zero-padded 4 digits).
2. Slugify the title (kebab-case) → `docs/decisions/ADR-NNNN-<slug>.md`.
3. Copy `docs/_meta/templates/adr.md`; fill `id`, `title`, `date` (today),
   `status: accepted` (or `proposed` if not yet settled).
4. Write `Context · Decision · Consequences · Alternatives Considered` from the
   current discussion. Capture the **why** — that's the whole point.
5. Add a row to `docs/decisions/README.md`'s status table.
6. If the decision affects structure, link the ADR from `docs/architecture.md`
   (and set the relevant `ADR` cell in `tech-stack.md` if it's a tech choice).
7. Bump `updated` on every file you touched.

If `$ARGUMENTS` is empty, ask the user for the decision title (in the project's
language) before proceeding.
