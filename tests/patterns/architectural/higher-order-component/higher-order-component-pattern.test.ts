import { describe, expect, it } from 'vitest';

import { createInMemoryUserRepository } from '@patterns/architectural/repository/repository-pattern.js';
import { createUserService } from '@patterns/architectural/service-layer/service-layer-pattern.js';
import {
  renderUserDetails,
  withUser,
} from '@patterns/architectural/higher-order-component/higher-order-component-pattern.js';

describe('Higher-Order Component Pattern', () => {
  it('injects mapped data into the wrapped component', () => {
    const service = createUserService(createInMemoryUserRepository(), () => 'user-1');
    service.register({ name: 'Ada Lovelace', email: 'ADA@example.com' });
    const enhancedDetails = withUser(service, renderUserDetails);

    expect(enhancedDetails({ userId: 'user-1', heading: 'Profile' })).toEqual({
      heading: 'Profile',
      displayName: 'Ada Lovelace',
      email: 'ada@example.com',
    });
  });

  it('handles missing injected data without rendering the wrapped component', () => {
    const service = createUserService(createInMemoryUserRepository());
    const enhancedDetails = withUser(service, renderUserDetails);

    expect(enhancedDetails({ userId: 'missing-user', heading: 'Profile' })).toEqual({
      error: 'User not found',
    });
  });
});
