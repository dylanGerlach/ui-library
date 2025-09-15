import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class", // toggle with <html class="dark">
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx,mdx}",
  ],
}

export default config
