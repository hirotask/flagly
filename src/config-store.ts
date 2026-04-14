import { Config } from "./config";

let configRef: Config | null = null;

export function setConfig(config: Config): void {
  configRef = config;
}

export function getConfig(): Config {
  if (!configRef) {
    throw new Error("Config has not been initialized");
  }

  return configRef;
}
