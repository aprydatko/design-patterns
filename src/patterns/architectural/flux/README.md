# Pattern: Flux / Unidirectional Data Flow

## Definition

Flux is an architecture in which data moves in one direction: a View dispatches an action, a Dispatcher delivers it to a Store, the Store updates state, and the View renders the new state. This makes state changes explicit and avoids unpredictable two-way data updates.

## Structure

- `UserAction` describes an event or user intent.
- `UserDispatcher` delivers every action to registered handlers.
- `UserStore` owns state and applies actions using the Model.
- Store subscribers represent Views that render the latest state.

## Example

A user screen dispatches `{ type: 'loadUsers' }` when it opens and `{ type: 'selectUser', userId }` when a row is clicked. It subscribes to the Store and re-renders whenever the Store publishes a new state.

## Trade-offs

### Advantages

- Makes state transitions and event flow easy to trace.
- Prevents competing components from mutating shared state directly.
- Works well for complex interfaces with many state consumers.

### Disadvantages

- Adds Dispatcher, Store, and action boilerplate.
- Synchronous action handling can become difficult to extend without clear conventions.
- The architecture may be excessive for a small, local component.

## Interview answer

- **Definition:** Flux is a unidirectional data-flow architecture driven by actions and a central Store.
- **Structure:** The View dispatches actions, the Dispatcher routes them, the Store updates state, and the View subscribes to changes.
- **Example:** A user list dispatches load and selection actions and renders Store state.
- **Trade-off:** It improves predictability and debugging, but adds infrastructure and ceremony.

## Implementation

Links to the implementation and test:

- `src/patterns/architectural/flux/flux-pattern.ts`
- `tests/patterns/architectural/flux/flux-pattern.test.ts`
