import { afterEach, describe, expect, it, vi } from 'vitest';

import { throttle } from '@patterns/functional/throttle/throttle.js';

describe('Throttle Pattern', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('runs immediately and ignores calls during the interval', () => {
    vi.useFakeTimers();
    const operation = vi.fn();
    const throttled = throttle(operation, 100);

    throttled('first');
    throttled('ignored');

    expect(operation).toHaveBeenCalledOnce();
    expect(operation).toHaveBeenCalledWith('first');
    expect(throttled.isThrottled()).toBe(true);

    vi.advanceTimersByTime(100);
    throttled('after-window');

    expect(operation).toHaveBeenCalledTimes(2);
    expect(operation).toHaveBeenLastCalledWith('after-window');
  });

  it('supports cancellation and validates the interval', () => {
    vi.useFakeTimers();
    const operation = vi.fn();
    const throttled = throttle(operation, 100);

    throttled();
    throttled.cancel();
    throttled();

    expect(operation).toHaveBeenCalledTimes(2);
    expect(throttled.isThrottled()).toBe(true);
    expect(() => throttle(operation, -1)).toThrow(RangeError);
  });
});
