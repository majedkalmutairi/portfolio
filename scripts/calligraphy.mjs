// Generates the handwritten greeting in the About section.
//
//   npm run calligraphy            → every font in FONTS
//   npm run calligraphy -- amiri   → one font
//
// For each font: shape "السلام عليكم" with fontkit (it joins Arabic letters correctly), turn every
// glyph into a filled SVG path, then — in a headless browser — rasterise each glyph, thin it down to
// its one-pixel-wide centre line (the route a pen would take), and turn that into stroke paths with
// a pen width wide enough to cover the letter. The site hides the filled letter behind a stencil and
// moves an invisible brush along the centre line, so the ink appears under the pen — nothing is
// outlined first. Output: src/components/home/salam/<font>.ts. The fonts never ship.
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import * as fontkit from "fontkit";
import { chromium } from "playwright-core";

const TEXT = "السلام عليكم";
const CACHE = path.join("node_modules", ".cache", "calligraphy");
const OUT_DIR = path.join("src", "components", "home", "salam-fonts");
const RAW = "https://github.com/google/fonts/raw/main/ofl/";

// Google Fonts, SIL Open Font License. Any `ofl/<family>/<File>.ttf` from github.com/google/fonts
// can be added here to try another face; fontkit cannot read every font (Gulzar, for one).
const FONTS = [{ id: "amiri", label: "Amiri", file: "amiri/Amiri-Regular.ttf" }]; // the owner's pick

const only = process.argv.slice(2);
const fonts = only.length ? FONTS.filter((f) => only.includes(f.id)) : FONTS;
if (!fonts.length) throw new Error(`No such font id. Known: ${FONTS.map((f) => f.id).join(", ")}`);

async function fontFile(font) {
  const file = path.join(CACHE, path.basename(font.file));
  if (!existsSync(file)) {
    mkdirSync(CACHE, { recursive: true });
    const response = await fetch(RAW + font.file);
    if (!response.ok) throw new Error(`Couldn't download ${font.file}: ${response.status}`);
    writeFileSync(file, Buffer.from(await response.arrayBuffer()));
  }
  return file;
}

// Shapes the phrase and returns one entry per drawable glyph: its filled path (font units, y
// pointing down like SVG), its box, which word it belongs to, and whether it is a dot/mark.
function shape(file) {
  const font = fontkit.openSync(file);
  const run = font.layout(TEXT);
  const glyphs = [];
  let penX = 0;
  let spaceX = null;
  run.glyphs.forEach((glyph, i) => {
    const pos = run.positions[i];
    const x = penX + pos.xOffset;
    const y = pos.yOffset;
    penX += pos.xAdvance;
    if (glyph.codePoints.includes(32)) {
      spaceX = x;
      return;
    }
    const bbox = glyph.path.bbox;
    if (!Number.isFinite(bbox.minX) || bbox.maxX - bbox.minX < 1) return;
    const outline = glyph.path.translate(x, y).scale(1, -1);
    const b = outline.bbox;
    const width = b.maxX - b.minX;
    const height = b.maxY - b.minY;
    // A mark with no letter of its own, or anything dot-sized, is drawn after its word's letters.
    const isMark =
      glyph.codePoints.length === 0 || (width < 0.26 * font.unitsPerEm && height < 0.26 * font.unitsPerEm);
    glyphs.push({
      d: outline.toSVG(),
      box: { minX: b.minX, minY: b.minY, maxX: b.maxX, maxY: b.maxY },
      cx: (b.minX + b.maxX) / 2,
      isMark,
    });
  });
  for (const g of glyphs) g.word = spaceX === null || g.cx > spaceX ? 0 : 1;
  return { glyphs, unitsPerEm: font.unitsPerEm };
}

// Runs inside the browser. Rasterises one glyph, thins it to its centre line, breaks that into
// strokes between junctions, orders them the way a pen would move (right to left, details first),
// and measures how wide the pen must be on each stroke to cover the letter.
function skeletonizeInBrowser({ d, box, scale }) {
  const PAD = 6;
  const W = Math.ceil((box.maxX - box.minX) * scale) + PAD * 2;
  const H = Math.ceil((box.maxY - box.minY) * scale) + PAD * 2;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  ctx.translate(PAD - box.minX * scale, PAD - box.minY * scale);
  ctx.scale(scale, scale);
  ctx.fillStyle = "#000";
  ctx.fill(new Path2D(d));
  const rgba = ctx.getImageData(0, 0, W, H).data;
  const ink = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) ink[i] = rgba[i * 4 + 3] > 127 ? 1 : 0;

  // Distance to the nearest background pixel (chamfer 3-4, two passes), in pixels.
  const INF = 1e9;
  const dist = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) dist[i] = ink[i] ? INF : 0;
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const i = y * W + x;
      if (!ink[i]) continue;
      let m = dist[i];
      if (x > 0) m = Math.min(m, dist[i - 1] + 3);
      if (y > 0) m = Math.min(m, dist[i - W] + 3);
      if (x > 0 && y > 0) m = Math.min(m, dist[i - W - 1] + 4);
      if (x < W - 1 && y > 0) m = Math.min(m, dist[i - W + 1] + 4);
      dist[i] = m;
    }
  for (let y = H - 1; y >= 0; y--)
    for (let x = W - 1; x >= 0; x--) {
      const i = y * W + x;
      if (!ink[i]) continue;
      let m = dist[i];
      if (x < W - 1) m = Math.min(m, dist[i + 1] + 3);
      if (y < H - 1) m = Math.min(m, dist[i + W] + 3);
      if (x < W - 1 && y < H - 1) m = Math.min(m, dist[i + W + 1] + 4);
      if (x > 0 && y < H - 1) m = Math.min(m, dist[i + W - 1] + 4);
      dist[i] = m;
    }
  const thickness = (x, y) => dist[y * W + x] / 3; // half the stroke width at that pixel

  // Connected components of the ink (8-connected), so dots can be told from the letter body.
  const label = new Int32Array(W * H).fill(-1);
  const area = [];
  for (let s = 0; s < W * H; s++) {
    if (!ink[s] || label[s] !== -1) continue;
    const id = area.length;
    area.push(0);
    const stack = [s];
    label[s] = id;
    while (stack.length) {
      const i = stack.pop();
      area[id]++;
      const x = i % W,
        y = (i - x) / W;
      for (let dy = -1; dy <= 1; dy++)
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx,
            ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
          const j = ny * W + nx;
          if (ink[j] && label[j] === -1) {
            label[j] = id;
            stack.push(j);
          }
        }
    }
  }

  // Zhang–Suen thinning: peel the shape from all sides until a one-pixel line is left.
  const sk = Uint8Array.from(ink);
  const P = (x, y) => (x < 0 || y < 0 || x >= W || y >= H ? 0 : sk[y * W + x]);
  let changed = true;
  while (changed) {
    changed = false;
    for (let pass = 0; pass < 2; pass++) {
      const remove = [];
      for (let y = 1; y < H - 1; y++)
        for (let x = 1; x < W - 1; x++) {
          if (!sk[y * W + x]) continue;
          const p2 = P(x, y - 1),
            p3 = P(x + 1, y - 1),
            p4 = P(x + 1, y),
            p5 = P(x + 1, y + 1);
          const p6 = P(x, y + 1),
            p7 = P(x - 1, y + 1),
            p8 = P(x - 1, y),
            p9 = P(x - 1, y - 1);
          const B = p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
          if (B < 2 || B > 6) continue;
          const seq = [p2, p3, p4, p5, p6, p7, p8, p9, p2];
          let A = 0;
          for (let k = 0; k < 8; k++) if (seq[k] === 0 && seq[k + 1] === 1) A++;
          if (A !== 1) continue;
          const c1 = pass === 0 ? p2 * p4 * p6 : p2 * p4 * p8;
          const c2 = pass === 0 ? p4 * p6 * p8 : p2 * p6 * p8;
          if (c1 !== 0 || c2 !== 0) continue;
          remove.push(y * W + x);
        }
      for (const i of remove) sk[i] = 0;
      if (remove.length) changed = true;
    }
  }

  // The skeleton as a graph: nodes are end points and junctions, edges are the runs between them.
  const neighbours = (x, y) => {
    const out = [];
    for (let dy = -1; dy <= 1; dy++)
      for (let dx = -1; dx <= 1; dx++) {
        if (!dx && !dy) continue;
        if (P(x + dx, y + dy)) out.push([x + dx, y + dy]);
      }
    return out;
  };
  const degree = new Uint8Array(W * H);
  const skPixels = [];
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++)
      if (sk[y * W + x]) {
        degree[y * W + x] = neighbours(x, y).length;
        skPixels.push([x, y]);
      }
  const isNode = (x, y) => P(x, y) && degree[y * W + x] !== 2;
  // Node pixels that touch each other form one node.
  const nodeOf = new Int32Array(W * H).fill(-1);
  const nodes = [];
  for (const [x, y] of skPixels) {
    if (!isNode(x, y) || nodeOf[y * W + x] !== -1) continue;
    const id = nodes.length;
    const node = { id, pixels: [], x: 0, y: 0, edges: [], comp: label[y * W + x] };
    nodes.push(node);
    const stack = [[x, y]];
    nodeOf[y * W + x] = id;
    while (stack.length) {
      const [px, py] = stack.pop();
      node.pixels.push([px, py]);
      for (const [nx, ny] of neighbours(px, py))
        if (isNode(nx, ny) && nodeOf[ny * W + nx] === -1) {
          nodeOf[ny * W + nx] = id;
          stack.push([nx, ny]);
        }
    }
    node.x = node.pixels.reduce((s, p) => s + p[0], 0) / node.pixels.length;
    node.y = node.pixels.reduce((s, p) => s + p[1], 0) / node.pixels.length;
  }
  const edges = [];
  const used = new Uint8Array(W * H); // degree-2 pixels already claimed by an edge
  const addEdge = (a, b, pts) => {
    const e = { a, b, pts };
    edges.push(e);
    nodes[a].edges.push(e);
    if (b !== a) nodes[b].edges.push(e);
  };
  for (const node of nodes) {
    for (const [px, py] of node.pixels) {
      for (const [qx, qy] of neighbours(px, py)) {
        const q = qy * W + qx;
        if (isNode(qx, qy)) {
          // Two nodes touching directly: a tiny edge, recorded once.
          const other = nodeOf[q];
          if (other > node.id && !edges.some((e) => e.a === node.id && e.b === other && e.pts.length === 2))
            addEdge(node.id, other, [
              [px, py],
              [qx, qy],
            ]);
          continue;
        }
        if (used[q]) continue;
        const pts = [
          [px, py],
          [qx, qy],
        ];
        used[q] = 1;
        let cx = qx,
          cy = qy,
          prevX = px,
          prevY = py;
        let end = -1;
        for (;;) {
          const next = neighbours(cx, cy).filter(
            ([nx, ny]) => !(nx === prevX && ny === prevY) && !(nx === px && ny === py && pts.length < 3),
          );
          const nodeNext = next.find(([nx, ny]) => isNode(nx, ny));
          if (nodeNext) {
            pts.push(nodeNext);
            end = nodeOf[nodeNext[1] * W + nodeNext[0]];
            break;
          }
          const free = next.find(([nx, ny]) => !used[ny * W + nx]);
          if (!free) {
            end = -1;
            break;
          }
          used[free[1] * W + free[0]] = 1;
          pts.push(free);
          prevX = cx;
          prevY = cy;
          cx = free[0];
          cy = free[1];
        }
        if (end === -1) end = node.id; // ran back into itself (a loop through this node)
        addEdge(node.id, end, pts);
      }
    }
  }
  // A closed ring with no end points or junctions (an isolated loop) has no nodes yet.
  for (const [x, y] of skPixels) {
    const i = y * W + x;
    if (used[i] || isNode(x, y)) continue;
    const id = nodes.length;
    const node = { id, pixels: [[x, y]], x, y, edges: [], comp: label[i] };
    nodes.push(node);
    // Start the ring at its rightmost pixel so the pen begins on the right.
    const pts = [[x, y]];
    used[i] = 1;
    let cx = x,
      cy = y,
      prevX = -1,
      prevY = -1;
    for (;;) {
      const next = neighbours(cx, cy).find(
        ([nx, ny]) => !used[ny * W + nx] && !(nx === prevX && ny === prevY),
      );
      if (!next) break;
      used[next[1] * W + next[0]] = 1;
      pts.push(next);
      prevX = cx;
      prevY = cy;
      cx = next[0];
      cy = next[1];
    }
    pts.push([x, y]);
    addEdge(id, id, pts);
  }

  // Prune hairs: a short edge ending in an end point, no longer than the stroke is thick there.
  const edgeLen = (e) => {
    let l = 0;
    for (let k = 1; k < e.pts.length; k++)
      l += Math.hypot(e.pts[k][0] - e.pts[k - 1][0], e.pts[k][1] - e.pts[k - 1][1]);
    return l;
  };
  for (const e of [...edges]) {
    if (e.a === e.b) continue;
    const A = nodes[e.a],
      B = nodes[e.b];
    const tip = A.edges.length === 1 ? A : B.edges.length === 1 ? B : null;
    const root = tip === A ? B : A;
    if (!tip || root.edges.length < 3) continue;
    const limit = Math.max(4, 1.3 * thickness(Math.round(root.x), Math.round(root.y)));
    if (edgeLen(e) < limit) {
      edges.splice(edges.indexOf(e), 1);
      A.edges.splice(A.edges.indexOf(e), 1);
      B.edges.splice(B.edges.indexOf(e), 1);
    }
  }

  // Order the strokes like a pen: start at the rightmost end, and at every junction take the
  // detour whose far end is furthest right first (finish the local detail), keep going left last.
  const visited = new Set();
  const ordered = [];
  function walk(nodeId) {
    const node = nodes[nodeId];
    const choices = node.edges
      .filter((e) => !visited.has(e))
      .map((e) => ({ e, other: e.a === nodeId ? e.b : e.a }))
      .sort((p, q) => nodes[q.other].x - nodes[p.other].x || nodes[p.other].y - nodes[q.other].y);
    for (const { e, other } of choices) {
      if (visited.has(e)) continue;
      visited.add(e);
      const pts = e.a === nodeId ? e.pts : [...e.pts].reverse();
      ordered.push({ pts, comp: node.comp });
      walk(other);
    }
  }
  const byComp = new Map();
  for (const n of nodes) {
    if (!byComp.has(n.comp)) byComp.set(n.comp, []);
    byComp.get(n.comp).push(n);
  }
  const comps = [...byComp.entries()].sort((a, b) => area[b[0]] - area[a[0]]); // body first, dots after
  const strokesByComp = [];
  for (const [comp, members] of comps) {
    const ends = members.filter((n) => n.edges.length === 1);
    const pool = ends.length ? ends : members;
    const start = pool.reduce(
      (best, n) => (n.x > best.x || (n.x === best.x && n.y < best.y) ? n : best),
      pool[0],
    );
    const before = ordered.length;
    walk(start.id);
    for (const n of members) if (n.edges.some((e) => !visited.has(e))) walk(n.id);
    if (ordered.length === before) {
      // A piece so small it thinned to a single point (a dot): one short dab across its middle.
      const r = Math.max(1, thickness(Math.round(start.x), Math.round(start.y)) / 2);
      ordered.push({
        pts: [
          [start.x - r, start.y],
          [start.x + r, start.y],
        ],
        comp,
      });
    }
    strokesByComp.push({ area: area[comp], strokes: ordered.slice(before) });
  }

  // Simplify each polyline (Ramer–Douglas–Peucker), measure the pen width it needs, convert back
  // to font units.
  const simplify = (pts, eps) => {
    if (pts.length < 3) return pts;
    let maxD = 0,
      idx = 0;
    const [ax, ay] = pts[0],
      [bx, by] = pts[pts.length - 1];
    const len = Math.hypot(bx - ax, by - ay) || 1;
    for (let k = 1; k < pts.length - 1; k++) {
      const [x, y] = pts[k];
      const dd = Math.abs((bx - ax) * (ay - y) - (ax - x) * (by - ay)) / len;
      if (dd > maxD) {
        maxD = dd;
        idx = k;
      }
    }
    if (maxD <= eps) return [pts[0], pts[pts.length - 1]];
    return [...simplify(pts.slice(0, idx + 1), eps).slice(0, -1), ...simplify(pts.slice(idx), eps)];
  };
  const toUnits = ([x, y]) => [(x - PAD) / scale + box.minX, (y - PAD) / scale + box.minY];
  return strokesByComp.map(({ area, strokes }) => ({
    area,
    strokes: strokes.map(({ pts }) => {
      let half = 0;
      for (const [x, y] of pts) half = Math.max(half, thickness(Math.round(x), Math.round(y)) || 0);
      const simple = simplify(pts, 0.9).map(toUnits);
      let len = 0;
      for (let k = 1; k < simple.length; k++)
        len += Math.hypot(simple[k][0] - simple[k - 1][0], simple[k][1] - simple[k - 1][1]);
      // A fifth wider than the letter, so a round pen tip still covers square stroke ends.
      return { pts: simple, len, w: ((half * 1.2 + 2) * 2) / scale };
    }),
  }));
}

const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage();
await page.setContent("<!doctype html><title>skeleton</title>");

mkdirSync(OUT_DIR, { recursive: true });
const r1 = (n) => Math.round(n * 10) / 10;
for (const font of fonts) {
  const file = await fontFile(font);
  let shaped;
  try {
    shaped = shape(file);
  } catch (error) {
    // fontkit can't read every font. Say which, and carry on with the rest.
    console.error(`${font.label}: skipped — fontkit couldn't read it (${error.message})`);
    continue;
  }
  const { glyphs, unitsPerEm } = shaped;
  const scale = 360 / unitsPerEm; // ~360 px per em is plenty for a clean centre line
  const PAD = 0.04 * unitsPerEm;
  const minX = Math.min(...glyphs.map((g) => g.box.minX)) - PAD;
  const minY = Math.min(...glyphs.map((g) => g.box.minY)) - PAD;
  const maxX = Math.max(...glyphs.map((g) => g.box.maxX)) + PAD;
  const maxY = Math.max(...glyphs.map((g) => g.box.maxY)) + PAD;

  // Writing order: first word (on the right) before the second; letters before marks; right to left.
  glyphs.sort((a, b) => a.word - b.word || Number(a.isMark) - Number(b.isMark) || b.cx - a.cx);

  const out = [];
  for (const g of glyphs) {
    const comps = await page.evaluate(skeletonizeInBrowser, { d: g.d, box: g.box, scale });
    const strokes = [];
    comps.forEach((c, ci) => {
      // Join routes that continue where the last one ended (the pen never lifted), unless the pen
      // would have to change width a lot — a wide pen on a thin stroke uncovers too much at once.
      const merged = [];
      for (const s of c.strokes) {
        const prev = merged[merged.length - 1];
        const [px, py] = prev ? prev.pts[prev.pts.length - 1] : [NaN, NaN];
        const [sx, sy] = s.pts[0];
        const joins = prev && Math.hypot(px - sx, py - sy) < 0.5;
        const similar = prev && Math.max(prev.w, s.w) / Math.min(prev.w, s.w) < 1.6;
        if (joins && similar) {
          prev.pts.push(...s.pts.slice(1));
          prev.len += s.len;
          prev.w = Math.max(prev.w, s.w);
        } else {
          merged.push({ pts: [...s.pts], len: s.len, w: s.w });
        }
      }
      merged.forEach((s, si) => {
        strokes.push({
          d: "M" + s.pts.map(([x, y]) => `${r1(x)} ${r1(y)}`).join("L"),
          len: r1(s.len),
          w: r1(s.w),
          // First stroke of a separate piece (a dot, say): the pen lifts before it.
          ...(ci > 0 && si === 0 ? { lift: true } : {}),
        });
      });
    });
    out.push({ fill: g.d.replace(/-?\d+\.\d+/g, (n) => String(r1(Number(n)))), word: g.word, strokes });
  }
  const totalLen = out.reduce((s, g) => s + g.strokes.reduce((t, k) => t + k.len, 0), 0);
  const body = `// GENERATED by scripts/calligraphy.mjs — do not edit by hand; run \`npm run calligraphy -- ${font.id}\`.
// "${TEXT}" in ${font.label} (SIL Open Font License). Each glyph: its filled shape, and the pen
// strokes (centre lines) that reveal it, already in writing order.
import type { SalamFont } from "./types";

export const ${font.id}: SalamFont = ${JSON.stringify(
    {
      id: font.id,
      label: font.label,
      viewBox: [minX, minY, maxX - minX, maxY - minY].map(Math.round).join(" "),
      glyphs: out,
    },
    null,
    1,
  )};
`;
  writeFileSync(path.join(OUT_DIR, `${font.id}.ts`), body);
  console.log(
    `${font.label}: ${out.length} glyphs, ${out.reduce((s, g) => s + g.strokes.length, 0)} strokes, pen path ${Math.round(totalLen)} units`,
  );
}
await browser.close();
