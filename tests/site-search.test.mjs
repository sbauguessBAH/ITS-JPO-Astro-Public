import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { gunzipSync } from "node:zlib";
import test from "node:test";

const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const files = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
  const file = path.join(directory, entry.name);
  return entry.isDirectory() ? files(file) : [file];
});
// These integration checks inspect the actual Pagefind output from npm run build.
const records = files(path.join(dist, "pagefind", "fragment")).map(file => {
  const decoded = gunzipSync(readFileSync(file)).toString("utf8");
  return JSON.parse(decoded.slice(decoded.indexOf("{")));
});
const indexed = new Map(records.map(record => [record.url, record]));
const html = files(dist).filter(file => file.endsWith(".html") && !file.includes(`${path.sep}pagefind${path.sep}`));
const route = file => "/" + path.relative(dist, file).split(path.sep).join("/").replace(/index\.html$/, "");

test("the built index covers all published pages but excludes utility pages and redirects", () => {
  const contentPages = html.filter(file => {
    const source = readFileSync(file, "utf8");
    return /<html\b/.test(source) && !["/404.html", "/search/"].includes(route(file));
  });
  assert.ok(contentPages.length > 0, "Build the site before running search tests");
  assert.deepEqual(new Set(indexed.keys()), new Set(contentPages.map(route)));
});

test("page text is indexed without shared header, navigation, or footer content", () => {
  assert.ok(indexed.get("/").content.includes("Road Safety Innovation Expo"));
  assert.ok(indexed.get("/research-areas/super-intelligence/").content.includes("resilient"));
  assert.ok(records.some(record => record.url.includes("/newsletter-archive/") && record.content.includes("NACFE")));
  for (const record of records) {
    assert.ok(record.meta.title, record.url);
    assert.ok(!record.content.includes("An official website of the United States government"), record.url);
    assert.ok(!record.content.includes("Search this site"), record.url);
    assert.ok(!record.content.includes("Policies, Rights, and Legal"), record.url);
  }
});

test("every rendered page has a base-aware header search form outside the collapsed menu", () => {
  for (const file of html) {
    const source = readFileSync(file, "utf8");
    if (!/<html\b/.test(source)) continue;
    const header = source.match(/<header\b[\s\S]*?<\/header>/)?.[0];
    assert.ok(header, file);
    const form = header.match(/<form\b[^>]*role="search"[\s\S]*?<\/form>/)?.[0];
    assert.ok(form, file);
    assert.match(form, /method="get"/, file);
    const action = form.match(/action="([^"]+)"/)?.[1];
    assert.ok(action?.startsWith("/") && !action.startsWith("//") && action.endsWith("/search/"), file);
    assert.match(form, /name="q"/, file);
    assert.match(form, /<label[^>]*for="header-site-search"/, file);
    assert.ok(header.indexOf(form) < header.indexOf('id="navbar-content"'), file);
    assert.equal((source.match(/id="header-site-search"/g) ?? []).length, 1, file);
  }
});
