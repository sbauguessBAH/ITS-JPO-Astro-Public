// @ts-check
import eslint from '@eslint/js';
import eslintPluginAstro from "eslint-plugin-astro";
import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginAstro.configs.recommended,
  perfectionist.configs["recommended-natural"],
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn"
    }
  }
]);