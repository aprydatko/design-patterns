export type NotificationFamily = 'email' | 'sms';

export type NotificationFactory = Readonly<{
  createConfirmation: () => Notification;
  createReminder: () => Notification;
}>;

export type Notification = Readonly<{
  send: (recipient: string) => string;
}>;

class EmailConfirmation implements Notification {
  send = (recipient: string): string => `Email confirmation sent to ${recipient}`;
}

class EmailReminder implements Notification {
  send = (recipient: string): string => `Email reminder sent to ${recipient}`;
}

class SmsConfirmation implements Notification {
  send = (recipient: string): string => `SMS confirmation sent to ${recipient}`;
}

class SmsReminder implements Notification {
  send = (recipient: string): string => `SMS reminder sent to ${recipient}`;
}

class EmailNotificationFactory implements NotificationFactory {
  createConfirmation = (): Notification => new EmailConfirmation();

  createReminder = (): Notification => new EmailReminder();
}

class SmsNotificationFactory implements NotificationFactory {
  createConfirmation = (): Notification => new SmsConfirmation();

  createReminder = (): Notification => new SmsReminder();
}

/**
 * Abstract Factory creates compatible product families without exposing their
 * concrete implementations to the caller.
 */
export const createNotificationFactory = (family: NotificationFamily): NotificationFactory => {
  if (family === 'email') {
    return new EmailNotificationFactory();
  }

  return new SmsNotificationFactory();
};
