export const COMPANY = {
  name: "MVForge",
  legalName: "MVForge Systems LLC",
  tagline: "Forge Your Sovereignty",
  subtagline: "SECURE • SELF-OWNED • MASTERED",
  email: "forge@mvforge.io",
  phone: "(937) 729-2945",
  location: "Ohio, USA",
  veteranOwned: true,
} as const;

export const LINKS = {
  hub: "https://mvforge.io",
  auditforge: "https://auditforge.mvforge.io",
  forgeworks: "https://forgeworks.mvforge.io",
  domainforge: "https://domainforge.mvforge.io",
} as const;

export const PRODUCTS = {
  auditforge: {
    name: "AuditForge",
    tagline: "Forge auditable truth from chaos",
    description:
      "Compliance and security audit automation for MSPs, DevOps teams, and veteran IT consultants.",
    href: LINKS.auditforge,
  },
  domainforge: {
    name: "DomainForge",
    tagline: "Hammer expired potential into recurring revenue",
    description:
      "Domain intelligence, valuation, and lead-gen for builders who control their digital real estate.",
    href: LINKS.domainforge,
  },
  forgeworks: {
    name: "ForgeWorks",
    tagline: "Forge your infrastructure — under fire, on your terms",
    description:
      "Productized sovereign infrastructure deployments, workshops, and white-glove implementation.",
    href: LINKS.forgeworks,
  },
  sovereignDashboard: {
    name: "Sovereign Dashboard",
    tagline: "The inner citadel made visible",
    description:
      "Unified control plane for monitoring, deploying, and scaling every Forge project.",
    href: "#",
    comingSoon: true,
  },
} as const;

/** Campaign sub-brand — landlord/security wedge under ForgeWorks only */
export const CYBERWARRIOR = {
  name: "CyberWarrior Forge",
  tagline: "Forge Your Digital Shield",
  subtagline: "SECURE • SELF-OWNED • MASTERED",
  scope: "Landlords & property businesses",
  parent: "ForgeWorks",
} as const;
