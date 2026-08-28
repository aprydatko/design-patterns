# Debounce Pattern

## Definition

Debouncing delays a function call until a period of inactivity has elapsed. Each new call resets the timer, so only the latest call in a burst is eventually executed.

## Structure

- **Original operation:** performs the work;
- **Timer:** schedules delayed execution;
- **Debounced function:** replaces the previous timer whenever it is called;
- **Controller:** allows pending work to be cancelled or inspected.

## Example

`debounce` is useful for search suggestions, resize handlers, and autosave operations where reacting to every rapid event would waste work. The example keeps the latest arguments and invokes the operation once activity stops.

## Trade-offs

### Advantages

- Reduces work during bursts of events;
- Prevents unnecessary network requests or expensive calculations;
- Keeps timing behavior separate from the original operation.

### Disadvantages

- Delays feedback until the timer expires;
- The operation may never run if calls continue indefinitely or are cancelled;
- Timer-based behavior requires lifecycle cleanup and careful testing.

## Interview answer

- **Definition:** delays execution until calls stop for a configured interval;
- **Structure:** repeated calls reset a timer and replace the pending arguments;
- **Example:** wait for a user to stop typing before searching;
- **Trade-off:** reduces event-driven work, but introduces delayed execution.

## Implementation

- [debounce.ts](./debounce.ts)
- `tests/patterns/functional/debounce/debounce.test.ts`
