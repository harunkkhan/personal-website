/**
 * Turns the portrait photo into the letter grid that the homepage renders.
 *
 *   node scripts/gen-face.mjs --preview          # ASCII preview in the terminal
 *   node scripts/gen-face.mjs --write src/faceData.ts
 *
 * Needs `sips` (macOS) to normalise the source photo into an 8-bit PNG; the PNG
 * is then decoded here so there are no npm dependencies.
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { inflateSync } from "node:zlib";

const SOURCE = "public/harun-profile.png";

// ---- tunables -------------------------------------------------------------
/** Region of the source photo to sample. The whole frame, by default. */
const CROP = { x0: 0, y0: 0, x1: 1, y1: 1 };
/**
 * Grid size. Keep GW / GH close to the crop's aspect ratio so each cell covers a
 * roughly square patch of the photo and the letters can be drawn on square cells.
 */
const GW = 58; // grid columns
const GH = 68; // grid rows
const LO_PCT = 0.18; // luminance percentile mapped to black — clamps the dead background
const HI_PCT = 0.995; // ...and to white
const GAMMA = 0.92;
const SHARPEN = 0.85; // unsharp amount — pulls out brows, nose, lips
const BLUR_R = 2; // unsharp blur radius, in cells
const EDGE_FADE = 4.5; // cells over which brightness fades out at the frame edge
const EDGE_FLOOR = 0.1; // brightness multiplier right at the edge

/**
 * The photo is only ~130px across Harun's head and he is squinting, so his eyes
 * average away to mid grey and the face loses its structure. Re-seat them with a
 * soft darkening at their measured positions (fractions of the whole frame).
 */
const EYES = [
  { u: 0.468, v: 0.412, ru: 0.023, rv: 0.021, amount: 0.62 },
  { u: 0.626, v: 0.426, ru: 0.023, rv: 0.021, amount: 0.62 },
];
// ---------------------------------------------------------------------------

// ---- load the photo as a luminance buffer ---------------------------------
const tmp = mkdtempSync(join(tmpdir(), "genface-"));
let w, h, lum;
try {
  const png = join(tmp, "src.png");
  execFileSync("sips", ["-s", "format", "png", "-Z", "240", SOURCE, "--out", png], {
    stdio: ["ignore", "ignore", "inherit"],
  });
  ({ w, h, lum } = decodePngLuminance(readFileSync(png)));
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

/** Minimal 8-bit, non-interlaced PNG decoder -> { w, h, lum: Float32Array }. */
function decodePngLuminance(buf) {
  let pos = 8;
  let width = 0, height = 0, bitDepth = 0, colorType = 0;
  const idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString("ascii", pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
      if (data[12] !== 0) throw new Error("interlaced PNGs are not supported");
    } else if (type === "IDAT") idat.push(data);
    else if (type === "IEND") break;
    pos += 12 + len;
  }
  if (bitDepth !== 8) throw new Error(`unsupported bit depth ${bitDepth}`);
  const bpp = { 0: 1, 2: 3, 4: 2, 6: 4 }[colorType];
  if (!bpp) throw new Error(`unsupported colour type ${colorType}`);

  const raw = inflateSync(Buffer.concat(idat));
  const stride = width * bpp;
  const out = Buffer.alloc(height * stride);
  let rp = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[rp++];
    const row = raw.subarray(rp, rp + stride);
    rp += stride;
    const cur = out.subarray(y * stride, (y + 1) * stride);
    const prev = y > 0 ? out.subarray((y - 1) * stride, y * stride) : null;
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? cur[x - bpp] : 0;
      const b = prev ? prev[x] : 0;
      const c = prev && x >= bpp ? prev[x - bpp] : 0;
      let v = row[x];
      if (filter === 1) v += a;
      else if (filter === 2) v += b;
      else if (filter === 3) v += (a + b) >> 1;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
        v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      } else if (filter !== 0) throw new Error(`unknown filter ${filter}`);
      cur[x] = v & 0xff;
    }
  }

  const l = new Float32Array(width * height);
  for (let i = 0; i < l.length; i++) {
    const o = i * bpp;
    const r = out[o];
    const g = bpp >= 3 ? out[o + 1] : r;
    const b = bpp >= 3 ? out[o + 2] : r;
    l[i] = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  }
  return { w: width, h: height, lum: l };
}

// ---- sample the crop into the grid ----------------------------------------
const cx0 = CROP.x0 * w, cy0 = CROP.y0 * h;
const cw = (CROP.x1 - CROP.x0) * w, ch = (CROP.y1 - CROP.y0) * h;

const px = (x, y) =>
  lum[Math.min(h - 1, Math.max(0, y)) * w + Math.min(w - 1, Math.max(0, x))];

const sampleCell = (c, r) => {
  const sx0 = cx0 + (c / GW) * cw, sx1 = cx0 + ((c + 1) / GW) * cw;
  const sy0 = cy0 + (r / GH) * ch, sy1 = cy0 + ((r + 1) / GH) * ch;
  let sum = 0, n = 0;
  for (let y = Math.floor(sy0); y < Math.max(Math.floor(sy0) + 1, Math.ceil(sy1)); y++)
    for (let x = Math.floor(sx0); x < Math.max(Math.floor(sx0) + 1, Math.ceil(sx1)); x++) {
      sum += px(x, y);
      n++;
    }
  return sum / n;
};

const raw = new Float32Array(GW * GH);
for (let r = 0; r < GH; r++)
  for (let c = 0; c < GW; c++) raw[r * GW + c] = sampleCell(c, r);

// ---- normalise, sharpen, fade the frame edge, seat the eyes ---------------
const sorted = Array.from(raw).sort((a, b) => a - b);
const lo = sorted[Math.floor(LO_PCT * (sorted.length - 1))];
const hi = sorted[Math.floor(HI_PCT * (sorted.length - 1))];

const lin = new Float32Array(GW * GH);
for (let i = 0; i < raw.length; i++)
  lin[i] = Math.min(1, Math.max(0, (raw[i] - lo) / (hi - lo)));

const blur = new Float32Array(GW * GH);
for (let r = 0; r < GH; r++)
  for (let c = 0; c < GW; c++) {
    let sum = 0, n = 0;
    for (let dy = -BLUR_R; dy <= BLUR_R; dy++)
      for (let dx = -BLUR_R; dx <= BLUR_R; dx++) {
        const y = r + dy, x = c + dx;
        if (x < 0 || y < 0 || x >= GW || y >= GH) continue;
        sum += lin[y * GW + x];
        n++;
      }
    blur[r * GW + c] = n ? sum / n : lin[r * GW + c];
  }

// chamfer distance from each cell to the edge of the frame, in cells
const dist = new Float32Array(GW * GH).fill(1e6);
for (let r = 0; r < GH; r++)
  for (let c = 0; c < GW; c++)
    dist[r * GW + c] = 1 + Math.min(c, r, GW - 1 - c, GH - 1 - r);

const norm = new Float32Array(GW * GH);
for (let r = 0; r < GH; r++)
  for (let c = 0; c < GW; c++) {
    const i = r * GW + c;
    const sharp = Math.min(1, Math.max(0, lin[i] + SHARPEN * (lin[i] - blur[i])));
    const t = Math.min(1, dist[i] / EDGE_FADE);
    const fade = EDGE_FLOOR + (1 - EDGE_FLOOR) * (t * t * (3 - 2 * t));

    const u = (c + 0.5) / GW, v = (r + 0.5) / GH;
    let eye = 1;
    for (const e of EYES) {
      const d = ((u - e.u) / e.ru) ** 2 + ((v - e.v) / e.rv) ** 2;
      if (d < 1) eye *= 1 - e.amount * (1 - d) ** 1.4;
    }

    norm[i] = Math.pow(sharp, GAMMA) * fade * eye;
  }

// ---- preview --------------------------------------------------------------
if (process.argv.includes("--preview")) {
  const ramp = process.argv.includes("--hex") ? "0123456789abcdef" : " .:-=+*#%@";
  const lines = [];
  for (let r = 0; r < GH; r++) {
    let line = "";
    for (let c = 0; c < GW; c++) {
      const i = r * GW + c;
      line += ramp[Math.min(ramp.length - 1, Math.floor(norm[i] * ramp.length))];
    }
    lines.push(String(r).padStart(2) + "|" + line + "|");
  }
  console.log(lines.join("\n"));
  console.error(`grid ${GW}x${GH}, ${GW * GH} cells`);
}

// ---- emit -----------------------------------------------------------------
const ALPHABET = "0123456789abcdefghijklmnopqrstuv"; // 32 brightness levels
const rows = [];
for (let r = 0; r < GH; r++) {
  let s = "";
  for (let c = 0; c < GW; c++)
    s += ALPHABET[Math.min(31, Math.round(norm[r * GW + c] * 31))];
  rows.push(s);
}

const file = `// Generated from ${SOURCE} by scripts/gen-face.mjs — do not edit by hand.
// A ${GW}x${GH} sampling of the photo. Each character indexes FACE_ALPHABET to give
// the cell's brightness.
export const FACE_W = ${GW};
export const FACE_H = ${GH};
/** Width / height of the photo crop, so the grid can be drawn at the right aspect. */
export const FACE_ASPECT = ${(cw / ch).toFixed(4)};
export const FACE_ALPHABET = "${ALPHABET}";
export const FACE_ROWS: readonly string[] = [
${rows.map((r) => `  "${r}",`).join("\n")}
];
`;

const wi = process.argv.indexOf("--write");
if (wi !== -1) {
  writeFileSync(process.argv[wi + 1], file);
  console.error(`wrote ${process.argv[wi + 1]}`);
}
