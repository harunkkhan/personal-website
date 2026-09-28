import Column, { type Open } from "./Column";
import { SECTIONS } from "./content";

/** harunkhan.org's directory: three columns of links at the root URL. */
export default function DirectoryPage({ onOpen }: { onOpen: Open }) {
  return (
    <div className="sheet">
      <div className="sheetBody">
        <header className="dirMasthead">
          <h1 className="dirName">harun khan</h1>
          <p className="dirTagline">math, rl, coding agents, entrepreneurship</p>
        </header>

        <div className="dir">
          {SECTIONS.map((section) => (
            <Column key={section.id} section={section} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </div>
  );
}
