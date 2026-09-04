import Column, { type Open } from "./Column";
import EnterMark from "./EnterMark";
import { SECTIONS } from "./content";

/**
 * harunkhan.org's directory: three columns of links, and an upward mark that
 * mirrors the portrait's downward one. It shares the root URL with the
 * portrait — the mark swaps between them rather than navigating.
 */
export default function DirectoryPage({
  onBack,
  onOpen,
  leaving,
}: {
  onBack: () => void;
  onOpen: Open;
  leaving: boolean;
}) {
  return (
    <div className="sheet">
      <div className="sheetBody">
        <header className="dirMasthead">
          <h1 className="dirName">harun khan</h1>
          <p className="dirTagline">x, y, z</p>
        </header>

        <div className="dir">
          {SECTIONS.map((section) => (
            <Column key={section.id} section={section} onOpen={onOpen} />
          ))}
        </div>
      </div>

      <EnterMark
        to="/"
        direction="up"
        label="back to the portrait"
        onNavigate={onBack}
        leaving={leaving}
      />
    </div>
  );
}
