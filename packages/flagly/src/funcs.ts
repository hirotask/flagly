import { AnyFunc, BooleanFlagSource, Config, FlagEnv, BooleanFlagDefinition } from './types';

export type withBooleanFlagFunc = (
  definition: BooleanFlagDefinition,
) => <T extends AnyFunc>(fn: T) => (...args: Parameters<T>) => ReturnType<T> | undefined;

export function createWithBooleanFlag(config: Config) {
  const flagSource: BooleanFlagSource = config.flagSource ?? ((_, defaultValue) => defaultValue);

  const baseEnv = config.baseEnv ?? {};

  return function withBooleanFlag(definition: BooleanFlagDefinition) {
    const mergedEnv: FlagEnv = {
      ...baseEnv,
      ...(definition.env ?? {}),
    };

    return function <T extends AnyFunc>(fn: T) {
      return function (...args: Parameters<T>): ReturnType<T> | undefined {
        const enabled = flagSource(definition.key, definition.defaultValue, mergedEnv);

        if (!enabled) {
          return undefined;
        }

        return fn(...args);
      };
    };
  };
}
