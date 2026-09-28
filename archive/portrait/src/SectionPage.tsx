import Column, { InternalLink, type Open } from "./Column";
import EnterMark from "./EnterMark";
import type { Section } from "./content";

/** One section on its own, opened by clicking its title in the directory. */
export default function SectionPage({
  section,
  onBack,
  onOpen,
}: {
  section: Section;
  onBack: () => void;
  onOpen: Open;
}) {
  return (
    <div className="sheet">
      <div className="sheetBody sheetBody--top">
        <header className="pageHead">
          <h1 className="pageTitle">{section.id}</h1>
          <p className="pageBack">
            <InternalLink className="backLink" to="/" onOpen={onOpen}>
              ← home
            </InternalLink>
          </p>
        </header>

        <Column section={section} onOpen={onOpen} />
      </div>

      <EnterMark to="/" direction="up" label="back to the directory" onNavigate={onBack} />
    </div>
  );
}
