import { useState } from "react";

type Category = "projects" | "experience" | "art" | "misc";

type Project = {
  title: string;
  year: string;
  category: Category;
  image?: string;
  href?: string;
  description?: string;
  details?: string;
};

const PROJECTS: Project[] = [
  { title: "Haladir", year: "2026", category: "experience", image: "/haladir-logo.png" },
  { title: "Karev", year: "2026", category: "projects", image: "/karev-logo.png" },
  { title: "IT", year: "2026", category: "projects", image: "/internshiptracker-logo.svg" },
  { title: "US Securities & Exchange Commission", year: "2026", category: "experience", image: "/sec-logo.png" },
  { title: "Leidos", year: "2025", category: "experience", image: "/leidos-logo.png" },
  { title: "Post-Wildfire Landslides", year: "2024", category: "projects", image: "/postwildfire-landslides.png" },
];

const CATEGORY_ORDER: Category[] = ["experience", "projects", "art", "misc"];

const slugify = (s: string) => s.toLowerCase().trim().replace(/\s+/g, "-");

function ProjectImage({ project }: { project: Project }) {
  return project.image ? (
    <img src={project.image} alt={project.title} />
  ) : (
    <span className="projectCardSoon">coming soon...</span>
  );
}

export default function ProjectsPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | Category>("all");

  const filters: ("all" | Category)[] = [
    "all",
    ...CATEGORY_ORDER.filter((c) => PROJECTS.some((p) => p.category === c)),
  ];

  if (selected !== null) {
    const p = PROJECTS[selected];
    const openCategory = (c: "all" | Category) => {
      setFilter(c);
      setSelected(null);
    };
    return (
      <section className="projectDetail" aria-label={p.title || "project"}>
        <nav className="projectCrumb" aria-label="breadcrumb">
          <button
            type="button"
            className="projectCrumbLink"
            onClick={() => openCategory("all")}
          >
            work
          </button>
          <span className="projectCrumbSep">/</span>
          <button
            type="button"
            className="projectCrumbLink"
            onClick={() => openCategory(p.category)}
          >
            {p.category}
          </button>
          <span className="projectCrumbSep">/</span>
          <span className="projectCrumbCurrent">
            {slugify(p.title) || "[title]"}
          </span>
        </nav>

        <div className="projectDetailLayout">
          <div className="projectDetailImage">
            <ProjectImage project={p} />
          </div>

          <div className="projectDetailText">
            <h1 className="projectDetailTitle">{p.title || "[title]"}</h1>
            <div className="projectDetailYear">{p.year || "[year]"}</div>
            {p.description ? (
              <p className="projectDetailBody">{p.description}</p>
            ) : null}

            {p.href ? (
              <a
                className="projectDetailLink"
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                visit →
              </a>
            ) : null}
          </div>
        </div>

        {p.details ? (
          <div className="projectDetailMore">{p.details}</div>
        ) : null}
      </section>
    );
  }

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

      <div className="projectsGrid">
        {PROJECTS.map((p, i) =>
          filter !== "all" && p.category !== filter ? null : (
            <button
              key={i}
              type="button"
              className="projectCard"
              onClick={() => setSelected(i)}
            >
              <div className="projectCardImage">
                <ProjectImage project={p} />
              </div>
              <div className="projectCardTitle">{p.title || "[title]"}</div>
              <div className="projectCardYear">{p.year || "[year]"}</div>
            </button>
          ),
        )}
      </div>

      <p className="projectsSoon">more coming soon...</p>
    </section>
  );
}
