---
title: UI/UX Guidelines
tier: 1
type: reference
owns: "the project's design truth: references, tone, tokens, layout/component rules, and how UI work is visually verified"
does_not_own: "component implementation (code), feature-specific UX flows (features/FEAT-*)"
status: current
updated: <YYYY-MM-DD>
related: [docs/project-brief.md]
---

# UI/UX Guidelines

> The **design SSOT**. Without this doc the AI improvises taste per session and the
> UI drifts; with it, design gets the same fidelity as code. Created at bootstrap
> for UI projects (from the interview's design question) — refined as real design
> decisions land. Keep it concrete: a rule you can check a screenshot against.

## Design references

<!-- 1–3 sites/products the user named as the target feel, with what to take from
     each. This is the highest-leverage section — fill it even if all else waits. -->
- <reference> — take: <what specifically: density, palette, motion, tone>

## Tone & feel

- <e.g. minimal / playful / corporate; calm vs dense; motion: none / subtle>

## Design tokens

| Token | Value | Notes |
|-------|-------|-------|
| Primary / accent color | <value> | |
| Neutrals / background | <value> | |
| Font (headings / body) | <family, weights> | |
| Type scale | <e.g. 14/16/20/24/32> | |
| Spacing unit | <e.g. 4px grid> | |
| Radius / elevation | <value> | |

<!-- If the code has a real token source (tailwind.config, CSS vars, theme file),
     link it here as the value SSOT and keep only the intent in this table. -->

## Layout & component rules

- <recurring rules: max content width, card vs table usage, form layout,
  empty/loading/error states, dark mode policy>

## Accessibility & responsive

- <contrast floor, focus visibility, keyboard paths, breakpoints that must work>

## Visual verification loop

After any UI change: open the affected screen in the browser and check it
**against this doc** (references, tokens, rules) — not against taste. Screenshot
comparisons beat description. A mismatch is either a code fix or a deliberate
change to this doc in the same session — never silent drift.
