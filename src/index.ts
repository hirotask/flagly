import { loadConfig } from "./config";
import { setConfig } from "./config/store";

(() => {
  loadConfig().then((config) => {
    setConfig(config);
  }).catch((err) => {
    console.error(err);
  })
})

export * from "./config";
export * from "./decorator";
export * from "./flag.ts";
export type {
  BooleanFlagSource,
  AsyncBooleanFlagSource,
  FlagSource,
} from "./types";
