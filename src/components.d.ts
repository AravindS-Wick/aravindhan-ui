/**
 * @aravi1008/ui — Interactive Components TypeScript definitions
 */

// ── Modal ─────────────────────────────────────────────────────────────────────
export declare const modal: {
  /** Open a modal by backdrop selector or element */
  open(target: string | HTMLElement): void;
  /** Close a modal by backdrop selector or element */
  close(target: string | HTMLElement): void;
  /** Auto-wire all [data-av-modal-open] and [data-av-modal-close] triggers */
  init(): void;
};

// ── Drawer ────────────────────────────────────────────────────────────────────
export declare const drawer: {
  open(target: string | HTMLElement): void;
  close(target: string | HTMLElement): void;
  init(): void;
};

// ── Dropdown ──────────────────────────────────────────────────────────────────
export declare const dropdown: {
  open(dropdown: HTMLElement): void;
  close(dropdown: HTMLElement): void;
  /** Auto-wire all .av-dropdown elements with keyboard navigation */
  init(): void;
};

// ── Toast ─────────────────────────────────────────────────────────────────────
export type ToastType = 'info' | 'success' | 'warning' | 'error' | 'light';
export type ToastPlacement =
  | 'top-right' | 'top-left' | 'top-center'
  | 'bottom-right' | 'bottom-left' | 'bottom-center';

export interface ToastOptions {
  title?: string;
  description?: string;
  type?: ToastType;
  /** Duration in ms. 0 = no auto-dismiss. Default: 4000 */
  duration?: number;
  placement?: ToastPlacement;
  pauseOnHover?: boolean;
}

export interface ToastHandle {
  dismiss(): void;
  el: HTMLElement;
}

export declare const toast: {
  show(options?: ToastOptions): ToastHandle | null;
};

// ── Accordion ─────────────────────────────────────────────────────────────────
export declare const accordion: {
  /** Auto-wire all .av-accordion elements */
  init(): void;
};

// ── Tabs ──────────────────────────────────────────────────────────────────────
export declare const tabs: {
  /** Auto-wire all .av-tabs[data-av-tabs] elements */
  init(): void;
};

// ── Navbar ────────────────────────────────────────────────────────────────────
export declare const navbar: {
  /** Auto-wire all .av-navbar-toggle elements */
  init(): void;
};

// ── initAll ───────────────────────────────────────────────────────────────────
/**
 * Initialise all interactive components.
 * Safe to call after DOMContentLoaded or before if DOM is already ready.
 */
export declare function initAll(): void;

declare const _default: {
  modal: typeof modal;
  drawer: typeof drawer;
  dropdown: typeof dropdown;
  toast: typeof toast;
  accordion: typeof accordion;
  tabs: typeof tabs;
  navbar: typeof navbar;
  initAll: typeof initAll;
};

export default _default;
