# @aravi1008/ui — Creative Product Development Plan

> **Owner**: Aravindhan Sivaraman
> **Package**: `@aravi1008/ui`
> **Repo**: aravindhan-ui
> **Started**: 2026-03-18
> **No co-authors/co-owners**

---

## Vision

A personal, professional-grade design system and CSS framework — installable as a single npm package — that sets up an entire project's visual foundation on install. Think Bootstrap + MUI + Tailwind, but owned and evolved entirely by Aravindhan.

> One install. Full project setup. Zero visual debt.

---

## Package Goals

- Install once → full global CSS, tokens, themes, icons, utilities active
- Works with plain CSS, SCSS, LESS, SASS without any extra config
- Pre-styled component classes (Bootstrap-style) accessible via class names
- Utility/override classes (Tailwind-style) for easy customization
- Multi-theme out of the box (light, dark, forest, ocean, professional, corporate)
- Full mobile responsiveness baked in
- Icon system (SVG sprite + web font, covering MUI/Feather/Phosphor style)
- Semantic versioning with automated releases
- Publishable to npm, free forever (public package)

---

## Tech Stack

| Layer | Tool | Reason |
|---|---|---|
| Build | Vite + Rollup | Fast, tree-shakable output |
| CSS Source | SCSS | Most widely used preprocessor |
| CSS Pipeline | PostCSS + Autoprefixer | Cross-browser, optimized output |
| Design Tokens | Style Dictionary | JSON → CSS/SCSS/JS tokens |
| Theming | CSS Custom Properties (`--av-*`) | Zero-runtime theme switching |
| Icons | SVG Sprite + SCSS icon classes | Works anywhere, no JS needed |
| Testing | Jest + Playwright | Unit + visual regression |
| Linting | ESLint + Stylelint | Code quality |
| Releases | semantic-release + GitHub Actions | Fully automated |
| Docs | Storybook (future phase) | Component showcase |

---

## Themes Planned

| Theme | Description |
|---|---|
| `light` | Clean white base, neutral grays |
| `dark` | Deep gray/charcoal, low contrast fatigue |
| `forest` | Earthy greens, warm neutrals |
| `ocean` | Blue-teal palette, cool and calm |
| `professional` | Slate blues, corporate-safe |
| `corporate` | Formal navy + gold accents |
| `high-contrast` | Accessibility-first, WCAG AAA |
| `pastel` | Soft, muted tones for creative apps |
| `midnight` | Pure blacks, neon accents |
| `warm` | Amber/orange tones, inviting |

> First 6 ship in v1. Last 4 are candidates for v1.1+

---

## Phase Plan

### Phase 1 — Foundation (Current)
- [x] Repo initialized
- [ ] package.json scaffolded
- [ ] Folder structure created
- [ ] GitHub Actions CI/CD pipeline (full: lint, test, security, build)
- [ ] Branch strategy documented
- [ ] First feature branch created

### Phase 2 — Design Tokens
- [ ] Color tokens (all themes)
- [ ] Spacing scale
- [ ] Typography scale
- [ ] Shadow tokens
- [ ] Border radius tokens
- [ ] Style Dictionary config
- [ ] Output: CSS variables, SCSS variables, JS tokens

### Phase 3 — Base CSS & Reset
- [ ] Normalize / modern CSS reset
- [ ] Base typography
- [ ] Body defaults
- [ ] Box model setup
- [ ] Focus/accessibility defaults

### Phase 4 — Utilities
- [ ] Spacing utilities (margin, padding)
- [ ] Typography utilities (size, weight, align)
- [ ] Color utilities (text, bg, border)
- [ ] Display utilities
- [ ] Flexbox utilities
- [ ] Grid utilities
- [ ] Responsive breakpoints
- [ ] Visibility utilities

### Phase 5 — Component Styles
- [ ] Buttons (primary, secondary, ghost, danger, sizes)
- [ ] Forms (input, textarea, select, checkbox, radio)
- [ ] Cards
- [ ] Badges / Tags
- [ ] Alerts / Toasts
- [ ] Modals
- [ ] Navigation / Navbar
- [ ] Tables
- [ ] Tabs
- [ ] Accordion
- [ ] Tooltip
- [ ] Progress bar
- [ ] Spinner / Loader
- [ ] Avatar
- [ ] Breadcrumb
- [ ] Pagination

### Phase 6 — Icons
- [ ] SVG sprite system
- [ ] SCSS icon classes
- [ ] Icon sizes (xs, sm, md, lg, xl)
- [ ] 200+ icons (MUI/Feather/Phosphor parity)

### Phase 7 — Theme System
- [ ] Theme switching via `data-theme` attribute
- [ ] All 6 themes
- [ ] Dark mode auto-detection
- [ ] CSS-only theme (no JS required)
- [ ] JS theme switcher helper (optional)

### Phase 8 — Build & Publish
- [ ] Production build pipeline
- [ ] CSS minification
- [ ] Source maps
- [ ] SCSS source exports
- [ ] package.json exports map
- [ ] npm publish workflow
- [ ] First public release (v0.1.0)

### Phase 9 — Documentation
- [ ] Usage README
- [ ] Per-component docs
- [ ] Theme customization guide
- [ ] Storybook setup (v2)

---

## Branch Strategy

```
main          ← stable, production-ready only
  └── develop ← integration branch
        └── feature/phase-1-foundation
        └── feature/phase-2-tokens
        └── feature/phase-3-reset
        ... (one branch per phase/feature)
```

**Rules:**
- Never push directly to `main`
- Every feature → new branch → PR → GitHub Actions must pass → merge → rebase → pull
- No branch deletion after merge (keep history)
- PRs require passing: lint, test, security scan, build check

---

## Git Commit Convention (semantic-release)

```
feat: add ocean theme tokens
fix: resolve dark mode contrast ratio
docs: update component usage guide
chore: update dependencies
refactor: restructure token folder
test: add button component tests
BREAKING CHANGE: renamed --av-primary to --av-color-primary
```

---

## npm Publishing

- Scope: `@aravi1008/ui`
- Access: `public` (free forever)
- Registry: npmjs.com
- Auto-publish on merge to `main` via GitHub Actions + semantic-release
- Version format: `MAJOR.MINOR.PATCH` (semver)

### Renaming Later
When/if renaming the package:
1. Create new package with new name
2. `npm deprecate @aravi1008/ui@"*" "Moved to @newname/package"`
3. New package published separately — no data loss

---

## Questions / Decisions Pending

- [ ] Confirm npm account username for publishing
- [ ] Confirm GitHub remote URL for `aravindhan-ui` repo
- [ ] Decide: Storybook in same repo or separate?
- [ ] Decide: Mobile app companion package in same monorepo later?
