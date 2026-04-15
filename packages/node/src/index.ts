import { BooleanFlagFunc, createBooleanFlag, createWithBooleanFlag, withBooleanFlagFunc } from '@flagly/core';
import { loadConfigSync } from './config';

let cachedBooleanFlag: ReturnType<typeof createBooleanFlag> | undefined;
let cachedWithBooleanFlag: ReturnType<typeof createWithBooleanFlag> | undefined;

export const booleanFlag: BooleanFlagFunc = ((definition) => {
  if (!cachedBooleanFlag) {
    cachedBooleanFlag = createBooleanFlag(loadConfigSync());
  }

  return cachedBooleanFlag(definition);
}) as BooleanFlagFunc;

export const withBooleanFlag: withBooleanFlagFunc = ((definition) => {
  if (!cachedWithBooleanFlag) {
    cachedWithBooleanFlag = createWithBooleanFlag(loadConfigSync());
  }

  return cachedWithBooleanFlag(definition);
}) as withBooleanFlagFunc;

export type { Config } from '@flagly/core';
