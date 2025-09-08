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
    "https://its.dot.gov/index.htm": "https://its.dot.gov",
    "https://its.dot.gov/about/its_jpo.htm": "https://its.dot.gov/about",
    "https://its.dot.gov/research_areas/automation/index.htm": "https://its.dot.gov/research-areas/Automation-Program",
    "https://its.dot.gov/contacts/stafflisting.htm": "https://its.dot.gov/about/contact-us/staff-listing/",
    "https://its.dot.gov/its4us/index.htm": "https://its.dot.gov/research-areas/ITS4US/",
    "https://its.dot.gov/press/news.htm": "https://www.transportation.gov/newsroom",
    "https://its.dot.gov/itsjpo_Old-design_archive/communications/its_images.htm":
      "https://its.dot.gov/news-info/image-library/",
    
  },
});
