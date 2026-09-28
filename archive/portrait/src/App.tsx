import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import HomePage from "./HomePage";
import DirectoryPage from "./DirectoryPage";
import SectionPage from "./SectionPage";
import ProsePage from "./ProsePage";
import useWheelNav from "./useWheelNav";
import { pageForPath, sectionById, sectionForPath, type SectionId } from "./content";

/**
 * Routing is done by hand — a handful of views don't justify a router. The
 * portrait and the directory are two states of harunkhan.org itself and share
 * the root URL; sections and pages each have a path of their own, taken
 * straight off the contents in content.tsx. Each swap runs through a full-bleed
 * wash so one view dissolves into the next instead of cutting: the wash fades
 * up in the *destination's* background colour, the view underneath is swapped
 * while it's opaque, then it fades back out.
 *
 * Every swap still pushes a history entry, so the browser's back button walks
 * the same route as the links. The view is carried in the history state rather
 * than inferred from the URL, since the portrait and the directory share one.
 *
 * Light-to-light swaps land instantly, but the text you clicked slides from
 * where it was to where it ends up — a post's name out of the list and up into
 * the crumbs, a section's title out of its column and across. Nothing is really
 * animating: the new view is already laid out, and one element is offset back
 * to its old place and released. (FLIP: measure First, render Last, Invert the
 * delta, Play it off.)
 */
const FLIP_MS = 260;
const FLIP_EASE = "cubic-bezier(.22,.7,.25,1)";

/** Where a carried element sits on the page, immune to any scroll in between. */
const anchorOf = (key: string) => {
  const el = document.querySelector(`[data-flip="${key}"]`);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { x: r.left + window.scrollX, y: r.top + window.scrollY };
};
const WASH_IN = 620;
const WASH_OUT = 520;

type View =
  | { at: "portrait" }
  | { at: "directory" }
  | { at: "section"; id: SectionId }
  | { at: "page"; path: string };

type Tone = "light" | "dark";
type Wash = { tone: Tone; phase: "in" | "out" };

/* the portrait is the only dark view, so it is the only swap the wash is for */
const toneOf = (view: View): Tone => (view.at === "portrait" ? "dark" : "light");

const normalize = (path: string) => path.replace(/\/+$/, "") || "/";

const urlFor = (view: View) =>
  view.at === "section" ? `/${view.id}` : view.at === "page" ? view.path : "/";

/* a cold load on "/" lands on the portrait; everything else opens where it says */
const viewForPath = (path: string): View => {
  const p = normalize(path);
  const section = sectionForPath(p);
  if (section) return { at: "section", id: section.id };
  if (pageForPath(p)) return { at: "page", path: p };
  return { at: "portrait" };
};

/* but a link *within* the site pointing at "/" means the directory — the
   portrait is only reached by the mark at the foot of it */
const viewForLink = (to: string): View =>
  normalize(to) === "/" ? { at: "directory" } : viewForPath(to);

const viewFromHistory = (): View => {
  const stored = (window.history.state as { view?: View } | null)?.view;
  return stored ?? viewForPath(window.location.pathname);
};

export default function App() {
  const [view, setView] = useState(viewFromHistory);
  const [wash, setWash] = useState<Wash | null>(null);
  const timers = useRef<number[]>([]);
  const carried = useRef<{ key: string; from: { x: number; y: number } } | null>(null);

  /* runs after the new view is in the DOM but before it is painted, so the
     carried text never shows up at its new spot first */
  useLayoutEffect(() => {
    const flip = carried.current;
    carried.current = null;
    if (!flip) return;

    const el = document.querySelector(`[data-flip="${flip.key}"]`);
    if (!(el instanceof HTMLElement)) return;

    const r = el.getBoundingClientRect();
    const dx = flip.from.x - (r.left + window.scrollX);
    const dy = flip.from.y - (r.top + window.scrollY);
    if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return;

    el.animate(
      [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "translate(0, 0)" }],
      { duration: FLIP_MS, easing: FLIP_EASE },
    );
  }, [view]);

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
    (to: View, flipKey?: string) => {
      if (wash) return;

      const tone = toneOf(to);
      const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const land = () => {
        window.history.pushState({ view: to }, "", urlFor(to));
        setView(to);
        window.scrollTo(0, 0);
      };

      /* nothing to dissolve between two light views — those land instantly,
         and the clicked text carries itself across */
      if (tone === toneOf(view) || still) {
        if (flipKey && !still) {
          const from = anchorOf(flipKey);
          if (from) carried.current = { key: flipKey, from };
        }
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
    [view, wash],
  );

  /* a wheel gesture on the root moves between the two the same way the mark does */
  const atRoot = view.at === "portrait" || view.at === "directory";
  const wheelDown = useCallback(() => {
    if (view.at === "portrait") navigate({ at: "directory" });
  }, [view, navigate]);
  const wheelUp = useCallback(() => {
    // let a directory taller than the window scroll first; only leave from the top
    if (view.at === "directory" && window.scrollY <= 0) navigate({ at: "portrait" });
  }, [view, navigate]);

  useWheelNav({ enabled: atRoot, onDown: wheelDown, onUp: wheelUp });

  const open = useCallback(
    (to: string, flipKey?: string) => navigate(viewForLink(to), flipKey),
    [navigate],
  );
  const toDirectory = useCallback(() => navigate({ at: "directory" }), [navigate]);

  const page = view.at === "page" ? pageForPath(view.path) : null;
  const section = view.at === "section" ? sectionById(view.id) : null;

  return (
    <>
      {section ? (
        <SectionPage section={section} onBack={toDirectory} onOpen={open} />
      ) : page ? (
        <ProsePage
          section={page.section}
          row={page.row}
          onBack={toDirectory}
          onOpen={open}
        />
      ) : view.at === "directory" ? (
        <DirectoryPage
          onBack={() => navigate({ at: "portrait" })}
          onOpen={open}
          leaving={wash?.phase === "in"}
        />
      ) : (
        <HomePage onEnter={toDirectory} leaving={wash?.phase === "in"} />
      )}

      {wash && <div className={`wash wash--${wash.tone} wash--${wash.phase}`} />}
    </>
  );
}
