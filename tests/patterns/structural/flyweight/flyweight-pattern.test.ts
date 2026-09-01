import { describe, expect, it } from 'vitest';

import { createGlyph, TextStyleFactory } from '@patterns/structural/flyweight/flyweight-pattern.js';

describe('Flyweight Pattern', () => {
  it('reuses the same style for multiple glyphs', () => {
    const factory = new TextStyleFactory();
    const firstStyle = factory.getStyle('Inter', 16, '#111111');
    const secondStyle = factory.getStyle('Inter', 16, '#111111');
    const firstGlyph = createGlyph('H', 0, 0, firstStyle);
    const secondGlyph = createGlyph('i', 8, 0, secondStyle);

    expect(firstGlyph.style).toBe(secondGlyph.style);
    expect(factory.getStyleCount()).toBe(1);
  });

  it('keeps extrinsic glyph state independent from shared style state', () => {
    const factory = new TextStyleFactory();
    const style = factory.getStyle('Inter', 16, '#111111');
    const glyph = createGlyph('A', 24, 12, style);

    expect(glyph).toEqual({ character: 'A', x: 24, y: 12, style });
    expect(Object.isFrozen(style)).toBe(true);
  });
});
