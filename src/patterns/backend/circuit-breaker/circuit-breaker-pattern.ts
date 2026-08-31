export type CircuitState = 'closed' | 'open' | 'half-open';

export type CircuitBreakerOptions = Readonly<{
  failureThreshold: number;
  resetTimeoutMs: number;
  now?: () => number;
}>;

export type CircuitBreaker<Result> = Readonly<{
  execute: (operation: () => Promise<Result>) => Promise<Result>;
  getState: () => CircuitState;
}>;

/**
 * Circuit Breaker stops calling an unhealthy dependency and periodically allows
 * one probe request to check whether the dependency has recovered.
 */
export const createCircuitBreaker = <Result>(
  options: CircuitBreakerOptions,
): CircuitBreaker<Result> => {
  const now = options.now ?? Date.now;
  let state: CircuitState = 'closed';
  let failures = 0;
  let openedAt = 0;
  let probeInProgress = false;

  if (options.failureThreshold < 1 || options.resetTimeoutMs < 0) {
    throw new Error('Circuit breaker thresholds must be valid positive values');
  }

  const execute = async (operation: () => Promise<Result>): Promise<Result> => {
    if (state === 'open') {
      if (now() - openedAt < options.resetTimeoutMs) {
        throw new Error('Circuit is open');
      }

      state = 'half-open';
    }

    if (state === 'half-open' && probeInProgress) {
      throw new Error('Circuit is half-open');
    }

    probeInProgress = state === 'half-open';

    try {
      const result = await operation();
      failures = 0;
      state = 'closed';
      return result;
    } catch (error: unknown) {
      failures += 1;

      if (state === 'half-open' || failures >= options.failureThreshold) {
        state = 'open';
        openedAt = now();
      }

      throw error;
    } finally {
      probeInProgress = false;
    }
  };

  return { execute, getState: () => state };
};
