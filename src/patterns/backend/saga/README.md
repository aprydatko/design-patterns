# Saga Pattern

## Definition

Saga coordinates a business transaction across multiple services or local transactions without requiring one distributed database transaction. Each successful step has a compensating action that runs in reverse order if a later step fails.

## Structure

- **Saga coordinator** — executes steps and triggers compensation on failure.
- **Step** — performs one local transaction.
- **Compensation** — semantically reverses a completed step.
- **Shared context** — carries identifiers and state between steps.

## Example

An order workflow can reserve inventory, charge payment, and schedule shipping. If shipping fails, the saga releases the inventory and refunds the payment.

## Trade-offs

### Advantages

- Works across service and database boundaries.
- Avoids long-lived distributed locks or two-phase commit.
- Makes rollback behavior explicit per business step.

### Disadvantages

- Compensation is a business action, not a perfect database rollback.
- Compensation itself can fail and needs retries or operational handling.
- Intermediate states and eventual consistency are unavoidable.

## Interview answer

- **Definition:** A sequence of local transactions with compensating actions for previously completed steps.
- **Structure:** Coordinator, steps, compensations, and shared context.
- **Example:** Order creation across inventory, payment, and shipping services.
- **Trade-off:** It scales across boundaries, but compensation and eventual consistency add complexity.

## Implementation

Links to the implementation and test:

- `src/patterns/backend/saga/saga-pattern.ts`
- `tests/patterns/backend/saga/saga-pattern.test.ts`
