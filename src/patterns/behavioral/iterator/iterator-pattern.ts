export type Track = Readonly<{
  title: string;
  artist: string;
}>;

/**
 * Iterator Pattern provides sequential access to a collection without exposing
 * how the collection stores its items.
 */
export class Playlist implements Iterable<Track> {
  public constructor(private readonly tracks: readonly Track[]) {}

  *[Symbol.iterator](): Iterator<Track> {
    for (const track of this.tracks) {
      yield track;
    }
  }
}
