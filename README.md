# MVForge — Forge Family Monorepo

**MVForge Systems LLC** · Ohio · Veteran-owned  
**Tagline:** Forge Your Sovereignty

Sovereign technology company. Product suite: **AuditForge**, **DomainForge**, **ForgeWorks**, **Sovereign Dashboard**.

| Path | Purpose |
|------|---------|
| [docs/BRANDING.md](docs/BRANDING.md) | Canonical brand & product architecture |
| [apps/hub](apps/hub) | mvforge.io marketing site |
| [apps/auditforge](apps/auditforge) | AuditForge marketing site |
| [apps/forgeworks](apps/forgeworks) | ForgeWorks marketing (+ `/cyberwarrior` campaign) |
| [apps/domainforge](apps/domainforge) | DomainForge landing (Phase 3 scanner stub) |
| [packages/brand](packages/brand) | Shared design tokens & components |
| [assessment/](assessment/) | AuditForge Python audit pipeline |
| [docs/DEPLOY.md](docs/DEPLOY.md) | Vercel reconnect instructions |

## Quick start (marketing sites)

```bash
npm install
npm run dev:hub          # http://localhost:3000
npm run dev:auditforge   # http://localhost:3001
npm run dev:forgeworks   # http://localhost:3002  (+ /cyberwarrior)
npm run dev:domainforge  # http://localhost:3003
```

## Quick start (AuditForge pipeline)

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r assessment/requirements.txt
cp .env.example .env

python -m assessment.src run \
  -t assessment/samples/example_transcript.txt \
  -c "Client Name" \
  -i wedding_venue
```

See [assessment/README.md](assessment/README.md) for full pipeline docs.

## Vercel deployment

Deploy each app as a separate Vercel project from this monorepo:

| Vercel project | Root directory | Domain (target) |
|----------------|----------------|-----------------|
| mvforge-hub | `apps/hub` | mvforge.io |
| mvforge-auditforge | `apps/auditforge` | auditforge.mvforge.io |
| mvforge-forgeworks | `apps/forgeworks` | forgeworks.mvforge.io |
| mvforge-domainforge | `apps/domainforge` | domainforge.mvforge.io |

See [docs/DEPLOY.md](docs/DEPLOY.md) for reconnect steps.

## Agents

- Read [docs/BRANDING.md](docs/BRANDING.md) before any public copy changes
- Read [AGENTS.md](AGENTS.md) for pipeline and Hermes coordination
