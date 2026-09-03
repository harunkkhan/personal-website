import { useCallback, useEffect, useRef, useState } from "react";
import HomePage from "./HomePage";
import LegacyPage from "./LegacyPage";

/**
 * Routing is done by hand — two pages don't justify a router — but the swap
 * between them runs through a full-bleed wash so the dark home page dissolves
 * into the light one instead of cutting. The wash fades up in the *destination's*
 * background colour, the page underneath is swapped while it's opaque, then it
 * fades back out onto the new page.
 */
const WASH_IN = 620;
const WASH_OUT = 520;

type Tone = "light" | "dark";
type Wash = { tone: Tone; phase: "in" | "out" };

const normalize = (path: string) => path.replace(/\/+$/, "") || "/";

export default function App() {
  const [path, setPath] = useState(() => normalize(window.location.pathname));
  const [wash, setWash] = useState<Wash | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const onPop = () => {
      setWash(null);
      setPath(normalize(window.location.pathname));
    };
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      timers.current.forEach(clearTimeout);
    };
  }, []);

  const navigate = useCallback(
    (to: string, tone: Tone) => {
      if (wash) return;

      const land = () => {
        window.history.pushState(null, "", to);
        setPath(normalize(to));
        window.scrollTo(0, 0);
      };

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        land();
        return;
      }

      setWash({ tone, phase: "in" });
      timers.current.push(
        window.setTimeout(() => {
          land();
          setWash({ tone, phase: "out" });
        }, WASH_IN),
        window.setTimeout(() => setWash(null), WASH_IN + WASH_OUT),
      );
    },
    [wash],
  );

  return (
    <>
      {path === "/legacy" ? (
        <LegacyPage onBack={() => navigate("/", "dark")} />
      ) : (
        <HomePage onEnter={() => navigate("/legacy", "light")} />
      )}

      {wash && <div className={`wash wash--${wash.tone} wash--${wash.phase}`} />}
    </>
  );
}
