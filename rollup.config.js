import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default [
  // ── CSS bundle (optimized + autoprefixed) ──────────────────────────────
  {
    input: resolve(__dirname, 'src/index.scss'),
    output: {
      file: resolve(__dirname, 'dist/index.css.js'),
      format: 'es',
    },
    external: ['*'],
    plugins: [
      postcss({
        extract: resolve(__dirname, 'dist/index.css'),
        minimize: true,
        sourceMap: false,
        use: ['sass'],
        extensions: ['.css', '.scss', '.sass'],
        plugins: [
          autoprefixer(),
          cssnano({
            preset: ['default', { discardComments: { removeAll: true } }],
          }),
        ],
      }),
    ],
  },
];
