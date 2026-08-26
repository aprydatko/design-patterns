export type MessageSubscriber = (message: string) => void;

export type MessageChannel = Readonly<{
  subscribe: (subscriber: MessageSubscriber) => () => void;
  publish: (message: string) => void;
}>;

/**
 * Observer / Pub-Sub Pattern lets subscribers react to messages without coupling
 * the publisher to any particular subscriber.
 */
export const createMessageChannel = (): MessageChannel => {
  const subscribers = new Set<MessageSubscriber>();

  const subscribe = (subscriber: MessageSubscriber): (() => void) => {
    subscribers.add(subscriber);

    return (): void => {
      subscribers.delete(subscriber);
    };
  };

  const publish = (message: string): void => {
    subscribers.forEach((subscriber) => {
      subscriber(message);
    });
  };

  return { subscribe, publish };
};
