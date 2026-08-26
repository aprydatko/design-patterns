import { describe, expect, it } from 'vitest';

import { Playlist, type Track } from '@patterns/behavioral/iterator/iterator-pattern.js';

const tracks: readonly Track[] = [
  { title: 'Space Oddity', artist: 'David Bowie' },
  { title: 'Teardrop', artist: 'Massive Attack' },
];

describe('Iterator Pattern', () => {
  it('supports traversal without exposing collection internals', () => {
    const playlist = new Playlist(tracks);
    const titles: string[] = [];

    for (const track of playlist) {
      titles.push(track.title);
    }

    expect(titles).toEqual(['Space Oddity', 'Teardrop']);
  });

  it('provides independent iterator state for each traversal', () => {
    const playlist = new Playlist(tracks);
    const firstIterator = playlist[Symbol.iterator]();
    const secondIterator = playlist[Symbol.iterator]();

    expect(firstIterator.next().value).toEqual(tracks[0]);
    expect(firstIterator.next().value).toEqual(tracks[1]);
    expect(secondIterator.next().value).toEqual(tracks[0]);
    expect(firstIterator.next().done).toBe(true);
  });
});
