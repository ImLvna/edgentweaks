<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  import { setupModule, type Executor } from ".";
  import { type defaultSettings } from "../settings";
  import { getStageFrame, querySelectorAll } from "../util";
  const settings = getContext<Writable<typeof defaultSettings>>("settings");

  // Module Code

  const execute: Executor = {
    name: "Speed Up Video",
    supports: ["player"],
    loop() {
      if (!$settings.speedUpVideo) return;
      querySelectorAll("video", getStageFrame().contentDocument!).forEach(
        (video) => {
          (video as unknown as HTMLVideoElement).playbackRate = 10;
        },
      );
    },
  };

  // SETUP CODE

  const logs = getContext<Writable<string[]>>("logs");
  const suppressErrors = getContext<Writable<boolean>>("suppressErrors");
  const loop = getContext<Writable<boolean>>("loop");
  const keyEvent = getContext<Writable<KeyboardEvent>>("keyEvent");
  setupModule(execute, { logs, loop, keyEvent, suppressErrors });
</script>
