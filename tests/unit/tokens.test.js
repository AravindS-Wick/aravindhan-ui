/**
 * @aravi1008/ui — Token build output tests
 * These run after `npm run build:tokens` has generated dist/tokens/
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../..');

describe('Token build output', () => {
  test('dist/tokens/base.css exists after build', () => {
    expect(existsSync(resolve(ROOT, 'dist/tokens/base.css'))).toBe(true);
  });

  test('dist/tokens/variables.css exists after build', () => {
    expect(existsSync(resolve(ROOT, 'dist/tokens/variables.css'))).toBe(true);
  });

  test('dist/tokens/tokens.js exists after build', () => {
    expect(existsSync(resolve(ROOT, 'dist/tokens/tokens.js'))).toBe(true);
  });

  test('base.css contains --av- prefixed custom properties', () => {
    const css = readFileSync(resolve(ROOT, 'dist/tokens/base.css'), 'utf8');
    expect(css).toMatch(/--av-/);
  });

  test('variables.css contains all 6 theme selectors', () => {
    const css = readFileSync(resolve(ROOT, 'dist/tokens/variables.css'), 'utf8');
    const themes = ['light', 'dark', 'forest', 'ocean', 'professional', 'corporate'];
    themes.forEach((theme) => {
      expect(css).toContain(`data-av-theme="${theme}"`);
    });
  });
});

describe('Theme files', () => {
  const themes = ['light', 'dark', 'forest', 'ocean', 'professional', 'corporate'];

  themes.forEach((theme) => {
    test(`dist/themes/${theme}.css exists after build`, () => {
      expect(existsSync(resolve(ROOT, `dist/themes/${theme}.css`))).toBe(true);
    });
  });
});
