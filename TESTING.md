# Testing

The official [Testing](https://docs.astro.build/en/guides/testing/) guide from Astro describes how to set up Vitest and [Playwright](https://playwright.dev/docs/intro).

Some initial tests have been set up to perform visual regression testing to ensure changes to CSS styles do not have unintended consequences.

## Visual Regression

The visual regression testing compares pages against an initial snapshot to identify any changes. To update the initial snapshot, run the test command with the `--update-snapshots` flag, such as if you've confirmed visual changes are accurate and want to compare against a new baseline.

I choose to run the visual regression against only one project/browser for simplicity.

This visual regression test relies on the `xml2js` devDependency to be able to scan the generated sitemap from Astro and check all URLs.

```zsh
# Create a build
npm run build

# Stat preview server
npm run preview

# Create or update baseline snapshots
npm run test:e2e -- visual-regression.spec.ts --project=chromium --update-snapshots

# Check against baseline snapshots
npm run test:e2e -- --project=chromium
```
