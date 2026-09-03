import { useState, type MouseEvent } from "react";
import AsciiPortrait from "./AsciiPortrait";

export default function HomePage({ onEnter }: { onEnter: () => void }) {
  const [leaving, setLeaving] = useState(false);

  /* still a real link — modifier-clicks and middle-clicks fall through to the
     browser so /legacy can be opened in a new tab. */
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (leaving) return;
    setLeaving(true);
    onEnter();
  };

  return (
    <div className="home">
      <div className="stage">
        <AsciiPortrait />
      </div>

      <div className="enterRow">
        <a
          className={leaving ? "enter enter--leaving" : "enter"}
          href="/legacy"
          aria-label="enter"
          onClick={handleClick}
        >
          <svg
            className="enterArrow"
            viewBox="0 0 28 14"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M1.5 1.5 14 12.5 26.5 1.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
