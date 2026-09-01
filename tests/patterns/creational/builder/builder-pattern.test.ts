import { describe, expect, it } from 'vitest';

import { UserProfileBuilder } from '@patterns/creational/builder/builder-pattern.js';

describe('Builder Pattern', () => {
  it('builds an immutable profile from incremental configuration', () => {
    const profile = new UserProfileBuilder()
      .setUsername('ada')
      .setEmail('ada@example.com')
      .setDisplayName('Ada Lovelace')
      .setBio('A mathematician')
      .addInterest('programming')
      .addInterest('poetry')
      .build();

    expect(profile).toEqual({
      username: 'ada',
      email: 'ada@example.com',
      displayName: 'Ada Lovelace',
      bio: 'A mathematician',
      interests: ['programming', 'poetry'],
    });
    expect(Object.isFrozen(profile)).toBe(true);
    expect(Object.isFrozen(profile.interests)).toBe(true);
  });

  it('validates required fields at build time', () => {
    expect(() => new UserProfileBuilder().setUsername('ada').build()).toThrow(
      'Username and email are required to build a user profile',
    );
  });
});
