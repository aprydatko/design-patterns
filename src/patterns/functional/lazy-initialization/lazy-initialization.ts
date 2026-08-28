export type Lazy<Value> = Readonly<{
  get: () => Value;
  isInitialized: () => boolean;
  reset: () => void;
}>;

/**
 * Lazy Initialization defers creating a value until it is first requested,
 * then reuses that value for later requests.
 */
export const createLazy = <Value>(factory: () => Value): Lazy<Value> => {
  let value!: Value;
  let initialized = false;

  return {
    get: (): Value => {
      if (initialized) {
        return value;
      }

      value = factory();
      initialized = true;
      return value;
    },
    isInitialized: (): boolean => initialized,
    reset: (): void => {
      initialized = false;
    },
  };
};
