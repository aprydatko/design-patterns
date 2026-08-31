import { describe, expect, it } from 'vitest';

import {
  createIdempotentOperation,
  type IdempotencyStore,
} from '@patterns/backend/idempotency/idempotency-pattern.js';

const createMemoryStore = <Result>(): IdempotencyStore<string, Result> => {
  const results = new Map<string, Result>();

  return {
    get: (key) => Promise.resolve(results.get(key)),
    set: (key, result) => {
      results.set(key, result);
      return Promise.resolve();
    },
  };
};

describe('Idempotency Pattern', () => {
  it('executes once and reuses the stored result for retries', async () => {
    const operation = createIdempotentOperation(createMemoryStore<string>());
    let executions = 0;
    const createOrder = (): Promise<string> => {
      executions += 1;
      return Promise.resolve('order-1');
    };

    await expect(operation.execute('request-1', createOrder)).resolves.toBe('order-1');
    await expect(operation.execute('request-1', createOrder)).resolves.toBe('order-1');
    expect(executions).toBe(1);
  });

  it('shares one in-flight operation between concurrent retries', async () => {
    const operation = createIdempotentOperation(createMemoryStore<string>());
    let executions = 0;
    let resolveOrder: (value: string) => void = () => undefined;
    const pendingOrder = new Promise<string>((resolve) => {
      resolveOrder = resolve;
    });
    const createOrder = (): Promise<string> => {
      executions += 1;
      return pendingOrder;
    };
    const first = operation.execute('request-1', createOrder);
    const second = operation.execute('request-1', createOrder);

    resolveOrder('order-1');
    await expect(Promise.all([first, second])).resolves.toEqual(['order-1', 'order-1']);
    expect(executions).toBe(1);
  });

  it('does not cache failed operations, allowing a later retry', async () => {
    const operation = createIdempotentOperation(createMemoryStore<string>());
    let executions = 0;
    const createOrder = (): Promise<string> => {
      executions += 1;
      return executions === 1
        ? Promise.reject(new Error('temporary failure'))
        : Promise.resolve('order-1');
    };

    await expect(operation.execute('request-1', createOrder)).rejects.toThrow('temporary failure');
    await expect(operation.execute('request-1', createOrder)).resolves.toBe('order-1');
    expect(executions).toBe(2);
  });
});
