# Report Template Section Map

The client deliverable uses the **audittemplate.ai / Gamma** HTML template at `assessment-template.html`. Claude generates markdown first; the web app (or manual Gamma upload) maps that markdown into the template slides.

## Template → Markdown mapping

| Template slide | Markdown heading | Content slots |
|----------------|------------------|---------------|
| Cover | *(title slide)* | Client name, industry, assessment date |
| Executive Summary | `## Executive Summary` | The Pain, The Outcome, hours reclaimed stat |
| Impact–Effort Matrix | `## Impact–Effort Matrix` | Table: pain points by quadrant (Quick Wins, Major Projects, Fill-Ins, Ignore) |
| Quick Wins | *(derived from matrix)* | Top 3–6 numbered quick-win items |
| Recommended Solutions | `## Recommended Solutions` | Up to 6 cards: `01`–`06` with Cost / Setup / Saves |
| Your 4-Day Quick Wins Plan | `## Your 4-Day Quick Wins Plan` | Day 1–4 actions |
| What Comes After Quick Wins | `## What Comes After Quick Wins` | 3 upsell cards: `01`–`03` |
| Financial Impact | `## Financial Impact` | Monthly Net ROI, Weekly Time Returned, Total Monthly Tool Cost |
| Your Next Steps | `## Your Next Steps` | Numbered actions + review call CTA |

## Template format notes

- **Bundler format:** The `.html` file is a self-contained bundle (`__bundler/manifest`, `__bundler/template`, embedded fonts/images). Open in a browser to render; JavaScript unpacks assets at runtime.
- **Brand tokens:** Montserrat (800) + Inter (400), orange `#F06000`, dark backgrounds. Do not restyle — inject content only.
- **Manual workflow (today):** Copy `*_report.md` → paste into [Gamma](https://gamma.app) or [audittemplate.ai](https://audittemplate.ai) using this template.
- **Web app workflow (Hermes):** Parse markdown sections → populate template DOM slots → serve as `/assessments/:id/report` and export PDF/HTML.

## Structured JSON for programmatic fill

Hermes should store parsed report data as JSON alongside raw markdown:

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

## File locations

| File | Purpose |
|------|---------|
| `assessment/templates/assessment-template.html` | Blank Gamma bundle (canonical copy) |
| `AI Tools Assessment Template (blank).html` | Original at repo root (keep in sync) |
| `assessment/prompts/generate_report.txt` | Claude prompt — section headings match template |
