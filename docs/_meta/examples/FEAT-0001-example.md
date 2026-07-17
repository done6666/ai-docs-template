---
id: FEAT-0001
title: Password reset flow
tier: 1
type: spec
owns: "the design of the password reset feature"
does_not_own: "auth requirements (requirements.md), the /auth endpoints (api/), the User entity (data-model.md)"
status: building
date: 2026-07-17
requirements: [REQ-014, REQ-015]
adrs: [ADR-0004]
related: [docs/api/endpoints.md, docs/data-model.md]
---

# FEAT-0001: Password reset flow

> Lets a signed-out user regain access via an emailed, single-use, time-limited
> reset link.

## Summary

Users who forget their password request a reset from the sign-in page. We email a
tokenised link; following it lets them set a new password. Serves the "account
recovery" goal in `roadmap.md`.

## User stories / acceptance criteria

- As a signed-out user, I can request a reset link for my email so that I can
  regain access.
- **Acceptance:** given a valid account email, when I submit the reset form, then
  I receive an email with a link valid for 30 minutes and usable once.
- **Acceptance:** given an expired or used token, when I open the link, then I see
  a clear "link expired" message and can request a new one.

## UX notes

Empty/success/error states for the request form; the set-new-password screen
enforces the password policy inline. See `conventions/ui-ux-guidelines.md`.

## API changes

`POST /auth/reset-request`, `POST /auth/reset-confirm`. Contracts in
`api/endpoints.md`.

## Data changes

Adds `PasswordResetToken` (see `data-model.md`): `token_hash`, `user_id`,
`expires_at`, `used_at`.

## Rollout / flags

Behind `feature.password_reset`. No backfill needed.

## Open questions

- None open. (Rate-limiting decided in ADR-0004.)
