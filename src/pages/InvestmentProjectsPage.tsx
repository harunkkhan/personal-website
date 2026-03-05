export default function InvestmentProjectsPage() {
  return (
    <section className="content contentHarunkhanOrg" aria-label="Investment Projects">
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
      <p className="pageIntro" style={{ marginTop: 16 }}>
        <a
          href="#"
          className="link"
          onClick={(e) => {
            e.preventDefault();
            window.location.hash = "";
          }}
        >
          ← Back
        </a>
      </p>
    </section>
  );
}
