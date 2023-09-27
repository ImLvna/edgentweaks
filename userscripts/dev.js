// ==UserScript==
// @name        Edgentweaks Dev Loader
// @description Loads a hot-reloading edgentweaks instance from vite
// @match       *://*.core.learn.edgenuity.com/player/
// @match        *://student.edgenuity.com/*
// ==/UserScript==

const scripts = ["@vite/client", "src/main.ts"];

console.log("Loading edgentweaks dev instance");
scripts.forEach((script) => {
  const scriptTag = document.createElement("script");
  scriptTag.type = "module";
  scriptTag.src = `https://localhost:4000/${script}`;
  document.body.appendChild(scriptTag);
});
