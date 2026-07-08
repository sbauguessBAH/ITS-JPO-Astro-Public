// @ts-check
import eslint from "@eslint/js";
import astroParser from "astro-eslint-parser";
import eslintPluginAstro from "eslint-plugin-astro";
import perfectionist from "eslint-plugin-perfectionist";
import prettier from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const typescriptParser = tseslint.parser;
const typescriptPlugin = tseslint.plugin;

/** @type {import("eslint").Linter.Config} */
const baseConfig = {
  name: "base/custom",
  ignores: ["**/dist", "**/node_modules", "**/.astro", "**/.github"],
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },
    parserOptions: {
      projectService: true,
      tsconfigRootDir: __dirname,
    },
  },
};

/** @type {import("eslint").Linter.Config} */
const typescriptConfig = {
  files: ["**/*.ts", "**/*.mts", "**/*.astro", "**/*.vue"],
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      ecmaVersion: "latest",
      projectService: true,
      sourceType: "module",
      tsconfigRootDir: __dirname,
    },
  },
  name: "typescript/custom",
  plugins: {
    typescript: typescriptPlugin,
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "warn",
  },
  settings: {
    jsdoc: {
      mode: "typescript",
    },
  },
};

/** @type {import("eslint").Linter.Config} */
const astroConfig = {
  files: ["**/*.astro"],
  languageOptions: {
    parser: astroParser,
    parserOptions: {
      ecmaVersion: "latest",
      extraFileExtensions: [".astro"],
      parser: typescriptParser,
      project: "./tsconfig.json",
      projectService: false,
      sourceType: "module",
      tsconfigRootDir: __dirname,
    },
  },
  name: "astro/custom",
  plugins: {
    astro: eslintPluginAstro,
  },
  rules: {
    "no-undef": "off",
  },
};

/** @type {import("eslint").Linter.Config} */
const perfectionistConfig = {
  files: ["**/*.ts", "**/*.mts", "**/*.astro", "**/*.vue"],
  name: "perfectionist/custom",
  plugins: {
    perfectionist: perfectionist,
  },
  rules: {
    ...perfectionist.configs["recommended-natural"].rules,
  },
};

/** @type {import("eslint").Linter.Config} */
const prettierConfig = {
  name: "prettier/custom",
  plugins: {
    prettier: prettier,
  },
};

export default defineConfig([
  eslint.configs.recommended,
  baseConfig,
  ...tseslint.configs.recommended,
  typescriptConfig,

  // Allow triple-slash references in `*.d.ts` files.
  {
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },

  prettierConfig,
  perfectionistConfig,

  ...eslintPluginAstro.configs.recommended,
  astroConfig,
]);
