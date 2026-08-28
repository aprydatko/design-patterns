export type ThrottledFunction<Arguments extends readonly unknown[]> = (
  ...arguments_: Arguments
) => void;

export type ThrottleController<Arguments extends readonly unknown[]> =
  ThrottledFunction<Arguments> & {
    cancel: () => void;
    isThrottled: () => boolean;
  };

/**
 * Throttling runs the first call immediately and ignores later calls until the
 * configured interval has elapsed.
 */
export const throttle = <Arguments extends readonly unknown[]>(
  operation: (...arguments_: Arguments) => void,
  intervalMs: number,
): ThrottleController<Arguments> => {
  if (!Number.isFinite(intervalMs) || intervalMs < 0) {
    throw new RangeError('Interval must be a non-negative finite number');
  }

  let timeout: ReturnType<typeof setTimeout> | undefined;

  const cancel = (): void => {
    if (timeout === undefined) {
      return;
    }

    clearTimeout(timeout);
    timeout = undefined;
  };

  return Object.assign(
    (...arguments_: Arguments): void => {
      if (timeout !== undefined) {
        return;
      }

      operation(...arguments_);
      timeout = setTimeout(() => {
        timeout = undefined;
      }, intervalMs);
    },
    {
      cancel,
      isThrottled: (): boolean => timeout !== undefined,
    },
  );
};
