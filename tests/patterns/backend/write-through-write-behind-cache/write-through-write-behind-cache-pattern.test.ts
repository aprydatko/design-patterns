import { describe, expect, it } from 'vitest';

import {
  createWriteCache,
  type CacheWriter,
  type SourceWriter,
} from '@patterns/backend/write-through-write-behind-cache/write-through-write-behind-cache-pattern.js';

const createRecordingStores = () => {
  const events: string[] = [];
  const cache: CacheWriter<string, string> = {
    set: (key, value) => {
      events.push(`cache:${key}:${value}`);
      return Promise.resolve();
    },
  };
  const source: SourceWriter<string, string> = {
    save: (key, value) => {
      events.push(`source:${key}:${value}`);
      return Promise.resolve();
    },
  };

  return { cache, source, events };
};

describe('Write-Through / Write-Behind Cache', () => {
  it('persists before updating the cache with write-through', async () => {
    const { cache, source, events } = createRecordingStores();
    const writeCache = createWriteCache(cache, source);

    await writeCache.writeThrough('user-1', 'Ada');

    expect(events).toEqual(['source:user-1:Ada', 'cache:user-1:Ada']);
  });

  it('updates immediately and persists only during flush with write-behind', async () => {
    const { cache, source, events } = createRecordingStores();
    const writeCache = createWriteCache(cache, source);

    await writeCache.writeBehind('user-1', 'Ada');
    expect(events).toEqual(['cache:user-1:Ada']);

    await writeCache.flush();
    expect(events).toEqual(['cache:user-1:Ada', 'source:user-1:Ada']);
  });

  it('flushes write-behind operations in enqueue order', async () => {
    const { cache, source, events } = createRecordingStores();
    const writeCache = createWriteCache(cache, source);

    await writeCache.writeBehind('user-1', 'Ada v1');
    await writeCache.writeBehind('user-1', 'Ada v2');
    await writeCache.flush();

    expect(events.slice(2)).toEqual(['source:user-1:Ada v1', 'source:user-1:Ada v2']);
  });
});
