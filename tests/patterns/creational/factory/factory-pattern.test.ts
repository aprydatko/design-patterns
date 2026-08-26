import { describe, expect, it } from 'vitest';

import { createNotification } from '@patterns/creational/factory/factory-pattern.js';

describe('Factory Pattern', () => {
  it('creates an email notification through the shared contract', () => {
    const notification = createNotification('email');

    expect(notification.send('Welcome', 'ada@example.com')).toBe(
      'Email sent to ada@example.com: Welcome',
    );
  });

  it('creates an SMS notification without exposing its concrete class', () => {
    const notification = createNotification('sms');

    expect(notification.send('Your code is 1234', '+380501234567')).toBe(
      'SMS sent to +380501234567: Your code is 1234',
    );
  });
});
