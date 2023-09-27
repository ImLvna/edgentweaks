import "./app.scss";

import App from "./App.svelte";
import { IS_DEV, IS_EDGENUITY, IS_EDGENUITY_PLAYER } from "./constants";
import ManagerToolbar from "./toolbar/Manager.svelte";
import PlayerToolbar from "./toolbar/Player.svelte";

const target = document.createElement("div");
target.id = "edgentweaks";
document.body.appendChild(target);

new App({
  target,
});

(async () => {
  await new Promise((r) => setTimeout(r, 100));
  if (IS_EDGENUITY_PLAYER || IS_DEV) {
    while (!document.querySelector(".toolbar"))
      await new Promise((r) => setTimeout(r, 1));
    new PlayerToolbar({
      target: document.querySelector(".toolbar")!,
    });
  } else if (IS_EDGENUITY) {
    while (!document.querySelector("ul.navbar-nav.my-2"))
      await new Promise((r) => setTimeout(r, 1));
    new ManagerToolbar({
      target: document.querySelector("ul.navbar-nav.my-2")!,
    });
  }
})();
