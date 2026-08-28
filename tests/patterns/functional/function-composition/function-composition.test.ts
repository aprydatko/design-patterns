import { describe, expect, it } from 'vitest';

import { compose } from '@patterns/functional/function-composition/function-composition.js';

describe('Function Composition Pattern', () => {
  it('applies functions from right to left as one operation', () => {
    const formatProductName = compose(
      (value: string) => value.replaceAll(' ', '-'),
      (value: string) => value.toLowerCase(),
      (value: string) => value.trim(),
    );

    expect(formatProductName('  Wireless Keyboard  ')).toBe('wireless-keyboard');
  });

  it('allows composed functions to be reused with different inputs', () => {
    const normalizeIdentifier = compose(
      (value: string) => value.replaceAll(' ', '_'),
      (value: string) => value.toLowerCase(),
      (value: string) => value.trim(),
    );

    expect(normalizeIdentifier(' Admin User ')).toBe('admin_user');
    expect(normalizeIdentifier(' Support Agent ')).toBe('support_agent');
  });
});
