#!/usr/bin/env node
/**
 * Visual regression against a base git ref.
 *
 * 1. Builds the base ref in a temporary git worktree and screenshots every
 *    page in its sitemap into `.playwright/baseline` (git-ignored).
 * 2. Builds the current working tree and compares every page to the baseline.
 *
 * Usage: node scripts/visual-regression.mjs [options]
 *   --base <ref>        Git ref to use as the baseline (default: main)
 *   --reuse-baseline    Skip the base build and reuse an existing `.playwright/baseline`
 *   --skip-build        Do not rebuild the current tree (use the existing dist/)
 *   --baseline-only     Only capture the baseline
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { parseArgs } from "node:util";

const { values: opts } = parseArgs({
  options: {
    base: { default: "main", type: "string" },
    "baseline-only": { default: false, type: "boolean" },
    "reuse-baseline": { default: false, type: "boolean" },
    "skip-build": { default: false, type: "boolean" },
  },
});

const repo = process.cwd();
const baselineDir = path.join(repo, ".playwright", "baseline");
const playwrightArgs = ["playwright", "test", "--project=visual"];

function run(cmd, args, { cwd = repo, env = {}, allowFail = false } = {}) {
  console.log(`\n$ ${cmd} ${args.join(" ")}  (${cwd})`);
  const res = spawnSync(cmd, args, {
    cwd,
    env: { ...process.env, ...env },
    stdio: "inherit",
  });
  if (res.status !== 0 && !allowFail) {
    throw new Error(`Command failed (${res.status}): ${cmd} ${args.join(" ")}`);
  }
  return res.status ?? 1;
}

function output(cmd, args, cwd = repo) {
  return spawnSync(cmd, args, { cwd, encoding: "utf8" }).stdout.trim();
}

function captureBaseline() {
  const worktree = fs.mkdtempSync(path.join(os.tmpdir(), "its-jpo-vr-base-"));
  fs.rmSync(worktree, { recursive: true });
  run("git", ["worktree", "add", "--detach", worktree, opts.base]);

  try {
    const sameDeps =
      fs.readFileSync(path.join(repo, "package-lock.json"), "utf8") ===
      fs.readFileSync(path.join(worktree, "package-lock.json"), "utf8");
    if (sameDeps) {
      fs.symlinkSync(
        path.join(repo, "node_modules"),
        path.join(worktree, "node_modules"),
        "dir",
      );
    } else {
      run("npm", ["ci"], { cwd: worktree });
    }

    const envFile = path.join(repo, ".env");
    if (fs.existsSync(envFile)) {
      fs.copyFileSync(envFile, path.join(worktree, ".env"));
    }

    run("npm", ["run", "build:noWarn"], { cwd: worktree });

    fs.rmSync(baselineDir, { force: true, recursive: true });
    run("npx", [...playwrightArgs, "--update-snapshots=all"], {
      env: {
        VR: "1",
        VR_PHASE: "baseline",
        VR_PORT: "4322",
        VR_ROOT: worktree,
      },
    });
  } finally {
    run("git", ["worktree", "remove", "--force", worktree], {
      allowFail: true,
    });
  }
}

function summarize() {
  const resultsPath = path.join(repo, ".playwright", "results.json");
  if (!fs.existsSync(resultsPath)) return;
  const report = JSON.parse(fs.readFileSync(resultsPath, "utf8"));

  const changed = [];
  const added = [];
  let total = 0;
  const walk = (suite) => {
    for (const spec of suite.specs ?? []) {
      total++;
      const result = spec.tests?.[0];
      if (result?.status === "skipped") added.push(spec.title);
      else if (!spec.ok) changed.push(spec.title);
    }
    (suite.suites ?? []).forEach(walk);
  };
  report.suites.forEach(walk);

  const list = (items) => items.map((p) => `- \`${p}\``).join("\n");
  const lines = [
    `## Visual regression vs \`${opts.base}\``,
    "",
    `${total} pages checked: **${changed.length} changed**, ${added.length} new, ${total - changed.length - added.length} identical.`,
  ];
  if (changed.length) {
    lines.push("", "### Pages with differences", list(changed));
  }
  if (added.length) {
    lines.push("", "### New pages (no baseline)", list(added));
  }
  const text = lines.join("\n") + "\n";
  console.log(`\n${text}`);
  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, text);
  }
}

if (!opts["reuse-baseline"]) {
  captureBaseline();
} else if (!fs.existsSync(baselineDir)) {
  throw new Error(
    "--reuse-baseline was set but .playwright/baseline does not exist.",
  );
}

if (opts["baseline-only"]) process.exit(0);

if (!opts["skip-build"]) run("npm", ["run", "build:noWarn"]);

console.log(
  `\nComparing ${output("git", ["rev-parse", "--short", "HEAD"])} against ${opts.base}`,
);
const status = run("npx", [...playwrightArgs, "--update-snapshots=none"], {
  allowFail: true,
  env: { VR: "1", VR_PHASE: "compare" },
});
summarize();
process.exit(status);
