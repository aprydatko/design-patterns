export type CounterModule = Readonly<{
  increment: () => number;
  decrement: () => number;
  getValue: () => number;
}>;

/**
 * Module Pattern keeps mutable state private and exposes only a deliberate API.
 */
export const createCounterModule = (initialValue = 0): CounterModule => {
  // private state
  let value: number = initialValue;

  // private function
  const log = (): void => {
    console.log('Value:', value);
  };

  // Public API
  return {
    increment: (): number => {
      value += 1;
      log();
      return value;
    },
    decrement: (): number => {
      value -= 1;
      log();
      return value;
    },
    getValue: (): number => value,
  };
};
