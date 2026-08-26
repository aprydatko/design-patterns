export type Clock = Readonly<{
  now: () => Date;
}>;

export type UserDirectory = Readonly<{
  findName: (userId: string) => string | undefined;
}>;

export type WelcomeService = Readonly<{
  createMessage: (userId: string) => string;
}>;

export const systemClock: Clock = {
  now: (): Date => new Date(),
};

/**
 * Dependency Injection supplies a service's collaborators from the outside
 * instead of making the service construct them internally.
 */
export const createWelcomeService = (
  directory: UserDirectory,
  clock: Clock = systemClock,
): WelcomeService => ({
  createMessage: (userId: string): string => {
    const name = directory.findName(userId);

    if (name === undefined) {
      return 'User not found';
    }

    const date = clock.now().toISOString().slice(0, 10);
    return `Welcome, ${name}! Today is ${date}.`;
  },
});
