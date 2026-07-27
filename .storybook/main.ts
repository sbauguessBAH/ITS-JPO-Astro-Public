import { StorybookConfig } from "@storybook-astro/framework/node";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  framework: {
    name: "@storybook-astro/framework",
    options: {},
  },
  staticDirs: ["../public"],
  core: {
    disableTelemetry: true,
  },
  addons: ["@storybook/addon-docs"],
};

export default config;
