/**
 * @aravi1008/ui — JS bundle config
 * Builds the theme switcher and utility helpers into ESM + CJS
 */
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default [
  // ESM
  {
    input: resolve(__dirname, 'src/index.js'),
    output: {
      file: resolve(__dirname, 'dist/index.js'),
      format: 'es',
      sourcemap: true,
    },
  },
  // CJS (for require() users)
  {
    input: resolve(__dirname, 'src/index.js'),
    output: {
      file: resolve(__dirname, 'dist/index.cjs'),
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
  },
];
