# @aravi1008/ui — Project Status Tracker

> Updated after every push and every merged PR.
> Never delete entries — append only.

---

## Current Branch

| Field | Value |
| ------- | ------- |
| Active branch | `feat/color-scale` |
| Also pending | `feat/full-component-suite` |
| Last updated | 2026-03-25 |

---

## PR History

| PR | Branch | Description | CI | Status | Date |
| ---- | -------- | ------------- | ----- | -------- | ------ |
| #1 | `feature/phase-1-foundation` | Package scaffold, SCSS structure, rollup config, tokens skeleton | All green | Merged | 2026-03-18 |
| #2 | `feature/phase-2-tokens` | Style Dictionary tokens, full build pipeline, themes, CSS variables | All green | Merged | 2026-03-18 |
| #3 | `feature/phase-3-components` | JS theme switcher, SVG icon system (46 icons), complete dist build | All green | Merged | 2026-03-18 |
| #4 | `feature/rename-scope-aravi1008` | Rename `@aravindhan/ui` → `@aravi1008/ui`, security hardening, CodeQL fix | All green | Merged | 2026-03-18 |
| #5 | `feat/a11y-motion-focus` | `prefers-reduced-motion` + `:focus-visible` across all components | All green | Merged | 2026-03-25 |
| #6 | `feat/color-scale` | Full 13-palette color scale (50→900), responsive spacing, dark mode variants, container queries, RTL | Build FAIL (spacing decimal keys) | Open | 2026-03-25 |

---

## CI Failure Log

| PR | Check | Error | Fix Applied | Fixed? |
| ---- | ------- | ------- | ------------ | -------- |
| #6 | Build | `_spacing.scss:56 Expected identifier` — decimal keys `'0.5'` etc. produce invalid CSS class `.av-m-0.5` | Remove decimal keys from map, add explicit classes with `_` naming (`av-m-0_5`) | Fixed |
| #6 | Build | `_colors.scss` — `$av-color-surface-overlay` undefined | Replace with inline `var(--av-theme-color-surface-overlay, ...)` | Fixed |
| #6 | Build | `_colors.scss` — `$av-radius-3xl` undefined in tokens | Hardcoded to `1.5rem` directly in class | Fixed |

---

## Branch Inventory

| Branch | Purpose | Merged? |
| -------- | --------- | --------- |
| `feature/phase-1-foundation` | Initial scaffold | Yes (PR #1) |
| `feature/phase-2-tokens` | Tokens + build | Yes (PR #2) |
| `feature/phase-3-components` | Icons + JS theme switcher | Yes (PR #3) |
| `feature/rename-scope-aravi1008` | Scope rename + security | Yes (PR #4) |
| `feat/a11y-motion-focus` | A11y improvements | Yes (PR #5) |
| `feat/color-scale` | Color palettes + spacing + dark mode | No (PR #6, open) |
| `feat/full-component-suite` | Modal, Drawer, Dropdown, Toast, Accordion, Switch, Stepper, Timeline, Stat, Skeleton, Input Group, 139 icons, TypeScript types | No (not pushed yet) |

---

## Package State

| Item | Status |
| ------ | -------- |
| npm package | `@aravi1008/ui@0.0.1` (semantic-release will bump on merge) |
| Current version on npm | Not published yet (awaiting first semantic-release run) |
| Tests | 169 passing (on `feat/full-component-suite` locally) |
| Coverage | Statements 94.57% / Branches 83.11% / Functions 92.3% / Lines 99% |
| Icons | 139 SVGs (target: 150+) |
| Themes | 6 (light, dark, forest, ocean, professional, corporate) |
| Components (CSS) | Button, Card, Badge, Alert, Spinner, Form, Input, Navbar, Table, Modal, Drawer, Dropdown, Toast, Accordion, Switch, Stepper, Timeline, Stat/KPI, Skeleton, Input Group, Tooltip |
| Components (JS) | Modal, Drawer, Dropdown, Toast, Accordion, Tabs, Navbar toggle |
| TypeScript types | index.d.ts, components.d.ts |
| RTL support | Yes (`[dir='rtl']`) |
| Container queries | Yes (progressive enhancement) |
| Dark mode | Yes (`[data-av-theme='dark']`) |

---

## Next Steps (in order)

1. Fix PR #6 build failure (`_spacing.scss` decimal class names) → push fix → CI green → merge
2. After #6 merges: push `feat/full-component-suite` → open PR #7
3. Fix branch coverage to ≥85% in components.test.js
4. Add 11 more icons to hit 150+ target
5. CI green on PR #7 → merge
6. semantic-release publishes first version to npm
