const PDF_URL = "/postwildfirelandslides.pdf";
const PUBLICATION_URL = "https://ieeexplore.ieee.org/document/10937631"; // add the publication link here

export default function PostWildfireLandslidesPage() {
  return (
    <section className="pubPage" aria-label="Post-Wildfire Landslides paper">
      <a className="projectsHome" href="/projects">
        ← work
      </a>

      <header className="pubHeader">
        <h1 className="pubTitle">Post-Wildfire Landslides</h1>
        <p className="pubMeta">Published with MIT & IEEE, 2024</p>
      </header>

      <div className="pubLinks">
        {PUBLICATION_URL ? (
          <a
            className="pubLink"
            href={PUBLICATION_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            view publication ↗
          </a>
        ) : (
          <span className="pubLink pubLinkPlaceholder">[publication link]</span>
        )}

        <a
          className="pubLink"
          href={PDF_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          view pdf ↗
        </a>
      </div>
    </section>
  );
}
