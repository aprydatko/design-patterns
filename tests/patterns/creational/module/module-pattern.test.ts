import { describe, expect, it } from 'vitest';

import { createCounterModule } from '@patterns/creational/module/module-pattern.js';

describe('Module Pattern', () => {
  it('exposes behavior while keeping state private', () => {
    const counter = createCounterModule(10);

    expect(counter.getValue()).toBe(10);
    expect(counter.increment()).toBe(11);
    expect(counter.decrement()).toBe(10);
  });

  it('creates isolated module instances', () => {
    const firstCounter = createCounterModule();
    const secondCounter = createCounterModule();

    firstCounter.increment();

    expect(firstCounter.getValue()).toBe(1);
    expect(secondCounter.getValue()).toBe(0);
  });
});
