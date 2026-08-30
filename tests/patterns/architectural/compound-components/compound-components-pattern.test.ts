import { describe, expect, it } from 'vitest';

import { createCompoundTabs } from '@patterns/architectural/compound-components/compound-components-pattern.js';

const tabs = [
  { id: 'overview', label: 'Overview', content: 'Project overview' },
  { id: 'activity', label: 'Activity', content: 'Recent activity' },
] as const;

describe('Compound Components Pattern', () => {
  it('coordinates child components through shared root state', () => {
    const compoundTabs = createCompoundTabs(tabs);
    const view = compoundTabs.getView();

    expect(view.tabList()).toEqual([
      { id: 'overview', label: 'Overview', isActive: true },
      { id: 'activity', label: 'Activity', isActive: false },
    ]);
    expect(view.panel('overview')).toEqual({ content: 'Project overview', isVisible: true });
  });

  it('allows one child to update state observed by its siblings', () => {
    const compoundTabs = createCompoundTabs(tabs);
    const activityTab = compoundTabs.getView().tab('activity');

    activityTab.select();

    const nextView = compoundTabs.getView();
    expect(nextView.activeTabId).toBe('activity');
    expect(nextView.panel('activity').isVisible).toBe(true);
    expect(nextView.tab('overview').isActive).toBe(false);
  });

  it('ignores invalid selections and rejects unknown children', () => {
    const compoundTabs = createCompoundTabs(tabs);
    compoundTabs.select('missing');

    expect(compoundTabs.getView().activeTabId).toBe('overview');
    expect(() => compoundTabs.getView().tab('missing')).toThrow('Unknown tab: missing');
  });
});
