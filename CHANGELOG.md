# Changelog

All notable, user-visible changes to this project are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versioning: [SemVer](https://semver.org/spec/v2.0.0.html).

> Claude Code adds an entry under `[Unreleased]` whenever a user-visible change
> ships. Detailed *why* lives in ADRs; roadmap "Shipped" only summarises.

## [Unreleased]

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
