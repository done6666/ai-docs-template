---
description: Bootstrap the docs/ system — interview the user and generate the Tier-0 documentation
---

# /docs-init — Bootstrap the documentation system

You are bootstrapping this project's `docs/` from the `ai-docs-template` skeleton.
The human will NOT write docs — you generate them. Read
`docs/_meta/DOCS_SYSTEM.md` first if you haven't this session.

## Idempotency check (do this first)

Read `docs/INDEX.md` front-matter. If `status: active` (already bootstrapped),
**do not overwrite** — switch to *reconcile mode*: report what exists, run the
`/docs-audit` checks, and offer to fill only missing/stale Tier-0 docs. Otherwise
proceed with a fresh bootstrap below.

## Step 0.5 — Redirect if this is an existing project

Before interviewing, check for **substantial existing code**. If ANY holds — the
repo has >~15 tracked source files, OR >~20 commits in `git log`, OR a non-template
README with real project content, OR any pre-existing `docs/**` content, ADRs, or
wiki — this is NOT greenfield. Stop and tell the user (in their language) to run
**`/docs-adopt`** instead, which deep-scans the code and ingests existing docs
without loss. Proceed with `/docs-init` only for a genuinely empty/scaffold repo.

## Step 1 — Infer silently

Scan the repo before asking anything:
- Manifests: `package.json`, `pyproject.toml`, `go.mod`, `Cargo.toml`, `composer.json`, etc. → stack + deps.
- Framework/config files (Next.js, Vite, Nuxt, Django, Rails, etc.) → project type (web?) and structure.
- `src/` / app layout → modules for the architecture source map.
- Existing `README`, and `git log` → intent and activity.

Build a draft model of stack, type, and structure from this.

## Step 2 — Ask a short, batched interview (in the user's language)

Ask **all** of these in ONE message, numbered, and wait for the answers. Keep it to
these ~6 — never an interrogation. Phrase them in **the user's language** (the
language they have been writing to you in):

1. What is this project, and **who is it for**? (a sentence or two)
2. What are the **1–3 most important goals** for the next milestone?
3. Is anything explicitly **out of scope** (a non-goal)?
4. Any **hard constraints**? (must use X, must run on Y, a deadline…)
5. My inferred tech stack is: **<inferred stack>** — correct? Anything to add/remove?
6. What should the project's **display name** be?
7. *(only if the project has a user-facing UI)* **Design:** name 1–2 sites/products
   whose look you want as the reference, and the feel you're after
   (minimal / playful / corporate / dense…). One line is enough — this seeds the
   design SSOT so the UI doesn't drift session to session.

If the stack was fully inferable, still confirm it in Q5. Everything else
(architecture skeleton, tech-stack table, initial state) you draft yourself.

## Step 3 — Draft Tier-0 from answers + inference

Populate, using `docs/_meta/templates/*` and the existing stubs:
- `docs/project-brief.md` — from Q1–Q4, Q6.
- `docs/tech-stack.md` — from inference + Q5 (fill the tables; leave ADR column blank until a decision is recorded).
- `docs/architecture.md` — Overview + a Source map from the actual directory tree (even if skeletal); Components from what exists.
- `docs/STATE.md` — `Now` = "project bootstrapped"; `Next` = the immediate first action (the Q2 milestone goals seed `roadmap.md` when it's created, not a re-listed plan in STATE); `health: green`; `session: 1`; `branch` = current branch.
- `docs/INDEX.md` — set front-matter `project_type`, `current_tier: 0`, `status: active`, `last_verified: <today>`, `template_version` (= contents of `docs/_meta/VERSION`), and `template_source` (the template repo URL this project came from; if unknown, ask once and record it); refresh the `updated`/`status` cells to `fresh`.
- **UI projects only:** `docs/conventions/ui-ux-guidelines.md` from
  `_meta/templates/ui-ux-guidelines.md`, seeded with the Q7 answer (references +
  tone; tokens stay `<pending>` until real design decisions land). This is the one
  Tier-1 doc created at bootstrap — its trigger is "the project has a UI" (§4);
  list it in INDEX Areas.
- Leave `ADR-0001` as-is (it already records adopting the system).

Write doc **content in the project's own language** (match the user's answers);
keep the structural labels/front-matter in English.

Respect size caps (`DOCS_SYSTEM.md §7`): STATE ≤ ~400 tokens, INDEX ≤ ~900.

## Step 4 — Preview & confirm (in the user's language)

Before writing, show a compact preview: the file list + a 2–3 line summary of each.
Ask (in the user's language): **"Shall I create these?"** Wait for a yes. This is
the one confirmation gate.

## Step 5 — Write & report (in the user's language)

Write the files, then print a short note in the user's language:
- Which files were created,
- That from now on the docs update **automatically** as code is written,
- That `/docs-audit` can be run anytime for a manual consistency check.

Then **offer curated skills** (optional, one line): if the project's signals match
the catalog (`docs/_meta/skills-catalog.md`), mention that `/docs-skills` can
recommend 2–3 vetted skills for this stack — don't run the install flow unless the
user says yes.

Do **not** create other Tier-1/2 docs now — they appear when their triggers fire
(the UI-project `ui-ux-guidelines.md` above is the deliberate exception).
