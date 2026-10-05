import { useEffect, useState, type ReactNode } from "react";
import { EmailIcon, GitHubIcon, GoogleScholarIcon, LinkedInIcon, SubstackIcon, XIcon } from "./icons";
import ContributionGraph, { loadContributions } from "./ContributionGraph";
import { loadViews } from "./views";

const CAP_HEIGHT = 0.65;

type LogoSpec = { src: string; ratio: number; size: number; top?: number };

const logos: Record<"gaia" | "haladir" | "sec" | "leidos" | "patriothacks", LogoSpec> = {
  gaia: { src: "/logos/gaia.png", ratio: 1, size: 1 },
  haladir: { src: "/logos/haladir.png", ratio: 0.85, size: CAP_HEIGHT, top: CAP_HEIGHT },
  sec: { src: "/logos/sec.svg", ratio: 1, size: 1 },
  leidos: { src: "/logos/leidos.svg", ratio: 2.05, size: CAP_HEIGHT, top: CAP_HEIGHT },
  patriothacks: { src: "/logos/patriothacks.png", ratio: 1.42, size: 0.75, top: 0.75 },
};

const socials = [
  { href: "mailto:harunkkhan1@gmail.com", label: "Email", Icon: EmailIcon },
  { href: "https://www.linkedin.com/in/harun-k-khan/", label: "LinkedIn", Icon: LinkedInIcon },
  { href: "https://x.com/harunkanwalkhan", label: "X", Icon: XIcon },
  { href: "https://github.com/harunkkhan", label: "GitHub", Icon: GitHubIcon },
  { href: "https://substack.com/@harunkhan", label: "Substack", Icon: SubstackIcon },
  { href: "https://scholar.google.com/citations?user=TOGE1cgAAAAJ", label: "Google Scholar", Icon: GoogleScholarIcon },
];

function Logo({ name }: { name: keyof typeof logos }) {
  const { src, ratio, size, top } = logos[name];
  return (
    <span
      className="logo"
      style={{ width: `${ratio * size}em`, height: `${size}em`, verticalAlign: top === undefined ? undefined : `${top - size}em`, maskImage: `url(${src})`, WebkitMaskImage: `url(${src})` }}
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
    <span
      role="button"
      tabIndex={0}
      className="toggle"
      aria-expanded={open}
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest("a, .contributions")) setOpen(!open);
      }}
      onKeyDown={(e) => {
        if (e.target !== e.currentTarget || (e.key !== "Enter" && e.key !== " ")) return;
        e.preventDefault();
        setOpen(!open);
      }}
    >
      {open ? expanded : <>[{short}]</>}
    </span>
  );
}

export default function HarunKhanOrgPage() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    loadViews().then(setViews);
    loadContributions();
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
            short="I was born and raised in Northern Virginia, sidequested in San Francisco and attend George Mason University."
            expanded={
              <>
                <span className="para">
                  I was born in Reston, Virginia, and then lived in Manassas, Herndon and eventually Fairfax, VA.
                </span>
                <span className="para">
                  In high school, I was dead set on medicine as my future career path, but pivoted into CS in my senior
                  year of high school. Since then, I published research, snuck into hackathons (and won a few!) and built
                  side projects here and there. It was here that I met the people that fundamentally shaped how I approach
                  the world.
                </span>
                <span className="para">
                  At 18, I started attending George Mason University, where I study CS, Math, Statistics and Biology.
                </span>
                <span className="para">
                  At 19, I left home for the first time, living in San Francisco in Summer 2026. I met some of the
                  greatest engineers and builders here, and realized the world is changing quickly, and the only way to
                  keep up is to spend your time embracing that change.
                </span>
              </>
            }
          />
        </p>

        <p>
          I'm currently working on{" "}
          <Company name="gaia" href="https://gaiasciences.co">
            Gaia Sciences
          </Company>
          .
        </p>

        <p>
          <Toggle
            short="I've spent time exploring various domains of research, including ML and AI research, alongside its applications in biology and math."
            expanded={
              <>
                <span className="para">
                  I'm currently exploring:
                  <span className="para-line">- Long-horizon mathematical reasoning in LLMs</span>
                  <span className="para-line">- Foundational models in protein modeling and structure prediction</span>
                  <span className="para-line">- Context drift and hallucinations in code generation models</span>
                </span>
                <span className="para">
                  Previous Projects:
                  <span className="para-line">
                    -{" "}
                    <a href="https://ieeexplore.ieee.org/abstract/document/10937631" target="_blank" rel="noopener noreferrer">
                      Post-Wildfire Landslides Prediction with Machine Learning
                    </a>
                  </span>
                  <span className="para-line">
                    -{" "}
                    <a href="https://arxiv.org/abs/2407.11283" target="_blank" rel="noopener noreferrer">
                      Air Quality Index Prediction in Mega Cities with Deep Learning
                    </a>
                  </span>
                </span>
              </>
            }
          />
        </p>

        <p>
          <Toggle
            short="I'm also super passionate about venture investing, entrepreneurship and building communities."
            expanded={
              <>
                <span className="para">
                  I enjoy learning about the companies my friends are building and reading about what's new in the
                  scene, across a variety of industries.
                </span>
                <span className="para">
                  Currently, I run{" "}
                  <Company name="patriothacks" href="https://patriothacks.org">
                    PatriotHacks
                  </Company>{" "}
                  as President, where I run a hackathon with 800+ attendees, and obtained sponsorships from Microsoft,
                  Salesforce, AWS and Palantir. I also started the first student-run startup accelerator, and the first
                  production-level developer opportunity for students.
                </span>
              </>
            }
          />
        </p>

        <p>
          <Toggle
            short="In my free time, I build side projects, try new restaurants, and play poker."
            expanded={
              <>
                I've built a ton of projects, and always looking to build useful things for social good!
                <ContributionGraph />
              </>
            }
          />
        </p>

        <p>
          Previously,{"\u2002"}
          <Company name="haladir" href="https://haladir.com">
            Haladir
          </Company>
          ,{" "}
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
