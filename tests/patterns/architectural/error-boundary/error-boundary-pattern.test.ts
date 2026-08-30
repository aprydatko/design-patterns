import { describe, expect, it } from 'vitest';

import { createErrorBoundary } from '@patterns/architectural/error-boundary/error-boundary-pattern.js';

describe('Error Boundary Pattern', () => {
  it('renders the child when no error occurs', () => {
    const boundary = createErrorBoundary(
      () => 'content',
      () => 'fallback',
    );

    expect(boundary.render()).toBe('content');
    expect(boundary.getState()).toEqual({ hasError: false, error: undefined });
  });

  it('isolates child failures and supports recovery through reset', () => {
    let shouldFail = true;
    const boundary = createErrorBoundary(
      () => {
        if (shouldFail) {
          throw new Error('Child failed');
        }

        return 'recovered';
      },
      (error, reset) => `${error.message}; retry available: ${String(typeof reset === 'function')}`,
    );

    expect(boundary.render()).toBe('Child failed; retry available: true');
    expect(boundary.getState().hasError).toBe(true);

    shouldFail = false;
    boundary.reset();
    expect(boundary.render()).toBe('recovered');
    expect(boundary.getState().hasError).toBe(false);
  });
});
