import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      // Entry point for your component library
      entry: resolve(__dirname, "src/index.ts"),
      // Global name for UMD builds (if used)
      name: "UiLibrary",
      // File naming pattern, per format
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      // Prevent bundling these dependencies — users of your library bring their own React
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
