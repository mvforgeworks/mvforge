# Vercel Deployment — MVForge Monorepo

Each Forge marketing site is a separate Vercel project pointing at **this repo** with a different **Root Directory**.

## Project matrix

| Vercel project (existing) | Root Directory | Workspace | Target domain |
|---------------------------|----------------|-----------|---------------|
| `mvforge-io-five` (or new) | `apps/hub` | `@mvforge/hub` | `mvforge.io` |
| `auditforge-local` | `apps/auditforge` | `@mvforge/auditforge` | `auditforge.mvforge.io` |
| `forgeworks-taupe` | `apps/forgeworks` | `@mvforge/forgeworks` | `forgeworks.mvforge.io` |
| *(create new)* | `apps/domainforge` | `@mvforge/domainforge` | `domainforge.mvforge.io` |

Each app includes a `vercel.json` that installs from the monorepo root and builds the correct workspace.

## Reconnect an existing project

1. Open [Vercel Dashboard](https://vercel.com/dashboard) → select project
2. **Settings → General → Root Directory** → set to `apps/hub` (or matching app)
3. **Settings → Git** → confirm repo is connected; trigger redeploy on `main`
4. **Settings → Domains** → add custom domain when ready

No environment variables required for static marketing sites.

## Create DomainForge project

1. **Add New → Project** → import same GitHub repo
2. Root Directory: `apps/domainforge`
3. Framework: Next.js (auto-detected)
4. Deploy → assign `domainforge.mvforge.io`

## CyberWarrior campaign route

Landlord/security wedge lives at **`/cyberwarrior`** on the ForgeWorks deployment:

- Preview: `https://forgeworks-taupe.vercel.app/cyberwarrior`
- Production: `https://forgeworks.mvforge.io/cyberwarrior`

Not a separate Vercel project — keeps master brand on MVForge hub.

## Local verify before deploy

```bash
npm install
npm run build
npm run dev:hub          # :3000
npm run dev:auditforge   # :3001
npm run dev:forgeworks   # :3002  (+ /cyberwarrior)
npm run dev:domainforge  # :3003
```

## DNS (when cutting over from *.vercel.app)

| Record | Host | Value |
|--------|------|-------|
| A / CNAME | `@` | Vercel (see domain settings) |
| CNAME | `auditforge` | `cname.vercel-dns.com` |
| CNAME | `forgeworks` | `cname.vercel-dns.com` |
| CNAME | `domainforge` | `cname.vercel-dns.com` |

## Troubleshooting

**`Cannot find module '@mvforge/brand'`** — Root Directory must be `apps/<name>`, not repo root. The `vercel.json` install command runs `npm install --prefix ../..` to resolve workspaces.

**Wrong site deploys** — Each Vercel project must have a unique Root Directory. Do not point multiple projects at repo root.
