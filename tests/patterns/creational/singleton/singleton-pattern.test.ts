import { describe, expect, it } from 'vitest';

import { SettingsStore } from '@patterns/creational/singleton/singleton-pattern.js';

describe('Singleton Pattern', () => {
  it('returns the same instance from every access point', () => {
    const firstStore = SettingsStore.getInstance();
    const secondStore = SettingsStore.getInstance();

    expect(firstStore).toBe(secondStore);
  });

  it('shares state through the singleton instance', () => {
    const firstStore = SettingsStore.getInstance();
    const secondStore = SettingsStore.getInstance();

    firstStore.set('singleton-test-mode', 'enabled');

    expect(secondStore.get('singleton-test-mode')).toBe('enabled');
  });
});
