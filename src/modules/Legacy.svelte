<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  import LegacyScript from "../include/Edgentweaks.user";
  import { type defaultSettings } from "../settings";
  import { type Executor, setupModule } from ".";
  const settings = getContext<Writable<typeof defaultSettings>>("settings");

  // Module Code

  let lastSetting = false;
  let isExecuted = false;

  const execute: Executor = {
    name: "Legacy",
    supports: ["player", "manager"],
    loop() {
      if (lastSetting && !$settings.legacy) {
        lastSetting = $settings.legacy;
        const shouldReload = confirm(
          "Edgenuity must be reloaded to disable legacy mode. Reload now?",
        );
        if (shouldReload) {
          location.reload();
        }
      }
      lastSetting = $settings.legacy;

      if (isExecuted || !$settings.legacy) return;

      // If vite reloads the page, we don't want to execute the script twice
      isExecuted = true;
      if (window.EdgenTweaks._.legacyExecuted) return location.reload();
      window.EdgenTweaks._.legacyExecuted = true;

      LegacyScript();
    },
  };

  // SETUP CODE

  const logs = getContext<Writable<string[]>>("logs");
  const loop = getContext<Writable<boolean>>("loop");
  const keyEvent = getContext<Writable<KeyboardEvent>>("keyEvent");
  setupModule(execute, { logs, loop, keyEvent });
</script>
