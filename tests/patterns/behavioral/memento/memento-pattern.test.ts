import { describe, expect, it } from 'vitest';

import { EditorHistory, TextEditor } from '@patterns/behavioral/memento/memento-pattern.js';

describe('Memento Pattern', () => {
  it('restores an earlier editor state through history', () => {
    const editor = new TextEditor();
    const history = new EditorHistory();

    editor.type('Hello');
    history.save(editor);
    editor.type(' world');

    expect(history.undo(editor)).toBe(true);
    expect(editor.getState()).toEqual({ content: 'Hello', cursor: 5 });
  });

  it('reports when there are no snapshots to restore', () => {
    const editor = new TextEditor();
    const history = new EditorHistory();

    expect(history.undo(editor)).toBe(false);
    expect(editor.getState()).toEqual({ content: '', cursor: 0 });
  });
});
