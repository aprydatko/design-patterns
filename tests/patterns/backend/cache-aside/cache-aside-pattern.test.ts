import { describe, expect, it } from 'vitest';

import {
  createCacheAside,
  type CacheStore,
} from '@patterns/backend/cache-aside/cache-aside-pattern.js';

const createMemoryCache = <Value>(): CacheStore<string, Value> => {
  const values = new Map<string, Value>();

  return {
    get: (key) => Promise.resolve(values.get(key)),
    set: (key, value) => {
      values.set(key, value);
      return Promise.resolve();
    },
    delete: (key) => {
      values.delete(key);
      return Promise.resolve();
    },
  };
};

describe('Cache-Aside Pattern', () => {
  it('loads on a miss and stores the loaded value', async () => {
    const cache = createMemoryCache<string>();
    const cacheAside = createCacheAside(cache);
    let loads = 0;
    const load = (): Promise<string> => {
      loads += 1;
      return Promise.resolve('Ada');
    };

    await expect(cacheAside.get('user-1', load)).resolves.toBe('Ada');
    await expect(cacheAside.get('user-1', load)).resolves.toBe('Ada');
    expect(loads).toBe(1);
  });

  it('returns cached values without calling the source', async () => {
    const cache = createMemoryCache<string>();
    await cache.set('user-1', 'Cached Ada');
    const cacheAside = createCacheAside(cache);

    await expect(cacheAside.get('user-1', () => Promise.resolve('Fresh Ada'))).resolves.toBe(
      'Cached Ada',
    );
  });

  it('invalidates cached data so the next read reloads it', async () => {
    const cache = createMemoryCache<string>();
    const cacheAside = createCacheAside(cache);
    await cacheAside.get('user-1', () => Promise.resolve('Old Ada'));
    await cacheAside.invalidate('user-1');

    await expect(cacheAside.get('user-1', () => Promise.resolve('New Ada'))).resolves.toBe(
      'New Ada',
    );
  });
});
