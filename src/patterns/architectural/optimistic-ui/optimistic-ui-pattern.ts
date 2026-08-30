export type OptimisticState<Value> = Readonly<{
  value: Value;
  isPending: boolean;
  error: string | undefined;
}>;

export type OptimisticMutation<Value, Input> = (input: Input) => Promise<Value>;

export type OptimisticController<Value, Input> = Readonly<{
  getState: () => OptimisticState<Value>;
  mutate: (input: Input, optimisticValue: Value) => Promise<void>;
}>;

/**
 * Optimistic UI applies the expected result before the server responds. A
 * successful mutation confirms it; a failed mutation restores the snapshot.
 */
export const createOptimisticController = <Value, Input>(
  initialValue: Value,
  mutation: OptimisticMutation<Value, Input>,
): OptimisticController<Value, Input> => {
  let state: OptimisticState<Value> = {
    value: initialValue,
    isPending: false,
    error: undefined,
  };

  return {
    getState: (): OptimisticState<Value> => state,
    mutate: async (input: Input, optimisticValue: Value): Promise<void> => {
      const previousValue = state.value;
      state = { value: optimisticValue, isPending: true, error: undefined };

      try {
        const confirmedValue = await mutation(input);
        state = { value: confirmedValue, isPending: false, error: undefined };
      } catch (cause: unknown) {
        state = {
          value: previousValue,
          isPending: false,
          error: cause instanceof Error ? cause.message : 'Unable to save changes',
        };
      }
    },
  };
};
