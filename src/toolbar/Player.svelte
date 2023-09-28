<script lang="ts">
  import type { Writable } from "svelte/store";

  const settings: Writable<Record<string, boolean>> =
    window.EdgenTweaks._.settings;
</script>

{#if !$settings.stealthMode}
  <button
    class="noButton"
    on:click={window.EdgenTweaks._.toggleSettings}
    on:keydown={window.EdgenTweaks._.toggleSettings}
    ><li class="tools-res2" />
  </button>
{/if}

<style>
  .noButton {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
</style>
