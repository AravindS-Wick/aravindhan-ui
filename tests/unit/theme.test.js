/**
 * @aravi1008/ui — Theme switcher unit tests
 */

import {
  setTheme,
  getTheme,
  toggleDarkMode,
  initTheme,
  watchOsTheme,
  themes,
  getCssVar,
  setCssVar,
} from '../../src/index.js';

// ── Mock element factory ───────────────────────────────────────────────────────
function makeMockEl() {
  return {
    _attrs: {},
    _styles: {},
    setAttribute(k, v) { this._attrs[k] = v; },
    getAttribute(k) { return this._attrs[k] || null; },
    style: {
      _props: {},
      setProperty(k, v) { this._props[k] = v; },
    },
  };
}

// ── themes list ───────────────────────────────────────────────────────────────

describe('themes list', () => {
  test('exports exactly 6 themes', () => {
    expect(themes).toHaveLength(6);
  });

  test('contains all expected theme names', () => {
    const expected = ['light', 'dark', 'forest', 'ocean', 'professional', 'corporate'];
    expected.forEach((t) => expect(themes).toContain(t));
  });
});

// ── setTheme ──────────────────────────────────────────────────────────────────

describe('setTheme', () => {
  test('sets data-av-theme attribute on target element', () => {
    const el = makeMockEl();
    setTheme('dark', { persist: false, target: el });
    expect(el._attrs['data-av-theme']).toBe('dark');
  });

  test('sets every valid theme without throwing', () => {
    const el = makeMockEl();
    themes.forEach((theme) => {
      expect(() => setTheme(theme, { persist: false, target: el })).not.toThrow();
      expect(el._attrs['data-av-theme']).toBe(theme);
    });
  });

  test('throws on unknown theme', () => {
    const el = makeMockEl();
    expect(() => setTheme('banana', { persist: false, target: el })).toThrow(/Unknown theme/);
    expect(() => setTheme('', { persist: false, target: el })).toThrow(/Unknown theme/);
  });

  test('error message lists valid themes', () => {
    const el = makeMockEl();
    try {
      setTheme('bad', { persist: false, target: el });
    } catch (e) {
      expect(e.message).toContain('light');
      expect(e.message).toContain('dark');
    }
  });

  test('persist: false does not call localStorage', () => {
    const el = makeMockEl();
    // In Node there's no localStorage — persist: false must not throw
    expect(() => setTheme('ocean', { persist: false, target: el })).not.toThrow();
  });

  test('returns undefined (no return value)', () => {
    const el = makeMockEl();
    const result = setTheme('light', { persist: false, target: el });
    expect(result).toBeUndefined();
  });
});

// ── getTheme ──────────────────────────────────────────────────────────────────

describe('getTheme', () => {
  test('returns current theme from element', () => {
    const el = makeMockEl();
    setTheme('forest', { persist: false, target: el });
    expect(getTheme(el)).toBe('forest');
  });

  test('returns "light" when no attribute set', () => {
    const el = { getAttribute: () => null };
    expect(getTheme(el)).toBe('light');
  });

  test('returns "light" when attribute is empty string', () => {
    const el = { getAttribute: () => '' };
    expect(getTheme(el)).toBe('light');
  });

  test('round-trips: set then get returns same value', () => {
    const el = makeMockEl();
    themes.forEach((theme) => {
      setTheme(theme, { persist: false, target: el });
      expect(getTheme(el)).toBe(theme);
    });
  });
});

// ── toggleDarkMode ────────────────────────────────────────────────────────────

describe('toggleDarkMode', () => {
  test('switches light → dark', () => {
    const el = makeMockEl();
    setTheme('light', { persist: false, target: el });
    toggleDarkMode({ persist: false, target: el });
    expect(getTheme(el)).toBe('dark');
  });

  test('switches dark → light', () => {
    const el = makeMockEl();
    setTheme('dark', { persist: false, target: el });
    toggleDarkMode({ persist: false, target: el });
    expect(getTheme(el)).toBe('light');
  });

  test('non-dark themes toggle to dark', () => {
    const el = makeMockEl();
    setTheme('forest', { persist: false, target: el });
    toggleDarkMode({ persist: false, target: el });
    expect(getTheme(el)).toBe('dark');
  });
});

// ── initTheme ─────────────────────────────────────────────────────────────────

describe('initTheme', () => {
  test('returns early (undefined) when document is not available', () => {
    // In Node, document is undefined — initTheme guards against this
    const result = initTheme('light');
    expect(result).toBeUndefined();
  });

  test('does not throw with any fallback value', () => {
    expect(() => initTheme('light')).not.toThrow();
    expect(() => initTheme('dark')).not.toThrow();
    expect(() => initTheme()).not.toThrow();
  });
});

// ── watchOsTheme ──────────────────────────────────────────────────────────────

describe('watchOsTheme', () => {
  test('returns a cleanup function even without window', () => {
    // In Node, window is undefined — must return a no-op function
    const cleanup = watchOsTheme();
    expect(typeof cleanup).toBe('function');
    expect(() => cleanup()).not.toThrow();
  });
});

// ── getCssVar ─────────────────────────────────────────────────────────────────

describe('getCssVar', () => {
  test('returns empty string when no document available', () => {
    const result = getCssVar('--av-theme-color-primary');
    expect(result).toBe('');
  });

  test('does not throw for any CSS var name', () => {
    expect(() => getCssVar('--av-spacing-md')).not.toThrow();
    expect(() => getCssVar('--nonexistent-var')).not.toThrow();
    expect(() => getCssVar('')).not.toThrow();
  });
});

// ── setCssVar ─────────────────────────────────────────────────────────────────

describe('setCssVar', () => {
  test('sets property on a mock element', () => {
    const el = makeMockEl();
    setCssVar('--av-color-primary', '#ff0000', el);
    expect(el.style._props['--av-color-primary']).toBe('#ff0000');
  });

  test('does not throw when no document available (no target)', () => {
    expect(() => setCssVar('--av-color-primary', '#ff0000')).not.toThrow();
  });

  test('handles multiple property sets', () => {
    const el = makeMockEl();
    setCssVar('--av-spacing-md', '16px', el);
    setCssVar('--av-radius-lg', '8px', el);
    expect(el.style._props['--av-spacing-md']).toBe('16px');
    expect(el.style._props['--av-radius-lg']).toBe('8px');
  });
});
