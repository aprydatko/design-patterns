export type CheckoutResult = Readonly<{
  success: boolean;
  message: string;
}>;

export class InventoryService {
  private readonly availableProducts: Set<string>;

  public constructor(products: readonly string[]) {
    this.availableProducts = new Set(products);
  }

  reserve = (productId: string): boolean => {
    if (!this.availableProducts.has(productId)) {
      return false;
    }

    this.availableProducts.delete(productId);
    return true;
  };
}

export class PaymentService {
  charge = (amount: number): string => `payment-${String(Math.round(amount * 100))}`;
}

export class NotificationService {
  sendConfirmation = (transactionId: string): string => `Confirmation sent for ${transactionId}`;
}

/**
 * Facade Pattern provides one simple operation over a group of subsystem services.
 */
export class CheckoutFacade {
  public constructor(
    private readonly inventory: InventoryService,
    private readonly payments: PaymentService,
    private readonly notifications: NotificationService,
  ) {}

  checkout = (productId: string, amount: number): CheckoutResult => {
    if (!this.inventory.reserve(productId)) {
      return { success: false, message: 'Product is unavailable' };
    }

    if (amount <= 0) {
      return { success: false, message: 'Payment amount must be positive' };
    }

    const transactionId = this.payments.charge(amount);
    const message = this.notifications.sendConfirmation(transactionId);

    return { success: true, message };
  };
}
