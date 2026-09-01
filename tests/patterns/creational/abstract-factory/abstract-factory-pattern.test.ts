import { describe, expect, it } from 'vitest';

import { createNotificationFactory } from '@patterns/creational/abstract-factory/abstract-factory-pattern.js';

describe('Abstract Factory Pattern', () => {
  it('creates a compatible email notification family', () => {
    const factory = createNotificationFactory('email');

    expect(factory.createConfirmation().send('ada@example.com')).toBe(
      'Email confirmation sent to ada@example.com',
    );
    expect(factory.createReminder().send('ada@example.com')).toBe(
      'Email reminder sent to ada@example.com',
    );
  });

  it('switches the entire product family to SMS', () => {
    const factory = createNotificationFactory('sms');

    expect(factory.createConfirmation().send('+380501234567')).toBe(
      'SMS confirmation sent to +380501234567',
    );
    expect(factory.createReminder().send('+380501234567')).toBe(
      'SMS reminder sent to +380501234567',
    );
  });
});
