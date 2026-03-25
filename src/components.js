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

// ── Focus trap helper ─────────────────────────────────────────────────────────
const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),' +
  'textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

function trapFocus(container) {
  const els = [...container.querySelectorAll(FOCUSABLE)];
  if (!els.length) return () => {};
  const first = els[0];
  const last = els[els.length - 1];

  function handler(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  container.addEventListener('keydown', handler);
  first.focus();
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
  document.body.style.overflow = 'hidden';

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
  document.body.style.overflow = '';

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
  document.body.style.overflow = 'hidden';

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
  document.body.style.overflow = '';

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

  const container = getOrCreateContainer(cfg.placement);

  const el = document.createElement('div');
  el.className = `av-toast av-toast-${cfg.type || 'info'}`;
  el.setAttribute('role', 'alert');
  el.innerHTML = `
    <div class="av-toast-content">
      ${cfg.title ? `<div class="av-toast-title">${cfg.title}</div>` : ''}
      ${cfg.description ? `<div class="av-toast-description">${cfg.description}</div>` : ''}
    </div>
    <button class="av-toast-close" aria-label="Dismiss">&times;</button>
    ${cfg.duration > 0 ? `<div class="av-toast-progress" style="animation-duration:${cfg.duration}ms"></div>` : ''}
  `;

  container.appendChild(el);

  // Animate in
  requestAnimationFrame(() => el.classList.add('av-toast-visible'));

  function dismiss() {
    el.classList.remove('av-toast-visible');
    el.classList.add('av-toast-exit');
    el.addEventListener('transitionend', () => el.remove(), { once: true });
    // Fallback removal if transition doesn't fire
    setTimeout(() => el.remove(), 400);
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

export const toast = { show: showToast };

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

export default {
  modal,
  drawer,
  dropdown,
  toast,
  accordion,
  tabs,
  navbar,
  initAll,
};
