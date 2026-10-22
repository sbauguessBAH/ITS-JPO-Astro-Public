import { expect, test } from "@playwright/test";
import execSync from "child_process";

// 1. Fetch sitemap synchronously during Playwright's file scan phase
let pages: string[] = [];
try {
  // Use native curl or fetch via a synchronous child process
  const xmlText = execSync
    .execSync("curl -s http://localhost:4321/sitemap-0.xml")
    .toString();

  // Clean regex to extract URLs from <loc> tags without needing a heavy XML parser
  const matches = xmlText.matchAll(/<loc>(.*?)<\/loc>/g);
  pages = Array.from(matches).map((match) => match[1]);
} catch (error) {
  console.error("Failed to fetch or parse sitemap dynamically:", error);
}

// 2. Generate the tests immediately so Playwright registers them
test.describe("snapshot matches baseline", () => {
  test.describe.configure({ mode: "parallel" });

  for (const url of pages) {
    test(`Visual regression: ${url}`, async ({ page }) => {
      test.setTimeout(120_000); // 2-minute timeout per page test

      const response = await page.goto(url);
      expect(response?.status()).toBe(200);

      await expect(page).toHaveScreenshot({ fullPage: true, timeout: 20_000 });
    });
  }
});
