---
id: ADR-0001
title: Adopt the AI-managed docs system
tier: 0
type: decision
owns: "the rationale for adopting this documentation system"
does_not_own: "the system's rules (docs/_meta/DOCS_SYSTEM.md)"
status: accepted
date: 2026-07-17
supersedes: []
superseded_by: null
related: [docs/_meta/DOCS_SYSTEM.md, CLAUDE.md]
---

# ADR-0001: Adopt the AI-managed docs system

> This project uses a tiered, AI-maintained `docs/` system where Claude Code owns
> all documentation and the human never edits it.

## Context

Building software with an AI agent across many sessions needs persistent memory:
a context-limited, amnesiac agent must re-orient, resume in-progress work, and
make choices consistent with past decisions. Ad-hoc docs drift, duplicate what
code/git already hold, and get abandoned because upkeep falls on the human.

## Decision

We will use the `ai-docs-template` documentation system:

- **Claude Code owns and maintains 100% of `docs/`.** The human never writes docs.
- **Adaptive/tiered:** a minimal Tier-0 core is always present; higher tiers are
  added only when their triggers fire.
- **One boot path** (`CLAUDE.md` → `INDEX.md` → `STATE.md`), **deterministic
  write paths** (routing table in `INDEX.md`), and **SSOT per fact**
  (`owns`/`does_not_own` front-matter).
- The full protocol lives in `docs/_meta/DOCS_SYSTEM.md`, which is authoritative;
  `CLAUDE.md` is its short summary. Autonomy comes from `CLAUDE.md` rules plus the
  `doc-maintainer` skill; **no hooks** are used, for portability.

## Consequences

- **Positive:** fresh sessions orient cheaply and resume reliably; decisions and
  their rationale are captured; docs stay proportional to project size; the system
  is self-healing and fully cross-platform (no hooks).
- **Negative:** the agent must follow the triggers diligently; without a hook,
  session-end `STATE.md` updates rely on the rule + skill being honoured.
- **Follow-ups:** run `/docs-init` to bootstrap; run `/docs-audit` periodically to
  catch drift.

## Alternatives Considered

- **No structured docs (rely on code + git):** loses the *why* and live state that
  code and history can't express. Rejected.
- **Comprehensive docs from day one:** too heavy for small projects; hard for the
  agent to keep in sync. Rejected in favour of tiering.
- **Enforcement via hooks:** stronger session-end guarantees but adds
  cross-platform/portability cost and can be intrusive. Deferred; may revisit.
