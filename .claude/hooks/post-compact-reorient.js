#!/usr/bin/env node
// ai-docs-template machinery — SessionStart(matcher: compact) hook.
// Runs right after context compaction; stdout is injected into the model's
// context. Re-anchors the session to the docs system so the resume cursor
// survives the summary. Requires Node; if the project has no Node, remove the
// hooks from .claude/settings.json (see docs/decisions/ADR-0001).
'use strict';
console.log(
  'Context was just compacted. Re-orient via the docs system: re-read docs/STATE.md and the active feature\'s "## Current state". If work done before compaction is not reflected there yet, flush it now (/handoff) before continuing the task.'
);
