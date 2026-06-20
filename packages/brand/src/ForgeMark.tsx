"use client";

import { useId } from "react";
import type { ForgeMarkVariant } from "./tokens";

type ForgeMarkProps = {
  variant?: ForgeMarkVariant;
  size?: number;
  className?: string;
};

/**
 * Stylized F — anvil face + circuit node + shield arc.
 * Unique gradient IDs per instance to avoid SVG collisions.
 */
export function ForgeMark({ variant = "icon", size = 32, className }: ForgeMarkProps) {
  const gradId = useId().replace(/:/g, "");

  if (variant === "shield") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden
      >
        <defs>
          <linearGradient id={gradId} x1="8" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fb923c" />
            <stop offset="0.5" stopColor="#f97316" />
            <stop offset="1" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        <path
          d="M24 4L8 10v12c0 9.5 6.8 18.4 16 22 9.2-3.6 16-12.5 16-22V10L24 4z"
          stroke={`url(#${gradId})`}
          strokeWidth="2"
          fill="rgba(249,115,22,0.06)"
        />
        <path
          d="M18 22h12M18 28h8"
          stroke={`url(#${gradId})`}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="32" cy="18" r="2.5" fill="#fb923c" />
        <path d="M32 18v6" stroke="#fb923c" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (variant === "anvil") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden
      >
        <defs>
          <linearGradient id={gradId} x1="4" y1="8" x2="44" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fb923c" />
            <stop offset="1" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        <path
          d="M6 34h36l-4 6H10l-4-6z"
          fill="#27272a"
          stroke={`url(#${gradId})`}
          strokeWidth="1.5"
        />
        <path
          d="M12 34V22c0-2 1.5-4 4-4h16c2.5 0 4 2 4 4v12"
          fill="#18181b"
          stroke={`url(#${gradId})`}
          strokeWidth="1.5"
        />
        <path d="M20 18V10h8v8" stroke={`url(#${gradId})`} strokeWidth="2" strokeLinecap="round" />
        <circle cx="36" cy="14" r="3" fill="#f97316" opacity="0.9" />
        <path d="M36 17v4M33 14h6" stroke="#fb923c" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fb923c" />
          <stop offset="1" stopColor="#ef4444" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="40" height="40" rx="10" fill="#18181b" stroke={`url(#${gradId})`} strokeWidth="1.5" />
      <path d="M16 14h16v4H20v6h10v4H20v6h-4V14z" fill={`url(#${gradId})`} />
      <circle cx="36" cy="12" r="2" fill="#fb923c" />
      <path d="M36 14v3" stroke="#fb923c" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

type ForgeLogoProps = {
  name: string;
  href?: string;
};

export function ForgeLogo({ name, href = "/" }: ForgeLogoProps) {
  return (
    <a href={href} className="logo-mark">
      <span className="logo-icon forge-mark-wrap">
        <ForgeMark variant="icon" size={28} />
      </span>
      <span>{name}</span>
    </a>
  );
}
