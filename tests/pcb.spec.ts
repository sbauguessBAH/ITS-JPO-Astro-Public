import { expect, test } from "@playwright/test";

for (const width of [390, 1280]) {
  test(`peer exchanges retain resources and contact details at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ height: 900, width });
    const response = await page.goto("/resources/pcb/peer-exchanges/");
    expect(response?.status()).toBe(200);
    await expect(
      page.getByRole("heading", { exact: true, name: "ITS Peer Exchanges" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { exact: true, name: "itspcb@dot.gov" }),
    ).toHaveAttribute("href", "mailto:itspcb@dot.gov");

    for (const id of ["automated-vehicle", "v2x-and-tolling"]) {
      const exchange = page.locator(`#${id}`);
      const image = exchange.getByRole("img");
      await image.scrollIntoViewIfNeeded();
      await expect(image).toBeVisible();
      await expect
        .poll(() =>
          image.evaluate(
            (element: HTMLImageElement) =>
              element.complete && element.naturalWidth > 0,
          ),
        )
        .toBe(true);
    }

    const downloads = page.locator('article a[href$=".pdf"]');
    await expect(
      page.locator("article li").filter({ hasText: "(not yet available)" }),
    ).toHaveCount(2);
    await expect(downloads).toHaveCount(3);
    for (const download of await downloads.all()) {
      const href = await download.evaluate((link: HTMLAnchorElement) => link.href);
      const resource = await page.request.get(href);
      expect(resource.status()).toBe(200);
      expect(resource.headers()["content-type"]).toContain("application/pdf");
    }
  });
}
