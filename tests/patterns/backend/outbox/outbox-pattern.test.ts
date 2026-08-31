import { describe, expect, it } from 'vitest';

import {
  createOutbox,
  type OutboxMessage,
  type OutboxStore,
} from '@patterns/backend/outbox/outbox-pattern.js';

const createMemoryStore = <Event>(): OutboxStore<Event> => {
  const messages: OutboxMessage<Event>[] = [];

  return {
    add: (message) => {
      messages.push(message);
      return Promise.resolve();
    },
    listPending: () => Promise.resolve([...messages]),
    remove: (id) => {
      const index = messages.findIndex((message) => message.id === id);
      if (index >= 0) messages.splice(index, 1);
      return Promise.resolve();
    },
  };
};

type OrderCreated = { orderId: string };

describe('Outbox Pattern', () => {
  it('stores an event before returning its id and publishes pending events', async () => {
    const store = createMemoryStore<OrderCreated>();
    const published: OrderCreated[] = [];
    const outbox = createOutbox(
      store,
      (event) => {
        published.push(event);
        return Promise.resolve();
      },
      () => 'message-1',
    );

    await expect(outbox.enqueue({ orderId: 'order-1' })).resolves.toBe('message-1');
    await outbox.publishPending();

    expect(published).toEqual([{ orderId: 'order-1' }]);
    await expect(store.listPending()).resolves.toEqual([]);
  });

  it('keeps a message pending when publication fails', async () => {
    const store = createMemoryStore<OrderCreated>();
    const outbox = createOutbox(
      store,
      () => Promise.reject(new Error('broker unavailable')),
      () => 'message-1',
    );
    await outbox.enqueue({ orderId: 'order-1' });

    await expect(outbox.publishPending()).rejects.toThrow('broker unavailable');
    await expect(store.listPending()).resolves.toHaveLength(1);
  });

  it('publishes pending messages in storage order', async () => {
    const store = createMemoryStore<OrderCreated>();
    const published: string[] = [];
    const outbox = createOutbox(
      store,
      (event) => {
        published.push(event.orderId);
        return Promise.resolve();
      },
      (() => {
        let sequence = 0;
        return () => `message-${String(++sequence)}`;
      })(),
    );

    await outbox.enqueue({ orderId: 'order-1' });
    await outbox.enqueue({ orderId: 'order-2' });
    await outbox.publishPending();

    expect(published).toEqual(['order-1', 'order-2']);
  });
});
