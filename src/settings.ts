import { IS_EDGENUITY, IS_EDGENUITY_PLAYER } from "./constants";

export type Category = "QOL" | "General" | "Misc";

interface Setting {
  name: string;
  description: string;
  default: boolean;
  category: Category;
  show?: () => boolean;
}

export const settingsData: Record<string, Setting> = {
  autoAdvance: {
    name: "Auto Advance",
    description:
      "Automatically advance to the next activity when you complete one",
    default: false,
    category: "General",
    show: () => IS_EDGENUITY_PLAYER,
  },
  skipIntro: {
    name: "Skip Intro",
    description: "Skip the intro video",
    default: false,
    category: "QOL",
    show: () => IS_EDGENUITY_PLAYER,
  },
  assignmentUnlocker: {
    name: "Assignment Unlocker",
    description:
      "Allows you to access assignments before completing whats before it",
    default: false,
    category: "QOL",
    show: () => IS_EDGENUITY && !IS_EDGENUITY_PLAYER,
  },
  showLogs: {
    name: "Show Logs",
    description: "Show EdgenTweaks Logs",
    default: false,
    category: "Misc",
  },
  debugInfo: {
    name: "Debug Info",
    description: "Show Debug Info in various places",
    default: false,
    category: "Misc",
  },
  legacy: {
    name: "Legacy",
    description: "Load the legacy version of EdgenTweaks",
    default: false,
    category: "Misc",
  },
};

export const defaultSettings: Record<string, boolean> = Object.fromEntries(
  Object.entries(settingsData).map(([key, value]) => [key, value.default]),
);
