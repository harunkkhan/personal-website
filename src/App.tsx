import { useCallback, useEffect, useRef, useState } from "react";
import HomePage from "./HomePage";
import DirectoryPage from "./DirectoryPage";
import ReadmePage from "./ReadmePage";

/**
 * Routing is done by hand — a handful of views don't justify a router. The
 * portrait and the directory are two states of harunkhan.org itself and share
 * the root URL; only the posts under it get a path of their own. Each swap runs
 * through a full-bleed wash so one view dissolves into the next instead of
 * cutting: the wash fades up in the *destination's* background colour, the view
 * underneath is swapped while it's opaque, then it fades back out.
 *
 * Every swap still pushes a history entry, so the browser's back button walks
 * the same route as the arrows. The view is carried in the history state rather
 * than inferred from the URL, since two of them share one.
 */
const WASH_IN = 620;
const WASH_OUT = 520;

type View = "portrait" | "directory" | "readme";
type Tone = "light" | "dark";
type Wash = { tone: Tone; phase: "in" | "out" };

const URLS: Record<View, string> = {
  portrait: "/",
  directory: "/",
  readme: "/readme",
};

const normalize = (path: string) => path.replace(/\/+$/, "") || "/";

/* a cold load lands on the portrait; only a post's own path opens elsewhere */
const viewForPath = (path: string): View =>
  normalize(path) === "/readme" ? "readme" : "portrait";

const viewFromHistory = (): View => {
  const stored = (window.history.state as { view?: View } | null)?.view;
  return stored ?? viewForPath(window.location.pathname);
};

export default function App() {
  const [view, setView] = useState(viewFromHistory);
  const [wash, setWash] = useState<Wash | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    // stamp the entry we opened on, so popping back to it restores the view
    window.history.replaceState({ view: viewFromHistory() }, "");

    const onPop = () => {
      setWash(null);
      setView(viewFromHistory());
    };
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      timers.current.forEach(clearTimeout);
    };
  }, []);

  const navigate = useCallback(
    (to: View, tone: Tone) => {
      if (wash) return;

      const land = () => {
        window.history.pushState({ view: to }, "", URLS[to]);
        setView(to);
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
      {view === "directory" ? (
        <DirectoryPage
          onBack={() => navigate("portrait", "dark")}
          onOpen={(to) => navigate(viewForPath(to), "light")}
        />
      ) : view === "readme" ? (
        <ReadmePage onBack={() => navigate("directory", "light")} />
      ) : (
        <HomePage onEnter={() => navigate("directory", "light")} />
      )}

      {wash && <div className={`wash wash--${wash.tone} wash--${wash.phase}`} />}
    </>
  );
}
