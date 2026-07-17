---
description: Adopt the docs/ system into an EXISTING project — deep-scan the code, ingest existing docs without loss, reconstruct the real tier + retroactive ADRs, then a minimal interview
---

# /docs-adopt — Bring the docs system into an existing project

You are adopting `docs/` into a repo that ALREADY has real code and possibly ad-hoc
docs. Unlike `/docs-init` (greenfield), **the codebase is your primary source** —
read it thoroughly, reconstruct what you can, and ask the human ONLY what code can't
reveal. Read `docs/_meta/DOCS_SYSTEM.md` first if you haven't this session —
especially §3 (tiers), §6 (fact-ownership), and §11 (adopting).

**Absolute rule: never overwrite or delete existing human content.** You create new
docs; you quarantine collisions into `docs/_ingest/`; you write nothing until one
explicit confirmation gate is passed.

## Step 0 — Idempotency & mode

Read `docs/INDEX.md` front-matter if present:
- `status: active` → already adopted. Switch to **reconcile mode**: run
  `/docs-audit`, offer to fill only missing/stale docs, then stop.
- Skeleton (`status: not-bootstrapped`) or no `INDEX.md` → proceed.
- **Partial prior run** (real content but still `not-bootstrapped`, or an existing
  `docs/_ingest/`) → **resume**: re-scan, mark already-written docs `keep`, propose
  only what's missing/changed.

## Step 1 — Deep scan (read-only; don't ask yet)

Build a factual model from code + git, citing the path each fact came from:
- **Stack/deps** — manifests + lockfiles (`package.json`, `pyproject.toml`, `go.mod`,
  `Cargo.toml`, `composer.json`, `Gemfile`, `*.csproj`, …) → exact versions.
- **Type/framework** — config/entry files → `project_type`
  (web | api | library | cli | service | mobile | monorepo).
- **Architecture source map** — walk the tree (ignore `node_modules`, `.git`,
  `dist`, `build`, `vendor`, `.venv`) → module → responsibility. Detect monorepo
  (workspaces / `packages/*` / turbo / nx) → multiple containers.
- **Data model** — ORM models, `schema.prisma`, migrations, entity classes, SQL DDL
  → logical entities + relationships (NOT DDL — link the paths).
- **API surface** — routers/route files, decorators, `app/api`, OpenAPI files →
  method + path + purpose; count endpoints.
- **Git facts** — `git log`, tags, `git shortlog -sne` → CHANGELOG seed from tags,
  roadmap "Shipped" seed, contributor count, current branch + tree status. Never
  copy commit history into docs — git owns it.
- **Conventions** — linter/formatter/editor/CI configs → `conventions/` seed.

## Step 2 — Discover & ingest existing docs WITHOUT loss

Find every human doc: root `README*`, `CONTRIBUTING*`, `ARCHITECTURE*`, `docs/**`,
`doc/**`, `wiki/**`, `.github/**/*.md`, `ADR*/`, `adr/`, `decisions/`, `RFC*`,
`CHANGELOG*`, design `*.md`. Map content into the schema via the fact-ownership
matrix (vision→`project-brief.md`, non-goals→`project-brief.md`, roadmap→`roadmap.md`,
rationale/ADRs/RFCs→one ADR each, architecture prose→`architecture.md`,
setup→`guides/getting-started.md`, style→`conventions/*`, endpoints→`api/*`,
terms→`glossary.md`).

**Disposition of old files:**
1. **Leave source-of-record files in place and reference them** — `README.md`,
   `CONTRIBUTING.md`, `LICENSE`, `.github/**` are GitHub's/humans' front door.
   Extract their *why*-content into docs and add a one-line pointer back.
2. **Never delete anything.**
3. **Reserved-path collision** (a pre-existing `docs/` file at a path our schema
   owns): move it to `docs/_ingest/<original-relative-path>` (preserve structure),
   then author the new canonical doc, folding in the ingested content.
   `docs/_ingest/**` is infrastructure like `_meta/**` — exempt from the manifest,
   never auto-read after adoption. Zero loss, zero clobber.
4. **Pre-existing ADRs/RFCs:** renumber into our `ADR-NNNN-<slug>.md` sequence
   (starting at 0002), preserve original dates/rationale verbatim, add a `related:`
   link back to the `_ingest/` original. Carry their words over — do not invent.

## Step 3 — Detect the starting tier

Evaluate §3 triggers against the scan; pick the highest satisfied tier and create
ALL docs up to it, **populated from the scan** (not empty): `data-model.md` from
models, `api/*` from routers, `conventions/*` from configs, `roadmap.md` from git +
ingested roadmaps, `requirements.md` only if capabilities are numerous. Log each
escalation in `INDEX.md`'s ledger as "adopted into existing project".

## Step 4 — Reconstruct retroactive ADRs (evidence-only)

Record the **3–7 most consequential decisions the code makes evident** (framework,
DB, auth, monorepo, API style, infra). Rules:
- One ADR per decision you can prove with file paths. If you can't cite the proof,
  don't write it.
- Use `_meta/templates/adr.md` with `status: accepted`, `reconstructed: true`, the
  inferred-rationale banner, and `related:` links to the evidencing paths.
- State only what code proves. For the true *why*: if not evident, write "Rationale
  not recorded at the time; inferred: …" and route the genuinely ambiguous ones to
  the Step-5 interview rather than guessing. Cap at 7; note the rest in STATE
  "Next steps" as future ADRs. ADR-0001 (adopt-the-system) stays; retroactive start
  at 0002.

## Step 5 — Minimal interview (in TURKISH) — only what code can't reveal

Ask ALL in ONE batched, numbered message; pre-fill your guesses; don't ask anything
the scan answered:

1. Bu proje tek cümlede **ne ve kim için**? (Çıkarımım: «<inferred>» — doğru mu?)
2. Kodda görünmeyen ama önemli bir **kapsam dışı (non-goal)** var mı?
3. Önümüzdeki dönemde **en önemli 1–3 hedef** ne? (roadmap için)
4. Şu kararların **nedenini** kısaca doğrular mısın? Kodda görüyorum ama gerekçe
   yazılı değil: **<ambiguous decision A>**, **<B>**. (Bir-iki kelime yeter; boş
   bırakırsan "gerekçe kayıtlı değil" diye işaretlerim.)
5. Projenin **görünen adı** ne olsun? (Tahminim: «<repo/pkg name>».)
6. Eklemem/düzeltmem gereken bir **teknoloji** var mı? (Tespitim: «<stack>».)

Q4 answers promote inferred ADR rationale to confirmed; unanswered ones keep the
honest "rationale not recorded" note.

## Step 6 — Preview & confirm (in TURKISH) — the one gate

Show a full, grouped plan before writing anything:
- **Oluşturulacak (create):** each new doc + one-line summary + detected tier.
- **Taşınacak (→ _ingest):** each `docs/X → docs/_ingest/X` collision (content preserved).
- **Referans verilecek:** README/CONTRIBUTING/etc. left in place.
- **Retroaktif ADR'ler:** titles + which are confirmed vs inferred.
- Detected `project_type`, starting `current_tier`, ledger entries.

Ask: **"Bu planı uygulayayım mı? (Hiçbir mevcut dosya silinmez; çakışanlar _ingest/
altına taşınır.)"** Wait for an explicit yes.

## Step 7 — Write & report (in TURKISH)

On yes, execute in order: quarantine moves → new docs → `INDEX.md` (`project_type`,
`current_tier`, `status: active`, `last_verified: <today>`, `template_version` (=
`docs/_meta/VERSION`), `template_source` (ask once if unknown), Core+Areas rows,
ledger)
→ `STATE.md` (`Now` = "adopted into existing project"; `Next steps` = Q3 goals +
deferred ADRs; current branch + tree status) → ADRs + `decisions/README.md` →
`CHANGELOG.md` `[Unreleased]` from tags.

Print a short Turkish note: neler oluşturuldu/taşındı; `_ingest/` altında
orijinallerin korunduğu; bundan sonra dokümanların otomatik güncelleneceği; ve
**öneri: hemen `/docs-audit` çalıştır** — reconstruct edilen mimari/endpoint/
data-model kodla birebir tutuyor mu diye doğrula (adoption sonrası tek manuel adım).

Never fabricate. Code wins for *what*; the human's Q4 answer wins for *why*; note any
reconciliation in the relevant doc.
