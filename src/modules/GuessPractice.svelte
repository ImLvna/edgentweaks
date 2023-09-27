<script lang="ts">
  import jq from "jquery";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  import { type defaultSettings } from "../settings";
  import { type Executor, setupModule } from ".";
  const settings = getContext<Writable<typeof defaultSettings>>("settings");

  // Module Code

  const supports = ["Instruction", "Warm-Up", "Summary", "Lecture"];

  //TODO: Remove jquery calls in favor of native js

  const execute: Executor = {
    name: "GuessPractice",
    supports: ["player"],
    loop() {
      if (!$settings.guessPractice) return;
      if (
        !supports.includes(document.getElementById("activity-title")!.innerText)
      )
        return;
      let numOption: number;
      numOption = jq("iframe#stageFrame")
        .contents()
        .find("form")
        .find(".answer-choice-button").length;
      if (numOption > 0) {
        jq("iframe#stageFrame")
          .contents()
          .find("form")
          .find(".answer-choice-button")
          [Math.floor(Math.random() * Math.floor(numOption))].click();
      } else if (
        jq("#stageFrame")
          .contents()
          .find("iframe")
          .contents()
          .find(".answer-choice-button").length > 0
      ) {
        jq("#stageFrame")
          .contents()
          .find("iframe")
          .contents()
          .find(".answer-choice-button")
          [Math.floor(Math.random() * Math.floor(4))].click();
      }
      jq("#stageFrame").contents().find("#btnCheck")[0].click();
    },
  };

  // SETUP CODE

  const logs = getContext<Writable<string[]>>("logs");
  const loop = getContext<Writable<boolean>>("loop");
  const keyEvent = getContext<Writable<KeyboardEvent>>("keyEvent");
  setupModule(execute, { logs, loop, keyEvent });
</script>
