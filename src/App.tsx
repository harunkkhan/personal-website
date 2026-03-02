import SocialIconLink from "./components/SocialIconLink";
import { GitHubIcon, LinkedInIcon } from "./components/icons";
import { useEffect, useMemo, useState } from "react";

type Tab = "home" | "investment-pitches" | "projects" | "resume";

function normalizeTab(hash: string): Tab {
  const raw = hash.replace(/^#/, "").trim().toLowerCase();
  switch (raw) {
    case "investment-pitches":
    case "projects":
    case "resume":
      return raw;
    case "home":
    case "":
    default:
      return "home";
  }
}

export default function App() {
  const tabs = useMemo(
    () =>
      [
        { id: "home" as const, label: "Home" },
        { id: "investment-pitches" as const, label: "Investment Pitches" },
        { id: "projects" as const, label: "Projects" },
        { id: "resume" as const, label: "Resume" },
      ] satisfies ReadonlyArray<{ id: Tab; label: string }>,
    [],
  );

  const [activeTab, setActiveTab] = useState<Tab>(() =>
    normalizeTab(window.location.hash),
  );

  useEffect(() => {
    const onHashChange = () => setActiveTab(normalizeTab(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const content = (() => {
    if (activeTab === "investment-pitches") {
      return (
        <section className="content" aria-label="Investment Pitches">
          <h2 className="sectionTitle">Investment Pitches</h2>
          <p className="sectionBody">
            A place for memos, theses, and write-ups. Add links to PDFs, blog
            posts, or decks here.
          </p>
        </section>
      );
    }

    if (activeTab === "projects") {
      return (
        <section className="content" aria-label="Projects">
          <h2 className="sectionTitle">Projects</h2>
          <p className="sectionBody">
            Highlight a few things you&apos;ve built. Keep it short: what it is,
            why it matters, and a link.
          </p>
        </section>
      );
    }

    if (activeTab === "resume") {
      return (
        <section className="content" aria-label="Resume">
          <h2 className="sectionTitle">Resume</h2>
          <p className="sectionBody">
            Link out to a PDF resume or add a minimal timeline here.
          </p>
        </section>
      );
    }

    return (
      <section className="content" aria-label="Home">
        <h1 className="title">Hi, I&apos;m Harun</h1>

        <p className="subtitle">
          Building things on the web. Based in SF.
          <br />
          Always learning.
        </p>

        <nav className="links" aria-label="Primary links">
          <a className="link" href="#projects">
            Book Tracker
          </a>
          <a className="link" href="#investment-pitches">
            View my writing
          </a>
        </nav>

        <div className="social" aria-label="Social links">
          <SocialIconLink
            href="https://github.com/"
            label="GitHub"
            icon={<GitHubIcon />}
          />
          <SocialIconLink
            href="https://www.linkedin.com/"
            label="LinkedIn"
            icon={<LinkedInIcon />}
          />
        </div>

        <a className="email" href="mailto:harun@example.com">
          harun[at]example[dot]com
        </a>
      </section>
    );
  })();

  return (
    <main className="page">
      <header className="topNav" aria-label="Primary navigation">
        <nav className="topNavInner">
          {tabs.map((t) => {
            const isActive = t.id === activeTab;
            return (
              <a
                key={t.id}
                className={`tab ${isActive ? "tabActive" : ""}`}
                href={`#${t.id === "home" ? "" : t.id}`}
                aria-current={isActive ? "page" : undefined}
              >
                {t.label}
              </a>
            );
          })}
        </nav>
      </header>

      <div className="contentWrap">{content}</div>
    </main>
  );
}

