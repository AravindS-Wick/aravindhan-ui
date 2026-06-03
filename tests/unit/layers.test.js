/**
 * @aravi1008/ui — CSS Cascade Layers tests
 * Verifies that built CSS contains @layer declarations in the correct order.
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distCss = resolve(__dirname, '../../dist/index.css');
const srcLayers = resolve(__dirname, '../../src/base/_layers.scss');

describe('CSS Cascade Layers', () => {
  test('src/base/_layers.scss exists', () => {
    expect(existsSync(srcLayers)).toBe(true);
  });

  test('dist/index.css exists (build has been run)', () => {
    expect(existsSync(distCss)).toBe(true);
  });

  test('dist/index.css contains @layer declaration with correct order', () => {
    const css = readFileSync(distCss, 'utf8');
    // The layer order declaration must appear before any layer block
    expect(css).toMatch(/@layer\s+aravi1008\.tokens,\s*aravi1008\.base,\s*aravi1008\.components,\s*aravi1008\.utilities/);
  });

  test('dist/index.css contains aravi1008.tokens layer block', () => {
    const css = readFileSync(distCss, 'utf8');
    expect(css).toMatch(/@layer\s+aravi1008\.tokens\s*\{/);
  });

  test('dist/index.css contains aravi1008.base layer block', () => {
    const css = readFileSync(distCss, 'utf8');
    expect(css).toMatch(/@layer\s+aravi1008\.base\s*\{/);
  });

  test('dist/index.css contains aravi1008.components layer block', () => {
    const css = readFileSync(distCss, 'utf8');
    expect(css).toMatch(/@layer\s+aravi1008\.components\s*\{/);
  });

  test('dist/index.css contains aravi1008.utilities layer block', () => {
    const css = readFileSync(distCss, 'utf8');
    expect(css).toMatch(/@layer\s+aravi1008\.utilities\s*\{/);
  });

  test('layer declaration appears before any layer block', () => {
    const css = readFileSync(distCss, 'utf8');
    const declarationIndex = css.search(/@layer\s+aravi1008\.tokens,/);
    const firstBlockIndex = css.search(/@layer\s+aravi1008\.\w+\s*\{/);
    expect(declarationIndex).toBeGreaterThanOrEqual(0);
    expect(firstBlockIndex).toBeGreaterThan(declarationIndex);
  });
});
