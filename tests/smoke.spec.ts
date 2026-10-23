import { expect, test } from "@playwright/test";

test("home page loads", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(/ITS JPO/);
});

test("main navigation is present", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("navigation").first()).toBeVisible();
});

test("unknown page returns the 404 page", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist/");
  expect(response?.status()).toBe(404);
});
