import path from "node:path";
import type { FlagSource } from "./types"
import { existsSync } from "node:fs";
import { pathToFileURL } from "node:url";

export type Config = {
  flagSource?: FlagSource;
  baseEnv?: Map<string, unknown>;
}

export function defineConfig(config: Config): Config {
  return config;
}

const configNames = [
  "flagly.config.js",
  "flagly.config.mjs",
  "flagly.config.cjs",
  "flagly.config.ts"
]

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
  const resolvedPath = configPath
    ? path.resolve(process.cwd(), configPath)
    : findConfigPath();

  if (!resolvedPath) {
    return {};
  }

  const mod = await import(pathToFileURL(resolvedPath).href);
  return (mod.default ?? {}) as Config;

}
