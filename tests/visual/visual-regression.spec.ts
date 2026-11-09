import { expect, type Page, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

import { readSitemapPaths } from "../helpers/sitemap";

const root = path.resolve(process.env.VR_ROOT ?? ".");
const isBaseline = process.env.VR_PHASE === "baseline";
const baselineDir = path.resolve(".playwright/baseline");
const manifestPath = path.join(baselineDir, "pages.json");

/** Make the page deterministic: trigger lazy content, wait for fonts/images. */
async function settle(page: Page) {
  await page.evaluate(async () => {
    // Load everything up front instead of relying on scroll position.
    document.querySelectorAll("img[loading=lazy]").forEach((img) => {
      (img as HTMLImageElement).loading = "eager";
    });

    // Hidden images (modals, collapsed panels) may never finish, so only wait
    // for rendered ones and cap the total wait.
    const rendered = [...document.images].filter(
      (img) => img.getClientRects().length > 0,
    );
    const ready = Promise.all([
      document.fonts.ready,
      ...rendered.map((img) => img.decode().catch(() => undefined)),
    ]);
    await Promise.race([ready, new Promise((r) => setTimeout(r, 20_000))]);

    // Late layout shifts (web fonts swapping in, etc.): wait for the page
    // height to stop changing.
    let last = -1;
    for (let i = 0; i < 40; i++) {
      const height = document.documentElement.scrollHeight;
      if (height === last) break;
      last = height;
      await new Promise((r) => setTimeout(r, 250));
    }
    window.scrollTo(0, 0);
  });
}

function snapshotName(pagePath: string): string {
  const slug = pagePath.replace(/^\/|\/$/g, "").replace(/[^\w.-]+/g, "-");
  return `${slug || "index"}.png`;
}

// The site pulls Bootstrap, fonts, and icons from CDNs, so those are allowed
// (they are version-pinned). Only analytics and embedded media are blocked
// because they add noise without affecting the rendered layout.
const BLOCKED_REQUESTS =
  /googletagmanager|google-analytics|doubleclick|digitalgov\.gov|youtube|youtu\.be|vimeo/;

const currentPages = readSitemapPaths(root);

// Pages in the baseline build come from the manifest written during that run.
let baselinePages: string[] = [];
if (isBaseline) {
  fs.mkdirSync(baselineDir, { recursive: true });
  fs.writeFileSync(manifestPath, JSON.stringify(currentPages, null, 2));
} else if (fs.existsSync(manifestPath)) {
  baselinePages = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
}

const allPages = [...new Set([...currentPages, ...baselinePages])].sort();

test.describe("visual regression", () => {
  test.describe.configure({ mode: "parallel" });

  test.beforeEach(async ({ page }) => {
    await page.route(BLOCKED_REQUESTS, (route) => route.abort());
  });

  for (const pagePath of allPages) {
    test(pagePath, async ({ page }, testInfo) => {
      const isNew = !isBaseline && !baselinePages.includes(pagePath);
      const isRemoved = !currentPages.includes(pagePath);

      if (isNew) {
        testInfo.annotations.push({
          description: "No baseline: page was added in this branch",
          type: "new page",
        });
        test.skip(true, "New page, nothing to compare against");
      }

      const response = await page.goto(pagePath, { waitUntil: "load" });
      expect(
        response?.status(),
        isRemoved ? "Page was removed in this branch" : undefined,
      ).toBe(200);

      await settle(page);

      await expect(page).toHaveScreenshot(snapshotName(pagePath), {
        fullPage: true,
        mask: [page.locator("iframe, video")],
        maxDiffPixelRatio: 0.001,
        timeout: 30_000,
      });
    });
  }
});
