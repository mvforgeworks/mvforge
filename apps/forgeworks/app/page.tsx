import {
  Card,
  COMPANY,
  ForgeButton,
  LINKS,
  SectionLabel,
  SiteFooter,
  SiteHeader,
} from "@mvforge/brand";

const MODEL = [
  {
    title: "We assess sovereignty gaps",
    desc: "AuditForge findings and your infrastructure goals define the scope — no generic templates.",
  },
  {
    title: "You own the stack",
    desc: "Every deployment runs on hardware and accounts you control. Full documentation handoff included.",
  },
  {
    title: "We forge under fire",
    desc: "Fixed-price packages with clear deliverables. Veteran-priority pricing and VR&E-aligned pathways.",
  },
];

const PACKAGES = [
  {
    name: "Sovereign Homelab in a Box",
    price: "From $2,500",
    desc: "Production-grade homelab: OPNsense, WireGuard, CasaOS, Forgejo, and Nextcloud — hardened and documented.",
    items: [
      "Network segmentation & firewall rules",
      "VPN remote access setup",
      "Self-hosted Git + file sync",
      "Backup & recovery runbook",
    ],
  },
  {
    name: "Audit Prep Workshop",
    price: "From $1,500",
    desc: "Half-day virtual workshop preparing your team for compliance audits — tied to AuditForge outputs.",
    items: [
      "Pre-audit checklist walkthrough",
      "Evidence collection workflows",
      "Remediation prioritization",
      "Q&A with veteran engineer",
    ],
  },
  {
    name: "CCNA Mastery Intensive",
    price: "From $800",
    desc: "PacketMan-powered CCNA prep for engineers claiming network sovereignty — labs, drills, accountability.",
    items: [
      "Structured lab curriculum",
      "Weekly live sessions",
      "Exam strategy & weak-spot drills",
      "Veteran cohort option",
    ],
  },
  {
    name: "White-Glove Implementation",
    price: "From $5,000",
    desc: "Custom engagements bridging AuditForge reports and DomainForge acquisitions into production reality.",
    items: [
      "Scoped SOW from audit findings",
      "Ansible/VPN/productized deploys",
      "30-day post-deploy support",
      "Sovereign Dashboard integration path",
    ],
  },
];

function Logo() {
  return (
    <a href="/" className="logo-mark">
      <span className="logo-icon">W</span>
      <span>ForgeWorks</span>
    </a>
  );
}

function Nav() {
  return (
    <nav className="nav-links">
      <a href="#model">Model</a>
      <a href="#packages">Packages</a>
      <a href="/cyberwarrior">CyberWarrior</a>
      <a href={LINKS.hub}>MVForge</a>
      <a href={`mailto:${COMPANY.email}`}>Contact</a>
    </nav>
  );
}

export default function ForgeWorksPage() {
  return (
    <>
      <SiteHeader
        logo={<Logo />}
        nav={<Nav />}
        badge="PROFESSIONAL SERVICES FORGE"
      />

      <main>
        <section className="hero container">
          <SectionLabel>VETERAN-OWNED · OHIO · BY MVFORGE</SectionLabel>
          <h1>
            Forge your infrastructure
            <br />
            <span className="forge-gradient-text">under fire, on your terms.</span>
          </h1>
          <p className="lead">
            Productized sovereign deployments, workshops, and white-glove
            implementation for veterans, MSPs, and engineers who refuse
            dependency.
          </p>
          <div className="hero-actions">
            <ForgeButton href={`mailto:${COMPANY.email}?subject=ForgeWorks%20Engagement`}>
              Request engagement
            </ForgeButton>
            <ForgeButton href="#packages" variant="secondary">
              View packages
            </ForgeButton>
          </div>
        </section>

        <section id="model" className="section container">
          <SectionLabel>THE FORGEWORKS MODEL</SectionLabel>
          <h2>Philosophy meets execution.</h2>
          <div className="feature-grid">
            {MODEL.map((item) => (
              <Card key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        <section id="packages" className="section container">
          <SectionLabel>PRODUCTIZED PACKAGES</SectionLabel>
          <h2>Fixed scope. Clear pricing. Sovereign outcomes.</h2>
          <div className="package-grid">
            {PACKAGES.map((pkg) => (
              <Card key={pkg.name} glow>
                <div className="package-card">
                  <h3>{pkg.name}</h3>
                  <div className="price">{pkg.price}</div>
                  <p style={{ color: "var(--forge-gray-400)", fontSize: "0.9375rem", marginBottom: "1rem" }}>
                    {pkg.desc}
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem" }}>
                    {pkg.items.map((item) => (
                      <li
                        key={item}
                        style={{
                          padding: "0.35rem 0",
                          color: "var(--forge-gray-400)",
                          fontSize: "0.9375rem",
                        }}
                      >
                        → {item}
                      </li>
                    ))}
                  </ul>
                  <ForgeButton href={`mailto:${COMPANY.email}?subject=ForgeWorks%20${encodeURIComponent(pkg.name)}`}>
                    Request package
                  </ForgeButton>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="section container">
          <SectionLabel>CYBERWARRIOR FORGE CAMPAIGN</SectionLabel>
          <div className="cta-band">
            <h2 style={{ marginTop: 0 }}>Landlords & property operators</h2>
            <p style={{ color: "var(--forge-gray-400)", maxWidth: 560, margin: "0 auto 1.5rem" }}>
              Targeted security marketing for rental and property businesses —
              hardened sites, tenant portals, and audit-ready infrastructure.
              Campaign only; master identity remains Forge Your Sovereignty.
            </p>
            <ForgeButton href="/cyberwarrior">Explore CyberWarrior Forge →</ForgeButton>
          </div>
        </section>

        <section className="section container">
          <SectionLabel>POWERED BY DOMAINFORGE</SectionLabel>
          <div className="cta-band">
            <h2 style={{ marginTop: 0 }}>Smarter domains. Sovereign presence.</h2>
            <p style={{ color: "var(--forge-gray-400)", maxWidth: 560, margin: "0 auto 1.5rem" }}>
              Every ForgeWorks engagement pairs with DomainForge intelligence —
              acquisition, valuation, and brand-fit analysis for your digital
              real estate.
            </p>
            <ForgeButton href={`mailto:${COMPANY.email}?subject=DomainForge%20Inquiry`} variant="secondary">
              Explore DomainForge
            </ForgeButton>
          </div>
        </section>

        <section className="section container">
          <div className="cta-band forge-glow">
            <SectionLabel>READY TO BUILD</SectionLabel>
            <h2 style={{ marginTop: 0 }}>Let&apos;s forge your sovereign stack.</h2>
            <ForgeButton href={`mailto:${COMPANY.email}?subject=ForgeWorks%20Inquiry`}>
              {COMPANY.email}
            </ForgeButton>
          </div>
        </section>
      </main>

      <SiteFooter productName="ForgeWorks" />
    </>
  );
}
