import { randomUUID } from 'node:crypto';

export type OutboxMessage<Event> = Readonly<{
  id: string;
  event: Event;
}>;

export type OutboxStore<Event> = Readonly<{
  add: (message: OutboxMessage<Event>) => Promise<void>;
  listPending: () => Promise<OutboxMessage<Event>[]>;
  remove: (id: string) => Promise<void>;
}>;

export type Outbox<Event> = Readonly<{
  enqueue: (event: Event) => Promise<string>;
  publishPending: () => Promise<void>;
}>;

export type OutboxIdGenerator = () => string;

/**
 * Outbox stores events durably before publishing them. Messages are removed
 * only after publication succeeds, allowing failed deliveries to be retried.
 */
export const createOutbox = <Event>(
  store: OutboxStore<Event>,
  publish: (event: Event) => Promise<void>,
  createId: OutboxIdGenerator = randomUUID,
): Outbox<Event> => ({
  enqueue: async (event): Promise<string> => {
    const id = createId();
    await store.add({ id, event });
    return id;
  },
  publishPending: async (): Promise<void> => {
    const pending = await store.listPending();

    for (const message of pending) {
      await publish(message.event);
      await store.remove(message.id);
    }
  },
});
