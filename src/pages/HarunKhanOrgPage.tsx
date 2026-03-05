import { useEffect, useRef, useState } from "react";
import SocialIconLink from "../components/SocialIconLink";
import { EmailIcon, GitHubIcon, LinkedInIcon, SubstackIcon } from "../components/icons";

type PopupKind = "contact" | "gmu" | "sec" | "leidos" | "everything" | null;

export default function HarunKhanOrgPage() {
  const [popupOpen, setPopupOpen] = useState<PopupKind>(null);
  const [popupStyle, setPopupStyle] = useState<{ top: number; width: number } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const paragraphsRef = useRef<HTMLDivElement>(null);

  const togglePopup = (kind: PopupKind) => {
    setPopupOpen((current) => (current === kind ? null : kind));
  };

  useEffect(() => {
    if (!popupOpen || !sectionRef.current || !paragraphsRef.current) {
      setPopupStyle(null);
      return;
    }
    const sectionRect = sectionRef.current.getBoundingClientRect();
    const paragraphsRect = paragraphsRef.current.getBoundingClientRect();
    setPopupStyle({
      top: paragraphsRect.bottom - sectionRect.top + 8,
      width: sectionRect.width,
    });
  }, [popupOpen]);

  return (
    <section ref={sectionRef} className="content contentHarunkhanOrg" aria-label="harunkhan.org">
      <div className="harunkhanOrgProfile">
        <button
          type="button"
          className="harunkhanOrgPhotoLink"
          aria-label="Profile photo"
        >
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
      <div ref={paragraphsRef} className="harunkhanOrgParagraphs">
        <p className="sectionBody harunkhanOrgParagraph">
          Building myself up one step at a time.
        </p>
        <p className="sectionBody harunkhanOrgParagraph">
          Freshman at{" "}
          <button
            type="button"
            className="link linkButton"
            onClick={() => togglePopup("gmu")}
          >
            George Mason University
          </button>
          , trying anything and{" "}
          <button
            type="button"
            className="link linkButton"
            onClick={() => togglePopup("everything")}
          >
            everything
          </button>
          .
        </p>
        <p className="sectionBody harunkhanOrgParagraph">
          Currently the youngest intern at the{" "}
          <button
            type="button"
            className="link linkButton"
            onClick={() => togglePopup("sec")}
          >
            SEC.
          </button>{" "}
          I previously worked as a Software Engineering Intern at{" "}
          <button
            type="button"
            className="link linkButton"
            onClick={() => togglePopup("leidos")}
          >
            Leidos
          </button>
          , straight out of high school.
        </p>
        <p className="sectionBody harunkhanOrgParagraph">
          Based in Northern VA (DC area). Feel free to{" "}
          <button
            type="button"
            className="link linkButton"
            onClick={() => togglePopup("contact")}
          >
            contact me
          </button>{" "}
          - I love to chat!
        </p>
      </div>

      {popupOpen && popupStyle && (
        <div
          className="harunkhanOrgPopupBox"
          role="dialog"
          aria-label={popupOpen === "contact" ? "Contact options" : "Link"}
          style={{ top: popupStyle.top, width: popupStyle.width }}
        >
          {popupOpen === "contact" && (
            <>
              <a href="mailto:harunkkhan1@gmail.com" className="iconLink" aria-label="Email">
                <EmailIcon />
                <span className="iconLabel">Email</span>
              </a>
              <SocialIconLink
                href="https://www.linkedin.com/in/harun-k-khan/"
                label="LinkedIn"
                icon={<LinkedInIcon />}
              />
              <SocialIconLink
                href="https://github.com/harunkkhan"
                label="GitHub"
                icon={<GitHubIcon />}
              />
              <SocialIconLink
                href="https://substack.com/@harunkhan"
                label="Substack"
                icon={<SubstackIcon />}
              />
            </>
          )}
          {popupOpen === "gmu" && (
            <>
              <span className="iconLink">
                <img
                  src={`${import.meta.env.BASE_URL}patriothacks-logo.png`}
                  alt=""
                  className="icon"
                  width={18}
                  height={18}
                />
                <span className="iconLabel">President of PatriotHacks</span>
              </span>
              <span className="iconLink">
                <img
                  src={`${import.meta.env.BASE_URL}smif-logo.png`}
                  alt=""
                  className="icon"
                  width={18}
                  height={18}
                />
                <span className="iconLabel">Head of Training at SMIF</span>
              </span>
            </>
          )}
          {popupOpen === "sec" && (
            <span className="iconLink">
              <img
                src={`${import.meta.env.BASE_URL}sec-logo.png`}
                alt=""
                className="icon"
                width={18}
                height={18}
              />
              <span className="iconLabel">Division of Economic & Risk Analysis - Office of Asset Management</span>
            </span>
          )}
          {popupOpen === "leidos" && (
            <span className="iconLink">
              <img
                src={`${import.meta.env.BASE_URL}leidos-logo.png`}
                alt=""
                className="icon"
                width={18}
                height={18}
              />
              <span className="iconLabel">Gunnery Training Systems (GTS) for the US Military</span>
            </span>
          )}
          {popupOpen === "everything" && (
            <>
              <a href="#investment-projects" className="link">
                Investment Projects
              </a>
              <a href="#software-projects" className="link">
                Software Projects
              </a>
              <a href="#research-publications" className="link">
                Research & Publications
              </a>
            </>
          )}
        </div>
      )}
    </section>
  );
}
