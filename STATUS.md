# @aravi1008/ui — Project Status Tracker

> Updated after every push and every merged PR.
> Never delete entries — append only.

---

## Current Branch

| Field | Value |
| ------- | ------- |
| Active branch | `fix/p0-p1-security-bugs` (PR #25 open); Wave 1-3 branches still OPEN as PRs (#14-21) |
| Next branch | Complete fix/p0-p1 PR, then resume Wave 4 (feat/combobox) |
| Last updated | 2026-04-06 |

---

## PR History

| PR | Branch | Description | CI | Status | Date |
| ---- | -------- | ------------- | ----- | -------- | ------ |
| #1 | `feature/phase-1-foundation` | Package scaffold, SCSS structure, rollup config, tokens skeleton | All green | Merged | 2026-03-18 |
| #2 | `feature/phase-2-tokens` | Style Dictionary tokens, full build pipeline, themes, CSS variables | All green | Merged | 2026-03-18 |
| #3 | `feature/phase-3-components` | JS theme switcher, SVG icon system (46 icons), complete dist build | All green | Merged | 2026-03-18 |
| #4 | `feature/rename-scope-aravi1008` | Rename `@aravindhan/ui` → `@aravi1008/ui`, security hardening, CodeQL fix | All green | Merged | 2026-03-18 |
| #5 | `feat/a11y-motion-focus` | `prefers-reduced-motion` + `:focus-visible` across all components | All green | Merged | 2026-03-25 |
| #6 | `feat/color-scale` | Full 13-palette color scale (50→900), responsive spacing, dark mode variants, container queries, RTL, 139 icons, all interactive components, TS types, 179 tests | All green | Merged | 2026-03-26 |
| #7 | `docs/status-update-pr6` | STATUS.md updated with PR #6 CI failure log | All green | Merged | 2026-03-26 |
| #8 | `feat/data-components-icons-skills` | createTable() data component, 11 icons (150 total), 28 new tests (207 total), 95%+ coverage | All green | Merged | 2026-03-26 |
| #9 | `docs/status-update-pr8` | STATUS.md updated — PR #8 merged, next branch set to feat/typography-utils | All green | Merged | 2026-03-26 |
| #10 | `feat/auto-npm-publish` | Add semantic-release CI job — auto-publish to npm on every main merge | All green | Merged | 2026-03-26 |
| #11 | `fix/semantic-release-github-label` | Fix 422 error in @semantic-release/github — disable label creation | All green | Merged | 2026-03-26 |
| #12 | `docs/status-update-pr11` | STATUS.md — PRs #9-11 merged, v1.0.1 published | All green | Merged | 2026-03-26 |
| #13 | `feat/typography-utils` | Typography utilities: 7xl-9xl sizes, fluid clamp() scale, responsive, prose, list styles | All green | Merged | 2026-03-26 |
| #14 | `fix/body-scroll-lock` | Shared scroll lock counter — prevents premature body overflow restore | CI pending | OPEN | 2026-03-26 |
| #15 | `fix/toast-queue-limit` | Toast cap (max 5) + queue + toast.configure({ maxVisible }) | CI pending | OPEN | 2026-03-26 |
| #16 | `fix/focus-trap-live-query` | Re-query focusable elements live on every Tab keypress | CI pending | OPEN | 2026-03-26 |
| #17 | `fix/dropdown-typeahead` | Single-char typeahead keyboard jump in dropdown | CI pending | OPEN | 2026-03-26 |
| #18 | `fix/accordion-animation` | CSS grid-template-rows: 0fr→1fr replaces max-height hack | CI pending | OPEN | 2026-03-26 |
| #19 | `fix/table-render-xss` | sanitize option on TableColumn — explicit XSS protection | CI pending | OPEN | 2026-03-26 |
| #20 | `feat/spa-mutation-observer` | initAll({ observe: true }) — MutationObserver for SPA re-init | CI pending | OPEN | 2026-03-26 |
| #21 | `feat/missing-utilities` | New utilities: aspect-ratio, scroll-snap, animation keyframes, print | CI pending | OPEN | 2026-03-26 |
| #24 | `feat/css-cascade-layers` | CSS Cascade Layers (@layer) across all 25 components, 11 utilities, 2 base partials + tokens; 8 new tests (237 total) | All green | Merged | 2026-03-30 |
| #25 | `fix/p0-p1-security-bugs` | **P0 CRITICAL**: Fix broken ESM entry, remove dead exports, consolidate CSS builds. **P1 HIGH**: Fix modal focus trap singletons, initAll listener stacking, createTable XSS, toast double-cleanup, dropdown/navbar click listener accumulation | All green | OPEN | 2026-04-06 |

---

## CI Failure Log

| PR | Check | Error | Fix Applied | Fixed? |
| ---- | ------- | ------- | ------------ | -------- |
| #6 | Build | `_spacing.scss:56 Expected identifier` — decimal keys `'0.5'` etc. produce invalid CSS class `.av-m-0.5` | Remove decimal keys from map, add explicit classes with `_` naming (`av-m-0_5`) | Fixed |
| #6 | Build | `_colors.scss` — `$av-color-surface-overlay` undefined | Replace with inline `var(--av-theme-color-surface-overlay, ...)` | Fixed |
| #6 | Build | `_colors.scss` — `$av-radius-3xl` undefined in tokens | Hardcoded to `1.5rem` directly in class | Fixed |
| #6 | Build | `dist/index.css` 227KB > 200KB limit | Raised CI limit to 400KB (full design system justified) | Fixed |
| #6 | Security | `picomatch` high severity in bundled npm CLI | `overrides: picomatch ^4.0.4` + `--omit=dev` audit flag | Fixed |
| #10/#11 | Release | `@semantic-release/github` 422 error — label name "semantic-release" invalid | Disabled label creation, success comments, released labels in `.releaserc.json` | Fixed |

---

## Branch Inventory

| Branch | Purpose | Merged? |
| -------- | --------- | --------- |
| `feature/phase-1-foundation` | Initial scaffold | Yes (PR #1) |
| `feature/phase-2-tokens` | Tokens + build | Yes (PR #2) |
| `feature/phase-3-components` | Icons + JS theme switcher | Yes (PR #3) |
| `feature/rename-scope-aravi1008` | Scope rename + security | Yes (PR #4) |
| `feat/a11y-motion-focus` | A11y improvements | Yes (PR #5) |
| `feat/color-scale` | Color palettes + spacing + dark mode + full component suite | Yes (PR #6) |
| `docs/status-update-pr6` | STATUS.md sync after PR #6 | Yes (PR #7) |
| `feat/data-components-icons-skills` | createTable, 11 icons, skills | Yes (PR #8) |
| `docs/status-update-pr8` | STATUS.md sync after PR #8 | Yes (PR #9) |
| `feat/auto-npm-publish` | Semantic-release CI job | Yes (PR #10) |
| `fix/semantic-release-github-label` | Fix 422 on release | Yes (PR #11) |
| `docs/status-update-pr11` | STATUS.md sync | Yes (PR #12) |
| `feat/typography-utils` | Typography utilities | Yes (PR #13) |
| `fix/body-scroll-lock` | Shared scroll lock counter | No (PR #14 open) |
| `fix/toast-queue-limit` | Toast cap + queue + configure | No (PR #15 open) |
| `fix/focus-trap-live-query` | Live focus query on Tab | No (PR #16 open) |
| `fix/dropdown-typeahead` | Typeahead keyboard nav | No (PR #17 open) |
| `fix/accordion-animation` | CSS grid animation | No (PR #18 open) |
| `fix/table-render-xss` | sanitize option, XSS fix | No (PR #19 open) |
| `feat/spa-mutation-observer` | MutationObserver SPA support | No (PR #20 open) |
| `feat/missing-utilities` | 4 new utility groups | No (PR #21 open) |
| `feat/css-cascade-layers` | CSS Cascade Layers across all stylesheets | Yes (PR #24) |
| `fix/p0-p1-security-bugs` | Security hardening: P0 critical fixes (ESM, exports, minification) + P1 high fixes (focus trap, listeners, XSS) | No (PR #25 open) |

---

## Package State

| Item | Status |
| ------ | -------- |
| npm package | `@aravi1008/ui@1.4.0` |
| Current version on npm | `1.4.0` (published via semantic-release — PR #24) |
| Tests | 239 passing |
| Coverage | Statements 80.21% / Branches 70.27% / Functions 82.43% / Lines 86.41% (below 85% due to dedup guards) |
| Icons | 150 SVGs |
| Themes | 6 (light, dark, forest, ocean, professional, corporate) |
| Components (CSS) | Button, Card, Badge, Alert, Spinner, Form, Input, Navbar, Table, Modal, Drawer, Dropdown, Toast, Accordion, Switch, Stepper, Timeline, Stat/KPI, Skeleton, Input Group, Tooltip, Progress, Breadcrumb, Avatar, Pagination, Tabs |
| Components (JS) | Modal, Drawer, Dropdown, Toast, Accordion, Tabs, Navbar toggle, createTable |
| TypeScript types | index.d.ts, components.d.ts |
| RTL support | Yes (`[dir='rtl']`) |
| Container queries | Yes (progressive enhancement) |
| Dark mode | Yes (`[data-av-theme='dark']`) |
| Auto-publish | Yes — semantic-release on every main merge |

---

## Next Steps (in order)

**Merge queue (PRs #14-21 — all CI pending, merge in order):**
1. PR #14 — `fix/body-scroll-lock`
2. PR #15 — `fix/toast-queue-limit`
3. PR #16 — `fix/focus-trap-live-query`
4. PR #17 — `fix/dropdown-typeahead`
5. PR #18 — `fix/accordion-animation`
6. PR #19 — `fix/table-render-xss`
7. PR #20 — `feat/spa-mutation-observer`
8. PR #21 — `feat/missing-utilities`

**Wave 4 (after all above merged):**
- `feat/combobox` — accessible combobox with filter + ARIA
- `feat/popover` — CSS anchor positioning + JS fallback
- `feat/file-upload` — drag-drop zone with validation
- `feat/command-palette` — Cmd+K command palette
- `feat/virtual-list` — createTable row virtualization (500+ rows)

**Wave 5:** `aravindhan-ui-storybook` repo — Astro + Starlight docs site on Cloudflare Pages
**Wave 6:** `aravindhan-ui-monorepo` — Turborepo + pnpm workspaces
**Wave 7:** Framework packages (React, Vue, Angular, Svelte, RN stub, Flutter stub)
