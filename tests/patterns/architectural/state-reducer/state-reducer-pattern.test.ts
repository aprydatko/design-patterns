import { describe, expect, it } from 'vitest';

import {
  counterReducer,
  createStateReducerController,
} from '@patterns/architectural/state-reducer/state-reducer-pattern.js';

describe('State Reducer Pattern', () => {
  it('uses the default reducer for standard transitions', () => {
    const counter = createStateReducerController();

    counter.dispatch({ type: 'increment' });
    counter.dispatch({ type: 'increment' });
    counter.dispatch({ type: 'decrement' });

    expect(counter.getState()).toEqual({ count: 1 });
  });

  it('allows a consumer to customize transitions', () => {
    const cappedReducer = (
      state: Parameters<typeof counterReducer>[0],
      action: Parameters<typeof counterReducer>[1],
    ) => {
      const nextState = counterReducer(state, action);
      return { count: Math.min(nextState.count, 2) };
    };
    const counter = createStateReducerController(cappedReducer);

    counter.dispatch({ type: 'increment' });
    counter.dispatch({ type: 'increment' });
    counter.dispatch({ type: 'increment' });

    expect(counter.getState()).toEqual({ count: 2 });
  });
});
