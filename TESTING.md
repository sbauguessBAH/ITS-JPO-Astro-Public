# Testing

The official [Testing](https://docs.astro.build/en/guides/testing/) guide from Astro describes how to set up Vitest and [Playwright](https://playwright.dev/docs/intro).

Some initial tests have been set up to perform visual regression testing to ensure changes to CSS styles do not have unintended consequences.

## Visual Regression

Visual regression screenshots **every page in the generated sitemap** (~125 pages, full page, desktop Chromium) and compares them against a baseline built from another git ref. This identifies unintended visual changes in a PR.

### How baselines are stored

Baseline images are **not committed**. With >100 pages (several MB each), committed PNGs would bloat the repo, be platform-specific (macOS vs Linux rendering), and go stale after every merge. Instead, every run:

1. Builds the **base ref** in a temporary git worktree and screenshots each page into `.vr/baseline/` (git-ignored).
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

The suite is configured in `playwright.visual.config.ts` and `tests/visual/`. It is separate from the default `npm run test:e2e` config. Pages are discovered from `dist/sitemap-*.xml`, so there is no need to start a server; Playwright starts `astro preview` itself.

### CI

`.github/workflows/visual-regression.yml` runs on every pull request against the PR's **base commit** (the parent branch for stacked PRs). The changed pages are listed in the job summary and the full report with diff images is uploaded as the `visual-regression-report` artifact (14 days). Differences do not fail the PR check; review them and confirm they are intentional. It can also be run manually (`workflow_dispatch`) with any base ref.

### Notes on stability

- Animations are disabled, reduced motion is on, lazy images are loaded eagerly, and the page height must settle before capture.
- Analytics and video embeds are blocked and `iframe`/`video` elements are masked. CDN assets (Bootstrap, fonts) are loaded from the network.
- A page may differ by up to 0.1% of pixels (`maxDiffPixelRatio`) before it is flagged.
- Content that is generated in a non-deterministic order (for example collection entries without an explicit sort) will show up as a false difference; sort it in the page.
