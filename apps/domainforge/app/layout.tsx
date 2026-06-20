import type { Metadata } from "next";
import "@mvforge/brand/styles.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "DomainForge | Domain Intelligence & Lead-Gen",
  description:
    "Hammer expired potential into recurring revenue. Privacy-first domain scanning, valuation, and acquisition intelligence from MVForge.",
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
