import { useState, type MouseEvent } from "react";

/**
 * The bobbing chevron every page carries at its foot: down to go further in,
 * up to come back out. It stays a real link, so modifier- and middle-clicks
 * fall through to the browser and open the target in a new tab; a plain click
 * breaks the bob into a dart in the direction it points and hands over to the
 * page transition.
 */
const PATHS = {
  down: "M1.5 1.5 14 12.5 26.5 1.5",
  up: "M1.5 12.5 14 1.5 26.5 12.5",
};

export default function EnterMark({
  to,
  direction,
  label,
  onNavigate,
  leaving = false,
}: {
  to: string;
  direction: "up" | "down";
  label: string;
  onNavigate: () => void;
  /** set while the page is on its way out for a reason other than a click */
  leaving?: boolean;
}) {
  const [clicked, setClicked] = useState(false);
  const going = clicked || leaving;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (going) return;
    setClicked(true);
    onNavigate();
  };

  const className = [
    "enter",
    direction === "up" && "enter--up",
    going && "enter--leaving",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="enterRow" data-no-puff="">
      <a className={className} href={to} aria-label={label} onClick={handleClick}>
        <svg
          className="enterArrow"
          viewBox="0 0 28 14"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d={PATHS[direction]}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}
