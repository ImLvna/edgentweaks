<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  import { type defaultSettings } from "../settings";
  import { type Executor, setupModule } from ".";
  const settings = getContext<Writable<typeof defaultSettings>>("settings");

  // Module Code

  const execute: Executor = {
    name: "Template",
    supports: ["player"],
    loop() {
      if (!$settings.yourSetting) return;
      // Your code here
    },
  };

  // SETUP CODE

  const logs = getContext<Writable<string[]>>("logs");
  const suppressErrors = getContext<Writable<boolean>>("suppressErrors");
  const loop = getContext<Writable<boolean>>("loop");
  const keyEvent = getContext<Writable<KeyboardEvent>>("keyEvent");
  setupModule(execute, { logs, loop, keyEvent, suppressErrors });
</script>
