declare global {
  interface Window {
    __views: Promise<number>;
  }
}

export function loadViews() {
  return window.__views;
}
