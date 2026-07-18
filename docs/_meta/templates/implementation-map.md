---
title: Implementation Map
tier: 1
type: index
owns: "implementation progress — which units are built, and a build-note per done unit"
does_not_own: "feature design (features/), strategic direction (roadmap.md), user-visible history (CHANGELOG.md), live session focus (STATE.md)"
status: current
updated: YYYY-MM-DD
# Optional at large scale (§13.4): covers, last_verified
---

# Implementation Map

> The AI's build ledger — a note to self so a future session knows **what's done,
> what's left, and HOW each unit was built** without re-scanning the code. It caches
> build progress + the non-obvious *how*; it links to code, never copies it. This is
> what lets "what's left / what was last / implement X" be answered from one cheap
> read instead of a codebase search.

**Last implemented:** <unit> — <YYYY-MM-DD> <optional: branch/commit>

## Legend
`[ ]` todo · `[~]` in progress · `[x]` done. Under each **done** unit, add a `>` note:
how it was built, the key decision/gotcha, and the code path(s). Keep notes tight —
non-obvious *how*, not a re-description of the code.

## <Area or Feature>

- [x] <implementation unit> — `path/to/code`
  > NOTE: <how it was built; key decision or gotcha; anything a future session would
  > otherwise have to rediscover by reading the code>. Links: `FEAT-00NN`, `ADR-00NN`.
- [~] <unit in progress> — see `features/FEAT-00NN.md#current-state`
- [ ] <unit not started> — depends on <unit / decision>

## <Area or Feature>

- [ ] <unit>

<!--
Read-path usage:
- "what was last implemented?"  -> the `Last implemented` line (O(1)).
- "what's left?"                -> the `[ ]` / `[~]` items.
- "implement X"                 -> find X, read its note + dependencies; then, once
                                    built, flip it to `[x]`, add the note, update
                                    `Last implemented`.
Keep this the SINGLE source of build progress — don't duplicate the checklist
elsewhere. At large scale, split per subsystem/feature and index them (§13).
-->
