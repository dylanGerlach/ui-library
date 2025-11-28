import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: false, // Don't clean dist folder - preserve .d.ts files from tsc
    lib: {
      // Entry point for your component library
      entry: resolve(__dirname, "src/index.ts"),
      // Global name for UMD builds (if used)
      name: "UiLibrary",
      // File naming pattern, per format
      fileName: (format) => {
        if (format === "es") return "index.esm.js";
        if (format === "umd") return "index.js";
        return `index.${format}.js`;
      },
    },
    cssCodeSplit: false,
    rollupOptions: {
      // Prevent bundling these dependencies — users of your library bring their own React
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "index.css";
          }
          return assetInfo.name || "asset";
        },
      },
    },
  },
});
