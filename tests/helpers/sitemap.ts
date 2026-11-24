import fs from "node:fs";
import path from "node:path";

/** Reads page paths from the Astro-generated sitemap(s) in `dist/`. */
export function readSitemapPaths(projectRoot = "."): string[] {
  const dist = path.join(projectRoot, "dist");
  const files = fs
    .readdirSync(dist)
    .filter((file) => /^sitemap-\d+\.xml$/.test(file));
  if (files.length === 0) {
    throw new Error(`No sitemap-*.xml found in ${dist}. Run a build first.`);
  }

  const paths = new Set<string>();
  for (const file of files) {
    const xml = fs.readFileSync(path.join(dist, file), "utf8");
    for (const [, location] of xml.matchAll(/<loc>(.*?)<\/loc>/g)) {
      paths.add(new URL(location).pathname);
    }
  }
  return [...paths].sort();
}