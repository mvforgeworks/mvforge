# Agent instructions — MVForge

**Company:** MVForge Systems LLC · Ohio · Veteran-owned  
**Brand reference:** [docs/BRANDING.md](docs/BRANDING.md)

## Monorepo layout

| Path | Owner | Purpose |
|------|-------|---------|
| `apps/hub` | Hermes / Cursor | mvforge.io marketing |
| `apps/auditforge` | Hermes / Cursor | AuditForge marketing |
| `apps/forgeworks` | Hermes / Cursor | ForgeWorks marketing + CyberWarrior campaign |
| `apps/domainforge` | Hermes / Cursor | DomainForge landing (Phase 3) |
| `packages/brand` | Shared | Tokens, footer, nav components |
| `assessment/` | Cursor | Python audit pipeline |

Always read `docs/BRANDING.md` before changing public copy. Strategy wins over legacy Vercel copy.

## Hermes (web apps)

1. Paste [assessment/HERMES_ONBOARDING.md](assessment/HERMES_ONBOARDING.md) to sync pipeline context
2. Read [assessment/HERMES_BUILD_PROMPT.md](assessment/HERMES_BUILD_PROMPT.md) for AuditForge app build spec
3. Marketing sites live in `apps/*` — deploy each to Vercel with root directory set

## Cursor (Python pipeline)

1. Read [assessment/README.md](assessment/README.md)
2. Read [assessment/HERMES_BUILD_PROMPT.md](assessment/HERMES_BUILD_PROMPT.md) — stay aligned with web app

## Doc index

See [docs/INDEX.md](docs/INDEX.md) and [assessment/docs/INDEX.md](assessment/docs/INDEX.md)

## Do not commit

`.env`, legal PDFs, VPN configs, `assessment/output/` generated files, `node_modules/`, `.next/`
