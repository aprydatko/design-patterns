export type Beverage = Readonly<{
  getDescription: () => string;
  getCost: () => number;
}>;

export const createCoffee = (): Beverage => ({
  getDescription: (): string => 'Coffee',
  getCost: (): number => 2,
});

/**
 * Decorator Pattern adds behavior to an object by wrapping it with the same contract.
 */
export const addMilk = (beverage: Beverage): Beverage => ({
  getDescription: (): string => `${beverage.getDescription()}, milk`,
  getCost: (): number => beverage.getCost() + 0.5,
});

export const addSugar = (beverage: Beverage): Beverage => ({
  getDescription: (): string => `${beverage.getDescription()}, sugar`,
  getCost: (): number => beverage.getCost() + 0.25,
});
