import { useState } from "react";

type Category = "projects" | "experience";

type Project = {
  title: string;
  year: string;
  category: Category;
  href?: string;
  subheading?: string;
};

const PROJECTS: Project[] = [
  {
    title: "Haladir",
    year: "2026",
    category: "experience",
    href: "haladir.com",
    subheading: "The Operational Superintelligence Company. Backed by YC, BoxGroup, Susa Ventures, SV Angel, and more. Joined as first hire in Summer 2026.",
  },
  {
    title: "PatriotHacks",
    year: "2026",
    category: "projects",
    href: "patriothacks.org",
    subheading: "Hosted largest tech event in school history with 800+ attendees, raising $50K and sponsored by Microsoft, AWS, EY and more. Became president during freshman year.",
  },
  {
    title: "computeruse",
    year: "2026",
    category: "projects",
    href: "https://github.com/harunkkhan/computeruse",
    subheading: "Background recorder agent that logs everyday use on your computer as traces to improve computer-use agent development.",
  },
  {
    title: "Karev",
    year: "2026",
    category: "projects",
    href: "usekarev.com",
    subheading: "Simplifying and preventing errors in medical billing using OCR and custom transformer. Already serving multiple clinics in the US.",
  },
  {
    title: "Internship Tracker",
    year: "2026",
    category: "projects",
    href: "https://github.com/harunkkhan/intern",
    subheading: "Tracking internships & applications using confirmation emails rather than inputting in Notion or Excel to track them myself.",
  },
  {
    title: "US Securities & Exchange Commission",
    year: "2026",
    category: "experience",
    href: "sec.gov",
    subheading: "Regulates the securities market in the US. Joined to work on statistical inference for project cost-savings estimations for briefing on paper + e-delivery. Was youngest intern of all time.",
  },
  {
    title: "harunkhan.org",
    year: "2025",
    category: "projects",
    href: "harunkhan.org",
    subheading: "This website.",
  },
  {
    title: "Leidos",
    year: "2025",
    category: "experience",
    href: "leidos.com",
    subheading: "F500 government contractor. Joined to work on low latency tank simulations for US Army. Joined right after high school graduation.",
  },
  {
    title: "Post-Wildfire Landslides",
    year: "2024",
    category: "projects",
    href: "/postwildfirelandslides",
    subheading: "Predicting post-wildfire landslides using machine learning with a 0.9940 AUC score. Published during high school.",
  },
];

const CATEGORY_ORDER: Category[] = ["experience", "projects"];

const resolveHref = (
  href?: string,
): { url: string; external: boolean } | null => {
  const trimmed = href?.trim();
  if (!trimmed || /\s/.test(trimmed)) return null;
  if (trimmed.startsWith("/")) return { url: trimmed, external: false };
  if (/^https?:\/\//i.test(trimmed)) return { url: trimmed, external: true };
  if (/^[\w-]+(\.[\w-]+)+/.test(trimmed))
    return { url: `https://${trimmed}`, external: true };
  return null;
};

export default function ProjectsPage() {
  const [filter, setFilter] = useState<"all" | Category>("all");

  const filters: ("all" | Category)[] = [
    "all",
    ...CATEGORY_ORDER.filter((c) => PROJECTS.some((p) => p.category === c)),
  ];

  return (
    <section className="projectsPage" aria-label="work">
      <a className="projectsHome" href="/">
        ← home
      </a>

      <h1 className="projectsHeading">work</h1>

      <div className="projectsFilters">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            className={
              "projectsFilter" + (filter === f ? " projectsFilterActive" : "")
            }
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="projectsList">
        {PROJECTS.map((p, i) => {
          if (filter !== "all" && p.category !== filter) return null;
          const link = resolveHref(p.href);
          return (
            <div key={i} className="projectRow">
              <div className="projectRowHead">
                {link ? (
                  <a
                    className="projectRowTitle projectRowTitleLink"
                    href={link.url}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {p.title || "[title]"}
                  </a>
                ) : (
                  <span className="projectRowTitle">{p.title || "[title]"}</span>
                )}
                <span className="projectRowYear">{p.year || "[year]"}</span>
              </div>
              <p className="projectRowSub">
                {p.subheading || `[brief info ${i + 1}]`}
              </p>
            </div>
          );
        })}
      </div>

      <p className="projectsSoon">more coming soon...</p>
    </section>
  );
}
