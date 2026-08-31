import { describe, expect, it } from 'vitest';

import { createSaga, type SagaStep } from '@patterns/backend/saga/saga-pattern.js';

type OrderContext = { events: string[] };

const createStep = (
  name: string,
  execute: (context: OrderContext) => void,
): SagaStep<OrderContext> => ({
  execute: (context) => {
    execute(context);
    return Promise.resolve();
  },
  compensate: (context) => {
    context.events.push(`compensate:${name}`);
    return Promise.resolve();
  },
});

describe('Saga Pattern', () => {
  it('executes every step and returns the shared context on success', async () => {
    const saga = createSaga([
      createStep('inventory', (context) => context.events.push('inventory')),
      createStep('payment', (context) => context.events.push('payment')),
    ]);
    const context: OrderContext = { events: [] };

    await expect(saga.execute(context)).resolves.toBe(context);
    expect(context.events).toEqual(['inventory', 'payment']);
  });

  it('compensates completed steps in reverse order after a failure', async () => {
    const saga = createSaga([
      createStep('inventory', (context) => context.events.push('execute:inventory')),
      createStep('payment', (context) => context.events.push('execute:payment')),
      {
        execute: () => Promise.reject(new Error('shipping unavailable')),
        compensate: (context) => {
          context.events.push('compensate:shipping');
          return Promise.resolve();
        },
      },
    ]);
    const context: OrderContext = { events: [] };

    await expect(saga.execute(context)).rejects.toThrow('shipping unavailable');
    expect(context.events).toEqual([
      'execute:inventory',
      'execute:payment',
      'compensate:payment',
      'compensate:inventory',
    ]);
  });

  it('does not compensate the step that failed during execution', async () => {
    const context: OrderContext = { events: [] };
    const saga = createSaga<OrderContext>([
      {
        execute: () => Promise.reject(new Error('failed')),
        compensate: (currentContext) => {
          currentContext.events.push('unexpected-compensation');
          return Promise.resolve();
        },
      },
    ]);

    await expect(saga.execute(context)).rejects.toThrow('failed');
    expect(context.events).toEqual([]);
  });
});
