const PDF_URL = "/postwildfirelandslides.pdf";

export default function PostWildfireLandslidesPage() {
  return (
    <section className="pubPage" aria-label="Post-Wildfire Landslides paper">
      <a className="projectsHome" href="/projects">
        ← work
      </a>

      <header className="pubHeader">
        <h1 className="pubTitle">Post-Wildfire Landslides</h1>
        <p className="pubMeta">MIT URTC 2024</p>
      </header>

      <div className="pubViewer">
        <iframe src={PDF_URL} title="Post-Wildfire Landslides paper" />
      </div>

      <a
        className="pubDownload"
        href={PDF_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        open pdf ↗
      </a>
    </section>
  );
}
