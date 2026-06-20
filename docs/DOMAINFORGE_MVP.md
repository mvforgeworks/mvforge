# DomainForge Scanner MVP — Phase 3 Outline

> **Goal:** Ship a freemium expiring-domain scanner that feeds DomainForge Pro ($49/mo) and ForgeWorks lead-gen.  
> **Target margin:** 80%+ · **Build surface:** Vercel + CasaOS worker · **Owner:** MVForge Ops (#2)

---

## 1. MVP Scope (v0.1)

### In scope
| Component | Description |
|-----------|-------------|
| **Daily expiring feed** | `.com`, `.io`, `.net` domains expiring in 1–7 days |
| **Basic filters** | TLD, length, keyword, no-hyphen, no-number |
| **Valuation stub** | Heuristic score (length, TLD, keyword match) — not full AI yet |
| **Email alerts** | 3 free alerts; unlimited on Pro |
| **Waitlist → Pro** | Stripe Checkout or manual invoice for $49/mo |
| **Public API stub** | `GET /api/scan?days=7&tld=com` (rate-limited) |

### Out of scope (v0.2+)
- Full AI comparables / traffic estimation
- Automated outreach sequences
- Sovereign Dashboard sync
- Self-hosted crawler distribution
- Auction integration

---

## 2. Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Cron (Vercel   │────▶│  Domain list DB  │◀────│  apps/domainforge│
│  or CasaOS)     │     │  (SQLite/Postgres)│     │  Next.js UI      │
└─────────────────┘     └──────────────────┘     └─────────────────┘
         │                        │
         ▼                        ▼
┌─────────────────┐     ┌──────────────────┐
│  Zone file /    │     │  Alert queue     │
│  RDAP sources   │     │  (Resend/SMTP)   │
└─────────────────┘     └──────────────────┘
```

**Recommended v0.1 stack:**
- **UI:** existing `apps/domainforge` landing + `/scanner` route
- **DB:** Vercel Postgres or Turso (SQLite edge)
- **Cron:** Vercel Cron → `apps/domainforge/app/api/cron/ingest/route.ts`
- **Email:** Resend (free tier) or self-hosted SMTP on CasaOS

---

## 3. Data model

```sql
-- domains
id, name, tld, expires_at, source, first_seen_at, status

-- valuations (stub)
domain_id, score, factors_json, computed_at

-- alerts
id, email, filter_json, tier (free|pro), created_at

-- users (optional v0.1 — email-only alerts OK)
id, email, stripe_customer_id, tier
```

---

## 4. Ingestion pipeline

1. **Source:** CZDS zone files (ICANN) or third-party expiring feed API for MVP speed
2. **Parse:** Extract domains with `expires_at` within window
3. **Score:** `score = f(length, tld_weight, keyword_match, hyphen_penalty)`
4. **Store:** Upsert into `domains`; mark dropped when renewed
5. **Notify:** Match active alerts; queue email via Resend

**Cron schedule:** Daily 06:00 UTC (Vercel Cron)

---

## 5. API routes (Next.js App Router)

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/scan` | GET | Public feed (paginated, rate-limited) |
| `/api/alerts` | POST | Create alert (email + filters) |
| `/api/cron/ingest` | GET | Protected by `CRON_SECRET` — runs ingest |

---

## 6. Environment variables

| Variable | Required | Notes |
|----------|----------|-------|
| `DATABASE_URL` | Yes | Postgres or Turso |
| `CRON_SECRET` | Yes | Vercel Cron auth header |
| `RESEND_API_KEY` | Yes (alerts) | Transactional email |
| `STRIPE_SECRET_KEY` | Phase 3b | Pro tier checkout |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Phase 3b | Client checkout |

Marketing-only deploy needs **none** of these. Add when `/scanner` ships.

---

## 7. UI pages

| Path | Status |
|------|--------|
| `/` | ✅ Landing (live) |
| `/scanner` | 🔲 Feed table + filters |
| `/alerts` | 🔲 Simple form |
| `/pricing` | 🔲 Anchor to landing tiers |

---

## 8. GTM & flywheel

1. **Free scanner** → email capture → 3 alerts
2. **Pro upgrade** → unlimited alerts + valuation reports
3. **High-fit domains** → ForgeWorks “acquire + implement” package
4. **Content:** “Domain Wars” series mirroring Resume Wars

---

## 9. Milestones

| Week | Deliverable |
|------|-------------|
| W1 | DB schema + ingest cron + `/api/scan` |
| W2 | `/scanner` UI + alert signup |
| W3 | Resend alerts + basic scoring |
| W4 | Stripe Pro tier + landing polish |

---

## 10. Success metrics

- 100 waitlist signups in 30 days
- 10 Pro conversions ($490 MRR)
- 3 ForgeWorks referrals from domain leads
- Ingest < 24h latency on expiring feed

---

## Related

- [BRANDING.md](BRANDING.md) — DomainForge positioning
- [DEPLOY.md](DEPLOY.md) — Vercel project setup
- `apps/domainforge/` — landing stub
