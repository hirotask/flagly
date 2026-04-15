import { BooleanFlagFunc, createBooleanFlag } from './decorator';
import { createWithBooleanFlag, withBooleanFlagFunc } from './funcs';
import { Config } from './types';

export type Flagly = {
  booleanFlag: BooleanFlagFunc;
  withBooleanFlag: withBooleanFlagFunc;
};

export function createFlaglyFromConfig(config: Config): Flagly {
  return {
    booleanFlag: createBooleanFlag(config),
    withBooleanFlag: createWithBooleanFlag(config),
  };
}
