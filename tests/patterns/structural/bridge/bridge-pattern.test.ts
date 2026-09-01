import { describe, expect, it } from 'vitest';

import {
  createEmailAlertSender,
  createSmsAlertSender,
  SystemAlert,
  UrgentSystemAlert,
} from '@patterns/structural/bridge/bridge-pattern.js';

describe('Bridge Pattern', () => {
  it('bridges a regular alert to email delivery', () => {
    const alert = new SystemAlert(createEmailAlertSender(), 'Service status');

    expect(alert.notify('All systems operational')).toBe(
      'Email [Service status]: All systems operational',
    );
  });

  it('varies alert behavior and delivery independently', () => {
    const alert = new UrgentSystemAlert(createSmsAlertSender(), 'Service status');

    expect(alert.notify('Database unavailable')).toBe(
      'SMS [Service status]: URGENT: Database unavailable',
    );
  });
});
