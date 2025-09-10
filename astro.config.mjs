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
    "its.dot.gov/index.htm": "its.dot.gov",
    "its.dot.gov/about/its_jpo.htm": "its.dot.gov/about",
    "its.dot.gov/research_areas/automation/index.htm": "its.dot.gov/research-areas/Automation-Program",
    "its.dot.gov/contacts/stafflisting.htm": "its.dot.gov/about/contact-us/staff-listing/",
    "its.dot.gov/its4us/index.htm": "its.dot.gov/research-areas/ITS4US/",
    "its.dot.gov/press/news.htm": "https://www.transportation.gov/newsroom",
    "its.dot.gov/communications/its_images.htm": "its.dot.gov/news-info/image-library/",
  },
});
