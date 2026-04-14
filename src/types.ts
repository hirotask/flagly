export type BooleanFlagSource = (key: string, defaultValue: boolean, env?: Map<string, unknown>) => boolean;

export type AsyncBooleanFlagSource = (key: string, defaultValue: boolean, env?: Map<string, unknown>) => Promise<boolean>;

export type FlagSource = BooleanFlagSource | AsyncBooleanFlagSource;

export type FlagType = "Ops" | "Experiment" | "Permission";
