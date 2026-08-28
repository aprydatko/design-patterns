import { describe, expect, it } from 'vitest';

import { createBankAccount } from '@patterns/functional/closure-for-encapsulation/closure-for-encapsulation.js';

describe('Closure for Encapsulation Pattern', () => {
  it('keeps the balance private and exposes controlled operations', () => {
    const account = createBankAccount(100);

    expect(account.getBalance()).toBe(100);
    expect(account.deposit(50)).toBe(150);
    expect(account.withdraw(25)).toBe(125);
    expect('balance' in account).toBe(false);
  });

  it('validates transactions and keeps account instances isolated', () => {
    const firstAccount = createBankAccount(100);
    const secondAccount = createBankAccount(100);

    firstAccount.withdraw(40);

    expect(firstAccount.getBalance()).toBe(60);
    expect(secondAccount.getBalance()).toBe(100);
    expect(() => firstAccount.withdraw(61)).toThrow('Insufficient funds');
    expect(() => firstAccount.deposit(0)).toThrow(RangeError);
    expect(() => createBankAccount(-1)).toThrow(RangeError);
  });
});
