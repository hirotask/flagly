import { BooleanFlagDefinition, BooleanFlagSource, Config, FlagEnv } from './types';

export type BooleanFlagFunc = (
  definition: BooleanFlagDefinition,
) => (_target: Object, _propertyKey: string, descripter: PropertyDescriptor) => void;

export function createBooleanFlag(config: Config) {
  const flagSource: BooleanFlagSource = config.flagSource ?? ((_, defaultValue) => defaultValue);

  const baseEnv = config.baseEnv ?? {};

  return (definition: BooleanFlagDefinition) =>
    (_target: Object, _propertyKey: string, descripter: PropertyDescriptor): void => {
      const mergedEnv: FlagEnv = {
        ...baseEnv,
        ...(definition.env ?? {}),
      };

      const flag = flagSource(definition.key, definition.defaultValue, mergedEnv);

      const origin = descripter.value;

      descripter.value = function (...args: unknown[]) {
        if (flag) origin.apply(this, args);
      };
    };
}
