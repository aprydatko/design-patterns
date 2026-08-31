import { describe, expect, it } from 'vitest';

import { createCircuitBreaker } from '@patterns/backend/circuit-breaker/circuit-breaker-pattern.js';

describe('Circuit Breaker Pattern', () => {
  it('opens after the failure threshold and fails fast', async () => {
    const breaker = createCircuitBreaker<string>({ failureThreshold: 2, resetTimeoutMs: 1_000 });
    const operation = (): Promise<string> => Promise.reject(new Error('dependency unavailable'));

    await expect(breaker.execute(operation)).rejects.toThrow('dependency unavailable');
    await expect(breaker.execute(operation)).rejects.toThrow('dependency unavailable');
    expect(breaker.getState()).toBe('open');
    await expect(breaker.execute(operation)).rejects.toThrow('Circuit is open');
  });

  it('moves to half-open and closes after a successful probe', async () => {
    let currentTime = 0;
    let available = false;
    const breaker = createCircuitBreaker<string>({
      failureThreshold: 1,
      resetTimeoutMs: 100,
      now: () => currentTime,
    });
    const operation = (): Promise<string> =>
      available ? Promise.resolve('ok') : Promise.reject(new Error('unavailable'));

    await expect(breaker.execute(operation)).rejects.toThrow('unavailable');
    currentTime = 100;
    available = true;

    await expect(breaker.execute(operation)).resolves.toBe('ok');
    expect(breaker.getState()).toBe('closed');
  });

  it('reopens when the half-open probe fails', async () => {
    let currentTime = 0;
    const breaker = createCircuitBreaker<undefined>({
      failureThreshold: 1,
      resetTimeoutMs: 50,
      now: () => currentTime,
    });
    const operation = (): Promise<undefined> => Promise.reject(new Error('still unavailable'));

    await expect(breaker.execute(operation)).rejects.toThrow('still unavailable');
    currentTime = 50;
    await expect(breaker.execute(operation)).rejects.toThrow('still unavailable');
    expect(breaker.getState()).toBe('open');
  });
});
