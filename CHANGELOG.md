# Changelog

All notable, user-visible changes to this project are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versioning: [SemVer](https://semver.org/spec/v2.0.0.html).

> Claude Code adds an entry under `[Unreleased]` whenever a user-visible change
> ships. Detailed *why* lives in ADRs; roadmap "Shipped" only summarises.
>
> **Downstream migration steps** (what an adopting project must do to upgrade) live
> in `docs/_meta/MIGRATIONS.md`, not here.

## [Unreleased]

## [1.0.0] - 2026-07-17

### Added
- Initial `ai-docs-template` scaffolding: AI-managed, tiered `docs/` system with
  `CLAUDE.md` rules, `doc-maintainer` skill, and `/docs-init`, `/docs-audit`,
  `/adr`, `/feature` commands.
- Concurrency support: dual-mode `STATE.md` (solo + parallel dashboard), per-feature
  `## Current state` resume cursor, `/handoff` command, `.gitattributes`
  (EOL normalization + `CHANGELOG merge=union`), and `DOCS_SYSTEM.md §10`
  (branches, worktrees, regenerate-don't-merge).
- Existing-project adoption: `/docs-adopt` (deep scan, `_ingest/` quarantine,
  tier detection, evidence-only retroactive ADRs), `/docs-init` redirect heuristic,
  retroactive-ADR flag in the ADR template, and `DOCS_SYSTEM.md §11`.
- Template versioning: `docs/_meta/VERSION` + `MIGRATIONS.md`, `/docs-upgrade`
  command, `CLAUDE.md` managed-block markers (machinery vs project rules),
  `template_version`/`template_source` in `INDEX`, and `DOCS_SYSTEM.md §12`.

### Changed
- Live-test fixes (from a full `/docs-init` dry run on a sample Next.js project):
  `tech-stack.md` gains an exact-`Package`-id column and `/docs-audit` matches
  against it (so friendly names like "NextAuth" vs `next-auth` no longer false-flag,
  and peer/transitive deps are ignored); `INDEX.md` size cap raised 600 → 900 with a
  split-the-Areas-manifest escape hatch, since static routing/load tables were
  already near the old cap at Tier-0.
