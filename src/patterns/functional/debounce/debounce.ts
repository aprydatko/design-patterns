export type DebouncedFunction<Arguments extends readonly unknown[]> = (
  ...arguments_: Arguments
) => void;

export type DebounceController<Arguments extends readonly unknown[]> =
  DebouncedFunction<Arguments> & {
    cancel: () => void;
    isPending: () => boolean;
  };

/**
 * Debouncing delays an operation until calls stop for the configured interval.
 * If called again, the previous scheduled execution is replaced.
 */
export const debounce = <Arguments extends readonly unknown[]>(
  operation: (...arguments_: Arguments) => void,
  delayMs: number,
): DebounceController<Arguments> => {
  if (!Number.isFinite(delayMs) || delayMs < 0) {
    throw new RangeError('Delay must be a non-negative finite number');
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
      cancel();
      timeout = setTimeout(() => {
        timeout = undefined;
        operation(...arguments_);
      }, delayMs);
    },
    {
      cancel,
      isPending: (): boolean => timeout !== undefined,
    },
  );
};
