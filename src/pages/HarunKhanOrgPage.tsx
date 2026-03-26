import { useEffect, useRef, useState } from "react";
import SocialIconLink from "../components/SocialIconLink";
import { EmailIcon, GitHubIcon, LinkedInIcon, SubstackIcon, XIcon } from "../components/icons";

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
          Freshman at George Mason University, trying anything and everything.
        </p>
        <p className="sectionBody harunkhanOrgParagraph">
          Currently the youngest intern at the{" "}
          <a href="https://www.sec.gov/" className="link" target="_blank" rel="noopener noreferrer">
            SEC
          </a>
          . I previously worked at{" "}
          <a href="https://www.leidos.com/" className="link" target="_blank" rel="noopener noreferrer">
            Leidos
          </a>
          , out of high school.
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
                href="https://x.com/harunkanwalkhan"
                label="X"
                icon={<XIcon />}
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
              <a href="#patriothacks" className="iconLink">
                <img
                  src={`${import.meta.env.BASE_URL}patriothacks-logo.png`}
                  alt=""
                  className="icon"
                  width={18}
                  height={18}
                />
                <span className="iconLabel">President of PatriotHacks</span>
              </a>
              <a href="#smif" className="iconLink">
                <img
                  src={`${import.meta.env.BASE_URL}smif-logo.png`}
                  alt=""
                  className="icon"
                  width={18}
                  height={18}
                />
                <span className="iconLabel">Head of Training at SMIF</span>
              </a>
            </>
          )}
          {popupOpen === "sec" && (
            <a href="#sec" className="iconLink">
              <img
                src={`${import.meta.env.BASE_URL}sec-logo.png`}
                alt=""
                className="icon"
                width={18}
                height={18}
              />
              <span className="iconLabel">Division of Economic & Risk Analysis - Office of Asset Management</span>
            </a>
          )}
          {popupOpen === "leidos" && (
            <a href="#leidos" className="iconLink">
              <img
                src={`${import.meta.env.BASE_URL}leidos-logo.png`}
                alt=""
                className="icon"
                width={18}
                height={18}
              />
              <span className="iconLabel">Gunnery Training Systems (GTS) for the US Military</span>
            </a>
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
                Research
              </a>
              <a href="#achievements" className="link">
                Awards
              </a>
              <a href="#insights" className="link">
                Insights
              </a>
            </>
          )}
        </div>
      )}
    </section>
  );
}
