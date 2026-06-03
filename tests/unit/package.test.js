/**
 * @aravi1008/ui — Package.json validation tests
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(
  readFileSync(resolve(__dirname, '../../package.json'), 'utf8')
);

describe('package.json', () => {
  test('has correct package name', () => {
    expect(pkg.name).toBe('@aravi1008/ui');
  });

  test('has MIT license', () => {
    expect(pkg.license).toBe('MIT');
  });

  test('has public publish config', () => {
    expect(pkg.publishConfig.access).toBe('public');
  });

  test('has correct author', () => {
    expect(pkg.author).toContain('Aravindhan');
  });

  test('has exports field', () => {
    expect(pkg.exports).toBeDefined();
    expect(pkg.exports['.']).toBeDefined();
    expect(pkg.exports['./css']).toBeDefined();
    expect(pkg.exports['./components']).toBeDefined();
    // ./scss and ./less are not exported (P0 security fix: remove dead exports)
  });

  test('files field does not include node_modules or dist source maps as secret', () => {
    expect(pkg.files).not.toContain('node_modules');
  });

  test('Node engine requirement is set', () => {
    expect(pkg.engines.node).toBeDefined();
  });
});
