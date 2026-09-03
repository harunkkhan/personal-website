import type { MouseEvent } from "react";
import EnterMark from "./EnterMark";

/**
 * harunkhan.org's directory: three columns of links, and an upward mark that
 * mirrors the portrait's downward one. It shares the root URL with the
 * portrait — the mark swaps between them rather than navigating.
 */
type Row = { label: string; href?: string };

const POSTS: Row[] = [{ label: "README.md", href: "/readme" }];

const EXPERIENCES: Row[] = [
  { label: "Haladir - Intern", href: "https://www.haladir.com/" },
  { label: "SEC - Intern", href: "https://www.sec.gov/" },
  { label: "Leidos - Intern", href: "https://www.leidos.com/" },
];

const CONTACT: Row[] = [
  { label: "Email", href: "mailto:harunkkhan1@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/harun-k-khan/" },
  { label: "Twitter", href: "https://x.com/harunkanwalkhan" },
  { label: "GitHub", href: "https://github.com/harunkkhan" },
  { label: "Substack", href: "https://substack.com/@harunkhan" },
];

/* rows leaving the site open in a new tab; rows staying on it hand the path to
   the app so the transition runs instead of a full page load */
function Row({ row, onOpen }: { row: Row; onOpen: (to: string) => void }) {
  const { label, href } = row;
  if (!href) return <span className="dirRow">{label}</span>;

  if (href.startsWith("/")) {
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      onOpen(href);
    };
    return (
      <a className="dirRow" href={href} onClick={handleClick}>
        {label}
      </a>
    );
  }

  const external = href.startsWith("mailto:")
    ? {}
    : { target: "_blank", rel: "noopener noreferrer" };
  return (
    <a className="dirRow" href={href} {...external}>
      {label}
    </a>
  );
}

function Column({
  title,
  rows,
  onOpen,
}: {
  title: string;
  rows: Row[];
  onOpen: (to: string) => void;
}) {
  return (
    <section className="dirCol" aria-label={title}>
      <h2 className="dirHead">{title}</h2>
      <div className="dirRows">
        {rows.map((row) => (
          <Row key={row.label} row={row} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

export default function DirectoryPage({
  onBack,
  onOpen,
}: {
  onBack: () => void;
  onOpen: (to: string) => void;
}) {
  return (
    <div className="sheet">
      <div className="sheetBody">
        <header className="dirMasthead">
          <h1 className="dirName">harun khan</h1>
          <p className="dirTagline">x, y, z</p>
        </header>

        <div className="dir">
          <Column title="Posts" rows={POSTS} onOpen={onOpen} />
          <Column title="Experiences" rows={EXPERIENCES} onOpen={onOpen} />
          <Column title="Contact" rows={CONTACT} onOpen={onOpen} />
        </div>
      </div>

      <EnterMark to="/" direction="up" label="back to the portrait" onNavigate={onBack} />
    </div>
  );
}
