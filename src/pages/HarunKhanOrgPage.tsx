import { useEffect, useRef, useState } from "react";
import SocialIconLink from "../components/SocialIconLink";
import { EmailIcon, GitHubIcon, LinkedInIcon } from "../components/icons";

type PopupKind = "contact" | "gmu" | "sec" | "leidos" | null;

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
        <img
          src={`${import.meta.env.BASE_URL}harun-profile.png`}
          alt=""
          className="harunkhanOrgPhoto"
          width={80}
          height={80}
        />
        <div className="harunkhanOrgNameBlock">
          <span className="harunkhanOrgInitials">Harun Khan</span>
          <span className="harunkhanOrgName">harunkkhan1@gmail.com</span>
        </div>
      </div>
      <div className="pageDivider" />
      <div ref={paragraphsRef} className="harunkhanOrgParagraphs">
        <p className="sectionBody harunkhanOrgParagraph">
          Pursuing opportunities elegantly simple, yet overlooked.
        </p>
        <p className="sectionBody harunkhanOrgParagraph">
          At{" "}
          <button
            type="button"
            className="link linkButton"
            onClick={() => togglePopup("gmu")}
          >
            GMU
          </button>
          , exploring finance and tech. Building in public. Previously at the{" "}
          <button
            type="button"
            className="link linkButton"
            onClick={() => togglePopup("sec")}
          >
            SEC
          </button>{" "}
          and{" "}
          <button
            type="button"
            className="link linkButton"
            onClick={() => togglePopup("leidos")}
          >
            Leidos
          </button>
          .
        </p>
        <p className="sectionBody harunkhanOrgParagraph">
          DC area based. Feel free to{" "}
          <button
            type="button"
            className="link linkButton"
            onClick={() => togglePopup("contact")}
          >
            reach out
          </button>{" "}
          if you&apos;d like to chat.
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
            </>
          )}
          {popupOpen === "gmu" && (
            <a
              href="https://www.gmu.edu/"
              className="iconLink"
              target="_blank"
              rel="noopener noreferrer"
            >
              gmu.edu
            </a>
          )}
          {popupOpen === "sec" && (
            <a
              href="https://www.sec.gov/"
              className="iconLink"
              target="_blank"
              rel="noopener noreferrer"
            >
              sec.gov
            </a>
          )}
          {popupOpen === "leidos" && (
            <a
              href="https://www.leidos.com/"
              className="iconLink"
              target="_blank"
              rel="noopener noreferrer"
            >
              leidos.com
            </a>
          )}
        </div>
      )}
    </section>
  );
}
