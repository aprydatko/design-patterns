import { describe, expect, it } from 'vitest';

import {
  createResponsibilityChain,
  type ChainHandler,
} from '@patterns/backend/chain-of-responsibility/chain-of-responsibility-pattern.js';

type SupportRequest = { severity: number; subject: string };
type Assignment = { team: string };

describe('Chain of Responsibility Pattern', () => {
  it('returns the first response produced by a handler', () => {
    const handled: string[] = [];
    const handlers: ChainHandler<SupportRequest, Assignment>[] = [
      (request) => {
        handled.push('frontline');
        return request.severity <= 2 ? { team: 'frontline' } : undefined;
      },
      (request) => {
        handled.push('specialist');
        return request.severity <= 4 ? { team: 'specialist' } : undefined;
      },
    ];

    const chain = createResponsibilityChain(handlers);

    expect(chain.handle({ severity: 3, subject: 'billing' })).toEqual({ team: 'specialist' });
    expect(handled).toEqual(['frontline', 'specialist']);
  });

  it('stops evaluating handlers after a request is handled', () => {
    const chain = createResponsibilityChain<SupportRequest, Assignment>([
      () => ({ team: 'first-handler' }),
      () => {
        throw new Error('should not run');
      },
    ]);

    expect(chain.handle({ severity: 1, subject: 'login' })).toEqual({ team: 'first-handler' });
  });

  it('returns undefined when no handler can handle the request', () => {
    const chain = createResponsibilityChain<SupportRequest, Assignment>([
      () => undefined,
      () => undefined,
    ]);

    expect(chain.handle({ severity: 5, subject: 'outage' })).toBeUndefined();
  });
});
