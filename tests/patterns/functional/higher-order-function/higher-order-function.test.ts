import { describe, expect, it } from 'vitest';

import { withCallCount } from '@patterns/functional/higher-order-function/higher-order-function.js';

describe('Higher-Order Function Pattern', () => {
  it('returns a function that adds behavior around the original function', () => {
    const add = withCallCount((left: number, right: number) => left + right);

    expect(add(2, 3)).toBe(5);
    expect(add(10, 5)).toBe(15);
    expect(add.getCallCount()).toBe(2);
  });

  it('preserves the original function result and starts each wrapper independently', () => {
    const uppercase = withCallCount((value: string) => value.toUpperCase());
    const original = (value: string): string => value.trim();

    expect(uppercase('hello')).toBe('HELLO');
    expect(uppercase.getCallCount()).toBe(1);
    expect(original(' hello ')).toBe('hello');
  });
});
