export type BankAccount = Readonly<{
  deposit: (amount: number) => number;
  withdraw: (amount: number) => number;
  getBalance: () => number;
}>;

const validateAmount = (amount: number): void => {
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new RangeError('Amount must be a positive finite number');
  }
};

/**
 * Closure for Encapsulation keeps state in a lexical scope that only the
 * returned operations can access.
 */
export const createBankAccount = (initialBalance = 0): BankAccount => {
  if (!Number.isFinite(initialBalance) || initialBalance < 0) {
    throw new RangeError('Initial balance cannot be negative or non-finite');
  }

  let balance = initialBalance;

  return {
    deposit: (amount: number): number => {
      validateAmount(amount);
      balance += amount;
      return balance;
    },
    withdraw: (amount: number): number => {
      validateAmount(amount);

      if (amount > balance) {
        throw new RangeError('Insufficient funds');
      }

      balance -= amount;
      return balance;
    },
    getBalance: (): number => balance,
  };
};
