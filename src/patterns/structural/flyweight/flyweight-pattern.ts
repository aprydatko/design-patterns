export type TextStyle = Readonly<{
  fontFamily: string;
  fontSize: number;
  color: string;
}>;

export type TextGlyph = Readonly<{
  character: string;
  x: number;
  y: number;
  style: TextStyle;
}>;

/** Flyweight factory reuses immutable intrinsic text styles across glyphs. */
export class TextStyleFactory {
  private readonly styles = new Map<string, TextStyle>();

  getStyle = (fontFamily: string, fontSize: number, color: string): TextStyle => {
    const key = JSON.stringify([fontFamily, fontSize, color]);
    const existingStyle = this.styles.get(key);

    if (existingStyle !== undefined) {
      return existingStyle;
    }

    const style = Object.freeze({ fontFamily, fontSize, color });
    this.styles.set(key, style);
    return style;
  };

  getStyleCount = (): number => this.styles.size;
}

export const createGlyph = (
  character: string,
  x: number,
  y: number,
  style: TextStyle,
): TextGlyph => ({ character, x, y, style });
