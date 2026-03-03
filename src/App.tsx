import SocialIconLink from "./components/SocialIconLink";
import { EmailIcon, GitHubIcon, InstagramIcon, LinkedInIcon, XIcon } from "./components/icons";
import { useEffect, useMemo, useState } from "react";

type Tab = "home" | "experience" | "projects" | "contact";

function normalizeTab(hash: string): Tab {
  const raw = hash.replace(/^#/, "").trim().toLowerCase();
  switch (raw) {
    case "experience":
    case "projects":
    case "contact":
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
          <h2 className="pageTitle">Experience</h2>
          <p className="pageIntro">
            Where I&apos;ve worked and what I&apos;ve done.
          </p>
          <div className="pageDivider" />
          <div className="pageBody">
            <p className="sectionBody"></p>
          </div>
        </section>
      );
    }

    if (activeTab === "projects") {
      return (
        <section className="content" aria-label="Projects">
          <h2 className="pageTitle">Projects</h2>
          <p className="pageIntro">
            A few things I&apos;ve worked on.
          </p>
          <div className="pageDivider" />
          <div className="pageBody">
            <p className="sectionBody">Coming soon...</p>
          </div>
        </section>
      );
    }

    if (activeTab === "contact") {
      return (
        <section className="content" aria-label="Contact">
          <h2 className="pageTitle">Contact</h2>
          <p className="pageIntro">
            Feel free to reach out — I love chatting.
          </p>
          <div className="pageDivider" />

          <div className="contactBlock">
            <h3 className="contactHeading">Emails</h3>
            <div className="contactEmails" aria-label="Email links">
              <a href="mailto:harunkkhan1@gmail.com" className="iconLink">
                <EmailIcon />
                <span className="iconLabel">harunkkhan1@gmail.com</span>
              </a>
              <a href="mailto:hkhan71@gmu.edu" className="iconLink">
                <EmailIcon />
                <span className="iconLabel">hkhan71@gmu.edu</span>
              </a>
            </div>
          </div>

          <div className="contactBlock">
            <h3 className="contactHeading">Socials</h3>
            <div className="contactSocials" aria-label="Social links">
              <SocialIconLink
                href="https://www.instagram.com/harun.k.khan"
                label="harun.k.khan"
                icon={<InstagramIcon />}
              />
              <SocialIconLink
                href="https://x.com/harun.k.khan"
                label="harunkanwalkhan"
                icon={<XIcon />}
              />
            </div>
          </div>
        </section>
      );
    }

    return (
      <section className="content" aria-label="Home">
        <h1 className="pageTitle">Harun Khan</h1>
        <p className="pageIntro">
          Based in Northern Virginia. Current freshman at George Mason University.
        </p>
        <div className="pageDivider" />
        <div className="pageBody">
        <div className="social" aria-label="Social links">
          <SocialIconLink
            href="https://www.linkedin.com/in/harun-k-khan/"
            label="LinkedIn"
            icon={<LinkedInIcon />}
          />
          <SocialIconLink
            href="https://github.com/harunkkhan"
            label="GitHub"
            icon={<GitHubIcon />}
          />
        </div>
        </div>
      </section>
    );
  })();

  return (
    <main className="page">
      <header className="topNav" aria-label="Primary navigation">
        <div className="topNavInner">
          <a href="#" className="siteLogo" aria-label="Home">
            <img src="/hk-logo.png" alt="Harun Khan" width={44} height={44} />
          </a>
          <nav className="topNavTabs">
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
        </div>
      </header>

      <div className="contentWrap">{content}</div>
    </main>
  );
}

