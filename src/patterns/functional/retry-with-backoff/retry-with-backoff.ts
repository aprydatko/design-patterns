export type RetryOptions = Readonly<{
  maxAttempts: number;
  initialDelayMs: number;
  backoffFactor?: number;
  shouldRetry?: (error: unknown, failedAttempt: number) => boolean;
}>;

const wait = (delayMs: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, delayMs);
  });

const validateOptions = ({ maxAttempts, initialDelayMs, backoffFactor }: RetryOptions): void => {
  if (!Number.isInteger(maxAttempts) || maxAttempts < 1) {
    throw new RangeError('maxAttempts must be a positive integer');
  }

  if (!Number.isFinite(initialDelayMs) || initialDelayMs < 0) {
    throw new RangeError('initialDelayMs must be a non-negative finite number');
  }

  if (backoffFactor !== undefined && (!Number.isFinite(backoffFactor) || backoffFactor < 1)) {
    throw new RangeError('backoffFactor must be at least 1');
  }
};

/**
 * Retry with Backoff repeats a failed asynchronous operation after increasing
 * delays, giving transient dependencies time to recover.
 */
export const retryWithBackoff = async <Result>(
  operation: () => Promise<Result>,
  options: RetryOptions,
): Promise<Result> => {
  validateOptions(options);

  const {
    maxAttempts,
    initialDelayMs,
    backoffFactor = 2,
    shouldRetry = (): boolean => true,
  } = options;
  let failedAttempts = 0;

  while (failedAttempts < maxAttempts) {
    try {
      return await operation();
    } catch (error: unknown) {
      failedAttempts += 1;

      if (failedAttempts >= maxAttempts || !shouldRetry(error, failedAttempts)) {
        throw error;
      }

      const delayMs = initialDelayMs * backoffFactor ** (failedAttempts - 1);
      await wait(delayMs);
    }
  }

  throw new Error('Retry attempts were exhausted');
};
