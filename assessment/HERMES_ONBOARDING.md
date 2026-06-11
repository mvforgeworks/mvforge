# Hermes Onboarding Prompt — AuditForge

> **Paste this entire file into Hermes** when starting or resuming work on AuditForge.
> Last updated: 2026-06-11

---

## Sync command (run first)

```bash
# CasaOS server (primary)
cd /DATA/Documents/auditforge 2>/dev/null || git clone https://github.com/mvill72/auditforge.git /DATA/Documents/auditforge
cd /DATA/Documents/auditforge && git pull origin main

# Laptop (if working locally)
cd ~/Documents/mvforge 2>/dev/null || git clone https://github.com/mvill72/auditforge.git ~/Documents/auditforge
cd ~/Documents/auditforge && git pull origin main
```

---

## Source of truth

**GitHub repo:** https://github.com/mvill72/auditforge

This is the canonical project. Do not treat local-only copies, old `mvforge` paths, or prior session notes as authoritative until you `git pull` and read the files below.

| What | Path in repo |
|------|----------------|
| Full web app build spec | `assessment/HERMES_BUILD_PROMPT.md` |
| Python pipeline docs | `assessment/README.md` |
| Report template mapping | `assessment/templates/SECTION_MAP.md` |
| Retell voice agent setup | `assessment/retell/agent_setup.md` |
| Agent entry point | `AGENTS.md` |
| Env template | `.env.example` |

**Reading order:** `AGENTS.md` → `assessment/HERMES_BUILD_PROMPT.md` → `assessment/templates/SECTION_MAP.md` → `assessment/README.md`

---

## Your role

You are building **AuditForge** — the web application layer for MV Forge's $1,000 AI business assessment service.

- **You own:** Next.js UI, Prisma/DB, FastAPI wrapper, dashboard, report renderer, export
- **Cursor owns:** Python CLI pipeline, Claude prompts, Retell webhook, question bank, template files
- **Rule:** Extend the existing Python pipeline in `assessment/` — do not rewrite it

---

## What exists today (as of initial push)

### Python backend (done — integrate, don't rebuild)

```
assessment/
├── src/cli.py              # run | script | retell-prompt
├── src/pipeline.py         # run_assessment() — Claude step 1 + 2
├── prompts/                # analyze_transcript.txt, generate_report.txt
├── question_bank.yaml      # 5 industries + general questions
├── retell/webhook.py       # Flask webhook for Retell call_ended
├── templates/
│   ├── assessment-template.html   # Gamma/audittemplate.ai bundle
│   └── SECTION_MAP.md             # markdown → slide mapping + reportJson schema
└── samples/example_transcript.txt
```

### Web app (your job — not built yet)

See `assessment/HERMES_BUILD_PROMPT.md` for full spec:
- Next.js 14+ dashboard
- Client + Assessment CRUD
- Transcript upload → pipeline → report preview
- Template-styled report renderer (`reportJson` from markdown)
- FastAPI wrapper around `pipeline.py`
- Retell webhook proxy
- Settings (hourly rate, Calendly URL, company name)

---

## Recent changes (changelog)

| Date | Change |
|------|--------|
| 2026-06-11 | Repo created: `mvill72/auditforge` — initial push with full Python pipeline |
| 2026-06-11 | `HERMES_BUILD_PROMPT.md` — shared build spec for parallel Cursor + Hermes work |
| 2026-06-11 | Report section headings aligned to Gamma template (`Impact–Effort Matrix`, `What Comes After Quick Wins`, etc.) |
| 2026-06-11 | `assessment/templates/SECTION_MAP.md` — slide mapping + JSON schema for report renderer |
| 2026-06-11 | `AGENTS.md` + root `README.md` added |

> **When Cursor makes changes:** they will be pushed to `main`. Always `git pull` before starting work.

---

## Report sections (must match template)

1. Executive Summary
2. Impact–Effort Matrix
3. Recommended Solutions
4. Your 4-Day Quick Wins Plan
5. Financial Impact
6. What Comes After Quick Wins
7. Your Next Steps

Prompt template: `assessment/prompts/generate_report.txt`  
Visual template: `assessment/templates/assessment-template.html`

---

## Test scenario

```bash
cd /DATA/Documents/auditforge   # or local clone path
python3 -m venv .venv && source .venv/bin/activate
pip install -r assessment/requirements.txt
cp .env.example .env            # add ANTHROPIC_API_KEY

python -m assessment.src run \
  -t assessment/samples/example_transcript.txt \
  -c "Sunset Gardens Venue" \
  -i wedding_venue \
  --team-size "12"
```

**Client:** Sunset Gardens Venue | **Industry:** `wedding_venue` | **Team size:** 12

---

## Working conventions

1. **Pull before every session:** `git pull origin main`
2. **Commit to `main`** on the GitHub repo — not local-only paths
3. **Never commit:** `.env`, `assessment/output/*`, legal PDFs, VPN configs
4. **Prompts:** Load from `assessment/prompts/*.txt` — never hardcode in TS/Python
5. **Question bank:** Single source is `assessment/question_bank.yaml`
6. **CLI must keep working** after any API changes

---

## CasaOS deployment paths

| Environment | Path |
|-------------|------|
| CasaOS server | `/DATA/Documents/auditforge` |
| Laptop | `~/Documents/mvforge` or `~/Documents/auditforge` |
| GitHub | `https://github.com/mvill72/auditforge` |

Hermes on CasaOS should clone to `/DATA/Documents/auditforge` and work from there.

---

## First response (required)

After pulling the repo and reading the docs above, reply with:

1. Confirm repo is cloned and at latest `main` commit
2. Architecture choice (Next.js + FastAPI wrapper per build spec) and why
3. File tree you plan to create under `app/` (or `web/`)
4. Step 1 you will implement now
5. Any blockers

Then begin building. Test with the sample transcript after the generate flow works.

---

**End of onboarding prompt.**
