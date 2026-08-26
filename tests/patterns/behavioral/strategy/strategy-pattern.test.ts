import { describe, expect, it } from 'vitest';

import {
  createCheckout,
  createFixedDiscount,
  createPercentageDiscount,
  noDiscount,
} from '@patterns/behavioral/strategy/strategy-pattern.js';

describe('Strategy Pattern', () => {
  it('allows the checkout to use interchangeable discount strategies', () => {
    const percentageCheckout = createCheckout(createPercentageDiscount(20));
    const fixedCheckout = createCheckout(createFixedDiscount(15));

    expect(percentageCheckout.total(100)).toBe(80);
    expect(fixedCheckout.total(100)).toBe(85);
  });

  it('supports a default strategy and protects discount inputs', () => {
    const checkout = createCheckout();

    expect(checkout.total(100)).toBe(100);
    expect(noDiscount(42)).toBe(42);
    expect(() => createPercentageDiscount(101)).toThrow(RangeError);
    expect(() => createFixedDiscount(-1)).toThrow(RangeError);
  });
});
