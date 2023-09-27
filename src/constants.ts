export const IS_EDGENUITY = window.location.hostname.includes("edgenuity.com");
export const IS_EDGENUITY_PLAYER =
  IS_EDGENUITY && window.location.hostname.includes("core.learn.edgenuity.com");

export const IS_DEV = !IS_EDGENUITY;
