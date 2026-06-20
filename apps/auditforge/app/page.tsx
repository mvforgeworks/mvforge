import {
  Card,
  COMPANY,
  ForgeButton,
  ForgeLogo,
  LINKS,
  SectionLabel,
  SiteFooter,
  SiteHeader,
} from "@mvforge/brand";

const FEATURES = [
  {
    num: "01",
    title: "Config & IaC Analysis",
    desc: "AI-powered review of Terraform, Ansible, network configs, and cloud policies — local or cloud inference.",
  },
  {
    num: "02",
    title: "Evidence Chaining",
    desc: "Every finding linked to source artifacts. Audit-ready documentation generated in minutes, not days.",
  },
  {
    num: "03",
    title: "Compliance Templates",
    desc: "Veteran-focused and DoD-aligned patterns. VA claims audit parallels for consultants who speak both worlds.",
  },
  {
    num: "04",
    title: "One-Click Reports",
    desc: "Professional PDF and DOCX deliverables with executive summaries and prioritized remediation plans.",
  },
  {
    num: "05",
    title: "Self-Hosted Option",
    desc: "Run on your CasaOS/Forgejo stack with MCP integrations. Your data never leaves sovereign infrastructure.",
  },
  {
    num: "06",
    title: "Weekly Intelligence Brief",
    desc: "Stoic, concise summaries of drift, anomalies, and compliance gaps — nothing important slips through.",
  },
];

const TIERS = [
  {
    name: "Self-Hosted",
    price: "Free",
    period: "open source tier",
    features: [
      "Core audit pipeline",
      "Local Ollama inference",
      "Markdown report output",
      "Community support",
    ],
  },
  {
    name: "Professional",
    price: "$149",
    period: "/month",
    features: [
      "Cloud AI analysis (Grok/xAI)",
      "PDF/DOCX export",
      "Evidence chaining",
      "Priority email support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "engagement",
    features: [
      "Full audit suite + API",
      "Dedicated analyst support",
      "Custom compliance templates",
      "On-site workshops",
    ],
  },
];

function Nav() {
  return (
    <nav className="nav-links">
      <a href="#features">Features</a>
      <a href="#pricing">Pricing</a>
      <a href={LINKS.hub}>MVForge</a>
      <a href={`mailto:${COMPANY.email}`}>Contact</a>
    </nav>
  );
}

export default function AuditForgePage() {
  return (
    <>
      <SiteHeader
        logo={<ForgeLogo name="AuditForge" />}
        nav={<Nav />}
        badge="COMPLIANCE & SECURITY FORGE"
      />

      <main>
        <section className="hero container">
          <SectionLabel>VETERAN-OWNED · OHIO · BY MVFORGE</SectionLabel>
          <h1>
            Forge auditable truth
            <br />
            <span className="forge-gradient-text">from chaos.</span>
          </h1>
          <p className="lead">
            The veteran-engineer&apos;s audit automation platform — compliance,
            security, and infrastructure reviews turned into traceable,
            defensible deliverables. Freemium self-hosted → $149/mo Pro.
          </p>
          <div className="hero-actions">
            <ForgeButton href={`mailto:${COMPANY.email}?subject=AuditForge%20Assessment`}>
              Schedule Assessment
            </ForgeButton>
            <ForgeButton href="#features" variant="secondary">
              See capabilities
            </ForgeButton>
          </div>
          <div className="stat-bar">
            <span>
              <strong>70%+</strong> audit time reduction
            </span>
            <span>
              <strong>Self-hosted</strong> or cloud
            </span>
            <span>
              Built for <strong>MSPs & vet consultants</strong>
            </span>
          </div>
        </section>

        <section id="features" className="section container">
          <SectionLabel>CORE CAPABILITIES</SectionLabel>
          <h2>Intelligence forged the moment you connect.</h2>
          <div className="feature-grid">
            {FEATURES.map((f) => (
              <Card key={f.num}>
                <div className="feature-num">{f.num}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        <section id="pricing" className="section container">
          <SectionLabel>PRICING</SectionLabel>
          <h2>Freemium to enterprise. Sovereign at every tier.</h2>
          <div className="pricing-grid">
            {TIERS.map((tier) => (
              <Card key={tier.name} glow={tier.name === "Professional"}>
                <div className="price-card">
                  <h3>{tier.name}</h3>
                  <div className="price">
                    {tier.price}
                    <span> {tier.period}</span>
                  </div>
                  <ul>
                    {tier.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <ForgeButton href={`mailto:${COMPANY.email}?subject=AuditForge%20${tier.name}`}>
                    Get started
                  </ForgeButton>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="section container">
          <div className="cta-band forge-glow">
            <SectionLabel>READY TO AUDIT ON YOUR TERMS</SectionLabel>
            <h2 style={{ marginTop: 0 }}>Deploy sovereign audit intelligence.</h2>
            <p style={{ color: "var(--forge-gray-400)", maxWidth: 520, margin: "0 auto 1.5rem" }}>
              From homelab to enterprise cloud — AuditForge meets you where you operate.
            </p>
            <ForgeButton href={`mailto:${COMPANY.email}?subject=AuditForge%20Inquiry`}>
              {COMPANY.email}
            </ForgeButton>
          </div>
        </section>
      </main>

      <SiteFooter productName="AuditForge" />
    </>
  );
}
