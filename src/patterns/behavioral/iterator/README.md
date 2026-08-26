# Iterator Pattern

## Definition

Iterator Pattern provides a standard way to access elements of a collection sequentially without exposing the collection’s internal representation. In JavaScript and TypeScript, the iterator protocol powers constructs such as `for...of` and spread syntax.

## Structure

- **Aggregate:** `Playlist` owns a collection of tracks.
- **Iterator:** `Playlist[Symbol.iterator]` yields one `Track` at a time.
- **Client:** callers traverse the playlist with `for...of` without knowing how tracks are stored.

## Example

A music player can iterate through a playlist while the playlist remains free to change its internal storage or traversal rules later.

## Trade-offs

### Advantages

- Separates traversal logic from collection consumers.
- Gives clients a familiar and composable iteration protocol.
- Allows different collections to expose the same traversal style.

### Disadvantages

- Adds a protocol layer for collections that may already be simple arrays.
- More advanced traversal rules require additional iterator logic.
- Iterators over mutable collections need clearly defined behavior.

## Interview answer

- **Definition:** provides sequential access to a collection without exposing its representation;
- **Structure:** an aggregate creates an iterator that tracks traversal state;
- **Example:** playlists, paginated results, trees, or custom data structures;
- **Trade-off:** standardizes traversal, but can be unnecessary for native collections.

## Implementation

Links to the implementation and test:

- [iterator-pattern.ts](./iterator-pattern.ts)
- `tests/patterns/behavioral/iterator/iterator-pattern.test.ts`
