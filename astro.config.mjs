import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import vue from "@astrojs/vue";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

/** Load the BASE_URL from a `.env` file */
const { BASE_URL } = loadEnv(process.env.NODE_ENV ?? "", process.cwd());

// https://astro.build/config
export default defineConfig({
  // If hosting on a subdomain, set the base here such as /itsjpo, /demo, etc.
  base: BASE_URL,
  integrations: [partytown(), sitemap(), vue()],
  // site: "https://www.its.dot.gov",
  output: "static",
  redirects: {
    "/about/its_jpo.htm": "/about",
    "/asc": "/resources/architecture-and-standards",
    "/communications/its_images.htm": "/news-info/image-library",
    "/contacts/stafflisting.htm": "/about/contact-us/staff-listing",
    "/index.htm": "/",
    "/isc/?utm_source=tradeshow%2526utm_medium=banner%2526utm_id=events":
      "/research-areas/intersection-safety/systems",
    "/its4us/": "/research-areas/ITS4US",
    "/its4us/index.htm": "/research-areas/ITS4US",
    "/pcb": "/resources/pcb",
    "/research-areas/artificial-intelligence/transportation-planning-design":
      "/research-areas/artificial-intelligence/focus-areas/put-ai-into-practice/transportation-planning-design",
    "/research-areas/Intersection-Safety-Challenge":
      "/research-areas/intersection-safety/systems",
    "/research_areas/automation/index.htm":
      "/research-areas/automation-program",
    "/research_areas/cybersecurity/research.htm":
      "/resources/architecture-and-standards/",
    "/research_areas/emerging_tech/htm/Next_landing.htm":
      "/research-areas/V2X-Deployment",
    "/research_areas/emerging_tech/pdf/Accelerate_V2X_Deployment.pdf":
      "/research-areas/V2X-Deployment/deployment/accelerator/",
    "/resources/asc": "/resources/architecture-and-standards",
    "/resources/Professional-Capacity-Building/": "/resources/pcb",
  },
});
