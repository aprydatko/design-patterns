import { describe, expect, it, vi } from 'vitest';

import { createInMemoryUserRepository } from '@patterns/architectural/repository/repository-pattern.js';
import { createUserService } from '@patterns/architectural/service-layer/service-layer-pattern.js';
import {
  createJsonUserView,
  createUserController,
} from '@patterns/architectural/mvc/mvc-pattern.js';

const createServiceWithAda = () => {
  const service = createUserService(createInMemoryUserRepository(), () => 'user-1');
  service.register({ name: 'Ada Lovelace', email: 'ada@example.com' });
  return service;
};

describe('MVC Pattern', () => {
  it('coordinates the model and view for a profile request', () => {
    const service = createServiceWithAda();
    const controller = createUserController(service, createJsonUserView());

    expect(controller.showProfile('user-1')).toEqual({
      status: 200,
      body: '{"userId":"user-1","displayName":"Ada Lovelace","emailAddress":"ada@example.com"}',
    });
  });

  it('delegates missing-resource presentation to the view', () => {
    const service = createServiceWithAda();
    const view = { renderNotFound: vi.fn(() => ({ status: 404, body: 'missing' })) };
    const controller = createUserController(service, {
      ...view,
      renderProfile: vi.fn(),
      renderProfiles: vi.fn(),
    });

    expect(controller.showProfile('missing-user')).toEqual({ status: 404, body: 'missing' });
    expect(view.renderNotFound).toHaveBeenCalledOnce();
  });

  it('keeps collection rendering in the view', () => {
    const service = createServiceWithAda();
    const view = createJsonUserView();
    const controller = createUserController(service, view);

    expect(controller.showProfiles()).toEqual({
      status: 200,
      body: '[{"userId":"user-1","displayName":"Ada Lovelace","emailAddress":"ada@example.com"}]',
    });
  });
});
