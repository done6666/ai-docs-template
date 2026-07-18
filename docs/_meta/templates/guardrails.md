---
title: Guardrails
tier: 1
type: reference
owns: "project-specific must/never rules, known pitfalls, and failed approaches — the 'do NOT do X' knowledge"
does_not_own: "positive coding style (conventions/), design rationale (decisions/), what was built (implementation-map.md), structural invariants (architecture.md — link the critical ones here as coding-time reminders)"
status: current
updated: YYYY-MM-DD
# Optional at large scale (§13.4): covers, last_verified
---

# Guardrails

> The AI's **"do NOT do X"** memory. Check the relevant area here **before writing
> code** — it prevents re-treading failed approaches, violating project invariants,
> and reintroducing fixed bugs. Each entry is a cheap read that saves an expensive
> wrong attempt + a correction round-trip. Durable "Do-not-repeat" learnings from
> `STATE.md` are **promoted here** so they don't die on the next overwrite.

## Legend
- **MUST / NEVER** — a hard rule; violating it is a bug, not a style nit.
- **PITFALL** — a known trap / recurring bug pattern to avoid.
- **FAILED** — an approach already tried that does **not** work here; don't retry it.

Keep entries tight: the rule, one line of *why*, and **where it applies** (path/area)
so a session can load just the relevant area. Link the incident/commit when useful.

## <Area or cross-cutting>

- **NEVER** <do X> — <the right thing instead>.
  > Why: <consequence of doing X>. Applies: `<path glob>`.
- **MUST** <always do Y>.
  > Why: <what breaks otherwise>. Fixed once in `<commit/PR>`.
- **PITFALL** <trap> → <symptom>. Do <the safe thing>.
- **FAILED** <approach> — <why it doesn't work here>; use <alternative>. Tried <date>.

## <Area>

- ...

<!--
Read-path usage: before writing code in an area, scan that area's guardrails.
Write-path: when you discover a failed approach, a must-always invariant, or a
recurring bug pattern — record it here (promote it out of STATE "Do-not-repeat").
Keep this the SINGLE home for negative knowledge; at large scale, split per
subsystem and index (§13).
-->
