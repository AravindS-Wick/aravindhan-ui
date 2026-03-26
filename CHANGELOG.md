# [1.2.0](https://github.com/AravindS-Wick/aravindhan-ui/compare/v1.1.0...v1.2.0) (2026-03-26)


### Bug Fixes

* **accordion:** replace max-height hack with CSS grid-template-rows animation ([#18](https://github.com/AravindS-Wick/aravindhan-ui/issues/18)) ([095351d](https://github.com/AravindS-Wick/aravindhan-ui/commit/095351df84764427ab02b01a2997467ddb46d446))
* **dropdown:** add single-character typeahead keyboard navigation ([#17](https://github.com/AravindS-Wick/aravindhan-ui/issues/17)) ([9418fb1](https://github.com/AravindS-Wick/aravindhan-ui/commit/9418fb13657c2ac2f0e5973ef1b685c7ff2d1e6e))
* **focus-trap:** re-query focusable elements live on every Tab press ([#16](https://github.com/AravindS-Wick/aravindhan-ui/issues/16)) ([2f197c0](https://github.com/AravindS-Wick/aravindhan-ui/commit/2f197c0ded228d1ed304f9cc3662bfe617999173))
* **modal,drawer:** add shared scroll lock counter for nested overlays ([#14](https://github.com/AravindS-Wick/aravindhan-ui/issues/14)) ([5452f6f](https://github.com/AravindS-Wick/aravindhan-ui/commit/5452f6fe3fd0d47bd6f436052c0355d7b42e8f2b))
* **table:** add sanitize option and close XSS vector in createTable ([#19](https://github.com/AravindS-Wick/aravindhan-ui/issues/19)) ([fd2a814](https://github.com/AravindS-Wick/aravindhan-ui/commit/fd2a814503de0dc3413c82032f69ef2213f35cd0))
* **toast:** add queue and configurable max-visible cap ([#15](https://github.com/AravindS-Wick/aravindhan-ui/issues/15)) ([720dfdb](https://github.com/AravindS-Wick/aravindhan-ui/commit/720dfdbedad6183935129e29c93c2388dc13e1e6))


### Features

* **initAll:** add observe option for SPA MutationObserver re-init ([#20](https://github.com/AravindS-Wick/aravindhan-ui/issues/20)) ([9202d88](https://github.com/AravindS-Wick/aravindhan-ui/commit/9202d885e5339fa12f9970ffa10950c792921492))

# [1.1.0](https://github.com/AravindS-Wick/aravindhan-ui/compare/v1.0.1...v1.1.0) (2026-03-26)


### Features

* **typography:** add 7xl-9xl sizes, fluid clamp() scale, responsive variants, prose, list styles, text colors ([#13](https://github.com/AravindS-Wick/aravindhan-ui/issues/13)) ([51d568c](https://github.com/AravindS-Wick/aravindhan-ui/commit/51d568c176210c4dbe5213717f3d4191ef89cc32))

## [1.0.1](https://github.com/AravindS-Wick/aravindhan-ui/compare/v1.0.0...v1.0.1) (2026-03-26)


### Bug Fixes

* **release:** disable semantic-release GitHub label creation — causes 422 error ([#11](https://github.com/AravindS-Wick/aravindhan-ui/issues/11)) ([e09e67d](https://github.com/AravindS-Wick/aravindhan-ui/commit/e09e67d41a513d611de7a08a653ff8d4f6ce1b6c))

# 1.0.0 (2026-03-26)


### Bug Fixes

* **ci:** add build steps before tests, fix CodeQL and dependency-review ([e53a8f0](https://github.com/AravindS-Wick/aravindhan-ui/commit/e53a8f019a8da4b9c1aa4e67d73c03e38f1476e9))
* rename package scope from @aravindhan/ui to @aravi1008/ui ([071d6cc](https://github.com/AravindS-Wick/aravindhan-ui/commit/071d6ccb96951afff34bde63682ae7d61733dcaa))
* **security:** harden npm publish, release pipeline, and icon builder ([7ca8e96](https://github.com/AravindS-Wick/aravindhan-ui/commit/7ca8e96da40d17eff37080c4dbd688328d40b2b7))
* **security:** resolve picomatch ReDoS via overrides, scope audit to production deps ([99a48ac](https://github.com/AravindS-Wick/aravindhan-ui/commit/99a48ac474a7757b2c2efa97ebf8d92bb5d6f282))
* **tests:** expand theme tests and lower branch coverage threshold ([26ec053](https://github.com/AravindS-Wick/aravindhan-ui/commit/26ec0532c2bfaa52a706b340e6fdcb6e31e224e7))


### Features

* **a11y:** add prefers-reduced-motion and focus-visible across all components ([fc8cbf9](https://github.com/AravindS-Wick/aravindhan-ui/commit/fc8cbf90bbcbe6ee4ef3f1d00fed7ed98b0dd2f7))
* add JS theme switcher, SVG icon system, and complete build pipeline — phase 3 ([65119ac](https://github.com/AravindS-Wick/aravindhan-ui/commit/65119acef6acdef5b5e4c6ea9cdfe8e39ed0fe92))
* **ci:** add semantic-release job — auto-publish to npm on main merge ([#10](https://github.com/AravindS-Wick/aravindhan-ui/issues/10)) ([98b872a](https://github.com/AravindS-Wick/aravindhan-ui/commit/98b872acad2c96b28806c7cd36c1ad40663b6335))
* **full-suite:** color palettes, spacing, components, icons, TS types, tests ([fbe00e3](https://github.com/AravindS-Wick/aravindhan-ui/commit/fbe00e348245cd974beeef439237a43318a670ac))
* **full-suite:** color palettes, spacing, components, icons, TS types, tests ([319efa9](https://github.com/AravindS-Wick/aravindhan-ui/commit/319efa9b602a164e674328835b938aeafd0b74a5))
* scaffold @aravindhan/ui package foundation ([6541541](https://github.com/AravindS-Wick/aravindhan-ui/commit/65415418d79644663b13766859ba534808276184))
* **table+icons:** createTable data component, 11 new icons (150 total), skills ([5f605d0](https://github.com/AravindS-Wick/aravindhan-ui/commit/5f605d015de027c1bcdc039bd40344c8798582b1))
* **tests:** achieve 85%+ coverage with injectable env and rate limiting ([24730be](https://github.com/AravindS-Wick/aravindhan-ui/commit/24730be51bf4465ba347e6fc57aa00f96561827c))
* **utilities:** full color palette scale, responsive spacing, dark mode variants ([14ef693](https://github.com/AravindS-Wick/aravindhan-ui/commit/14ef69313b5b6218d880c77cd9ff0a7cf65cdeb1))
* validate and fix full build pipeline — phase 2 ([5459b03](https://github.com/AravindS-Wick/aravindhan-ui/commit/5459b03c66b6b5308433158be79f3f48794c1108))

# Changelog

All notable changes to `@aravi1008/ui` will be documented here.

This file is automatically managed by [semantic-release](https://github.com/semantic-release/semantic-release).

<!-- releases below this line are auto-generated -->
