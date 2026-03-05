export default function InsightsPage() {
  return (
    <section className="content contentHarunkhanOrg" aria-label="Insights">
      <div className="harunkhanOrgProfile">
        <button type="button" className="harunkhanOrgPhotoLink" aria-label="Profile photo">
          <img
            src={`${import.meta.env.BASE_URL}harun-profile.png`}
            alt=""
            className="harunkhanOrgPhoto"
            width={80}
            height={80}
          />
        </button>
        <div className="harunkhanOrgNameBlock">
          <span className="harunkhanOrgInitials">Harun Khan</span>
          <span className="harunkhanOrgName">harunkkhan1@gmail.com</span>
        </div>
      </div>
      <div className="pageDivider" />
      <div className="harunkhanOrgPageHeadlineRow">
        <p className="pageIntro" style={{ margin: 0 }}>
          <a
            href="#"
            className="iconLink"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = "";
            }}
          >
            <span className="iconLabel">← Back</span>
          </a>
        </p>
        <div className="harunkhanOrgPageHeadlineCol">
          <p className="harunkhanOrgPageHeadline">Fellowships, Immersion & Insight Programs</p>
          <div className="harunkhanOrgPageBody">
            <p style={{ margin: "0 0 8px" }}>Expedition EY | Ernst & Young | 2026</p>
            <p style={{ margin: "0 0 8px" }}>First Year Immersion Program | Oliver Wyman | 2026</p>
            <p style={{ margin: "0 0 8px" }}>SIG Discovery Day | Susquehanna International Group | 2025</p>
            <p style={{ margin: 0 }}>Don Lavoie Fellowship | The Mercatus Center | 2025</p>
          </div>
        </div>
      </div>
    </section>
  );
}
