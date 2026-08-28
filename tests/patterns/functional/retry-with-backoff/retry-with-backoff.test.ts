import { describe, expect, it, vi } from 'vitest';

import { retryWithBackoff } from '@patterns/functional/retry-with-backoff/retry-with-backoff.js';

describe('Retry with Backoff Pattern', () => {
  it('retries transient failures with increasing delays', async () => {
    vi.useFakeTimers();
    const operation = vi
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(new Error('temporary failure'))
      .mockRejectedValueOnce(new Error('still unavailable'))
      .mockResolvedValue('success');

    const resultPromise = retryWithBackoff(operation, {
      maxAttempts: 3,
      initialDelayMs: 100,
      backoffFactor: 2,
    });

    await vi.advanceTimersByTimeAsync(100);
    expect(operation).toHaveBeenCalledTimes(2);
    await vi.advanceTimersByTimeAsync(200);

    await expect(resultPromise).resolves.toBe('success');
    expect(operation).toHaveBeenCalledTimes(3);
    vi.useRealTimers();
  });

  it('stops at the attempt limit or when an error is not retryable', async () => {
    const error = new Error('invalid request');
    const operation = vi.fn<() => Promise<never>>().mockRejectedValue(error);
    const shouldRetry = vi.fn(() => false);

    await expect(
      retryWithBackoff(operation, {
        maxAttempts: 3,
        initialDelayMs: 1,
        shouldRetry,
      }),
    ).rejects.toBe(error);

    expect(operation).toHaveBeenCalledOnce();
    expect(shouldRetry).toHaveBeenCalledWith(error, 1);
    await expect(
      retryWithBackoff(operation, { maxAttempts: 0, initialDelayMs: 1 }),
    ).rejects.toThrow(RangeError);
  });
});
