export type SagaStep<Context> = Readonly<{
  execute: (context: Context) => Promise<void>;
  compensate: (context: Context) => Promise<void>;
}>;

export type Saga<Context> = Readonly<{
  execute: (context: Context) => Promise<Context>;
}>;

/**
 * Saga coordinates a sequence of local transactions and compensates completed
 * steps in reverse order when a later step fails.
 */
export const createSaga = <Context>(steps: readonly SagaStep<Context>[]): Saga<Context> => ({
  execute: async (context: Context): Promise<Context> => {
    const completedSteps: SagaStep<Context>[] = [];

    try {
      for (const step of steps) {
        await step.execute(context);
        completedSteps.push(step);
      }
    } catch (error: unknown) {
      for (const step of completedSteps.reverse()) {
        await step.compensate(context);
      }

      throw error;
    }

    return context;
  },
});
