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
    href: "usekarev.com",
    subheading: "",
  },
  {
    title: "IT",
    year: "2026",
    category: "projects",
    href: "https://github.com/harunkkhan/intern",
    subheading: "",
  },
  {
    title: "US Securities & Exchange Commission",
    year: "2026",
    category: "experience",
    href: "sec.gov",
    subheading: "",
  },
  {
    title: "Leidos",
    year: "2025",
    category: "experience",
    href: "leidos.com",
    subheading: "",
  },
  {
    title: "Post-Wildfire Landslides",
    year: "2024",
    category: "projects",
    href: "/postwildfirelandslides",
    subheading: "",
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
