export type SalamStroke = {
  d: string;
  len: number;
  w: number;
  lift?: boolean;
};

export type SalamGlyph = {
  fill: string;
  word: number;
  strokes: SalamStroke[];
};

export type SalamFont = {
  id: string;
  label: string;
  viewBox: string;
  glyphs: SalamGlyph[];
};
