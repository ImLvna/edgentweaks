import { svelte } from "@sveltejs/vite-plugin-svelte";
import { execSync } from "child_process";
import { defineConfig } from "vite";
import banner from "vite-plugin-banner";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import mkcert from "vite-plugin-mkcert";

import { author, homepage, version } from "./package.json";

const commitHash = execSync("git rev-parse --short HEAD").toString().trim();

const userscriptHeader = `// ==UserScript==
// @name        Edgentweaks
// @description Quality of life improvements for Edgenuity
// @match       *://*.core.learn.edgenuity.com/player/
// @match        *://student.edgenuity.com/*
// ==/UserScript==`;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    cssInjectedByJsPlugin(),
    mkcert(),
    banner(() => userscriptHeader),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    lib: {
      entry: "src/main.ts",
      formats: ["iife"],
      fileName: () => `edgentweaks.user.js`,
      name: "EdgenTweaks",
    },
  },

  define: {
    EDG_VERSION: `"${version}"`,
    EDG_COMMIT: `"${commitHash}"`,
    EDG_GITHUB_URL: `"${homepage}"`,
    EDG_AUTHOR: author,
  },

  // We use https so a userscript can load the script dynamically
  server: {
    https: true,
  },
});
