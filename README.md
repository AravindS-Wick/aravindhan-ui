# @aravindhan/ui

> A personal professional-grade design system. One install — full global CSS, tokens, themes, icons, utilities, and components.

[![npm version](https://img.shields.io/npm/v/@aravindhan/ui)](https://www.npmjs.com/package/@aravindhan/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## Install

```bash
npm install @aravindhan/ui
```

---

## Usage

### Plain CSS

```js
import '@aravindhan/ui/css';
```

### SCSS

```scss
@use '@aravindhan/ui/scss';
```

### LESS

```less
@import '@aravindhan/ui/less';
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

| Theme | Description |
| --- | --- |
| `light` | Clean white (default) |
| `dark` | Deep charcoal |
| `forest` | Earthy greens |
| `ocean` | Blue-teal |
| `professional` | Corporate blue |
| `corporate` | Navy + gold |

---

## License

MIT © Aravindhan Sivaraman
