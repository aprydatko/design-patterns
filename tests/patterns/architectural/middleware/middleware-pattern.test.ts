import { describe, expect, it } from 'vitest';

import {
  createMiddlewarePipeline,
  type Middleware,
} from '@patterns/architectural/middleware/middleware-pattern.js';

type RequestContext = {
  events: string[];
  authorized?: boolean;
};

describe('Middleware Pattern', () => {
  it('runs middleware in order around the terminal operation', async () => {
    const middleware: Middleware<RequestContext>[] = [
      async (context, next) => {
        context.events.push('before-auth');
        await next();
        context.events.push('after-auth');
      },
      async (context, next) => {
        context.events.push('before-log');
        await next();
        context.events.push('after-log');
      },
    ];
    const pipeline = createMiddlewarePipeline(middleware, (context) => {
      context.events.push('handler');
      return Promise.resolve();
    });
    const context: RequestContext = { events: [] };

    await pipeline.run(context);

    expect(context.events).toEqual([
      'before-auth',
      'before-log',
      'handler',
      'after-log',
      'after-auth',
    ]);
  });

  it('supports short-circuiting the chain', async () => {
    const pipeline = createMiddlewarePipeline<RequestContext>(
      [
        (context) => {
          context.authorized = false;
          context.events.push('rejected');
          return Promise.resolve();
        },
        (context) => {
          context.events.push('unreachable');
          return Promise.resolve();
        },
      ],
      (context) => {
        context.events.push('handler');
        return Promise.resolve();
      },
    );
    const context: RequestContext = { events: [] };

    await pipeline.run(context);

    expect(context).toEqual({ events: ['rejected'], authorized: false });
  });

  it('rejects calling next more than once from one middleware', async () => {
    const pipeline = createMiddlewarePipeline<RequestContext>([
      async (_context, next) => {
        await next();
        await next();
      },
    ]);

    await expect(pipeline.run({ events: [] })).rejects.toThrow('next() called multiple times');
  });
});
