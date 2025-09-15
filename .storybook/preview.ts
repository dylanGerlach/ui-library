import type { Preview } from "@storybook/react-vite";
// Import from the new consolidated theming if necessary:
import { themes } from "storybook/theming";


// Global CSS
import "../src/index.css";

const preview: Preview = {
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
    // Built‐in dark mode parameters in v9
    darkMode: {
      dark: { ...themes.dark, // or themes.darkTheme
        appBg: "var(--color-background)"
      },
      light: { ...themes.normal, // or themes.lightTheme
        appBg: "var(--color-background)"
      },
      stylePreview: true,
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
};

export default preview;
