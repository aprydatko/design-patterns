import { describe, expect, it } from 'vitest';

import {
  addMilk,
  addSugar,
  createCoffee,
} from '@patterns/structural/decorator/decorator-pattern.js';

describe('Decorator Pattern', () => {
  it('adds behavior while preserving the beverage contract', () => {
    const coffee = addMilk(addSugar(createCoffee()));

    expect(coffee.getDescription()).toBe('Coffee, sugar, milk');
    expect(coffee.getCost()).toBe(2.75);
  });

  it('allows decorators to be composed in a different order', () => {
    const coffee = addSugar(addMilk(createCoffee()));

    expect(coffee.getDescription()).toBe('Coffee, milk, sugar');
    expect(coffee.getCost()).toBe(2.75);
  });
});
