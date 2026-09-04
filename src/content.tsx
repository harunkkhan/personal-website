import type { ComponentType } from "react";
import {
  AtSignIcon,
  BookIcon,
  BriefcaseIcon,
  EmailIcon,
  GitHubIcon,
  HaladirIcon,
  LeidosIcon,
  LinkedInIcon,
  PatriotHacksIcon,
  ReadmeIcon,
  SecIcon,
  SubstackIcon,
  XIcon,
} from "./icons";
import patriothacksBody from "./pages/patriothacks.md?raw";
import readmeBody from "./pages/readme.md?raw";

export type Glyph = ComponentType<{ className?: string }>;
export type Row = { label: string; href?: string; icon: Glyph; body?: string };
export type SectionId = "posts" | "experiences" | "contact";
export type Section = { id: SectionId; title: string; icon: Glyph; rows: Row[] };

/**
 * The whole site's contents. A row whose href starts with "/" is a page on this
 * site; everything else leaves. Sections and pages are routed straight off this
 * list, so adding a page is one row here rather than a row plus a route — and
 * `body` is the markdown that page is written in, read out of src/pages.
 */
export const SECTIONS: Section[] = [
  {
    id: "posts",
    title: "Posts",
    icon: BookIcon,
    rows: [{ label: "README.md", href: "/readme", icon: ReadmeIcon, body: readmeBody }],
  },
  {
    id: "experiences",
    title: "Experiences",
    icon: BriefcaseIcon,
    rows: [
      { label: "Haladir - Intern", href: "https://www.haladir.com/", icon: HaladirIcon },
      {
        label: "US Securities & Exchange Commission - Intern",
        href: "https://www.sec.gov/",
        icon: SecIcon,
      },
      {
        label: "PatriotHacks - President",
        href: "/patriothacks",
        icon: PatriotHacksIcon,
        body: patriothacksBody,
      },
      { label: "Leidos - Intern", href: "https://www.leidos.com/", icon: LeidosIcon },
    ],
  },
  {
    id: "contact",
    title: "Contact",
    icon: AtSignIcon,
    rows: [
      { label: "Email", href: "mailto:harunkkhan1@gmail.com", icon: EmailIcon },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/harun-k-khan/", icon: LinkedInIcon },
      { label: "Twitter", href: "https://x.com/harunkanwalkhan", icon: XIcon },
      { label: "GitHub", href: "https://github.com/harunkkhan", icon: GitHubIcon },
      { label: "Substack", href: "https://substack.com/@harunkhan", icon: SubstackIcon },
    ],
  },
];

export const sectionById = (id: SectionId) => SECTIONS.find((s) => s.id === id);

/**
 * Keys for the text that carries between views. A section title and a page's
 * name each appear in more than one view, so they are tagged with the same key
 * on both sides and the app slides one into the other.
 */
export const sectionKey = (id: SectionId) => `section:${id}`;
export const pageKey = (path: string) => `page:${path}`;

export const sectionForPath = (path: string) => SECTIONS.find((s) => `/${s.id}` === path);

/** The page at a path, with the section it sits under — the crumb trail. */
export function pageForPath(path: string) {
  for (const section of SECTIONS) {
    const row = section.rows.find((r) => r.href === path);
    if (row) return { section, row };
  }
  return null;
}
