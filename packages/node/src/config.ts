import { Config } from '@flagly/core';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

export function defineConfig(config: Config): Config {
  return config;
}

const _require = createRequire(import.meta.url);

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

  return true;
}

export function loadConfigSync(): Config {
  const configFilePath = configNames
    .map((fileName) => path.resolve(process.cwd(), fileName))
    .find((resolvedPath) => existsSync(resolvedPath));

  if (configFilePath == null) {
    throw new Error(`[flagly-node] Config file was not found.`);
  }

  const loaded: unknown = _require(configFilePath);

  if (!isConfig(loaded)) {
    throw new Error(`[flagly-node] Invalid config file: ${configFilePath}`);
  }

  return loaded;
}
