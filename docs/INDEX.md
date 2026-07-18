---
schema: index/v1
project_type: unknown       # web | api | library | cli | service | ...  (set by /docs-init)
current_tier: 0
last_verified: <pending>    # set when an agent last confirmed INDEX matches reality
status: not-bootstrapped    # not-bootstrapped | active
template_version: <set on bootstrap>   # ai-docs-template version this project is on (see docs/_meta/VERSION)
template_source: <set on bootstrap>    # URL to pull upgrades from (used by /docs-upgrade)
---

# Documentation Manifest

> **Boot read #1.** Read `CLAUDE.md`, then this file, then `STATE.md`. Use the
> tables and rules below to load only what a task needs — never crawl the tree.
>
> **This project is NOT bootstrapped yet.** Run **`/docs-init`** (empty/new repo) or
> **`/docs-adopt`** (a repo that already has substantial code) to generate the docs.
> Until then, the rows below describe the *skeleton*.

## Core (Tier 0 — always available)

| file | purpose | updated | tokens~ | status |
|------|---------|---------|---------|--------|
| STATE.md | resume point / live working memory | <pending> | 300 | not-bootstrapped |
| project-brief.md | vision, users, scope, non-goals | <pending> | 500 | not-bootstrapped |
| architecture.md | system shape, boundaries, invariants, source map | <pending> | 900 | not-bootstrapped |
| tech-stack.md | technologies + versions (SSOT) | <pending> | 400 | not-bootstrapped |
| decisions/README.md | ADR status index | 2026-07-17 | 200 | fresh |
| _meta/DOCS_SYSTEM.md | full spec / constitution | 2026-07-17 | 2200 | fresh |

## Areas (Tier 1/2 — created on trigger, then listed here)

| file | covers | tier | updated | tokens~ | status |
|------|--------|------|---------|---------|--------|
| _(none yet — added as the project grows)_ | | | | | |

## Routing table — "I need to record… → write here"

| To record… | Canonical path | Tier |
|------------|----------------|------|
| A structural / tech decision (the *why*) | `decisions/ADR-NNNN-<slug>.md` | 0 |
| A technology or version (the *what*) | `tech-stack.md` | 0 |
| System structure / boundary / invariant | `architecture.md` | 0 |
| Vision / scope / non-goal change | `project-brief.md` | 0 |
| Live task status / next steps | `STATE.md` | 0 |
| An implementation unit finished (mark done + how-note) | `implementation-map.md` | 1 |
| A normative requirement | `requirements.md` (REQ-ID) | 1 |
| A feature's design | `features/FEAT-NNNN-<slug>.md` | 1 |
| An endpoint contract | `api/endpoints.md` → `api/openapi.yaml` | 1→2 |
| API-wide conventions | `api/api-overview.md` | 1 |
| A logical entity / relationship | `data-model.md` | 1 |
| A domain term | `glossary.md` | 1 |
| A coding / naming / UI standard | `conventions/*.md` | 1 |
| A shipped, user-visible change | `CHANGELOG.md` (`[Unreleased]`) | 0 |
| Deployment / runbook / observability | `operations/*.md` | 2 |

## Load rules — "task touches… → open these"

> Open only what the task implicates. A doc's front-matter (`owns`) + summary decide
> relevance *before* you open the body; read the section (anchor), not the whole
> file. See the read-path protocol in `_meta/DOCS_SYSTEM.md §14`.

| Task touches… | Open |
|---------------|------|
| "What's left / last built / how was X built" | `implementation-map.md` (one read; avoids a code scan) |
| UI / components | `conventions/ui-ux-guidelines.md`, the relevant `features/FEAT-*` |
| An endpoint | `api/api-overview.md`, `api/endpoints.md` |
| Persistence / schema | `data-model.md` |
| Architecture / a boundary | `architecture.md`, relevant `decisions/ADR-*` |
| Dependencies / build | `tech-stack.md` |
| A named feature | that feature's `features/FEAT-*` |

## Escalation ledger

| To tier | Date | Trigger |
|---------|------|---------|
| 0 | (bootstrap) | project created from template |
