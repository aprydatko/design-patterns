import { describe, expect, it } from 'vitest';

import { Directory, File } from '@patterns/structural/composite/composite-pattern.js';

describe('Composite Pattern', () => {
  it('treats leaves and composites through the same component contract', () => {
    const readme = new File('README.md', 120);
    const source = new Directory('src').add(new File('app.ts', 300));
    const project = new Directory('project').add(readme).add(source);

    expect(readme.getSize()).toBe(120);
    expect(source.getSize()).toBe(300);
    expect(project.getSize()).toBe(420);
  });

  it('supports empty composites', () => {
    const emptyDirectory = new Directory('empty');

    expect(emptyDirectory.getName()).toBe('empty');
    expect(emptyDirectory.getSize()).toBe(0);
  });
});
