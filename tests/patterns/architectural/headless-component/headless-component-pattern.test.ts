import { describe, expect, it } from 'vitest';

import { createHeadlessCombobox } from '@patterns/architectural/headless-component/headless-component-pattern.js';

const options = [
  { id: 'typescript', label: 'TypeScript' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'rust', label: 'Rust' },
] as const;

describe('Headless Component Pattern', () => {
  it('provides filtering behavior without prescribing presentation', () => {
    const combobox = createHeadlessCombobox(options);

    combobox.setQuery('script');

    expect(combobox.getState()).toMatchObject({
      query: 'script',
      isOpen: true,
      options: [options[0], options[1]],
      highlightedId: 'typescript',
    });
  });

  it('provides highlight and selection behavior to any consumer UI', () => {
    const combobox = createHeadlessCombobox(options);

    combobox.moveHighlight('next');
    expect(combobox.getState().highlightedId).toBe('javascript');

    combobox.select('javascript');
    expect(combobox.getState()).toMatchObject({
      selectedId: 'javascript',
      highlightedId: 'javascript',
      isOpen: false,
    });
  });
});
