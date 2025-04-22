import { defineConfig } from "astro/config";

import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // If hosting on a subdomain, set the base here such as /itsjpo, /demo, etc.
  base: "itstest_environment",
  site: "https://www.its.dot.gov",
  output: "static",
  integrations: [partytown(), sitemap()],
});
