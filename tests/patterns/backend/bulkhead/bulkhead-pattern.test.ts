import { describe, expect, it } from 'vitest';

import { createBulkhead } from '@patterns/backend/bulkhead/bulkhead-pattern.js';

const createDeferred = <Result>() => {
  let resolve: (value: Result) => void = () => undefined;
  const promise = new Promise<Result>((promiseResolve) => {
    resolve = promiseResolve;
  });

  return { promise, resolve };
};

describe('Bulkhead Pattern', () => {
  it('limits concurrent operations and exposes active capacity', async () => {
    const bulkhead = createBulkhead<string>({ maxConcurrent: 2 });
    const first = createDeferred<string>();
    const second = createDeferred<string>();

    const firstResult = bulkhead.execute(() => first.promise);
    const secondResult = bulkhead.execute(() => second.promise);

    expect(bulkhead.getActiveCount()).toBe(2);
    await expect(bulkhead.execute(() => Promise.resolve('rejected'))).rejects.toThrow(
      'Bulkhead capacity exceeded',
    );

    first.resolve('first');
    second.resolve('second');
    await expect(firstResult).resolves.toBe('first');
    await expect(secondResult).resolves.toBe('second');
    expect(bulkhead.getActiveCount()).toBe(0);
  });

  it('releases capacity when an operation fails', async () => {
    const bulkhead = createBulkhead<string>({ maxConcurrent: 1 });

    await expect(bulkhead.execute(() => Promise.reject(new Error('failed')))).rejects.toThrow(
      'failed',
    );
    expect(bulkhead.getActiveCount()).toBe(0);
    await expect(bulkhead.execute(() => Promise.resolve('recovered'))).resolves.toBe('recovered');
  });

  it('requires a positive integer capacity', () => {
    expect(() => createBulkhead({ maxConcurrent: 0 })).toThrow(
      'Bulkhead capacity must be a positive integer',
    );
  });
});
