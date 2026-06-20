/**
 * MVForge design tokens — canonical values for all Forge apps.
 * CSS variables are generated in styles.css from these values.
 */
export const tokens = {
  color: {
    black: "#0a0a0b",
    gray950: "#111113",
    gray900: "#18181b",
    gray800: "#27272a",
    gray600: "#52525b",
    gray400: "#a1a1aa",
    gray200: "#e4e4e7",
    orange: "#f97316",
    orangeGlow: "#fb923c",
    orangeEmber: "#ea580c",
    red: "#ef4444",
    silver: "#94a3b8",
    steel: "#64748b",
  },
  gradient: {
    forge: "linear-gradient(135deg, #fb923c 0%, #f97316 45%, #ef4444 100%)",
    forgeSubtle: "linear-gradient(180deg, rgba(249,115,22,0.08) 0%, transparent 100%)",
    shield: "linear-gradient(145deg, #27272a 0%, #18181b 50%, #0a0a0b 100%)",
  },
  font: {
    sans: 'var(--font-geist-sans, "Inter", system-ui, -apple-system, sans-serif)',
    mono: 'ui-monospace, "SF Mono", "Cascadia Code", monospace',
  },
  radius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    full: "9999px",
  },
  shadow: {
    glow: "0 0 40px rgba(249, 115, 22, 0.15)",
    glowStrong: "0 0 60px rgba(249, 115, 22, 0.25)",
    card: "0 4px 24px rgba(0, 0, 0, 0.4)",
  },
  spacing: {
    section: "4rem",
    container: "1120px",
  },
} as const;

export type ForgeMarkVariant = "full" | "icon" | "anvil" | "shield";
