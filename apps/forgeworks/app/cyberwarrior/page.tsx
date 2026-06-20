import type { Metadata } from "next";
import "../globals.css";
import {
  Card,
  COMPANY,
  CYBERWARRIOR,
  ForgeButton,
  LINKS,
  SectionLabel,
  SiteFooter,
  SiteHeader,
} from "@mvforge/brand";

export const metadata: Metadata = {
  title: "CyberWarrior Forge | Secure Property Infrastructure",
  description:
    "Forge Your Digital Shield — hardened rental property websites and security assessments for landlords who demand control. A ForgeWorks campaign by MVForge.",
};

const OFFERS = [
  {
    title: "Hardened Property Websites",
    desc: "Rental sites that attract quality tenants while protecting your data and reputation — encryption, secure hosting, mobile-first portals.",
  },
  {
    title: "Secure Tenant Inquiries",
    desc: "Automated inquiry routing without leaks. You own the stack, the domain, and every lead.",
  },
  {
    title: "Property Security Assessment",
    desc: "Vulnerability and access review paired with AuditForge — plain-English executive report and remediation plan.",
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
      <a href="/#packages">All packages</a>
      <a href={LINKS.hub}>MVForge</a>
      <a href={`mailto:${COMPANY.email}?subject=CyberWarrior%20Forge%20Inquiry`}>Contact</a>
    </nav>
  );
}

export default function CyberWarriorPage() {
  return (
    <>
      <SiteHeader logo={<Logo />} nav={<Nav />} badge={CYBERWARRIOR.subtagline} />

      <main>
        <section className="hero container">
          <SectionLabel>
            {CYBERWARRIOR.name.toUpperCase()} · A {CYBERWARRIOR.parent.toUpperCase()} CAMPAIGN
          </SectionLabel>
          <h1>
            <span className="forge-gradient-text">{CYBERWARRIOR.tagline}</span>
          </h1>
          <p className="lead">
            Practical cybersecurity for {CYBERWARRIOR.scope.toLowerCase()} who demand
            control — hardened websites, secure tenant flows, and audit-ready
            infrastructure. Delivered by ForgeWorks, powered by the MVForge stack.
          </p>
          <div className="hero-actions">
            <ForgeButton href={`mailto:${COMPANY.email}?subject=CyberWarrior%20Forge%20Inquiry`}>
              Speak with a Warrior
            </ForgeButton>
            <ForgeButton href="/#packages" variant="secondary">
              View ForgeWorks packages
            </ForgeButton>
          </div>
        </section>

        <section className="section container">
          <SectionLabel>CAMPAIGN CAPABILITIES</SectionLabel>
          <h2>Security forged for property operators.</h2>
          <div className="feature-grid">
            {OFFERS.map((offer) => (
              <Card key={offer.title} glow>
                <h3>{offer.title}</h3>
                <p>{offer.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="section container">
          <div className="cta-band forge-glow">
            <SectionLabel>PART OF THE FORGE FAMILY</SectionLabel>
            <h2 style={{ marginTop: 0 }}>
              Master brand: {COMPANY.tagline}
            </h2>
            <p style={{ color: "var(--forge-gray-400)", maxWidth: 560, margin: "0 auto 1.5rem" }}>
              CyberWarrior Forge is a targeted campaign — not a separate company.
              Full sovereign infrastructure engagements live under{" "}
              <a href="/" style={{ color: "var(--forge-orange)" }}>ForgeWorks</a>.
              Compliance depth via{" "}
              <a href={LINKS.auditforge} style={{ color: "var(--forge-orange)" }}>AuditForge</a>.
            </p>
            <ForgeButton href={`mailto:${COMPANY.email}?subject=CyberWarrior%20Forge`}>
              {COMPANY.email}
            </ForgeButton>
          </div>
        </section>
      </main>

      <SiteFooter
        productName={CYBERWARRIOR.name}
        extra={
          <p style={{ color: "var(--forge-gray-600)", fontSize: "0.8125rem", marginBottom: "2rem" }}>
            Campaign by {COMPANY.legalName} · {CYBERWARRIOR.parent} · Self-ownership through technical mastery.
          </p>
        }
      />
    </>
  );
}
