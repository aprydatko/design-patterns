import { describe, expect, it } from 'vitest';

import { ChatRoom, User } from '@patterns/behavioral/mediator/mediator-pattern.js';

describe('Mediator Pattern', () => {
  it('broadcasts messages through the mediator', () => {
    const room = new ChatRoom();
    const ada = new User('Ada', room);
    const grace = new User('Grace', room);
    const alan = new User('Alan', room);
    room.register(ada);
    room.register(grace);
    room.register(alan);

    ada.send('Hello everyone');

    expect(ada.messages).toEqual([]);
    expect(grace.messages).toEqual(['Ada: Hello everyone']);
    expect(alan.messages).toEqual(['Ada: Hello everyone']);
  });

  it('keeps later messages isolated from the sender', () => {
    const room = new ChatRoom();
    const ada = new User('Ada', room);
    const grace = new User('Grace', room);
    room.register(ada);
    room.register(grace);

    grace.send('Hi Ada');

    expect(ada.messages).toEqual(['Grace: Hi Ada']);
    expect(grace.messages).toEqual([]);
  });
});
