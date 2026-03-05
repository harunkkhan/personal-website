export default function AchievementsPage() {
  return (
    <section className="content contentHarunkhanOrg" aria-label="Awards">
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
          <p className="harunkhanOrgPageHeadline">Awards, Honors & Achievements</p>
          <div className="harunkhanOrgPageBody">
            <p style={{ margin: "0 0 8px" }}>SEC Scholar | Only freshman selected; 1 of 100 selected among undergrad, grad & law students</p>
            <p style={{ margin: "0 0 8px" }}>
              FCPS Student Peace Award Winner | 1 of 26 selected across Fairfax County Public Schools for community impact and service {" | "}
              <a href="https://fairfax.studentpeaceawards.org/harun-khan/" className="link" target="_blank" rel="noopener noreferrer">Profile</a>
              {" | "}
              <a href="https://drive.google.com/drive/folders/1zK15lw8jhIdUYv1lz5QNIB6xE0ki8Fuo?usp=sharing" className="link" target="_blank" rel="noopener noreferrer">Pictures</a>
            </p>
            <p style={{ margin: "0 0 8px" }}>IEEE MIT Undergraduate Research & Technology Conference | Paper Publication & Presenter</p>
            <p style={{ margin: "0 0 8px" }}>ASPRS & AGU | Largest Geospatial Research Conferences in the World | Accepted Presenter</p>
            <p style={{ margin: 0 }}>
              Congressional App Challenge 3rd Place Winner | Awarded by Congressman Gerry Connolly (District 11) {" | "}
              <a href="https://drive.google.com/drive/folders/1nQRSIwWXiqy5uY0ma26VMgIwPAI83qO1?usp=sharing" className="link" target="_blank" rel="noopener noreferrer">Pictures</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
