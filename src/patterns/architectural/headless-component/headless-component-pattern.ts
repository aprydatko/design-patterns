export type HeadlessOption = Readonly<{
  id: string;
  label: string;
}>;

export type HeadlessComboboxState = Readonly<{
  query: string;
  isOpen: boolean;
  highlightedId: string | undefined;
  selectedId: string | undefined;
  options: readonly HeadlessOption[];
}>;

export type HeadlessCombobox = Readonly<{
  getState: () => HeadlessComboboxState;
  setQuery: (query: string) => void;
  moveHighlight: (direction: 'next' | 'previous') => void;
  select: (id: string) => void;
  close: () => void;
}>;

const filterOptions = (
  options: readonly HeadlessOption[],
  query: string,
): readonly HeadlessOption[] => {
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery.length === 0) {
    return options;
  }

  return options.filter((option) => option.label.toLowerCase().includes(normalizedQuery));
};

/**
 * A headless component exposes behavior and state without prescribing any UI.
 * Consumers decide whether to render a native select, custom menu, or mobile UI.
 */
export const createHeadlessCombobox = (options: readonly HeadlessOption[]): HeadlessCombobox => {
  let state: HeadlessComboboxState = {
    query: '',
    isOpen: false,
    highlightedId: options[0]?.id,
    selectedId: undefined,
    options,
  };

  const setQuery = (query: string): void => {
    const filteredOptions = filterOptions(options, query);
    state = {
      ...state,
      query,
      isOpen: true,
      options: filteredOptions,
      highlightedId: filteredOptions[0]?.id,
    };
  };

  return {
    getState: (): HeadlessComboboxState => state,
    setQuery,
    moveHighlight: (direction): void => {
      const currentIndex = state.options.findIndex((option) => option.id === state.highlightedId);
      const offset = direction === 'next' ? 1 : -1;
      const nextIndex =
        currentIndex < 0
          ? 0
          : (currentIndex + offset + state.options.length) % state.options.length;
      state = { ...state, highlightedId: state.options[nextIndex]?.id };
    },
    select: (id: string): void => {
      if (!state.options.some((option) => option.id === id)) {
        return;
      }

      state = { ...state, selectedId: id, highlightedId: id, isOpen: false };
    },
    close: (): void => {
      state = { ...state, isOpen: false };
    },
  };
};
