import type { ReactNode } from "react";

/**
 * One mark per row, all of them drawn as outlines on a 24-unit grid: no fill,
 * a hairline stroke in `currentColor`, round caps and joins. Size comes from
 * CSS, so the single .dirIcon rule drives every row and the marks fade with
 * their row on hover.
 *
 * Brand shapes that are solid in the wild (Haladir's lobes, Leidos' facets)
 * are drawn as their outlines here, the way the rest of the set reads.
 */
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

/* ------------------------------------------------------------ companies ---- */

/**
 * Three stacked double-lobes: a pair of circles pinched into a waist. The rows
 * are identical, so one path is stamped out at three heights.
 */
export function HaladirIcon({ className }: IconProps) {
  /* the lobes are sized so the three rows still clear each other once the
     stroke is drawn on: 3 x 2r of shape, 2 x 2.2 of gap, 0.8 of overhang */
  const r = 3;
  const cx = 5.2; // lobe centres sit this far either side of the middle
  const tx = 1.928; // r * cos 50°, where the waist leaves the lobe
  const ty = 2.298; // r * sin 50°
  const pull = 0.878; // control offset that pinches the waist to 0.71 either side
  const l = 12 - cx + tx;
  const rt = 12 + cx - tx;
  return (
    <Icon className={className}>
      {[3.8, 12, 20.2].map((cy) => (
        <path
          key={cy}
          d={`M${l} ${cy - ty}Q12 ${cy + pull} ${rt} ${cy - ty}A${r} ${r} 0 1 1 ${rt} ${
            cy + ty
          }Q12 ${cy - pull} ${l} ${cy + ty}A${r} ${r} 0 1 1 ${l} ${cy - ty}Z`}
        />
      ))}
    </Icon>
  );
}

/**
 * The seal: the double ring its lettering runs between, and the eagle inside —
 * head turned left with its beak, wings swept out and scalloped along the
 * trailing edge, the shield on its breast, the tail fanned below it, and legs
 * reaching down to the olive branch and the arrows.
 *
 * The legs have to hang below the shield and end on the branch and arrows; run
 * them out level with the wings and the whole thing reads as an insect. Drawn
 * on a finer stroke than the rest of the set so this much detail stays open.
 */
export function SecIcon({ className }: IconProps) {
  return (
    <Icon className={className} strokeWidth={1.3}>
      <g>
        <circle cx="12" cy="12" r="11" />
        <circle cx="12" cy="12" r="8.9" />
        {/* head turned left, beak, neck */}
        <circle cx="12.2" cy="8" r="1.25" />
        <path d="M11 8.3 9.9 8.6" />
        <path d="M12.2 9.25v1.05" />
        {/* wings: straight leading edge to the tip, feathers back along it */}
        <path d="M9.8 10.1 4.1 8.2a2.1 2.1 0 0 0 1.9 1.9 2 2 0 0 0 1.8 1 2.2 2.2 0 0 0 2 .8Z" />
        <path d="m14.2 10.1 5.7-1.9a2.1 2.1 0 0 1-1.9 1.9 2 2 0 0 1-1.8 1 2.2 2.2 0 0 1-2 .8Z" />
        {/* the shield on its breast */}
        <path d="M9.6 10.3h4.8v2.6c0 1.6-1.2 2.2-2.4 2.7-1.2-.5-2.4-1.1-2.4-2.7Z" />
        <path d="M9.6 11.7h4.8" />
        <path d="M11.2 11.7v2.9M12.8 11.7v2.9" />
        {/* tail, fanned under the shield */}
        <path d="M12 15.7v2.5M11.3 18 11.7 16.2M12.7 18 12.3 16.2" />
        {/* legs, dropping from behind the shield to the talons */}
        <path d="M11.1 15 10 17M12.9 15l1.1 2" />
        {/* the olive branch in one talon, the arrows in the other. Both are kept
            to two strands, spread wide — any closer and the stroke fills the
            space between them and they read as mittens */}
        <path d="M10 17 6.3 15.3" />
        <path d="M8.4 16.2 7.9 14.6M6.6 15.4 6.1 13.8" />
        <path d="m14 17 3.7-1.3M14 17l2.6-3.2" />
      </g>
    </Icon>
  );
}

/**
 * The screen with its shut eyes, the quill's holder, and the quill — laid out
 * on the logo's own proportions, so the body is half again as wide as it is
 * tall and the feather carries its notch.
 */
export function PatriotHacksIcon({ className }: IconProps) {
  return (
    <Icon className={className} strokeWidth={1.4}>
      <rect x="0.9" y="6.8" width="17.4" height="13.4" rx="3.4" />
      <rect x="3" y="9.5" width="8.7" height="8.2" rx="2.1" />
      <path d="M4.1 14.7a1.1 1.1 0 0 1 2.2 0M8.3 14.7a1.1 1.1 0 0 1 2.2 0" />
      <circle cx="14.9" cy="14.4" r="1.8" />
      <path d="M15.3 12.7 22.9 4 19.2 5.1 19.5 6.9 16.6 6.9Z" />
    </Icon>
  );
}

/**
 * The dart. The top wedge and the sliver under it are a hairline apart in the
 * logo, so they are drawn as one triangle with the divider ruled across it —
 * outlining them separately at row size only closed the gap with scribble.
 */
export function LeidosIcon({ className }: IconProps) {
  return (
    <Icon className={className} strokeWidth={1.55}>
      <path d="M6.55 6.5 22.5 10 4.3 12.3Z" />
      <path d="M5.21 9.95 22.3 9.97" />
      <path d="M1.2 9.9h4.05L4.2 12.2Z" />
      <path d="M4.3 12.3 8.07 15.19 2.82 16.85Z" />
      <path d="M8.07 15.19 22.86 10.64 11.15 17.46Z" />
    </Icon>
  );
}

/* -------------------------------------------------------------- contact ---- */

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

/** x.com, not the old bird: the glyph's own outline, counter and all. */
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

/** Three bars, the last one notched into the bookmark. */
export function SubstackIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M4 4h16" />
      <path d="M4 8.5h16" />
      <path d="M4 13h16v7.5L12 16.6 4 20.5Z" />
    </Icon>
  );
}

/* ---------------------------------------------------------------- posts ---- */

/** A sheet with a turned corner and its lines. */
export function ReadmeIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </Icon>
  );
}

/* --------------------------------------------------------- section heads ---- */

export function BookIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
    </Icon>
  );
}

export function BriefcaseIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </Icon>
  );
}

export function AtSignIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
    </Icon>
  );
}
