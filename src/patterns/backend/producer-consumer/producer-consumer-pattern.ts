type WaitingConsumer<Item> = {
  resolve: (item: Item) => void;
  reject: (error: Error) => void;
};

export type ProducerConsumerQueue<Item> = Readonly<{
  produce: (item: Item) => Promise<void>;
  consume: () => Promise<Item>;
  close: () => void;
}>;

export type ProducerConsumerOptions = Readonly<{
  capacity: number;
}>;

/**
 * Producer / Consumer decouples work creation from work processing through a
 * bounded queue. Consumers wait for work, while producers receive backpressure
 * when the queue has reached capacity.
 */
export const createProducerConsumerQueue = <Item>(
  options: ProducerConsumerOptions,
): ProducerConsumerQueue<Item> => {
  if (!Number.isInteger(options.capacity) || options.capacity < 1) {
    throw new Error('Queue capacity must be a positive integer');
  }

  const queuedItems: Item[] = [];
  const waitingConsumers: WaitingConsumer<Item>[] = [];
  let closed = false;

  const produce = (item: Item): Promise<void> => {
    if (closed) {
      return Promise.reject(new Error('Queue is closed'));
    }

    const consumer = waitingConsumers.shift();

    if (consumer !== undefined) {
      consumer.resolve(item);
      return Promise.resolve();
    }

    if (queuedItems.length >= options.capacity) {
      return Promise.reject(new Error('Queue capacity exceeded'));
    }

    queuedItems.push(item);
    return Promise.resolve();
  };

  const consume = (): Promise<Item> => {
    const item = queuedItems.shift();

    if (item !== undefined) {
      return Promise.resolve(item);
    }

    if (closed) {
      return Promise.reject(new Error('Queue is closed'));
    }

    return new Promise<Item>((resolve, reject) => {
      waitingConsumers.push({ resolve, reject });
    });
  };

  const close = (): void => {
    if (closed) return;

    closed = true;
    const error = new Error('Queue is closed');

    for (const consumer of waitingConsumers.splice(0)) {
      consumer.reject(error);
    }
  };

  return { produce, consume, close };
};
