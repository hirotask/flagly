import { getConfig } from "./config/store";


export type MethodBooleanFlag = (param: {
  key: string,
  defaultValue: boolean
}) => (target: any, name: string, descripter: PropertyDescriptor) => void;

export const booleanFlag: MethodBooleanFlag = (param: {
  key: string,
  defaultValue: boolean
}) => (_target: Object, _propertyKey: string, descripter: PropertyDescriptor) => {
  const origin = descripter.value;

  descripter.value = (...args: unknown[]) => {
    const config = getConfig();

    if (config.flagSource != null) {
      const flag = config.flagSource(param.key, param.defaultValue, config.baseEnv)

      if (flag) {
        origin.apply(this, args);
      }
    }
  }
}
