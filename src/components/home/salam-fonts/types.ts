// One generated greeting (scripts/calligraphy.mjs): the phrase in one font, glyph by glyph.
export type SalamStroke = {
  /** The pen's route along the centre of the letter, as an SVG path. */
  d: string;
  /** Its length, in the SVG's units. */
  len: number;
  /** How wide the pen must be here to cover the letter. */
  w: number;
  /** The pen lifts before this stroke (it starts a separate piece, such as a dot). */
  lift?: boolean;
};

export type SalamGlyph = {
  /** The letter's filled shape. */
  fill: string;
  /** 0 = السلام, 1 = عليكم. The pen pauses a little between words. */
  word: number;
  /** In writing order: the letter's body first, then its dots. */
  strokes: SalamStroke[];
};

export type SalamFont = {
  id: string;
  label: string;
  viewBox: string;
  /** In writing order: right to left, letters before dots. */
  glyphs: SalamGlyph[];
};
