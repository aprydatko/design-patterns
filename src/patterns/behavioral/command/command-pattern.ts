export type Command = Readonly<{
  execute: () => void;
  undo: () => void;
}>;

export class TextDocument {
  private content = '';

  getContent = (): string => this.content;

  insert = (text: string): void => {
    this.content += text;
  };

  removeLast = (length: number): void => {
    this.content = this.content.slice(0, -length);
  };
}

export class InsertTextCommand implements Command {
  public constructor(
    private readonly document: TextDocument,
    private readonly text: string,
  ) {}

  execute = (): void => {
    this.document.insert(this.text);
  };

  undo = (): void => {
    this.document.removeLast(this.text.length);
  };
}

/**
 * Command Pattern turns an action into an object that can be queued, tracked, and undone.
 */
export class CommandHistory {
  private readonly history: Command[] = [];

  execute = (command: Command): void => {
    command.execute();
    this.history.push(command);
  };

  undo = (): void => {
    const command = this.history.pop();

    if (command === undefined) {
      return;
    }

    command.undo();
  };
}
