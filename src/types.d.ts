import type { Writable } from "svelte/store";

import type { Executor } from "./modules";

declare global {
  interface Window {
    $: JQueryStatic;
    EdgenTweaks: {
      modules: Record<string, Executor>;
      settings: Record<string, boolean>;
      _: {
        settings: Writable<Record<string, boolean>>;
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
