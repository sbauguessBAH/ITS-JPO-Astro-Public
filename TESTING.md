# Testing

The official [Testing](https://docs.astro.build/en/guides/testing/) guide from Astro describes how to set up Vitest and [Playwright](https://playwright.dev/docs/intro).

## Playwright

Tests live in `tests/` and run against the **built** site, served by `astro preview`. Playwright starts the server itself (and reuses one if it is already running on port 4321), but it does not build, so build first.

```zsh
npm run build:noWarn

# Smoke tests in Chromium, Firefox, and WebKit
npm run test:e2e

# Open the HTML report
npx playwright show-report
```

Everything is configured in `playwright.config.ts`. The default projects are the browsers; visual regression is a separate `visual` project that is only enabled by `npm run test:vr` (see below).

### Output folders

Everything Playwright generates goes into a single git-ignored `.playwright/` folder:

- `.playwright/report/` is the HTML report from the last run (`npx playwright show-report .playwright/report`).
- `.playwright/results/` holds per-test artifacts (traces, screenshot diffs), and `.playwright/results.json` is the JSON summary.
- `.playwright/baseline/` holds the visual regression baseline images generated for the current run.

## Visual Regression

Visual regression screenshots **every page in the generated sitemap** (~125 pages, full page, desktop Chromium) and compares them against a baseline built from another git ref. This identifies unintended visual changes in a PR.

### How baselines are stored

Baseline images are **not committed**. With >100 pages (several MB each), committed PNGs would bloat the repo, be platform-specific (macOS vs Linux rendering), and go stale after every merge. Instead, every run:

1. Builds the **base ref** in a temporary git worktree and screenshots each page into `.playwright/baseline/` (git-ignored).
2. Builds the **current checkout** and compares each page against that baseline.

Both sides render on the same machine, so there is no OS/font drift, and stacked PRs naturally compare against their parent branch. Pages added in the branch are reported as _new_ (skipped), and pages removed fail with a "Page was removed" error.

### Running locally

```zsh
# Compare the current checkout against main
npm run test:vr

# Compare against another ref, such as a parent branch in a PR stack
npm run test:vr -- --base feat/ui-library

# Re-run against an existing baseline without rebuilding it
npm run test:vr -- --reuse-baseline

# Open the HTML report with expected / actual / diff images
npm run test:vr:report
```

Options for `scripts/visual-regression.mjs`: `--base <ref>` (default `main`), `--reuse-baseline`, `--skip-build` (reuse the existing `dist/`), and `--baseline-only`.

The `visual` project in `playwright.config.ts` runs `tests/visual/`, and `scripts/visual-regression.mjs` sets `VR=1` and handles the two builds. Pages are discovered from `dist/sitemap-*.xml`. Expected / actual / diff images are in the HTML report (`.playwright/report/`).

### CI

`.github/workflows/visual-regression.yml` is currently **manual only** (`workflow_dispatch`, with a `base` ref input, default `origin/main`) because a run builds the site twice and screenshots every page. The `pull_request` trigger is commented out in the workflow; uncomment it to run on every PR against the PR's **base commit** (the parent branch for stacked PRs). The changed pages are listed in the job summary and the full report with diff images is uploaded (`.playwright/report/` and `.playwright/results/`) as the `visual-regression-report` artifact (14 days). Differences do not fail the check; review them and confirm they are intentional.

### Notes on stability

- Animations are disabled, reduced motion is on, lazy images are loaded eagerly, and the page height must settle before capture.
- Analytics and video embeds are blocked and `iframe`/`video` elements are masked. CDN assets (Bootstrap, fonts) are loaded from the network.
- A page may differ by up to 0.1% of pixels (`maxDiffPixelRatio`) before it is flagged.
- Content that is generated in a non-deterministic order (for example collection entries without an explicit sort) will show up as a false difference; sort it in the page.
