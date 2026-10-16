"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Salam } from "@/components/home/salam";
import { salamNameDesign } from "@/components/home/salam-designs";
import { nameArefRuqaa } from "@/components/home/salam-fonts/name";
import { site } from "@/content/site";
import { readIntroPhase, type IntroPhase } from "@/lib/intro-phase";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-intro"] });
  return () => observer.disconnect();
}

function serverPhase(): IntroPhase {
  return null;
}

const START_MS = 500;

export function NameMark() {
  const phase = useSyncExternalStore(subscribe, readIntroPhase, serverPhase);
  const [seen, setSeen] = useState(false);
  const [started, setStarted] = useState(false);
  if (phase !== null && !seen) setSeen(true);

  useEffect(() => {
    if (phase !== "reveal") return;
    const timer = window.setTimeout(() => setStarted(true), START_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const play = !seen ? "never" : started || phase === null ? "now" : "hold";

  return (
    <Link
      href="/"
      aria-label={site.name}
      className="text-sm font-bold text-fg transition-colors duration-150 hover:text-fg-secondary [&_svg]:text-current"
    >
      <span className="min-[360px]:hidden">{site.mark}</span>
      <span className="hidden min-[360px]:block">
        <Salam
          font={nameArefRuqaa}
          id="nav-name"
          design={salamNameDesign}
          play={play}
          label={site.name}
          sparks
          className="h-5.5 sm:h-8"
        />
      </span>
    </Link>
  );
}
