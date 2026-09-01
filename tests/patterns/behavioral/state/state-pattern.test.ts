import { describe, expect, it } from 'vitest';

import { Order } from '@patterns/behavioral/state/state-pattern.js';

describe('State Pattern', () => {
  it('changes behavior as an order moves through its lifecycle', () => {
    const order = new Order();

    expect(order.getStatus()).toBe('pending');
    order.pay();
    expect(order.getStatus()).toBe('paid');
    order.ship();
    expect(order.getStatus()).toBe('shipped');
  });

  it('rejects operations that are invalid for the current state', () => {
    const order = new Order();

    expect(() => order.ship()).toThrow('An order must be paid before it can be shipped');
    order.cancel();
    expect(order.getStatus()).toBe('cancelled');
    expect(() => order.pay()).toThrow('A cancelled order cannot be paid');
  });
});
