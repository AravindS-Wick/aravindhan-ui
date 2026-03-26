# @aravi1008/ui

> A personal professional-grade design system. One install — full global CSS, tokens, themes, icons, utilities, and components.

[![npm version](https://img.shields.io/npm/v/@aravi1008/ui)](https://www.npmjs.com/package/@aravi1008/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## Install

```bash
npm install @aravi1008/ui
```

---

## Usage

### Plain CSS

```js
import '@aravi1008/ui/css';
```

### SCSS

```scss
@use '@aravi1008/ui/scss';
```

### LESS

```less
@import '@aravi1008/ui/less';
```

---

## Interactive Components

Wire all interactive components (modals, drawers, dropdowns, accordions, tabs) with one call:

```js
import { initAll } from '@aravi1008/ui/components';

// Basic — call once after DOM is ready
initAll();

// SPA mode — MutationObserver re-wires dynamically added components
const cleanup = initAll({ observe: true });
// In React: return cleanup from useEffect
// In Vue/Svelte: call cleanup in onUnmounted/onDestroy
```

### Toast

```js
import { toast } from '@aravi1008/ui/components';

toast.show({ title: 'Saved!', type: 'success' });
toast.show({ title: 'Error', description: 'Please try again.', type: 'error', duration: 0 });

// Limit how many toasts show at once — extras are queued
toast.configure({ maxVisible: 3 });
```

### Modal

```html
<button data-av-modal-open="#my-modal">Open</button>
<div class="av-modal-backdrop" id="my-modal">
  <div class="av-modal av-modal-md">
    <div class="av-modal-header">
      <h2 class="av-modal-title">Title</h2>
      <button class="av-modal-close" data-av-modal-close aria-label="Close">&times;</button>
    </div>
    <div class="av-modal-body"><p>Content</p></div>
  </div>
</div>
```

```js
import { modal } from '@aravi1008/ui/components';
modal.open('#my-modal');
modal.close('#my-modal');
```

---

## Themes

Switch via `data-av-theme` on any parent element:

```html
<html data-av-theme="dark">
<html data-av-theme="forest">
<html data-av-theme="ocean">
<html data-av-theme="professional">
<html data-av-theme="corporate">
```

Light is default. Dark auto-applies based on OS preference.

```js
import { setTheme, initTheme } from '@aravi1008/ui';

initTheme('light');                    // reads localStorage / OS pref on startup
setTheme('dark');                      // switch at runtime
setTheme('forest', { persist: true }); // switch + save to localStorage
```

### Custom Theming

Override tokens at the `:root` level — no `!important` needed. All components pick up the new values automatically:

```css
:root {
  --av-theme-color-primary:        #ffffff;
  --av-theme-color-text-inverse:   #000000;
  --av-theme-color-surface:        #0a0a0a;
  --av-theme-color-surface-raised: rgba(255, 255, 255, 0.05);
  --av-theme-color-border:         rgba(255, 255, 255, 0.1);
  --av-theme-color-text-primary:   #f5f0ea;
}
```

Scope a custom theme to a single section without affecting the rest of the page:

```html
<div data-av-theme="dark" style="--av-theme-color-primary: #a78bfa;">
  <!-- purple primary, dark bg, only inside this div -->
  <button class="av-btn av-btn-primary">Purple Button</button>
</div>
```

**Available tokens:** `--av-theme-color-primary`, `--av-theme-color-primary-hover`, `--av-theme-color-primary-active`, `--av-theme-color-primary-subtle`, `--av-theme-color-surface`, `--av-theme-color-surface-raised`, `--av-theme-color-border`, `--av-theme-color-border-strong`, `--av-theme-color-text-primary`, `--av-theme-color-text-secondary`, `--av-theme-color-text-inverse`, `--av-theme-color-success`, `--av-theme-color-warning`, `--av-theme-color-error`, `--av-theme-color-info`, `--av-theme-color-focus-ring`

---

## Components

```html
<!-- Buttons -->
<button class="av-btn av-btn-primary">Primary</button>
<button class="av-btn av-btn-outline av-btn-lg">Large Outline</button>
<button class="av-btn av-btn-danger">Danger</button>

<!-- Form -->
<input class="av-input" type="text" placeholder="Enter text" />
<select class="av-select">...</select>

<!-- Card -->
<div class="av-card av-card-shadow">
  <div class="av-card-header">Title</div>
  <div class="av-card-body">Content</div>
  <div class="av-card-footer">
    <button class="av-btn av-btn-primary av-btn-sm">Action</button>
  </div>
</div>

<!-- Badge / Alert / Spinner -->
<span class="av-badge av-badge-success">Active</span>
<div class="av-alert av-alert-success">Saved successfully.</div>
<span class="av-spinner av-spinner-primary"></span>
```

---

## Utilities

```html
<div class="av-p-4 av-m-2 av-mx-auto">spacing</div>
<div class="av-flex av-items-center av-justify-between av-gap-4">flex</div>
<div class="av-grid av-grid-cols-3 av-gap-4">grid</div>
<p class="av-text-lg av-font-semibold">typography</p>
<div class="av-hidden av-md:block">responsive</div>
<div class="av-container">centered layout</div>
```

---

## Design Tokens

```css
.my-element {
  color: var(--av-theme-color-primary);
  padding: var(--av-spacing-4);
  border-radius: var(--av-radius-lg);
}
```

---

## Available Themes

| Theme | `data-av-theme` | Description |
| --- | --- | --- |
| Light | `light` | Clean white (default) |
| Dark | `dark` | Deep charcoal, auto via OS pref |
| Forest | `forest` | Earthy greens |
| Ocean | `ocean` | Blue-teal |
| Professional | `professional` | Corporate blue |
| Corporate | `corporate` | Navy + gold |

---

## Ecosystem

| Package | Purpose | Status |
| --- | --- | --- |
| `@aravi1008/ui` | Core — CSS, tokens, vanilla JS | ✅ Published |
| `@aravi1008/ui-react` | React components wrapping `av-` classes | 🚧 In progress |
| `@aravi1008/ui-vue` | Vue 3 components | 🚧 In progress |
| `@aravi1008/ui-angular` | Angular standalone components | 🚧 In progress |
| `@aravi1008/ui-svelte` | Svelte 5 components | 🚧 In progress |
| Docs site | Full component reference + live demos | 🚧 In progress |

Framework packages are thin wrappers — they map props to `av-` CSS classes. The core CSS package does all real work.

---

## License

MIT © Aravindhan Sivaraman
