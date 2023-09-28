<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  import { type defaultSettings } from "../settings";
  import { getStageFrame, querySelector, querySelectorAll } from "../util";
  import { type Executor, setupModule } from ".";
  const settings = getContext<Writable<typeof defaultSettings>>("settings");

  // Module Code

  const supports = ["Instruction", "Warm-Up", "Summary", "Lecture"];

  const execute: Executor = {
    name: "GuessPractice",
    supports: ["player"],
    timeout: 1000,
    loop() {
      if (!$settings.guessPractice) return;
      if (
        !supports.includes(document.getElementById("activity-title")!.innerText)
      )
        return;

      const allEntries = querySelectorAll(
        "form > .answer-choice-button",
        getStageFrame().contentDocument!,
      );
      if (allEntries.length > 0) {
        allEntries[
          Math.floor(Math.random() * Math.floor(allEntries.length))
        ].click();
      } else {
        const iframe = querySelector(
          "iframe",
          getStageFrame().contentDocument!,
        ) as HTMLIFrameElement;

        if (iframe) {
          const allEntries = querySelectorAll(
            ".answer-choice-button",
            iframe.contentDocument!,
          );
          if (allEntries.length > 0) {
            allEntries[
              Math.floor(Math.random() * Math.floor(allEntries.length))
            ].click();
          }
        }
      }

      querySelector("#btnCheck", getStageFrame().contentDocument!)?.click();
    },
  };

  // SETUP CODE

  const logs = getContext<Writable<string[]>>("logs");
  const suppressErrors = getContext<Writable<boolean>>("suppressErrors");
  const loop = getContext<Writable<boolean>>("loop");
  const keyEvent = getContext<Writable<KeyboardEvent>>("keyEvent");
  setupModule(execute, { logs, loop, keyEvent, suppressErrors });
</script>
