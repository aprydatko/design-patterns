# Throttle Pattern

## Definition

Throttling limits how often a function can execute during a period of repeated calls. This leading-edge implementation runs the first call immediately and ignores calls until the interval expires.

## Structure

- **Original operation:** performs the work;
- **Throttle window:** tracks the interval during which execution is blocked;
- **Throttled function:** runs only when no window is active;
- **Controller:** allows the window to be cancelled or inspected.

## Example

`throttle` is useful for scroll, pointer-move, and resize handlers where updates should happen at a controlled rate while an event continues. Unlike Debounce, it does not wait for activity to stop before the first update.

## Trade-offs

### Advantages

- Provides regular upper bounds on execution frequency;
- Gives immediate feedback on the first event;
- Reduces work during high-frequency event streams.

### Disadvantages

- Intermediate calls are discarded;
- The leading-edge behavior may not suit operations that need the final event;
- Timer-based behavior requires lifecycle cleanup and testing.

## Interview answer

- **Definition:** limits a function to at most one execution per interval;
- **Structure:** the first call opens a time window and later calls are ignored until it closes;
- **Example:** limit scroll-driven layout updates;
- **Trade-off:** controls execution frequency, but can discard useful intermediate or final arguments.

## Implementation

- [throttle.ts](./throttle.ts)
- `tests/patterns/functional/throttle/throttle.test.ts`
