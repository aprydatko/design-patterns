import { describe, expect, it } from 'vitest';

import {
  Heading,
  HtmlRenderVisitor,
  Paragraph,
  WordCountVisitor,
} from '@patterns/behavioral/visitor/visitor-pattern.js';

describe('Visitor Pattern', () => {
  it('applies an HTML rendering operation to each element type', () => {
    const document = [new Heading(1, 'Welcome'), new Paragraph('Hello world')];
    const visitor = new HtmlRenderVisitor();

    document.forEach((element) => {
      element.accept(visitor);
    });

    expect(visitor.output).toEqual(['<h1>Welcome</h1>', '<p>Hello world</p>']);
  });

  it('adds a word-counting operation without changing document elements', () => {
    const document = [new Heading(2, 'About us'), new Paragraph('We build software')];
    const visitor = new WordCountVisitor();

    document.forEach((element) => {
      element.accept(visitor);
    });

    expect(visitor.wordCount).toBe(5);
  });
});
