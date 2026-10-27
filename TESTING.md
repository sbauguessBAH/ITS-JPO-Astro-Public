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

Accessibility tests are opt-in and run in Chromium with `npm run test:a11y`.

### Output folders

Playwright uses a git-ignored `.playwright/` folder. This is slightly different from normal conventions, but I did this so that all Playwright files are grouped together cleanly.

- `.playwright/report/` is the HTML report from the last run (`npx playwright show-report .playwright/report`).
- `.playwright/results/` holds per-test artifacts (traces, screenshot diffs) and a JSON summary `.playwright/results.json`.
- `.playwright/baseline/` holds the visual regression baseline images generated.

### Accessibility

Accessibility tests use axe-core through `@axe-core/playwright` and run in Chromium against the built site. The initial scope includes every sitemap page under `resources/pcb`, `research-areas/automation`, and `research-areas/intersection-safety`. Feel free to add any other routes you want to test too.

```zsh
npm run build:noWarn
npm run test:a11y
```

The checks cover WCAG 2.0, 2.1, and 2.2 Level A and AA rules. New routes in these sections are picked up automatically from the sitemap.

## Visual Regression

Visual regression screenshots every page in the generated sitemap (`dist/sitemap-*.xml`) and compares them against a baseline to identify unintended changes. Unintended changes are reported by Playwright and include diffs and screenshots of every page.

Baseline images are **not committed** because they are relatively large and would likely fail in a commit. In the future, you might be able to set up Git LFS or something if we have a need to persist them.

### Running locally

A separate `visual` project has been set up in `playwright.config.ts` so that `tests/visual/` can be run independently or alongside the rest of the end-to-end tests. Additionally, some commands and a helper script have been set up to allow us to run visual comparisons against another git ref, such as comparing a feature branch to `main`.
 
To take advantage of the helper script, you should use the commands below:

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

The `scripts/visual-regression.mjs` script handles comparing two different versions of the website by doing the following:

1. Builds the **base ref** in a temporary git worktree and screenshots each page into `.playwright/baseline/` (git-ignored).
2. Builds the **current checkout** and compares each page against that baseline.

Both sides render on the same machine, so there is no OS/font drift, and stacked PRs naturally compare against their parent branch. Pages added in the branch are reported as _new_ (skipped), and pages removed fail with a "Page was removed" error. 

You can customize the base using `--base <ref>` (default `main`). Additionally, you can reuse existing images with `--reuse-baseline`, reuse the existing `dist/` with `--skip-build`, and/or choose to use `--baseline-only`.

### CI

`.github/workflows/visual-regression.yml` is currently manual (`workflow_dispatch`, with a `base` ref input, default `origin/main`) since it takes a bit of time to run, however it can be enabled if we ever want it to automatically run on every pull request change. The changed pages are listed in the job summary and the full report with diff images is uploaded (`.playwright/report/` and `.playwright/results/`) as the `visual-regression-report` artifact. 

Differences do not force the check to fail, since lots of changes are usually intentional. So you do need to look and confirm manually that all the changes make sense.

### Additional Notes

- Animations are disabled, reduced motion is on, lazy images are loaded eagerly, and the page height must settle before capture.
- Analytics and video embeds are blocked and `iframe`/`video` elements are masked. CDN assets (Bootstrap, fonts) are loaded from the network.
- A page may differ by up to 0.1% of pixels (`maxDiffPixelRatio`) before it is flagged.
- Content that is generated in a non-deterministic order (for example collection entries without an explicit sort) will show up as a false difference. This can generally be ignored.