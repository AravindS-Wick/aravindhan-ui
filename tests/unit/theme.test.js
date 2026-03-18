/**
 * @aravi1008/ui — Theme switcher unit tests
 * Targets ≥85% coverage across all branches, functions, lines, statements.
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
  _env,
  _rateLimiter,
} from '../../src/index.js';

// ── Mock element factory ───────────────────────────────────────────────────────

function makeMockEl() {
  return {
    _attrs: {},
    setAttribute(k, v) { this._attrs[k] = v; },
    getAttribute(k) { return this._attrs[k] || null; },
    style: {
      _props: {},
      setProperty(k, v) { this._props[k] = v; },
    },
  };
}

function makeMockDocument(el) {
  return { documentElement: el };
}

function makeMockLocalStorage(initial = {}) {
  const store = { ...initial };
  return {
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = v; },
    _store: store,
  };
}

function makeMockWindow(prefersDark = false, hasMatchMedia = true) {
  if (!hasMatchMedia) return {};
  const listeners = [];
  return {
    matchMedia: (query) => ({
      matches: query.includes('dark') ? prefersDark : false,
      addEventListener: (_evt, fn) => listeners.push(fn),
      removeEventListener: (_evt, fn) => {
        const idx = listeners.indexOf(fn);
        if (idx !== -1) listeners.splice(idx, 1);
      },
      _listeners: listeners,
      _fire: (matches) => listeners.forEach((fn) => fn({ matches })),
    }),
  };
}

// Reset env to no-DOM (Node default) and clear rate limiter before each test
beforeEach(() => {
  _env.getDocument = () => null;
  _env.getLocalStorage = () => null;
  _env.getWindow = () => null;
  _rateLimiter.reset();
});

// ── themes list ───────────────────────────────────────────────────────────────

describe('themes list', () => {
  test('exports exactly 6 themes', () => {
    expect(themes).toHaveLength(6);
  });

  test('contains all expected theme names', () => {
    ['light', 'dark', 'forest', 'ocean', 'professional', 'corporate'].forEach((t) => {
      expect(themes).toContain(t);
    });
  });

  test('is a frozen/read reference — no extra entries', () => {
    expect(themes.every((t) => typeof t === 'string')).toBe(true);
  });
});

// ── setTheme ──────────────────────────────────────────────────────────────────

describe('setTheme', () => {
  test('sets data-av-theme on a provided target element', () => {
    const el = makeMockEl();
    setTheme('dark', { persist: false, target: el });
    expect(el._attrs['data-av-theme']).toBe('dark');
  });

  test('sets every valid theme without throwing', () => {
    const el = makeMockEl();
    themes.forEach((theme) => {
      _rateLimiter.reset();
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
    try {
      setTheme('bad', { persist: false, target: makeMockEl() });
    } catch (e) {
      expect(e.message).toContain('light');
      expect(e.message).toContain('dark');
    }
  });

  test('persist: false never calls localStorage even when available', () => {
    const ls = makeMockLocalStorage();
    _env.getLocalStorage = () => ls;
    const el = makeMockEl();
    setTheme('ocean', { persist: false, target: el });
    expect(ls._store['av-theme']).toBeUndefined();
  });

  test('persist: true (default) writes to localStorage when available', () => {
    const ls = makeMockLocalStorage();
    _env.getLocalStorage = () => ls;
    const el = makeMockEl();
    setTheme('forest', { target: el }); // persist defaults to true
    expect(ls._store['av-theme']).toBe('forest');
  });

  test('persist: true does not throw when localStorage is null', () => {
    _env.getLocalStorage = () => null;
    const el = makeMockEl();
    expect(() => setTheme('dark', { target: el })).not.toThrow();
  });

  test('uses document.documentElement when no target given and doc available', () => {
    const el = makeMockEl();
    _env.getDocument = () => makeMockDocument(el);
    setTheme('professional', { persist: false });
    expect(el._attrs['data-av-theme']).toBe('professional');
  });

  test('returns undefined when no target and no document', () => {
    _env.getDocument = () => null;
    const result = setTheme('light', { persist: false });
    expect(result).toBeUndefined();
  });

  test('returns undefined (no return value) on success', () => {
    const el = makeMockEl();
    const result = setTheme('light', { persist: false, target: el });
    expect(result).toBeUndefined();
  });
});

// ── getTheme ──────────────────────────────────────────────────────────────────

describe('getTheme', () => {
  test('returns current theme from provided element', () => {
    const el = makeMockEl();
    setTheme('forest', { persist: false, target: el });
    expect(getTheme(el)).toBe('forest');
  });

  test('returns "light" when no attribute set on element', () => {
    expect(getTheme({ getAttribute: () => null })).toBe('light');
  });

  test('returns "light" when attribute is empty string', () => {
    expect(getTheme({ getAttribute: () => '' })).toBe('light');
  });

  test('returns "light" when no target and no document', () => {
    _env.getDocument = () => null;
    expect(getTheme()).toBe('light');
  });

  test('reads from document.documentElement when no target given and doc available', () => {
    const el = makeMockEl();
    el.setAttribute('data-av-theme', 'corporate');
    _env.getDocument = () => makeMockDocument(el);
    expect(getTheme()).toBe('corporate');
  });

  test('round-trips: set then get returns same value', () => {
    const el = makeMockEl();
    themes.forEach((theme) => {
      _rateLimiter.reset();
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
    _rateLimiter.reset();
    toggleDarkMode({ persist: false, target: el });
    expect(getTheme(el)).toBe('dark');
  });

  test('switches dark → light', () => {
    const el = makeMockEl();
    setTheme('dark', { persist: false, target: el });
    _rateLimiter.reset();
    toggleDarkMode({ persist: false, target: el });
    expect(getTheme(el)).toBe('light');
  });

  test('non-dark themes toggle to dark', () => {
    const el = makeMockEl();
    ['forest', 'ocean', 'professional', 'corporate'].forEach((theme) => {
      _rateLimiter.reset();
      setTheme(theme, { persist: false, target: el });
      _rateLimiter.reset();
      toggleDarkMode({ persist: false, target: el });
      expect(getTheme(el)).toBe('dark');
    });
  });
});

// ── initTheme ─────────────────────────────────────────────────────────────────

describe('initTheme', () => {
  test('returns undefined when document is not available (Node env)', () => {
    _env.getDocument = () => null;
    expect(initTheme('light')).toBeUndefined();
  });

  test('does not throw when document not available', () => {
    expect(() => initTheme()).not.toThrow();
    expect(() => initTheme('dark')).not.toThrow();
  });

  test('uses stored valid theme from localStorage', () => {
    const el = makeMockEl();
    _env.getDocument = () => makeMockDocument(el);
    _env.getLocalStorage = () => makeMockLocalStorage({ 'av-theme': 'ocean' });
    const result = initTheme('light');
    expect(result).toBe('ocean');
    expect(el._attrs['data-av-theme']).toBe('ocean');
  });

  test('ignores stored value that is not a valid theme', () => {
    const el = makeMockEl();
    _env.getDocument = () => makeMockDocument(el);
    _env.getLocalStorage = () => makeMockLocalStorage({ 'av-theme': 'banana' });
    _env.getWindow = () => makeMockWindow(false);
    const result = initTheme('forest');
    expect(result).toBe('forest');
    expect(el._attrs['data-av-theme']).toBe('forest');
  });

  test('ignores null localStorage item', () => {
    const el = makeMockEl();
    _env.getDocument = () => makeMockDocument(el);
    _env.getLocalStorage = () => makeMockLocalStorage({}); // getItem returns null
    _env.getWindow = () => makeMockWindow(false);
    const result = initTheme('corporate');
    expect(result).toBe('corporate');
  });

  test('uses dark when OS prefers dark and no stored theme', () => {
    const el = makeMockEl();
    _env.getDocument = () => makeMockDocument(el);
    _env.getLocalStorage = () => null;
    _env.getWindow = () => makeMockWindow(true);
    const result = initTheme('light');
    expect(result).toBe('dark');
    expect(el._attrs['data-av-theme']).toBe('dark');
  });

  test('uses fallback when OS does not prefer dark and no stored theme', () => {
    const el = makeMockEl();
    _env.getDocument = () => makeMockDocument(el);
    _env.getLocalStorage = () => null;
    _env.getWindow = () => makeMockWindow(false);
    const result = initTheme('professional');
    expect(result).toBe('professional');
    expect(el._attrs['data-av-theme']).toBe('professional');
  });

  test('falls back to "light" when fallback is not a valid theme', () => {
    const el = makeMockEl();
    _env.getDocument = () => makeMockDocument(el);
    _env.getLocalStorage = () => null;
    _env.getWindow = () => makeMockWindow(false);
    const result = initTheme('not-a-theme');
    expect(result).toBe('light');
  });

  test('works when window has no matchMedia', () => {
    const el = makeMockEl();
    _env.getDocument = () => makeMockDocument(el);
    _env.getLocalStorage = () => null;
    _env.getWindow = () => makeMockWindow(false, false); // no matchMedia
    const result = initTheme('dark');
    expect(result).toBe('dark');
  });

  test('works when window is null', () => {
    const el = makeMockEl();
    _env.getDocument = () => makeMockDocument(el);
    _env.getLocalStorage = () => null;
    _env.getWindow = () => null;
    const result = initTheme('dark');
    expect(result).toBe('dark');
  });
});

// ── watchOsTheme ──────────────────────────────────────────────────────────────

describe('watchOsTheme', () => {
  test('returns a no-op cleanup function when window is not available', () => {
    _env.getWindow = () => null;
    const cleanup = watchOsTheme();
    expect(typeof cleanup).toBe('function');
    expect(() => cleanup()).not.toThrow();
  });

  test('returns a no-op cleanup function when window has no matchMedia', () => {
    _env.getWindow = () => ({});
    const cleanup = watchOsTheme();
    expect(typeof cleanup).toBe('function');
    expect(() => cleanup()).not.toThrow();
  });

  test('registers change listener and fires callback on OS dark mode change', () => {
    const el = makeMockEl();
    _env.getDocument = () => makeMockDocument(el);
    const win = makeMockWindow(false);
    _env.getWindow = () => win;
    const mq = win.matchMedia('(prefers-color-scheme: dark)');

    const calls = [];
    watchOsTheme((t) => calls.push(t));

    mq._fire(true); // OS switches to dark
    expect(calls).toEqual(['dark']);
    expect(el._attrs['data-av-theme']).toBe('dark');
  });

  test('fires light theme when OS switches back to light', () => {
    const el = makeMockEl();
    _env.getDocument = () => makeMockDocument(el);
    const win = makeMockWindow(true);
    _env.getWindow = () => win;
    const mq = win.matchMedia('(prefers-color-scheme: dark)');

    const calls = [];
    watchOsTheme((t) => calls.push(t));

    mq._fire(false); // OS switches to light
    expect(calls).toEqual(['light']);
    expect(el._attrs['data-av-theme']).toBe('light');
  });

  test('works without a callback (no error when callback undefined)', () => {
    const el = makeMockEl();
    _env.getDocument = () => makeMockDocument(el);
    const win = makeMockWindow(false);
    _env.getWindow = () => win;
    const mq = win.matchMedia('(prefers-color-scheme: dark)');

    watchOsTheme(); // no callback
    expect(() => mq._fire(true)).not.toThrow();
  });

  test('cleanup function removes the event listener', () => {
    const win = makeMockWindow(false);
    _env.getWindow = () => win;
    const mq = win.matchMedia('(prefers-color-scheme: dark)');

    const cleanup = watchOsTheme();
    expect(mq._listeners.length).toBe(1);
    cleanup();
    expect(mq._listeners.length).toBe(0);
  });
});

// ── getCssVar ─────────────────────────────────────────────────────────────────

describe('getCssVar', () => {
  test('returns empty string when no document and no target', () => {
    _env.getDocument = () => null;
    expect(getCssVar('--av-theme-color-primary')).toBe('');
  });

  test('does not throw for any CSS var name without document', () => {
    expect(() => getCssVar('--av-spacing-md')).not.toThrow();
    expect(() => getCssVar('--nonexistent-var')).not.toThrow();
    expect(() => getCssVar('')).not.toThrow();
  });

  test('calls getComputedStyle on provided target element', () => {
    const mockEl = {};
    const original = global.getComputedStyle;
    global.getComputedStyle = (el) => {
      expect(el).toBe(mockEl);
      return { getPropertyValue: () => '  #abc  ' };
    };
    const result = getCssVar('--av-color', mockEl);
    expect(result).toBe('#abc');
    global.getComputedStyle = original;
  });

  test('uses document.documentElement when no explicit target given', () => {
    const el = makeMockEl();
    _env.getDocument = () => makeMockDocument(el);
    const original = global.getComputedStyle;
    global.getComputedStyle = () => ({ getPropertyValue: () => 'blue' });
    const result = getCssVar('--av-color-primary');
    expect(result).toBe('blue');
    global.getComputedStyle = original;
  });
});

// ── setCssVar ─────────────────────────────────────────────────────────────────

describe('setCssVar', () => {
  test('sets property on a provided mock element', () => {
    const el = makeMockEl();
    setCssVar('--av-color-primary', '#ff0000', el);
    expect(el.style._props['--av-color-primary']).toBe('#ff0000');
  });

  test('does not throw when no document and no target', () => {
    _env.getDocument = () => null;
    expect(() => setCssVar('--av-color-primary', '#ff0000')).not.toThrow();
  });

  test('uses document.documentElement when no explicit target given', () => {
    const el = makeMockEl();
    _env.getDocument = () => makeMockDocument(el);
    setCssVar('--av-spacing-md', '16px');
    expect(el.style._props['--av-spacing-md']).toBe('16px');
  });

  test('handles multiple property sets on same element', () => {
    const el = makeMockEl();
    setCssVar('--av-spacing-md', '16px', el);
    setCssVar('--av-radius-lg', '8px', el);
    expect(el.style._props['--av-spacing-md']).toBe('16px');
    expect(el.style._props['--av-radius-lg']).toBe('8px');
  });
});

// ── Rate limiter ──────────────────────────────────────────────────────────────

describe('rate limiter', () => {
  test('allows up to 20 calls per window without throwing', () => {
    const el = makeMockEl();
    for (let i = 0; i < 20; i++) {
      expect(() => setTheme('light', { persist: false, target: el })).not.toThrow();
    }
  });

  test('throws on the 21st call within the same window', () => {
    const el = makeMockEl();
    for (let i = 0; i < 20; i++) {
      setTheme('light', { persist: false, target: el });
    }
    expect(() => setTheme('dark', { persist: false, target: el })).toThrow(/Rate limit exceeded/);
  });

  test('reset() clears call history allowing calls again', () => {
    const el = makeMockEl();
    for (let i = 0; i < 20; i++) setTheme('light', { persist: false, target: el });
    _rateLimiter.reset();
    expect(() => setTheme('dark', { persist: false, target: el })).not.toThrow();
  });

  test('rate limit error is thrown before setAttribute is called', () => {
    const el = makeMockEl();
    for (let i = 0; i < 20; i++) setTheme('light', { persist: false, target: el });
    try {
      setTheme('dark', { persist: false, target: el });
    } catch (e) {
      expect(e.message).toContain('Rate limit exceeded');
    }
    // theme should still be last successfully set value
    expect(el._attrs['data-av-theme']).toBe('light');
  });
});
