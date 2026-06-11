# Retell.ai Voice Agent Setup (Annie)

## 1. Generate the system prompt

```bash
cd /home/lxforge/Documents/mvforge
python -m assessment.src retell-prompt \
  --company "MV Forge" \
  --industry wedding_venue \
  --output assessment/retell/agent_prompt.txt
```

Industry keys: `real_estate`, `wedding_venue`, `business_brokerage`, `service_business`, `professional_services`

## 2. Create agent in Retell dashboard

| Setting | Value |
|---------|-------|
| Agent name | Annie — AI Assessment Intake |
| Voice | Natural, warm female voice |
| System prompt | Paste `agent_prompt.txt` |
| Max duration | 35 minutes |
| End call after silence | 30 seconds |

## 3. Post-call analysis

Enable **transcript** in call settings. Retell will send `call_ended` webhooks with the full transcript.

## 4. Webhook

Point Retell to your server:

```
POST https://your-domain.com/webhook/retell
```

Set `RETELL_WEBHOOK_SECRET` in `.env` to match Retell's signing secret.

Pass per-call metadata in Retell (dynamic variables or metadata):

```json
{
  "client_name": "Sunset Gardens Venue",
  "industry": "wedding_venue",
  "team_size": "12"
}
```

## 5. Run webhook locally

```bash
pip install -r assessment/requirements.txt
python -m assessment.retell.webhook
```

Tunnel with ngrok: `ngrok http 8080`

## 6. Human follow-up

The pipeline writes `output/YYYY-MM-DD_client_report.md`. Upload to Gamma using your audittemplate.ai template, email to client within 48 hours, and book the walkthrough call.
