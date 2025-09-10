import { defineConfig } from "astro/config";

import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // If hosting on a subdomain, set the base here such as /itsjpo, /demo, etc.
  base: "",
  site: "https://www.its.dot.gov",
  output: "static",
  integrations: [partytown(), sitemap()],
  redirects: {
    "/index.htm": "/",
    "/about/its_jpo.htm": "/about",
    "/research_areas/automation/index.htm": "/research-areas/Automation-Program",
    "/contacts/stafflisting.htm": "/about/contact-us/staff-listing",
    "/its4us/index.htm": "/research-areas/ITS4US",
    "/press/news.htm": "https://www.transportation.gov/newsroom",
    "/communications/its_images.htm": "/news-info/image-library",
  },
});
