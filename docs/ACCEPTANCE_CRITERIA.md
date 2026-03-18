# @aravindhan/ui — Final Acceptance Criteria

> Each phase must meet ALL criteria before merging to main.
> Last updated: 2026-03-18

---

## Global Acceptance Rules (All Phases)

- [ ] All GitHub Actions checks pass (lint, test, security, build)
- [ ] No `console.log` or debug code left in source
- [ ] No hardcoded values — everything uses tokens/variables
- [ ] All new code has corresponding tests
- [ ] PR description filled out with what changed and why
- [ ] No breaking changes without a `BREAKING CHANGE:` commit note
- [ ] CSS output validated — no syntax errors
- [ ] Accessibility: keyboard navigable, focus visible, contrast ratios pass

---

## Phase 1 — Foundation

### Package Setup
- [ ] `package.json` present with correct `name: "@aravindhan/ui"`
- [ ] `version` starts at `0.0.1`
- [ ] `license: "MIT"` present
- [ ] `main`, `module`, `exports` fields configured
- [ ] `files` array includes only dist + src (no node_modules, no secrets)
- [ ] `.npmrc` configured for public access
- [ ] `.npmignore` or `files` field excludes docs, test, config from npm bundle

### Repo Structure
- [ ] All folders created as per spec (src/, tokens/, dist/, docs/, tests/)
- [ ] `.gitignore` covers node_modules, dist, .env, OS files
- [ ] `README.md` updated with install + usage instructions
- [ ] `CHANGELOG.md` exists (managed by semantic-release)

### GitHub Actions Pipeline
- [ ] `ci.yml` — runs on every PR: lint + test + build + security
- [ ] `release.yml` — runs on merge to main: semantic-release + npm publish
- [ ] Lint step: ESLint (JS) + Stylelint (CSS/SCSS)
- [ ] Test step: Jest unit tests pass
- [ ] Build step: production build completes without errors
- [ ] Security step: `npm audit` passes (no high/critical vulnerabilities)
- [ ] Dependency check: no unused or outdated critical dependencies flagged
- [ ] PR size check: warns on PRs > 500 lines changed

### Branch Strategy
- [ ] `main` branch protected (no direct push)
- [ ] `develop` branch exists
- [ ] First feature branch created from develop

---

## Phase 2 — Design Tokens

### Token Files
- [ ] All base token JSON files exist (colors, spacing, typography, radius, shadow, breakpoints, zindex)
- [ ] All 6 theme JSON files exist (light, dark, forest, ocean, professional, corporate)
- [ ] No duplicate token names
- [ ] All tokens follow naming convention (`--av-*`)

### Build Output
- [ ] `dist/tokens/variables.css` generated — all CSS custom properties
- [ ] `dist/tokens/variables.scss` generated — SCSS variables
- [ ] `dist/tokens/tokens.js` generated — JS named exports
- [ ] Theme files: `dist/tokens/themes/light.css`, `dark.css`, etc.
- [ ] Color contrast ratios checked for all theme text/background combos
  - Text on surface: ≥ 4.5:1 (WCAG AA)
  - Large text: ≥ 3:1

### Validation
- [ ] Import `@aravindhan/ui/tokens` works in a test project
- [ ] SCSS import `@use '@aravindhan/ui/scss/tokens'` resolves correctly
- [ ] All 6 themes visually validated (screenshot test or manual review)

---

## Phase 3 — Base CSS & Reset

- [ ] CSS reset applied globally on import
- [ ] Box-sizing: border-box on all elements
- [ ] Body defaults: font-family, color, background use token variables
- [ ] Headings (h1–h6) styled using token values
- [ ] Links styled with theme colors
- [ ] Focus outline visible and uses `--av-color-focus-ring`
- [ ] No conflicts with common frameworks (test with a blank HTML page)

---

## Phase 4 — Utilities

### Coverage
- [ ] Spacing utilities: `.av-m-*`, `.av-p-*`, `.av-mx-*`, `.av-my-*`, `.av-px-*`, `.av-py-*` (all scale values)
- [ ] Typography utilities: `.av-text-*` (sizes), `.av-font-*` (weights), `.av-text-left/center/right/justify`
- [ ] Color utilities: `.av-text-primary`, `.av-bg-surface`, `.av-border-*`
- [ ] Display utilities: `.av-block`, `.av-inline`, `.av-flex`, `.av-grid`, `.av-hidden`
- [ ] Flexbox: `.av-flex-row`, `.av-flex-col`, `.av-justify-*`, `.av-items-*`, `.av-gap-*`
- [ ] Grid: `.av-grid-cols-{1-12}`, `.av-col-span-*`
- [ ] Responsive prefix works: `.av-md:flex`, `.av-lg:hidden`
- [ ] All utility classes can override component defaults without `!important` hacks

### Size
- [ ] Utilities CSS (unminified) < 100KB
- [ ] Utilities CSS (minified) < 40KB

---

## Phase 5 — Components

For each component:
- [ ] Default state looks professional out of the box
- [ ] All size variants work (xs, sm, md, lg, xl where applicable)
- [ ] All color/style variants work
- [ ] Hover, focus, active, disabled states all styled
- [ ] Works without JS
- [ ] Passes keyboard navigation test
- [ ] Passes color contrast test (WCAG AA)
- [ ] Class override works without specificity issues

**Required components for v1:**
- [ ] Button
- [ ] Input
- [ ] Textarea
- [ ] Select
- [ ] Checkbox / Radio
- [ ] Card
- [ ] Badge / Tag
- [ ] Alert
- [ ] Table
- [ ] Navbar
- [ ] Tabs
- [ ] Spinner/Loader
- [ ] Progress Bar
- [ ] Avatar
- [ ] Breadcrumb
- [ ] Pagination

---

## Phase 6 — Icons

- [ ] SVG sprite file exists at `dist/icons/sprite.svg`
- [ ] SCSS icon classes generated for all icons
- [ ] All 5 size variants work (xs through 2xl)
- [ ] Icons inherit `currentColor` for easy color control
- [ ] Minimum 100 icons shipped in v1
- [ ] Icons tested on Chrome, Firefox, Safari

---

## Phase 7 — Theme System

- [ ] `data-av-theme="dark"` switches all colors correctly
- [ ] `data-av-theme="forest"` works
- [ ] `data-av-theme="ocean"` works
- [ ] `data-av-theme="professional"` works
- [ ] `data-av-theme="corporate"` works
- [ ] OS dark mode auto-switches to dark theme
- [ ] Theme switch is instant (no flash)
- [ ] All 6 themes pass contrast ratio test
- [ ] JS `setTheme()` helper works

---

## Phase 8 — Build & Publish

### Build Output
- [ ] `dist/index.css` — full CSS, all themes, all utilities
- [ ] `dist/index.min.css` — minified
- [ ] `dist/index.scss` — SCSS entry point
- [ ] `dist/tokens.js` — JS token exports
- [ ] `dist/icons/sprite.svg` — SVG icon sprite
- [ ] Source maps present for all output files

### Package
- [ ] `npm pack` output contains only necessary files
- [ ] Install in a blank project: `npm install @aravindhan/ui` works
- [ ] CSS import works in plain HTML project
- [ ] SCSS import works in a Vite SCSS project
- [ ] No peer dependency warnings on install
- [ ] Bundle size: full CSS < 200KB unminified, < 80KB minified

### Publishing
- [ ] Version bumped correctly by semantic-release
- [ ] CHANGELOG.md updated automatically
- [ ] GitHub release created automatically
- [ ] npm package published to `@aravindhan/ui`

---

## Performance Targets

| Metric | Target |
|---|---|
| Full CSS (minified + gzip) | < 30KB |
| Tokens only | < 5KB |
| Icons sprite | < 200KB |
| Build time | < 10s |
| npm install size | < 5MB |

---

## Browser Support

| Browser | Minimum Version |
|---|---|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| Mobile Safari | 14+ |
| Mobile Chrome | 90+ |

---

## Accessibility Standards

- WCAG 2.1 AA minimum for all components
- All interactive elements keyboard accessible
- Screen reader compatible (aria attributes where needed)
- Focus indicators always visible
- No color-only information communication
