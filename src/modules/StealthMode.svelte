<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  import { type defaultSettings } from "../settings";
  import { type Executor, setupModule } from ".";
  const settings = getContext<Writable<typeof defaultSettings>>("settings");

  // Module Code

  const execute: Executor = {
    name: "StealthMode",
    supports: ["player", "manager", "dev"],
    keyEvent(e) {
      if (e && e.key === "\\" && e.type === "keydown")
        $settings.stealthMode = !$settings.stealthMode;
    },
  };

  // SETUP CODE

  const logs = getContext<Writable<string[]>>("logs");
  const loop = getContext<Writable<boolean>>("loop");
  const keyEvent = getContext<Writable<KeyboardEvent>>("keyEvent");
  setupModule(execute, { logs, loop, keyEvent });
</script>
