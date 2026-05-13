// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunc = (...args: any[]) => any;

export type FlagEnv = Record<string, unknown>;

export type Config = {
  flagSource?: BooleanFlagSource;
  baseEnv?: FlagEnv;
};

export type BooleanFlagDefinition = {
  key: string;
  defaultValue: boolean;
  env?: FlagEnv;
};

export type BooleanFlagSource = (key: string, defaultValue: boolean, env?: FlagEnv) => boolean;

export type FlagType = 'Ops' | 'Experiment' | 'Permission';
