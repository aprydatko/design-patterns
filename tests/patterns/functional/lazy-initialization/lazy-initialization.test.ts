import { describe, expect, it } from 'vitest';

import { createLazy } from '@patterns/functional/lazy-initialization/lazy-initialization.js';

describe('Lazy Initialization Pattern', () => {
  it('defers creation until the value is first requested', () => {
    let creations = 0;
    const configuration = createLazy(() => {
      creations += 1;
      return { endpoint: '/api' };
    });

    expect(configuration.isInitialized()).toBe(false);
    expect(creations).toBe(0);

    const firstValue = configuration.get();
    const secondValue = configuration.get();

    expect(firstValue).toEqual({ endpoint: '/api' });
    expect(secondValue).toBe(firstValue);
    expect(configuration.isInitialized()).toBe(true);
    expect(creations).toBe(1);
  });

  it('allows explicit reinitialization', () => {
    let creations = 0;
    const resource = createLazy(() => {
      creations += 1;
      return creations;
    });

    expect(resource.get()).toBe(1);
    resource.reset();

    expect(resource.isInitialized()).toBe(false);
    expect(resource.get()).toBe(2);
    expect(creations).toBe(2);
  });
});
