// How the greeting is drawn. The brush technique is fixed (salam.tsx); these knobs set the pen's
// rhythm, how the ink behaves, and whether the pen tip shows. The owner chose "Visible nib" from
// five candidates on 2026-10-05 (DECISIONS.md → "Phase 6 — homepage").
export type SalamDesign = {
  /** The pen's total moving time, ms. */
  drawMs: number;
  /** Pause when the pen lifts (to a dot, or the next letter), ms. */
  liftMs: number;
  /** Pause between the two words, ms. */
  wordMs: number;
  /** The least a dot takes — a dab, not a blink, ms. */
  dabMs: number;
  /** How long a finished letter's ink takes to settle over the pen's work, ms. */
  settleMs: number;
  /** Per-stroke easing. linear = a steady pen; ease-in-out = a hand that slows into each turn. */
  easing: "linear" | "ease-in-out" | "ease-out";
  /** Ink opacity under the pen, 0–1. Below 1 the letter looks wet and darkens as it dries. */
  wet: number;
  /** Show the pen tip (a drop of ink) leading each stroke. */
  nib: boolean;
};

/** "Visible nib": a drop of ink leads every stroke, so you can watch the hand move. */
export const salamDefaultDesign: SalamDesign = {
  drawMs: 3000,
  liftMs: 120,
  wordMs: 320,
  dabMs: 90,
  settleMs: 160,
  easing: "ease-in-out",
  wet: 1,
  nib: true,
};
