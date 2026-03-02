import SocialIconLink from "./components/SocialIconLink";
import { GitHubIcon, LinkedInIcon } from "./components/icons";
import { useEffect, useMemo, useState } from "react";

type Tab = "home" | "experience" | "projects" | "contact";

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
        { id: "experience" as const, label: "Experience" },
        { id: "projects" as const, label: "Projects" },
        { id: "contact" as const, label: "Contact" },
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
    if (activeTab === "experience") {
      return (
        <section className="content" aria-label="Experience">
          <h2 className="sectionTitle">Experience</h2>
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
            A few things I&apos;ve built.
          </p>
        </section>
      );
    }

    if (activeTab === "contact") {
      return (
        <section className="content" aria-label="Contact">
          <h2 className="sectionTitle">Contact</h2>
          <p className="sectionBody">
            Where you can contact me.
          </p>
        </section>
      );
    }

    return (
      <section className="content" aria-label="Home">
        <h1 className="title">Hi, I&apos;m Harun</h1>

        <p className="subtitle">
          Based inNorthern Virginia. Current freshman at George Mason University
        </p>

        <div className="social" aria-label="Social links">
          <SocialIconLink
            href="https://github.com/harunkkhan"
            label="GitHub"
            icon={<GitHubIcon />}
          />
          <SocialIconLink
            href="https://www.linkedin.com/in/harun-k-khan/"
            label="LinkedIn"
            icon={<LinkedInIcon />}
          />
        </div>
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

