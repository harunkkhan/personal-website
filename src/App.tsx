import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import DirectoryPage from "./DirectoryPage";
import SectionPage from "./SectionPage";
import ProsePage from "./ProsePage";
import { pageForPath, sectionById, sectionForPath, type SectionId } from "./content";

/**
 * Routing is done by hand — a handful of views don't justify a router. The
 * directory lives at the root URL; sections and pages each have a path of their
 * own, taken straight off the contents in content.tsx. Every swap pushes a
 * history entry, so the browser's back button walks the same route as the links.
 *
 * Swaps land instantly, but the text you clicked slides from where it was to
 * where it ends up — a post's name out of the list and up into the crumbs, a
 * section's title out of its column and across. Nothing is really animating:
 * the new view is already laid out, and one element is offset back to its old
 * place and released. (FLIP: measure First, render Last, Invert the delta, Play
 * it off.)
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

type View =
  | { at: "directory" }
  | { at: "section"; id: SectionId }
  | { at: "page"; path: string };

const normalize = (path: string) => path.replace(/\/+$/, "") || "/";

const urlFor = (view: View) =>
  view.at === "section" ? `/${view.id}` : view.at === "page" ? view.path : "/";

const viewForPath = (path: string): View => {
  const p = normalize(path);
  const section = sectionForPath(p);
  if (section) return { at: "section", id: section.id };
  if (pageForPath(p)) return { at: "page", path: p };
  return { at: "directory" };
};

const viewFromLocation = () => viewForPath(window.location.pathname);

export default function App() {
  const [view, setView] = useState(viewFromLocation);
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
    const onPop = () => setView(viewFromLocation());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((to: View, flipKey?: string) => {
    if (flipKey && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const from = anchorOf(flipKey);
      if (from) carried.current = { key: flipKey, from };
    }
    window.history.pushState(null, "", urlFor(to));
    setView(to);
    window.scrollTo(0, 0);
  }, []);

  const open = useCallback(
    (to: string, flipKey?: string) => navigate(viewForPath(to), flipKey),
    [navigate],
  );
  const toDirectory = useCallback(() => navigate({ at: "directory" }), [navigate]);

  const page = view.at === "page" ? pageForPath(view.path) : null;
  const section = view.at === "section" ? sectionById(view.id) : null;

  return section ? (
    <SectionPage section={section} onBack={toDirectory} onOpen={open} />
  ) : page ? (
    <ProsePage section={page.section} row={page.row} onBack={toDirectory} onOpen={open} />
  ) : (
    <DirectoryPage onOpen={open} />
  );
}
