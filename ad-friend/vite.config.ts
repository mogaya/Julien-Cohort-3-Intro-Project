import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        // popup: resolve(__dirname, "public/popup.html"),
        background: resolve(__dirname, "src/background.ts"), // Ensure this file exists
        content: resolve(__dirname, "src/content/content.ts"), // Ensure this file exists
      },
      output: {
        entryFileNames: "[name].js", // Prevents hashing
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
  publicDir: "public",
});
