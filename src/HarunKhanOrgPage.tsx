import { useEffect, useState, type ReactNode } from "react";
import { EmailIcon, GitHubIcon, LinkedInIcon, SubstackIcon, XIcon } from "./icons";
import { loadViews } from "./views";

const logos = {
  gaia: { src: "/logos/gaia.png", ratio: 1 },
  haladir: { src: "/logos/haladir.png", ratio: 0.85 },
  sec: { src: "/logos/sec.svg", ratio: 1 },
  leidos: { src: "/logos/leidos.svg", ratio: 2.05 },
  patriothacks: { src: "/logos/patriothacks.png", ratio: 1.42 },
};

const socials = [
  { href: "mailto:harunkkhan1@gmail.com", label: "Email", Icon: EmailIcon },
  { href: "https://www.linkedin.com/in/harun-k-khan/", label: "LinkedIn", Icon: LinkedInIcon },
  { href: "https://x.com/harunkanwalkhan", label: "X", Icon: XIcon },
  { href: "https://github.com/harunkkhan", label: "GitHub", Icon: GitHubIcon },
  { href: "https://substack.com/@harunkhan", label: "Substack", Icon: SubstackIcon },
];

function Logo({ name }: { name: keyof typeof logos }) {
  const { src, ratio } = logos[name];
  return (
    <span
      className="logo"
      style={{ width: `${ratio}em`, maskImage: `url(${src})`, WebkitMaskImage: `url(${src})` }}
      aria-hidden="true"
    />
  );
}

function Company({ name, href, children }: { name: keyof typeof logos; href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Logo name={name} />
      {children}
    </a>
  );
}

function Toggle({ short, expanded }: { short: ReactNode; expanded: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <button type="button" className="toggle" aria-expanded={open} onClick={() => setOpen(!open)}>
      {open ? expanded : <>[{short}]</>}
    </button>
  );
}

export default function HarunKhanOrgPage() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    loadViews().then(setViews);
  }, []);

  return (
    <div className="page">
      <main className="column">
        <header className="header">
          <h1 className="name">Harun Khan</h1>
          {views !== null && (
            <span className="views">
              {views.toLocaleString("en-US")} {views === 1 ? "view" : "views"}
            </span>
          )}
        </header>

        <p>
          <Toggle
            short="I'm born and raised in Northern Virginia, sidequested in San Francisco and attend George Mason University."
            expanded="I grew up in Northern Virginia, spent some time building in San Francisco, and now study at George Mason University. Both places have shaped how I think about work and community."
          />
        </p>

        <p>
          I'm currently working on{" "}
          <Company name="gaia" href="https://gaiasciences.vercel.app">
            Gaia Sciences
          </Company>
          .
        </p>

        <p>
          <Toggle
            short="I've spent time exploring various domains of research."
            expanded="I've explored research across a few different fields, following whichever questions I found most interesting at the time."
          />
        </p>

        <p>
          <Toggle
            short={
              <>
                I'm also super passionate about venture investing, entrepreneurship and building communities at{" "}
                <Logo name="patriothacks" />
                PatriotHacks.
              </>
            }
            expanded={
              <>
                I enjoy learning how early-stage companies get started and funded, and I help bring builders together
                through <Logo name="patriothacks" />
                PatriotHacks, George Mason's hackathon.
              </>
            }
          />
        </p>

        <p>
          <Toggle
            short="In my free time, I build side projects, try new restaurants, and play poker."
            expanded="Outside of work, I tinker on small projects, look for new places to eat, and play poker with friends."
          />
        </p>

        <p>
          Previously at{" "}
          <Company name="haladir" href="https://haladir.com">
            Haladir
          </Company>
          , the{" "}
          <Company name="sec" href="https://sec.gov">
            US Securities &amp; Exchange Commission
          </Company>{" "}
          and{" "}
          <Company name="leidos" href="https://leidos.com">
            Leidos
          </Company>
          .
        </p>
      </main>

      <footer className="footer">
        {socials.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            {...(href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
          >
            <Icon className="socialIcon" />
          </a>
        ))}
      </footer>
    </div>
  );
}
