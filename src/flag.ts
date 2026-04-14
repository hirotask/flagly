import { getConfig } from "./config/store";

export type WithBooleanFlag = (param:{
  key: string,
  defaultValue: boolean
}) => (func: any) => void;

export const withBooleanFlag: WithBooleanFlag = (param: {
  key: string,
  defaultValue: boolean
}) => (func: any) => {

  const config = getConfig();

  if (config.flagSource != null) {
    const flag = config.flagSource(param.key, param.defaultValue, config.baseEnv)

    if (flag) {
      func();
    }
  }
}

