import { describe, expect, it } from 'vitest';

import {
  CheckoutFacade,
  InventoryService,
  NotificationService,
  PaymentService,
} from '@patterns/structural/facade/facade-pattern.js';

describe('Facade Pattern', () => {
  it('coordinates the checkout subsystems through one operation', () => {
    const checkout = new CheckoutFacade(
      new InventoryService(['book']),
      new PaymentService(),
      new NotificationService(),
    );

    expect(checkout.checkout('book', 19.99)).toEqual({
      success: true,
      message: 'Confirmation sent for payment-1999',
    });
  });

  it('returns an early failure when inventory cannot reserve the product', () => {
    const checkout = new CheckoutFacade(
      new InventoryService(['book']),
      new PaymentService(),
      new NotificationService(),
    );

    expect(checkout.checkout('laptop', 999)).toEqual({
      success: false,
      message: 'Product is unavailable',
    });
  });
});
