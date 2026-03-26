/**
 * @aravi1008/ui — JS bundle config
 * Builds the theme switcher and utility helpers into ESM + CJS
 */
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default [
  // Theme switcher — ESM
  {
    input: resolve(__dirname, 'src/index.js'),
    output: { file: resolve(__dirname, 'dist/index.js'), format: 'es', sourcemap: true },
  },
  // Theme switcher — CJS
  {
    input: resolve(__dirname, 'src/index.js'),
    output: { file: resolve(__dirname, 'dist/index.cjs'), format: 'cjs', sourcemap: true, exports: 'named' },
  },
  // Interactive components — ESM
  {
    input: resolve(__dirname, 'src/components.js'),
    output: { file: resolve(__dirname, 'dist/components.js'), format: 'es', sourcemap: true },
  },
  // Interactive components — CJS
  {
    input: resolve(__dirname, 'src/components.js'),
    output: { file: resolve(__dirname, 'dist/components.cjs'), format: 'cjs', sourcemap: true, exports: 'named' },
  },
];
