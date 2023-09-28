<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  import { type Executor, setupModule } from ".";

  // Module Code

  const execute: Executor = {
    name: "SearchEngines",
    supports: ["player"],
    keyEvent: (e) => {
      if (e.key !== "g") return;
      const selection = (e.target as HTMLElement).ownerDocument?.defaultView
        ?.getSelection()
        ?.toString();
      if (selection) {
        const url = `https://www.google.com/search?q=${selection}`;
        window.open(url, "_blank");
      }
    },
  };

  // SETUP CODE

  const logs = getContext<Writable<string[]>>("logs");
  const suppressErrors = getContext<Writable<boolean>>("suppressErrors");
  const loop = getContext<Writable<boolean>>("loop");
  const keyEvent = getContext<Writable<KeyboardEvent>>("keyEvent");
  setupModule(execute, { logs, loop, keyEvent, suppressErrors });
</script>
