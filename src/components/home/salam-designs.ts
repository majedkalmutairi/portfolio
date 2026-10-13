export type SalamDesign = {
  drawMs: number;
  liftMs: number;
  wordMs: number;
  dabMs: number;
  settleMs: number;
  easing: "linear" | "ease-in-out" | "ease-out";
  wet: number;
  nib: boolean;
};

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

export const salamIntroDesign: SalamDesign = {
  ...salamDefaultDesign,
  drawMs: 1500,
  liftMs: 60,
  wordMs: 160,
  dabMs: 45,
  settleMs: 100,
};
