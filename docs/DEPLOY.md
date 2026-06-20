# Vercel Deployment — MVForge Monorepo

**GitHub:** https://github.com/mvforgeworks/mvforge  
**Status:** Connected and deployed (2026-06-20)

---

## 1. Production URL map

| Vercel project | Root Directory | Production URL | Legacy preview (still works) |
|----------------|----------------|----------------|------------------------------|
| `mvforge-io` | `apps/hub` | **https://mvforge.io** | mvforge-io-five.vercel.app |
| `auditforge-local` | `apps/auditforge` | **https://audit.mvforge.io** | auditforge-local.vercel.app |
| `forgeworks` | `apps/forgeworks` | **https://forge.mvforge.io** | forgeworks-taupe.vercel.app |
| `domainforge` | `apps/domainforge` | **https://domainforge-iota.vercel.app** | ⚠️ Do not use `domainforge-2yew` (stale template) |

> **DNS note:** Custom subdomains use short names (`audit`, `forge`) not product names. Add `domain.mvforge.io` or `domainforge.mvforge.io` when ready.

---

## 2. Reconnect checklist (completed)

For each Vercel project:

- [x] **Git** → `mvforgeworks/mvforge` · branch `main`
- [x] **Root Directory** → see table above
- [x] **Production redeploy** from monorepo
- [ ] **DomainForge custom domain** → pending DNS

### Root directories (exact)

```
mvforge-io        → apps/hub
auditforge-local  → apps/auditforge
forgeworks        → apps/forgeworks
domainforge       → apps/domainforge
```

Install/build commands: **leave blank in dashboard** — each `vercel.json` handles monorepo workspace builds.

---

## 3. Post-deploy verification

### CyberWarrior campaign (ForgeWorks)

| URL | Expected |
|-----|----------|
| https://forge.mvforge.io/cyberwarrior | 200 — campaign page |
| https://forge.mvforge.io/landlords | 307 → `/cyberwarrior` |
| https://forge.mvforge.io/property | 307 → `/cyberwarrior` |
| https://forge.mvforge.io/local-seo | 301 → `/` (legacy trades SEO retired) |
| https://mvforge.io/cyberwarrior | 307 → `https://forge.mvforge.io/cyberwarrior` |

### Content smoke test

| URL | Look for |
|-----|----------|
| https://mvforge.io | "Forge Your Sovereignty" |
| https://audit.mvforge.io | "Forge auditable truth" |
| https://forge.mvforge.io | "under fire, on your terms" |
| https://domainforge-iota.vercel.app | "Hammer expired potential" |

---

## 4. vercel.json reference

Each app: monorepo install/build + security headers + redirects.

### Hub (`apps/hub/vercel.json`)
- `/cyberwarrior`, `/digital-shield` → `https://forge.mvforge.io/cyberwarrior`

### AuditForge (`apps/auditforge/vercel.json`)
- `/demo` → `/#features` · `/assessment` → mailto

### ForgeWorks (`apps/forgeworks/vercel.json`)
- `/landlords`, `/property` → `/cyberwarrior` · `/local-seo` → `/` (301)

### DomainForge (`apps/domainforge/vercel.json`)
- `/scanner` → `/#features` · `/waitlist` → mailto

---

## 5. Environment variables

**Marketing sites:** none required.

Future vars documented in [DOMAINFORGE_MVP.md](DOMAINFORGE_MVP.md) and AuditForge web app spec.

---

## 6. DNS (mvforge.io zone)

| Record | Host | Points to |
|--------|------|-----------|
| A/CNAME | `@` | Vercel (mvforge.io) |
| CNAME | `audit` | Vercel (audit.mvforge.io) |
| CNAME | `forge` | Vercel (forge.mvforge.io) |
| CNAME | `domain` or `domainforge` | *pending* |

Add domains in Vercel → Project → Settings → Domains before creating DNS records.

---

## 7. CLI redeploy (from monorepo root)

```bash
cd mvforge
vercel link --project mvforge-io --yes && vercel deploy --prod --yes
vercel link --project auditforge-local --yes && vercel deploy --prod --yes
vercel link --project forgeworks --yes && vercel deploy --prod --yes
vercel link --project domainforge --yes && vercel deploy --prod --yes
```

Git push to `main` also triggers auto-deploy per project (same repo, different root dirs).

---

## 8. Troubleshooting

| Error | Fix |
|-------|-----|
| `Cannot find module '@mvforge/brand'` | Root Directory must be `apps/<name>` |
| Path `apps/hub/apps/hub` does not exist | CLI deploy from **monorepo root**, not from `apps/hub` |
| Wrong site content | Each project needs unique Root Directory |
| Hub CyberWarrior 404 | Redirect target must be `forge.mvforge.io`, not `forgeworks.mvforge.io` |

---

## 9. Archive old per-repo deploys

Previous repos (`mvforgeworks/mvforge-io`, `auditforge`, `forgeworks`, `domainforge`) can be archived. All production deploys now source from **`mvforgeworks/mvforge`**.

Duplicate project `domainforge-2yew` can be removed after confirming `domainforge` project is canonical.
