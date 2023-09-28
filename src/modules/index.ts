import type { Writable } from "svelte/store";

import { IS_DEV, IS_EDGENUITY, IS_EDGENUITY_PLAYER } from "../constants";
import AssignmentUnlocker from "./AssignmentUnlocker.svelte";
import AutoAdvance from "./AutoAdvance.svelte";
import GuessPractice from "./GuessPractice.svelte";
import Legacy from "./Legacy.svelte";
import SkipIntro from "./SkipIntro.svelte";
import StealthMode from "./StealthMode.svelte";

type loopFunction = () => void;
type keyEventFunction = (e: KeyboardEvent) => void;

export const modules = [
  AssignmentUnlocker,
  AutoAdvance,
  GuessPractice,
  Legacy,
  SkipIntro,
  StealthMode,
];

export interface Executor {
  name: string;
  supports: ("player" | "manager" | "dev")[];
  timeout?: number;
  loop?: () => void;
  keyEvent?: (e: KeyboardEvent) => void;
}

export function setupModule(
  execute: Executor,
  stores: {
    loop: Writable<boolean>;
    keyEvent: Writable<KeyboardEvent>;
    logs: Writable<string[]>;
    suppressErrors: Writable<boolean>;
  },
) {
  window.EdgenTweaks.modules[execute.name] = execute;
  let errorTimeout = false;
  let errorCooldown = 0;

  let suppressingErrors = true;
  function catchError(e: unknown) {
    console.error(e);
    if (suppressingErrors) return;
    stores.logs.update((logs) => {
      return [`Error running ${execute.name}`, ...logs];
    });
    errorTimeout = true;
    errorCooldown += 1000;
    if (errorCooldown > 10000) errorCooldown = 10000;
    setTimeout(() => {
      errorTimeout = false;
    }, errorCooldown);
  }

  let ready = true;

  function wrapFunction(fn: loopFunction | keyEventFunction, timeout?: number) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function (args: any) {
      if (errorTimeout) return;
      if (!ready) return;
      if (timeout) {
        ready = false;
        setTimeout(() => {
          ready = true;
        }, timeout);
      }
      try {
        fn(args as never);
      } catch (e) {
        catchError(e);
      }
    };
  }

  let isSupported = false;

  if (execute.supports.includes("player") && IS_EDGENUITY_PLAYER)
    isSupported = true;
  if (
    execute.supports.includes("manager") &&
    IS_EDGENUITY &&
    !IS_EDGENUITY_PLAYER
  )
    isSupported = true;
  if (execute.supports.includes("dev") && IS_DEV) isSupported = true;

  if (!isSupported) return;

  stores.suppressErrors.subscribe((value) => {
    suppressingErrors = value;
  });

  if (execute.loop)
    stores.loop.subscribe(wrapFunction(execute.loop, execute.timeout));
  if (execute.keyEvent)
    stores.keyEvent.subscribe(wrapFunction(execute.keyEvent));
}
