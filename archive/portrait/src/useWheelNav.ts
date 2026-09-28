import { useEffect, useRef } from "react";

/**
 * A wheel gesture moves between the portrait and the directory, the same way
 * the mark at the foot of each does.
 *
 * Only a deliberate push counts. The travel has to add up past a threshold
 * before anything happens, and once it fires the gesture is spent until the
 * wheel goes quiet: a trackpad throws momentum events for a second or more
 * after your fingers lift, and without that wait the tail would fire again the
 * moment the next view arrived. A gap longer than the settle time is what marks
 * one gesture ending and the next beginning — no timers, so it survives the
 * re-renders that navigating causes.
 */
const THRESHOLD = 50;
const SETTLE_MS = 320;

/* wheel deltas arrive in pixels, lines or pages depending on the device */
const STEP = [1, 16, 100];

export default function useWheelNav({
  enabled,
  onDown,
  onUp,
}: {
  enabled: boolean;
  onDown: () => void;
  onUp: () => void;
}) {
  const spent = useRef(false);
  const travel = useRef(0);
  const last = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return; // pinch to zoom, not a scroll

      const gap = event.timeStamp - last.current;
      last.current = event.timeStamp;
      if (gap > SETTLE_MS) {
        spent.current = false;
        travel.current = 0;
      }
      if (spent.current) return;

      const delta = event.deltaY * (STEP[event.deltaMode] ?? 1);
      // turning around mid-gesture starts the count over
      if (travel.current !== 0 && Math.sign(delta) !== Math.sign(travel.current)) {
        travel.current = 0;
      }
      travel.current += delta;

      if (travel.current > THRESHOLD) {
        spent.current = true;
        onDown();
      } else if (travel.current < -THRESHOLD) {
        spent.current = true;
        onUp();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [enabled, onDown, onUp]);
}
