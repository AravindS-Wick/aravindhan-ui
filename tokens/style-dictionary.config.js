import StyleDictionary from 'style-dictionary';
import { promises as fs } from 'fs';

const themes = ['light', 'dark', 'forest', 'ocean', 'professional', 'corporate'];

// ─── Base tokens config ────────────────────────────────────────────────────
const baseConfig = {
  source: ['tokens/base/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'av',
      buildPath: 'dist/tokens/',
      files: [
        {
          destination: 'base.css',
          format: 'css/variables',
          options: { selector: ':root' },
        },
      ],
    },
    scss: {
      transformGroup: 'scss',
      prefix: 'av',
      buildPath: 'dist/tokens/',
      files: [
        {
          destination: 'base.scss',
          format: 'scss/variables',
        },
      ],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/tokens/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
        },
      ],
    },
  },
};

// ─── Theme config factory ──────────────────────────────────────────────────
function themeConfig(theme) {
  return {
    source: [`tokens/themes/${theme}.json`],
    platforms: {
      css: {
        transformGroup: 'css',
        prefix: 'av',
        buildPath: 'dist/themes/',
        files: [
          {
            destination: `${theme}.css`,
            format: 'css/variables',
            options: {
              selector: `[data-av-theme="${theme}"]${theme === 'light' ? ', :root' : ''}`,
            },
          },
        ],
      },
      scss: {
        transformGroup: 'scss',
        prefix: 'av',
        buildPath: 'dist/themes/',
        files: [
          {
            destination: `_${theme}.scss`,
            format: 'scss/variables',
          },
        ],
      },
    },
  };
}

// ─── Build all ─────────────────────────────────────────────────────────────
async function build() {
  // Ensure output dirs exist
  await fs.mkdir('dist/tokens', { recursive: true });
  await fs.mkdir('dist/themes', { recursive: true });

  // Build base tokens
  const sdBase = new StyleDictionary(baseConfig);
  await sdBase.buildAllPlatforms();

  // Build each theme
  for (const theme of themes) {
    const sdTheme = new StyleDictionary(themeConfig(theme));
    await sdTheme.buildAllPlatforms();
  }

  // Generate combined variables.css (base + all themes)
  const baseCss = await fs.readFile('dist/tokens/base.css', 'utf8');
  const themeCss = await Promise.all(
    themes.map((t) => fs.readFile(`dist/themes/${t}.css`, 'utf8'))
  );

  const combined = [
    '/* @aravi1008/ui — CSS Custom Properties */',
    '/* Base tokens */',
    baseCss,
    '',
    '/* Theme tokens */',
    ...themeCss,
    '',
    '/* Dark mode auto-detection */',
    '@media (prefers-color-scheme: dark) {',
    '  :root:not([data-av-theme]) {',
    themeCss[1]  // dark theme variables without selector wrapper
      .replace(/\[data-av-theme="dark"\]\s*\{/, '')
      .replace(/\}$/, ''),
    '  }',
    '}',
  ].join('\n');

  await fs.writeFile('dist/tokens/variables.css', combined, 'utf8');

  // Generate combined variables.scss
  const baseScss = await fs.readFile('dist/tokens/base.scss', 'utf8');
  const themeScss = await Promise.all(
    themes.map((t) => fs.readFile(`dist/themes/_${t}.scss`, 'utf8'))
  );

  const combinedScss = [
    '// @aravi1008/ui — SCSS Variables',
    '// Base tokens',
    baseScss,
    '',
    '// Theme tokens (light is default)',
    themeScss[0],
  ].join('\n');

  await fs.writeFile('dist/tokens/variables.scss', combinedScss, 'utf8');

  process.stdout.write('✅ Tokens built successfully\n');
}

build().catch((err) => {
  process.stderr.write(`❌ Token build failed: ${err.message}\n`);
  process.exit(1);
});
