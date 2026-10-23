import { defineConfig, devices } from "@playwright/test";
import path from "node:path";

/**
 * Visual regression config. Normally driven by `scripts/visual-regression.mjs`.
 *
 * - `VR_ROOT`  project directory whose built `dist/` is served and scanned
 *              for pages (defaults to this repo).
 * - `VR_PHASE` `baseline` captures screenshots, `compare` (default) diffs
 *              against them.
 * - `VR_PORT`  port for the preview server (defaults to 4321).
 *
 * Baseline screenshots are never committed. They are generated from the base
 * branch into `.vr/baseline` (git-ignored) each run.
 */
const root = path.resolve(process.env.VR_ROOT ?? ".");
const port = Number(process.env.VR_PORT ?? 4321);
const isBaseline = process.env.VR_PHASE === "baseline";

export default defineConfig({
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  outputDir: "./.vr/test-results",
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        contextOptions: { reducedMotion: "reduce" },
        deviceScaleFactor: 1,
        viewport: { height: 900, width: 1280 },
      },
    },
  ],
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: ".vr/report" }],
    ["json", { outputFile: ".vr/results.json" }],
  ],
  retries: process.env.CI ? 1 : 0,
  snapshotDir: "./.vr/baseline",
  snapshotPathTemplate: "{snapshotDir}/{arg}{ext}",
  testDir: "./tests/visual",
  timeout: 120_000,
  updateSnapshots: isBaseline ? "all" : "none",
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: "off",
  },
  webServer: {
    command: `npx astro preview --host 127.0.0.1 --port ${port}`,
    cwd: root,
    reuseExistingServer: false,
    timeout: 60_000,
    url: `http://127.0.0.1:${port}`,
  },
  workers: process.env.CI ? 2 : undefined,
});
