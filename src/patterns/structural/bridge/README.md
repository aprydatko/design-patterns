# Bridge Pattern

## Definition

Bridge separates an abstraction from its implementation so both can vary independently.

## Structure

- **Abstraction:** `SystemAlert` defines the notification behavior.
- **Refined abstraction:** `UrgentSystemAlert` extends the alert behavior.
- **Implementor:** `AlertSender` defines delivery operations.
- **Concrete implementors:** email and SMS senders provide delivery details.

## Example

An alerting service can add urgent or regular alert types without changing its email and SMS delivery integrations.

## Trade-offs

### Advantages

- Prevents a class hierarchy from growing across two independent dimensions.
- Allows delivery implementations to be replaced at runtime.
- Keeps business-level alert behavior separate from transport details.

### Disadvantages

- Adds an abstraction and implementor layer.
- Can feel excessive when only one dimension is expected to change.

## Interview answer

- **Definition:** decouples an abstraction from its implementation;
- **Structure:** abstraction, refined abstraction, implementor, and concrete implementors;
- **Example:** alert types bridged to email or SMS delivery;
- **Trade-off:** supports independent evolution, but introduces extra objects.

## Implementation

- [bridge-pattern.ts](./bridge-pattern.ts)
- `tests/patterns/structural/bridge/bridge-pattern.test.ts`
