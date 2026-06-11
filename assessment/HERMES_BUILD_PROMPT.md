# Hermes Build Prompt — AuditForge

> **Shared source of truth** for parallel development. Cursor owns the Python pipeline; Hermes owns the web application layer. Both agents should `git pull` from GitHub before making changes.

**GitHub:** https://github.com/mvill72/auditforge  
**Company:** MV Forge  
**CasaOS path:** `/DATA/Documents/auditforge`  
**Laptop path:** `~/Documents/mvforge` (legacy name — same repo)  
**Onboarding prompt:** `assessment/HERMES_ONBOARDING.md` (paste into Hermes to sync)  
**Existing backend:** `assessment/` (Python — do not rewrite unless integrating via API)

---

## Your role

You are building **MV Forge AI Assessment** — a production web application for a $1,000 paid AI business assessment service for SMBs (5–50 employees). A Python CLI pipeline already exists in the repo. Your job is to build the **application layer** on top of it: web UI, API, database, client/assessment management, and integrations — without duplicating or breaking the existing pipeline.

---

## Business context (read first)

### Product

A consultant sells a **$1,000 AI assessment** to small business owners:

1. **Intake** — 20–30 min structured interview (Zoom or AI voice agent "Annie" on Retell.ai)
2. **Analysis** — Claude analyzes transcript → pain points, tool recommendations, ROI
3. **Report** — Client-facing markdown report (formatted in Gamma for delivery)
4. **Follow-up** — 30-min walkthrough call → upsells ($1,500–$10,000: automations, custom GPTs, CRM setup)

### Ideal client profile

- 5–50 employees, owner still hands-on
- Industries: real estate, wedding venues, business brokerages, service businesses, professional services
- Not solo operators, not enterprise

### Report sections (must match template + `generate_report.txt`)

1. Executive Summary
2. Impact–Effort Matrix
3. Recommended Solutions (per quick-win pain point)
4. Your 4-Day Quick Wins Plan
5. Financial Impact (hours × $100/hr default − tool costs)
6. What Comes After Quick Wins (upsell seeds)
7. Your Next Steps + Calendly booking link

See `assessment/templates/SECTION_MAP.md` for slide-by-slide mapping.

### Pricing / positioning

- Assessment: **$1,000** (near 100% margin)
- Upsells: $1,500–$10,000+
- Hourly rate for ROI math: **$100/hr** (configurable)

---

## What already exists (DO NOT rebuild from scratch)

Read these files before writing code:

```
auditforge/                         # https://github.com/mvill72/auditforge
├── .env.example                    # ANTHROPIC_API_KEY, HOURLY_RATE, BOOKING_URL, etc.
├── assessment/
│   ├── question_bank.yaml          # Interview questions (general + 5 industries)
│   ├── prompts/
│   │   ├── analyze_transcript.txt  # Claude step 1 prompt
│   │   ├── generate_report.txt     # Claude step 2 prompt (headings match template)
│   │   └── retell_agent_system.txt # Voice agent system prompt
│   ├── templates/
│   │   ├── assessment-template.html  # Gamma/audittemplate.ai blank bundle
│   │   └── SECTION_MAP.md          # Markdown → slide mapping + JSON schema
│   ├── src/
│   │   ├── cli.py                  # CLI entry: run | script | retell-prompt
│   │   ├── pipeline.py             # run_assessment() orchestrator
│   │   ├── claude.py               # Anthropic API calls
│   │   ├── config.py               # Settings from env
│   │   ├── question_bank.py
│   │   └── prompts.py
│   ├── retell/
│   │   ├── webhook.py              # Flask webhook for Retell call_ended
│   │   └── agent_setup.md
│   ├── samples/example_transcript.txt
│   ├── output/                     # Generated .md files land here
│   ├── HERMES_BUILD_PROMPT.md      # This file
│   └── requirements.txt            # anthropic, python-dotenv, pyyaml, flask
└── AI Tools Assessment Template (blank).html   # Original template at repo root
```

### Working CLI commands (must keep working)

```bash
python -m assessment.src script --industry wedding_venue
python -m assessment.src run -t assessment/samples/example_transcript.txt -c "Client Name" -i wedding_venue
python -m assessment.src retell-prompt --company "MV Forge" -o assessment/retell/agent_prompt.txt
python -m assessment.retell.webhook   # port 8080
```

### Industry keys (from `question_bank.yaml`)

`real_estate`, `wedding_venue`, `business_brokerage`, `service_business`, `professional_services`

---

## What you are building

A **full-stack web application** that operationalizes the assessment business. One operator (the founder) runs the whole thing.

### Core user stories

| # | As a... | I want to... | So that... |
|---|---------|--------------|------------|
| 1 | Operator | Create a new assessment for a client | I can track intake → delivery |
| 2 | Operator | Upload or paste a transcript | Claude generates analysis + report |
| 3 | Operator | See assessment status pipeline | I know what's waiting on me |
| 4 | Operator | Preview and edit the report before sending | I can QA Claude output |
| 5 | Operator | Mark report as delivered + schedule follow-up | I hit the 48-hour SLA |
| 6 | Operator | Track upsell opportunities per client | I don't lose revenue |
| 7 | Operator | View/generate interview scripts by industry | I can run Zoom intakes |
| 8 | Operator | Configure settings (company name, hourly rate, Calendly URL) | Reports auto-populate |
| 9 | System | Receive Retell webhooks | Voice calls auto-trigger pipeline |
| 10 | Client (v2) | View read-only report via secure link | Professional delivery experience |

---

## Recommended architecture

### Option A (preferred): Next.js app + Python API wrapper

```
app/                          # Next.js 14+ App Router
├── (dashboard)/
│   ├── assessments/
│   ├── clients/
│   └── settings/
├── api/                        # Next.js API routes OR proxy to Python
└── components/

assessment/                     # KEEP existing Python — expose via FastAPI
├── api/                        # NEW: FastAPI wrapper around pipeline.py
│   └── main.py
```

- **Frontend:** Next.js 14+, TypeScript, Tailwind, shadcn/ui
- **Database:** SQLite for MVP → Postgres later (Prisma ORM)
- **Auth:** Simple email/password or magic link for single operator (Clerk or NextAuth)
- **AI:** Reuse existing prompts in `assessment/prompts/` — call Anthropic from Python or port prompt loading to TS
- **Deploy:** Vercel (frontend) + Railway/Fly.io (Python API) OR all-in-one on Railway

### Option B: Pure Next.js (only if you port pipeline to TypeScript)

Port `run_assessment()` logic to TS using `@anthropic-ai/sdk`. Still read prompt templates from `assessment/prompts/*.txt`. Higher duplication risk — avoid unless necessary.

**Decision rule:** Extend Python, don't replace it.

---

## Data model

```typescript
// Client
{
  id: string
  name: string
  industry: string | null          // question_bank industry key
  teamSize: string | null
  contactEmail: string | null
  contactPhone: string | null
  notes: string | null
  createdAt: DateTime
}

// Assessment
{
  id: string
  clientId: string
  status: 'draft' | 'intake_scheduled' | 'intake_complete' | 'analyzing' | 'report_ready' | 'delivered' | 'followup_scheduled' | 'closed'
  intakeMethod: 'zoom' | 'retell' | 'upload'
  transcript: string | null
  analysisMarkdown: string | null   // internal step 1 output
  reportMarkdown: string | null       // client-facing step 2 output
  reportJson: object | null           // parsed report for template rendering (see SECTION_MAP.md)
  hourlyRate: number                  // snapshot at generation time
  priceCents: number                  // default 100000 ($1,000)
  deliveredAt: DateTime | null
  followupAt: DateTime | null
  createdAt: DateTime
  updatedAt: DateTime
}

// UpsellOpportunity
{
  id: string
  assessmentId: string
  title: string
  description: string
  estimatedLowCents: number
  estimatedHighCents: number
  status: 'identified' | 'discussed' | 'won' | 'lost'
  notes: string | null
}
```

---

## API endpoints to implement

### Python FastAPI (`assessment/api/main.py`) — wrap existing code

```
POST   /api/assessments/{id}/run-pipeline
       Body: { transcript?: string }  // or use stored transcript
       → Calls run_assessment() from pipeline.py
       → Returns { analysis, report } paths + content

GET    /api/question-bank
       → Returns parsed question_bank.yaml

GET    /api/question-bank/script?industry=wedding_venue
       → Returns markdown interview script

GET    /api/retell/prompt?industry=...&company=...
       → Returns generated Annie system prompt
```

### Next.js API routes (or BFF)

```
CRUD   /api/clients
CRUD   /api/assessments
POST   /api/assessments/:id/upload-transcript
POST   /api/assessments/:id/generate        → proxies to Python pipeline
PATCH  /api/assessments/:id/report          → save edited markdown
POST   /api/assessments/:id/deliver         → mark delivered, trigger email (v2)
GET    /api/assessments/:id/report/preview  → rendered HTML preview
GET    /api/assessments/:id/export?format=pdf|html

POST   /api/webhooks/retell                 → proxy or reimplement retell/webhook.py
GET    /api/settings
PATCH  /api/settings
```

---

## UI pages (MVP)

### 1. Dashboard (`/`)

- Pipeline kanban or status cards: Draft → Intake → Analyzing → Ready → Delivered → Follow-up
- Counts: assessments this month, revenue, open upsells
- Quick action: "New Assessment"

### 2. Clients (`/clients`)

- List + create/edit
- Link to client's assessments

### 3. Assessment detail (`/assessments/[id]`)

- Client info sidebar
- Status stepper
- Tabs:
  - **Intake** — upload/paste transcript, link to interview script, Retell phone number (config)
  - **Analysis** — internal markdown preview (read-only)
  - **Report** — two sub-views:
    - **Preview:** Rendered report using template styling (see Report template integration below)
    - **Edit:** Markdown editor with live preview + "Regenerate" + "Mark Ready"
  - **Delivery** — export HTML/PDF, manual Gamma upload fallback, mark delivered, Calendly link
  - **Upsells** — extracted opportunities + manual add + status tracking

### 4. Settings (`/settings`)

- Company name, hourly rate, booking URL, Anthropic model
- Retell webhook URL display
- Industry list reference

### 5. Interview script generator (`/tools/script`)

- Industry dropdown → printable script from question bank

---

## Report template integration (REQUIRED)

The blank Gamma report template lives at:

- `assessment/templates/assessment-template.html` — bundled HTML (open in browser to preview)
- `assessment/templates/SECTION_MAP.md` — section mapping + JSON schema

### Template slides

| Slide | Markdown heading | Content slots |
|-------|------------------|---------------|
| Cover | *(title slide)* | Client name, industry, assessment date |
| Executive Summary | `## Executive Summary` | The Pain, The Outcome, hours reclaimed stat |
| Impact–Effort Matrix | `## Impact–Effort Matrix` | Pain points by quadrant (Quick Wins, Major Projects, Fill-Ins, Ignore) |
| Quick Wins | *(derived from matrix)* | Top 3–6 numbered quick-win items |
| Recommended Solutions | `## Recommended Solutions` | Up to 6 cards: `01`–`06` with Cost / Setup / Saves |
| Your 4-Day Quick Wins Plan | `## Your 4-Day Quick Wins Plan` | Day 1–4 actions |
| What Comes After Quick Wins | `## What Comes After Quick Wins` | 3 upsell cards: `01`–`03` |
| Financial Impact | `## Financial Impact` | Monthly Net ROI, Weekly Time Returned, Total Monthly Tool Cost |
| Your Next Steps | `## Your Next Steps` | Numbered actions + review call CTA |

### Report rendering architecture

1. **Storage:** Store both `reportMarkdown` (raw) and `reportJson` (parsed) on the Assessment model.
2. **Parser:** Build `lib/reportParser.ts` that splits markdown on `## ` headings matching `SECTION_MAP.md`.
3. **Viewer page:** `/assessments/[id]/report` — two tabs:
   - **Preview:** Rendered report using template styling (dark theme, Montserrat/Inter, orange `#F06000` accents). Replicate the 8 slides as React components; do not embed the 1.4MB bundler file directly.
   - **Edit:** Markdown editor with live preview.
4. **Export:** `GET /api/assessments/:id/export?format=pdf|html` — generate from `reportJson`.
5. **Pipeline hook:** After `POST /api/assessments/:id/run-pipeline` completes, auto-parse the generated markdown into `reportJson`.

### JSON schema

```json
{
  "client_name": "Sunset Gardens Venue",
  "industry": "wedding_venue",
  "assessment_date": "2026-06-11",
  "executive_summary": { "pain": "...", "outcome": "...", "hours_per_week": 8 },
  "matrix": [
    { "pain_point": "...", "effort": "Low", "impact": "High", "quadrant": "quick_win" }
  ],
  "quick_wins": ["...", "..."],
  "solutions": [
    { "title": "...", "cost": "$29/mo", "setup": "2 hrs", "saves": "5 hrs/wk", "body": "..." }
  ],
  "four_day_plan": [
    { "day": 1, "action": "...", "time": "30 min", "outcome": "..." }
  ],
  "deeper_engagement": [
    { "title": "...", "situation": "...", "build": "...", "outcome": "...", "range": "$3K–$5K" }
  ],
  "financial": {
    "hours_per_week": 8,
    "monthly_value": 3440,
    "tool_costs": 150,
    "net_roi": 3290,
    "payback_weeks": 2
  },
  "next_steps": ["...", "..."]
}
```

### Template format notes

- **Bundler format:** The `.html` file is a self-contained bundle (`__bundler/manifest`, `__bundler/template`, embedded fonts/images). Open in a browser to render; JavaScript unpacks assets at runtime.
- **Manual workflow (today):** Copy `*_report.md` → paste into [Gamma](https://gamma.app) or [audittemplate.ai](https://audittemplate.ai) using this template.
- **Web app workflow:** Parse markdown sections → populate template slots → serve at `/assessments/:id/report` with PDF/HTML export.

### Do NOT

- Modify `assessment/prompts/generate_report.txt` section names (already aligned to template)
- Duplicate the Python pipeline — call it via subprocess or shared output files
- Hardcode Gamma API — render in-app; Gamma upload remains a manual fallback
- Try to reverse-engineer the bundler — replicate slide components using the same design tokens

---

## Design system

Match the existing Gamma template brand (Corey Ganim / audittemplate.ai style):

- **Primary accent:** `#F06000` (orange)
- **Font:** Montserrat (headings, weight 800), Inter (body)
- **Background:** `#000` / `#1A1A1A` for report slides; `#FAF9F5` (warm off-white) for app chrome
- **Body text on dark:** `#F0E0D0`
- Sharp edges (minimal border-radius) — match the audittemplate.ai brand
- Clean, professional, not "AI slop" — minimal, high-trust consultant aesthetic

---

## Integrations (phased)

### Phase 1 (MVP) — build now

- [x] Anthropic Claude (via existing `claude.py`)
- [ ] SQLite/Prisma persistence
- [ ] Transcript upload + paste
- [ ] Report preview (markdown → HTML + template-styled slides)
- [ ] Settings from `.env` + DB override

### Phase 2 — next

- [ ] Retell webhook → auto-create assessment + run pipeline
- [ ] Email delivery (Resend or SendGrid) with report link
- [ ] Calendly embed on assessment detail page
- [ ] Export report as `.docx` (for Gamma upload)

### Phase 3 — later

- [ ] Client portal (magic link, read-only report)
- [ ] Stripe payment link on assessment creation
- [ ] Gamma API integration (if available)
- [ ] Make.com/Zapier webhook outbound on `report_ready`

---

## Environment variables

```bash
# Existing (keep)
ANTHROPIC_API_KEY=
CLAUDE_MODEL=claude-sonnet-4-20250514
HOURLY_RATE=100
BOOKING_URL=https://calendly.com/...
COMPANY_NAME=MV Forge
RETELL_WEBHOOK_SECRET=
WEBHOOK_PORT=8080

# New (app layer)
DATABASE_URL=file:./dev.db
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
PYTHON_API_URL=http://localhost:8000   # if split architecture
RESEND_API_KEY=                         # phase 2
```

---

## Acceptance criteria (MVP done when)

1. Operator can create a client and assessment in the UI
2. Operator can paste the sample transcript from `assessment/samples/example_transcript.txt` and click **Generate**
3. Pipeline runs both Claude steps and stores analysis + report in DB
4. Operator can preview (template-styled), lightly edit, and save the report
5. Operator can mark assessment **Delivered** and see it in completed state
6. Operator can generate interview script for any industry from question bank
7. Existing CLI commands still work unchanged
8. `python -m assessment.retell.webhook` still works (or is proxied through new `/api/webhooks/retell`)
9. App runs locally with documented setup in README
10. No secrets committed to git

---

## Implementation order

```
Week 1 — Foundation
  1. Scaffold Next.js app in mvforge/app/ (or mvforge/web/)
  2. Prisma schema + SQLite
  3. FastAPI wrapper around pipeline.py
  4. Client + Assessment CRUD API

Week 2 — Core loop
  5. Assessment detail page with transcript upload
  6. Generate button → pipeline → store results
  7. Report preview (react-markdown + reportParser → reportJson)
  8. Status transitions

Week 3 — Polish + ops
  9. Dashboard with pipeline view
  10. Settings page
  11. Interview script tool
  12. Upsell tracking tab
  13. Template-styled report slides

Week 4 — Integrations
  14. Retell webhook integration
  15. Email delivery
  16. PDF/HTML export
  17. Deploy to Vercel + Railway
```

---

## Code conventions

- **Python:** Keep existing style (`from __future__ import annotations`, pathlib, type hints)
- **TypeScript:** Strict mode, no `any`, Zod for API validation
- **Prompts:** Never hardcode prompts in TS/Python — always load from `assessment/prompts/*.txt`
- **Question bank:** Single source of truth is `assessment/question_bank.yaml`
- **Output files:** CLI still writes to `assessment/output/`; app also persists to DB
- **Minimize scope:** No billing, no multi-tenant, no client auth in MVP
- **Don't break:** Run `python -m assessment.src run -t assessment/samples/example_transcript.txt -c "Test" -i wedding_venue` after API changes

---

## Test scenario (use this to verify)

**Client:** Sunset Gardens Venue  
**Industry:** `wedding_venue`  
**Team size:** 12  
**Transcript:** `assessment/samples/example_transcript.txt`

**Expected pain points in output:**

- Manual Saturday analytics reporting (2 hrs → DashThis $42/mo)
- Slow weekend lead follow-up (speed-to-lead agent upsell ~$1,500)
- Manual Asana project setup (Zapier automation upsell ~$1,500)
- No meeting notes (Fathom.ai free)

**Expected upsells:**

- Speed-to-lead AI agent ($1,500–$3,000)
- Zapier/Asana automation ($1,500)
- Analytics dashboard setup ($500–$1,000)

---

## Files you will likely create

```
mvforge/
├── app/                          # or web/
│   ├── package.json
│   ├── prisma/schema.prisma
│   ├── src/app/...
│   ├── src/lib/reportParser.ts
│   └── README.md
├── assessment/
│   └── api/
│       ├── main.py               # FastAPI
│       └── requirements.txt      # fastapi, uvicorn
└── docker-compose.yml            # optional: app + api + db
```

---

## Non-goals (do not build yet)

- Multi-user team permissions
- White-label / agency portal
- Custom GPT builder UI
- In-app Gamma editor (link out to Gamma)
- Voice agent builder UI (configure in Retell dashboard)
- Payment processing

---

## Agent split

| Agent | Owns |
|-------|------|
| **Cursor** | Python pipeline, prompts, Retell webhook, `question_bank.yaml`, template files, this doc |
| **Hermes** | Next.js UI, Prisma, FastAPI wrapper, dashboard, report renderer, export |

Both agents must `git pull origin main` and read `assessment/HERMES_ONBOARDING.md`, this file, and `assessment/templates/SECTION_MAP.md` before making changes. Push all changes to https://github.com/mvill72/auditforge.

---

## First message back to user

When you start, respond with:

1. Architecture choice (A or B) and why
2. File tree you plan to create
3. Step 1 implementation (scaffold + DB schema)
4. Any blockers or questions

Then begin building. Commit incrementally. Test with the sample transcript after the generate flow works.
