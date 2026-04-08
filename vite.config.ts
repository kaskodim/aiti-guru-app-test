import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import svgr from "vite-plugin-svgr";
import path from "node:path";

export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] }), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // "entities": path.resolve(__dirname, "./src/entities"),
      // "shared": path.resolve(__dirname, "./src/shared"),
    },
  },
});
