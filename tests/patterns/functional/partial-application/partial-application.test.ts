import { describe, expect, it } from 'vitest';

import { partialApplyFirst } from '@patterns/functional/partial-application/partial-application.js';

describe('Partial Application Pattern', () => {
  it('fixes one argument while keeping the remaining arguments together', () => {
    const calculateDeliveryCost = partialApplyFirst(
      (serviceFee: number, weight: number, insured: boolean) =>
        serviceFee + weight * 2 + (insured ? 5 : 0),
      10,
    );

    expect(calculateDeliveryCost(3, false)).toBe(16);
    expect(calculateDeliveryCost(3, true)).toBe(21);
  });

  it('creates independent specialized functions without changing the original operation', () => {
    const calculateTotal = (taxRate: number, subtotal: number): number => subtotal * (1 + taxRate);
    const withStandardTax = partialApplyFirst(calculateTotal, 0.2);
    const withReducedTax = partialApplyFirst(calculateTotal, 0.1);

    expect(withStandardTax(100)).toBeCloseTo(120);
    expect(withReducedTax(100)).toBeCloseTo(110);
    expect(calculateTotal(0.2, 100)).toBeCloseTo(120);
  });
});
