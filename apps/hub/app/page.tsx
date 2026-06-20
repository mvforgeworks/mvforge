import {
  Card,
  COMPANY,
  ForgeButton,
  PRODUCTS,
  SectionLabel,
  SiteFooter,
  SiteHeader,
} from "@mvforge/brand";

function Logo() {
  return (
    <a href="/" className="logo-mark">
      <span className="logo-icon">F</span>
      <span>{COMPANY.name}</span>
    </a>
  );
}

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
      <SiteHeader logo={<Logo />} nav={<Nav />} badge={COMPANY.subtagline} />

      <main>
        <section className="hero container">
          <SectionLabel>VETERAN-OWNED · OHIO · {COMPANY.legalName}</SectionLabel>
          <h1>
            <span className="forge-gradient-text">{COMPANY.tagline}</span>
          </h1>
          <p className="lead">
            Practical sovereign tools for engineers, MSPs, and builders who demand
            control — forged under pressure, owned by you, mastered for the long
            haul.
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
          <h2>Four precision tools. One sovereign stack.</h2>
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
          <SectionLabel>PORTFOLIO FLYWHEEL</SectionLabel>
          <h2>Content → tools → dashboard → implementation → compounding equity</h2>
          <div className="feature-grid">
            <Card>
              <h3>AuditForge finds gaps</h3>
              <p>
                Automate compliance and security audits across configs, IaC, and
                cloud environments — defensible reports in hours, not weeks.
              </p>
            </Card>
            <Card>
              <h3>DomainForge secures names</h3>
              <p>
                Scan, value, and acquire digital real estate before competitors
                do — privacy-first intelligence for sovereign builders.
              </p>
            </Card>
            <Card>
              <h3>ForgeWorks implements</h3>
              <p>
                Fixed-price homelab, VPN, and workshop packages that turn audit
                findings into hardened, self-hosted reality.
              </p>
            </Card>
            <Card>
              <h3>Sovereign Dashboard commands</h3>
              <p>
                One pane of glass to deploy, monitor, and scale every Forge
                project from your own infrastructure.
              </p>
            </Card>
          </div>
        </section>

        <section className="section container">
          <div className="cta-band forge-glow">
            <SectionLabel>ESTABLISH SOVEREIGN CONTACT</SectionLabel>
            <h2 style={{ marginTop: 0 }}>Ready to forge on your terms?</h2>
            <p style={{ color: "var(--forge-gray-400)", maxWidth: 520, margin: "0 auto 1.5rem" }}>
              Mark Villalon · Ohio-based · Available for remote and on-site
              engagements across the Forge product suite.
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
