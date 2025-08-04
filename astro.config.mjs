import { defineConfig } from "astro/config";

import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // If hosting on a subdomain, set the base here such as /itsjpo, /demo, etc.
  base: "itstest_programs",
  // site: "https://www.its.dot.gov",
  output: "static",
  integrations: [partytown(), sitemap()],
  redirects: {
    "/pcb": {
      status: 302,
      destination: "/itstest_programs/resources/pcb"
    },
    "/resources/Professional-Capacity-Building": {
      status: 302,
      destination: "/itstest_programs/resources/pcb"
    }
  }
});
