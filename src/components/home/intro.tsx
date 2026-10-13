"use client";

import { useEffect, useRef, useState } from "react";
import { Salam } from "@/components/home/salam";
import { salamIntroDesign } from "@/components/home/salam-designs";
import { amiri } from "@/components/home/salam-fonts/amiri";
import { announceIntroPhase } from "@/lib/intro-phase";

const HOLD_MS = 400;
const REVEAL_MS = 1400;
const FALLBACK_MS = 4000;

export function Intro() {
  const [playing, setPlaying] = useState(false);
  const revealRef = useRef<() => void>(() => {});

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== "play") return;

    window.scrollTo(0, 0);
    root.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => setPlaying(true));

    let revealed = false;
    let finishTimer = 0;

    const finish = () => {
      delete root.dataset.intro;
      root.style.overflow = "";
      setPlaying(false);
      announceIntroPhase();
    };

    const remember = () => {
      try {
        sessionStorage.setItem("intro", "1");
        return true;
      } catch {
        return false;
      }
    };

    const reveal = () => {
      if (revealed) return;
      revealed = true;
      root.dataset.intro = "reveal";
      announceIntroPhase();
      remember();
      finishTimer = window.setTimeout(finish, REVEAL_MS);
    };

    revealRef.current = reveal;

    const passive = { passive: true } as const;
    window.addEventListener("pointerdown", reveal, passive);
    window.addEventListener("keydown", reveal);
    window.addEventListener("wheel", reveal, passive);
    window.addEventListener("touchstart", reveal, passive);
    const fallback = window.setTimeout(reveal, FALLBACK_MS);

    return () => {
      window.removeEventListener("pointerdown", reveal);
      window.removeEventListener("keydown", reveal);
      window.removeEventListener("wheel", reveal);
      window.removeEventListener("touchstart", reveal);
      window.cancelAnimationFrame(frame);
      window.clearTimeout(fallback);
      window.clearTimeout(finishTimer);
    };
  }, []);

  return (
    <div id="intro" aria-hidden="true" className="fixed inset-0 z-50 bg-bg">
      {playing ? (
        <Salam
          font={amiri}
          id="intro-salam"
          design={salamIntroDesign}
          play="now"
          onDone={() => {
            window.setTimeout(() => revealRef.current(), HOLD_MS);
          }}
          className="h-24 max-w-full sm:h-36"
        />
      ) : null}
    </div>
  );
}
