/**
 * @aravi1008/ui — Interactive Component JS
 * Provides: Modal, Drawer, Dropdown, Toast, Accordion, Navbar toggle, Tabs
 *
 * Zero dependencies. All components use data attributes for configuration.
 * Tree-shakeable: import only what you need.
 *
 * Usage:
 *   import { initAll } from '@aravi1008/ui/components'
 *   initAll()  // auto-initialise all components on DOMContentLoaded
 *
 *   Or individually:
 *   import { modal, toast, accordion } from '@aravi1008/ui/components'
 */

// ── Environment guard ─────────────────────────────────────────────────────────
const isBrowser = typeof document !== 'undefined';

// ── Scroll lock ───────────────────────────────────────────────────────────────
// Shared counter so nested modals/drawers don't prematurely restore scroll.
let _scrollLockCount = 0;
let _scrollLockOriginal = '';

function _lockScroll() {
  if (!isBrowser) return;
  if (_scrollLockCount === 0) {
    _scrollLockOriginal = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  _scrollLockCount++;
}

function _unlockScroll() {
  if (!isBrowser) return;
  _scrollLockCount = Math.max(0, _scrollLockCount - 1);
  if (_scrollLockCount === 0) {
    document.body.style.overflow = _scrollLockOriginal;
    _scrollLockOriginal = '';
  }
}

// ── Focus trap helper ─────────────────────────────────────────────────────────
const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),' +
  'textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

function trapFocus(container) {
  const initialEls = [...container.querySelectorAll(FOCUSABLE)];
  if (!initialEls.length) return () => {};

  function handler(e) {
    if (e.key !== 'Tab') return;
    // Re-query live on every Tab so dynamically added elements are included
    const els = [...container.querySelectorAll(FOCUSABLE)];
    if (!els.length) return;
    const first = els[0];
    const last = els[els.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  container.addEventListener('keydown', handler);
  initialEls[0].focus();
  return () => container.removeEventListener('keydown', handler);
}

// ── Modal ─────────────────────────────────────────────────────────────────────

let _modalReleaseFocus = null;
let _modalPreviousFocus = null;

/**
 * Open a modal.
 * @param {string|HTMLElement} target - Modal backdrop selector or element
 */
function openModal(target) {
  if (!isBrowser) return;
  const backdrop = typeof target === 'string' ? document.querySelector(target) : target;
  if (!backdrop) return;

  _modalPreviousFocus = document.activeElement;
  backdrop.classList.add('av-modal-open');
  backdrop.setAttribute('aria-hidden', 'false');
  _lockScroll();

  const dialog = backdrop.querySelector('.av-modal');
  if (dialog) {
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    _modalReleaseFocus = trapFocus(dialog);
  }

  function onBackdropClick(e) {
    if (e.target === backdrop) closeModal(backdrop);
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') closeModal(backdrop);
  }

  backdrop.addEventListener('click', onBackdropClick, { once: false });
  backdrop._avCleanup = () => {
    backdrop.removeEventListener('click', onBackdropClick);
    document.removeEventListener('keydown', onKeyDown);
  };
  document.addEventListener('keydown', onKeyDown);
}

/**
 * Close a modal.
 * @param {string|HTMLElement} target
 */
function closeModal(target) {
  if (!isBrowser) return;
  const backdrop = typeof target === 'string' ? document.querySelector(target) : target;
  if (!backdrop) return;

  backdrop.classList.remove('av-modal-open');
  backdrop.setAttribute('aria-hidden', 'true');
  _unlockScroll();

  if (_modalReleaseFocus) { _modalReleaseFocus(); _modalReleaseFocus = null; }
  if (_modalPreviousFocus) { _modalPreviousFocus.focus(); _modalPreviousFocus = null; }
  if (backdrop._avCleanup) { backdrop._avCleanup(); delete backdrop._avCleanup; }
}

function initModals() {
  if (!isBrowser) return;
  document.querySelectorAll('[data-av-modal-open]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const target = trigger.getAttribute('data-av-modal-open');
      openModal(target);
    });
  });
  document.querySelectorAll('[data-av-modal-close]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const backdrop = trigger.closest('.av-modal-backdrop');
      if (backdrop) closeModal(backdrop);
    });
  });
}

export const modal = { open: openModal, close: closeModal, init: initModals };

// ── Drawer ────────────────────────────────────────────────────────────────────

let _drawerReleaseFocus = null;
let _drawerPreviousFocus = null;

function openDrawer(target) {
  if (!isBrowser) return;
  const backdrop = typeof target === 'string' ? document.querySelector(target) : target;
  if (!backdrop) return;

  _drawerPreviousFocus = document.activeElement;
  backdrop.classList.add('av-drawer-open');
  backdrop.setAttribute('aria-hidden', 'false');
  _lockScroll();

  const panel = backdrop.querySelector('.av-drawer');
  if (panel) {
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    _drawerReleaseFocus = trapFocus(panel);
  }

  function onBackdropClick(e) { if (e.target === backdrop) closeDrawer(backdrop); }
  function onKeyDown(e) { if (e.key === 'Escape') closeDrawer(backdrop); }

  backdrop.addEventListener('click', onBackdropClick);
  backdrop._avCleanup = () => {
    backdrop.removeEventListener('click', onBackdropClick);
    document.removeEventListener('keydown', onKeyDown);
  };
  document.addEventListener('keydown', onKeyDown);
}

function closeDrawer(target) {
  if (!isBrowser) return;
  const backdrop = typeof target === 'string' ? document.querySelector(target) : target;
  if (!backdrop) return;

  backdrop.classList.remove('av-drawer-open');
  backdrop.setAttribute('aria-hidden', 'true');
  _unlockScroll();

  if (_drawerReleaseFocus) { _drawerReleaseFocus(); _drawerReleaseFocus = null; }
  if (_drawerPreviousFocus) { _drawerPreviousFocus.focus(); _drawerPreviousFocus = null; }
  if (backdrop._avCleanup) { backdrop._avCleanup(); delete backdrop._avCleanup; }
}

function initDrawers() {
  if (!isBrowser) return;
  document.querySelectorAll('[data-av-drawer-open]').forEach((trigger) => {
    trigger.addEventListener('click', () => openDrawer(trigger.getAttribute('data-av-drawer-open')));
  });
  document.querySelectorAll('[data-av-drawer-close]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const backdrop = trigger.closest('.av-drawer-backdrop');
      if (backdrop) closeDrawer(backdrop);
    });
  });
}

export const drawer = { open: openDrawer, close: closeDrawer, init: initDrawers };

// ── Dropdown ──────────────────────────────────────────────────────────────────

const _openDropdowns = new Set();

function openDropdown(dropdown) {
  const menu = dropdown.querySelector('.av-dropdown-menu');
  const trigger = dropdown.querySelector('.av-dropdown-trigger');
  if (!menu) return;

  // Close others first
  _openDropdowns.forEach((d) => { if (d !== dropdown) closeDropdown(d); });

  menu.classList.add('av-dropdown-open');
  trigger && trigger.setAttribute('aria-expanded', 'true');
  _openDropdowns.add(dropdown);

  // Focus first item
  const first = menu.querySelector('.av-dropdown-item:not([disabled]):not([aria-disabled="true"])');
  if (first) first.focus();
}

function closeDropdown(dropdown) {
  const menu = dropdown.querySelector('.av-dropdown-menu');
  const trigger = dropdown.querySelector('.av-dropdown-trigger');
  if (!menu) return;

  menu.classList.remove('av-dropdown-open');
  trigger && trigger.setAttribute('aria-expanded', 'false');
  _openDropdowns.delete(dropdown);
}

function initDropdowns() {
  if (!isBrowser) return;

  document.querySelectorAll('.av-dropdown').forEach((dropdown) => {
    const trigger = dropdown.querySelector('.av-dropdown-trigger');
    const menu = dropdown.querySelector('.av-dropdown-menu');
    if (!trigger || !menu) return;

    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.contains('av-dropdown-open');
      isOpen ? closeDropdown(dropdown) : openDropdown(dropdown);
    });

    // Keyboard navigation
    menu.addEventListener('keydown', (e) => {
      const items = [...menu.querySelectorAll('.av-dropdown-item:not([disabled]):not([aria-disabled="true"])')];
      const idx = items.indexOf(document.activeElement);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        items[Math.min(idx + 1, items.length - 1)]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (idx === 0) { trigger.focus(); closeDropdown(dropdown); }
        else items[Math.max(idx - 1, 0)]?.focus();
      } else if (e.key === 'Escape') {
        closeDropdown(dropdown);
        trigger.focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        items[0]?.focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        items[items.length - 1]?.focus();
      } else if (e.key.length === 1 && /[a-z0-9]/i.test(e.key)) {
        // Typeahead: jump to first item whose text starts with the pressed char
        const char = e.key.toLowerCase();
        const match = items.find((item) => item.textContent.trim().toLowerCase().startsWith(char));
        if (match) { e.preventDefault(); match.focus(); }
      }
    });
  });

  // Close on outside click
  document.addEventListener('click', () => {
    _openDropdowns.forEach((d) => closeDropdown(d));
  });
}

export const dropdown = { open: openDropdown, close: closeDropdown, init: initDropdowns };

// ── Toast ─────────────────────────────────────────────────────────────────────

const _toastDefaults = {
  duration: 4000,
  placement: 'top-right',
  pauseOnHover: true,
};

// Queue state
let _toastMaxVisible = 5;
let _toastVisibleCount = 0;
const _toastQueue = [];

function getOrCreateContainer(placement) {
  const cls = `av-toast-container av-toast-${placement}`;
  let container = document.querySelector(`.av-toast-container.av-toast-${placement}`);
  if (!container) {
    container = document.createElement('div');
    container.className = cls;
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'false');
    document.body.appendChild(container);
  }
  return container;
}

function _buildToastHTML(cfg) {
  const titlePart = cfg.title ? `<div class="av-toast-title">${cfg.title}</div>` : '';
  const descPart = cfg.description ? `<div class="av-toast-description">${cfg.description}</div>` : '';
  const progressPart = cfg.duration > 0 ? `<div class="av-toast-progress" style="animation-duration:${cfg.duration}ms"></div>` : '';
  return `<div class="av-toast-content">${titlePart}${descPart}</div><button class="av-toast-close" aria-label="Dismiss">&times;</button>${progressPart}`;
}

function _renderToast(cfg) {
  const container = getOrCreateContainer(cfg.placement);
  const el = document.createElement('div');
  el.className = `av-toast av-toast-${cfg.type || 'info'}`;
  el.setAttribute('role', 'alert');
  el.innerHTML = _buildToastHTML(cfg);

  container.appendChild(el);
  _toastVisibleCount++;

  // Animate in
  requestAnimationFrame(() => el.classList.add('av-toast-visible'));

  function dismiss() {
    el.classList.remove('av-toast-visible');
    el.classList.add('av-toast-exit');
    function cleanup() {
      el.remove();
      _toastVisibleCount = Math.max(0, _toastVisibleCount - 1);
      if (_toastQueue.length > 0) {
        _renderToast(_toastQueue.shift());
      }
    }
    el.addEventListener('transitionend', cleanup, { once: true });
    // Fallback removal if transition doesn't fire
    setTimeout(cleanup, 400);
  }

  el.querySelector('.av-toast-close').addEventListener('click', dismiss);

  let timer = null;
  if (cfg.duration > 0) {
    timer = setTimeout(dismiss, cfg.duration);
  }

  if (cfg.pauseOnHover && cfg.duration > 0) {
    el.addEventListener('mouseenter', () => { clearTimeout(timer); });
    el.addEventListener('mouseleave', () => { timer = setTimeout(dismiss, 800); });
  }

  return { dismiss, el };
}

/**
 * Show a toast notification.
 * @param {object} options
 * @param {string} options.title
 * @param {string} [options.description]
 * @param {'info'|'success'|'warning'|'error'|'light'} [options.type='info']
 * @param {number} [options.duration=4000] ms, 0 = no auto-dismiss
 * @param {string} [options.placement='top-right']
 * @param {boolean} [options.pauseOnHover=true]
 */
function showToast(options = {}) {
  if (!isBrowser) return null;
  const cfg = { ..._toastDefaults, ...options };
  if (_toastVisibleCount >= _toastMaxVisible) {
    _toastQueue.push(cfg);
    return null;
  }
  return _renderToast(cfg);
}

/**
 * Configure toast behaviour.
 * @param {object} options
 * @param {number} [options.maxVisible=5] Maximum number of toasts shown at once
 */
function configureToast(options = {}) {
  if (typeof options.maxVisible === 'number' && options.maxVisible > 0) {
    _toastMaxVisible = options.maxVisible;
  }
}

/** @internal Reset queue state — for unit tests only */
function _resetToastState() {
  _toastMaxVisible = 5;
  _toastVisibleCount = 0;
  _toastQueue.length = 0;
}

export const toast = { show: showToast, configure: configureToast, _reset: _resetToastState };

// ── Accordion ─────────────────────────────────────────────────────────────────

function initAccordions() {
  if (!isBrowser) return;

  document.querySelectorAll('.av-accordion').forEach((accordion) => {
    const allowMultiple = accordion.hasAttribute('data-av-multiple');

    accordion.querySelectorAll('.av-accordion-trigger').forEach((trigger) => {
      trigger.addEventListener('click', () => toggleAccordionItem(trigger, accordion, allowMultiple));
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleAccordionItem(trigger, accordion, allowMultiple);
        }
      });
    });
  });
}

function toggleAccordionItem(trigger, accordion, allowMultiple) {
  const isOpen = trigger.getAttribute('aria-expanded') === 'true';
  const content = document.getElementById(trigger.getAttribute('aria-controls'));

  if (!allowMultiple) {
    // Close all other items
    accordion.querySelectorAll('.av-accordion-trigger[aria-expanded="true"]').forEach((t) => {
      if (t !== trigger) {
        t.setAttribute('aria-expanded', 'false');
        const c = document.getElementById(t.getAttribute('aria-controls'));
        if (c) c.classList.remove('av-accordion-open');
      }
    });
  }

  trigger.setAttribute('aria-expanded', String(!isOpen));
  if (content) {
    content.classList.toggle('av-accordion-open', !isOpen);
  }
}

export const accordion = { init: initAccordions };

// ── Tabs (JS-driven) ──────────────────────────────────────────────────────────

function initTabs() {
  if (!isBrowser) return;

  document.querySelectorAll('.av-tabs[data-av-tabs]').forEach((tabsEl) => {
    const tabs = [...tabsEl.querySelectorAll('.av-tab')];
    const panels = [...tabsEl.querySelectorAll('.av-tab-panel')];

    function activate(tab) {
      tabs.forEach((t) => { t.classList.remove('av-active'); t.setAttribute('aria-selected', 'false'); });
      panels.forEach((p) => p.classList.remove('av-active'));

      tab.classList.add('av-active');
      tab.setAttribute('aria-selected', 'true');
      const panelId = tab.getAttribute('aria-controls');
      if (panelId) {
        const panel = document.getElementById(panelId);
        if (panel) panel.classList.add('av-active');
      }
    }

    tabs.forEach((tab, i) => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('tabindex', tab.classList.contains('av-active') ? '0' : '-1');

      tab.addEventListener('click', () => { activate(tab); tab.setAttribute('tabindex', '0'); });

      tab.addEventListener('keydown', (e) => {
        let next = null;
        if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
        else if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === 'Home') next = tabs[0];
        else if (e.key === 'End')  next = tabs[tabs.length - 1];
        if (next) { e.preventDefault(); activate(next); next.focus(); next.setAttribute('tabindex', '0'); tab.setAttribute('tabindex', '-1'); }
      });
    });
  });
}

export const tabs = { init: initTabs };

// ── Navbar mobile toggle ──────────────────────────────────────────────────────

function initNavbars() {
  if (!isBrowser) return;

  document.querySelectorAll('.av-navbar-toggle').forEach((toggle) => {
    const navbar = toggle.closest('.av-navbar');
    if (!navbar) return;
    const collapse = navbar.querySelector('.av-navbar-collapse');
    if (!collapse) return;

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      collapse.classList.toggle('av-navbar-collapse-open', !isOpen);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        collapse.classList.remove('av-navbar-collapse-open');
      }
    });
  });
}

export const navbar = { init: initNavbars };

// ── initAll — auto-initialise everything ──────────────────────────────────────

/**
 * Initialise all interactive components.
 * Call once after the DOM is ready.
 */
export function initAll() {
  if (!isBrowser) return;

  function run() {
    initModals();
    initDrawers();
    initDropdowns();
    initAccordions();
    initTabs();
    initNavbars();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
}

// ── createTable — data-driven table component ─────────────────────────────────

/**
 * Create a fully-featured data table inside a target element.
 *
 * @param {string|HTMLElement} target  - Selector or element to render into
 * @param {object} options
 * @param {Array<{key,label,sortable?,width?,align?,render?,sanitize?}>} options.columns
 * @param {Array<object>} options.rows
 * @param {object}  [options.pagination]
 * @param {boolean} [options.pagination.enabled=false]
 * @param {number}  [options.pagination.page=1]
 * @param {number}  [options.pagination.rowsPerPage=10]
 * @param {Array<number>} [options.pagination.rowsPerPageOptions=[10,25,50]]
 * @param {boolean} [options.striped=false]
 * @param {boolean} [options.hoverable=true]
 * @param {boolean} [options.bordered=false]
 * @param {boolean} [options.stickyHeader=false]
 * @param {boolean} [options.loading=false]
 * @param {string}  [options.emptyMessage='No data']
 * @returns {{ setRows, setPage, setLoading, destroy } | null}
 */
export function createTable(target, options = {}) {
  if (!isBrowser) return null;
  const container = typeof target === 'string' ? document.querySelector(target) : target;
  if (!container) return null;

  const cfg = {
    columns: [],
    rows: [],
    striped: false,
    hoverable: true,
    bordered: false,
    stickyHeader: false,
    loading: false,
    emptyMessage: 'No data',
    ...options,
    pagination: {
      enabled: false,
      page: 1,
      rowsPerPage: 10,
      rowsPerPageOptions: [10, 25, 50],
      ...(options.pagination || {}),
    },
  };

  let _rows = [...cfg.rows];
  let _page = cfg.pagination.page;
  let _rowsPerPage = cfg.pagination.rowsPerPage;
  let _loading = cfg.loading;
  let _sortKey = null;
  let _sortDir = null;
  const _listeners = [];

  function _esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function _sortedRows() {
    if (!_sortKey) return _rows;
    return [..._rows].sort((a, b) => {
      const av = a[_sortKey] ?? '';
      const bv = b[_sortKey] ?? '';
      const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
      return _sortDir === 'asc' ? cmp : -cmp;
    });
  }

  function _pageRows(rows) {
    if (!cfg.pagination.enabled) return rows;
    const start = (_page - 1) * _rowsPerPage;
    return rows.slice(start, start + _rowsPerPage);
  }

  function _renderHead() {
    return `<thead><tr>${cfg.columns.map((col) => {
      const sortable = col.sortable !== false;
      const ariasort = _sortKey === col.key
        ? (_sortDir === 'asc' ? 'ascending' : 'descending')
        : 'none';
      const indicator = _sortKey === col.key
        ? (_sortDir === 'asc' ? ' ↑' : ' ↓')
        : (sortable ? ' ↕' : '');
      const style = col.width ? ` style="width:${col.width}"` : '';
      const align = col.align ? ` class="av-text-${col.align}"` : '';
      return `<th scope="col"${style}${align}${sortable ? ` aria-sort="${ariasort}" data-av-sort="${col.key}" style="cursor:pointer"` : ''}>${_esc(col.label)}${indicator}</th>`;
    }).join('')}</tr></thead>`;
  }

  function _renderBody(visibleRows) {
    if (_loading) {
      return `<tbody>${Array.from({ length: _rowsPerPage }, () =>
        `<tr>${cfg.columns.map(() => `<td><div class="av-skeleton av-skeleton-sm" style="height:1em;border-radius:4px"></div></td>`).join('')}</tr>`
      ).join('')}</tbody>`;
    }
    if (!visibleRows.length) {
      return `<tbody><tr><td colspan="${cfg.columns.length}" class="av-text-center av-py-8 av-text-secondary">${_esc(cfg.emptyMessage)}</td></tr></tbody>`;
    }
    return `<tbody>${visibleRows.map((row) =>
      `<tr>${cfg.columns.map((col) => {
        const val = row[col.key] ?? '';
        let cell;
        if (col.render) {
          const rendered = col.render(val, row);
          // render() output is raw HTML by default; set sanitize:true to strip tags
          cell = col.sanitize ? _esc(rendered) : rendered;
        } else {
          // Raw data values are always escaped unless sanitize is explicitly false
          cell = col.sanitize === false ? String(val) : _esc(val);
        }
        const align = col.align ? ` class="av-text-${col.align}"` : '';
        return `<td${align}>${cell}</td>`;
      }).join('')}</tr>`
    ).join('')}</tbody>`;
  }

  function _renderPagination(total) {
    if (!cfg.pagination.enabled) return '';
    const totalPages = Math.max(1, Math.ceil(total / _rowsPerPage));
    const opts = cfg.pagination.rowsPerPageOptions
      .map((n) => `<option value="${n}"${n === _rowsPerPage ? ' selected' : ''}>${n}</option>`)
      .join('');
    return `
      <div class="av-pagination av-d-flex av-items-center av-justify-between av-p-3 av-border-t">
        <div class="av-d-flex av-items-center av-gap-2">
          <span class="av-text-sm av-text-secondary">Rows per page:</span>
          <select class="av-select av-select-sm" data-av-rpp>${opts}</select>
        </div>
        <div class="av-d-flex av-items-center av-gap-2">
          <span class="av-text-sm av-text-secondary">${(_page - 1) * _rowsPerPage + 1}–${Math.min(_page * _rowsPerPage, total)} of ${total}</span>
          <button class="av-btn av-btn-ghost av-btn-sm" data-av-prev ${_page <= 1 ? 'disabled' : ''} aria-label="Previous page">‹</button>
          <button class="av-btn av-btn-ghost av-btn-sm" data-av-next ${_page >= totalPages ? 'disabled' : ''} aria-label="Next page">›</button>
        </div>
      </div>`;
  }

  function _render() {
    const sorted = _sortedRows();
    const visible = _pageRows(sorted);
    const tableClass = [
      'av-table',
      cfg.striped ? 'av-table-striped' : '',
      cfg.hoverable ? 'av-table-hover' : '',
      cfg.bordered ? 'av-table-bordered' : '',
      cfg.stickyHeader ? 'av-table-sticky' : '',
    ].filter(Boolean).join(' ');

    container.innerHTML = `
      <div class="av-table-wrapper">
        <table class="${tableClass}" role="grid">
          ${_renderHead()}
          ${_renderBody(visible)}
        </table>
        ${_renderPagination(sorted.length)}
      </div>`;

    _bindEvents();
  }

  function _bindEvents() {
    container.querySelectorAll('[data-av-sort]').forEach((th) => {
      const handler = () => {
        const key = th.getAttribute('data-av-sort');
        if (_sortKey === key) {
          _sortDir = _sortDir === 'asc' ? 'desc' : 'asc';
        } else {
          _sortKey = key;
          _sortDir = 'asc';
        }
        _page = 1;
        _render();
      };
      th.addEventListener('click', handler);
      _listeners.push({ el: th, type: 'click', handler });
    });

    const prevBtn = container.querySelector('[data-av-prev]');
    const nextBtn = container.querySelector('[data-av-next]');
    const rppSel = container.querySelector('[data-av-rpp]');

    if (prevBtn) {
      const h = () => { if (_page > 1) { _page--; _render(); } };
      prevBtn.addEventListener('click', h);
      _listeners.push({ el: prevBtn, type: 'click', handler: h });
    }
    if (nextBtn) {
      const total = _sortedRows().length;
      const h = () => {
        if (_page < Math.ceil(total / _rowsPerPage)) { _page++; _render(); }
      };
      nextBtn.addEventListener('click', h);
      _listeners.push({ el: nextBtn, type: 'click', handler: h });
    }
    if (rppSel) {
      const h = (e) => { _rowsPerPage = Number(e.target.value); _page = 1; _render(); };
      rppSel.addEventListener('change', h);
      _listeners.push({ el: rppSel, type: 'change', handler: h });
    }
  }

  _render();

  return {
    setRows(rows) { _rows = [...rows]; _page = 1; _render(); },
    setPage(page) { _page = page; _render(); },
    setLoading(val) { _loading = val; _render(); },
    sort(key, dir) { _sortKey = key; _sortDir = dir; _render(); },
    destroy() {
      _listeners.forEach(({ el, type, handler }) => el.removeEventListener(type, handler));
      container.innerHTML = '';
    },
  };
}

export default {
  modal,
  drawer,
  dropdown,
  toast,
  accordion,
  tabs,
  navbar,
  initAll,
  createTable,
};
