/**
 * @aravi1008/ui — Icons build output tests
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../..');

describe('Icon sprite build output', () => {
  test('dist/icons/sprite.svg exists', () => {
    expect(existsSync(resolve(ROOT, 'dist/icons/sprite.svg'))).toBe(true);
  });

  test('sprite.svg contains valid SVG structure', () => {
    const sprite = readFileSync(resolve(ROOT, 'dist/icons/sprite.svg'), 'utf8');
    expect(sprite).toContain('<svg');
    expect(sprite).toContain('<symbol');
    expect(sprite).toContain('</svg>');
  });

  test('sprite.svg contains at least 40 icon symbols', () => {
    const sprite = readFileSync(resolve(ROOT, 'dist/icons/sprite.svg'), 'utf8');
    const symbolCount = (sprite.match(/<symbol/g) || []).length;
    expect(symbolCount).toBeGreaterThanOrEqual(40);
  });

  test('each icon symbol has an id attribute', () => {
    const sprite = readFileSync(resolve(ROOT, 'dist/icons/sprite.svg'), 'utf8');
    const symbols = sprite.match(/<symbol[^>]*>/g) || [];
    symbols.forEach((sym) => {
      expect(sym).toMatch(/id="[^"]+"/);
    });
  });

  test('each icon symbol has a viewBox attribute', () => {
    const sprite = readFileSync(resolve(ROOT, 'dist/icons/sprite.svg'), 'utf8');
    const symbols = sprite.match(/<symbol[^>]*>/g) || [];
    symbols.forEach((sym) => {
      expect(sym).toMatch(/viewBox="[^"]+"/);
    });
  });

  test('common icons are present in sprite', () => {
    const sprite = readFileSync(resolve(ROOT, 'dist/icons/sprite.svg'), 'utf8');
    const required = ['search', 'close', 'check', 'menu', 'user', 'settings', 'sun', 'moon'];
    required.forEach((name) => {
      expect(sprite).toContain(`id="${name}"`);
    });
  });

  test('individual SVG files are copied to dist/icons/', () => {
    const svgFiles = readdirSync(resolve(ROOT, 'dist/icons')).filter((f) => f.endsWith('.svg') && f !== 'sprite.svg');
    expect(svgFiles.length).toBeGreaterThanOrEqual(40);
  });
});

describe('Icon source files', () => {
  test('icons/svg/ source directory exists', () => {
    expect(existsSync(resolve(ROOT, 'icons/svg'))).toBe(true);
  });

  test('has at least 40 source SVG files', () => {
    const files = readdirSync(resolve(ROOT, 'icons/svg')).filter((f) => f.endsWith('.svg'));
    expect(files.length).toBeGreaterThanOrEqual(40);
  });
});
