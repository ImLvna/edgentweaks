<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  import { type defaultSettings } from "../settings";
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
        disabledFor.includes(
          (document.getElementById("activity-title") as HTMLElement | null)
            ?.innerText ?? "",
        )
      )
        return;
      if (
        "Complete" ===
        (document.getElementById("activity-status") as HTMLElement | null)
          ?.innerText
      )
        return;

      (
        document.querySelector(".footnav.goRight") as HTMLElement | null
      )?.click();
      (document.querySelector(".FrameRight") as HTMLElement | null)?.click();
    },
  };

  // SETUP CODE

  const logs = getContext<Writable<string[]>>("logs");
  const loop = getContext<Writable<boolean>>("loop");
  const keyEvent = getContext<Writable<KeyboardEvent>>("keyEvent");
  setupModule(execute, { logs, loop, keyEvent });
</script>
