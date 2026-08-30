import { describe, expect, it } from 'vitest';

import { createOptimisticController } from '@patterns/architectural/optimistic-ui/optimistic-ui-pattern.js';

describe('Optimistic UI Pattern', () => {
  it('shows the expected value before the remote mutation resolves', async () => {
    let resolveMutation: ((value: number) => void) | undefined;
    const controller = createOptimisticController(
      0,
      () =>
        new Promise<number>((resolve) => {
          resolveMutation = resolve;
        }),
    );

    const pendingMutation = controller.mutate('increment', 1);
    expect(controller.getState()).toEqual({ value: 1, isPending: true, error: undefined });

    resolveMutation?.(1);
    await pendingMutation;
    expect(controller.getState()).toEqual({ value: 1, isPending: false, error: undefined });
  });

  it('rolls back and exposes an error when the mutation fails', async () => {
    const controller = createOptimisticController<number, string>(10, () =>
      Promise.reject(new Error('Network unavailable')),
    );

    await controller.mutate('save', 11);

    expect(controller.getState()).toEqual({
      value: 10,
      isPending: false,
      error: 'Network unavailable',
    });
  });
});
