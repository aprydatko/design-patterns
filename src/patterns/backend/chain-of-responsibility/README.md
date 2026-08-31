# Chain of Responsibility Pattern

## Definition

Chain of Responsibility passes a request through a sequence of handlers until one of them handles it. The sender is decoupled from the concrete handler that ultimately responds.

## Structure

- **Request** — the value being processed.
- **Handler** — checks whether it can handle the request and returns a response or `undefined`.
- **Chain** — invokes handlers in order and stops at the first response.

## Example

An authorization system can check an administrator, manager, and regular-user handler in order. Backend request routing, support escalation, and validation pipelines use the same idea.

## Trade-offs

### Advantages

- Reduces coupling between the sender and receiver.
- Handlers can be added, removed, or reordered independently.
- Each handler has one focused responsibility.

### Disadvantages

- A request may pass through many handlers before being handled.
- The final behavior depends on handler order.
- An unhandled request needs an explicit fallback policy.

## Interview answer

- **Definition:** A request is passed along a chain of handlers until one handles it.
- **Structure:** Sender, request, ordered handlers, and a chain coordinator.
- **Example:** Authorization checks with increasingly broad permissions.
- **Trade-off:** It improves extensibility and decoupling, but can make control flow and ordering less obvious.

## Implementation

Links to the implementation and test:

- `src/patterns/backend/chain-of-responsibility/chain-of-responsibility-pattern.ts`
- `tests/patterns/backend/chain-of-responsibility/chain-of-responsibility-pattern.test.ts`
