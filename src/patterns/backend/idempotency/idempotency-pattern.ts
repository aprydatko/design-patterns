export type IdempotencyStore<Key, Result> = Readonly<{
  get: (key: Key) => Promise<Result | undefined>;
  set: (key: Key, result: Result) => Promise<void>;
}>;

export type IdempotentOperation<Key, Result> = Readonly<{
  execute: (key: Key, operation: () => Promise<Result>) => Promise<Result>;
}>;

/**
 * Idempotency maps retries of the same operation to one stored result. Requests
 * arriving concurrently with the same key also share the in-flight operation.
 */
export const createIdempotentOperation = <Key, Result>(
  store: IdempotencyStore<Key, Result>,
): IdempotentOperation<Key, Result> => {
  const inFlight = new Map<Key, Promise<Result>>();

  const execute = async (key: Key, operation: () => Promise<Result>): Promise<Result> => {
    const storedResult = await store.get(key);

    if (storedResult !== undefined) {
      return storedResult;
    }

    const currentOperation = inFlight.get(key);

    if (currentOperation !== undefined) {
      return currentOperation;
    }

    const pendingResult = Promise.resolve()
      .then(operation)
      .then(async (result) => {
        await store.set(key, result);
        return result;
      });
    inFlight.set(key, pendingResult);

    try {
      return await pendingResult;
    } finally {
      inFlight.delete(key);
    }
  };

  return { execute };
};
