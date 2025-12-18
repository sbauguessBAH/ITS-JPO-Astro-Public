import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import vue from "@astrojs/vue";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // If hosting on a subdomain, set the base here such as /itsjpo, /demo, etc.
  base: "itstest_programs",
  integrations: [
    partytown(), 
    sitemap(), 
    vue(),
  ],
  // site: "https://www.its.dot.gov",
  output: "static",
  redirects: {
    "/pcb": {
      destination: "/itstest_programs/resources/pcb",
      status: 302
    },
    "/resources/Professional-Capacity-Building": {
      destination: "/itstest_programs/resources/pcb",
      status: 302
    }
  },
});
