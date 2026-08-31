import { describe, expect, it } from 'vitest';

import { createProducerConsumerQueue } from '@patterns/backend/producer-consumer/producer-consumer-pattern.js';

describe('Producer / Consumer Pattern', () => {
  it('delivers produced items to consumers in FIFO order', async () => {
    const queue = createProducerConsumerQueue<string>({ capacity: 2 });

    await queue.produce('first');
    await queue.produce('second');

    await expect(queue.consume()).resolves.toBe('first');
    await expect(queue.consume()).resolves.toBe('second');
  });

  it('allows a waiting consumer to receive work immediately', async () => {
    const queue = createProducerConsumerQueue<number>({ capacity: 1 });
    const consumed = queue.consume();

    await queue.produce(42);

    await expect(consumed).resolves.toBe(42);
  });

  it('applies backpressure and rejects consumers after closing', async () => {
    const queue = createProducerConsumerQueue<string>({ capacity: 1 });

    await queue.produce('only-item');
    await expect(queue.produce('overflow')).rejects.toThrow('Queue capacity exceeded');
    queue.close();

    await expect(queue.consume()).resolves.toBe('only-item');
    await expect(queue.consume()).rejects.toThrow('Queue is closed');
    await expect(queue.produce('late-item')).rejects.toThrow('Queue is closed');
  });
});
