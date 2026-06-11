# AuditForge

AI business assessment platform for MV Forge — structured intake, Claude-powered analysis, client reports, and upsell tracking.

## What's here

| Path | Purpose |
|------|---------|
| `assessment/` | Python CLI pipeline, prompts, Retell webhook |
| `assessment/HERMES_BUILD_PROMPT.md` | Web app build spec (Hermes + Cursor) |
| `assessment/templates/` | Gamma report template + section mapping |
| `.env.example` | API keys and config template |

## Quick start

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r assessment/requirements.txt
cp .env.example .env
# Add ANTHROPIC_API_KEY to .env

python -m assessment.src run \
  -t assessment/samples/example_transcript.txt \
  -c "Client Name" \
  -i wedding_venue
```

See [assessment/README.md](assessment/README.md) for full documentation.

## Agents

**Repo:** https://github.com/mvill72/auditforge

- **Cursor** — Python pipeline, prompts, integrations
- **Hermes** — Next.js web app — paste `assessment/HERMES_ONBOARDING.md` to sync, then read `assessment/HERMES_BUILD_PROMPT.md`

## Deploy (CasaOS)

```bash
git clone https://github.com/mvill72/auditforge.git /DATA/Documents/auditforge
```
