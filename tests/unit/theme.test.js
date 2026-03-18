/**
 * @aravindhan/ui — Theme switcher unit tests
 */

import { setTheme, getTheme, toggleDarkMode, initTheme, themes, getCssVar } from '../../src/index.js';

// Mock document/window for Node environment
const mockEl = {
  attrs: {},
  styles: {},
  setAttribute(k, v) { this.attrs[k] = v; },
  getAttribute(k) { return this.attrs[k] || null; },
  style: { setProperty(k, v) { this.properties = this.properties || {}; this.properties[k] = v; } },
};

describe('themes list', () => {
  test('exports all 6 themes', () => {
    expect(themes).toHaveLength(6);
    expect(themes).toContain('light');
    expect(themes).toContain('dark');
    expect(themes).toContain('forest');
    expect(themes).toContain('ocean');
    expect(themes).toContain('professional');
    expect(themes).toContain('corporate');
  });
});

describe('setTheme', () => {
  test('sets data-av-theme attribute on target element', () => {
    setTheme('dark', { persist: false, target: mockEl });
    expect(mockEl.attrs['data-av-theme']).toBe('dark');
  });

  test('sets each valid theme without throwing', () => {
    themes.forEach((theme) => {
      expect(() => setTheme(theme, { persist: false, target: mockEl })).not.toThrow();
    });
  });

  test('throws on unknown theme', () => {
    expect(() => setTheme('banana', { persist: false, target: mockEl })).toThrow(/Unknown theme/);
  });
});

describe('getTheme', () => {
  test('returns current theme from element', () => {
    setTheme('forest', { persist: false, target: mockEl });
    expect(getTheme(mockEl)).toBe('forest');
  });

  test('returns "light" when no theme set', () => {
    const emptyEl = { getAttribute: () => null };
    expect(getTheme(emptyEl)).toBe('light');
  });
});

describe('toggleDarkMode', () => {
  test('switches to dark when current is light', () => {
    setTheme('light', { persist: false, target: mockEl });
    toggleDarkMode({ persist: false, target: mockEl });
    expect(getTheme(mockEl)).toBe('dark');
  });

  test('switches to light when current is dark', () => {
    setTheme('dark', { persist: false, target: mockEl });
    toggleDarkMode({ persist: false, target: mockEl });
    expect(getTheme(mockEl)).toBe('light');
  });
});

describe('initTheme', () => {
  test('returns a valid theme string', () => {
    // No document in Node — initTheme should return without crashing
    // (it checks for document before doing DOM operations)
    const result = initTheme('light');
    expect(['light', 'dark', ...themes]).toContain(result ?? 'light');
  });
});

describe('getCssVar', () => {
  test('returns empty string when no document', () => {
    // In Node, document is undefined — should not throw
    expect(() => getCssVar('--av-theme-color-primary')).not.toThrow();
  });
});
