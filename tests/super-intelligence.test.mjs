import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import config from "../astro.config.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const pages = path.join(root, "src", "pages");
const programRoute = "/research-areas/super-intelligence";
const program = path.join(pages, ...programRoute.split("/"));
const read = relative => readFileSync(path.join(program, relative), "utf8");
const files = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
  const file = path.join(directory, entry.name);
  return entry.isDirectory() ? files(file) : [file];
});
const sourceFiles = files(program).filter(file => file.endsWith(".astro"));
const redirects = Object.entries(config.redirects).filter(([from]) => from.startsWith("/research-areas/artificial-intelligence"));
const routeExists = route => {
  const file = path.join(pages, ...route.split("/"));
  return existsSync(`${file}.astro`) || existsSync(path.join(file, "index.astro"));
};

test("legacy program URLs redirect directly to existing SI pages", () => {
  assert.equal(redirects.length, 28);
  for (const [from, to] of redirects) {
    assert.equal(typeof to, "string", from);
    assert.ok(to.startsWith(programRoute), from);
    assert.ok(routeExists(to), `${from} -> ${to}`);
  }
  for (const file of sourceFiles) {
    const relative = path.relative(pages, file).split(path.sep).join("/");
    const route = `/${relative.replace(/(?:\/)?index\.astro$|\.astro$/g, "")}`;
    assert.ok(redirects.some(([, to]) => to === route), `Missing legacy redirect for ${route}`);
  }
});

test("program banners, navigation, and internal links use the new routes", () => {
  for (const file of sourceFiles) {
    const source = readFileSync(file, "utf8");
    assert.ok(source.includes('<Fragment slot="banner">Advanced Analytics and Super Intelligence (SI)</Fragment>'), file);
    assert.ok(!source.includes("/research-areas/artificial-intelligence"), file);
    for (const [, route] of source.matchAll(/base_url\("(\/research-areas\/super-intelligence[^"#]*)/g)) {
      assert.ok(routeExists(route), `${file}: ${route}`);
    }
  }
  const navigation = readFileSync(path.join(root, "src", "lib", "navigation.ts"), "utf8");
  assert.ok(navigation.includes('name: "Advanced Analytics & Super Intelligence"'));
  assert.ok(!navigation.includes("/research-areas/artificial-intelligence"));
  assert.ok(!navigation.includes(`${programRoute}/contact`));
  assert.ok(!existsSync(path.join(program, "contact.astro")));
});

test("historical resource names and links remain unchanged", () => {
  const readiness = read(path.join("focus-areas", "get-ready.astro"));
  assert.ok(readiness.includes("NIST AI Risk Management Framework"));
  assert.ok(readiness.includes("AI for ITS Capability Maturity Model (CMM) and Readiness Checklists"));
  assert.ok(readiness.includes("/assets/documents/Data & AI w notes - JPO AI Program - FHWA CLAS 26-05-21.pdf"));
  const webinar = read(path.join("focus-areas", "learn-connect", "procurement-national-webinar.astro"));
  assert.ok(webinar.includes("National Webinar: Demystifying AI Procurement"));
  assert.ok(webinar.includes("https://www.youtube.com/embed/2XQ1vCWbExk"));
  assert.ok(webinar.includes("AI_Procurement_Webinar_Flyer_FINAL508.pdf"));
  assert.equal(sourceFiles.filter(file => file.includes(`${path.sep}projects${path.sep}`)).length, 11);
});

test("revised resources and glossary follow the approved content structure", () => {
  const learning = read(path.join("focus-areas", "learn-connect", "index.astro"));
  const sections = [...learning.matchAll(/<h2 id="([^"]+)"/g)].map(([, id]) => id);
  assert.deepEqual(sections, ["ai-materials", "ai-foundations", "ai-knowledge-sharing", "ai-readiness"]);
  assert.ok(learning.includes("Find real-world examples and applications."));
  assert.ok(learning.includes("summer 2027"));
  const home = read("index.astro");
  assert.ok(home.includes("<span class=\"fw-semibold\">Explore Case Studies</span>"));
  const practice = read(path.join("focus-areas", "put-si-into-practice", "index.astro"));
  assert.ok(!practice.includes("transportation-planning-design"));
  for (const heading of ["Freight Corridor Predictive Intelligence (FCPI)", "Connect Dynamics", "ecoLong", "FACTOR", "Advanced Analytical Methods to Improve Categorization of Land Use Contexts"]) {
    assert.ok(practice.includes(heading), heading);
  }
  const glossary = read(path.join("focus-areas", "learn-connect", "definitions-concepts.astro"));
  const sectionS = glossary.match(/<section id="letter-s"[\s\S]*?<\/section>/)[0];
  for (const term of ["Super Intelligence (SI)", "SI Accountability", "SI Assurance"]) {
    assert.ok(sectionS.includes(`<h4 class="term-title">${term}</h4>`), term);
  }
  assert.ok(!glossary.includes('<h4 class="term-title">Artificial Intelligence (AI)</h4>'));
});
