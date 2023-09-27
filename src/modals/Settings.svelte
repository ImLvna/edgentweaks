<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  import {
    type Category,
    type defaultSettings,
    settingsData,
  } from "../settings";
  const settings = getContext<Writable<typeof defaultSettings>>("settings");

  const categories: Record<Category, typeof settingsData> = {} as Record<
    Category,
    typeof settingsData
  >;
  for (const [id, data] of Object.entries(settingsData)) {
    if (data.show && !data.show()) {
      continue;
    }
    if (!categories[data.category]) {
      categories[data.category] = {};
    }
    categories[data.category][id] = data;
  }

  const version = EDG_VERSION;
  const github = EDG_GITHUB_URL;
  const author = EDG_AUTHOR;
</script>

{#each Object.entries(categories) as [category, categoryData]}
  <h2>{category}</h2>
  {#each Object.entries(categoryData) as [id, data]}
    <h3>{data.name}</h3>
    <div class="inline">
      <p>{data.description}{$settings.debugInfo ? ` (${id})` : ""}</p>
      <input type="checkbox" bind:checked={$settings[id]} />
    </div>
  {/each}
{/each}
<a href={github}>EdgenTweaks v{version}</a>
<p>Maintained by <a href={author.url}>{author.name}</a></p>

<style>
  .inline {
    display: flex;
    align-items: center;
  }

  input {
    margin-left: 1rem;
  }
</style>
