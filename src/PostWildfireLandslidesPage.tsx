const PDF_URL = "/postwildfirelandslides.pdf";
const PUBLICATION_URL = "https://ieeexplore.ieee.org/document/10937631";

export default function PostWildfireLandslidesPage() {
  return (
    <section className="subpage" aria-label="Post-Wildfire Landslides paper">
      <a className="back" href="/projects">
        ← work
      </a>

      <h1 className="subpageHeading">post-wildfire landslides</h1>
      <p className="pubMeta">published with mit &amp; ieee, 2024</p>

      <div className="pubLinks">
        <a
          className="link"
          href={PUBLICATION_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          view publication ↗
        </a>
        <a className="link" href={PDF_URL} target="_blank" rel="noopener noreferrer">
          view pdf ↗
        </a>
      </div>

      <iframe className="pdfFrame" src={PDF_URL} title="Post-Wildfire Landslides paper" />
    </section>
  );
}
