import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default [
  // ── Full bundle (unminified + autoprefixed) ──────────────────────────────
  {
    input: resolve(__dirname, 'src/index.scss'),
    output: {
      file: resolve(__dirname, 'dist/index.js'),
      format: 'es',
    },
    plugins: [
      postcss({
        extract: resolve(__dirname, 'dist/index.css'),
        minimize: false,
        sourceMap: true,
        use: ['sass'],
        extensions: ['.css', '.scss', '.sass'],
        plugins: [autoprefixer()],
      }),
    ],
  },
  // ── Minified bundle ────────────────────────────────────────────────────────
  {
    input: resolve(__dirname, 'src/index.scss'),
    output: {
      file: resolve(__dirname, 'dist/index.min.js'),
      format: 'es',
    },
    plugins: [
      postcss({
        extract: resolve(__dirname, 'dist/index.min.css'),
        minimize: false,
        sourceMap: false,
        use: ['sass'],
        extensions: ['.css', '.scss', '.sass'],
        plugins: [
          autoprefixer(),
          cssnano({ preset: ['default', { discardComments: { removeAll: true } }] }),
        ],
      }),
    ],
  },
];
