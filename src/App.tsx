import SocialIconLink from "./components/SocialIconLink";
import { EmailIcon, GitHubIcon, InstagramIcon, LinkedInIcon, SubstackIcon, XIcon } from "./components/icons";
import { useEffect, useMemo, useRef, useState } from "react";

type Tab = "home" | "experience" | "education" | "projects" | "contact";
type ProjectsSubTab = "investment" | "cs" | "research";

function normalizeTab(hash: string): Tab {
  const raw = hash.replace(/^#/, "").trim().toLowerCase();
  switch (raw) {
    case "experience":
    case "education":
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
        { id: "education" as const, label: "Education" },
        { id: "projects" as const, label: "Projects" },
        { id: "contact" as const, label: "Contact" },
      ] satisfies ReadonlyArray<{ id: Tab; label: string }>,
    [],
  );

  const [activeTab, setActiveTab] = useState<Tab>(() =>
    normalizeTab(window.location.hash),
  );
  const skipNextHashChange = useRef(false);

  const [expandedExperience, setExpandedExperience] = useState<Set<number>>(new Set());
  const [projectsSubTab, setProjectsSubTab] = useState<ProjectsSubTab>("investment");

  const projectSubTabs = useMemo(
    () =>
      [
        { id: "investment" as const, label: "Investment Projects" },
        { id: "cs" as const, label: "Software Projects" },
        { id: "research" as const, label: "Research & Publications" },
      ] satisfies ReadonlyArray<{ id: ProjectsSubTab; label: string }>,
    [],
  );

  const toggleExperience = (i: number) => {
    setExpandedExperience((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  useEffect(() => {
    const onHashChange = () => {
      if (skipNextHashChange.current) {
        skipNextHashChange.current = false;
        return;
      }
      setActiveTab(normalizeTab(window.location.hash));
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const goToTab = (tabId: Tab) => {
    skipNextHashChange.current = true;
    setActiveTab(tabId);
    window.location.hash = tabId === "home" ? "" : tabId;
  };

  const content = (() => {
    if (activeTab === "experience") {
      const experiences: Array<{
        logo?: string;
        institution: string;
        title: string;
        dates: string;
        body: string;
      }> = [
        {
          logo: "sec-logo.png",
          institution: "US Securities & Exchange Commission",
          title: "Spring Analyst",
          dates: "Feb 2026 - Present",
          body: "Division of Economic & Risk Analysis - Office of Asset Management; Youngest Intern at SEC",
        },
        {
          logo: "leidos-logo.png",
          institution: "Leidos",
          title: "Software Engineering Intern",
          dates: "Jun 2025 - Aug 2025",
          body: "Gunnery Training Systems (GTS) for the US Military; Straight out of HS",
        },
        
      ];
      return (
        <section className="content" aria-label="Experience">
          <h2 className="pageTitle">Experience</h2>
          <p className="pageIntro">
            Where I&apos;ve worked and what I&apos;ve done.
          </p>
          <div className="pageDivider" />
          <div className="pageBody">
            <div className="experienceList">
              {experiences.map((exp, i) => {
                const isExpanded = expandedExperience.has(i);
                return (
                  <article key={i} className="experienceCard">
                    <div className="experienceCardHeader">
                      {exp.logo ? (
                        <img
                          src={`${import.meta.env.BASE_URL}${exp.logo}`}
                          alt=""
                          className="experienceCardLogo"
                          width={48}
                          height={48}
                        />
                      ) : (
                        <div className="experienceCardLogo experienceCardLogoPlaceholder">
                          {exp.institution
                            .split(" ")
                            .map((w) => w[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                      )}
                      <div className="experienceCardTitleBlock">
                        <h3 className="experienceCardTitle">{exp.title}</h3>
                        <p className="experienceCardMeta">
                          {exp.institution} | {exp.dates}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="experienceCardToggle"
                        onClick={() => toggleExperience(i)}
                        aria-expanded={isExpanded}
                        aria-label={isExpanded ? "Collapse description" : "Expand description"}
                      >
                        <svg
                          className={`experienceCardChevron ${isExpanded ? "experienceCardChevronExpanded" : ""}`}
                          viewBox="0 0 24 24"
                          width="20"
                          height="20"
                          aria-hidden
                        >
                          <path
                            fill="currentColor"
                            d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
                          />
                        </svg>
                      </button>
                    </div>
                    {isExpanded && exp.body && (
                      <>
                        <div className="experienceCardDivider" />
                        <p className="experienceCardBody">{exp.body}</p>
                      </>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      );
    }

    if (activeTab === "education") {
      return (
        <section className="content" aria-label="Education">
          <h2 className="pageTitle">Education</h2>
          <p className="pageIntro">
            Schools, programs, and fellowships.
          </p>
          <div className="pageDivider" />
          <div className="pageBody">
            <p className="sectionBody">Coming soon...</p>
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
          <nav className="projectsSubTabs" aria-label="Project categories">
            {projectSubTabs.map((t) => {
              const isActive = t.id === projectsSubTab;
              return (
                <button
                  key={t.id}
                  type="button"
                  className={`projectsSubTab ${isActive ? "projectsSubTabActive" : ""}`}
                  onClick={() => setProjectsSubTab(t.id)}
                  aria-current={isActive ? "true" : undefined}
                >
                  {t.label}
                </button>
              );
            })}
          </nav>
          <div className="pageDivider" />
          <div className="pageBody">
            {projectsSubTab === "investment" && (
              <p className="sectionBody">Investment projects coming soon...</p>
            )}
            {projectsSubTab === "cs" && (
              <p className="sectionBody">Software projects coming soon...</p>
            )}
            {projectsSubTab === "research" && (
              <p className="sectionBody">Research & Publications coming soon...</p>
            )}
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
              <a href="mailto:harunkhaninquiries@gmail.com" className="iconLink">
                <EmailIcon />
                <span className="iconLabel">harunkhaninquiries@gmail.com</span>
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
                href="https://x.com/harunkanwalkhan"
                label="harunkanwalkhan"
                icon={<XIcon />}
              />
              <SocialIconLink
                href="https://substack.com/@harunkhan"
                label="harunkhan"
                icon={<SubstackIcon />}
              />
            </div>
          </div>
        </section>
      );
    }

    return (
      <section className="content contentHome" aria-label="Home">
        <div className="homeIntro">
          <div className="homeText">
            <h1 className="pageTitle">Harun Khan</h1>
            <p className="pageIntro">
              First-Year @ George Mason University
            </p>
          </div>
          <div className="homePhoto">
            <img
              src={`${import.meta.env.BASE_URL}harun-profile.png`}
              alt="Harun Khan"
              width={240}
              height={240}
            />
          </div>
        </div>
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
            <img src={`${import.meta.env.BASE_URL}hk-logo.png`} alt="Harun Khan" width={44} height={44} />
          </a>
          <div className="topNavTabsWrap">
            <nav className="topNavTabs">
          {tabs.map((t) => {
            const isActive = t.id === activeTab;
            return (
              <a
                key={t.id}
                className={`tab ${isActive ? "tabActive" : ""}`}
                href={t.id === "home" ? "#" : `#${t.id}`}
                aria-current={isActive ? "page" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  goToTab(t.id);
                }}
              >
                {t.label}
              </a>
            );
          })}
            </nav>
          </div>
        </div>
      </header>

      <div className="contentWrap">{content}</div>
    </main>
  );
}

