export default function HarunKhanOrgPage() {
  return (
    <section className="content" aria-label="harunkhan.org">
      <div className="harunkhanOrgProfile">
        <img
          src={`${import.meta.env.BASE_URL}harun-profile.png`}
          alt=""
          className="harunkhanOrgPhoto"
          width={80}
          height={80}
        />
        <div className="harunkhanOrgNameBlock">
          <span className="harunkhanOrgInitials">HK</span>
          <span className="harunkhanOrgName">Harun Khan</span>
        </div>
      </div>
      <div className="pageDivider" />
      <p className="sectionBody harunkhanOrgParagraph">
        Pursuing opportunities elegantly simple, yet overlooked.
      </p>
      <div className="pageDivider" />
      <p className="sectionBody harunkhanOrgParagraph">
        At{" "}
        <a href="https://www.gmu.edu/" className="link" target="_blank" rel="noopener noreferrer">
          GMU
        </a>
        , exploring finance and tech. Building in public. Previously at the{" "}
        <a href="https://www.sec.gov/" className="link" target="_blank" rel="noopener noreferrer">
          SEC
        </a>{" "}
        and{" "}
        <a href="https://www.leidos.com/" className="link" target="_blank" rel="noopener noreferrer">
          Leidos
        </a>
        .
      </p>
      <div className="pageDivider" />
      <p className="sectionBody harunkhanOrgParagraph">
        DC area based. Feel free to{" "}
        <a href="mailto:harunkkhan1@gmail.com" className="link">
          reach out
        </a>{" "}
        if you&apos;d like to chat.
      </p>
    </section>
  );
}
