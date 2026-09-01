# Composite Pattern

## Definition

Composite composes objects into tree structures and lets clients treat individual objects and groups uniformly.

## Structure

- **Component:** `FileSystemNode` defines the shared file and directory operations.
- **Leaf:** `File` represents an individual file.
- **Composite:** `Directory` contains other nodes and aggregates their sizes.

## Example

A file browser can calculate the size of a file or an entire nested directory using the same `getSize` operation.

## Trade-offs

### Advantages

- Simplifies client code by providing a uniform interface.
- Naturally supports recursive tree structures.
- Makes new leaf and composite types easy to add.

### Disadvantages

- The shared interface may expose operations that do not make sense for every node.
- Recursive structures can make debugging and performance analysis less obvious.

## Interview answer

- **Definition:** treats individual objects and compositions uniformly;
- **Structure:** component, leaf, and composite nodes;
- **Example:** calculating file and directory sizes through one interface;
- **Trade-off:** simplifies tree handling, but the common contract can become too broad.

## Implementation

- [composite-pattern.ts](./composite-pattern.ts)
- `tests/patterns/structural/composite/composite-pattern.test.ts`
