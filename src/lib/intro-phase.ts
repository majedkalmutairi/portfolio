import { useEffect, useState } from "react";

export type IntroPhase = "play" | "reveal" | null;

const EVENT = "introphase";

export function readIntroPhase(): IntroPhase {
  if (typeof document === "undefined") return null;
  const value = document.documentElement.dataset.intro;
  return value === "play" || value === "reveal" ? value : null;
}

export function announceIntroPhase() {
  window.dispatchEvent(new Event(EVENT));
}

export function useIntroPhase(): IntroPhase {
  const [phase, setPhase] = useState<IntroPhase>(readIntroPhase);
  useEffect(() => {
    const update = () => setPhase(readIntroPhase());
    window.addEventListener(EVENT, update);
    return () => window.removeEventListener(EVENT, update);
  }, []);
  return phase;
}
