export type Bulkhead<Result> = Readonly<{
  execute: (operation: () => Promise<Result>) => Promise<Result>;
  getActiveCount: () => number;
}>;

export type BulkheadOptions = Readonly<{
  maxConcurrent: number;
}>;

/**
 * Bulkhead isolates a limited pool of concurrent operations so one overloaded
 * dependency cannot consume all of an application's available capacity.
 */
export const createBulkhead = <Result>(options: BulkheadOptions): Bulkhead<Result> => {
  if (!Number.isInteger(options.maxConcurrent) || options.maxConcurrent < 1) {
    throw new Error('Bulkhead capacity must be a positive integer');
  }

  let activeCount = 0;

  const execute = (operation: () => Promise<Result>): Promise<Result> => {
    if (activeCount >= options.maxConcurrent) {
      return Promise.reject(new Error('Bulkhead capacity exceeded'));
    }

    activeCount += 1;

    return Promise.resolve()
      .then(operation)
      .finally(() => {
        activeCount -= 1;
      });
  };

  return {
    execute,
    getActiveCount: () => activeCount,
  };
};
