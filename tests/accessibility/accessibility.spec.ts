import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { readSitemapPaths } from "../helpers/sitemap";

const pagePrefixes = [
  "/resources/pcb",
  "/research-areas/automation",
  "/research-areas/automation-program",
  "/research-areas/intersection-safety",
];

const accessibilityPages = readSitemapPaths().filter((pagePath) =>
  pagePrefixes.some(
    (prefix) => pagePath === prefix || pagePath.startsWith(`${prefix}/`),
  ),
);

if (accessibilityPages.length === 0) {
  throw new Error(
    "No accessibility pages found in the sitemap. Run a build first.",
  );
}

test.describe("accessibility", () => {
  for (const pagePath of accessibilityPages) {
    test(pagePath, async ({ page }, testInfo) => {
      const response = await page.goto(pagePath, { waitUntil: "load" });
      expect(response?.status(), `Expected ${pagePath} to load`).toBe(200);

      const { violations } = await new AxeBuilder({ page })
        .withTags([
          "wcag2a",
          "wcag2aa",
          "wcag21a",
          "wcag21aa",
          "wcag22a",
          "wcag22aa",
        ])
        .analyze();

      if (violations.length > 0) {
        await testInfo.attach("axe-results.json", {
          body: JSON.stringify({ pagePath, violations }, null, 2),
          contentType: "application/json",
        });
      }

      const details = violations
        .map(
          ({ help, id, impact, nodes }) =>
            `${id} (${impact ?? "unknown"}): ${help}\n${nodes
              .map(
                ({ failureSummary, target }) =>
                  `  ${target.join(", ")}\n${failureSummary ?? ""}`,
              )
              .join("\n")}`,
        )
        .join("\n\n");
      expect(violations.length, details).toBe(0);
    });
  }
});