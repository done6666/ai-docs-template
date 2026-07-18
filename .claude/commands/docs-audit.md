---
description: Read-only drift check — verify docs/ against the actual code and git, report mismatches
argument-hint: "[area]  (optional: audit one subsystem, e.g. billing)"
---

# /docs-audit — Documentation drift check

Verify that `docs/` still matches reality. **Read-only by default** — produce a
report first, then offer fixes. Follow the audit procedure in
`docs/_meta/DOCS_SYSTEM.md §8`.

## Scope (large projects)

- **Whole-repo** (no argument): run all checks across all docs. Fine for small/medium
  projects.
- **Scoped** — `/docs-audit <area>`: audit only that subsystem — its area index and
  the docs whose `covers:` globs fall in it. Use this at Tier 3, where a full audit
  doesn't fit one context (`DOCS_SYSTEM.md §13.6`).
- **Incremental:** for each doc with a `last_verified` (date/SHA), check only code
  paths in its `covers:` that changed since then (`git diff`); refresh `last_verified`
  when it matches. Cheap re-verification.
- **Coverage report:** list subsystems whose `last_verified` is old relative to their
  `covers:` paths' churn — the drift backlog.

## Checks

Run each and collect findings:

1. **Deps** — match `tech-stack.md`'s **`Package` column** (exact package ids)
   against the lockfile/manifest, not the human-friendly `Choice` name (so
   "NextAuth" vs `next-auth` doesn't false-flag). `tech-stack.md` lists only
   **architecturally-significant** technologies (§13.5), not every dependency: verify
   each *listed* package exists in the manifest, and flag only **framework/major**
   manifest deps that are undocumented — do **not** demand exhaustive parity. Ignore
   transitive/peer/incidental packages (`react-dom`, `@types/*`, utilities).
2. **Routes** — endpoints listed in `docs/api/*` match the router/source; flag
   missing or undocumented endpoints.
3. **Structure** — every path in `architecture.md`'s **Source map** resolves on
   disk; flag moved/renamed/deleted paths.
3b. **Implementation map** (if present) — each `[x]` unit's code path resolves (flag
   done units whose code is gone); and code that clearly implements a listed `[ ]`
   unit → flag the map as stale (unit built but not marked). Don't demand a unit for
   every file — the map tracks meaningful units, not every path.
3c. **Guardrails** (if present) — each entry's `Applies:` path/area resolves; flag a
   `MUST`/`NEVER` rule the code now visibly violates, and a `FAILED` note whose
   referenced code no longer exists. Guardrails are advisory memory, so report — don't
   auto-delete.
4. **State freshness** — `STATE.md` "Next steps" vs recent `git log`; flag if the
   branch or health looks stale relative to actual activity.
4b. **Seams** (if an `architecture` Seams table / `architecture/_seams.md` exists) —
   each seam's producer, consumer, and enforcement code paths resolve; flag a seam
   whose contract (event name, interface) no longer matches the code.
5. **Freshness & trust** — set `last_verified` (today/SHA) on every doc you confirm
   matches code, at any tier. Mark `status: suspect` in `INDEX.md` for docs where
   `last_verified` is missing, older than `updated`, or older than the last change to
   the code they cover/cite; `stale?` where `updated` lags related code churn. This
   is the boot-time trust signal the read path relies on (§15).
6. **Index integrity** — every content doc appears in an index and every index row
   resolves. In **federated mode** (§13.2): each doc appears in *its area index*
   (`docs/<area>/INDEX.md`) and every area index appears in the root INDEX
   **Subsystems** table. (`docs/_meta/**` and `docs/_ingest/**` are exempt.)
7. **Contradiction scan** — no two docs `own` the same fact class; no accepted ADR
   contradicts a later one without a `superseded_by` link.
7b. **Decision decay** (§17) — broken supersession chains (an ADR whose `superseded_by`
   target is missing, or a superseded ADR still shown as current in the register);
   silent contradictions (two `accepted` ADRs governing the same topic without a
   supersession/scoping); and stale context (ADRs whose cited constraints no longer
   hold — flag `context-stale`). Report the decay backlog.
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
