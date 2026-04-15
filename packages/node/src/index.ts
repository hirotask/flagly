import { BooleanFlagFunc, createBooleanFlag, createWithBooleanFlag, withBooleanFlagFunc } from '@flagly/core';
import { loadConfigSync } from './config';

const config = loadConfigSync();

export const withBooleanFlag: withBooleanFlagFunc = createWithBooleanFlag(config);
export const booleanFlag: BooleanFlagFunc = createBooleanFlag(config);
