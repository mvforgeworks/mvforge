import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MVForge | Forge Your Sovereignty",
  description:
    "Sovereign technology for builders who refuse dependency. AuditForge, DomainForge, ForgeWorks — secure, self-owned, mastered.",
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
