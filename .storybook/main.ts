import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)", "../src/**/*.mdx"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    // Force Vite to re-optimize dependencies to fix "Outdated Optimize Dep" errors
    config.optimizeDeps = {
      ...config.optimizeDeps,
      force: true,
    };
    return config;
  },
  // PostCSS config (postcss.config.js) is automatically discovered from root
  // Tailwind config (tailwind.config.ts) is automatically discovered from root
  // Both Storybook and Vite build will use the same configs automatically
};

export default config;
