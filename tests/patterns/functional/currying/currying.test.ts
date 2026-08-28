import { describe, expect, it } from 'vitest';

import { curryThree } from '@patterns/functional/currying/currying.js';

describe('Currying Pattern', () => {
  it('supplies arguments one at a time before producing a result', () => {
    const calculateTotal = curryThree(
      (taxRate: number, discount: number, subtotal: number) => subtotal * (1 + taxRate) - discount,
    );

    expect(calculateTotal(0.2)(10)(100)).toBe(110);
  });

  it('allows configured functions to be reused', () => {
    const withStandardTax = curryThree(
      (taxRate: number, discount: number, subtotal: number) => subtotal * (1 + taxRate) - discount,
    )(0.1);
    const withTenPercentTax = withStandardTax(10);

    expect(withTenPercentTax(100)).toBeCloseTo(100);
    expect(withTenPercentTax(200)).toBeCloseTo(210);
  });
});
