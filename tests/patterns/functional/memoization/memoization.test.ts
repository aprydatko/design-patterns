import { describe, expect, it } from 'vitest';

import { memoize } from '@patterns/functional/memoization/memoization.js';

describe('Memoization Pattern', () => {
  it('reuses a cached result for repeated inputs', () => {
    let executions = 0;
    const calculateSquare = memoize((value: number) => {
      executions += 1;
      return value * value;
    });

    expect(calculateSquare(5)).toBe(25);
    expect(calculateSquare(5)).toBe(25);
    expect(calculateSquare(6)).toBe(36);
    expect(executions).toBe(2);
    expect(calculateSquare.getCacheSize()).toBe(2);
  });

  it('supports clearing cached results and preserves undefined values', () => {
    let executions = 0;
    const findLabel = memoize((value: string): string | undefined => {
      executions += 1;
      return value === 'known' ? 'Found' : undefined;
    });

    expect(findLabel('missing')).toBeUndefined();
    expect(findLabel('missing')).toBeUndefined();
    expect(executions).toBe(1);

    findLabel.clearCache();

    expect(findLabel.getCacheSize()).toBe(0);
    expect(findLabel('missing')).toBeUndefined();
    expect(executions).toBe(2);
  });
});
