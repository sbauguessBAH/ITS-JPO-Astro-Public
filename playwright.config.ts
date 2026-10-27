import { defineConfig, devices } from "@playwright/test";
import path from "node:path";

/**
 * Both the regular (e2e) and visual regression tests run against the built
 * site, served by `astro preview`. Make sure to run `npm run build` first
 * before tests so that Playwright runs against the most current static build.
 *
 * Visual regression is opt-in (`VR=1`, set by `npm run test:vr`) because it
 * needs a baseline to compare against. See TESTING.md.
 *
 * - `VR_ROOT` project directory whose `dist/` is served (defaults to this repo)
 * - `VR_PORT` preview server port (defaults to 4321)
 */
const isVisual = !!process.env.VR;
const isAccessibility = !!process.env.A11Y;
const port = Number(process.env.VR_PORT ?? 4321);
const baseURL = `http://127.0.0.1:${port}`;

const e2eProjects = [
  { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  { name: "firefox", use: { ...devices["Desktop Firefox"] } },
  { name: "webkit", use: { ...devices["Desktop Safari"] } },
].map((project) => ({
  ...project,
  testIgnore: ["**/accessibility/**", "**/visual/**"],
}));

const accessibilityProject = {
  name: "accessibility",
  testMatch: "**/accessibility/**/*.spec.ts",
  use: {
    ...devices["Desktop Chrome"],
    screenshot: "only-on-failure" as const,
  },
};

/**
 * Uses Chromium to run visual regression tests with a fixed viewport and local screenshots.
 */
const visualProject = {
  name: "visual",
  snapshotDir: "./.playwright/baseline",
  snapshotPathTemplate: "{snapshotDir}/{arg}{ext}",
  testMatch: "**/visual/**/*.spec.ts",
  timeout: 120_000,
  use: {
    ...devices["Desktop Chrome"],
    contextOptions: { reducedMotion: "reduce" as const },
    deviceScaleFactor: 1,
    // Attach screenshots when running tests locally
    screenshot: process.env.CI
      ? ("off" as const)
      : { fullPage: true, mode: "on" as const },
    trace: "off" as const,
    viewport: { height: 900, width: 1280 },
  },
};

export default defineConfig({
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  outputDir: ".playwright/results",
  projects: isVisual
    ? [visualProject]
    : isAccessibility
      ? [accessibilityProject]
      : e2eProjects,
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: ".playwright/report" }],
    ["json", { outputFile: ".playwright/results.json" }],
  ],
  retries: process.env.CI ? 2 : 0,
  testDir: "./tests",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  webServer: {
    command: `npx astro preview --host 127.0.0.1 --port ${port}`,
    cwd: path.resolve(process.env.VR_ROOT ?? "."),
    // Make sure baseline builds from a different git ref use a new server.
    reuseExistingServer: !process.env.CI && !isVisual,
    timeout: 60_000,
    url: baseURL,
  },
  workers: process.env.CI ? 1 : undefined,
});
