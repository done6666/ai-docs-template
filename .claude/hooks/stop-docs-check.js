#!/usr/bin/env node
// ai-docs-template machinery — Stop hook (advisory, nags at most once per commit
// cycle). Blocks the stop only when the working tree has non-docs changes and
// docs/STATE.md has not been touched — i.e. the session changed code but never
// flushed the resume cursor. Everything else (clean tree, STATE already updated,
// no git, no repo) exits silently. Requires Node; if the project has no Node,
// remove the hooks from .claude/settings.json (see docs/decisions/ADR-0001).
'use strict';
const { execSync } = require('child_process');

let input = '';
process.stdin.on('data', (c) => (input += c));
process.stdin.on('end', () => {
  try {
    // Claude Code sets stop_hook_active when the model is already continuing
    // because of this hook — never nag twice in one stop sequence.
    if (JSON.parse(input).stop_hook_active) return;
  } catch (_) {
    /* unparsable input — fall through, still safe */
  }

  let porcelain;
  try {
    porcelain = execSync('git status --porcelain', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
  } catch (_) {
    return; // no git / not a repo — stay silent
  }

  const files = porcelain
    .split('\n')
    .filter(Boolean)
    .map((l) => l.slice(3).trim().replace(/\\/g, '/'));

  const isDocsSystem = (f) =>
    f.startsWith('docs/') ||
    f === 'CLAUDE.md' ||
    f === 'CHANGELOG.md' ||
    f.startsWith('.claude/');
  // Overlay projects keep their own state file — point CLAUDE_DOCS_STATE at it
  // (repo-relative, forward slashes). Default: the template's docs/STATE.md.
  const statePath = (process.env.CLAUDE_DOCS_STATE || 'docs/STATE.md').replace(
    /\\/g,
    '/'
  );
  const codeChanged = files.some((f) => !isDocsSystem(f));
  const stateTouched = files.some(
    (f) => f === statePath || f.endsWith('-> ' + statePath)
  );

  if (codeChanged && !stateTouched) {
    console.log(
      JSON.stringify({
        decision: 'block',
        reason:
          'Docs-system check (ai-docs-template): the working tree has code changes but ' +
          statePath +
          ' was not updated this cycle. Before stopping, apply any pending doc-maintainer triggers and refresh the resume cursor — ' +
          statePath +
          ' and the active feature\'s "## Current state" (or run /handoff). If skipping is deliberate (e.g. a checkpoint is coming right after), say so in one line and stop.',
      })
    );
  }
});
