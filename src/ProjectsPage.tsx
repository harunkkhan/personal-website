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
    subheading: "",
  },
  {
    title: "Karev",
    year: "2026",
    category: "projects",
    href: "https://www.usekarev.com/",
    subheading: "",
  },
  {
    title: "IT",
    year: "2026",
    category: "projects",
    href: "intern.harunkhan.org",
    subheading: "",
  },
  {
    title: "US Securities & Exchange Commission",
    year: "2026",
    category: "experience",
    href: "https://www.sec.gov/",
    subheading: "",
  },
  {
    title: "Leidos",
    year: "2025",
    category: "experience",
    href: "https://www.leidos.com/",
    subheading: "",
  },
  {
    title: "Post-Wildfire Landslides",
    year: "2024",
    category: "projects",
    href: "",
    subheading: "",
  },
];

const CATEGORY_ORDER: Category[] = ["experience", "projects"];

const asUrl = (href?: string): string | null => {
  const trimmed = href?.trim();
  if (!trimmed || /\s/.test(trimmed)) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (/^[\w-]+(\.[\w-]+)+/.test(trimmed)) return `https://${trimmed}`;
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
          const url = asUrl(p.href);
          return (
            <div key={i} className="projectRow">
              <div className="projectRowHead">
                {url ? (
                  <a
                    className="projectRowTitle projectRowTitleLink"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
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
