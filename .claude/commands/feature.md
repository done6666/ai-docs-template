---
description: Scaffold the next feature spec from the template (creates the features/ area on first use)
argument-hint: "<feature name>"
---

# /feature — New feature spec

Create a spec for: **$ARGUMENTS**

## Steps

1. If `docs/features/` doesn't exist yet, this is a **Tier 0 → Tier 1** escalation:
   create `docs/features/README.md` (feature index), add the `features/` row to
   `docs/INDEX.md`'s Areas table, and log the escalation in the INDEX ledger.
2. Find the next number: highest `FEAT-NNNN-*.md` + 1 (zero-padded 4 digits).
3. Slugify the name → `docs/features/FEAT-NNNN-<slug>.md`.
4. Copy `docs/_meta/templates/feature.md`; fill `id`, `title`, `date`,
   `status: draft`. Link any related `requirements[]` (REQ-IDs) and `adrs[]`.
5. Fill `Summary` and `User stories / acceptance criteria` from the discussion;
   leave API/Data sections to be filled as design firms up (link, don't restate).
6. Add a row to `docs/features/README.md`.
7. Set this feature as the current focus in `docs/STATE.md`.
8. Bump `updated` on every file you touched.

Write this spec **before** implementing the feature. If `$ARGUMENTS` is empty, ask
for the feature name (in the project's language) first.
