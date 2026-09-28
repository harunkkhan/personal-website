import type { ReactNode } from "react";

type IconProps = { className?: string };

function Icon({
  viewBox = "0 0 24 24",
  className,
  strokeWidth = 1.6,
  children,
}: {
  viewBox?: string;
  className?: string;
  strokeWidth?: number;
  children: ReactNode;
}) {
  return (
    <svg
      className={className}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function EmailIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </Icon>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </Icon>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <Icon className={className} strokeWidth={1.15}>
      <path d="M13.86 10.47 21.14 2h-1.73l-6.32 7.35L8.04 2H2.21l7.64 11.12L2.21 22h1.73l6.68-7.76L15.95 22h5.83Z" />
      <path d="m11.49 13.22-.77-1.11L4.56 3.3h2.65l4.97 7.11.78 1.11 6.45 9.24h-2.65Z" />
    </Icon>
  );
}

export function GitHubIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </Icon>
  );
}

export function SubstackIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M4 4h16" />
      <path d="M4 8.5h16" />
      <path d="M4 13h16v7.5L12 16.6 4 20.5Z" />
    </Icon>
  );
}
