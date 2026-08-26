export type PaymentResult = Readonly<{
  approved: boolean;
  transactionId: string;
}>;

export type PaymentProcessor = Readonly<{
  process: (amount: number) => PaymentResult;
}>;

/** Represents an existing provider whose API cannot be changed. */
export class LegacyPaymentGateway {
  charge = (amountInCents: number): string => `legacy-tx-${String(amountInCents)}`;
}

/**
 * Adapter Pattern translates a legacy API into the contract expected by the client.
 */
export class LegacyPaymentAdapter implements PaymentProcessor {
  public constructor(private readonly gateway: LegacyPaymentGateway) {}

  process = (amount: number): PaymentResult => ({
    approved: amount > 0,
    transactionId: this.gateway.charge(Math.round(amount * 100)),
  });
}
