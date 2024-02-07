export function getStageFrame() {
  return document.querySelector("#stageFrame") as HTMLIFrameElement;
}

export function querySelector<T extends HTMLElement>(
  selector: string,
  root: Document | HTMLElement = document,
): T | null {
  if (!root) root = document;
  return root.querySelector(selector) as T | null;
}

export function querySelectorAll<T extends HTMLElement>(
  selector: string,
  root: Document | HTMLElement = document,
): NodeListOf<T> {
  if (!root) root = document;
  return root.querySelectorAll(selector) as NodeListOf<T>;
}
