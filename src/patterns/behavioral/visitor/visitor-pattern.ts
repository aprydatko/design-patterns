export interface DocumentVisitor {
  visitParagraph: (paragraph: Paragraph) => void;
  visitHeading: (heading: Heading) => void;
}

export interface DocumentElement {
  accept: (visitor: DocumentVisitor) => void;
}

export class Paragraph implements DocumentElement {
  constructor(readonly text: string) {}

  accept = (visitor: DocumentVisitor): void => {
    visitor.visitParagraph(this);
  };
}

export class Heading implements DocumentElement {
  constructor(
    readonly level: number,
    readonly text: string,
  ) {}

  accept = (visitor: DocumentVisitor): void => {
    visitor.visitHeading(this);
  };
}

/** Visitor adds operations to document elements without changing their classes. */
export class HtmlRenderVisitor implements DocumentVisitor {
  readonly output: string[] = [];

  visitParagraph = (paragraph: Paragraph): void => {
    this.output.push(`<p>${paragraph.text}</p>`);
  };

  visitHeading = (heading: Heading): void => {
    const level = String(heading.level);
    this.output.push(`<h${level}>${heading.text}</h${level}>`);
  };
}

export class WordCountVisitor implements DocumentVisitor {
  wordCount = 0;

  visitParagraph = (paragraph: Paragraph): void => {
    this.wordCount += this.countWords(paragraph.text);
  };

  visitHeading = (heading: Heading): void => {
    this.wordCount += this.countWords(heading.text);
  };

  private countWords = (text: string): number => {
    const words = text.trim().split(/\s+/);
    return text.trim() === '' ? 0 : words.length;
  };
}
