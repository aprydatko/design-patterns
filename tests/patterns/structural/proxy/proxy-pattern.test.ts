import { describe, expect, it, vi } from 'vitest';

import {
  CachingProfileProxy,
  UserProfileService,
} from '@patterns/structural/proxy/proxy-pattern.js';

describe('Proxy Pattern', () => {
  it('caches repeated requests while preserving the service contract', () => {
    const profile = { id: 'user-1', name: 'Ada Lovelace' };
    const service = new UserProfileService(new Map([['user-1', profile]]));
    const getProfile = vi.spyOn(service, 'getProfile');
    const proxy = new CachingProfileProxy(service);

    expect(proxy.getProfile('user-1')).toEqual(profile);
    expect(proxy.getProfile('user-1')).toEqual(profile);
    expect(getProfile).toHaveBeenCalledTimes(1);
  });

  it('also caches missing profiles to avoid repeated lookups', () => {
    const service = new UserProfileService(new Map());
    const getProfile = vi.spyOn(service, 'getProfile');
    const proxy = new CachingProfileProxy(service);

    expect(proxy.getProfile('missing-user')).toBeUndefined();
    expect(proxy.getProfile('missing-user')).toBeUndefined();
    expect(getProfile).toHaveBeenCalledTimes(1);
  });
});
