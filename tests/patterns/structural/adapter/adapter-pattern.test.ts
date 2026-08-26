import { describe, expect, it } from 'vitest';

import {
  LegacyPaymentAdapter,
  LegacyPaymentGateway,
} from '@patterns/structural/adapter/adapter-pattern.js';

describe('Adapter Pattern', () => {
  it('translates the client amount into the legacy gateway format', () => {
    const paymentProcessor = new LegacyPaymentAdapter(new LegacyPaymentGateway());

    expect(paymentProcessor.process(12.5)).toEqual({
      approved: true,
      transactionId: 'legacy-tx-1250',
    });
  });

  it('exposes the application contract while adapting invalid payments', () => {
    const paymentProcessor = new LegacyPaymentAdapter(new LegacyPaymentGateway());

    expect(paymentProcessor.process(0)).toEqual({
      approved: false,
      transactionId: 'legacy-tx-0',
    });
  });
});
