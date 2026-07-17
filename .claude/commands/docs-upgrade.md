---
description: Upgrade the docs-system machinery to the latest template version and migrate project content, without touching project-owned docs
---

# /docs-upgrade — Pull the latest template & migrate

Bring this project's docs-system **machinery** up to the latest `ai-docs-template`
version and apply any **content migrations**, without overwriting project-owned
docs. Read `docs/_meta/DOCS_SYSTEM.md §12` first if you haven't this session.

**Safety:** machinery is overwritten wholesale (it is upstream-owned and never
hand-edited); project **content** is only ever *migrated* with a preview + explicit
confirmation. Never discard project content.

## Step 1 — Determine from/to and the source

- **from** = `template_version` in `docs/INDEX.md` front-matter.
- **template_source** = the URL in `docs/INDEX.md` front-matter. If it is unset or
  `<set on bootstrap>`, ask the user for the template repo URL (default: the repo
  this project was created from) and record it in INDEX.
- Fetch the latest machinery: `git clone --depth 1 <template_source>` into a temp
  dir (or, if the project has a `template` git remote, fetch that). If no network /
  git is available, tell the user to copy the latest machinery in manually
  (`.claude/`, `docs/_meta/`, `.gitattributes`, and the `CLAUDE.md` managed block)
  and re-run — then skip to Step 3.
- **to** = the fetched `docs/_meta/VERSION`. If `from == to`, report "already up to
  date" and stop.

## Step 2 — Preview the plan (confirm before writing)

Show, grouped:
- **Machinery to replace:** the pure-machinery files that differ (`.claude/**`,
  `docs/_meta/**` except `VERSION`/`MIGRATIONS` which also update, `.gitattributes`)
  and the `CLAUDE.md` managed block.
- **Content migrations:** read the fetched `docs/_meta/MIGRATIONS.md`; list the
  **Content migration** steps for every version in `(from, to]`, in ascending order,
  naming each project doc they will change. If all are "None (backward compatible)",
  say so.
- **Untouched:** all project content not named by a migration; anything in
  `CLAUDE.md` outside the managed block.

Ask: **"Apply this upgrade? (Project content is only changed by the listed
migrations; everything else is preserved.)"** Wait for an explicit yes.

## Step 3 — Apply

1. **Machinery:** overwrite the pure-machinery files from the fetched copy
   (including `docs/_meta/VERSION` and `MIGRATIONS.md`).
2. **CLAUDE.md managed block:** replace only the text between
   `<!-- ai-docs-template:managed:start ... -->` and
   `<!-- ai-docs-template:managed:end -->` with the fetched version's block. Leave
   everything outside the markers (project-specific rules) untouched. If the markers
   are missing (older adopt), insert the new managed block at the top and preserve
   all existing content below it.
3. **Content migrations:** apply each `(from, to]` migration's steps in order,
   editing the named project docs. Bump each touched doc's `updated:`.
4. **Stamp:** set `docs/INDEX.md` front-matter `template_version: <to>`; add a row
   to the INDEX escalation/upgrade ledger (`upgraded <from> → <to>, <date>`); add a
   `CHANGELOG.md` `[Unreleased]` entry ("Upgraded docs template <from> → <to>").
5. Delete the temp clone.

## Step 4 — Report & verify

Report (in the project's language) what machinery changed, which content docs were
migrated, and what was left untouched. **Recommend running `/docs-audit`** to
confirm the migrated docs still match the code.

If a migration step is ambiguous for this project, do not guess — surface it and ask.
