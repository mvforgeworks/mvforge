import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AuditForge | Compliance & Security Audit Automation",
  description:
    "Forge auditable truth from chaos. AI-powered compliance and security audits for MSPs, DevOps teams, and veteran IT consultants.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="forge-grid-bg">{children}</body>
    </html>
  );
}
