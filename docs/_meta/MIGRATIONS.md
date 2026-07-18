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

## 1.9.0 — Learnings from adopting a real mature project

Applied after test-driving `/docs-adopt` on a large real project (Nx monorepo) that
already had a sophisticated 493-doc system — which exposed a flaw and two good ideas:
- **`/docs-adopt` overlay mode (§11, command Step 0.5):** detect a project that
  already has an organized docs system and switch to **overlay** (map + gap-analysis
  + add only what's missing, in *their* conventions, strictly additively) instead of
  quarantine-and-regenerate, which would bury a mature corpus under defaults.
- **`keys.md` name registry** (Tier 1): stable key → mutable display name + role, so
  renames and i18n change one file, not the code. Borrowed from the real project's
  "key is permanent, name is mutable" discipline.
- **Implementation-map** units gain optional `(depends: …)` ordering and
  `(ref: <commit/PR>)` provenance.
- **Labeled mirrors (§6):** controlled duplication is allowed *only* when the echo is
  explicitly labeled a mirror pointing to its authoritative home; unlabeled
  restatement stays forbidden.
- **Content migration:** None (backward compatible). New optional doc/fields; adopt a
  `keys.md` if the project has renamable identifiers, otherwise ignore.
- **Breaking:** no.

---

## 1.8.0 — Simplifications (from a live end-to-end test)

First *reducing* release. A real multi-scenario run surfaced three frictions, fixed here:
- **Status SSOT (de-dup):** done/next lived in three places (`STATE` Next steps,
  feature `## Current state`, `implementation-map`) → drift. Now the map is the sole
  done/next queue; `STATE` keeps only the immediate focus and **points** to the map;
  a feature's `## Current state` is for in-flight work and **collapses to one line
  when shipped**. (§4, §6, STATE/feature templates.)
- **Leaner always-loaded `CLAUDE.md`** (~1400 → ~840 tokens): read-path/trust/seams/
  decisions guidance compressed; the full trigger table now lives in §4 + the skill,
  with only the core triggers in `CLAUDE.md`.
- **Proportionality (§4):** apply triggers in proportion to the change and batch doc
  updates at checkpoints — a trivial change doesn't need the full ceremony.
- **Content migration:** None (backward compatible). Existing docs stay valid;
  they just get leaner going forward. *Optional cleanup:* trim `STATE.md` "Next
  steps" to a pointer, and collapse shipped features' `## Current state`.
- **Breaking:** no. (`CLAUDE.md` updates via the normal managed-block replacement.)

---

## 1.7.0 — Decisions at scale (register, currency, decay)

- **Machinery:** new `DOCS_SYSTEM.md §17` — `decisions/README.md` evolves from a flat
  chronological table into a topic-grouped **register** (current-governing decision
  per topic) as ADRs accumulate; a **currency** signal (`context_review` +
  `context-stale`) for decisions whose rationale rotted while the decision stands; a
  retrieval rule (read the register, not the raw log; a superseded ADR isn't current
  truth); and `/docs-audit` decay checks (broken chains, silent contradictions, stale
  context). ADR template gains `context_review`; wired into §4/§6, `CLAUDE.md`, `INDEX`,
  and the `doc-maintainer` skill.
- **Content migration:** None (backward compatible). The flat ADR table stays valid;
  reorganize into the register only when it stops scaling. *Optional:* add `context_review`
  to ADRs whose rationale you want re-checked.
- **Breaking:** no.

---

## 1.6.0 — Seams & multi-subsystem tasks (lateral context)

- **Machinery:** new `DOCS_SYSTEM.md §16` — **seams** (cross-subsystem contracts:
  edge · contract · producer · consumer · enforcement path, owned by `architecture`;
  a Seams table at Tier 2+, `architecture/_seams.md` at Tier 3) + a procedure for
  multi-subsystem tasks (map the blast radius → gather laterally but shallow → plan
  against seams → order by dependency → completeness-check). Wired into §4 lifecycle,
  §6 fact-ownership, §13.1 partitioning; `architecture` template gains a Seams
  section; `CLAUDE.md` read path, `INDEX` load rules, `/docs-audit` (check 4b), and
  the `doc-maintainer` skill updated.
- **Content migration:** None (backward compatible). *Optional:* when a project has
  real cross-subsystem contracts, add a Seams table to `architecture.md` (or
  `architecture/_seams.md` at scale). Existing docs stay valid.
- **Breaking:** no.

---

## 1.5.0 — Trust & verification (don't follow stale docs blindly)

- **Machinery:** new `DOCS_SYSTEM.md §15` — a read-time trust model (trust =
  stakes × volatility × freshness; verify volatile high-stakes facts *narrowly*
  against the code the doc points to). `last_verified` front-matter generalized from
  Tier-3-only to all tiers (trust-time, distinct from `updated`/touch-time). Grounding
  rule (§14.4) + `CLAUDE.md` read path gain a "don't follow a suspect doc blindly"
  step; `INDEX` `status` gains `suspect`; `/docs-audit` sets `last_verified` at all
  tiers and flags `suspect`; `doc-maintainer` skill updated.
- **Content migration:** None (backward compatible). `last_verified` is optional;
  add it to volatile docs (`data-model`, `api/*`, `architecture`) as `/docs-audit`
  confirms them, or let it accrue. Existing docs stay valid.
- **Breaking:** no.

---

## 1.4.0 — Guardrails (negative knowledge)

- **Machinery:** new `guardrails.md` doc type + template — project must/never rules,
  known pitfalls, and failed approaches (don't-retry). Wired into tier triggers (§3),
  lifecycle triggers (§4), fact-ownership (§6), the STATE→guardrails promotion path
  (§7), the grounding rule (§14.4), `/docs-audit` (check 3c), routing/load rules, the
  `doc-maintainer` skill, and the STATE template's Do-not-repeat note.
- **Content migration:** None (backward compatible). *Optional:* create
  `docs/guardrails.md` from the template and seed it with any standing must/never
  rules or known pitfalls the project already relies on; otherwise let it accrue as
  failed approaches/rules are learned.
- **Breaking:** no.

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
