export type CacheStore<Key, Value> = Readonly<{
  get: (key: Key) => Promise<Value | undefined>;
  set: (key: Key, value: Value) => Promise<void>;
  delete: (key: Key) => Promise<void>;
}>;

export type CacheAside<Key, Value> = Readonly<{
  get: (key: Key, load: () => Promise<Value>) => Promise<Value>;
  invalidate: (key: Key) => Promise<void>;
}>;

/**
 * Cache-Aside checks the cache first. On a miss, it loads from the source,
 * stores the result in the cache, and returns the loaded value.
 */
export const createCacheAside = <Key, Value>(
  cache: CacheStore<Key, Value>,
): CacheAside<Key, Value> => ({
  get: async (key, load): Promise<Value> => {
    const cached = await cache.get(key);

    if (cached !== undefined) {
      return cached;
    }

    const value = await load();
    await cache.set(key, value);
    return value;
  },
  invalidate: (key): Promise<void> => cache.delete(key),
});
