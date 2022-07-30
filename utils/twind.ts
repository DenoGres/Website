import { IS_BROWSER } from '$fresh/runtime.ts';
import { Configuration, setup } from 'twind';
// import { tw, css } from 'twind/css'

export * from 'twind';
export const config: Configuration = {
  darkMode: 'class',
  mode: 'silent',
};
if (IS_BROWSER) setup(config);
