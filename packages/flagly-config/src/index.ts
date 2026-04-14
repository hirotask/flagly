import { BooleanFlagFunc, Config, createBooleanFlag, createWithBooleanFlag, withBooleanFlagFunc } from 'flagly';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

type Flagly = {
  booleanFlag: BooleanFlagFunc;
  withBooleanFlag: withBooleanFlagFunc;
};

export function defineConfig(config: Config): Config {
  return config;
}

export function createFlaglyFromConfig(config: Config): Flagly {
  return {
    booleanFlag: createBooleanFlag(config),
    withBooleanFlag: createWithBooleanFlag(config),
  };
}

const configNames = ['flagly.config.js', 'flagly.config.mjs', 'flagly.config.cjs', 'flagly.config.ts'];

export function findConfigPath(): string | null {
  const cwd = process.cwd();

  for (const name of configNames) {
    const fullPath = path.join(cwd, name);
    if (existsSync(fullPath)) {
      return fullPath;
    }
  }

  return null;
}

export async function loadConfig(configPath?: string): Promise<Config> {
  const resolvedPath = configPath ? path.resolve(process.cwd(), configPath) : findConfigPath();

  if (!resolvedPath) {
    return {};
  }

  const mod = await import(pathToFileURL(resolvedPath).href);
  return (mod.default ?? {}) as Config;
}
