import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";

import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // If hosting on a subdomain, set the base here such as /itsjpo, /demo, etc.
  base: "itstest_programs",
  site: "https://www.its.dot.gov",
  output: "static",
  integrations: [partytown(), sitemap(), vue()],
  redirects: {
    "/index.htm": "/",
    "/about/its_jpo.htm": "/about",
    "/research_areas/automation/index.htm": "/research-areas/automation-program",
    "/contacts/stafflisting.htm": "/about/contact-us/staff-listing",
    "/its4us/index.htm": "/research-areas/ITS4US",
    "/its4us/": "/research-areas/ITS4US",
    "/communications/its_images.htm": "/news-info/image-library",
    "/pcb": "/resources/pcb",
    "/resources/Professional-Capacity-Building/": "/resources/pcb",
    "/research-areas/Intersection-Safety-Challenge": "/research-areas/intersection-safety/systems",
    "/resources/asc": "/resources/architecture-and-standards",
    "/asc": "/resources/architecture-and-standards",
    "/research_areas/cybersecurity/research.htm": "/resources/architecture-and-standards/",
  },
});
