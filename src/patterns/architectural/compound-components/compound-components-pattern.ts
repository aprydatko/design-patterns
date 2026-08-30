export type CompoundTab = Readonly<{
  id: string;
  label: string;
  content: string;
}>;

export type CompoundTabsView = Readonly<{
  activeTabId: string | undefined;
  tabList: () => ReadonlyArray<Readonly<{ id: string; label: string; isActive: boolean }>>;
  tab: (
    id: string,
  ) => Readonly<{ id: string; label: string; isActive: boolean; select: () => void }>;
  panel: (id: string) => Readonly<{ content: string; isVisible: boolean }>;
  select: (id: string) => void;
}>;

export type CompoundTabs = Readonly<{
  getView: () => CompoundTabsView;
  select: (id: string) => void;
}>;

const findTab = (tabs: readonly CompoundTab[], id: string): CompoundTab | undefined =>
  tabs.find((tab) => tab.id === id);

/**
 * Compound components share state through a common root. Each child has a
 * focused responsibility while remaining coordinated with its sibling parts.
 */
export const createCompoundTabs = (tabs: readonly CompoundTab[]): CompoundTabs => {
  let activeTabId = tabs[0]?.id;

  const select = (id: string): void => {
    if (findTab(tabs, id) === undefined) {
      return;
    }

    activeTabId = id;
  };

  return {
    getView: (): CompoundTabsView => ({
      activeTabId,
      tabList: () =>
        tabs.map(({ id, label }) => ({
          id,
          label,
          isActive: id === activeTabId,
        })),
      tab: (id: string) => {
        const tab = findTab(tabs, id);

        if (tab === undefined) {
          throw new Error(`Unknown tab: ${id}`);
        }

        return {
          id: tab.id,
          label: tab.label,
          isActive: tab.id === activeTabId,
          select: (): void => {
            select(tab.id);
          },
        };
      },
      panel: (id: string) => {
        const tab = findTab(tabs, id);

        if (tab === undefined) {
          throw new Error(`Unknown tab: ${id}`);
        }

        return { content: tab.content, isVisible: tab.id === activeTabId };
      },
      select,
    }),
    select,
  };
};
