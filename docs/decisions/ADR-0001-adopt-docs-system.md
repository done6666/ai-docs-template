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
  `doc-maintainer` skill, backed by a **thin advisory hook layer**
  (`.claude/settings.json` + `.claude/hooks/*`, since template v1.11.0): a Stop
  hook that reminds once per commit cycle when code changed but `STATE.md` wasn't
  flushed, and a post-compaction hook that re-anchors the session to `STATE.md`.
  Hooks **remind** — they never write docs themselves.

## Consequences

- **Positive:** fresh sessions orient cheaply and resume reliably; decisions and
  their rationale are captured; docs stay proportional to project size; the system
  is self-healing; the two riskiest moments (session end, post-compaction) are
  covered by hook reminders instead of goodwill alone.
- **Negative:** the agent must still follow the trigger table diligently — the
  hooks are advisory reminders, not full enforcement. The hook scripts require
  Node.js; on a machine without Node, remove the `hooks` entries from
  `.claude/settings.json` and the system degrades to rules-only.
- **Follow-ups:** run `/docs-init` to bootstrap; run `/docs-audit` periodically to
  catch drift.

## Alternatives Considered

- **No structured docs (rely on code + git):** loses the *why* and live state that
  code and history can't express. Rejected.
- **Comprehensive docs from day one:** too heavy for small projects; hard for the
  agent to keep in sync. Rejected in favour of tiering.
- **Rules-only, no hooks (v1.0.0–v1.10.x):** fully portable, but session-end
  `STATE.md` updates depended entirely on the rules being honoured — the system's
  own acknowledged weakest point. Revised in template v1.11.0 (2026-07-18) to the
  advisory hook layer above. Fully *enforcing* hooks (auto-writing docs, blocking
  unconditionally) remain rejected as intrusive.
