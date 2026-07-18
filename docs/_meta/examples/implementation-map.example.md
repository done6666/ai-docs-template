---
title: Implementation Map
tier: 1
type: index
owns: "implementation progress — done/next queue + per-unit how-notes"
does_not_own: "feature design (features/), strategic direction (roadmap.md), history (CHANGELOG.md), live session focus (STATE.md)"
status: current
updated: 2026-07-18
---

# Implementation Map

> The AI's build ledger — answers "what's left / last built / how was X built" from
> one cheap read instead of a codebase scan.

**Last implemented:** Invoice CRUD API — 2026-07-18 (ref: a1b2c3d)

## Auth
- [x] Email/password register + login — `src/app/api/auth` (ref: 9f2e1a0)
  > NOTE: NextAuth v5 Credentials; bcrypt cost 12; JWT 15m + refresh 30d (rotated).
  > Gotcha: middleware must allow `/login` + `/api/auth` publicly.

## Customers
- [x] Customer CRUD — `src/app/customers`, `src/lib/queries/customers.ts` (ref: 4c5d6e7)
  > NOTE: per-user isolation via `ownerId`; Zod schema shared form+API.

## Invoices
- [x] Invoice CRUD API — `src/app/api/invoices` (ref: a1b2c3d)
  > NOTE: status enum draft|sent|paid; totals computed server-side (never trusted
  > from client); line items are related rows, not JSON.
- [~] PDF generation — see `features/FEAT-0002-invoice-pdf.md#current-state`
- [ ] Payment status tracking (depends: Invoice CRUD)
- [ ] Recurring invoices — later
