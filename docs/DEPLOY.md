# Vercel Deployment — MVForge Monorepo

**GitHub:** https://github.com/mvforgeworks/mvforge

Each Forge marketing site is a **separate Vercel project** pointing at this monorepo with a different **Root Directory**.

---

## 1. Project matrix

| Vercel project | Root Directory | Workspace | Target domain |
|----------------|----------------|-----------|---------------|
| `mvforge-io` (existing) | `apps/hub` | `@mvforge/hub` | `mvforge.io` |
| `auditforge` (existing) | `apps/auditforge` | `@mvforge/auditforge` | `auditforge.mvforge.io` |
| `forgeworks` (existing) | `apps/forgeworks` | `@mvforge/forgeworks` | `forgeworks.mvforge.io` |
| `domainforge` (existing) | `apps/domainforge` | `@mvforge/domainforge` | `domainforge.mvforge.io` |

---

## 2. Reconnect existing projects (5 min each)

For **each** Vercel project:

1. [Vercel Dashboard](https://vercel.com/dashboard) → select project
2. **Settings → Git**
   - Connect repo: `mvforgeworks/mvforge`
   - Production branch: `main`
3. **Settings → General → Root Directory**
   - Enable override → set path from table above
4. **Settings → General → Build & Development**
   - Framework: Next.js
   - Install / Build commands: **leave blank** — each `vercel.json` handles this
5. **Deployments → Redeploy** latest `main`

### Verify build logs show:
```
npm install --prefix ../..
npm run build --prefix ../.. -w @mvforge/hub
```
(workspace name varies per project)

---

## 3. vercel.json reference (per app)

Each app ships a full config with monorepo install/build, security headers, and redirects.

### Hub (`apps/hub/vercel.json`)
- Redirects `/cyberwarrior` and `/digital-shield` → ForgeWorks campaign
- Security headers on all routes

### AuditForge (`apps/auditforge/vercel.json`)
- `/demo` → `/#features`
- `/assessment` → mailto intake

### ForgeWorks (`apps/forgeworks/vercel.json`)
- `/landlords`, `/property` → `/cyberwarrior`
- `/local-seo` → `/` (301 — retires legacy trades SEO)

### DomainForge (`apps/domainforge/vercel.json`)
- `/scanner` → `/#features` (until MVP ships)
- `/waitlist` → mailto intake

---

## 4. Environment variables

### Marketing sites (current)
**None required.** All four apps are static Next.js pages.

### DomainForge scanner MVP (Phase 3 — see [DOMAINFORGE_MVP.md](DOMAINFORGE_MVP.md))

| Variable | App | When |
|----------|-----|------|
| `DATABASE_URL` | domainforge | Scanner v0.1 |
| `CRON_SECRET` | domainforge | Vercel Cron ingest |
| `RESEND_API_KEY` | domainforge | Email alerts |
| `STRIPE_SECRET_KEY` | domainforge | Pro tier checkout |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | domainforge | Client checkout |

### AuditForge app (future — pipeline wrapper)

| Variable | App | When |
|----------|-----|------|
| `ANTHROPIC_API_KEY` | auditforge | Web pipeline |
| `DATABASE_URL` | auditforge | Client/assessment CRUD |

Set in Vercel → Project → Settings → Environment Variables. Scope to Production + Preview as needed.

---

## 5. CyberWarrior campaign route

Landlord/security wedge: **`/cyberwarrior`** on ForgeWorks only.

- Production: `https://forgeworks.mvforge.io/cyberwarrior`
- Hub redirects `/cyberwarrior` to ForgeWorks (see hub `vercel.json`)

---

## 6. DNS cutover

| Record | Host | Value |
|--------|------|-------|
| A / CNAME | `@` on mvforge.io | Vercel-assigned |
| CNAME | `auditforge` | `cname.vercel-dns.com` |
| CNAME | `forgeworks` | `cname.vercel-dns.com` |
| CNAME | `domainforge` | `cname.vercel-dns.com` |

Add each domain in the matching Vercel project → Settings → Domains.

---

## 7. Local verify

```bash
git clone https://github.com/mvforgeworks/mvforge.git
cd mvforge && npm install && npm run build
npm run dev:hub          # :3000
npm run dev:auditforge   # :3001
npm run dev:forgeworks   # :3002  (+ /cyberwarrior)
npm run dev:domainforge  # :3003
```

---

## 8. Troubleshooting

| Error | Fix |
|-------|-----|
| `Cannot find module '@mvforge/brand'` | Root Directory must be `apps/<name>`, not repo root |
| Wrong site content | Each project needs unique Root Directory |
| Build runs from wrong workspace | Check `buildCommand` in that app's `vercel.json` |
| Legacy trades SEO URLs | ForgeWorks redirects `/local-seo` → `/` |

---

## 9. Migrating from old per-repo deploys

Previous separate repos (`mvforgeworks/mvforge-io`, `auditforge`, `forgeworks`, `domainforge`) can be archived after Vercel projects point at `mvforgeworks/mvforge` monorepo.
