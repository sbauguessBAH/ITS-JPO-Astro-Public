import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";

import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import { loadEnv } from "vite";

/** Load the BASE_URL from a `.env` file */
const { BASE_URL } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

const intelligencePaths = [
  "",
  "/contact",
  "/overview",
  "/overview/how-si-works",
  "/overview/where-si-advances-transportation",
  "/overview/si-use-cases",
  "/overview/jpo-implementation-approach",
  "/focus-areas",
  "/focus-areas/get-si-ready",
  "/focus-areas/put-si-into-practice",
  "/focus-areas/learn-connect",
  "/focus-areas/learn-connect/si-governance",
  "/focus-areas/learn-connect/si-definitions-concepts",
  "/focus-areas/learn-connect/si-methods-sub-methods",
  "/focus-areas/learn-connect/si-procurement-national-webinar",
  "/focus-areas/put-si-into-practice/transportation-planning-design",
  "/focus-areas/put-si-into-practice/transportation-planning-design/projects/aces-comprehensive-streets",
  "/focus-areas/put-si-into-practice/transportation-planning-design/projects/complete-pavement-markings",
  "/focus-areas/put-si-into-practice/transportation-planning-design/projects/curbs-aid-intelligent-design",
  "/focus-areas/put-si-into-practice/transportation-planning-design/projects/infrastructure-interventions-near-miss",
  "/focus-areas/put-si-into-practice/transportation-planning-design/projects/safe-routes-for-all",
  "/focus-areas/put-si-into-practice/transportation-planning-design/projects/sammi-multimodal-mobility",
  "/focus-areas/put-si-into-practice/transportation-planning-design/projects/scalable-sustainable-si-solutions",
  "/focus-areas/put-si-into-practice/transportation-planning-design/projects/si-processing-analysis-framework",
  "/focus-areas/put-si-into-practice/transportation-planning-design/projects/si-transportation-planning-design",
  "/focus-areas/put-si-into-practice/transportation-planning-design/projects/skylite-geollm-platform",
  "/focus-areas/put-si-into-practice/transportation-planning-design/projects/urbanomy-si-decision-support",
];

const intelligenceRedirects = Object.fromEntries(
  intelligencePaths.map((path) => {
    const destination = `/research-areas/super-intelligence${path}`;
    const previousPath = path.replace(/\bsi\b/g, "ai");
    return [
      `/research-areas/artificial-intelligence${previousPath}`,
      { destination, status: 301 },
    ];
  }),
);

// https://astro.build/config
export default defineConfig({
  // If hosting on a subdomain, set the base here such as /itsjpo, /demo, etc.
  base: BASE_URL,
  site: "https://www.its.dot.gov",
  output: "static",
  integrations: [partytown(), sitemap(), vue()],
  redirects: {
    ...intelligenceRedirects,
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
    "/isc/?utm_source=tradeshow%2526utm_medium=banner%2526utm_id=events": "/research-areas/intersection-safety/systems",
    "/research_areas/emerging_tech/pdf/Accelerate_V2X_Deployment.pdf": "/research-areas/V2X-Deployment/deployment/accelerator/",
    "/research_areas/emerging_tech/htm/Next_landing.htm": "/research-areas/V2X-Deployment",
    "/research-areas/artificial-intelligence/transportation-planning-design": {
      destination: "/research-areas/super-intelligence/focus-areas/put-si-into-practice/transportation-planning-design",
      status: 301,
    },
  
  },
});
