import { useEffect, useRef } from "react";
import { FACE_ALPHABET, FACE_ASPECT, FACE_H, FACE_ROWS, FACE_W } from "./faceData";

/**
 * The photo, drawn as a flat grid of letters: one letter per sampled cell, its
 * brightness from the photo, its character from a repeating stream of HARUN.
 * Trailing spaces are deliberate — they open gaps between words.
 *
 * The sheet turns about a vertical axis but the geometry stays strictly 2D: the
 * turn is a horizontal squash. Past edge-on the layout mirrors, so the letter
 * stream is re-laid right-to-left there and the name still reads forwards.
 *
 * Around the sheet, KHAN letters light up along the path the cursor has just
 * taken. There is no fixed shape to it: the streak follows the real trail, so it
 * curves as you curve, stretches when you move fast, and dissolves from the tail
 * back. The photo itself never reacts — the effect lives in the empty space.
 */
const IDLE_WORD = "HARUN ";
const HOT_WORD = "KHAN"; // no trailing space — the streak runs KHANKHANKHAN

// --- layout ----------------------------------------------------------------
/** Cell width, as a fraction of cell height, that reproduces the photo's proportions. */
const TRUE_CELL = (FACE_ASPECT * FACE_H) / FACE_W;
/** Widen cells past that to broaden the image. 1 is photo-true. */
const SQUARE_UP = 1;
const CELL_ASPECT = TRUE_CELL * SQUARE_UP;
const FONT_RATIO = 0.88; // font size as a fraction of the row step
/** Share of the stage the photo fills. Lower leaves more room around it. */
const IMAGE_FIT = 0.87;
const ROW_STEP_MIN = 4;
const ROW_STEP_MAX = 20;

// --- motion ----------------------------------------------------------------
/** -1 turns counterclockwise as seen from above, +1 clockwise. */
const SPIN_DIR = -1;
const SPIN_SPEED = 0.19; // radians per second
const EDGE_ON = 0.07; // below this much foreshortening the sheet is skipped
const TURN_FADE = 0.55; // how sharply the sheet dims as it turns away
/**
 * A flat squash alone is direction-blind — cos(-x) === cos(x) — so the half of the
 * sheet swinging toward the viewer is brightened and the receding half dimmed.
 * That gradient is what makes the turn read as one direction. 0 switches it off.
 */
const LEAN = 0.3;
const INTRO = 1.1; // seconds to fade in on load

// --- tone ------------------------------------------------------------------
const ALPHA_FLOOR = 0; // black cells fall below MIN_ALPHA and drop out entirely
const ALPHA_RANGE = 1;
const MIN_ALPHA = 0.035; // below this a letter isn't drawn at all
const BRIGHT_GAMMA = 1.8; // pushes the shadows back so the faces carry the read
const SIZE_RANGE = 0.34; // brighter letters render slightly larger

// --- the KHAN streak in the surrounding space -------------------------------
// Built from a trail of recent cursor positions rather than from any fixed shape.
// Letters sit on their own lattice at the photo's font size, tracked tight enough
// horizontally that they butt up against each other.
const HOT_TRACK = 0.68; // horizontal pitch as a fraction of font size — letters touch
const HOT_LEAD = 1.2; // vertical pitch as a fraction of font size
const HOT_WIDTH = 3.2; // radius at the head of the trail, in image row steps
const HOT_TAPER = 0.75; // exponent on how that radius closes as the trail ages
const HOT_FALLOFF = 1.25; // exponent on how brightness dies as the trail ages
const HOT_LIFE = 0.42; // seconds a position stays on the trail
const HOT_ALPHA = 0.95; // opacity at the head
const HOT_DISSOLVE = 0.6; // how readily dim cells drop out; higher breaks up more
const HOT_SPEED = 260; // px/s at which the streak reaches full strength
const HOT_INSET = 1.2; // image row steps of clearance kept around the photo
const CURSOR_EASE = 12; // per second; lower trails further behind the pointer
const SPEED_EASE = 6; // per second, for the speed the streak reads
const TRAIL_STEP = 1.5; // px of movement before a new position is recorded

const LEVELS = FACE_ALPHABET.length;

type Point = {
  x: number; // cell widths from the centre of the sheet
  y: number; // row steps from the centre
  lean: number; // -1..1 across the sheet, for the approach gradient
  alpha: number; // opacity
  seq: number; // position in the letter stream, front side
  seqBack: number; // ...and mirrored, for when the sheet has turned past edge-on
};

/** Points bucketed by brightness level, so each font size is set once per frame. */
function buildBuckets(): Point[][] {
  const buckets: Point[][] = Array.from({ length: LEVELS }, () => []);
  const halfW = (FACE_W * CELL_ASPECT) / 2;
  // The mirrored stream is laid out by scanning each row right-to-left, so the
  // letters still run left-to-right on screen once the sheet has flipped.
  const backSeq = new Int32Array(FACE_W * FACE_H).fill(-1);
  let n = 0;
  for (let r = 0; r < FACE_H; r++)
    for (let c = FACE_W - 1; c >= 0; c--)
      if (FACE_ALPHABET.indexOf(FACE_ROWS[r][c]) >= 0) backSeq[r * FACE_W + c] = n++;

  let seq = 0;
  for (let r = 0; r < FACE_H; r++) {
    const row = FACE_ROWS[r];
    for (let c = 0; c < FACE_W; c++) {
      const level = FACE_ALPHABET.indexOf(row[c]);
      if (level < 0) continue;
      const b = level / (LEVELS - 1);
      const x = (c + 0.5 - FACE_W / 2) * CELL_ASPECT;
      buckets[level].push({
        x,
        y: r + 0.5 - FACE_H / 2,
        lean: x / halfW,
        alpha: ALPHA_FLOOR + ALPHA_RANGE * Math.pow(b, BRIGHT_GAMMA),
        seq: seq++,
        seqBack: backSeq[r * FACE_W + c],
      });
    }
  }
  return buckets;
}

const BUCKETS = buildBuckets();
/** Font size multiplier per brightness level. */
const SIZE_BY_LEVEL = Array.from(
  { length: LEVELS },
  (_, level) => 1 - SIZE_RANGE / 2 + (SIZE_RANGE * level) / (LEVELS - 1),
);
const GRID_W = FACE_W * CELL_ASPECT;

/** Stable per-cell noise, so the tail breaks up rather than fading as a block. */
function jitter(i: number, j: number): number {
  const n = Math.sin(i * 127.1 + j * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

const smoothstep = (t: number) => t * t * (3 - 2 * t);

// Cell indices packed into one integer for the heat map. The bias comfortably
// covers any viewport: even at a 4px pitch, ±4096 cells is over 16k pixels.
const CELL_BIAS = 4096;
const CELL_SPAN = CELL_BIAS * 2;
const packCell = (i: number, j: number) => (i + CELL_BIAS) * CELL_SPAN + (j + CELL_BIAS);
const unpackI = (key: number) => Math.floor(key / CELL_SPAN) - CELL_BIAS;
const unpackJ = (key: number) => (key % CELL_SPAN) - CELL_BIAS;

export default function AsciiPortrait() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    // --- cursor and its trail, in canvas coordinates ---------------------
    let aimX = 0;
    let aimY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let speed = 0; // eased, px/s
    let presenceTarget = 0; // 1 while the cursor is over the page
    let presence = 0;
    let seen = false;
    const trail: { x: number; y: number; t: number }[] = [];
    /** Reused between frames so the hot path doesn't allocate. */
    const heat = new Map<number, number>();

    const onMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      aimX = event.clientX - rect.left;
      aimY = event.clientY - rect.top;
      if (!seen) {
        // don't lay a trail in from the corner on the very first move
        cursorX = aimX;
        cursorY = aimY;
        seen = true;
      }
      presenceTarget = 1;
    };
    const onLeave = () => {
      presenceTarget = 0;
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    // --- draw loop --------------------------------------------------------
    let raf = 0;
    let start = 0;
    let last = 0;

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!start) start = now;
      const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016);
      last = now;

      const t = (now - start) / 1000;
      const prevX = cursorX;
      const prevY = cursorY;
      cursorX += (aimX - cursorX) * (1 - Math.exp(-dt * CURSOR_EASE));
      cursorY += (aimY - cursorY) * (1 - Math.exp(-dt * CURSOR_EASE));
      presence += (presenceTarget - presence) * (1 - Math.exp(-dt * 5));

      const travelled = Math.hypot(cursorX - prevX, cursorY - prevY);
      speed += (travelled / dt - speed) * (1 - Math.exp(-dt * SPEED_EASE));

      // Record where the cursor has been, and forget it once it is stale. The
      // trail is the streak — its length and curvature come out of the movement.
      const tip = trail[trail.length - 1];
      if (!tip || Math.hypot(cursorX - tip.x, cursorY - tip.y) > TRAIL_STEP) {
        trail.push({ x: cursorX, y: cursorY, t });
      }
      while (trail.length && t - trail[0].t > HOT_LIFE) trail.shift();

      ctx.clearRect(0, 0, width, height);

      const theta = reduceMotion ? 0 : SPIN_DIR * t * SPIN_SPEED;
      const turn = Math.cos(theta);
      const facing = Math.abs(turn);
      const approach = Math.sin(theta); // >0 means the right half is coming forward

      // Sized for the sheet at its widest, so the turn doesn't resize it.
      const step = Math.max(
        ROW_STEP_MIN,
        Math.min(
          ROW_STEP_MAX,
          (height * IMAGE_FIT) / FACE_H,
          (width * IMAGE_FIT) / (GRID_W * 1.04),
        ),
      );
      const cellW = CELL_ASPECT * step;
      const fontSize = step * FONT_RATIO;
      const originX = width / 2;
      const originY = height / 2;
      const intro = Math.min(1, t / INTRO);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#f2f0eb";

      // ---- the photo -----------------------------------------------------
      if (facing >= EDGE_ON) {
        const fade = Math.pow(facing, TURN_FADE) * intro;
        const flipped = turn < 0;
        const sheetSide = flipped ? -1 : 1;

        // Squashing the whole sheet condenses the glyphs along with their positions
        // instead of piling them up. The glyphs themselves are never mirrored.
        ctx.save();
        ctx.translate(originX, 0);
        ctx.scale(facing, 1);

        for (let level = 0; level < LEVELS; level++) {
          const bucket = BUCKETS[level];
          if (!bucket.length || bucket[0].alpha * fade < MIN_ALPHA) continue;

          const size = fontSize * SIZE_BY_LEVEL[level];
          ctx.font = `500 ${size.toFixed(2)}px Inter, "Helvetica Neue", Arial, sans-serif`;

          for (const p of bucket) {
            const alpha = p.alpha * fade * (1 + LEAN * p.lean * approach);
            if (alpha < MIN_ALPHA) continue;

            const seq = flipped ? p.seqBack : p.seq;
            const char = IDLE_WORD[seq % IDLE_WORD.length];
            if (char === " ") continue;

            ctx.globalAlpha = alpha < 1 ? alpha : 1;
            ctx.fillText(char, p.x * step * sheetSide, originY + p.y * step);
          }
        }

        ctx.restore();
      }

      // ---- the KHAN streak along the cursor's trail -----------------------
      const strength = smoothstep(Math.min(1, speed / HOT_SPEED)) * presence * intro;
      if (strength > 0.01 && trail.length > 1) {
        const pitchX = fontSize * HOT_TRACK;
        const pitchY = fontSize * HOT_LEAD;
        const inset = HOT_INSET * step;
        const halfW = (FACE_W / 2) * cellW * facing + inset;
        const halfH = (FACE_H / 2) * step + inset;
        const headRadius = HOT_WIDTH * step;

        // Walk the trail and stamp brightness onto whichever cells it passes over.
        // Keeping the brightest contribution stops overlaps from piling up.
        heat.clear();
        for (let k = 1; k < trail.length; k++) {
          const from = trail[k - 1];
          const to = trail[k];
          const segment = Math.hypot(to.x - from.x, to.y - from.y);
          const stride = Math.max(2, headRadius * 0.45);
          const steps = Math.max(1, Math.ceil(segment / stride));

          for (let m = 0; m <= steps; m++) {
            const f = m / steps;
            const px = from.x + (to.x - from.x) * f;
            const py = from.y + (to.y - from.y) * f;
            const age = (t - (from.t + (to.t - from.t) * f)) / HOT_LIFE;
            if (age >= 1) continue;

            const life = 1 - age;
            const radius = headRadius * Math.pow(life, HOT_TAPER);
            if (radius < 1) continue;
            const peak = Math.pow(life, HOT_FALLOFF);

            const i0 = Math.ceil((px - radius - originX) / pitchX - 0.5);
            const i1 = Math.floor((px + radius - originX) / pitchX - 0.5);
            const j0 = Math.ceil((py - radius - originY) / pitchY - 0.5);
            const j1 = Math.floor((py + radius - originY) / pitchY - 0.5);

            for (let j = j0; j <= j1; j++) {
              const y = originY + (j + 0.5) * pitchY;
              const dy = y - py;
              for (let i = i0; i <= i1; i++) {
                const x = originX + (i + 0.5) * pitchX;
                const dx = x - px;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d >= radius) continue;
                const h = peak * smoothstep(1 - d / radius);
                const key = packCell(i, j);
                const had = heat.get(key);
                if (had === undefined || h > had) heat.set(key, h);
              }
            }
          }
        }

        ctx.font = `500 ${fontSize.toFixed(2)}px Inter, "Helvetica Neue", Arial, sans-serif`;

        for (const [key, h] of heat) {
          const i = unpackI(key);
          const j = unpackJ(key);

          const x = originX + (i + 0.5) * pitchX;
          const y = originY + (j + 0.5) * pitchY;
          if (Math.abs(x - originX) < halfW && Math.abs(y - originY) < halfH) continue;

          // Cells drop out as the trail dims, so the tail frays instead of fading
          // as one block. The lattice is fixed, so letters flicker as it sweeps by.
          if (h < jitter(i, j) * HOT_DISSOLVE) continue;

          const alpha = HOT_ALPHA * (0.35 + 0.65 * h) * strength;
          if (alpha < MIN_ALPHA) continue;

          const seq = i + j * 3;
          const k = ((seq % HOT_WORD.length) + HOT_WORD.length) % HOT_WORD.length;

          ctx.globalAlpha = alpha < 1 ? alpha : 1;
          ctx.fillText(HOT_WORD[k], x, y);
        }
      }

      ctx.globalAlpha = 1;
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        last = 0;
        trail.length = 0;
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="portraitCanvas"
      role="img"
      aria-label="Photo of Harun Khan drawn from the letters of his name"
    />
  );
}
