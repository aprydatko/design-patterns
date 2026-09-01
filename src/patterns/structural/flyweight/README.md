# Flyweight Pattern

## Definition

Flyweight minimizes memory usage by sharing reusable objects for state that is common across many instances.

## Structure

- **Flyweight:** `TextStyle` contains shared, immutable intrinsic state.
- **Flyweight factory:** `TextStyleFactory` caches and reuses styles.
- **Context:** `TextGlyph` stores unique character and position data while referencing a shared style.

## Example

A text editor can render thousands of characters while keeping one style object per distinct font, size, and color combination.

## Trade-offs

### Advantages

- Reduces duplicate memory for repeated immutable state.
- Centralizes reuse and cache management.
- Separates shared state from per-instance state.

### Disadvantages

- Adds cache lifecycle and key-management concerns.
- Shared state must remain immutable to prevent unexpected changes.

## Interview answer

- **Definition:** shares common state among many fine-grained objects;
- **Structure:** flyweight, factory, and context-specific extrinsic state;
- **Example:** reusing text styles while glyphs keep their own positions;
- **Trade-off:** saves memory, but adds cache complexity and immutability requirements.

## Implementation

- [flyweight-pattern.ts](./flyweight-pattern.ts)
- `tests/patterns/structural/flyweight/flyweight-pattern.test.ts`
