// ==UserScript==
// @name        Edgentweaks
// @description Quality of life improvements for Edgenuity
// @match       *://*.core.learn.edgenuity.com/player/
// @match        *://student.edgenuity.com/*
// ==/UserScript==

const scriptTag = document.createElement("script");
scriptTag.src = `https://github.com/imlvna/edgentweaks/releases/download/devbuild/edgentweaks.user.js?cachebust=${Date.now()}`;
document.body.appendChild(scriptTag);
