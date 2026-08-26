# Facade Pattern

## Definition

Facade Pattern provides a simple, unified interface to a group of more complex subsystems. The facade coordinates the workflow while clients remain unaware of the subsystems’ internal sequence.

## Structure

- **Subsystems:** `InventoryService`, `PaymentService`, and `NotificationService` each own one checkout concern.
- **Facade:** `CheckoutFacade` coordinates reservation, payment, and confirmation.
- **Client:** callers invoke `checkout` instead of managing each subsystem themselves.

## Example

An e-commerce application can expose one checkout operation that hides inventory reservation, payment processing, and confirmation notification behind a single service.

## Trade-offs

### Advantages

- Gives clients an easy entry point to a multi-step workflow.
- Keeps orchestration logic in one place.
- Reduces coupling between clients and subsystem details.

### Disadvantages

- The facade can become too large if it owns unrelated workflows.
- Advanced clients may need to bypass it for more specific subsystem behavior.
- Failures and rollback across multiple subsystems still require explicit handling.

## Interview answer

- **Definition:** provides a simplified interface over a complex subsystem;
- **Structure:** a facade delegates to multiple focused subsystem services;
- **Example:** checkout, account onboarding, media conversion, or report generation;
- **Trade-off:** simplifies common use cases, but can become a bloated orchestration layer.

## Implementation

Links to the implementation and test:

- [facade-pattern.ts](./facade-pattern.ts)
- `tests/patterns/structural/facade/facade-pattern.test.ts`
