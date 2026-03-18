/**
 * @aravi1008/ui — JavaScript Entry Point
 * Provides theme switching, token access, and utility helpers.
 * CSS must be imported separately: import '@aravi1008/ui/css'
 */

// ── Theme switcher ────────────────────────────────────────────────────────────

const THEME_ATTR = 'data-av-theme';
const STORAGE_KEY = 'av-theme';
const VALID_THEMES = ['light', 'dark', 'forest', 'ocean', 'professional', 'corporate'];

// ── Rate limiter ──────────────────────────────────────────────────────────────

/**
 * Simple sliding-window rate limiter for theme set operations.
 * Prevents runaway loops (e.g. watchOsTheme + rapid OS events).
 * Default: max 20 calls per 1000 ms window.
 */
const _rateLimiter = {
  calls: [],
  maxCalls: 20,
  windowMs: 1000,
  check() {
    const now = Date.now();
    this.calls = this.calls.filter((t) => now - t < this.windowMs);
    if (this.calls.length >= this.maxCalls) {
      throw new Error('[av-ui] Rate limit exceeded: too many theme changes in a short period.');
    }
    this.calls.push(now);
  },
  reset() {
    this.calls = [];
  },
};

// ── Environment accessors (injectable for testing) ────────────────────────────

/**
 * @internal — exposed only for unit testing
 */
export const _env = {
  getDocument: () => (typeof document !== 'undefined' ? document : null),
  getLocalStorage: () => (typeof localStorage !== 'undefined' ? localStorage : null),
  getWindow: () => (typeof window !== 'undefined' ? window : null),
};

// ── setTheme ──────────────────────────────────────────────────────────────────

/**
 * Set the active theme on the document root.
 * @param {string} theme - One of: light, dark, forest, ocean, professional, corporate
 * @param {object} [options]
 * @param {boolean} [options.persist=true] - Save to localStorage
 * @param {HTMLElement} [options.target=document.documentElement] - Element to apply theme to
 */
export function setTheme(theme, { persist = true, target } = {}) {
  if (!VALID_THEMES.includes(theme)) {
    throw new Error(`[av-ui] Unknown theme: "${theme}". Valid: ${VALID_THEMES.join(', ')}`);
  }
  _rateLimiter.check();
  const doc = _env.getDocument();
  const el = target || (doc ? doc.documentElement : null);
  if (!el) return;
  el.setAttribute(THEME_ATTR, theme);
  if (persist) {
    const ls = _env.getLocalStorage();
    if (ls) ls.setItem(STORAGE_KEY, theme);
  }
}

// ── getTheme ──────────────────────────────────────────────────────────────────

/**
 * Get the currently active theme.
 * @param {HTMLElement} [target=document.documentElement]
 * @returns {string} theme name
 */
export function getTheme(target) {
  const doc = _env.getDocument();
  const el = target || (doc ? doc.documentElement : null);
  if (!el) return 'light';
  return el.getAttribute(THEME_ATTR) || 'light';
}

// ── toggleDarkMode ────────────────────────────────────────────────────────────

/**
 * Toggle between light and dark themes.
 * @param {object} [options] - same as setTheme options
 */
export function toggleDarkMode(options = {}) {
  const current = getTheme(options.target);
  setTheme(current === 'dark' ? 'light' : 'dark', options);
}

// ── initTheme ─────────────────────────────────────────────────────────────────

/**
 * Initialize theme from localStorage or OS preference.
 * Call this once on app startup, before first render.
 * @param {string} [fallback='light'] - Default theme if nothing stored
 */
export function initTheme(fallback = 'light') {
  const doc = _env.getDocument();
  if (!doc) return;

  const ls = _env.getLocalStorage();
  const stored = ls ? ls.getItem(STORAGE_KEY) : null;

  if (stored && VALID_THEMES.includes(stored)) {
    setTheme(stored, { persist: false });
    return stored;
  }

  const win = _env.getWindow();
  const prefersDark = win && win.matchMedia
    ? win.matchMedia('(prefers-color-scheme: dark)').matches
    : false;

  const resolved = prefersDark ? 'dark' : (VALID_THEMES.includes(fallback) ? fallback : 'light');
  setTheme(resolved, { persist: false });
  return resolved;
}

// ── watchOsTheme ──────────────────────────────────────────────────────────────

/**
 * Watch for OS dark mode changes and switch theme automatically.
 * @param {Function} [callback] - Called with new theme name when OS preference changes
 * @returns {Function} cleanup function — call to stop watching
 */
export function watchOsTheme(callback) {
  const win = _env.getWindow();
  if (!win || !win.matchMedia) return () => {};
  const mq = win.matchMedia('(prefers-color-scheme: dark)');
  const handler = (e) => {
    const theme = e.matches ? 'dark' : 'light';
    setTheme(theme, { persist: false });
    if (callback) callback(theme);
  };
  mq.addEventListener('change', handler);
  return () => mq.removeEventListener('change', handler);
}

// ── Available themes list ─────────────────────────────────────────────────────

export const themes = VALID_THEMES;

// ── Token access (JS) ─────────────────────────────────────────────────────────

/**
 * Get a CSS custom property value from the current theme.
 * @param {string} name - e.g. '--av-theme-color-primary'
 * @param {HTMLElement} [el=document.documentElement]
 * @returns {string}
 */
export function getCssVar(name, el) {
  const doc = _env.getDocument();
  const target = el || (doc ? doc.documentElement : null);
  if (!target) return '';
  return getComputedStyle(target).getPropertyValue(name).trim();
}

/**
 * Set a CSS custom property override on an element.
 * @param {string} name - e.g. '--av-theme-color-primary'
 * @param {string} value
 * @param {HTMLElement} [el=document.documentElement]
 */
export function setCssVar(name, value, el) {
  const doc = _env.getDocument();
  const target = el || (doc ? doc.documentElement : null);
  if (!target) return;
  target.style.setProperty(name, value);
}

// ── Internals (exported for testing only) ─────────────────────────────────────

export { _rateLimiter };

// ── Default export ────────────────────────────────────────────────────────────

export default {
  setTheme,
  getTheme,
  toggleDarkMode,
  initTheme,
  watchOsTheme,
  themes,
  getCssVar,
  setCssVar,
};
