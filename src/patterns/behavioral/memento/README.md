# Memento Pattern

## Definition

Memento captures and restores an object’s internal state without exposing its implementation details.

## Structure

- **Originator:** `TextEditor` creates snapshots and restores itself from them.
- **Memento:** `EditorMemento` stores editor state behind a private boundary.
- **Caretaker:** `EditorHistory` keeps snapshots and coordinates undo operations.

## Example

A text editor can save checkpoints and undo changes without allowing history management code to manipulate editor state directly.

## Trade-offs

### Advantages

- Supports undo, rollback, and checkpoints.
- Preserves encapsulation of the originator’s state.
- Keeps snapshot management separate from business logic.

### Disadvantages

- Snapshots can consume significant memory.
- Snapshot creation and restoration may be expensive for large state objects.

## Interview answer

- **Definition:** captures an object’s state for later restoration without breaking encapsulation;
- **Structure:** originator, memento, and caretaker;
- **Example:** editor history and undo checkpoints;
- **Trade-off:** enables rollback, but snapshots add memory and processing costs.

## Implementation

- [memento-pattern.ts](./memento-pattern.ts)
- `tests/patterns/behavioral/memento/memento-pattern.test.ts`
