"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { salamDefaultDesign, type SalamDesign } from "@/components/home/salam-designs";
import type { SalamFont } from "@/components/home/salam-fonts/types";
import { cx } from "@/lib/cx";

type SalamProps = {
  font: SalamFont;
  id: string;
  design?: SalamDesign;
  play?: "inview" | "now";
  onDone?: () => void;
  className?: string;
};

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
      className={cx("salam block w-auto overflow-visible text-fg", className)}
    >
      <defs>
        {font.glyphs.map((g, i) => (
          <mask key={i} id={`${id}-m${i}`} maskUnits="userSpaceOnUse" x={vx} y={vy} width={vw} height={vh}>
            <path d={g.fill} fill="#fff" />
          </mask>
        ))}
      </defs>
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
      <g className="salam-ink" fill="currentColor">
        {font.glyphs.map((g, i) => (
          <path key={i} d={g.fill} data-ink="" />
        ))}
      </g>
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
