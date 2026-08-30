import { describe, expect, it, vi } from 'vitest';

import {
  createEmailFormController,
  renderControlledEmailInput,
} from '@patterns/architectural/controlled-components/controlled-components-pattern.js';

describe('Controlled Components Pattern', () => {
  it('keeps the parent as the single source of truth', () => {
    const controller = createEmailFormController();
    const input = controller.render();

    input.change('ada@example.com');

    expect(controller.getValue()).toBe('ada@example.com');
    expect(controller.render().value).toBe('ada@example.com');
  });

  it('validates before submitting and clears the error on change', () => {
    const onSubmit = vi.fn();
    const controller = createEmailFormController(renderControlledEmailInput, onSubmit);

    controller.submit();
    expect(controller.render()).toMatchObject({ hasError: true, error: 'Email is required' });
    expect(onSubmit).not.toHaveBeenCalled();

    controller.change(' ada@example.com ');
    expect(controller.render()).toMatchObject({ value: ' ada@example.com ', hasError: false });
    controller.submit();
    expect(onSubmit).toHaveBeenCalledWith('ada@example.com');
  });
});
