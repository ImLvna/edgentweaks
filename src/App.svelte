<script lang="ts">
  import { onMount, setContext, type ComponentType } from "svelte";
  import { writable } from "svelte/store";
  import { fade } from "svelte/transition";

  import SettingsModal from "./modals/Settings.svelte";
  import { modules } from "./modules";
  import { defaultSettings } from "./settings";
  import * as utils from "./util";

  const modals = writable<Map<string, ComponentType>>(new Map());
  setContext("modals", modals);

  const logs = writable<string[]>(["EdgenTweaks loaded"]);
  logs.subscribe((logs) => {
    if (logs.length > 100) {
      logs.splice(0, logs.length - 100);
    }
    console.log(logs[0]);
  });
  setContext("logs", logs);

  const settings = writable(defaultSettings);
  let firstUpdate = true;
  settings.subscribe((settings) => {
    if (firstUpdate) {
      return;
    }
    console.log("Settings updated", settings);
    localStorage.setItem("edgentweaks", JSON.stringify(settings));
  });
  setContext("settings", settings);

  // Loop is updated every frame, modules can subscribe to it to get a tick
  const loop = writable(false);
  setContext("loop", loop);
  // KeyEvent is updated on keydown and keyup, modules can subscribe to it to get key events
  const keyEvent = writable<KeyboardEvent | null>(null);
  setContext("keyEvent", keyEvent);
  // Suppress errors until everythings loaded
  const suppressErrors = writable(true);
  setContext("suppressErrors", suppressErrors);

  window.EdgenTweaks = {
    modules: {},
    utils,
    _: {
      stores: {
        logs,
        settings,
        modals,
        loop,
        keyEvent,
        suppressErrors,
      },
      toggleSettings,
      legacyExecuted: false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      log(...args: any[]) {
        logs.update((logs) => {
          return [args.toString(), ...logs];
        });
      },
    },
  } as typeof window.EdgenTweaks;
  Object.defineProperty(window.EdgenTweaks, "settings", {
    get() {
      return $settings;
    },
    set(value) {
      settings.update((settings) => {
        return { ...settings, ...value };
      });
    },
  });

  onMount(() => {
    const settingsString = localStorage.getItem("edgentweaks");
    if (settingsString) {
      const newSettings = JSON.parse(settingsString);
      settings.update((settings) => {
        return { ...settings, ...newSettings };
      });
    }
    firstUpdate = false;
    setInterval(() => {
      $loop = !$loop;
    }, 1);

    setTimeout(() => {
      $suppressErrors = false;
    }, 3000);

    function getIframeKeys(_window: Window) {
      _window.addEventListener("keydown", (e) => {
        window.EdgenTweaks._.stores.keyEvent.set(e);
      });
      _window.addEventListener("keyup", (e) => {
        window.EdgenTweaks._.stores.keyEvent.set(e);
      });

      if (!_window.document.getElementById("EdgenTweaksUserSelect")) {
        const style = _window.document.createElement("style");
        style.id = "EdgenTweaksUserSelect";
        style.innerHTML = `
          * {
            user-select: unset !important;
          }
        `;

        _window.document.head.appendChild(style);
      }

      const frames = _window.document.getElementsByTagName("iframe");

      for (const frame of frames) {
        try {
          getIframeKeys(frame.contentWindow!);
        } catch (e) {
          console.error(e);
        }
      }
    }

    setInterval(() => {
      try {
        getIframeKeys(window);
      } catch (e) {
        console.error(e);
      }
    }, 1000);
  });

  function toggleSettings(event: KeyboardEvent | MouseEvent) {
    if (event instanceof KeyboardEvent && event.key !== "Enter") {
      return;
    }
    modals.update((modals) => {
      if (modals.has("Settings")) {
        modals.delete("Settings");
      } else {
        modals.set("Settings", SettingsModal);
      }
      return modals;
    });
  }
</script>

{#if !$settings.stealthMode}
  {#if $settings.showLogs}
    <div class="bottomleft logsWindow noClick">
      <div>
        {#each $logs as log}
          <p>{log}</p>
        {/each}
      </div>
    </div>
  {/if}
  <div class="modalWrapper">
    {#each $modals.entries() as [name, modal]}
      <div
        class="modal"
        in:fade={{ duration: 100 }}
        out:fade={{ duration: 100 }}
      >
        <button
          class="close noButton"
          on:click={() =>
            modals.update((modals) => {
              modals.delete(name);
              return modals;
            })}
        >
          X
        </button>
        <h1>{name}</h1>
        <svelte:component this={modal} />
      </div>
    {/each}
  </div>
{/if}

<div class="modules">
  {#each modules as module}
    <svelte:component this={module} />
  {/each}
</div>

<style lang="scss">
  .noClick {
    pointer-events: none !important;
  }

  .bottomleft {
    position: absolute !important;
  }
  .bottomleft {
    bottom: 0;
  }
  .bottomleft {
    left: 0;
  }

  .modal {
    width: 75%;
    height: 75%;
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    text-align: center;

    overflow: scroll;

    padding-top: 3rem;

    align-items: center;
    display: flex;
    flex-direction: column;

    * {
      transform: scale(1.5);
    }

    .close {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0.5rem;
      cursor: pointer;
    }
  }

  .logsWindow {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;

    max-height: 140px;
    overflow-y: scroll;
  }

  .noButton {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }

  .modules {
    display: none;
  }
</style>
