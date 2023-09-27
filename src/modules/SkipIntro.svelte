<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  import { type defaultSettings } from "../settings";
  import { type Executor, setupModule } from ".";
  const settings = getContext<Writable<typeof defaultSettings>>("settings");

  // Module Code

  const execute: Executor = {
    name: "SkipIntro",
    supports: ["player"],
    loop() {
      if (!$settings.skipIntro) return;
      window.frames[0].document.getElementById("invis-o-div")?.remove();
    },
  };

  // SETUP CODE

  const logs = getContext<Writable<string[]>>("logs");
  const loop = getContext<Writable<boolean>>("loop");
  const keyEvent = getContext<Writable<KeyboardEvent>>("keyEvent");
  setupModule(execute, { logs, loop, keyEvent });
</script>
