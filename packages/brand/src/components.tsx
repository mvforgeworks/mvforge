import type { ReactNode } from "react";
import { COMPANY } from "./constants";

type SiteHeaderProps = {
  logo: ReactNode;
  nav?: ReactNode;
  badge?: string;
};

export function SiteHeader({ logo, nav, badge }: SiteHeaderProps) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid var(--forge-gray-800)",
        background: "rgba(10, 10, 11, 0.85)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "1rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        {logo}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          {badge && (
            <span
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                color: "var(--forge-orange)",
                fontWeight: 600,
              }}
            >
              {badge}
            </span>
          )}
          {nav}
        </div>
      </div>
    </header>
  );
}

type SiteFooterProps = {
  productName?: string;
  extra?: ReactNode;
};

export function SiteFooter({ productName, extra }: SiteFooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        borderTop: "1px solid var(--forge-gray-800)",
        background: "var(--forge-gray-950)",
        marginTop: "4rem",
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "3rem 1.5rem",
        }}
      >
        {extra}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "1.5rem",
            fontSize: "0.875rem",
            color: "var(--forge-gray-400)",
          }}
        >
          <div>
            <strong style={{ color: "var(--forge-gray-200)" }}>
              {productName ?? COMPANY.name}
            </strong>
            <div style={{ marginTop: "0.5rem" }}>
              A division of {COMPANY.legalName}
            </div>
            <div style={{ marginTop: "0.25rem" }}>
              {COMPANY.email} · {COMPANY.phone}
            </div>
            <div>{COMPANY.location}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            {COMPANY.veteranOwned && (
              <div style={{ color: "var(--forge-orange)", marginBottom: "0.5rem" }}>
                VETERAN-OWNED
              </div>
            )}
            <div>© {year} {COMPANY.legalName}. All rights reserved.</div>
            <div style={{ marginTop: "0.5rem", display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

export function ForgeButton({ href, children, variant = "primary" }: ButtonProps) {
  const styles: Record<string, React.CSSProperties> = {
    primary: {
      background: "linear-gradient(135deg, var(--forge-orange), var(--forge-red))",
      color: "#fff",
      border: "none",
    },
    secondary: {
      background: "transparent",
      color: "var(--forge-gray-200)",
      border: "1px solid var(--forge-gray-600)",
    },
    ghost: {
      background: "transparent",
      color: "var(--forge-orange)",
      border: "none",
      padding: 0,
    },
  };

  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: variant === "ghost" ? 0 : "0.75rem 1.5rem",
        borderRadius: "0.5rem",
        fontWeight: 600,
        fontSize: "0.9375rem",
        transition: "opacity 0.2s",
        ...styles[variant],
      }}
    >
      {children}
    </a>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontSize: "0.75rem",
        letterSpacing: "0.16em",
        fontWeight: 700,
        color: "var(--forge-orange)",
        marginBottom: "0.75rem",
      }}
    >
      {children}
    </p>
  );
}

export function Card({ children, glow }: { children: ReactNode; glow?: boolean }) {
  return (
    <div
      className={glow ? "forge-glow" : undefined}
      style={{
        background: "var(--forge-gray-900)",
        border: "1px solid var(--forge-gray-800)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
      }}
    >
      {children}
    </div>
  );
}
