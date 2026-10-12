"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { cx } from "@/lib/cx";

export function BackToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const update = () => setShown(window.scrollY > window.innerHeight);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  function goTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={goTop}
      aria-label="Back to top"
      aria-hidden={!shown}
      tabIndex={shown ? 0 : -1}
      className={cx(
        "fixed right-5 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-30 flex size-10 items-center justify-center rounded-md border border-dashed border-line-strong bg-bg text-fg-secondary transition-opacity duration-150 hover:text-fg",
        shown ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <ChevronUp className="size-4.5" strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}
