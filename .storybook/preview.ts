import type { Preview } from "@storybook/react-vite";
import { themes } from "storybook/theming";
import { withTheme } from "./addons/theme-switcher";

// Global CSS
import "../src/index.css";

const preview: Preview = {
  decorators: [withTheme],
  globals: {
    theme: "default",
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    // ✅ Built-in color mode config (Storybook 9)
    colorMode: {
      defaultMode: "auto", // "light" | "dark" | "auto"
      classNameDark: "dark",
      classNameLight: "light",
      modes: {
        light: {
          ...themes.light,
          appBg: "var(--color-background)",
        },
        dark: {
          ...themes.dark,
          appBg: "var(--color-background)",
        },
      },
    },
    backgrounds: {
      default: "background",
      values: [
        { name: "background", value: "var(--color-background)" },
        { name: "card", value: "var(--color-card)" },
        { name: "primary", value: "var(--color-primary)" },
      ],
    },
  },
  globalTypes: {
    theme: {
      description: "Theme color scheme",
      defaultValue: "default",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "default", title: "Default" },
          { value: "ocean", title: "Ocean" },
          { value: "forest", title: "Forest" },
          { value: "sunset", title: "Sunset" },
          { value: "royal", title: "Royal" },
          { value: "minimal", title: "Minimal" },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
