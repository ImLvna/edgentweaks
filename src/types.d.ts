import type { ComponentType } from "svelte";
import type { Writable } from "svelte/store";

import type { Executor } from "./modules";

declare global {
  interface Window {
    $: JQueryStatic;
    EdgenTweaks: {
      modules: Record<string, Executor>;
      settings: Record<string, boolean>;
      utils: typeof import("./util");
      _: {
        stores: {
          logs: Writable<string[]>;
          settings: Writable<Record<string, boolean>>;
          suppressErrors: Writable<boolean>;
          loop: Writable<boolean>;
          keyEvent: Writable<KeyboardEvent>;
          modals: Writable<Map<string, ComponentType>>;
        };
        toggleSettings: () => void;
        legacyExecuted: boolean;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        log: (...args: any[]) => void;
      };
    };
  }

  const EDG_VERSION: string;
  const EDG_COMMIT: string;
  const EDG_GITHUB_URL: string;
  const EDG_AUTHOR: {
    name: string;
    email: string;
    url: string;
  };
}
