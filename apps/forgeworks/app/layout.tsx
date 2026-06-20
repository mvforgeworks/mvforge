import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ForgeWorks | Sovereign Infrastructure Services",
  description:
    "Forge your infrastructure under fire, on your terms. Productized homelab, VPN, and workshop packages from MVForge.",
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
