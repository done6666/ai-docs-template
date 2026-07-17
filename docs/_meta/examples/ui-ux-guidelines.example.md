---
title: UI/UX Guidelines
tier: 1
type: reference
owns: "the web design system: tokens, component patterns, accessibility, responsive rules"
does_not_own: "per-feature UX (features/), brand strategy (project-brief.md)"
status: current
updated: 2026-07-17
related: [docs/conventions/coding-standards.md]
---

# UI/UX Guidelines

> The design-system contract the UI must follow. Per-feature screens reference
> this; they don't redefine it.

## Design tokens

- **Color:** semantic tokens (`--bg`, `--fg`, `--primary`, `--danger`) with
  light+dark values. Never hard-code hex in components.
- **Spacing:** 4px base scale (4/8/12/16/24/32…).
- **Type:** scale + weights; one display face, one body face.
- **Radius / shadow:** token sets `--radius-sm|md|lg`, `--shadow-1|2`.

## Component patterns

- Every interactive component defines: default, hover, focus-visible, active,
  disabled, loading, and error states.
- Forms: label + field + inline validation message; submit disabled while pending.

## Accessibility

Target **WCAG 2.1 AA**. Keyboard-operable; visible focus; contrast ≥ 4.5:1 for
text; images have alt text; live regions announce async results.

## Responsive

Mobile-first. Breakpoints `sm 640 / md 768 / lg 1024 / xl 1280`. Content must not
overflow horizontally; wide tables/diagrams scroll within their own container.
