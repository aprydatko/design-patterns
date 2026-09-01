# Mediator Pattern

## Definition

Mediator encapsulates communication between objects in a central coordinator, reducing direct dependencies between them.

## Structure

- **Mediator:** `ChatMediator` defines participant registration and message delivery.
- **Concrete mediator:** `ChatRoom` routes messages to all other participants.
- **Colleagues:** `User` communicates through the mediator instead of addressing other users directly.

## Example

A chat room can broadcast messages while users remain unaware of the other participants and the room’s routing details.

## Trade-offs

### Advantages

- Reduces many-to-many coupling between collaborating objects.
- Centralizes interaction rules and routing.
- Makes participants simpler and easier to replace.

### Disadvantages

- The mediator can become a complex coordination hub.
- Interaction rules may be less visible because they are centralized.

## Interview answer

- **Definition:** centralizes communication between a group of objects;
- **Structure:** mediator, concrete mediator, and colleague objects;
- **Example:** routing chat messages between users;
- **Trade-off:** reduces coupling, but risks creating a large mediator.

## Implementation

- [mediator-pattern.ts](./mediator-pattern.ts)
- `tests/patterns/behavioral/mediator/mediator-pattern.test.ts`
