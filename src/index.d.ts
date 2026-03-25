/**
 * @aravi1008/ui — TypeScript type definitions
 * Theme switcher, CSS variable helpers, and design tokens
 */

export type Theme = 'light' | 'dark' | 'forest' | 'ocean' | 'professional' | 'corporate';

export interface SetThemeOptions {
  /** Persist to localStorage. Default: true */
  persist?: boolean;
  /** Element to apply theme attribute to. Default: document.documentElement */
  target?: HTMLElement;
}

/**
 * Set the active theme on the document root (or a target element).
 * @throws if theme name is not in the valid list
 */
export function setTheme(theme: Theme, options?: SetThemeOptions): void;

/**
 * Get the currently active theme name.
 */
export function getTheme(target?: HTMLElement): Theme;

/**
 * Toggle between 'light' and 'dark' themes.
 */
export function toggleDarkMode(options?: SetThemeOptions): void;

/**
 * Initialize theme from localStorage or OS preference.
 * Call once on app startup.
 * @returns resolved theme name
 */
export function initTheme(fallback?: Theme): Theme | undefined;

/**
 * Watch OS dark mode changes and switch theme automatically.
 * @returns cleanup function — call to stop watching
 */
export function watchOsTheme(callback?: (theme: Theme) => void): () => void;

/**
 * Get a CSS custom property value from the active theme.
 */
export function getCssVar(name: string, el?: HTMLElement): string;

/**
 * Set a CSS custom property override on an element.
 */
export function setCssVar(name: string, value: string, el?: HTMLElement): void;

/** Array of all valid theme names */
export const themes: readonly Theme[];

/** @internal Rate limiter — exposed only for testing */
export const _rateLimiter: {
  calls: number[];
  maxCalls: number;
  windowMs: number;
  check(): void;
  reset(): void;
};

/** @internal Environment accessors — exposed only for testing */
export const _env: {
  getDocument(): Document | null;
  getLocalStorage(): Storage | null;
  getWindow(): Window | null;
};

declare const _default: {
  setTheme: typeof setTheme;
  getTheme: typeof getTheme;
  toggleDarkMode: typeof toggleDarkMode;
  initTheme: typeof initTheme;
  watchOsTheme: typeof watchOsTheme;
  themes: readonly Theme[];
  getCssVar: typeof getCssVar;
  setCssVar: typeof setCssVar;
};

export default _default;
