export type ApplicationSettings = Readonly<{
  get: (key: string) => string | undefined;
  set: (key: string, value: string) => void;
}>;

/**
 * Singleton Pattern guarantees one shared instance and one access point to it.
 */
export class SettingsStore implements ApplicationSettings {
  private static instance: SettingsStore | undefined;

  private readonly values = new Map<string, string>();

  private constructor() {}

  static getInstance = (): SettingsStore => {
    if (SettingsStore.instance === undefined) {
      SettingsStore.instance = new SettingsStore();
    }

    return SettingsStore.instance;
  };

  get = (key: string): string | undefined => this.values.get(key);

  set = (key: string, value: string): void => {
    this.values.set(key, value);
  };
}
