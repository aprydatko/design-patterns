export type NotificationChannel = 'email' | 'sms';

export type Notification = Readonly<{
  send: (message: string, recipient: string) => string;
}>;

class EmailNotification implements Notification {
  send = (message: string, recipient: string): string => `Email sent to ${recipient}: ${message}`;
}

class SmsNotification implements Notification {
  send = (message: string, recipient: string): string => `SMS sent to ${recipient}: ${message}`;
}

/**
 * Factory Pattern centralizes object creation while callers depend on a shared contract.
 */
export const createNotification = (channel: NotificationChannel): Notification => {
  if (channel === 'email') {
    return new EmailNotification();
  }

  return new SmsNotification();
};
