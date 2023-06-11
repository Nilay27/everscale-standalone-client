import __wbg_init, * as nt from 'nekoton-wasm';
import core from './core';

let clientInitializationStarted = false;
let notifyClientInitialized: { resolve: () => void; reject: () => void };
const initializationPromise: Promise<void> = new Promise<void>((resolve, reject) => {
  notifyClientInitialized = { resolve, reject };
});

core.ensureNekotonLoaded = (initInput?: nt.InitInput | Promise<nt.InitInput>): Promise<void> => {
  if (!clientInitializationStarted) {
    clientInitializationStarted = true;
    __wbg_init(initInput).then(notifyClientInitialized.resolve).catch(notifyClientInitialized.reject);
  }
  return initializationPromise;
};
core.nekoton = nt;
core.fetch = fetch;
core.debugLog = _nothing => {
  /* do nothing */
};

export * from './client';
