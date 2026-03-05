import SocialIconLink from "./components/SocialIconLink";
import { EmailIcon, GitHubIcon, InstagramIcon, LinkedInIcon, SubstackIcon, XIcon } from "./components/icons";
import AchievementsPage from "./pages/AchievementsPage";
import HarunKhanOrgPage from "./pages/HarunKhanOrgPage";
import InvestmentProjectsPage from "./pages/InvestmentProjectsPage";
import LeidosGTSPage from "./pages/LeidosGTSPage";
import PatriotHacksPage from "./pages/PatriotHacksPage";
import ResearchPublicationsPage from "./pages/ResearchPublicationsPage";
import SECOfficePage from "./pages/SECOfficePage";
import SMIFPage from "./pages/SMIFPage";
import SoftwareProjectsPage from "./pages/SoftwareProjectsPage";
import { useEffect, useMemo, useRef, useState } from "react";

type Tab =
  | "home"
  | "harunkhan-org"
  | "experience"
  | "education"
  | "projects"
  | "contact"
  | "investment-projects"
  | "software-projects"
  | "research-publications"
  | "achievements"
  | "patriothacks"
  | "smif"
  | "sec-office"
  | "leidos-gts";
type ProjectsSubTab = "investment" | "cs" | "research";
type EducationSubTab = "education" | "extracurriculars" | "programs" | "awards";

function normalizeTab(hash: string): Tab {
  const raw = hash.replace(/^#/, "").trim().toLowerCase();
  switch (raw) {
    case "home":
      return "home";
    case "harunkhan-org":
      return "harunkhan-org";
    case "investment-projects":
      return "investment-projects";
    case "software-projects":
      return "software-projects";
    case "research-publications":
      return "research-publications";
    case "achievements":
      return "achievements";
    case "patriothacks":
      return "patriothacks";
    case "smif":
      return "smif";
    case "sec-office":
      return "sec-office";
    case "leidos-gts":
      return "leidos-gts";
    case "":
    case "experience":
    case "education":
    case "projects":
    case "contact":
    default:
      return "harunkhan-org";
  }
}

export default function App() {
  const tabs = useMemo(
    () =>
      [
        { id: "home" as const, label: "Home" },
        { id: "harunkhan-org" as const, label: "harunkhan.org" },
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
  const [expandedEducationCards, setExpandedEducationCards] = useState<Set<string>>(new Set());
  const [projectsSubTab, setProjectsSubTab] = useState<ProjectsSubTab>("investment");
  const [educationSubTab, setEducationSubTab] = useState<EducationSubTab>("education");

  const projectSubTabs = useMemo(
    () =>
      [
        { id: "investment" as const, label: "Investment Projects" },
        { id: "cs" as const, label: "Software Projects" },
        { id: "research" as const, label: "Research & Publications" },
      ] satisfies ReadonlyArray<{ id: ProjectsSubTab; label: string }>,
    [],
  );

  const educationSubTabs = useMemo(
    () =>
      [
        { id: "education" as const, label: "Education" },
        { id: "extracurriculars" as const, label: "School Involvement" },
        { id: "programs" as const, label: "Programs" },
        { id: "awards" as const, label: "Achievements" },
      ] satisfies ReadonlyArray<{ id: EducationSubTab; label: string }>,
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

  const toggleEducationCard = (key: string) => {
    setExpandedEducationCards((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  type BulletWithLinks = {
    text: string;
    profileHref?: string;
    picturesHref?: string;
  };

  type EducationCardItem = {
    logo?: string;
    institution: string;
    title: string;
    dates: string;
    body?: string;
    bullets?: (string | BulletWithLinks)[];
    /** Link for "Profile" (e.g. award profile page). Shown below card title. */
    href?: string;
    /** Link for "Pictures" (e.g. gallery or photos page). Shown below card title. */
    picturesHref?: string;
  };

  const renderEducationCards = (
    cards: EducationCardItem[],
    prefix: string,
    expandable = true,
    showInstitution = true,
    showLogoPlaceholder = true,
  ) => (
    <div className="experienceList">
      {cards.map((item, i) => {
        const key = `${prefix}-${i}`;
        const isExpanded = expandedEducationCards.has(key);
        const initialsSource = item.institution || item.title;
        const showLogo = showLogoPlaceholder || item.logo;
        return (
          <article key={key} className="experienceCard">
            <div className="experienceCardHeader">
              {showLogo &&
                (item.logo ? (
                  <img
                    src={`${import.meta.env.BASE_URL}${item.logo}`}
                    alt=""
                    className="experienceCardLogo"
                    width={48}
                    height={48}
                  />
                ) : (
                  <div className="experienceCardLogo experienceCardLogoPlaceholder">
                    {initialsSource
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                ))}
              <div className="experienceCardTitleBlock">
                <h3 className="experienceCardTitle">{item.title}</h3>
                <p className="experienceCardMeta">
                  {showInstitution && item.institution
                    ? `${item.institution} | ${item.dates}`
                    : item.dates}
                </p>
                {(item.href || item.picturesHref) && (
                  <p className="experienceCardLinks">
                    {item.href && (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="experienceCardLink"
                      >
                        Profile
                      </a>
                    )}
                    {item.href && item.picturesHref && " · "}
                    {item.picturesHref && (
                      <a
                        href={item.picturesHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="experienceCardLink"
                      >
                        Pictures
                      </a>
                    )}
                  </p>
                )}
              </div>
              {expandable && (
                <button
                  type="button"
                  className="experienceCardToggle"
                  onClick={() => toggleEducationCard(key)}
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
              )}
            </div>
            {expandable && isExpanded && (item.body || (item.bullets && item.bullets.length > 0)) && (
              <>
                <div className="experienceCardDivider" />
                {item.bullets && item.bullets.length > 0 ? (
                  <ul className="experienceCardBullets">
                    {item.bullets.map((bullet, j) => {
                      const isWithLinks = typeof bullet !== "string";
                      const text = isWithLinks ? bullet.text : bullet;
                      const profileHref = isWithLinks ? bullet.profileHref : undefined;
                      const picturesHref = isWithLinks ? bullet.picturesHref : undefined;
                      const hasLinks = profileHref || picturesHref;
                      return (
                        <li key={j} className="experienceCardBody">
                          {text}
                          {hasLinks && (
                            <>
                              {" | "}
                              {profileHref && (
                                <a
                                  href={profileHref}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="experienceCardLink"
                                >
                                  Profile
                                </a>
                              )}
                              {profileHref && picturesHref && " | "}
                              {picturesHref && (
                                <a
                                  href={picturesHref}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="experienceCardLink"
                                >
                                  Pictures
                                </a>
                              )}
                            </>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  item.body && <p className="experienceCardBody">{item.body}</p>
                )}
              </>
            )}
          </article>
        );
      })}
    </div>
  );

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

  useEffect(() => {
    if (activeTab === "harunkhan-org") document.title = "harunkhan.org";
    else if (activeTab === "investment-projects") document.title = "Investment Projects — Harun Khan";
    else if (activeTab === "software-projects") document.title = "Software Projects — Harun Khan";
    else if (activeTab === "research-publications") document.title = "Research — Harun Khan";
    else if (activeTab === "achievements") document.title = "Achievements — Harun Khan";
    else if (activeTab === "patriothacks") document.title = "PatriotHacks — Harun Khan";
    else if (activeTab === "smif") document.title = "SMIF — Harun Khan";
    else if (activeTab === "sec-office") document.title = "SEC — Harun Khan";
    else if (activeTab === "leidos-gts") document.title = "Leidos — Harun Khan";
    else document.title = "Harun Khan";
  }, [activeTab]);

  const goToTab = (tabId: Tab) => {
    skipNextHashChange.current = true;
    setActiveTab(tabId);
    window.location.hash = tabId === "harunkhan-org" ? "" : tabId;
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
            My educational history.
          </p>
          <nav className="projectsSubTabs" aria-label="Education categories">
            {educationSubTabs.map((t) => {
              const isActive = t.id === educationSubTab;
              return (
                <button
                  key={t.id}
                  type="button"
                  className={`projectsSubTab ${isActive ? "projectsSubTabActive" : ""}`}
                  onClick={() => setEducationSubTab(t.id)}
                  aria-current={isActive ? "true" : undefined}
                >
                  {t.label}
                </button>
              );
            })}
          </nav>
          <div className="pageDivider" />
          <div className="pageBody">
            {educationSubTab === "education" &&
              renderEducationCards(
                [
                  {
                    institution: "",
                    logo: "gmu-logo.png",
                    title: "George Mason University",
                    dates: "Aug 2025 - Present",
                    body: "Building up myself.",
                  },
                  {
                    institution: "",
                    logo: "woodson-logo.png",
                    title: "Woodson High School",
                    dates: "Aug 2021 - Jun 2025",
                    body: "Met the smartest people I know + had a blast.",
                  },
                ],
                "education",
                true,
                false,
              )}
            {educationSubTab === "extracurriculars" &&
              renderEducationCards(
                [
                  {
                    institution: "PatriotHacks",
                    title: "President",
                    dates: "2025 - Present",
                    body: "Hosting GMU's largest hackathon with 800+ attendees; became President in less than a year.",
                  },
                  {
                    institution: "Montano Student Managed Investment Fund (SMIF)",
                    title: "Head of Training & Associate",
                    dates: "2025 - Present",
                    body: "First experience in finance; became Head of Training in less than a year.",
                  },
                ],
                "extracurriculars",
              )}
            {educationSubTab === "programs" &&
              renderEducationCards(
                [
                  {
                    institution: "",
                    title: "Immersion Programs & Discovery Days",
                    dates: "HS & College | Ongoing",
                    bullets: [
                      "Expedition EY | Ernst & Young | 2026",
                      "First Year Immersion Program | Oliver Wyman | 2026",
                      "SIG Discovery Day | Susquehanna International Group | 2025",
                      "Exploring Complex Solutions in a Complex World | The Mercatus Center | 2025",
                    ],
                  },
                ],
                "programs",
                true,
                false,
                false,
              )}
            {educationSubTab === "awards" &&
              renderEducationCards(
                [
                  {
                    institution: "",
                    title: "Awards, Honors & Achievements",
                    dates: "HS & College | Ongoing",
                    bullets: [
                      "SEC Scholar | Only freshman selected; 1 of 100 selected among undergrad, grad & law students",
                      {
                        text: "FCPS Student Peace Award Winner | 1 of 26 selected across FCPS",
                        profileHref: "https://fairfax.studentpeaceawards.org/harun-khan/",
                        picturesHref: "https://drive.google.com/drive/folders/1zK15lw8jhIdUYv1lz5QNIB6xE0ki8Fuo?usp=sharing",
                      },
                      "IEEE MIT Undergraduate Research & Technology Conference | Paper Publication & Presenter",
                      "ASPRS & AGU | Largest Geospatial Research Conferences in the World | Accepted Presenter",
                      {
                        text: "Congressional App Challenge 3rd Place Winner | District 11",
                        picturesHref: "https://drive.google.com/drive/folders/1nQRSIwWXiqy5uY0ma26VMgIwPAI83qO1?usp=sharing",
                      }
                    ],
                  },
                ],
                "awards",
                true,
                false,
                false,
              )}
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

    if (activeTab === "harunkhan-org") {
      return <HarunKhanOrgPage />;
    }

    if (activeTab === "investment-projects") {
      return <InvestmentProjectsPage />;
    }
    if (activeTab === "software-projects") {
      return <SoftwareProjectsPage />;
    }
    if (activeTab === "research-publications") {
      return <ResearchPublicationsPage />;
    }
    if (activeTab === "achievements") {
      return <AchievementsPage />;
    }
    if (activeTab === "patriothacks") {
      return <PatriotHacksPage />;
    }
    if (activeTab === "smif") {
      return <SMIFPage />;
    }
    if (activeTab === "sec-office") {
      return <SECOfficePage />;
    }
    if (activeTab === "leidos-gts") {
      return <LeidosGTSPage />;
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
          <p className="sectionBody homeBodyText">
            ___
          </p>
          <div className="pageDivider pageDividerTight" />
          <div className="social" aria-label="Social links">
            <a href="mailto:harunkkhan1@gmail.com" className="iconLink" aria-label="Email">
              <EmailIcon />
              <span className="iconLabel">harunkkhan1@gmail.com</span>
            </a>
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
      {activeTab !== "harunkhan-org" &&
        activeTab !== "investment-projects" &&
        activeTab !== "software-projects" &&
        activeTab !== "research-publications" &&
        activeTab !== "achievements" &&
        activeTab !== "patriothacks" &&
        activeTab !== "smif" &&
        activeTab !== "sec-office" &&
        activeTab !== "leidos-gts" && (
        <header className="topNav" aria-label="Primary navigation">
          <div className="topNavInner">
            <a
              href="#"
              className="siteLogo"
              aria-label="harunkhan.org"
              onClick={(e) => {
                e.preventDefault();
                goToTab("harunkhan-org");
              }}
            >
              <img src={`${import.meta.env.BASE_URL}hk-logo.png`} alt="Harun Khan" width={44} height={44} />
            </a>
            <div className="topNavTabsWrap">
              <nav className="topNavTabs">
                {tabs.filter((t) => t.id === "home" || t.id === "harunkhan-org").map((t) => {
                  const isActive = t.id === activeTab;
                  return (
                    <a
                      key={t.id}
                      className={`tab ${isActive ? "tabActive" : ""}`}
                      href={t.id === "harunkhan-org" ? "#" : `#${t.id}`}
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
      )}

      <div className="contentWrap">{content}</div>
    </main>
  );
}

