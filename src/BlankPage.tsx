import { InternalLink, type Open } from "./Column";
import EnterMark from "./EnterMark";
import { pageKey, sectionKey, type Row, type Section } from "./content";

/**
 * A page hanging off the directory whose contents are still to be written. The
 * crumbs above it are the way back up: the directory, then the section it sits
 * under, then this page — and the last crumb is where this page's name lands
 * after sliding up out of the list it was clicked in.
 */
export default function BlankPage({
  section,
  row,
  onBack,
  onOpen,
}: {
  section: Section;
  row: Row;
  onBack: () => void;
  onOpen: Open;
}) {
  return (
    <div className="sheet">
      <div className="sheetBody sheetBody--top">
        <nav className="crumbs" aria-label="breadcrumb">
          <InternalLink className="crumb" to="/" onOpen={onOpen}>
            Home
          </InternalLink>
          <span className="crumbSep">/</span>
          <InternalLink
            className="crumb"
            to={`/${section.id}`}
            onOpen={onOpen}
            flipKey={sectionKey(section.id)}
          >
            {section.title}
          </InternalLink>
          <span className="crumbSep">/</span>
          <span className="crumbHere" data-flip={pageKey(row.href!)}>
            {row.label}
          </span>
        </nav>
      </div>

      <EnterMark to="/" direction="up" label="back to the directory" onNavigate={onBack} />
    </div>
  );
}
