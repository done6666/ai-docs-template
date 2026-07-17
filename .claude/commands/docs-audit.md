---
description: Read-only drift check — verify docs/ against the actual code and git, report mismatches
---

# /docs-audit — Documentation drift check

Verify that `docs/` still matches reality. **Read-only by default** — produce a
report first, then offer fixes. Follow the audit procedure in
`docs/_meta/DOCS_SYSTEM.md §8`.

## Checks

Run each and collect findings:

1. **Deps** — match `tech-stack.md`'s **`Package` column** (exact package ids)
   against the lockfile/manifest, not the human-friendly `Choice` name (so
   "NextAuth" vs `next-auth` doesn't false-flag). Every listed package must exist in
   the manifest, and every *direct, chosen* dependency should appear in the table.
   Ignore transitive/peer packages (`react-dom`, `@types/*`, framework-bundled deps).
2. **Routes** — endpoints listed in `docs/api/*` match the router/source; flag
   missing or undocumented endpoints.
3. **Structure** — every path in `architecture.md`'s **Source map** resolves on
   disk; flag moved/renamed/deleted paths.
4. **State freshness** — `STATE.md` "Next steps" vs recent `git log`; flag if the
   branch or health looks stale relative to actual activity.
5. **Freshness** — any doc whose `updated` is old relative to related code churn →
   propose marking `status: stale?` in `INDEX.md`.
6. **Index integrity** — every doc file on disk appears in `INDEX.md`; every INDEX
   row points to a file that exists.
7. **Contradiction scan** — no two docs `own` the same fact class; no accepted ADR
   contradicts a later one without a `superseded_by` link.
8. **Cross-links** — every `related[]` entry and routing-table path resolves.

## Output

Print a table:

| doc | claim | reality | severity |
|-----|-------|---------|----------|

Severity: `high` (contradicts code / broken link), `medium` (stale), `low` (cosmetic).

## Then

- Offer to **auto-fix mechanical drift** (timestamps, INDEX rows, stale flags,
  broken links) — apply only after the user says yes.
- **List judgment calls** (e.g. "architecture.md describes the old module layout")
  for the user to confirm before you rewrite them.
- If everything matches, update `INDEX.md` front-matter `last_verified: <today>`.
