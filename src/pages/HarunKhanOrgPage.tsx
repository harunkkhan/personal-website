import { useEffect, useRef, useState } from "react";
import SocialIconLink from "../components/SocialIconLink";
import { EmailIcon, GitHubIcon, LinkedInIcon } from "../components/icons";

export default function HarunKhanOrgPage() {
  const [contactOpen, setContactOpen] = useState(false);
  const [popupStyle, setPopupStyle] = useState<{ top: number; width: number } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!contactOpen || !sectionRef.current || !buttonRef.current) {
      setPopupStyle(null);
      return;
    }
    const sectionRect = sectionRef.current.getBoundingClientRect();
    const buttonRect = buttonRef.current.getBoundingClientRect();
    setPopupStyle({
      top: buttonRect.bottom - sectionRect.top + 8,
      width: sectionRect.width,
    });
  }, [contactOpen]);

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
      <div className="harunkhanOrgParagraphs">
        <p className="sectionBody harunkhanOrgParagraph">
          Pursuing opportunities elegantly simple, yet overlooked.
        </p>
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
        <p className="sectionBody harunkhanOrgParagraph">
          DC area based. Feel free to{" "}
          <button
            ref={buttonRef}
            type="button"
            className="link linkButton"
            onClick={() => setContactOpen((open) => !open)}
          >
            reach out
          </button>{" "}
          if you&apos;d like to chat.
        </p>
      </div>

      {contactOpen && popupStyle && (
        <div
          className="harunkhanOrgPopupBox"
          role="dialog"
          aria-label="Contact options"
          style={{ top: popupStyle.top, width: popupStyle.width }}
        >
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
        </div>
      )}
    </section>
  );
}
