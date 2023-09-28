export function getStageFrame() {
  return document.querySelector("#stageFrame") as HTMLIFrameElement;
}

export function querySelector(
  selector: string,
  root: Document | HTMLElement = document,
) {
  return root.querySelector(selector) as HTMLElement | null;
}

export function querySelectorAll(
  selector: string,
  root: Document | HTMLElement = document,
) {
  return root.querySelectorAll(selector) as NodeListOf<HTMLElement>;
}
