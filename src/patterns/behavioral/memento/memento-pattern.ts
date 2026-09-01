class EditorMemento {
  constructor(
    private readonly content: string,
    private readonly cursor: number,
  ) {}

  getContent = (): string => this.content;

  getCursor = (): number => this.cursor;
}

/** Originator creates and restores snapshots while keeping their state encapsulated. */
export class TextEditor {
  private content = '';
  private cursor = 0;

  type = (text: string): this => {
    this.content += text;
    this.cursor = this.content.length;
    return this;
  };

  moveCursor = (position: number): this => {
    this.cursor = Math.max(0, Math.min(position, this.content.length));
    return this;
  };

  save = (): EditorMemento => new EditorMemento(this.content, this.cursor);

  restore = (memento: EditorMemento): this => {
    this.content = memento.getContent();
    this.cursor = memento.getCursor();
    return this;
  };

  getState = (): Readonly<{ content: string; cursor: number }> => ({
    content: this.content,
    cursor: this.cursor,
  });
}

/** Caretaker stores snapshots without inspecting or modifying their contents. */
export class EditorHistory {
  private readonly snapshots: EditorMemento[] = [];

  save = (editor: TextEditor): void => {
    this.snapshots.push(editor.save());
  };

  undo = (editor: TextEditor): boolean => {
    const snapshot = this.snapshots.pop();

    if (snapshot === undefined) {
      return false;
    }

    editor.restore(snapshot);
    return true;
  };
}
