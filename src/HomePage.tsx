import type { ReactNode } from "react";
import AsciiPortrait from "./AsciiPortrait";

type Item = { label: string; href: string };

const WORK: Item[] = [
  { label: "haladir", href: "https://www.haladir.com/" },
  { label: "karev", href: "https://usekarev.com" },
  { label: "patriothacks", href: "https://patriothacks.org" },
  { label: "computeruse", href: "https://github.com/harunkkhan/computeruse" },
  { label: "post-wildfire landslides", href: "/postwildfirelandslides" },
  { label: "work", href: "/projects" },
];

const SOCIAL: Item[] = [
  { label: "linkedin", href: "https://www.linkedin.com/in/harun-k-khan/" },
  { label: "github", href: "https://github.com/harunkkhan" },
  { label: "x", href: "https://x.com/harunkanwalkhan" },
  { label: "substack", href: "https://substack.com/@harunkhan" },
];

function Link({ href, children }: { href: string; children: ReactNode }) {
  const external = /^https?:/.test(href);
  return (
    <a
      className="link"
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

function Row({ items }: { items: Item[] }) {
  return (
    <nav className="linkRow">
      {items.map((item, i) => (
        <span key={item.href} className="linkRowItem">
          {i > 0 && (
            <span className="dot" aria-hidden="true">
              ·
            </span>
          )}
          <Link href={item.href}>{item.label}</Link>
        </span>
      ))}
    </nav>
  );
}

export default function HomePage() {
  return (
    <div className="home">
      <div className="stage">
        <AsciiPortrait />
      </div>

      <footer className="footer">
        <Row items={WORK} />

        <div className="footerBottom">
          <p className="bio">
            harun khan is building operational superintelligence at{" "}
            <Link href="https://www.haladir.com/">haladir</Link>. before that,
            statistical inference at the{" "}
            <Link href="https://www.sec.gov/">sec</Link> and software for low
            latency tanks at <Link href="https://www.leidos.com/">leidos</Link>.
            based in sf and nova. reach out at{" "}
            <Link href="mailto:harunkkhan1@gmail.com">
              harunkkhan1 [at] gmail [dot] com
            </Link>
            .
          </p>

          <Row items={SOCIAL} />
        </div>
      </footer>
    </div>
  );
}
