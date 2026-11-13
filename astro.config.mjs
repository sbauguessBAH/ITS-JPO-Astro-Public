import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";

import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import { loadEnv } from "vite";

/** Load the BASE_URL from a `.env` file */
const { BASE_URL } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  // If hosting on a subdomain, set the base here such as /itsjpo, /demo, etc.
  base: BASE_URL,
  site: "https://www.its.dot.gov",
  output: "static",
  integrations: [partytown(), sitemap(), vue()],
  redirects: {
    "/index.htm": "/",
    "/news-info/project-delivery-templates": "/news-outreach-tools/project-delivery-templates",
    "/about/its_jpo.htm": "/about",
    "/research_areas/automation/index.htm": "/research-areas/automation-program",
    "/contacts/stafflisting.htm": "/about/contact-us/staff-listing",
    "/its4us/index.htm": "/research-areas/ITS4US",
    "/its4us/": "/research-areas/ITS4US",
    "/communications/its_images.htm": "/news-outreach-tools/image-library",
    "/pcb": "/resources/pcb",
    "/resources/Professional-Capacity-Building/": "/resources/pcb",
    "/research-areas/Intersection-Safety-Challenge": "/research-areas/intersection-safety/systems",
    "/resources/asc": "/resources/architecture-and-standards",
    "/asc": "/resources/architecture-and-standards",
    "/research_areas/cybersecurity/research.htm": "/resources/architecture-and-standards/",
    "/isc/?utm_source=tradeshow%2526utm_medium=banner%2526utm_id=events": "/research-areas/intersection-safety/systems",
    "/research_areas/emerging_tech/pdf/Accelerate_V2X_Deployment.pdf": "/research-areas/V2X-Deployment/deployment/accelerator/",
    "/research_areas/emerging_tech/htm/Next_landing.htm": "/research-areas/V2X-Deployment",
    "/research-areas/artificial-intelligence/transportation-planning-design": "/research-areas/super-intelligence/focus-areas/put-si-into-practice/transportation-planning-design",
    "/research-areas/artificial-intelligence/contact": "/research-areas/super-intelligence",
    "/research-areas/artificial-intelligence/focus-areas/get-ai-ready": "/research-areas/super-intelligence/focus-areas/get-ready",
    "/research-areas/artificial-intelligence/focus-areas": "/research-areas/super-intelligence/focus-areas",
    "/research-areas/artificial-intelligence/focus-areas/learn-connect/ai-definitions-concepts": "/research-areas/super-intelligence/focus-areas/learn-connect/definitions-concepts",
    "/research-areas/artificial-intelligence/focus-areas/learn-connect/ai-governance": "/research-areas/super-intelligence/focus-areas/learn-connect/governance",
    "/research-areas/artificial-intelligence/focus-areas/learn-connect/ai-methods-sub-methods": "/research-areas/super-intelligence/focus-areas/learn-connect/methods-sub-methods",
    "/research-areas/artificial-intelligence/focus-areas/learn-connect/ai-procurement-national-webinar": "/research-areas/super-intelligence/focus-areas/learn-connect/procurement-national-webinar",
    "/research-areas/artificial-intelligence/focus-areas/learn-connect": "/research-areas/super-intelligence/focus-areas/learn-connect",
    "/research-areas/artificial-intelligence/focus-areas/put-ai-into-practice": "/research-areas/super-intelligence/focus-areas/put-si-into-practice",
    "/research-areas/artificial-intelligence/focus-areas/put-ai-into-practice/transportation-planning-design": "/research-areas/super-intelligence/focus-areas/put-si-into-practice/transportation-planning-design",
    "/research-areas/artificial-intelligence/focus-areas/put-ai-into-practice/transportation-planning-design/projects/aces-comprehensive-streets": "/research-areas/super-intelligence/focus-areas/put-si-into-practice/transportation-planning-design/projects/aces-comprehensive-streets",
    "/research-areas/artificial-intelligence/focus-areas/put-ai-into-practice/transportation-planning-design/projects/ai-processing-analysis-framework": "/research-areas/super-intelligence/focus-areas/put-si-into-practice/transportation-planning-design/projects/ai-processing-analysis-framework",
    "/research-areas/artificial-intelligence/focus-areas/put-ai-into-practice/transportation-planning-design/projects/ai-transportation-planning-design": "/research-areas/super-intelligence/focus-areas/put-si-into-practice/transportation-planning-design/projects/ai-transportation-planning-design",
    "/research-areas/artificial-intelligence/focus-areas/put-ai-into-practice/transportation-planning-design/projects/complete-pavement-markings": "/research-areas/super-intelligence/focus-areas/put-si-into-practice/transportation-planning-design/projects/complete-pavement-markings",
    "/research-areas/artificial-intelligence/focus-areas/put-ai-into-practice/transportation-planning-design/projects/curbs-aid-intelligent-design": "/research-areas/super-intelligence/focus-areas/put-si-into-practice/transportation-planning-design/projects/curbs-aid-intelligent-design",
    "/research-areas/artificial-intelligence/focus-areas/put-ai-into-practice/transportation-planning-design/projects/infrastructure-interventions-near-miss": "/research-areas/super-intelligence/focus-areas/put-si-into-practice/transportation-planning-design/projects/infrastructure-interventions-near-miss",
    "/research-areas/artificial-intelligence/focus-areas/put-ai-into-practice/transportation-planning-design/projects/safe-routes-for-all": "/research-areas/super-intelligence/focus-areas/put-si-into-practice/transportation-planning-design/projects/safe-routes-for-all",
    "/research-areas/artificial-intelligence/focus-areas/put-ai-into-practice/transportation-planning-design/projects/sammi-multimodal-mobility": "/research-areas/super-intelligence/focus-areas/put-si-into-practice/transportation-planning-design/projects/sammi-multimodal-mobility",
    "/research-areas/artificial-intelligence/focus-areas/put-ai-into-practice/transportation-planning-design/projects/scalable-sustainable-ai-solutions": "/research-areas/super-intelligence/focus-areas/put-si-into-practice/transportation-planning-design/projects/scalable-sustainable-ai-solutions",
    "/research-areas/artificial-intelligence/focus-areas/put-ai-into-practice/transportation-planning-design/projects/skylite-geollm-platform": "/research-areas/super-intelligence/focus-areas/put-si-into-practice/transportation-planning-design/projects/skylite-geollm-platform",
    "/research-areas/artificial-intelligence/focus-areas/put-ai-into-practice/transportation-planning-design/projects/urbanomy-ai-decision-support": "/research-areas/super-intelligence/focus-areas/put-si-into-practice/transportation-planning-design/projects/urbanomy-ai-decision-support",
    "/research-areas/artificial-intelligence": "/research-areas/super-intelligence",
    "/research-areas/artificial-intelligence/overview/ai-use-cases": "/research-areas/super-intelligence/overview/si-use-cases",
    "/research-areas/artificial-intelligence/overview/how-ai-works": "/research-areas/super-intelligence/overview/how-si-works",
    "/research-areas/artificial-intelligence/overview": "/research-areas/super-intelligence/overview",
    "/research-areas/artificial-intelligence/overview/jpo-implementation-approach": "/research-areas/super-intelligence/overview/jpo-implementation-approach",
    "/research-areas/artificial-intelligence/overview/where-ai-advances-transportation": "/research-areas/super-intelligence/overview/where-si-advances-transportation"
  
  },
});
