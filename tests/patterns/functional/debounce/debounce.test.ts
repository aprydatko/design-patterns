import { afterEach, describe, expect, it, vi } from 'vitest';

import { debounce } from '@patterns/functional/debounce/debounce.js';

describe('Debounce Pattern', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('runs only the latest call after the quiet period', () => {
    vi.useFakeTimers();
    const operation = vi.fn();
    const debounced = debounce(operation, 100);

    debounced('first');
    vi.advanceTimersByTime(50);
    debounced('latest');

    expect(operation).not.toHaveBeenCalled();
    expect(debounced.isPending()).toBe(true);

    vi.advanceTimersByTime(99);
    expect(operation).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(operation).toHaveBeenCalledOnce();
    expect(operation).toHaveBeenCalledWith('latest');
    expect(debounced.isPending()).toBe(false);
  });

  it('cancels pending work and validates the delay', () => {
    vi.useFakeTimers();
    const operation = vi.fn();
    const debounced = debounce(operation, 100);

    debounced();
    debounced.cancel();
    vi.advanceTimersByTime(100);

    expect(operation).not.toHaveBeenCalled();
    expect(debounced.isPending()).toBe(false);
    expect(() => debounce(operation, -1)).toThrow(RangeError);
  });
});
