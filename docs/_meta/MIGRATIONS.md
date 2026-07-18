# Template Migrations

> Machine-actionable upgrade guide for `ai-docs-template`. `/docs-upgrade` reads
> this file and applies each version's **content migration** steps to a downstream
> project's docs, for every version between the project's `template_version`
> (in `docs/INDEX.md`) and the newly fetched `docs/_meta/VERSION`.
>
> This is NOT the human changelog (that's the repo's `CHANGELOG.md`). Entries here
> describe what an AI must **do to a project's content** when upgrading.

## How to read an entry

Each released version has one section:
- **Machinery:** what changed in the upstream-owned files (informational — those are
  overwritten wholesale on upgrade; nothing for the AI to do).
- **Content migration:** ordered steps the AI performs against the project's docs,
  or **"None (backward compatible)"** when project content stays valid as-is.
- **Breaking:** yes/no — whether content migration is required.

Apply sections in ascending version order. Preview all content changes and confirm
before writing (same safety gate as `/docs-adopt`).

---

## 1.3.0 — Implementation map (build ledger)

- **Machinery:** new `implementation-map.md` doc type + template — a build ledger
  (units as `[ ]`/`[~]`/`[x]`, a "how built" note + code path per done unit, a
  `Last implemented` pointer). Wired into tier triggers (§3), lifecycle triggers
  (§4), fact-ownership (§6), the read path (§14.1), `/docs-audit` (check 3b), the
  routing/load rules, and the `doc-maintainer` skill.
- **Content migration:** None (backward compatible). *Optional:* if the project
  already has substantial code, create `docs/implementation-map.md` from the
  template and back-fill the major done units (with brief notes + code paths) so the
  ledger reflects reality — or just let it accrue from the next unit onward.
- **Breaking:** no.

---

## 1.2.0 — Read-path optimization (task intake, grounding, token budget)

- **Machinery:** added `DOCS_SYSTEM.md §14` (the read path: task-intake procedure,
  layered reads, stop conditions, the anti-hallucination grounding rule, and the
  token economy). `CLAUDE.md` §2 reframed from "Read before you act" into a 4-step
  "Working a task (read path)" protocol. `INDEX` load-rules note + `doc-maintainer`
  skill orient step point at §14.
- **Content migration:** None (backward compatible). The `CLAUDE.md` change lands via
  the normal managed-block replacement during `/docs-upgrade`; project content is
  untouched.
- **Breaking:** no.

---

## 1.1.0 — Large-scale / federated mode (Tier 3)

- **Machinery:** added `DOCS_SYSTEM.md §13` (partitioning, federated INDEX,
  per-doc `covers`/`last_verified`, scoped/incremental audit, monorepo federation);
  Tier-2→3 escalation triggers (§3); `/docs-audit` gains an `[area]` argument +
  incremental/coverage modes; `tech-stack.md` guidance shifts to
  architecturally-significant deps (not exhaustive); front-matter gains optional
  `covers` and `last_verified`.
- **Content migration:** None (backward compatible). Existing docs stay valid.
  *Optional, only if the project is already very large:* if any doc (e.g.
  `architecture.md`, `data-model.md`) is over its cap, partition it per §13.1 and
  federate the INDEX per §13.2; trim `tech-stack.md` to significant deps per §13.5.
  Otherwise do nothing.
- **Breaking:** no.

---

## 1.0.0 — Initial release

- **Machinery:** full system — `CLAUDE.md` (managed block), `.claude/**`,
  `docs/_meta/**`, `.gitattributes`. Commands: `docs-init`, `docs-adopt`,
  `docs-audit`, `adr`, `feature`, `handoff`, `docs-upgrade`.
- **Content migration:** None (baseline).
- **Breaking:** no.

---

<!--
TEMPLATE FOR FUTURE ENTRIES — copy, fill, place ABOVE this comment in ascending
order. Illustrative example (do not apply; shown so maintainers see the shape):

## 2.0.0 — Example: tech-stack gains a Package column

- **Machinery:** tech-stack schema + `/docs-audit` now match a `Package` column
  (exact lockfile ids) instead of the friendly name.
- **Content migration:**
  1. Open `docs/tech-stack.md`. For each row in every stack table, insert a
     `Package` column holding the exact dependency id from the lockfile/manifest
     (e.g. `next-auth`), keeping the friendly name in `Choice`.
  2. Remove transitive/peer rows (`react-dom`, `@types/*`) if present.
  3. Bump the file's `updated:` date.
- **Breaking:** yes (audit will mis-report until the column exists).
-->

## Authoring a migration (maintainers)

When a change affects downstream **content** format:
1. Bump `docs/_meta/VERSION` (SemVer — MAJOR if content migration is required).
2. Add a section here for the new version with the two subsections above.
3. Keep steps concrete and AI-executable (name the file, the transformation, the
   source of truth). If content stays valid, say "None (backward compatible)".
