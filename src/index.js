/**
 * @aravi1008/ui — JavaScript Entry Point
 * Provides theme switching, token access, and utility helpers.
 * CSS must be imported separately: import '@aravi1008/ui/css'
 */

// ── Theme switcher ────────────────────────────────────────────────────────────

const THEME_ATTR = 'data-av-theme';
const STORAGE_KEY = 'av-theme';
const VALID_THEMES = ['light', 'dark', 'forest', 'ocean', 'professional', 'corporate'];

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
  const el = target || (typeof document !== 'undefined' ? document.documentElement : null);
  if (!el) return;
  el.setAttribute(THEME_ATTR, theme);
  if (persist && typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, theme);
  }
}

/**
 * Get the currently active theme.
 * @param {HTMLElement} [target=document.documentElement]
 * @returns {string} theme name
 */
export function getTheme(target) {
  const el = target || (typeof document !== 'undefined' ? document.documentElement : null);
  if (!el) return 'light';
  return el.getAttribute(THEME_ATTR) || 'light';
}

/**
 * Toggle between light and dark themes.
 * @param {object} [options] - same as setTheme options
 */
export function toggleDarkMode(options = {}) {
  const current = getTheme(options.target);
  setTheme(current === 'dark' ? 'light' : 'dark', options);
}

/**
 * Initialize theme from localStorage or OS preference.
 * Call this once on app startup, before first render.
 * @param {string} [fallback='light'] - Default theme if nothing stored
 */
export function initTheme(fallback = 'light') {
  if (typeof document === 'undefined') return;

  const stored = typeof localStorage !== 'undefined'
    ? localStorage.getItem(STORAGE_KEY)
    : null;

  if (stored && VALID_THEMES.includes(stored)) {
    setTheme(stored, { persist: false });
    return stored;
  }

  const prefersDark = typeof window !== 'undefined'
    && window.matchMedia
    && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const resolved = prefersDark ? 'dark' : fallback;
  setTheme(resolved, { persist: false });
  return resolved;
}

/**
 * Watch for OS dark mode changes and switch theme automatically.
 * @param {Function} [callback] - Called with new theme name when OS preference changes
 * @returns {Function} cleanup function — call to stop watching
 */
export function watchOsTheme(callback) {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {};
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
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
  const target = el || (typeof document !== 'undefined' ? document.documentElement : null);
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
  const target = el || (typeof document !== 'undefined' ? document.documentElement : null);
  if (!target) return;
  target.style.setProperty(name, value);
}

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
