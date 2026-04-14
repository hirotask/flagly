import { loadConfig } from "./config";
import { setConfig } from "./config-store";

(() => {
  loadConfig().then((config) => {
    setConfig(config);
  }).catch((err) => {
    console.error(err);
  })
})
