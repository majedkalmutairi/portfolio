"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { salamDefaultDesign, type SalamDesign } from "@/components/home/salam-designs";
import type { SalamFont } from "@/components/home/salam-fonts/types";
import { cx } from "@/lib/cx";

type SalamProps = {
  font: SalamFont;
  /** Unique on the page: the stencils are referenced by id. */
  id: string;
  /** The pen's rhythm and ink behaviour. See salam-designs.ts. */
  design?: SalamDesign;
  /** `inview` (default) plays once when the nearest <section> is 35% on screen; `now` plays at once. */
  play?: "inview" | "now";
  onDone?: () => void;
  className?: string;
};

// The handwritten greeting (owner's spec: docs/content/about-calligraphy-spec.md; technique changed
// on his request 2026-10-05). It is drawn the way a hand writes: each letter's filled shape is used
// as a stencil, and a wide invisible brush moves along the letter's centre line, so the ink appears
// under the pen tip — no outline, no fill-in afterwards.
//
// The server sends the finished, inked phrase. With JavaScript and motion allowed, the ink is hidden
// before the first paint and the brush strokes play in writing order; as the pen leaves each letter,
// that letter's finished ink settles over the pen's work. Reduced motion, or no JavaScript: the
// finished phrase simply stays. Only stroke-dashoffset, opacity and (for the nib) offset-distance change.
export function Salam({
  font,
  id,
  design = salamDefaultDesign,
  play = "inview",
  onDone,
  className,
}: SalamProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [vx, vy, vw, vh] = font.viewBox.split(" ").map(Number);
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  });

  // Hide the ink before the browser paints, but only when the animation is going to run.
  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg || !canAnimate()) return;
    svg.dataset.pen = "ready";
    return () => {
      delete svg.dataset.pen;
    };
  }, [font, design]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !canAnimate()) return;
    const { drawMs, liftMs, wordMs, dabMs, settleMs, easing, nib } = design;
    const showNib = nib && CSS.supports("offset-path", "path('M0 0L1 1')");

    // One animation per stroke, each starting when the previous one ends — plus small pauses where
    // a hand would lift the pen. Speed is constant: a stroke's time is its share of the total length.
    const strokes = Array.from(svg.querySelectorAll<SVGPathElement>("[data-stroke]"));
    const inks = Array.from(svg.querySelectorAll<SVGPathElement>("[data-ink]"));
    const nibs = Array.from(svg.querySelectorAll<SVGCircleElement>("[data-nib]"));
    const total = strokes.reduce((sum, p) => sum + Number(p.dataset.len), 0);
    const animations: Animation[] = [];
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
      animations.push(path.animate([{ strokeDashoffset: len + w }, { strokeDashoffset: 0 }], timing));
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
      observer?.disconnect();
      animations.forEach((a) => a.cancel());
    };
  }, [font, design, play]);

  return (
    <svg
      ref={svgRef}
      viewBox={font.viewBox}
      role="img"
      aria-label="السلام عليكم (as-salamu alaykum)"
      className={cx(
        "salam mx-auto block h-[clamp(3.5rem,9vw,8rem)] w-auto overflow-visible text-fg",
        className,
      )}
    >
      <defs>
        {font.glyphs.map((g, i) => (
          <mask key={i} id={`${id}-m${i}`} maskUnits="userSpaceOnUse" x={vx} y={vy} width={vw} height={vh}>
            <path d={g.fill} fill="#fff" />
          </mask>
        ))}
      </defs>
      {/* The brush: wide strokes along each letter's centre line, visible only inside the stencil. */}
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
      {/* The finished ink: what you see without JavaScript, with motion off, and once each letter is written. */}
      <g className="salam-ink" fill="currentColor">
        {font.glyphs.map((g, i) => (
          <path key={i} d={g.fill} data-ink="" />
        ))}
      </g>
      {/* The pen tip, one per stroke, each riding along its stroke while that stroke is drawn. */}
      {design.nib ? (
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
