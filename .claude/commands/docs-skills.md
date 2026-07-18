---
description: Analyze the project and recommend curated Claude Code skills — install only with explicit permission
---

# /docs-skills — Curated skill recommendations

Match this project against the curated catalog and offer to install the few skills
that would genuinely help. **The catalog and its safety rules are authoritative** —
read `docs/_meta/skills-catalog.md` first and obey its rules (curated-only,
read-before-install, explicit yes per skill, ≤2–3 recommendations, record installs).

## Step 1 — Detect signals

From what's already documented (`tech-stack.md`, `project-brief.md`,
`architecture.md`) — or a quick manifest scan if docs aren't bootstrapped yet —
determine: does the project have a web UI? testable flows? MCP/agent tooling?
document generation? Check `.claude/skills/` and `tech-stack.md` for skills
**already installed** — never re-recommend those.

## Step 2 — Match & propose (in the user's language)

Map signals to catalog rows; pick at most 2–3. For each candidate, **fetch and
read its full `SKILL.md` from the source repo first** (catalog rule 2 — verify it
still exists; skip and note it if unreadable). Then present:

- Skill name + one-line "what it does" (from what you actually read, not the
  catalog blurb),
- Why *this* project triggers it (the signal),
- Source repo/path, and roughly what it adds to each session's context.

If nothing matches, say so and stop — zero recommendations is a valid outcome.

## Step 3 — Install on explicit yes (per skill)

For each skill the user approves:
1. Copy the skill folder into `.claude/skills/<name>/` verbatim — never edit a
   shipped skill (§12.1; project customizations go in a separate project skill).
2. Add a row to `tech-stack.md` Infra/Tooling: skill name, source, install date.
3. Announce in one line.

Skipped or declined skills: don't record, don't re-ask this session.
