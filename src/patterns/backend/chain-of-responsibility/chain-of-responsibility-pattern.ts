export type ChainHandler<Request, Response> = (request: Request) => Response | undefined;

export type ResponsibilityChain<Request, Response> = Readonly<{
  handle: (request: Request) => Response | undefined;
}>;

/**
 * Chain of Responsibility gives several handlers a chance to handle a request.
 * The first handler that returns a response ends the chain.
 */
export const createResponsibilityChain = <Request, Response>(
  handlers: readonly ChainHandler<Request, Response>[],
): ResponsibilityChain<Request, Response> => ({
  handle: (request: Request): Response | undefined => {
    for (const handler of handlers) {
      const response = handler(request);

      if (response !== undefined) {
        return response;
      }
    }

    return undefined;
  },
});
