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

export interface ToastConfigOptions {
  /** Max toasts visible at once. Excess toasts are queued and shown when space clears. Default: 5 */
  maxVisible?: number;
}

export declare const toast: {
  show(options?: ToastOptions): ToastHandle | null;
  configure(config: ToastConfigOptions): void;
  /** @internal Reset state — for testing only */
  _reset(): void;
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
export interface InitAllOptions {
  /** Watch for dynamically added components via MutationObserver. Default: false */
  observe?: boolean;
}

/**
 * Initialise all interactive components.
 * Safe to call after DOMContentLoaded or before if DOM is already ready.
 * @returns Cleanup function — call to disconnect the MutationObserver (no-op if observe is false)
 */
export declare function initAll(options?: InitAllOptions): () => void;

// ── createTable ───────────────────────────────────────────────────────────────

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, row: Record<string, unknown>) => string;
}

export interface TablePagination {
  enabled?: boolean;
  page?: number;
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
}

export interface TableOptions {
  columns: TableColumn[];
  rows: Record<string, unknown>[];
  pagination?: TablePagination;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  stickyHeader?: boolean;
  loading?: boolean;
  emptyMessage?: string;
}

export interface TableController {
  setRows(rows: Record<string, unknown>[]): void;
  setPage(page: number): void;
  setLoading(loading: boolean): void;
  sort(key: string, dir: 'asc' | 'desc'): void;
  destroy(): void;
}

export declare function createTable(
  target: string | HTMLElement,
  options?: TableOptions
): TableController | null;

declare const _default: {
  modal: typeof modal;
  drawer: typeof drawer;
  dropdown: typeof dropdown;
  toast: typeof toast;
  accordion: typeof accordion;
  tabs: typeof tabs;
  navbar: typeof navbar;
  initAll: typeof initAll;
  createTable: typeof createTable;
};

export default _default;
