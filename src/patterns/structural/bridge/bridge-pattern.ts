export type AlertSender = Readonly<{
  send: (title: string, message: string) => string;
}>;

export interface Alert {
  notify: (message: string) => string;
}

class EmailAlertSender implements AlertSender {
  send = (title: string, message: string): string => `Email [${title}]: ${message}`;
}

class SmsAlertSender implements AlertSender {
  send = (title: string, message: string): string => `SMS [${title}]: ${message}`;
}

/** Abstraction delegates delivery to an independently replaceable implementor. */
export class SystemAlert implements Alert {
  constructor(
    private readonly sender: AlertSender,
    private readonly title: string,
  ) {}

  protected send = (message: string): string => this.sender.send(this.title, message);

  notify = (message: string): string => this.send(message);
}

export class UrgentSystemAlert extends SystemAlert {
  override notify = (message: string): string => this.send(`URGENT: ${message}`);
}

export const createEmailAlertSender = (): AlertSender => new EmailAlertSender();

export const createSmsAlertSender = (): AlertSender => new SmsAlertSender();
