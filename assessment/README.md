# AI Business Assessment System

End-to-end pipeline for the $1,000 AI assessment model: structured intake → Claude analysis → client report → Gamma formatting.

## What's included

| Component | Path | Purpose |
|-----------|------|---------|
| Question bank | `question_bank.yaml` | Zoom + voice agent interview script |
| Analysis prompt | `prompts/analyze_transcript.txt` | Step 1: pain points, tools, ROI notes |
| Report prompt | `prompts/generate_report.txt` | Step 2: client-facing deliverable |
| Voice agent prompt | `prompts/retell_agent_system.txt` | Annie-style Retell.ai intake |
| CLI pipeline | `src/cli.py` | Process transcripts locally |
| Retell webhook | `retell/webhook.py` | Auto-run pipeline after calls |
| Sample transcript | `samples/example_transcript.txt` | Test without a live client |
| Report template | `templates/assessment-template.html` | Gamma/audittemplate.ai blank bundle |
| Section mapping | `templates/SECTION_MAP.md` | Markdown → template slide mapping |
| Hermes build spec | `HERMES_BUILD_PROMPT.md` | Shared prompt for web app development |

## Quick start

```bash
cd /home/lxforge/Documents/mvforge
python3 -m venv .venv
source .venv/bin/activate
pip install -r assessment/requirements.txt
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env
```

### Print interview script (for Zoom calls)

```bash
python -m assessment.src script --industry wedding_venue
```

### Process a transcript

```bash
python -m assessment.src run \
  --transcript assessment/samples/example_transcript.txt \
  --client "Sunset Gardens Venue" \
  --industry wedding_venue \
  --team-size "12"
```

Outputs land in `assessment/output/`:
- `YYYY-MM-DD_client_analysis.md` — internal research notes
- `YYYY-MM-DD_client_report.md` — client deliverable

### Format for delivery

**Option A — Manual (today):**
1. Open `templates/assessment-template.html` in a browser (or upload to [Gamma](https://gamma.app) / [audittemplate.ai](https://audittemplate.ai))
2. Paste each markdown section from `*_report.md` into the matching slide (see `templates/SECTION_MAP.md`)
3. Email within 48 hours with Calendly link for follow-up call

**Option B — Web app (Hermes):**
Parse `*_report.md` into structured JSON, inject into the template bundle, serve at `/assessments/:id/report` with PDF export.

## Voice agent (optional)

See `retell/agent_setup.md` for Retell.ai configuration.

```bash
# Generate Annie system prompt
python -m assessment.src retell-prompt --company "MV Forge" -o assessment/retell/agent_prompt.txt

# Run webhook server (processes calls automatically)
python -m assessment.retell.webhook
```

## Workflow

```
Intake (Zoom or Retell) → Transcript → Claude analysis → Claude report → Gamma → Client email → Follow-up call → Upsell
```

## Industry keys

Use with `--industry`:

- `real_estate`
- `wedding_venue`
- `business_brokerage`
- `service_business`
- `professional_services`

## Customization

- **Hourly rate for ROI:** set `HOURLY_RATE` in `.env` (default $100)
- **Booking link:** set `BOOKING_URL` in `.env`
- **Questions:** edit `question_bank.yaml`
- **Report sections:** edit `prompts/generate_report.txt`
