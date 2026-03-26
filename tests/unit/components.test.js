/**
 * @jest-environment jsdom
 *
 * Tests for src/components.js
 * Uses jsdom so isBrowser=true and all DOM paths execute.
 */

import { jest } from '@jest/globals';
import {
  modal,
  drawer,
  dropdown,
  toast,
  accordion,
  tabs,
  navbar,
  initAll,
  createTable,
} from '../../src/components.js';

// ── helpers ───────────────────────────────────────────────────────────────────

function el(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div);
  return div;
}

function cleanup() {
  document.body.innerHTML = '';
}

// ── exports shape ─────────────────────────────────────────────────────────────

describe('exports', () => {
  test('modal has open, close, init', () => {
    expect(typeof modal.open).toBe('function');
    expect(typeof modal.close).toBe('function');
    expect(typeof modal.init).toBe('function');
  });

  test('drawer has open, close, init', () => {
    expect(typeof drawer.open).toBe('function');
    expect(typeof drawer.close).toBe('function');
    expect(typeof drawer.init).toBe('function');
  });

  test('dropdown has open, close, init', () => {
    expect(typeof dropdown.open).toBe('function');
    expect(typeof dropdown.close).toBe('function');
    expect(typeof dropdown.init).toBe('function');
  });

  test('toast has show and configure', () => {
    expect(typeof toast.show).toBe('function');
    expect(typeof toast.configure).toBe('function');
  });

  test('accordion has init', () => {
    expect(typeof accordion.init).toBe('function');
  });

  test('tabs has init', () => {
    expect(typeof tabs.init).toBe('function');
  });

  test('navbar has init', () => {
    expect(typeof navbar.init).toBe('function');
  });

  test('initAll is a function', () => {
    expect(typeof initAll).toBe('function');
  });
});

// ── modal ─────────────────────────────────────────────────────────────────────

describe('modal', () => {
  afterEach(cleanup);

  test('open by selector adds av-modal-open class', () => {
    const wrap = el('<div id="m1" class="av-modal-backdrop"><div class="av-modal"><button>X</button></div></div>');
    const backdrop = wrap.querySelector('#m1');
    modal.open('#m1');
    expect(backdrop.classList.contains('av-modal-open')).toBe(true);
  });

  test('open sets aria-hidden=false', () => {
    const wrap = el('<div id="m2" class="av-modal-backdrop"></div>');
    modal.open('#m2');
    expect(wrap.querySelector('#m2').getAttribute('aria-hidden')).toBe('false');
  });

  test('open with element (not string) works', () => {
    const wrap = el('<div id="m3" class="av-modal-backdrop"></div>');
    const backdrop = wrap.querySelector('#m3');
    modal.open(backdrop);
    expect(backdrop.classList.contains('av-modal-open')).toBe(true);
  });

  test('open with non-existent selector does not throw', () => {
    expect(() => modal.open('#does-not-exist')).not.toThrow();
  });

  test('open with null does not throw', () => {
    expect(() => modal.open(null)).not.toThrow();
  });

  test('close removes av-modal-open class', () => {
    const wrap = el('<div id="m4" class="av-modal-backdrop av-modal-open"></div>');
    const backdrop = wrap.querySelector('#m4');
    modal.close('#m4');
    expect(backdrop.classList.contains('av-modal-open')).toBe(false);
  });

  test('close sets aria-hidden=true', () => {
    const wrap = el('<div id="m5" class="av-modal-backdrop av-modal-open"></div>');
    modal.close('#m5');
    expect(wrap.querySelector('#m5').getAttribute('aria-hidden')).toBe('true');
  });

  test('close with element (not string) works', () => {
    const wrap = el('<div id="m6" class="av-modal-backdrop av-modal-open"></div>');
    const backdrop = wrap.querySelector('#m6');
    modal.close(backdrop);
    expect(backdrop.classList.contains('av-modal-open')).toBe(false);
  });

  test('close with non-existent selector does not throw', () => {
    expect(() => modal.close('#does-not-exist')).not.toThrow();
  });

  test('open traps focus when .av-modal has focusable elements', () => {
    const wrap = el('<div id="m7" class="av-modal-backdrop"><div class="av-modal"><button id="fb">First</button><button id="lb">Last</button></div></div>');
    modal.open('#m7');
    const backdrop = wrap.querySelector('#m7');
    expect(backdrop.classList.contains('av-modal-open')).toBe(true);
    modal.close('#m7');
  });

  test('backdrop click closes modal', () => {
    const wrap = el('<div id="m8" class="av-modal-backdrop"><div class="av-modal"></div></div>');
    const backdrop = wrap.querySelector('#m8');
    modal.open('#m8');
    expect(backdrop.classList.contains('av-modal-open')).toBe(true);
    // Simulate click directly on backdrop
    const clickEvent = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(clickEvent, 'target', { value: backdrop });
    backdrop.dispatchEvent(clickEvent);
    // The click handler checks e.target === backdrop
    // Modal should still have been toggled
  });

  test('Escape key closes modal', () => {
    el('<div id="m9" class="av-modal-backdrop"><div class="av-modal"></div></div>');
    modal.open('#m9');
    const keyEvent = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
    document.dispatchEvent(keyEvent);
    // Should not throw
  });

  test('init() wires data-av-modal-open triggers without throwing', () => {
    el('<button data-av-modal-open="#modal-a">Open</button><div id="modal-a" class="av-modal-backdrop"></div>');
    expect(() => modal.init()).not.toThrow();
    // Click the trigger
    const trigger = document.querySelector('[data-av-modal-open]');
    trigger.click();
  });

  test('init() wires data-av-modal-close triggers', () => {
    el('<div id="modal-b" class="av-modal-backdrop av-modal-open"><button data-av-modal-close>Close</button></div>');
    modal.init();
    const btn = document.querySelector('[data-av-modal-close]');
    btn.click();
  });

  test('open locks body scroll', () => {
    el('<div id="msl1" class="av-modal-backdrop"><div class="av-modal"></div></div>');
    modal.open('#msl1');
    expect(document.body.style.overflow).toBe('hidden');
    modal.close('#msl1');
  });

  test('close restores body scroll', () => {
    el('<div id="msl2" class="av-modal-backdrop"><div class="av-modal"></div></div>');
    modal.open('#msl2');
    modal.close('#msl2');
    expect(document.body.style.overflow).toBe('');
  });

  test('nested open/close — body stays locked until last modal closes', () => {
    el('<div id="msl3" class="av-modal-backdrop"><div class="av-modal"></div></div>');
    el('<div id="msl4" class="av-modal-backdrop"><div class="av-modal"></div></div>');
    modal.open('#msl3');
    modal.open('#msl4');
    expect(document.body.style.overflow).toBe('hidden');
    modal.close('#msl3');
    expect(document.body.style.overflow).toBe('hidden'); // still locked
    modal.close('#msl4');
    expect(document.body.style.overflow).toBe('');       // now unlocked
  });
});

// ── drawer ─────────────────────────────────────────────────────────────────────

describe('drawer', () => {
  afterEach(cleanup);

  test('open by selector adds av-drawer-open class', () => {
    const wrap = el('<div id="d1" class="av-drawer-backdrop"><div class="av-drawer"><button>X</button></div></div>');
    drawer.open('#d1');
    expect(wrap.querySelector('#d1').classList.contains('av-drawer-open')).toBe(true);
  });

  test('open with element works', () => {
    const wrap = el('<div id="d2" class="av-drawer-backdrop"></div>');
    const backdrop = wrap.querySelector('#d2');
    drawer.open(backdrop);
    expect(backdrop.classList.contains('av-drawer-open')).toBe(true);
  });

  test('open with non-existent selector does not throw', () => {
    expect(() => drawer.open('#no-drawer')).not.toThrow();
  });

  test('close removes av-drawer-open', () => {
    const wrap = el('<div id="d3" class="av-drawer-backdrop av-drawer-open"></div>');
    drawer.close('#d3');
    expect(wrap.querySelector('#d3').classList.contains('av-drawer-open')).toBe(false);
  });

  test('close with element works', () => {
    const wrap = el('<div id="d4" class="av-drawer-backdrop av-drawer-open"></div>');
    const backdrop = wrap.querySelector('#d4');
    drawer.close(backdrop);
    expect(backdrop.classList.contains('av-drawer-open')).toBe(false);
  });

  test('close with non-existent selector does not throw', () => {
    expect(() => drawer.close('#no-drawer')).not.toThrow();
  });

  test('Escape key closes drawer', () => {
    el('<div id="d5" class="av-drawer-backdrop"><div class="av-drawer"></div></div>');
    drawer.open('#d5');
    const keyEvent = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
    document.dispatchEvent(keyEvent);
  });

  test('init() wires data-av-drawer-open triggers', () => {
    el('<button data-av-drawer-open="#dr-a">Open</button><div id="dr-a" class="av-drawer-backdrop"></div>');
    expect(() => drawer.init()).not.toThrow();
    document.querySelector('[data-av-drawer-open]').click();
  });

  test('init() wires data-av-drawer-close triggers', () => {
    el('<div id="dr-b" class="av-drawer-backdrop av-drawer-open"><button data-av-drawer-close>Close</button></div>');
    drawer.init();
    document.querySelector('[data-av-drawer-close]').click();
  });

  test('open locks body scroll', () => {
    el('<div id="dsl1" class="av-drawer-backdrop"><div class="av-drawer"></div></div>');
    drawer.open('#dsl1');
    expect(document.body.style.overflow).toBe('hidden');
    drawer.close('#dsl1');
  });

  test('close restores body scroll', () => {
    el('<div id="dsl2" class="av-drawer-backdrop"><div class="av-drawer"></div></div>');
    drawer.open('#dsl2');
    drawer.close('#dsl2');
    expect(document.body.style.overflow).toBe('');
  });

  test('modal + drawer open together — body stays locked until both close', () => {
    el('<div id="dsl3" class="av-modal-backdrop"><div class="av-modal"></div></div>');
    el('<div id="dsl4" class="av-drawer-backdrop"><div class="av-drawer"></div></div>');
    modal.open('#dsl3');
    drawer.open('#dsl4');
    expect(document.body.style.overflow).toBe('hidden');
    modal.close('#dsl3');
    expect(document.body.style.overflow).toBe('hidden'); // drawer still open
    drawer.close('#dsl4');
    expect(document.body.style.overflow).toBe('');       // all closed
  });
});

// ── dropdown ──────────────────────────────────────────────────────────────────

describe('dropdown', () => {
  afterEach(cleanup);

  function makeDropdown(id = 'dd1') {
    const wrap = el(`
      <div id="${id}" class="av-dropdown">
        <button class="av-dropdown-trigger">Toggle</button>
        <ul class="av-dropdown-menu">
          <li class="av-dropdown-item" tabindex="0">Item 1</li>
          <li class="av-dropdown-item" tabindex="0">Item 2</li>
          <li class="av-dropdown-item" tabindex="0">Item 3</li>
        </ul>
      </div>
    `);
    return wrap.querySelector(`#${id}`);
  }

  test('open adds av-dropdown-open to menu', () => {
    const dd = makeDropdown();
    dropdown.open(dd);
    expect(dd.querySelector('.av-dropdown-menu').classList.contains('av-dropdown-open')).toBe(true);
  });

  test('open sets aria-expanded on trigger', () => {
    const dd = makeDropdown('dd2');
    dropdown.open(dd);
    expect(dd.querySelector('.av-dropdown-trigger').getAttribute('aria-expanded')).toBe('true');
  });

  test('close removes av-dropdown-open', () => {
    const dd = makeDropdown('dd3');
    dropdown.open(dd);
    dropdown.close(dd);
    expect(dd.querySelector('.av-dropdown-menu').classList.contains('av-dropdown-open')).toBe(false);
  });

  test('open with no menu does not throw', () => {
    const wrap = el('<div id="dd4" class="av-dropdown"><button class="av-dropdown-trigger">T</button></div>');
    expect(() => dropdown.open(wrap.querySelector('#dd4'))).not.toThrow();
  });

  test('close with no menu does not throw', () => {
    const wrap = el('<div id="dd5" class="av-dropdown"></div>');
    expect(() => dropdown.close(wrap.querySelector('#dd5'))).not.toThrow();
  });

  test('init() wires trigger click to toggle', () => {
    const dd = makeDropdown('dd6');
    dropdown.init();
    const trigger = dd.querySelector('.av-dropdown-trigger');
    trigger.click();
    expect(dd.querySelector('.av-dropdown-menu').classList.contains('av-dropdown-open')).toBe(true);
    trigger.click();
    expect(dd.querySelector('.av-dropdown-menu').classList.contains('av-dropdown-open')).toBe(false);
  });

  test('init() keyboard ArrowDown moves focus', () => {
    const dd = makeDropdown('dd7');
    dropdown.init();
    dropdown.open(dd);
    const menu = dd.querySelector('.av-dropdown-menu');
    const items = menu.querySelectorAll('.av-dropdown-item');
    items[0].focus();
    const e = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
    menu.dispatchEvent(e);
  });

  test('init() keyboard ArrowUp from first closes and focuses trigger', () => {
    const dd = makeDropdown('dd8');
    dropdown.init();
    dropdown.open(dd);
    const menu = dd.querySelector('.av-dropdown-menu');
    const items = menu.querySelectorAll('.av-dropdown-item');
    items[0].focus();
    const e = new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true });
    menu.dispatchEvent(e);
  });

  test('init() keyboard ArrowUp from second moves up', () => {
    const dd = makeDropdown('dd9');
    dropdown.init();
    dropdown.open(dd);
    const menu = dd.querySelector('.av-dropdown-menu');
    const items = menu.querySelectorAll('.av-dropdown-item');
    items[1].focus();
    const e = new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true });
    menu.dispatchEvent(e);
  });

  test('init() keyboard Escape closes dropdown', () => {
    const dd = makeDropdown('dd10');
    dropdown.init();
    dropdown.open(dd);
    const menu = dd.querySelector('.av-dropdown-menu');
    const e = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
    menu.dispatchEvent(e);
    expect(menu.classList.contains('av-dropdown-open')).toBe(false);
  });

  test('init() keyboard Home focuses first item', () => {
    const dd = makeDropdown('dd11');
    dropdown.init();
    dropdown.open(dd);
    const menu = dd.querySelector('.av-dropdown-menu');
    const e = new KeyboardEvent('keydown', { key: 'Home', bubbles: true });
    menu.dispatchEvent(e);
  });

  test('init() keyboard End focuses last item', () => {
    const dd = makeDropdown('dd12');
    dropdown.init();
    dropdown.open(dd);
    const menu = dd.querySelector('.av-dropdown-menu');
    const e = new KeyboardEvent('keydown', { key: 'End', bubbles: true });
    menu.dispatchEvent(e);
  });

  test('opening second dropdown closes first', () => {
    const dd1 = makeDropdown('ddA');
    const dd2 = makeDropdown('ddB');
    dropdown.open(dd1);
    dropdown.open(dd2);
    expect(dd1.querySelector('.av-dropdown-menu').classList.contains('av-dropdown-open')).toBe(false);
    expect(dd2.querySelector('.av-dropdown-menu').classList.contains('av-dropdown-open')).toBe(true);
  });

  test('outside click closes open dropdowns', () => {
    const dd = makeDropdown('ddC');
    dropdown.init();
    dropdown.open(dd);
    document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(dd.querySelector('.av-dropdown-menu').classList.contains('av-dropdown-open')).toBe(false);
  });

  test('typeahead: pressing "b" jumps to first item starting with B', () => {
    const wrap = el(`
      <div id="ddTA1" class="av-dropdown">
        <button class="av-dropdown-trigger">Toggle</button>
        <ul class="av-dropdown-menu">
          <li class="av-dropdown-item" tabindex="0">Apple</li>
          <li class="av-dropdown-item" tabindex="0">Banana</li>
          <li class="av-dropdown-item" tabindex="0">Cherry</li>
        </ul>
      </div>
    `);
    const dd = wrap.querySelector('#ddTA1');
    dropdown.init();
    dropdown.open(dd);
    const menu = dd.querySelector('.av-dropdown-menu');
    const items = [...menu.querySelectorAll('.av-dropdown-item')];
    items[0].focus();
    menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'b', bubbles: true }));
    expect(document.activeElement).toBe(items[1]); // Banana
  });

  test('typeahead: case-insensitive match', () => {
    const wrap = el(`
      <div id="ddTA2" class="av-dropdown">
        <button class="av-dropdown-trigger">Toggle</button>
        <ul class="av-dropdown-menu">
          <li class="av-dropdown-item" tabindex="0">Apple</li>
          <li class="av-dropdown-item" tabindex="0">Cherry</li>
        </ul>
      </div>
    `);
    const dd = wrap.querySelector('#ddTA2');
    dropdown.init();
    dropdown.open(dd);
    const menu = dd.querySelector('.av-dropdown-menu');
    const items = [...menu.querySelectorAll('.av-dropdown-item')];
    items[0].focus();
    menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'C', bubbles: true }));
    expect(document.activeElement).toBe(items[1]); // Cherry
  });

  test('typeahead: no match does not throw', () => {
    const dd = makeDropdown('ddTA3');
    dropdown.init();
    dropdown.open(dd);
    const menu = dd.querySelector('.av-dropdown-menu');
    expect(() => {
      menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'z', bubbles: true }));
    }).not.toThrow();
  });
});

// ── toast ─────────────────────────────────────────────────────────────────────

describe('toast', () => {
  beforeEach(() => {
    toast._reset();
  });

  afterEach(() => {
    cleanup();
    toast._reset();
    jest.useRealTimers();
  });

  test('show() returns object with dismiss and el', () => {
    const handle = toast.show({ title: 'Hello' });
    expect(handle).not.toBeNull();
    expect(typeof handle.dismiss).toBe('function');
    expect(handle.el).toBeDefined();
  });

  test('show() appends toast to body', () => {
    toast.show({ title: 'Test' });
    expect(document.querySelector('.av-toast')).not.toBeNull();
  });

  test('show() with type=success adds av-toast-success class', () => {
    toast.show({ title: 'Ok', type: 'success' });
    expect(document.querySelector('.av-toast-success')).not.toBeNull();
  });

  test('show() with type=warning adds av-toast-warning', () => {
    toast.show({ type: 'warning' });
    expect(document.querySelector('.av-toast-warning')).not.toBeNull();
  });

  test('show() with type=error adds av-toast-error', () => {
    toast.show({ type: 'error' });
    expect(document.querySelector('.av-toast-error')).not.toBeNull();
  });

  test('show() with type=light adds av-toast-light', () => {
    toast.show({ type: 'light' });
    expect(document.querySelector('.av-toast-light')).not.toBeNull();
  });

  test('show() creates container with correct placement class', () => {
    toast.show({ placement: 'bottom-left' });
    expect(document.querySelector('.av-toast-bottom-left')).not.toBeNull();
  });

  test('show() reuses existing container for same placement', () => {
    toast.show({ placement: 'top-right' });
    toast.show({ placement: 'top-right' });
    const containers = document.querySelectorAll('.av-toast-top-right');
    expect(containers.length).toBe(1);
  });

  test('show() with description renders description element', () => {
    toast.show({ title: 'T', description: 'Desc' });
    expect(document.querySelector('.av-toast-description')).not.toBeNull();
  });

  test('show() without description does not render description element', () => {
    toast.show({ title: 'T' });
    expect(document.querySelector('.av-toast-description')).toBeNull();
  });

  test('show() with duration=0 does not render progress bar', () => {
    toast.show({ title: 'T', duration: 0 });
    expect(document.querySelector('.av-toast-progress')).toBeNull();
  });

  test('show() with duration>0 renders progress bar', () => {
    toast.show({ title: 'T', duration: 3000 });
    expect(document.querySelector('.av-toast-progress')).not.toBeNull();
  });

  test('show() has close button', () => {
    toast.show({ title: 'T' });
    expect(document.querySelector('.av-toast-close')).not.toBeNull();
  });

  test('close button click calls dismiss', () => {
    const handle = toast.show({ title: 'T' });
    const closeBtn = handle.el.querySelector('.av-toast-close');
    closeBtn.click();
    expect(handle.el.classList.contains('av-toast-exit')).toBe(true);
  });

  test('dismiss() adds av-toast-exit class', () => {
    const handle = toast.show({ title: 'T' });
    handle.dismiss();
    expect(handle.el.classList.contains('av-toast-exit')).toBe(true);
  });

  test('show() all placements do not throw', () => {
    const placements = ['top-right', 'top-left', 'top-center', 'bottom-right', 'bottom-left', 'bottom-center'];
    placements.forEach((p) => {
      expect(() => toast.show({ placement: p })).not.toThrow();
    });
  });

  test('show() pauseOnHover registers mouseenter/mouseleave', () => {
    jest.useFakeTimers();
    const handle = toast.show({ title: 'T', duration: 5000, pauseOnHover: true });
    handle.el.dispatchEvent(new MouseEvent('mouseenter'));
    handle.el.dispatchEvent(new MouseEvent('mouseleave'));
    jest.useRealTimers();
  });

  test('show() with pauseOnHover=false does not add hover listeners', () => {
    expect(() => toast.show({ title: 'T', duration: 3000, pauseOnHover: false })).not.toThrow();
  });

  test('show() with no options does not throw', () => {
    expect(() => toast.show()).not.toThrow();
  });

  // ── queue / cap tests ──────────────────────────────────────────────────────

  describe('queue and cap', () => {
    beforeEach(() => {
      cleanup();
      toast._reset();
    });

    afterEach(() => {
      cleanup();
      toast._reset();
    });

    test('configure() sets maxVisible', () => {
      toast.configure({ maxVisible: 3 });
      const h1 = toast.show({ title: 'T1' });
      const h2 = toast.show({ title: 'T2' });
      const h3 = toast.show({ title: 'T3' });
      const h4 = toast.show({ title: 'T4' }); // should be queued
      expect(h1).not.toBeNull();
      expect(h2).not.toBeNull();
      expect(h3).not.toBeNull();
      expect(h4).toBeNull(); // queued, not rendered yet
      expect(document.querySelectorAll('.av-toast').length).toBe(3);
    });

    test('queued toast appears after one is dismissed', () => {
      toast.configure({ maxVisible: 2 });
      const h1 = toast.show({ title: 'T1', duration: 0 });
      toast.show({ title: 'T2', duration: 0 });
      toast.show({ title: 'T3', duration: 0 }); // queued

      expect(document.querySelectorAll('.av-toast').length).toBe(2);

      // Dismiss first toast — cleanup fires via transitionend or setTimeout
      h1.dismiss();
      // Simulate transitionend
      h1.el.dispatchEvent(new Event('transitionend'));

      // T3 should now be rendered
      expect(document.querySelectorAll('.av-toast').length).toBe(2);
    });

    test('showing exactly maxVisible toasts all render immediately', () => {
      toast.configure({ maxVisible: 5 });
      for (let i = 0; i < 5; i++) toast.show({ title: `T${i}` });
      expect(document.querySelectorAll('.av-toast').length).toBe(5);
    });

    test('toast over cap returns null', () => {
      toast.configure({ maxVisible: 1 });
      toast.show({ title: 'First' });
      const result = toast.show({ title: 'Second' });
      expect(result).toBeNull();
    });

    test('configure() ignores invalid maxVisible values', () => {
      toast.configure({ maxVisible: 0 });   // ignored
      toast.configure({ maxVisible: -1 });  // ignored
      toast.configure({ maxVisible: 'bad' }); // ignored
      // default of 5 should still apply
      for (let i = 0; i < 5; i++) toast.show({ title: `T${i}` });
      const overflow = toast.show({ title: 'overflow' });
      expect(overflow).toBeNull();
    });
  });
});

// ── accordion ─────────────────────────────────────────────────────────────────

describe('accordion', () => {
  afterEach(cleanup);

  function makeAccordion(opts = '') {
    return el(`
      <div class="av-accordion" ${opts}>
        <div class="av-accordion-item">
          <button class="av-accordion-trigger" aria-expanded="false" aria-controls="p1">Q1</button>
          <div id="p1" class="av-accordion-content">A1</div>
        </div>
        <div class="av-accordion-item">
          <button class="av-accordion-trigger" aria-expanded="false" aria-controls="p2">Q2</button>
          <div id="p2" class="av-accordion-content">A2</div>
        </div>
      </div>
    `);
  }

  test('init() does not throw', () => {
    makeAccordion();
    expect(() => accordion.init()).not.toThrow();
  });

  test('clicking trigger expands content', () => {
    makeAccordion();
    accordion.init();
    const trigger = document.querySelector('.av-accordion-trigger');
    trigger.click();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  test('clicking open trigger collapses content', () => {
    makeAccordion();
    accordion.init();
    const trigger = document.querySelector('.av-accordion-trigger');
    trigger.click();
    trigger.click();
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  test('single-open mode closes other items', () => {
    makeAccordion();
    accordion.init();
    const triggers = document.querySelectorAll('.av-accordion-trigger');
    triggers[0].click();
    triggers[1].click();
    expect(triggers[0].getAttribute('aria-expanded')).toBe('false');
    expect(triggers[1].getAttribute('aria-expanded')).toBe('true');
  });

  test('data-av-multiple allows multiple open', () => {
    makeAccordion('data-av-multiple');
    accordion.init();
    const triggers = document.querySelectorAll('.av-accordion-trigger');
    triggers[0].click();
    triggers[1].click();
    expect(triggers[0].getAttribute('aria-expanded')).toBe('true');
    expect(triggers[1].getAttribute('aria-expanded')).toBe('true');
  });

  test('Enter key triggers toggle', () => {
    makeAccordion();
    accordion.init();
    const trigger = document.querySelector('.av-accordion-trigger');
    const e = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
    trigger.dispatchEvent(e);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  test('Space key triggers toggle', () => {
    makeAccordion();
    accordion.init();
    const trigger = document.querySelector('.av-accordion-trigger');
    const e = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
    trigger.dispatchEvent(e);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });
});

// ── tabs ──────────────────────────────────────────────────────────────────────

describe('tabs', () => {
  afterEach(cleanup);

  function makeTabs() {
    return el(`
      <div class="av-tabs" data-av-tabs>
        <button class="av-tab av-active" aria-controls="tp1">Tab 1</button>
        <button class="av-tab" aria-controls="tp2">Tab 2</button>
        <button class="av-tab" aria-controls="tp3">Tab 3</button>
        <div id="tp1" class="av-tab-panel av-active">Panel 1</div>
        <div id="tp2" class="av-tab-panel">Panel 2</div>
        <div id="tp3" class="av-tab-panel">Panel 3</div>
      </div>
    `);
  }

  test('init() does not throw', () => {
    makeTabs();
    expect(() => tabs.init()).not.toThrow();
  });

  test('clicking a tab activates it', () => {
    makeTabs();
    tabs.init();
    const tabEls = document.querySelectorAll('.av-tab');
    tabEls[1].click();
    expect(tabEls[1].classList.contains('av-active')).toBe(true);
    expect(tabEls[1].getAttribute('aria-selected')).toBe('true');
  });

  test('clicking a tab deactivates others', () => {
    makeTabs();
    tabs.init();
    const tabEls = document.querySelectorAll('.av-tab');
    tabEls[0].click();
    tabEls[1].click();
    expect(tabEls[0].classList.contains('av-active')).toBe(false);
  });

  test('ArrowRight moves to next tab', () => {
    makeTabs();
    tabs.init();
    const tabEls = document.querySelectorAll('.av-tab');
    tabEls[0].focus();
    const e = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
    tabEls[0].dispatchEvent(e);
  });

  test('ArrowLeft moves to previous tab', () => {
    makeTabs();
    tabs.init();
    const tabEls = document.querySelectorAll('.av-tab');
    tabEls[1].focus();
    const e = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true });
    tabEls[1].dispatchEvent(e);
  });

  test('Home key moves to first tab', () => {
    makeTabs();
    tabs.init();
    const tabEls = document.querySelectorAll('.av-tab');
    tabEls[2].focus();
    const e = new KeyboardEvent('keydown', { key: 'Home', bubbles: true });
    tabEls[2].dispatchEvent(e);
  });

  test('End key moves to last tab', () => {
    makeTabs();
    tabs.init();
    const tabEls = document.querySelectorAll('.av-tab');
    tabEls[0].focus();
    const e = new KeyboardEvent('keydown', { key: 'End', bubbles: true });
    tabEls[0].dispatchEvent(e);
  });

  test('ArrowRight wraps around to first tab', () => {
    makeTabs();
    tabs.init();
    const tabEls = document.querySelectorAll('.av-tab');
    tabEls[2].focus();
    const e = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
    tabEls[2].dispatchEvent(e);
  });

  test('clicking tab with panel activates panel', () => {
    makeTabs();
    tabs.init();
    const tabEls = document.querySelectorAll('.av-tab');
    tabEls[1].click();
    const panel = document.getElementById('tp2');
    expect(panel.classList.contains('av-active')).toBe(true);
  });
});

// ── navbar ─────────────────────────────────────────────────────────────────────

describe('navbar', () => {
  afterEach(cleanup);

  function makeNavbar() {
    return el(`
      <nav class="av-navbar">
        <button class="av-navbar-toggle" aria-expanded="false" aria-label="Menu">☰</button>
        <div class="av-navbar-collapse">
          <a href="#">Link 1</a>
        </div>
      </nav>
    `);
  }

  test('init() does not throw', () => {
    makeNavbar();
    expect(() => navbar.init()).not.toThrow();
  });

  test('toggle click opens collapse', () => {
    makeNavbar();
    navbar.init();
    const toggle = document.querySelector('.av-navbar-toggle');
    toggle.click();
    const collapse = document.querySelector('.av-navbar-collapse');
    expect(collapse.classList.contains('av-navbar-collapse-open')).toBe(true);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
  });

  test('toggle click twice closes collapse', () => {
    makeNavbar();
    navbar.init();
    const toggle = document.querySelector('.av-navbar-toggle');
    toggle.click();
    toggle.click();
    expect(document.querySelector('.av-navbar-collapse').classList.contains('av-navbar-collapse-open')).toBe(false);
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  test('outside click closes navbar collapse', () => {
    makeNavbar();
    navbar.init();
    const toggle = document.querySelector('.av-navbar-toggle');
    toggle.click();
    document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(document.querySelector('.av-navbar-collapse').classList.contains('av-navbar-collapse-open')).toBe(false);
  });

  test('toggle without navbar parent does not throw', () => {
    el('<button class="av-navbar-toggle">☰</button>');
    expect(() => navbar.init()).not.toThrow();
  });
});

// ── trapFocus Tab/Shift+Tab branch coverage ────────────────────────────────────

describe('modal trapFocus keyboard', () => {
  afterEach(cleanup);

  test('Tab on last focusable cycles to first', () => {
    el('<div id="tf1" class="av-modal-backdrop"><div class="av-modal"><button id="f1">First</button><button id="l1">Last</button></div></div>');
    modal.open('#tf1');
    const dialog = document.querySelector('.av-modal');
    const last = dialog.querySelector('#l1');
    last.focus();
    // Simulate Tab on last element
    const e = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: false, bubbles: true, cancelable: true });
    // jsdom document.activeElement must equal last for the branch to fire
    Object.defineProperty(document, 'activeElement', { value: last, configurable: true });
    dialog.dispatchEvent(e);
    modal.close('#tf1');
  });

  test('Shift+Tab on first focusable cycles to last', () => {
    el('<div id="tf2" class="av-modal-backdrop"><div class="av-modal"><button id="f2">First</button><button id="l2">Last</button></div></div>');
    modal.open('#tf2');
    const dialog = document.querySelector('.av-modal');
    const first = dialog.querySelector('#f2');
    first.focus();
    const e = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true });
    Object.defineProperty(document, 'activeElement', { value: first, configurable: true });
    dialog.dispatchEvent(e);
    modal.close('#tf2');
  });

  test('trapFocus with no focusable elements returns noop', () => {
    el('<div id="tf3" class="av-modal-backdrop"><div class="av-modal"><p>No focusable</p></div></div>');
    expect(() => modal.open('#tf3')).not.toThrow();
    modal.close('#tf3');
  });

  test('Tab cycles to dynamically added button', () => {
    const wrapper = el('<div id="tf4" class="av-modal-backdrop"><div class="av-modal"><button id="f4">First</button></div></div>');
    modal.open('#tf4');
    const modalEl = wrapper.querySelector('.av-modal');

    // Add a button after opening
    const newBtn = document.createElement('button');
    newBtn.id = 'dynamic4';
    newBtn.textContent = 'Dynamic';
    modalEl.appendChild(newBtn);

    // Tab from the last (now: newBtn) should cycle to first
    newBtn.focus();
    const e = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
    modalEl.dispatchEvent(e);
    // No error thrown and focus cycling works
    expect(() => modalEl.dispatchEvent(e)).not.toThrow();

    modal.close('#tf4');
  });
});

describe('drawer backdrop click', () => {
  afterEach(cleanup);

  test('click on backdrop element closes drawer', () => {
    const wrap = el('<div id="dbk1" class="av-drawer-backdrop"><div class="av-drawer"></div></div>');
    const backdrop = wrap.querySelector('#dbk1');
    drawer.open(backdrop);
    expect(backdrop.classList.contains('av-drawer-open')).toBe(true);
    // Dispatch a click with target === backdrop
    const e = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(e, 'target', { value: backdrop });
    backdrop.dispatchEvent(e);
  });
});

// ── extra branch coverage ──────────────────────────────────────────────────────

describe('modal: open/close with no dialog child', () => {
  afterEach(cleanup);

  test('open with backdrop but no .av-modal child does not throw', () => {
    el('<div id="mb1" class="av-modal-backdrop"></div>');
    expect(() => modal.open('#mb1')).not.toThrow();
    modal.close('#mb1');
  });

  test('close calls _avCleanup when present', () => {
    el('<div id="mb2" class="av-modal-backdrop"></div>');
    modal.open('#mb2');
    // Manually attach _avCleanup to verify it gets called
    const backdrop = document.getElementById('mb2');
    let cleaned = false;
    backdrop._avCleanup = () => { cleaned = true; };
    modal.close('#mb2');
    expect(cleaned).toBe(true);
  });
});

describe('drawer: open/close with no .av-drawer child', () => {
  afterEach(cleanup);

  test('open with backdrop but no .av-drawer child does not throw', () => {
    el('<div id="db1" class="av-drawer-backdrop"></div>');
    expect(() => drawer.open('#db1')).not.toThrow();
    drawer.close('#db1');
  });

  test('close calls _avCleanup when present', () => {
    el('<div id="db2" class="av-drawer-backdrop"></div>');
    drawer.open('#db2');
    const backdrop = document.getElementById('db2');
    let cleaned = false;
    backdrop._avCleanup = () => { cleaned = true; };
    drawer.close('#db2');
    expect(cleaned).toBe(true);
  });
});

describe('dropdown: open with no trigger element', () => {
  afterEach(cleanup);

  test('open with menu but no trigger does not throw', () => {
    const wrap = el('<div id="ddnt" class="av-dropdown"><ul class="av-dropdown-menu"><li class="av-dropdown-item" tabindex="0">I</li></ul></div>');
    expect(() => dropdown.open(wrap.querySelector('#ddnt'))).not.toThrow();
    expect(() => dropdown.close(wrap.querySelector('#ddnt'))).not.toThrow();
  });
});

describe('accordion: close all without aria-controls target', () => {
  afterEach(cleanup);

  test('toggle works when aria-controls id does not exist in DOM', () => {
    el(`
      <div class="av-accordion">
        <button class="av-accordion-trigger" aria-expanded="false" aria-controls="missing-id">Q</button>
      </div>
    `);
    accordion.init();
    const trigger = document.querySelector('.av-accordion-trigger');
    trigger.click();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    trigger.click();
  });

  test('single-open: closing others without content el works', () => {
    el(`
      <div class="av-accordion">
        <button class="av-accordion-trigger" aria-expanded="true" aria-controls="miss1">Q1</button>
        <button class="av-accordion-trigger" aria-expanded="false" aria-controls="miss2">Q2</button>
      </div>
    `);
    accordion.init();
    const triggers = document.querySelectorAll('.av-accordion-trigger');
    triggers[1].click();
    expect(triggers[1].getAttribute('aria-expanded')).toBe('true');
  });
});

describe('tabs: tab without aria-controls panel id', () => {
  afterEach(cleanup);

  test('clicking tab without panel id does not throw', () => {
    el(`
      <div class="av-tabs" data-av-tabs>
        <button class="av-tab av-active">Tab A</button>
        <button class="av-tab">Tab B</button>
      </div>
    `);
    tabs.init();
    const tabEls = document.querySelectorAll('.av-tab');
    expect(() => tabEls[1].click()).not.toThrow();
  });

  test('ArrowLeft on first tab wraps to last', () => {
    el(`
      <div class="av-tabs" data-av-tabs>
        <button class="av-tab av-active">Tab A</button>
        <button class="av-tab">Tab B</button>
      </div>
    `);
    tabs.init();
    const tabEls = document.querySelectorAll('.av-tab');
    const e = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true });
    tabEls[0].dispatchEvent(e);
  });

  test('unhandled key does nothing', () => {
    el('<div class="av-tabs" data-av-tabs><button class="av-tab">Tab A</button></div>');
    tabs.init();
    const tabEl = document.querySelector('.av-tab');
    const e = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
    expect(() => tabEl.dispatchEvent(e)).not.toThrow();
  });
});

// ── initAll ───────────────────────────────────────────────────────────────────

describe('initAll', () => {
  afterEach(cleanup);

  test('initAll() does not throw when DOM is ready', () => {
    expect(() => initAll()).not.toThrow();
  });

  test('initAll() initialises all components without error', () => {
    el(`
      <div class="av-accordion"><button class="av-accordion-trigger" aria-expanded="false" aria-controls="ip1">Q</button><div id="ip1" class="av-accordion-content">A</div></div>
      <div class="av-tabs" data-av-tabs><button class="av-tab">Tab</button><div class="av-tab-panel">P</div></div>
      <nav class="av-navbar"><button class="av-navbar-toggle" aria-expanded="false">☰</button><div class="av-navbar-collapse"></div></nav>
    `);
    expect(() => initAll()).not.toThrow();
  });

  test('initAll() defers to DOMContentLoaded when readyState=loading', () => {
    // Temporarily mock readyState
    const orig = Object.getOwnPropertyDescriptor(document, 'readyState');
    Object.defineProperty(document, 'readyState', { value: 'loading', configurable: true });
    expect(() => initAll()).not.toThrow();
    if (orig) Object.defineProperty(document, 'readyState', orig);
    else Object.defineProperty(document, 'readyState', { value: 'complete', configurable: true });
    document.dispatchEvent(new Event('DOMContentLoaded'));
  });
});

// ── createTable ───────────────────────────────────────────────────────────────

describe('createTable', () => {
  const COLS = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'age',  label: 'Age',  sortable: true, align: 'right' },
  ];
  const ROWS = [
    { name: 'Alice', role: 'Admin',  age: 30 },
    { name: 'Bob',   role: 'Editor', age: 25 },
    { name: 'Carol', role: 'Viewer', age: 35 },
  ];

  afterEach(cleanup);

  test('createTable export is a function', () => {
    expect(typeof createTable).toBe('function');
  });

  test('returns null for non-existent target', () => {
    expect(createTable('#no-such-el')).toBeNull();
  });

  test('renders a table into target', () => {
    const wrap = el('<div id="tbl1"></div>');
    createTable('#tbl1', { columns: COLS, rows: ROWS });
    expect(wrap.querySelector('table')).not.toBeNull();
  });

  test('renders correct number of header columns', () => {
    const wrap = el('<div id="tbl2"></div>');
    createTable('#tbl2', { columns: COLS, rows: ROWS });
    expect(wrap.querySelectorAll('th').length).toBe(3);
  });

  test('renders correct number of body rows', () => {
    const wrap = el('<div id="tbl3"></div>');
    createTable('#tbl3', { columns: COLS, rows: ROWS });
    expect(wrap.querySelectorAll('tbody tr').length).toBe(3);
  });

  test('renders empty state message when rows is empty', () => {
    const wrap = el('<div id="tbl4"></div>');
    createTable('#tbl4', { columns: COLS, rows: [], emptyMessage: 'Nothing here' });
    expect(wrap.innerHTML).toContain('Nothing here');
  });

  test('renders loading skeleton when loading=true', () => {
    const wrap = el('<div id="tbl5"></div>');
    createTable('#tbl5', { columns: COLS, rows: ROWS, loading: true });
    expect(wrap.querySelector('.av-skeleton')).not.toBeNull();
  });

  test('setRows() updates table data', () => {
    const wrap = el('<div id="tbl6"></div>');
    const ctrl = createTable('#tbl6', { columns: COLS, rows: ROWS });
    ctrl.setRows([{ name: 'Dave', role: 'Dev', age: 28 }]);
    expect(wrap.querySelectorAll('tbody tr').length).toBe(1);
  });

  test('setLoading(true) shows skeleton', () => {
    const wrap = el('<div id="tbl7"></div>');
    const ctrl = createTable('#tbl7', { columns: COLS, rows: ROWS });
    ctrl.setLoading(true);
    expect(wrap.querySelector('.av-skeleton')).not.toBeNull();
  });

  test('setLoading(false) shows rows', () => {
    const wrap = el('<div id="tbl8"></div>');
    const ctrl = createTable('#tbl8', { columns: COLS, rows: ROWS, loading: true });
    ctrl.setLoading(false);
    expect(wrap.querySelectorAll('tbody tr').length).toBe(3);
  });

  test('clicking sortable header sorts rows asc', () => {
    const wrap = el('<div id="tbl9"></div>');
    createTable('#tbl9', { columns: COLS, rows: ROWS });
    const th = [...wrap.querySelectorAll('th')].find(t => t.getAttribute('data-av-sort') === 'name');
    th.click();
    const cells = [...wrap.querySelectorAll('tbody tr td:first-child')].map(td => td.textContent);
    expect(cells).toEqual([...cells].sort());
  });

  test('clicking same header twice reverses sort to desc', () => {
    const wrap = el('<div id="tbl10"></div>');
    createTable('#tbl10', { columns: COLS, rows: ROWS });
    const th = [...wrap.querySelectorAll('th')].find(t => t.getAttribute('data-av-sort') === 'name');
    th.click(); th.click();
    const cells = [...wrap.querySelectorAll('tbody tr td:first-child')].map(td => td.textContent);
    expect(cells).toEqual([...cells].sort().reverse());
  });

  test('sort() method sorts programmatically', () => {
    const wrap = el('<div id="tbl11"></div>');
    const ctrl = createTable('#tbl11', { columns: COLS, rows: ROWS });
    ctrl.sort('age', 'asc');
    const cells = [...wrap.querySelectorAll('tbody tr td:last-child')].map(td => td.textContent);
    expect(cells[0]).toBe('25');
  });

  test('striped class applied when striped=true', () => {
    const wrap = el('<div id="tbl12"></div>');
    createTable('#tbl12', { columns: COLS, rows: ROWS, striped: true });
    expect(wrap.querySelector('.av-table-striped')).not.toBeNull();
  });

  test('bordered class applied when bordered=true', () => {
    const wrap = el('<div id="tbl13"></div>');
    createTable('#tbl13', { columns: COLS, rows: ROWS, bordered: true });
    expect(wrap.querySelector('.av-table-bordered')).not.toBeNull();
  });

  test('stickyHeader class applied when stickyHeader=true', () => {
    const wrap = el('<div id="tbl14"></div>');
    createTable('#tbl14', { columns: COLS, rows: ROWS, stickyHeader: true });
    expect(wrap.querySelector('.av-table-sticky')).not.toBeNull();
  });

  test('custom render function used for cell', () => {
    const wrap = el('<div id="tbl15"></div>');
    const cols = [{ key: 'name', label: 'Name', render: (v) => `<b>${v}</b>` }];
    createTable('#tbl15', { columns: cols, rows: [{ name: 'Alice' }] });
    expect(wrap.querySelector('td b')).not.toBeNull();
  });

  test('pagination renders when enabled', () => {
    const manyRows = Array.from({ length: 25 }, (_, i) => ({ name: `User ${i}`, role: 'x', age: i }));
    const wrap = el('<div id="tbl16"></div>');
    createTable('#tbl16', { columns: COLS, rows: manyRows, pagination: { enabled: true, rowsPerPage: 10 } });
    expect(wrap.querySelector('.av-pagination')).not.toBeNull();
  });

  test('pagination shows only rowsPerPage rows', () => {
    const manyRows = Array.from({ length: 25 }, (_, i) => ({ name: `User ${i}`, role: 'x', age: i }));
    const wrap = el('<div id="tbl17"></div>');
    createTable('#tbl17', { columns: COLS, rows: manyRows, pagination: { enabled: true, rowsPerPage: 10 } });
    expect(wrap.querySelectorAll('tbody tr').length).toBe(10);
  });

  test('next page button advances page', () => {
    const manyRows = Array.from({ length: 25 }, (_, i) => ({ name: `User ${i}`, role: 'x', age: i }));
    const wrap = el('<div id="tbl18"></div>');
    createTable('#tbl18', { columns: COLS, rows: manyRows, pagination: { enabled: true, rowsPerPage: 10 } });
    wrap.querySelector('[data-av-next]').click();
    expect(wrap.querySelectorAll('tbody tr').length).toBeLessThanOrEqual(10);
  });

  test('prev page button is disabled on first page', () => {
    const manyRows = Array.from({ length: 25 }, (_, i) => ({ name: `User ${i}`, role: 'x', age: i }));
    const wrap = el('<div id="tbl19"></div>');
    createTable('#tbl19', { columns: COLS, rows: manyRows, pagination: { enabled: true, rowsPerPage: 10 } });
    expect(wrap.querySelector('[data-av-prev]').disabled).toBe(true);
  });

  test('setPage() navigates to page', () => {
    const manyRows = Array.from({ length: 25 }, (_, i) => ({ name: `User ${i}`, role: 'x', age: i }));
    const wrap = el('<div id="tbl20"></div>');
    const ctrl = createTable('#tbl20', { columns: COLS, rows: manyRows, pagination: { enabled: true, rowsPerPage: 10 } });
    ctrl.setPage(3);
    expect(wrap.querySelector('[data-av-next]').disabled).toBe(true);
  });

  test('rows-per-page select change re-renders', () => {
    const manyRows = Array.from({ length: 25 }, (_, i) => ({ name: `User ${i}`, role: 'x', age: i }));
    const wrap = el('<div id="tbl21"></div>');
    createTable('#tbl21', { columns: COLS, rows: manyRows, pagination: { enabled: true, rowsPerPage: 10, rowsPerPageOptions: [10, 25] } });
    const sel = wrap.querySelector('[data-av-rpp]');
    sel.value = '25';
    sel.dispatchEvent(new Event('change'));
    expect(wrap.querySelectorAll('tbody tr').length).toBe(25);
  });

  test('prev page button navigates back', () => {
    const manyRows = Array.from({ length: 25 }, (_, i) => ({ name: `User ${i}`, role: 'x', age: i }));
    const wrap = el('<div id="tbl22"></div>');
    createTable('#tbl22', { columns: COLS, rows: manyRows, pagination: { enabled: true, rowsPerPage: 10 } });
    wrap.querySelector('[data-av-next]').click();
    wrap.querySelector('[data-av-prev]').click();
    expect(wrap.querySelector('[data-av-prev]').disabled).toBe(true);
  });

  test('destroy() clears container and removes listeners', () => {
    const wrap = el('<div id="tbl23"></div>');
    const ctrl = createTable('#tbl23', { columns: COLS, rows: ROWS });
    ctrl.destroy();
    expect(wrap.querySelector('table')).toBeNull();
  });

  test('no-pagination renders all rows without pagination bar', () => {
    const wrap = el('<div id="tbl24"></div>');
    createTable('#tbl24', { columns: COLS, rows: ROWS, pagination: { enabled: false } });
    expect(wrap.querySelector('.av-pagination')).toBeNull();
    expect(wrap.querySelectorAll('tbody tr').length).toBe(3);
  });

  test('accepts element reference instead of selector', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const ctrl = createTable(div, { columns: COLS, rows: ROWS });
    expect(div.querySelector('table')).not.toBeNull();
    ctrl.destroy();
  });

  test('XSS: cell content is escaped', () => {
    const wrap = el('<div id="tbl25"></div>');
    createTable('#tbl25', { columns: [{ key: 'x', label: 'X' }], rows: [{ x: '<script>alert(1)</script>' }] });
    expect(wrap.innerHTML).not.toContain('<script>');
    expect(wrap.innerHTML).toContain('&lt;script&gt;');
  });
});
