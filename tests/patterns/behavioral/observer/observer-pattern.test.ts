import { describe, expect, it, vi } from 'vitest';

import { createMessageChannel } from '@patterns/behavioral/observer/observer-pattern.js';

describe('Observer / Pub-Sub Pattern', () => {
  it('publishes each message to every subscriber', () => {
    const channel = createMessageChannel();
    const firstSubscriber = vi.fn();
    const secondSubscriber = vi.fn();

    channel.subscribe(firstSubscriber);
    channel.subscribe(secondSubscriber);
    channel.publish('Order created');

    expect(firstSubscriber).toHaveBeenCalledWith('Order created');
    expect(secondSubscriber).toHaveBeenCalledWith('Order created');
  });

  it('stops notifying a subscriber after unsubscribe', () => {
    const channel = createMessageChannel();
    const subscriber = vi.fn();
    const unsubscribe = channel.subscribe(subscriber);

    unsubscribe();
    channel.publish('This message is ignored');

    expect(subscriber).not.toHaveBeenCalled();
  });
});
