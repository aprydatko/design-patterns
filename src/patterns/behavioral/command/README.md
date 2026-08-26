# Command Pattern

## Definition

Command Pattern encapsulates a request as an object with a common execution contract. This separates the object that asks for an action from the object that performs it and enables queuing, logging, retrying, and undoing commands.

## Structure

- **Command:** the `Command` contract defines `execute` and `undo`.
- **Concrete command:** `InsertTextCommand` stores the request and translates it into operations on the receiver.
- **Receiver:** `TextDocument` performs the actual text changes.
- **Invoker:** `CommandHistory` executes commands and keeps enough history to undo them.

## Example

A text editor can represent typing, deleting, or formatting as commands so actions can be queued and undone consistently.

## Trade-offs

### Advantages

- Decouples requesters from the objects that perform actions.
- Makes undo, redo, queuing, and audit logging possible.
- Gives each action a focused, testable unit.

### Disadvantages

- Adds a class or object for every command variation.
- Undo behavior must be designed and maintained for each command.
- Simple actions may not justify the extra abstraction.

## Interview answer

- **Definition:** encapsulates a request as an object;
- **Structure:** command interface, concrete commands, receiver, and invoker;
- **Example:** editor undo, job queues, transactions, or UI actions;
- **Trade-off:** enables history and deferred execution, but adds object and lifecycle complexity.

## Implementation

Links to the implementation and test:

- [command-pattern.ts](./command-pattern.ts)
- `tests/patterns/behavioral/command/command-pattern.test.ts`
