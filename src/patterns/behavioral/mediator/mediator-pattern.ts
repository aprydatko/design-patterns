export interface ChatMediator {
  register: (participant: ChatParticipant) => void;
  send: (message: string, sender: ChatParticipant) => void;
}

export interface ChatParticipant {
  readonly name: string;
  receive: (message: string, sender: string) => void;
  send: (message: string) => void;
}

/** Mediator centralizes communication so participants do not reference one another. */
export class ChatRoom implements ChatMediator {
  private readonly participants: ChatParticipant[] = [];

  register = (participant: ChatParticipant): void => {
    this.participants.push(participant);
  };

  send = (message: string, sender: ChatParticipant): void => {
    this.participants
      .filter((participant) => participant !== sender)
      .forEach((participant) => {
        participant.receive(message, sender.name);
      });
  };
}

export class User implements ChatParticipant {
  readonly messages: string[] = [];

  constructor(
    readonly name: string,
    private readonly mediator: ChatMediator,
  ) {}

  receive = (message: string, sender: string): void => {
    this.messages.push(`${sender}: ${message}`);
  };

  send = (message: string): void => {
    this.mediator.send(message, this);
  };
}
