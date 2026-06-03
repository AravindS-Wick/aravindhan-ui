# @aravi1008/ui

> **One install. Full design system.** Global CSS, design tokens, 6 themes, 150+ icons, 25 components, interactive JS, and TypeScript types — framework-agnostic, production-ready.

[![npm version](https://img.shields.io/npm/v/@aravi1008/ui)](https://www.npmjs.com/package/@aravi1008/ui)
[![npm downloads](https://img.shields.io/npm/dm/@aravi1008/ui)](https://www.npmjs.com/package/@aravi1008/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Coverage](https://img.shields.io/badge/coverage-95%25-brightgreen)](https://github.com/AravindS-Wick/aravindhan-ui)
[![Accessibility](https://img.shields.io/badge/a11y-axe--core%20audited-brightgreen)](https://github.com/AravindS-Wick/aravindhan-ui)
[![Bundle size](https://img.shields.io/badge/CSS%20gzipped-35KB-blue)](https://www.npmjs.com/package/@aravi1008/ui)
[![RSC safe](https://img.shields.io/badge/RSC-safe-brightgreen)](https://github.com/AravindS-Wick/aravindhan-ui#server-components)
[![Docs](https://img.shields.io/badge/docs-coming%20soon-orange)](https://github.com/AravindS-Wick/aravindhan-ui)

---

## What is this?

`@aravi1008/ui` is a CSS-class-based design system — similar to Bootstrap, but modern:

- **Design tokens** — CSS custom properties, SCSS vars, and JS exports for consistent spacing, colour, and type scale
- **6 built-in themes** — switchable at runtime via a data attribute or JS API, no page reload
- **150+ SVG icons** — single sprite, inline or `<use>`, any size
- **25 CSS components** — buttons, cards, modals, drawers, toasts, accordions, tables, and more
- **Zero-dependency JS API** — wire interactive components with one call: `initAll()`
- **Full TypeScript types** — for every public function and interface
- **Works everywhere** — React, Vue, Angular, Svelte, Next.js, Nuxt, plain HTML, HTMX

---

## Install

```bash
npm install @aravi1008/ui
```

---

## Quick Start — 5 minutes to a full design system

### 1. Import the CSS

```js
// In your app entry — main.js, _app.tsx, main.ts, etc.
import '@aravi1008/ui/css';
```

Or via SCSS / LESS:

```scss
/* SCSS */
@use '@aravi1008/ui/scss';
```

```less
/* LESS */
@import '@aravi1008/ui/less';
```

### 2. Set a theme (optional — defaults to `light`)

```html
<!-- On your root element -->
<html data-av-theme="light">
```

```js
// Or via JS — reads OS dark mode pref automatically
import { initTheme } from '@aravi1008/ui';
initTheme('light');
```

### 3. Start using components

```html
<button class="av-btn av-btn-primary">Get Started</button>
<span class="av-badge av-badge-success">New</span>
<div class="av-alert av-alert-info">Your changes were saved.</div>
```

### 4. Wire interactive components (once)

```js
import { initAll } from '@aravi1008/ui/components';
initAll(); // wires all modals, drawers, dropdowns, accordions, tabs
```

That's it. Consistent design system across your entire project in 4 steps.

---

## Why use this instead of plain CSS?

| Problem | `@aravi1008/ui` solution |
|---------|--------------------------|
| Spacing is inconsistent across the codebase | Token scale — `var(--av-spacing-4)` everywhere, same values |
| Adding dark mode is a week of work | Built in. `data-av-theme="dark"` on `<html>` — done |
| Rebuilding buttons and modals every project | 25 pre-built components, one class name away |
| No icon system | 150 SVG icons in one sprite — works like a font |
| Framework lock-in | Pure CSS — same classes in React, Vue, Angular, plain HTML |
| Accessibility gaps | `:focus-visible`, `prefers-reduced-motion`, ARIA on all interactive components |
| TypeScript types for the JS API | Ships with full `.d.ts` — autocomplete in every IDE |

---

## Framework Integration

### React / Next.js

```tsx
// app/layout.tsx  or  pages/_app.tsx
import '@aravi1008/ui/css';

// Use classes directly on JSX
export default function Page() {
  return (
    <div className="av-container av-py-8">
      <h1 className="av-text-3xl av-font-bold av-mb-4">Hello</h1>
      <button className="av-btn av-btn-primary av-btn-lg">Get started</button>
    </div>
  );
}
```

```tsx
// Wire interactive components once — supports SPA re-renders
'use client';
import { useEffect } from 'react';
import { initAll } from '@aravi1008/ui/components';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const cleanup = initAll({ observe: true }); // MutationObserver for dynamic content
    return cleanup;
  }, []);
  return <>{children}</>;
}
```

### Vue 3 / Nuxt

```ts
// main.ts  or  plugins/ui.ts
import '@aravi1008/ui/css';
import { initAll } from '@aravi1008/ui/components';

app.mount('#app');
initAll({ observe: true });
```

```vue
<template>
  <div class="av-card av-p-6">
    <h2 class="av-text-xl av-font-semibold av-mb-3">Card Title</h2>
    <button class="av-btn av-btn-primary" @click="save">Save</button>
  </div>
</template>
```

### Angular

```json
// angular.json — add to styles array:
"node_modules/@aravi1008/ui/dist/index.css"
```

```ts
// app.component.ts
import { initAll } from '@aravi1008/ui/components';

@Component({ ... })
export class AppComponent implements OnInit {
  ngOnInit() { initAll(); }
}
```

```html
<!-- template -->
<button class="av-btn av-btn-primary">Submit</button>
```

### Svelte / SvelteKit

```ts
// src/app.css  or  +layout.ts
import '@aravi1008/ui/css';
```

```svelte
<script>
  import { onMount, onDestroy } from 'svelte';
  import { initAll } from '@aravi1008/ui/components';
  let cleanup;
  onMount(() => { cleanup = initAll({ observe: true }); });
  onDestroy(() => cleanup?.());
</script>

<button class="av-btn av-btn-primary">Click</button>
```

### Plain HTML / CDN

```html
<link rel="stylesheet" href="https://unpkg.com/@aravi1008/ui/dist/index.css">
<script type="module">
  import { initAll, toast } from 'https://unpkg.com/@aravi1008/ui/dist/components.js';
  initAll();
  document.querySelector('#btn').onclick = () =>
    toast.show({ title: 'Hello!', type: 'success' });
</script>
```

---

## Theming

Six built-in themes — switch at any time with no flash:

```html
<html data-av-theme="light">        <!-- default, clean white -->
<html data-av-theme="dark">         <!-- deep charcoal, auto via OS pref -->
<html data-av-theme="forest">       <!-- earthy greens -->
<html data-av-theme="ocean">        <!-- blue-teal -->
<html data-av-theme="professional"> <!-- corporate blue -->
<html data-av-theme="corporate">    <!-- navy + gold -->
```

**JS API:**

```js
import { setTheme, getTheme, initTheme } from '@aravi1008/ui';

initTheme('light');                        // init — reads localStorage, falls back to OS pref
setTheme('dark');                          // switch
setTheme('forest', { persist: true });     // switch + save to localStorage
getTheme();                                // → 'forest'
```

**Scoped themes** (different theme per section):

```html
<div data-av-theme="dark" class="av-p-6">
  <!-- Everything inside uses the dark theme, rest of page unchanged -->
  <button class="av-btn av-btn-primary">Dark Button</button>
</div>
```

---

## Components

### Buttons

```html
<button class="av-btn av-btn-primary">Primary</button>
<button class="av-btn av-btn-secondary">Secondary</button>
<button class="av-btn av-btn-outline">Outline</button>
<button class="av-btn av-btn-ghost">Ghost</button>
<button class="av-btn av-btn-danger">Danger</button>
<button class="av-btn av-btn-success">Success</button>

<!-- Sizes: xs / sm / (default) / lg / xl -->
<button class="av-btn av-btn-primary av-btn-xs">XS</button>
<button class="av-btn av-btn-primary av-btn-lg">Large</button>

<!-- States -->
<button class="av-btn av-btn-primary av-btn-loading">Saving…</button>
<button class="av-btn av-btn-primary av-btn-block">Full Width</button>
```

### Modal

```html
<button class="av-btn av-btn-primary" data-av-modal-open="#confirm">Open</button>

<div class="av-modal-backdrop" id="confirm">
  <div class="av-modal av-modal-md">
    <div class="av-modal-header">
      <h2 class="av-modal-title">Confirm</h2>
      <button class="av-modal-close" data-av-modal-close aria-label="Close">&times;</button>
    </div>
    <div class="av-modal-body"><p>Are you sure?</p></div>
    <div class="av-modal-footer">
      <button class="av-btn av-btn-outline" data-av-modal-close>Cancel</button>
      <button class="av-btn av-btn-danger">Delete</button>
    </div>
  </div>
</div>
```

```js
import { modal } from '@aravi1008/ui/components';
modal.open('#confirm');
modal.close('#confirm');
```

### Toast

```js
import { toast } from '@aravi1008/ui/components';

toast.show({ title: 'Saved!', type: 'success' });
toast.show({ title: 'Error', description: 'Please try again.', type: 'error', duration: 0 });

toast.configure({ maxVisible: 3 }); // queue excess toasts, show when space clears
```

### Drawer

```html
<button data-av-drawer-open="#sidebar">Open Sidebar</button>

<div class="av-drawer-backdrop" id="sidebar">
  <aside class="av-drawer av-drawer-left av-drawer-md">
    <div class="av-drawer-header">
      <h2>Menu</h2>
      <button data-av-drawer-close aria-label="Close">&times;</button>
    </div>
    <div class="av-drawer-body"><nav>...</nav></div>
  </aside>
</div>
```

### Dropdown

```html
<div class="av-dropdown">
  <button class="av-dropdown-trigger av-btn av-btn-outline">Options ▾</button>
  <ul class="av-dropdown-menu">
    <li class="av-dropdown-item" tabindex="0">Edit</li>
    <li class="av-dropdown-item" tabindex="0">Duplicate</li>
    <li class="av-dropdown-divider"></li>
    <li class="av-dropdown-item av-dropdown-item-danger" tabindex="0">Delete</li>
  </ul>
</div>
```

### Accordion

```html
<div class="av-accordion">
  <div class="av-accordion-item">
    <button class="av-accordion-trigger" aria-expanded="false" aria-controls="a1">
      Question
      <svg class="av-accordion-icon av-icon"><use href="#chevron-down"/></svg>
    </button>
    <div id="a1" class="av-accordion-content">
      <div class="av-accordion-body">Answer goes here.</div>
    </div>
  </div>
</div>
```

### Alert / Badge / Card

```html
<!-- Alerts -->
<div class="av-alert av-alert-info">Informational message.</div>
<div class="av-alert av-alert-success">Completed successfully.</div>
<div class="av-alert av-alert-warning">Review before continuing.</div>
<div class="av-alert av-alert-error">Something went wrong.</div>

<!-- Badges -->
<span class="av-badge av-badge-primary">Beta</span>
<span class="av-badge av-badge-success">Active</span>
<span class="av-badge av-badge-warning">Pending</span>

<!-- Card -->
<div class="av-card av-card-shadow av-card-hover">
  <div class="av-card-header">
    <h3 class="av-card-title">Card</h3>
  </div>
  <div class="av-card-body"><p>Content</p></div>
  <div class="av-card-footer">
    <button class="av-btn av-btn-primary av-btn-sm">View</button>
  </div>
</div>
```

### Other Components

| Component | Class prefix |
|-----------|-------------|
| Table | `av-table`, `av-table-striped`, `av-table-hover` |
| Tabs | `av-tabs`, `av-tab`, `av-tab-active`, `av-tab-panel` |
| Progress bar | `av-progress`, `av-progress-bar` |
| Skeleton loader | `av-skeleton`, `av-skeleton-text`, `av-skeleton-circle` |
| Switch / Toggle | `av-switch`, `av-switch-checked` |
| Avatar | `av-avatar`, `av-avatar-group`, `av-avatar-sm/lg` |
| Breadcrumb | `av-breadcrumb`, `av-breadcrumb-item` |
| Pagination | `av-pagination`, `av-page-item`, `av-page-active` |
| Tooltip | `av-tooltip` (data-av-tooltip attribute) |
| Spinner | `av-spinner`, `av-spinner-primary/sm/lg` |
| Stat / KPI | `av-stat`, `av-stat-value`, `av-stat-label` |
| Stepper | `av-stepper`, `av-step`, `av-step-active/complete` |
| Timeline | `av-timeline`, `av-timeline-item` |
| Navbar | `av-navbar`, `av-navbar-toggle`, `av-navbar-collapse` |

---

## Data Table

```js
import { createTable } from '@aravi1008/ui/components';

const ctrl = createTable('#my-table', {
  columns: [
    { key: 'name',   label: 'Name',   sortable: true },
    { key: 'role',   label: 'Role' },
    { key: 'status', label: 'Status',
      render: (v) => `<span class="av-badge av-badge-${v === 'active' ? 'success' : 'error'}">${v}</span>` },
  ],
  rows: [
    { name: 'Alice', role: 'Engineer', status: 'active' },
    { name: 'Bob',   role: 'Designer', status: 'inactive' },
  ],
  pagination: { enabled: true, rowsPerPage: 10 },
  striped: true,
  hoverable: true,
});

// Programmatic updates
ctrl.setRows(newData);
ctrl.setLoading(true);
ctrl.sort('name', 'asc');
ctrl.setPage(2);
ctrl.destroy();
```

---

## Utilities

```html
<!-- Spacing -->
<div class="av-p-4 av-m-2 av-mx-auto av-gap-6">...</div>

<!-- Flex -->
<div class="av-flex av-items-center av-justify-between av-gap-4">...</div>

<!-- Grid -->
<div class="av-grid av-grid-cols-3 av-gap-6">...</div>

<!-- Typography -->
<h1 class="av-text-4xl av-font-bold av-tracking-tight">Heading</h1>
<p class="av-text-sm av-text-secondary av-leading-relaxed">Body</p>

<!-- Colours -->
<div class="av-bg-primary av-text-white av-p-4">Branded</div>

<!-- Animation -->
<div class="av-animate-spin">Spinner</div>
<div class="av-animate-pulse">Pulsing skeleton</div>

<!-- Aspect ratio -->
<div class="av-aspect-video"><iframe ...></iframe></div>

<!-- Scroll -->
<div class="av-scroll-y av-scroll-smooth">Scrollable panel</div>

<!-- Responsive -->
<div class="av-hidden av-md:block">Desktop only</div>

<!-- Print -->
<div class="av-print:hidden">Hidden when printing</div>
```

---

## Design Tokens

Use the CSS custom properties in your own styles — they update automatically when the theme changes:

```css
.my-hero {
  background: var(--av-theme-color-primary);
  color: var(--av-theme-color-on-primary);
  padding: var(--av-spacing-8) var(--av-spacing-12);
  border-radius: var(--av-radius-xl);
  font-size: var(--av-text-xl);
}

.my-card {
  background: var(--av-theme-color-surface);
  border: 1px solid var(--av-theme-color-border);
  box-shadow: var(--av-shadow-md);
}
```

Import tokens in JS:

```js
import tokens from '@aravi1008/ui/tokens';
console.log(tokens.color.primary); // → '#2563eb'
```

---

## Icons

```html
<!-- Via sprite (recommended) -->
<svg class="av-icon"><use href="/node_modules/@aravi1008/ui/dist/icons/sprite.svg#arrow-right"/></svg>

<!-- Sizes -->
<svg class="av-icon av-icon-sm">...</svg>   <!-- 16px -->
<svg class="av-icon">...</svg>             <!-- 20px (default) -->
<svg class="av-icon av-icon-lg">...</svg>   <!-- 24px -->
<svg class="av-icon av-icon-xl">...</svg>   <!-- 32px -->
```

150+ icons: arrows, UI controls, social, file types, data viz, and more.

---

## Package Exports

| Import | What you get |
|--------|-------------|
| `@aravi1008/ui/css` | Full compiled CSS |
| `@aravi1008/ui/css/min` | Minified CSS |
| `@aravi1008/ui/scss` | SCSS source (customisable) |
| `@aravi1008/ui/less` | LESS source |
| `@aravi1008/ui` | JS theme switcher (`setTheme`, `initTheme`, `getTheme`) |
| `@aravi1008/ui/components` | JS interactive components |
| `@aravi1008/ui/tokens` | Token JS object |
| `@aravi1008/ui/tokens/css` | Token CSS vars only |
| `@aravi1008/ui/tokens/scss` | Token SCSS vars only |
| `@aravi1008/ui/themes/*` | Individual theme CSS |
| `@aravi1008/ui/icons` | SVG sprite path |
| `@aravi1008/ui/icons/*` | Individual SVG files |

---

## TypeScript

```ts
import type { ToastOptions, TableColumn, TableController, InitAllOptions } from '@aravi1008/ui/components';
import type { ThemeName } from '@aravi1008/ui';

const col: TableColumn = {
  key: 'status',
  label: 'Status',
  render: (v) => `<span class="av-badge av-badge-success">${v}</span>`,
};

const opts: ToastOptions = { title: 'Done', type: 'success', placement: 'top-right' };
```

---

## Upgrading Existing Projects

### From Bootstrap

| Bootstrap | `@aravi1008/ui` |
|-----------|----------------|
| `btn btn-primary` | `av-btn av-btn-primary` |
| `d-flex align-items-center` | `av-flex av-items-center` |
| `card` | `av-card` |
| `alert alert-success` | `av-alert av-alert-success` |
| `badge bg-success` | `av-badge av-badge-success` |
| `modal fade` | `av-modal-backdrop` + `initAll()` |
| `container` | `av-container` |
| `--bs-*` vars | `var(--av-theme-color-*)` |

### From Tailwind

The utility naming follows a similar pattern — `av-flex`, `av-p-4`, `av-text-lg` — so the mental model transfers. No PurgeCSS needed (bundle is already ~240KB).

### Migration approach

```bash
# 1. Install
npm install @aravi1008/ui

# 2. Add one import to your entry point
# import '@aravi1008/ui/css';

# 3. Both systems coexist — migrate file by file
# Before: <div class="card">
# After:  <div class="av-card">

# 4. Remove old library once fully migrated
npm uninstall bootstrap
```

---

## Bundle Size

| Asset | Raw | Gzipped |
|-------|-----|---------|
| Full CSS (`index.css`) | 256KB | 38KB |
| Minified CSS (`index.min.css`) | 236KB | **35KB** |
| JS theme switcher | ~3KB | ~1KB |
| JS components (interactive) | ~12KB | ~4KB |

> The CSS includes all 25 components, 6 themes, all utilities, and all tokens. Tree-shaking per component is available via `@aravi1008/ui/themes/*` imports.

---

## Accessibility

All interactive components (modal, drawer, accordion, tabs, dropdown, tooltip) are built with:

- `:focus-visible` on all keyboard-focusable elements
- `aria-*` attributes managed by the JS layer (`initAll()`)
- `prefers-reduced-motion` guards on all animations
- Colour contrast ≥ AA across all 6 themes
- Audited with [axe-core](https://github.com/dequelabs/axe-core) — 0 violations on default theme

---

## Server Components (Next.js App Router / RSC)

**RSC-safe: yes.**

The CSS package (`@aravi1008/ui/css`) is a static stylesheet — import it in your root layout with no restrictions:

```tsx
// app/layout.tsx
import '@aravi1008/ui/css';
```

The JS modules (`@aravi1008/ui`, `@aravi1008/ui/components`) use the browser DOM. Mark any file that imports them as a Client Component:

```tsx
'use client';
import { initTheme } from '@aravi1008/ui';
```

Tokens (`@aravi1008/ui/tokens`) are plain JSON — safe to import in any Server Component.

---

## Ecosystem

| Package | Purpose | Status |
|---------|---------|--------|
| `@aravi1008/ui` | Core — CSS, tokens, vanilla JS | ✅ Published |
| `@aravi1008/ui-mat` | JSX components for React/Vue/Angular/Svelte | 🚧 In development |
| Docs site | Full component reference + live demos | 🚧 In development |
| `npx @aravi1008/ui add` | CLI — eject & own individual components | 🗺️ Roadmap |
| VS Code extension | `av-` class autocomplete + snippets | 🗺️ Roadmap |

> **`@aravi1008/ui-mat`** brings MUI-style JSX components — `<Button>`, `<Alert>`, `<Modal>`, `<Drawer>` — that map to the same `av-` CSS classes under the hood. Same design system, multiple consumption patterns.

> **CLI model (coming):** `npx @aravi1008/ui add button modal card` ejects the component source into your project — you own the code, no runtime dependency. Inspired by shadcn/ui's ownership model.

---

## Browser Support

Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

---

## License

MIT © [Aravindhan Sivaraman](https://github.com/AravindS-Wick)
