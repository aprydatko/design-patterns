import { describe, expect, it } from 'vitest';

import { createProgressiveList } from '@patterns/architectural/skeleton-progressive-loading/skeleton-progressive-loading-pattern.js';

describe('Skeleton / Progressive Loading Pattern', () => {
  it('shows skeleton slots before content arrives and replaces them progressively', async () => {
    let publishChunk: ((items: readonly string[]) => void) | undefined;
    const list = createProgressiveList(3, (onChunk) => {
      publishChunk = onChunk;
      return Promise.resolve();
    });

    const loading = list.load();
    expect(list.getState()).toMatchObject({ items: [], skeletonCount: 3, isLoading: true });

    publishChunk?.(['First item']);
    expect(list.getState()).toMatchObject({
      items: ['First item'],
      skeletonCount: 2,
      isLoading: true,
    });
    await loading;
    expect(list.getState()).toMatchObject({ skeletonCount: 0, isLoading: false });
  });

  it('keeps loaded content and reports errors after progressive loading fails', async () => {
    const list = createProgressiveList(2, (onChunk) => {
      onChunk(['First item']);
      return Promise.reject(new Error('Connection lost'));
    });

    await list.load();

    expect(list.getState()).toEqual({
      items: ['First item'],
      skeletonCount: 1,
      isLoading: false,
      error: 'Connection lost',
    });
  });
});
