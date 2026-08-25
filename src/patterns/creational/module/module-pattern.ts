export type CounterModule = Readonly<{
  increment: () => number;
  decrement: () => number;
  getValue: () => number;
}>;

/**
 * Module Pattern keeps mutable state private and exposes only a deliberate API.
 */
export const createCounterModule = (initialValue = 0): CounterModule => {
  let value = initialValue;

  const increment = (): number => {
    value += 1;
    return value;
  };

  const decrement = (): number => {
    value -= 1;
    return value;
  };

  const getValue = (): number => value;

  return { increment, decrement, getValue };
};
