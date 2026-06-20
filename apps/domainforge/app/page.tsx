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
    title: "Expiring Domain Scanner",
    desc: "Real-time discovery of expiring and undervalued domains before the market catches on.",
  },
  {
    title: "AI Valuation Engine",
    desc: "Comparables, traffic estimates, and brand-fit scoring — forge decisions with data, not guesswork.",
  },
  {
    title: "Portfolio Command",
    desc: "Manage acquisitions and flips from one dashboard — synced to Sovereign Dashboard (coming soon).",
  },
  {
    title: "Privacy-First Crawler",
    desc: "Self-hosted option with Mullvad/OPNsense integration. Your research stays sovereign.",
  },
];

const TIERS = [
  {
    name: "Scanner",
    price: "Free",
    period: "freemium tier",
    features: [
      "Daily expiring domain feed",
      "Basic valuation signals",
      "Email alerts (limited)",
      "Self-hosted path documented",
    ],
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    features: [
      "Real-time scanner + filters",
      "AI valuation reports",
      "Unlimited alerts",
      "Portfolio tracking",
    ],
  },
  {
    name: "Agency",
    price: "$99",
    period: "/month",
    features: [
      "Lead-gen automation hooks",
      "Forge Network integration",
      "Done-for-you flip referrals",
      "Priority support",
    ],
  },
];

function Nav() {
  return (
    <nav className="nav-links">
      <a href="#features">Features</a>
      <a href="#pricing">Pricing</a>
      <a href={LINKS.hub}>MVForge</a>
      <a href={`mailto:${COMPANY.email}?subject=DomainForge%20Early%20Access`}>Contact</a>
    </nav>
  );
}

export default function DomainForgePage() {
  return (
    <>
      <SiteHeader logo={<ForgeLogo name="DomainForge" />} nav={<Nav />} badge="DOMAIN INTELLIGENCE FORGE" />

      <main>
        <section className="hero container">
          <SectionLabel>VETERAN-OWNED · OHIO · BY MVFORGE · PHASE 3</SectionLabel>
          <h1>
            Hammer expired potential
            <br />
            <span className="forge-gradient-text">into recurring revenue.</span>
          </h1>
          <p className="lead">
            The sovereign domain acquisition engine — scan, value, and monetize
            digital real estate with privacy-first intelligence built for indie
            hackers, agencies, and network engineers.
          </p>
          <div className="hero-actions">
            <ForgeButton href={`mailto:${COMPANY.email}?subject=DomainForge%20Early%20Access`}>
              Request early access
            </ForgeButton>
            <ForgeButton href="#features" variant="secondary">
              See the model
            </ForgeButton>
          </div>
          <div className="scanner-preview">
            <div className="line"><span className="highlight">domainforge scan</span> --expiring --tld com,io</div>
            <div className="line">→ 847 candidates · 12 high-fit · 3 below market</div>
            <div className="line">→ valuation: forge-realty.io · est. $2.4k · brand-fit 94%</div>
            <div className="line">→ alert queued · portfolio synced</div>
          </div>
        </section>

        <section id="features" className="section container">
          <SectionLabel>FLYWHEEL FIT</SectionLabel>
          <h2>Secure names. Feed leads. Compound equity.</h2>
          <div className="feature-grid">
            {FEATURES.map((f) => (
              <Card key={f.title} glow>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        <section id="pricing" className="section container">
          <SectionLabel>PRICING (TARGET)</SectionLabel>
          <h2>Freemium scanner → premium intelligence.</h2>
          <div className="pricing-grid">
            {TIERS.map((tier) => (
              <Card key={tier.name} glow={tier.name === "Pro"}>
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
                  <ForgeButton href={`mailto:${COMPANY.email}?subject=DomainForge%20${tier.name}`}>
                    Join waitlist
                  </ForgeButton>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="section container">
          <div className="cta-band forge-glow">
            <SectionLabel>SCANNER MVP · IN DEVELOPMENT</SectionLabel>
            <h2 style={{ marginTop: 0 }}>Landing live. Scanner ships Phase 3.</h2>
            <p style={{ color: "var(--forge-gray-400)", maxWidth: 520, margin: "0 auto 1.5rem" }}>
              DomainForge feeds ForgeWorks implementations and AuditForge
              compliance engagements — one sovereign stack.
            </p>
            <ForgeButton href={`mailto:${COMPANY.email}?subject=DomainForge%20Waitlist`}>
              {COMPANY.email}
            </ForgeButton>
          </div>
        </section>
      </main>

      <SiteFooter productName="DomainForge" />
    </>
  );
}
