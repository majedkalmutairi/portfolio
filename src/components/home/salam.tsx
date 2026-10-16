"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { salamDefaultDesign, type SalamDesign } from "@/components/home/salam-designs";
import type { SalamFont } from "@/components/home/salam-fonts/types";
import { cx } from "@/lib/cx";

type SalamProps = {
  font: SalamFont;
  id: string;
  design?: SalamDesign;
  play?: "inview" | "now" | "hold" | "never";
  label?: string;
  sparks?: boolean;
  onDone?: () => void;
  className?: string;
};

const GREETING = "السلام عليكم (as-salamu alaykum)";
const SVG_NS = "http://www.w3.org/2000/svg";

const SPARKS = [
  { angle: -112, reach: 2.6, size: 0.3, ms: 460, delay: 0 },
  { angle: -64, reach: 1.9, size: 0.22, ms: 380, delay: 30 },
  { angle: -138, reach: 3.2, size: 0.26, ms: 500, delay: 15 },
  { angle: -86, reach: 2.2, size: 0.2, ms: 350, delay: 45 },
  { angle: -48, reach: 2.9, size: 0.28, ms: 430, delay: 10 },
  { angle: -124, reach: 1.7, size: 0.24, ms: 400, delay: 35 },
  { angle: -96, reach: 3.5, size: 0.21, ms: 480, delay: 20 },
  { angle: -72, reach: 2.4, size: 0.32, ms: 420, delay: 5 },
];
const SPARK_COUNTS = [3, 2, 4, 2, 3, 3, 2, 4];

export function Salam({
  font,
  id,
  design = salamDefaultDesign,
  play = "inview",
  label = GREETING,
  sparks = false,
  onDone,
  className,
}: SalamProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const sparkRef = useRef<SVGGElement>(null);
  const [vx, vy, vw, vh] = font.viewBox.split(" ").map(Number);
  const still = play === "never";
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  });

  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg || still || !canAnimate()) return;
    svg.dataset.pen = "ready";
    return () => {
      delete svg.dataset.pen;
    };
  }, [font, design, still]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || play === "never" || play === "hold" || !canAnimate()) return;
    const { drawMs, liftMs, wordMs, dabMs, settleMs, easing, nib } = design;
    const showNib = nib && CSS.supports("offset-path", "path('M0 0L1 1')");

    const strokes = Array.from(svg.querySelectorAll<SVGPathElement>("[data-stroke]"));
    const inks = Array.from(svg.querySelectorAll<SVGPathElement>("[data-ink]"));
    const nibs = Array.from(svg.querySelectorAll<SVGCircleElement>("[data-nib]"));
    const total = strokes.reduce((sum, p) => sum + Number(p.dataset.len), 0);
    const animations: Animation[] = [];
    const flights: Animation[] = [];
    const layer = sparks ? sparkRef.current : null;
    const widths = strokes.map((p) => Number(p.dataset.w)).sort((a, b) => a - b);
    const base = widths[widths.length >> 1] ?? 0;
    let live = true;

    const spark = (path: SVGPathElement, k: number) => {
      if (!live || !layer) return;
      const end = path.getPointAtLength(path.getTotalLength());
      const count = SPARK_COUNTS[k % SPARK_COUNTS.length];
      for (let n = 0; n < count; n++) {
        const s = SPARKS[(k * 3 + n) % SPARKS.length];
        const turn = (s.angle * Math.PI) / 180;
        const x = end.x + Math.cos(turn) * s.reach * base;
        const y = end.y + Math.sin(turn) * s.reach * base;
        const dot = document.createElementNS(SVG_NS, "circle");
        dot.setAttribute("r", String(s.size * base));
        layer.append(dot);
        const flight = dot.animate(
          [
            { transform: `translate(${end.x}px, ${end.y}px) scale(1)`, opacity: 0.85 },
            { transform: `translate(${x}px, ${y}px) scale(0.2)`, opacity: 0 },
          ],
          { duration: s.ms, delay: s.delay, easing: "cubic-bezier(0.33, 1, 0.68, 1)", fill: "both" },
        );
        flights.push(flight);
        flight.finished.then(
          () => dot.remove(),
          () => {},
        );
      }
    };

    const glyphEnds: number[] = [];
    let t = 0;
    let lastWord = -1;
    let lastGlyph = -1;
    strokes.forEach((path, k) => {
      const len = Number(path.dataset.len);
      const w = Number(path.dataset.w);
      const word = Number(path.dataset.word);
      const glyph = Number(path.dataset.glyph);
      const lifted = path.dataset.lift !== undefined;
      if (lastWord !== -1 && word !== lastWord) t += wordMs;
      else if ((lastGlyph !== -1 && glyph !== lastGlyph) || lifted) t += liftMs;
      lastWord = word;
      lastGlyph = glyph;
      const duration = Math.max(lifted ? dabMs : 0, (drawMs * len) / total);
      const timing = { duration, delay: t, easing, fill: "both" as const };
      const draw = path.animate([{ strokeDashoffset: len + w }, { strokeDashoffset: 0 }], timing);
      animations.push(draw);
      if (layer) {
        const next = strokes[k + 1];
        const lifts =
          !next ||
          next.dataset.word !== path.dataset.word ||
          next.dataset.glyph !== path.dataset.glyph ||
          next.dataset.lift !== undefined;
        if (lifts) {
          draw.finished.then(
            () => spark(path, k),
            () => {},
          );
        }
      }
      if (showNib && nibs[k]) {
        animations.push(
          nibs[k].animate([{ offsetDistance: "0%" }, { offsetDistance: "100%" }], timing),
          nibs[k].animate(
            [{ opacity: 0 }, { opacity: 1, offset: 0.08 }, { opacity: 1, offset: 0.92 }, { opacity: 0 }],
            {
              ...timing,
              easing: "linear",
            },
          ),
        );
      }
      t += duration;
      glyphEnds[glyph] = t;
    });
    inks.forEach((path, i) => {
      animations.push(
        path.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: settleMs,
          delay: glyphEnds[i] ?? t,
          easing: "ease-in",
          fill: "both",
        }),
      );
    });
    animations.forEach((a) => a.pause());

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      svg.dataset.pen = "done";
      onDoneRef.current?.();
    };
    const start = () => {
      animations.forEach((a) => a.play());
      Promise.all(animations.map((a) => a.finished)).then(finish, () => {});
    };

    let observer: IntersectionObserver | undefined;
    if (play === "now" || !("IntersectionObserver" in window)) {
      start();
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          observer?.disconnect();
          start();
        },
        { threshold: 0.35 },
      );
      observer.observe(svg.closest("section") ?? svg);
    }

    return () => {
      live = false;
      observer?.disconnect();
      animations.forEach((a) => a.cancel());
      flights.forEach((a) => a.cancel());
      layer?.replaceChildren();
    };
  }, [font, design, play, sparks]);

  return (
    <svg
      ref={svgRef}
      viewBox={font.viewBox}
      role="img"
      aria-label={label}
      className={cx("salam block w-auto overflow-visible text-fg", className)}
    >
      {still ? null : (
        <defs>
          {font.glyphs.map((g, i) => (
            <mask key={i} id={`${id}-m${i}`} maskUnits="userSpaceOnUse" x={vx} y={vy} width={vw} height={vh}>
              <path d={g.fill} fill="#fff" />
            </mask>
          ))}
        </defs>
      )}
      {still ? null : (
        <g
          fill="none"
          stroke="currentColor"
          strokeOpacity={design.wet}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {font.glyphs.map((g, i) => (
            <g key={i} mask={`url(#${id}-m${i})`}>
              {g.strokes.map((s, k) => (
                <path
                  key={k}
                  d={s.d}
                  strokeWidth={s.w}
                  data-stroke=""
                  data-len={s.len}
                  data-w={s.w}
                  data-word={g.word}
                  data-glyph={i}
                  data-lift={s.lift ? "" : undefined}
                  style={{ strokeDasharray: `${s.len} ${s.len + 2 * s.w}`, strokeDashoffset: s.len + s.w }}
                />
              ))}
            </g>
          ))}
        </g>
      )}
      <g className="salam-ink" fill="currentColor">
        {font.glyphs.map((g, i) => (
          <path key={i} d={g.fill} data-ink="" />
        ))}
      </g>
      {design.nib && !still ? (
        <g className="salam-nib" fill="currentColor">
          {font.glyphs.flatMap((g, i) =>
            g.strokes.map((s, k) => (
              <circle
                key={`${i}-${k}`}
                r={s.w / 2.6}
                data-nib=""
                style={{ offsetPath: `path("${s.d}")`, offsetRotate: "0deg", opacity: 0 }}
              />
            )),
          )}
        </g>
      ) : null}
      {sparks && !still ? <g ref={sparkRef} className="salam-sparks" fill="currentColor" /> : null}
    </svg>
  );
}

function canAnimate() {
  return (
    typeof window !== "undefined" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    typeof SVGPathElement.prototype.animate === "function"
  );
}
