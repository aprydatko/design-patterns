export type DiscountStrategy = (subtotal: number) => number;

export type Checkout = Readonly<{
  total: (subtotal: number) => number;
}>;

export const noDiscount: DiscountStrategy = (subtotal) => subtotal;

export const createPercentageDiscount = (percentage: number): DiscountStrategy => {
  if (percentage < 0 || percentage > 100) {
    throw new RangeError('Discount percentage must be between 0 and 100');
  }

  return (subtotal: number): number => subtotal * (1 - percentage / 100);
};

export const createFixedDiscount = (amount: number): DiscountStrategy => {
  if (amount < 0) {
    throw new RangeError('Discount amount cannot be negative');
  }

  return (subtotal: number): number => Math.max(0, subtotal - amount);
};

/**
 * Strategy Pattern lets a context use interchangeable algorithms through a shared contract.
 */
export const createCheckout = (discount: DiscountStrategy = noDiscount): Checkout => ({
  total: (subtotal: number): number => discount(subtotal),
});
