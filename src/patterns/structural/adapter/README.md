# Adapter Pattern

## Definition

Adapter Pattern converts the interface of an existing class into the interface a client expects. It lets incompatible code work together without changing either the client contract or the adapted dependency.

## Structure

- **Target:** `PaymentProcessor` is the interface the application understands.
- **Adaptee:** `LegacyPaymentGateway` exposes an older `charge` API that accepts cents.
- **Adapter:** `LegacyPaymentAdapter` converts dollar amounts and maps the gateway response to `PaymentResult`.
- **Client:** application code can depend on `PaymentProcessor` without knowing which provider is behind it.

## Example

An application can integrate a legacy or third-party payment SDK while keeping its checkout code aligned with the application’s own payment interface.

## Trade-offs

### Advantages

- Reuses existing code without modifying it.
- Keeps provider-specific translation at an integration boundary.
- Makes replacing the provider easier for the client.

### Disadvantages

- Adds another layer to understand and maintain.
- A leaky adapter can expose details of the adapted API.
- Complex mismatches may require more than simple field or method translation.

## Interview answer

- **Definition:** converts one interface into another interface a client expects;
- **Structure:** a target contract, an incompatible adaptee, and an adapter that translates calls;
- **Example:** wrapping a legacy SDK, payment provider, or third-party API;
- **Trade-off:** enables reuse and decoupling, but introduces translation code.

## Implementation

Links to the implementation and test:

- [adapter-pattern.ts](./adapter-pattern.ts)
- `tests/patterns/structural/adapter/adapter-pattern.test.ts`
