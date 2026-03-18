# @aravindhan/ui — Product Design Specification

> Living document. Updated as design decisions are finalized.
> Last updated: 2026-03-18

---

## Design Philosophy

1. **Professional by default** — every default looks production-ready
2. **Override-friendly** — nothing is precious; everything can be customized
3. **CSS-first** — no JS required for layout/theming
4. **Preprocessor-agnostic** — works with raw CSS, SCSS, LESS, SASS equally well
5. **Mobile-first** — responsive at every breakpoint from 320px up
6. **Accessible** — WCAG AA minimum, AAA where possible

---

## Naming Convention

All CSS custom properties use the `--av-` prefix (short for **aravindhan**):

```css
--av-color-primary
--av-color-surface
--av-spacing-md
--av-font-size-base
--av-radius-md
--av-shadow-md
```

CSS class names use the `av-` prefix:

```html
<button class="av-btn av-btn-primary av-btn-md">Click</button>
<div class="av-card av-shadow-md av-p-4">...</div>
<span class="av-text-primary av-font-bold">Label</span>
```

---

## Design Token Architecture

```
tokens/
├── base/
│   ├── colors.json         ← raw color palette (all shades)
│   ├── spacing.json        ← spacing scale
│   ├── typography.json     ← font families, sizes, weights, line heights
│   ├── radius.json         ← border radius values
│   ├── shadow.json         ← box shadow values
│   ├── breakpoints.json    ← responsive breakpoints
│   └── zindex.json         ← z-index scale
├── themes/
│   ├── light.json          ← semantic mappings for light theme
│   ├── dark.json
│   ├── forest.json
│   ├── ocean.json
│   ├── professional.json
│   └── corporate.json
└── style-dictionary.config.js
```

---

## Color System

### Base Palette (Raw Colors)

Each color has 10 shades: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900

**Neutrals** (Gray scale)
- gray-50 through gray-900

**Primary** (Default: Professional Blue)
- primary-50: #EFF6FF
- primary-100: #DBEAFE
- primary-500: #3B82F6  ← default brand
- primary-900: #1E3A8A

**Secondary** (Slate)
- secondary-500: #64748B

**Success** (Green)
- success-500: #22C55E

**Warning** (Amber)
- warning-500: #F59E0B

**Error/Danger** (Red)
- error-500: #EF4444

**Info** (Cyan)
- info-500: #06B6D4

### Semantic Color Tokens (Per Theme)

```css
--av-color-primary          /* main brand color */
--av-color-primary-hover    /* hover state */
--av-color-primary-active   /* active/pressed */
--av-color-primary-subtle   /* light bg tint */
--av-color-secondary
--av-color-surface          /* page background */
--av-color-surface-raised   /* cards, modals */
--av-color-surface-overlay  /* tooltips, dropdowns */
--av-color-border
--av-color-border-strong
--av-color-text-primary
--av-color-text-secondary
--av-color-text-disabled
--av-color-text-inverse
--av-color-success
--av-color-warning
--av-color-error
--av-color-info
--av-color-focus-ring       /* keyboard focus outline */
```

---

## Theme Definitions

### Light (Default)
```
surface:        #FFFFFF
surface-raised: #F8FAFC
primary:        #3B82F6
text-primary:   #0F172A
text-secondary: #64748B
border:         #E2E8F0
```

### Dark
```
surface:        #0F172A
surface-raised: #1E293B
primary:        #60A5FA
text-primary:   #F8FAFC
text-secondary: #94A3B8
border:         #334155
```

### Forest
```
surface:        #F0FDF4
surface-raised: #DCFCE7
primary:        #16A34A
text-primary:   #14532D
text-secondary: #4B7A5B
border:         #BBF7D0
```

### Ocean
```
surface:        #F0F9FF
surface-raised: #E0F2FE
primary:        #0284C7
text-primary:   #0C4A6E
text-secondary: #0369A1
border:         #BAE6FD
```

### Professional
```
surface:        #F8FAFC
surface-raised: #FFFFFF
primary:        #1D4ED8
text-primary:   #1E293B
text-secondary: #475569
border:         #CBD5E1
```

### Corporate
```
surface:        #FAFAFA
surface-raised: #FFFFFF
primary:        #1E3A5F
accent:         #C9A84C   ← gold
text-primary:   #1A1A2E
text-secondary: #5A6070
border:         #D6D9E0
```

---

## Spacing Scale

Based on 4px base unit:

```
--av-spacing-0:   0
--av-spacing-1:   4px
--av-spacing-2:   8px
--av-spacing-3:   12px
--av-spacing-4:   16px
--av-spacing-5:   20px
--av-spacing-6:   24px
--av-spacing-8:   32px
--av-spacing-10:  40px
--av-spacing-12:  48px
--av-spacing-16:  64px
--av-spacing-20:  80px
--av-spacing-24:  96px
--av-spacing-32:  128px
```

Shorthand aliases:
```
--av-spacing-xs:  4px
--av-spacing-sm:  8px
--av-spacing-md:  16px
--av-spacing-lg:  24px
--av-spacing-xl:  32px
--av-spacing-2xl: 48px
--av-spacing-3xl: 64px
```

---

## Typography

### Font Stack (System Default)
```css
--av-font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
--av-font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;
--av-font-serif: Georgia, Cambria, 'Times New Roman', Times, serif;
```

### Font Size Scale
```
--av-text-xs:   0.75rem   (12px)
--av-text-sm:   0.875rem  (14px)
--av-text-base: 1rem      (16px)
--av-text-lg:   1.125rem  (18px)
--av-text-xl:   1.25rem   (20px)
--av-text-2xl:  1.5rem    (24px)
--av-text-3xl:  1.875rem  (30px)
--av-text-4xl:  2.25rem   (36px)
--av-text-5xl:  3rem      (48px)
--av-text-6xl:  3.75rem   (60px)
```

### Font Weights
```
--av-font-thin:       100
--av-font-light:      300
--av-font-normal:     400
--av-font-medium:     500
--av-font-semibold:   600
--av-font-bold:       700
--av-font-extrabold:  800
--av-font-black:      900
```

### Line Heights
```
--av-leading-none:    1
--av-leading-tight:   1.25
--av-leading-snug:    1.375
--av-leading-normal:  1.5
--av-leading-relaxed: 1.625
--av-leading-loose:   2
```

---

## Border Radius

```
--av-radius-none: 0
--av-radius-sm:   2px
--av-radius-md:   4px
--av-radius-lg:   8px
--av-radius-xl:   12px
--av-radius-2xl:  16px
--av-radius-3xl:  24px
--av-radius-full: 9999px
```

---

## Shadows

```
--av-shadow-none: none
--av-shadow-xs:   0 1px 2px 0 rgb(0 0 0 / 0.05)
--av-shadow-sm:   0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)
--av-shadow-md:   0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
--av-shadow-lg:   0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)
--av-shadow-xl:   0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
--av-shadow-2xl:  0 25px 50px -12px rgb(0 0 0 / 0.25)
--av-shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05)
```

---

## Breakpoints (Mobile-First)

```
xs:   0px       (default, all screens)
sm:   480px     (large phones)
md:   768px     (tablets)
lg:   1024px    (small laptops)
xl:   1280px    (desktops)
2xl:  1536px    (large desktops)
```

SCSS usage:
```scss
@include av-breakpoint(md) {
  // styles from 768px up
}
```

CSS class usage:
```html
<div class="av-hidden av-md:block">Visible on tablet+</div>
```

---

## Component Class Anatomy

### Buttons

```html
<!-- Size variants -->
<button class="av-btn av-btn-xs">XS</button>
<button class="av-btn av-btn-sm">SM</button>
<button class="av-btn av-btn-md">MD (default)</button>
<button class="av-btn av-btn-lg">LG</button>
<button class="av-btn av-btn-xl">XL</button>

<!-- Style variants -->
<button class="av-btn av-btn-primary">Primary</button>
<button class="av-btn av-btn-secondary">Secondary</button>
<button class="av-btn av-btn-ghost">Ghost</button>
<button class="av-btn av-btn-outline">Outline</button>
<button class="av-btn av-btn-danger">Danger</button>
<button class="av-btn av-btn-success">Success</button>
<button class="av-btn av-btn-link">Link</button>

<!-- States -->
<button class="av-btn av-btn-primary" disabled>Disabled</button>
<button class="av-btn av-btn-primary av-btn-loading">Loading</button>

<!-- Icon button -->
<button class="av-btn av-btn-icon av-btn-primary">
  <span class="av-icon av-icon-search"></span>
</button>
```

### Forms
```html
<input class="av-input" type="text" />
<input class="av-input av-input-error" type="text" />
<textarea class="av-textarea"></textarea>
<select class="av-select"></select>
<label class="av-checkbox"><input type="checkbox" /> Label</label>
<label class="av-radio"><input type="radio" /> Label</label>
```

### Cards
```html
<div class="av-card">
  <div class="av-card-header">Title</div>
  <div class="av-card-body">Content</div>
  <div class="av-card-footer">Actions</div>
</div>
```

---

## Icon System

Icons are available as:
1. **CSS classes** via SVG sprite: `<span class="av-icon av-icon-{name} av-icon-md"></span>`
2. **Inline SVG**: included via `@aravindhan/ui/icons/{name}.svg`
3. **JS imports** (future): `import { SearchIcon } from '@aravindhan/ui/icons'`

### Icon Sizes
```
av-icon-xs:  12px
av-icon-sm:  16px
av-icon-md:  20px  (default)
av-icon-lg:  24px
av-icon-xl:  32px
av-icon-2xl: 48px
```

---

## CSS Preprocessor Support

### Plain CSS
```css
@import '@aravindhan/ui/css';
```

### SCSS
```scss
@use '@aravindhan/ui/scss' as av;
@include av.theme('dark');
```

### LESS
```less
@import '@aravindhan/ui/less';
```

### PostCSS
```js
// postcss.config.js
module.exports = {
  plugins: [require('@aravindhan/ui/postcss')]
}
```

---

## Theme Switching

### CSS only (data attribute)
```html
<html data-av-theme="dark">
<html data-av-theme="forest">
```

### JS helper
```js
import { setTheme } from '@aravindhan/ui';
setTheme('ocean'); // switches instantly
```

### Auto dark mode (OS preference)
```css
/* Automatically applied if user prefers dark */
@media (prefers-color-scheme: dark) {
  /* dark theme variables applied */
}
```
