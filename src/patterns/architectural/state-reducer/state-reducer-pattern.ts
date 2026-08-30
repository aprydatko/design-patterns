export type CounterState = Readonly<{
  count: number;
}>;

export type CounterAction =
  Readonly<{ type: 'increment' }> | Readonly<{ type: 'decrement' }> | Readonly<{ type: 'reset' }>;

export type CounterReducer = (state: CounterState, action: CounterAction) => CounterState;

export type StateReducerController = Readonly<{
  getState: () => CounterState;
  dispatch: (action: CounterAction) => void;
}>;

const defaultState: CounterState = { count: 0 };

/** The component's built-in transition rules. */
export const counterReducer: CounterReducer = (state, action) => {
  if (action.type === 'increment') {
    return { count: state.count + 1 };
  }

  if (action.type === 'decrement') {
    return { count: state.count - 1 };
  }

  return defaultState;
};

/**
 * A State Reducer lets consumers replace or extend a component's state
 * transitions while the component retains ownership of the dispatch flow.
 */
export const createStateReducerController = (
  reducer: CounterReducer = counterReducer,
  initialState: CounterState = defaultState,
): StateReducerController => {
  let state = initialState;

  return {
    getState: (): CounterState => state,
    dispatch: (action: CounterAction): void => {
      state = reducer(state, action);
    },
  };
};
