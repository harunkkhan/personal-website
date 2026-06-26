import { useState } from "react";

type Category = "projects" | "experience";

type DetailSection = {
  heading?: string;
  body?: string | string[];
};

type Project = {
  title: string;
  year: string;
  category: Category;
  image?: string;
  href?: string;
  linkText?: string;
  heading?: string;
  description?: string | string[];
  sections?: DetailSection[];
};

const PROJECTS: Project[] = [
  {
    title: "Haladir",
    year: "2026",
    category: "experience",
    image: "/haladir-logo.png",
    heading: "Haladir Summer 2026",
    description:
      "Spending my summer in San Francisco building Operational Superintelligence with the Haladir team. Most fun summer yet, working with some great friends and building a generational company.",
    href: "haladir.com",
    linkText: "",
    sections: [
      { 
        heading: "What am I up to?", 
        body: "Working on a lot of internal tools, building the product and go-to-market strategies. More to come." }],
  },
  {
    title: "Karev",
    year: "2026",
    category: "projects",
    image: "/karev-logo.png",
    heading: "Medical Billing made simple?",
    description: [
      "Medical billing has been an ongoing, tedious task in healthcare. Providers have to deal with insurance companies, patients, and annoying admin work, which hasn't been properly solved yet.",
       "When back home for a week to celebrate my brother's high school graduation, some friends and I built Karev, the solution to medical billing, and its most annoying part: errors.",
  ],
       href: "https://www.usekarev.com/",
    linkText: "usekarev.com",
    sections: [{ heading: "Coming soon...", body: "Coming soon..." }],
  },
  {
    title: "IT",
    year: "2026",
    category: "projects",
    image: "/internshiptracker-logo.svg",
    heading: "Tracking is Easier than ever",
    description: [
      "For the past year, I didn't track any internships I applied for. I know it's bad practice, but it was perfect for my system: See a Posting -> Click Apply. Whenever I had an interview, I would be on top of it. Thought I'd make a change this year; better to know metrics than not.",
      "Everyone uses tools like Notion or Google Sheets with a nice tracker design, but why would I manually input it when I could do it automatically instead?",
      "As such, I built my own internship tracker that pulls from my Email using the confirmation emails sent after applying to a new posting. Now, I can continue my workflow and track my progress too, without spending more of my precious time."
    ],
    href: "intern.harunkhan.org",
    linkText: "",
    sections: [
      { 
        heading: "What I shipped:", 
        body: [
          "Simply, a software to make my life easier, made within a few hours. Using the Gmail API to pull in my emails, parse them, and then screen them for relevancy, I was able to make it so any application I send in for an internship is automatically uploaded for tracking in this web application. Using Google OAuth, I was able to make it exclusively available to myself, keeping my email info private to me, and only me. The frontend was designed to be simple and minimalistic, just the way I like it.",
        "Some ways of doing things overcomplicate the most simple of things, which in this case is tracking internship applications. Instead of spending hours a day filling out a Notion template, I spent a few hours one time building and deploying something I'll use everyday. That's what I'd call a proper personal project. ", 
        ],
      }
    ],
  },
  {
    title: "US Securities & Exchange Commission",
    year: "2026",
    category: "experience",
    image: "/sec-logo.png",
    heading: "SEC Spring 2026",
    description:
    "I joined the US Securities and Exchange Commission (SEC) during my freshman spring, as their youngest intern, working full-time while taking classes. This was probably one of the most brutal experiences I've had, but what made it all worth it was the people and the work I was doing.",
    href: "https://www.sec.gov/",
    linkText: "",
    sections: [
      {
        heading: "The Work Itself",
        body: [
          "At the SEC, I worked in the Division of Economic & Risk Analysis, working on statistical inference applications to cost savings projects for a ruling related to paper & e-delivery. For the most part, I acted similarly to a researcher, where I read tons of papers and briefs, wrote a ton too, and did a lot of experimentation and modeling. The briefing is expected to come out late 2026, and my experimental design was used as a foundational model for how to calculate cost savings for the briefing, which was super exciting.",
          "I worked with some super knowledgable people in economics, and I loved being able to apply my CS abilities to other domains + do a lot of writing. I would say more, but for now everything is NPI (non-public information).",
        ],
      },
    ],
  },
  {
    title: "Leidos",
    year: "2025",
    category: "experience",
    image: "/leidos-logo.png",
    heading: "Leidos Summer 2025",
    description: "I joined the Leidos team right after I graduated high school, working on software for low latency tank simulations on a contract for the US Army. This was my first proper SWE internship, and it was amazing working at a great company so early on.",
    href: "https://www.leidos.com/",
    linkText: "leidos.com",
    sections: [
      {
        heading: "The Problem",
        body:
          "The best and most cost-effective way to have people train on tanks is not through the tank itself, but through simulations of the tank instead. Expensive tanks like the M1 or the M1A2 Abrams cost tons of money to maintain and run. On top of that, the ammunition is not cheap and can't be expended easily, so military training program is done with simulations instead. However, the quality of the simulations need to be top-tier for the best results in training. Right now, the simulation software designed for said training wasn't great, and needed improvements.",
      },
      {
        heading: "The Work Itself \& Solution",
        body: [
          "We were given a basic simulation software to work with, focused on sound, adjusting trainees to the sounds they'd hear when running the tank itself.",
          "The primary problems with the simulation were the following:", 
          "         1. It was too large of a file to run on the software it was built out on, making it impossible to use.",
          "         2. The software was super slow to run, with extremely high latency, making it unsuable.",
          "As such, using an internal tool we created using Python and SQLite, we were able to reduce the file size of the simulation, keep its contents and making it possible to run on the software it was designed for. As for the latency part, we used optimized C++ scripts to speed up the simulation, reducing its latency. Eventually, both parts were implemented and used to save to millions of dollars in training costs for this simulation.",
          "Overall, the project was pretty simple, but for someone with little to no software experience, it was a great exposure to learning software development and applying the work to a problem greater than oneself.",
        ],
      },
    ],
  },
  {
    title: "Post-Wildfire Landslides",
    year: "2024",
    category: "projects",
    image: "/postwildfire-landslides.png",
    heading: "Publishing my first Research Paper",
    description: "Coming soon...",
    href: "Coming soon...",
    linkText: "Coming soon...",
    sections: [{ heading: "Coming soon...", body: "Coming soon..." }],
  },
];

const CATEGORY_ORDER: Category[] = ["experience", "projects",];

const slugify = (s: string) => s.toLowerCase().trim().replace(/\s+/g, "-");

const toParagraphs = (
  value: string | string[] | undefined,
  placeholder: string,
): string[] =>
  value && value.length ? (Array.isArray(value) ? value : [value]) : [placeholder];

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
    const paragraphs = toParagraphs(p.description, `[description ${selected + 1}]`);
    const sections: DetailSection[] =
      p.sections && p.sections.length ? p.sections : [{}];
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

        <header className="projectDetailHeader">
          <h1 className="projectDetailTitle">{p.title || "[title]"}</h1>
          <div className="projectDetailYear">{p.year || "[year]"}</div>
        </header>

        <div className="projectDetailLayout">
          <div className="projectDetailImage">
            <ProjectImage project={p} />
          </div>

          <div className="projectDetailText">
            <h2 className="projectDetailHeading">{p.heading || `[heading ${selected + 1}]`}</h2>
            {paragraphs.map((para, i) => (
              <p key={i} className="projectDetailBody">
                {para}
              </p>
            ))}

            {p.href !== undefined &&
              (p.href ? (
                <a
                  className="projectDetailLink"
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="projectDetailLinkText">{p.linkText || p.href}</span>
                </a>
              ) : (
                <span className="projectDetailLink">[link {selected + 1}]</span>
              ))}
          </div>
        </div>

        <div className="projectDetailMore">
          {sections.map((section, si) => (
            <section key={si} className="projectDetailSection">
              <h2 className="projectDetailHeading">
                {section.heading || `[section ${si + 1} heading]`}
              </h2>
              {toParagraphs(section.body, `[section ${si + 1} details]`).map(
                (para, i) => (
                  <p key={i} className="projectDetailBody">
                    {para}
                  </p>
                ),
              )}
            </section>
          ))}
        </div>
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

      <div className="projectsList">
        {PROJECTS.map((p, i) =>
          filter !== "all" && p.category !== filter ? null : (
            <button
              key={i}
              type="button"
              className="projectRow"
              onClick={() => setSelected(i)}
            >
              <span className="projectRowTitle">{p.title || "[title]"}</span>
              <span className="projectRowYear">{p.year || "[year]"}</span>
            </button>
          ),
        )}
      </div>

      <p className="projectsSoon">more coming soon...</p>
    </section>
  );
}
