"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before starting — use sparingly, for one thing after another. */
  delay?: number;
};

// The site's only entrance animation: fade in while rising 16px, ~450ms, ease-out, once.
// Starts when the element is 10% into the viewport.
//
// Reduced motion is handled twice on purpose. The hook skips the animation; and a CSS rule in
// globals.css (`[data-reveal]` under prefers-reduced-motion, and inside <noscript>) forces the
// final state with !important, because the server always sends the hidden start state and a
// browser with motion off — or with no JavaScript — must still show the content.
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.45, ease: [0.25, 1, 0.5, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
