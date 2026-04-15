import { Config } from '@flagly/core';
import { existsSync } from 'node:fs';
import path from 'node:path';

export function defineConfig(config: Config): Config {
  return config;
}

const configNames = ['flagly.config.js', 'flagly.config.cjs'];

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isConfig(value: unknown): value is Config {
  if (!isObject(value)) {
    return false;
  }

  if ('flagSource' in value && value.flagSource !== undefined && typeof value.flagSource !== 'function') {
    return false;
  }

  if ('baseEnv' in value && value.baseEnv !== undefined && !isObject(value.baseEnv)) {
    return false;
  }

  return true;
}

export function loadConfigSync(): Config {
  let configFilePath: string | undefined = configNames.find((fileName) => {
    const resolvedPath = path.resolve(process.cwd(), fileName);

    return existsSync(resolvedPath);
  });

  if (configFilePath == null) {
    throw new Error(`[flagly-node] Config file was not found.`);
  }

  const loaded: unknown = require(configFilePath);

  if (!isConfig(loaded)) {
    throw new Error(`[flagly-node] Invalid config file: ${configFilePath}`);
  }

  return loaded;
}
