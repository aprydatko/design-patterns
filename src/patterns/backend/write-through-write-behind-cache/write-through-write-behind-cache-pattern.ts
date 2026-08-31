export type CacheWriter<Key, Value> = Readonly<{
  set: (key: Key, value: Value) => Promise<void>;
}>;

export type SourceWriter<Key, Value> = Readonly<{
  save: (key: Key, value: Value) => Promise<void>;
}>;

export type WriteCache<Key, Value> = Readonly<{
  writeThrough: (key: Key, value: Value) => Promise<void>;
  writeBehind: (key: Key, value: Value) => Promise<void>;
  flush: () => Promise<void>;
}>;

/**
 * Write-Through persists to the source before updating the cache. Write-Behind
 * updates the cache immediately and queues source persistence for a later flush.
 */
export const createWriteCache = <Key, Value>(
  cache: CacheWriter<Key, Value>,
  source: SourceWriter<Key, Value>,
): WriteCache<Key, Value> => {
  const pendingWrites: Array<readonly [Key, Value]> = [];

  const writeThrough = async (key: Key, value: Value): Promise<void> => {
    await source.save(key, value);
    await cache.set(key, value);
  };

  const writeBehind = async (key: Key, value: Value): Promise<void> => {
    await cache.set(key, value);
    pendingWrites.push([key, value]);
  };

  const flush = async (): Promise<void> => {
    while (pendingWrites.length > 0) {
      const nextWrite = pendingWrites[0];

      if (nextWrite === undefined) {
        return;
      }

      await source.save(nextWrite[0], nextWrite[1]);
      pendingWrites.shift();
    }
  };

  return { writeThrough, writeBehind, flush };
};
