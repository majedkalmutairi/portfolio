"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useIntroPhase } from "@/lib/intro-phase";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  hold?: boolean;
};

export function Reveal({ children, className, delay = 0, hold = true }: RevealProps) {
  const reduce = useReducedMotion();
  const phase = useIntroPhase();
  const [held] = useState(() => hold && phase === "play");
  const waiting = held && phase !== null;

  return (
    <motion.div
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={waiting ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.45, ease: [0.25, 1, 0.5, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
