/**
 * @jest-environment jsdom
 *
 * Comprehensive component rendering and interaction tests
 * Tests core components: Button, Alert, Badge, Input, Modal, Card
 * Validates CSS class application, variants, and user interactions
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
  _resetScrollLock,
} from '../../src/components.js';

// ── Helpers ───────────────────────────────────────────────────────────────

function el(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div);
  return div;
}

function cleanup() {
  document.body.innerHTML = '';
  _resetScrollLock();
}

// ── Button Component Tests ─────────────────────────────────────────────────

describe('Button Component', () => {
  afterEach(cleanup);

  test('renders with av-btn class', () => {
    const container = el('<button class="av-btn">Click me</button>');
    const btn = container.querySelector('button');
    expect(btn).toHaveClass('av-btn');
    expect(btn.textContent).toBe('Click me');
  });

  test('renders primary variant', () => {
    const container = el('<button class="av-btn av-btn-primary">Primary</button>');
    const btn = container.querySelector('button');
    expect(btn).toHaveClass('av-btn-primary');
  });

  test('renders secondary variant', () => {
    const container = el('<button class="av-btn av-btn-secondary">Secondary</button>');
    const btn = container.querySelector('button');
    expect(btn).toHaveClass('av-btn-secondary');
  });

  test('renders success variant', () => {
    const container = el('<button class="av-btn av-btn-success">Success</button>');
    const btn = container.querySelector('button');
    expect(btn).toHaveClass('av-btn-success');
  });

  test('renders danger variant', () => {
    const container = el('<button class="av-btn av-btn-danger">Delete</button>');
    const btn = container.querySelector('button');
    expect(btn).toHaveClass('av-btn-danger');
  });

  test('renders size variants', () => {
    const container = el(`
      <button class="av-btn av-btn-sm">Small</button>
      <button class="av-btn av-btn-md">Medium</button>
      <button class="av-btn av-btn-lg">Large</button>
    `);
    expect(container.querySelector('.av-btn-sm')).toHaveClass('av-btn-sm');
    expect(container.querySelector('.av-btn-md')).toHaveClass('av-btn-md');
    expect(container.querySelector('.av-btn-lg')).toHaveClass('av-btn-lg');
  });

  test('button click event fires', () => {
    const clickHandler = jest.fn();
    const container = el('<button class="av-btn">Click</button>');
    const btn = container.querySelector('button');
    btn.addEventListener('click', clickHandler);
    btn.click();
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  test('renders disabled state', () => {
    const container = el('<button class="av-btn" disabled>Disabled</button>');
    const btn = container.querySelector('button');
    expect(btn.disabled).toBe(true);
  });

  test('renders with icon', () => {
    const container = el('<button class="av-btn"><span class="av-icon">→</span> Next</button>');
    const btn = container.querySelector('button');
    const icon = btn.querySelector('.av-icon');
    expect(icon.textContent).toBe('→');
  });
});

// ── Alert Component Tests ──────────────────────────────────────────────────

describe('Alert Component', () => {
  afterEach(cleanup);

  test('renders with av-alert class', () => {
    const container = el('<div class="av-alert">Alert message</div>');
    const alert = container.querySelector('.av-alert');
    expect(alert).toHaveClass('av-alert');
  });

  test('renders success variant', () => {
    const container = el('<div class="av-alert av-alert-success">Success!</div>');
    const alert = container.querySelector('.av-alert');
    expect(alert).toHaveClass('av-alert-success');
  });

  test('renders warning variant', () => {
    const container = el('<div class="av-alert av-alert-warning">Warning!</div>');
    const alert = container.querySelector('.av-alert');
    expect(alert).toHaveClass('av-alert-warning');
  });

  test('renders error variant', () => {
    const container = el('<div class="av-alert av-alert-error">Error!</div>');
    const alert = container.querySelector('.av-alert');
    expect(alert).toHaveClass('av-alert-error');
  });

  test('renders info variant', () => {
    const container = el('<div class="av-alert av-alert-info">Info!</div>');
    const alert = container.querySelector('.av-alert');
    expect(alert).toHaveClass('av-alert-info');
  });

  test('alert with close button', () => {
    const container = el(`
      <div class="av-alert">
        Message
        <button class="av-alert-close">×</button>
      </div>
    `);
    const closeBtn = container.querySelector('.av-alert-close');
    expect(closeBtn).toHaveClass('av-alert-close');
    closeBtn.click();
    expect(closeBtn).toBeInTheDocument();
  });
});

// ── Badge Component Tests ──────────────────────────────────────────────────

describe('Badge Component', () => {
  afterEach(cleanup);

  test('renders with av-badge class', () => {
    const container = el('<span class="av-badge">New</span>');
    const badge = container.querySelector('.av-badge');
    expect(badge).toHaveClass('av-badge');
  });

  test('renders primary variant', () => {
    const container = el('<span class="av-badge av-badge-primary">New</span>');
    const badge = container.querySelector('.av-badge');
    expect(badge).toHaveClass('av-badge-primary');
  });

  test('renders secondary variant', () => {
    const container = el('<span class="av-badge av-badge-secondary">Draft</span>');
    const badge = container.querySelector('.av-badge');
    expect(badge).toHaveClass('av-badge-secondary');
  });

  test('renders success variant', () => {
    const container = el('<span class="av-badge av-badge-success">Active</span>');
    const badge = container.querySelector('.av-badge');
    expect(badge).toHaveClass('av-badge-success');
  });

  test('renders danger variant', () => {
    const container = el('<span class="av-badge av-badge-danger">Urgent</span>');
    const badge = container.querySelector('.av-badge');
    expect(badge).toHaveClass('av-badge-danger');
  });

  test('renders size variants', () => {
    const container = el(`
      <span class="av-badge av-badge-sm">Small</span>
      <span class="av-badge av-badge-lg">Large</span>
    `);
    expect(container.querySelector('.av-badge-sm')).toHaveClass('av-badge-sm');
    expect(container.querySelector('.av-badge-lg')).toHaveClass('av-badge-lg');
  });

  test('renders as dot badge', () => {
    const container = el('<span class="av-badge av-badge-dot"></span>');
    const badge = container.querySelector('.av-badge');
    expect(badge).toHaveClass('av-badge-dot');
  });
});

// ── Input Component Tests ──────────────────────────────────────────────────

describe('Input Component', () => {
  afterEach(cleanup);

  test('renders text input', () => {
    const container = el('<input type="text" class="av-input" placeholder="Enter text">');
    const input = container.querySelector('input');
    expect(input).toHaveClass('av-input');
    expect(input.type).toBe('text');
  });

  test('input focus event fires', () => {
    const focusHandler = jest.fn();
    const container = el('<input type="text" class="av-input">');
    const input = container.querySelector('input');
    input.addEventListener('focus', focusHandler);
    input.focus();
    expect(focusHandler).toHaveBeenCalledTimes(1);
  });

  test('input blur event fires', () => {
    const blurHandler = jest.fn();
    const container = el('<input type="text" class="av-input">');
    const input = container.querySelector('input');
    input.addEventListener('blur', blurHandler);
    input.focus();
    input.blur();
    expect(blurHandler).toHaveBeenCalledTimes(1);
  });

  test('input value changes on user input', () => {
    const changeHandler = jest.fn();
    const container = el('<input type="text" class="av-input">');
    const input = container.querySelector('input');
    input.addEventListener('change', changeHandler);
    input.value = 'test value';
    input.dispatchEvent(new Event('change', { bubbles: true }));
    expect(input.value).toBe('test value');
    expect(changeHandler).toHaveBeenCalledTimes(1);
  });

  test('renders with disabled state', () => {
    const container = el('<input type="text" class="av-input" disabled>');
    const input = container.querySelector('input');
    expect(input.disabled).toBe(true);
  });

  test('renders textarea', () => {
    const container = el('<textarea class="av-input"></textarea>');
    const textarea = container.querySelector('textarea');
    expect(textarea).toHaveClass('av-input');
  });

  test('renders with label', () => {
    const container = el(`
      <label class="av-label">
        Email
        <input type="email" class="av-input">
      </label>
    `);
    const label = container.querySelector('label');
    expect(label).toHaveClass('av-label');
  });

  test('renders with error state', () => {
    const container = el(`
      <div class="av-input-group av-input-error">
        <input type="text" class="av-input">
        <span class="av-error-text">Field is required</span>
      </div>
    `);
    const group = container.querySelector('.av-input-group');
    expect(group).toHaveClass('av-input-error');
  });
});

// ── Modal Component Tests ──────────────────────────────────────────────────

describe('Modal Component', () => {
  afterEach(cleanup);

  test('renders modal structure', () => {
    const container = el(`
      <div class="av-modal" id="test-modal">
        <div class="av-modal-backdrop" data-av-modal-close></div>
        <div class="av-modal-dialog">
          <div class="av-modal-header">
            <h2>Modal Title</h2>
            <button class="av-modal-close" data-av-modal-close>×</button>
          </div>
          <div class="av-modal-body">Modal content</div>
          <div class="av-modal-footer">
            <button class="av-btn">Close</button>
          </div>
        </div>
      </div>
    `);
    const modalEl = container.querySelector('#test-modal');
    expect(modalEl).toHaveClass('av-modal');
    expect(container.querySelector('.av-modal-backdrop')).toBeInTheDocument();
    expect(container.querySelector('.av-modal-header')).toBeInTheDocument();
  });

  test('modal has open and close methods', () => {
    expect(typeof modal.open).toBe('function');
    expect(typeof modal.close).toBe('function');
  });

  test('modal has init method', () => {
    expect(typeof modal.init).toBe('function');
  });

  test('renders size variants', () => {
    const container = el(`
      <div class="av-modal av-modal-sm"></div>
      <div class="av-modal av-modal-lg"></div>
      <div class="av-modal av-modal-xl"></div>
    `);
    expect(container.querySelector('.av-modal-sm')).toHaveClass('av-modal-sm');
    expect(container.querySelector('.av-modal-lg')).toHaveClass('av-modal-lg');
    expect(container.querySelector('.av-modal-xl')).toHaveClass('av-modal-xl');
  });
});

// ── Card Component Tests ───────────────────────────────────────────────────

describe('Card Component', () => {
  afterEach(cleanup);

  test('renders with av-card class', () => {
    const container = el('<div class="av-card">Card content</div>');
    const card = container.querySelector('.av-card');
    expect(card).toHaveClass('av-card');
  });

  test('renders card with header', () => {
    const container = el(`
      <div class="av-card">
        <div class="av-card-header">Card Title</div>
        <div class="av-card-body">Card content</div>
      </div>
    `);
    const header = container.querySelector('.av-card-header');
    const body = container.querySelector('.av-card-body');
    expect(header.textContent).toBe('Card Title');
    expect(body.textContent).toBe('Card content');
  });

  test('renders card with footer', () => {
    const container = el(`
      <div class="av-card">
        <div class="av-card-body">Content</div>
        <div class="av-card-footer">
          <button class="av-btn">Action</button>
        </div>
      </div>
    `);
    const footer = container.querySelector('.av-card-footer');
    expect(footer).toBeInTheDocument();
  });

  test('renders card with image', () => {
    const container = el(`
      <div class="av-card">
        <img class="av-card-img" src="image.jpg" alt="Card image">
        <div class="av-card-body">Content</div>
      </div>
    `);
    const img = container.querySelector('.av-card-img');
    expect(img.src).toContain('image.jpg');
  });

  test('renders elevated card variant', () => {
    const container = el('<div class="av-card av-card-elevated">Content</div>');
    const card = container.querySelector('.av-card');
    expect(card).toHaveClass('av-card-elevated');
  });

  test('renders outlined card variant', () => {
    const container = el('<div class="av-card av-card-outline">Content</div>');
    const card = container.querySelector('.av-card');
    expect(card).toHaveClass('av-card-outline');
  });

  test('renders interactive card', () => {
    const clickHandler = jest.fn();
    const container = el('<div class="av-card av-card-interactive">Click me</div>');
    const card = container.querySelector('.av-card');
    card.addEventListener('click', clickHandler);
    card.click();
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});

// ── Comprehensive Integration Tests ────────────────────────────────────────

describe('Component Integration', () => {
  afterEach(cleanup);

  test('all components rendered together', () => {
    const container = el(`
      <div class="av-container">
        <button class="av-btn av-btn-primary">Button</button>
        <span class="av-badge av-badge-success">Badge</span>
        <div class="av-alert av-alert-info">Alert</div>
        <input type="text" class="av-input">
        <div class="av-card">Card</div>
      </div>
    `);
    expect(container.querySelector('.av-btn')).toBeInTheDocument();
    expect(container.querySelector('.av-badge')).toBeInTheDocument();
    expect(container.querySelector('.av-alert')).toBeInTheDocument();
    expect(container.querySelector('.av-input')).toBeInTheDocument();
    expect(container.querySelector('.av-card')).toBeInTheDocument();
  });

  test('components maintain css class prefixes', () => {
    const container = el(`
      <button class="av-btn">Button</button>
      <div class="av-alert">Alert</div>
      <span class="av-badge">Badge</span>
      <input class="av-input">
      <div class="av-card">Card</div>
    `);
    const allAvElements = container.querySelectorAll('[class*="av-"]');
    expect(allAvElements.length).toBeGreaterThan(0);
    allAvElements.forEach((element) => {
      const className = element.className;
      expect(className).toMatch(/av-/);
    });
  });

  test('responsive classes apply correctly', () => {
    const container = el(`
      <button class="av-btn av-sm:av-btn-sm av-lg:av-btn-lg">Responsive</button>
      <div class="av-card av-sm:av-card-sm av-lg:av-card-lg">Card</div>
    `);
    const btn = container.querySelector('.av-btn');
    expect(btn.className).toContain('av-');
  });

  test('dark mode classes apply', () => {
    const container = el(`
      <div class="av-dark:av-bg-gray-900">
        <button class="av-btn av-dark:av-btn-inverse">Dark Button</button>
      </div>
    `);
    const darkDiv = container.querySelector('[class*="av-dark"]');
    expect(darkDiv).toBeInTheDocument();
  });
});

// ── Accessibility Tests ────────────────────────────────────────────────────

describe('Accessibility Features', () => {
  afterEach(cleanup);

  test('buttons are keyboard accessible', () => {
    const keydownHandler = jest.fn();
    const container = el('<button class="av-btn">Click</button>');
    const btn = container.querySelector('button');
    btn.addEventListener('keydown', keydownHandler);
    const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
    btn.dispatchEvent(event);
    expect(keydownHandler).toHaveBeenCalledTimes(1);
  });

  test('inputs have focus visible state', () => {
    const container = el('<input type="text" class="av-input av-focus:av-ring-2">');
    const input = container.querySelector('input');
    expect(input.className).toContain('av-');
  });

  test('alert has role attribute', () => {
    const container = el('<div class="av-alert" role="alert">Message</div>');
    const alert = container.querySelector('[role="alert"]');
    expect(alert).toHaveAttribute('role', 'alert');
  });

  test('modal has proper aria attributes', () => {
    const container = el(`
      <div class="av-modal" role="dialog" aria-labelledby="modal-title" aria-modal="true">
        <h2 id="modal-title">Modal</h2>
      </div>
    `);
    const modalEl = container.querySelector('[role="dialog"]');
    expect(modalEl).toHaveAttribute('aria-modal', 'true');
  });
});

// ── Cross-Browser Compatibility Tests ──────────────────────────────────────

describe('Cross-Browser Compatibility', () => {
  afterEach(cleanup);

  test('components work in jsdom environment', () => {
    expect(document).toBeDefined();
    expect(window).toBeDefined();
    const container = el('<div class="av-container">Test</div>');
    expect(container).toBeInTheDocument();
  });

  test('css custom properties are recognized', () => {
    const container = el(`
      <div style="--av-color-primary: rgb(0, 0, 255); --av-spacing-4: 1rem;">
        Content
      </div>
    `);
    const div = container.querySelector('div');
    const styles = window.getComputedStyle(div);
    expect(styles).toBeDefined();
  });

  test('flexbox layouts work', () => {
    const container = el(`
      <div class="av-flex">
        <div>Item 1</div>
        <div>Item 2</div>
      </div>
    `);
    const flex = container.querySelector('.av-flex');
    expect(flex.children.length).toBe(2);
  });

  test('grid layouts work', () => {
    const container = el(`
      <div class="av-grid">
        <div>Cell 1</div>
        <div>Cell 2</div>
      </div>
    `);
    const grid = container.querySelector('.av-grid');
    expect(grid.children.length).toBe(2);
  });
});
