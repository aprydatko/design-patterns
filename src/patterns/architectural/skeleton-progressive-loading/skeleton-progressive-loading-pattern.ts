export type ProgressiveListState<Item> = Readonly<{
  items: readonly Item[];
  skeletonCount: number;
  isLoading: boolean;
  error: string | undefined;
}>;

export type ProgressiveLoader<Item> = (onChunk: (items: readonly Item[]) => void) => Promise<void>;

export type ProgressiveList<Item> = Readonly<{
  getState: () => ProgressiveListState<Item>;
  load: () => Promise<void>;
}>;

/**
 * Skeleton / Progressive Loading exposes useful layout immediately, then
 * replaces placeholders with chunks instead of waiting for the full response.
 */
export const createProgressiveList = <Item>(
  skeletonCount: number,
  loader: ProgressiveLoader<Item>,
): ProgressiveList<Item> => {
  let state: ProgressiveListState<Item> = {
    items: [],
    skeletonCount: Math.max(0, skeletonCount),
    isLoading: false,
    error: undefined,
  };

  return {
    getState: (): ProgressiveListState<Item> => state,
    load: async (): Promise<void> => {
      state = { ...state, items: [], isLoading: true, error: undefined };

      try {
        await loader((items) => {
          state = {
            ...state,
            items: [...state.items, ...items],
            skeletonCount: Math.max(0, state.skeletonCount - items.length),
          };
        });
        state = { ...state, isLoading: false, skeletonCount: 0 };
      } catch (cause: unknown) {
        state = {
          ...state,
          isLoading: false,
          error: cause instanceof Error ? cause.message : 'Unable to load content',
        };
      }
    },
  };
};
