import {
  Card,
  COMPANY,
  ForgeButton,
  ForgeLogo,
  LINKS,
  PRODUCTS,
  SectionLabel,
  SiteFooter,
  SiteHeader,
} from "@mvforge/brand";

function Nav() {
  return (
    <nav className="nav-links">
      <a href="#products">Products</a>
      <a href="#flywheel">Model</a>
      <a href={`mailto:${COMPANY.email}`}>Contact</a>
    </nav>
  );
}

export default function HomePage() {
  const productList = [
    PRODUCTS.auditforge,
    PRODUCTS.domainforge,
    PRODUCTS.forgeworks,
    PRODUCTS.sovereignDashboard,
  ];

  return (
    <>
      <SiteHeader logo={<ForgeLogo name={COMPANY.name} />} nav={<Nav />} badge={COMPANY.subtagline} />

      <main>
        <section className="hero container">
          <SectionLabel>VETERAN-OWNED · OHIO · {COMPANY.legalName}</SectionLabel>
          <h1>
            <span className="forge-gradient-text">{COMPANY.tagline}</span>
          </h1>
          <p className="lead">
            Sovereign tools for engineers, MSPs, and veteran builders — audit
            automation, domain intelligence, and hardened infrastructure you
            own outright. No vendor lock-in. No borrowed sovereignty.
          </p>
          <div className="hero-actions">
            <ForgeButton href="#products">Explore the Forge Family</ForgeButton>
            <ForgeButton href={`mailto:${COMPANY.email}`} variant="secondary">
              Speak with the Forge
            </ForgeButton>
          </div>
        </section>

        <section id="products" className="section container">
          <SectionLabel>THE FORGE FAMILY</SectionLabel>
          <h2>Software, services, and command — one stack.</h2>
          <div className="product-grid">
            {productList.map((product) => (
              <Card key={product.name} glow={"comingSoon" in product ? !product.comingSoon : true}>
                <div className="product-card">
                  <h3>
                    {product.name}
                    {"comingSoon" in product && product.comingSoon ? (
                      <span className="coming-soon">COMING SOON</span>
                    ) : null}
                  </h3>
                  <p className="tagline">{product.tagline}</p>
                  <p className="desc">{product.description}</p>
                  {"comingSoon" in product && product.comingSoon ? null : (
                    <ForgeButton href={product.href} variant="ghost">
                      Learn more →
                    </ForgeButton>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section id="flywheel" className="section container">
          <SectionLabel>REVENUE FLYWHEEL</SectionLabel>
          <h2>Cash flow now. Compounding moats next.</h2>
          <div className="feature-grid">
            <Card glow>
              <h3>AuditForge · $49–149/mo</h3>
              <p>
                Freemium self-hosted tier → cloud Pro. Recurring audit intelligence
                for MSPs and consultants. 70%+ time reduction on compliance work.
              </p>
            </Card>
            <Card glow>
              <h3>ForgeWorks · $800–$5k+</h3>
              <p>
                Productized homelab, workshop, and implementation packages.
                Immediate project revenue while SaaS compounds.
              </p>
            </Card>
            <Card>
              <h3>DomainForge · $49/mo Pro</h3>
              <p>
                High-margin scanner and valuation feed. Domain leads flow into
                ForgeWorks acquisitions and AuditForge compliance reviews.
              </p>
            </Card>
            <Card>
              <h3>Sovereign Dashboard</h3>
              <p>
                Retention moat — one control plane for every Forge deployment
                on your homelab or cloud edge.
              </p>
            </Card>
          </div>
        </section>

        <section className="section container">
          <div className="cta-band forge-glow-strong">
            <SectionLabel>ESTABLISH SOVEREIGN CONTACT</SectionLabel>
            <h2 style={{ marginTop: 0 }}>Ready to forge on your terms?</h2>
            <p style={{ color: "var(--forge-gray-400)", maxWidth: 520, margin: "0 auto 1.5rem" }}>
              Mark Villalon · Ohio-based · Remote and on-site across the Forge suite.
              Built for the path to 100% VA + self-employment sovereignty.
            </p>
            <div className="hero-actions">
              <ForgeButton href={`mailto:${COMPANY.email}`}>
                {COMPANY.email}
              </ForgeButton>
              <ForgeButton href={`tel:${COMPANY.phone.replace(/\D/g, "")}`} variant="secondary">
                {COMPANY.phone}
              </ForgeButton>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter
        extra={
          <p style={{ color: "var(--forge-gray-600)", fontSize: "0.8125rem", marginBottom: "2rem" }}>
            Self-ownership through technical mastery.
          </p>
        }
      />
    </>
  );
}
