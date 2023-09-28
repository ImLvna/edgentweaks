<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  import { type defaultSettings } from "../settings";
  import { getStageFrame, querySelector } from "../util";
  import { type Executor, setupModule } from ".";
  const settings = getContext<Writable<typeof defaultSettings>>("settings");

  // Module Code
  const disabledFor = ["Unit Test", "Unit Test Review", "Quiz"];

  const execute: Executor = {
    name: "AutoAdvance",
    supports: ["player"],
    loop() {
      if (!$settings.autoAdvance) return;
      if (
        disabledFor.includes(querySelector("#activity-title")?.innerText ?? "")
      )
        return;
      if ("Complete" === querySelector("#activity-status")?.innerText) return;

      querySelector(".footnav.goRight")?.click();

      querySelector(".FrameRight", getStageFrame().contentDocument!)?.click();
    },
  };

  // SETUP CODE

  const logs = getContext<Writable<string[]>>("logs");
  const suppressErrors = getContext<Writable<boolean>>("suppressErrors");
  const loop = getContext<Writable<boolean>>("loop");
  const keyEvent = getContext<Writable<KeyboardEvent>>("keyEvent");
  setupModule(execute, { logs, loop, keyEvent, suppressErrors });
</script>
