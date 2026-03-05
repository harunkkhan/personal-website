export default function SECOfficePage() {
  return (
    <section className="content contentHarunkhanOrg" aria-label="SEC - Division of Economic & Risk Analysis">
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
          <p className="harunkhanOrgPageHeadline">Spring Analyst at the US Securities & Exchange Commission</p>
          <p className="harunkhanOrgPageBody">Content coming soon.</p>
        </div>
      </div>
    </section>
  );
}
