import { describe, expect, it } from 'vitest';

import {
  CommandHistory,
  InsertTextCommand,
  TextDocument,
} from '@patterns/behavioral/command/command-pattern.js';

describe('Command Pattern', () => {
  it('executes encapsulated commands through an invoker', () => {
    const document = new TextDocument();
    const history = new CommandHistory();

    history.execute(new InsertTextCommand(document, 'Hello'));
    history.execute(new InsertTextCommand(document, ' world'));

    expect(document.getContent()).toBe('Hello world');
  });

  it('undoes commands in reverse order', () => {
    const document = new TextDocument();
    const history = new CommandHistory();

    history.execute(new InsertTextCommand(document, 'Hello'));
    history.execute(new InsertTextCommand(document, ' world'));
    history.undo();
    expect(document.getContent()).toBe('Hello');

    history.undo();
    history.undo();
    expect(document.getContent()).toBe('');
  });
});
