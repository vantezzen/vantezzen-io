/**
 * Ezoic placeholder ids. Each one must exist as a placeholder in the Ezoic
 * dashboard (EzoicAds → Ad Positions → Placeholders) before it can fill.
 */
export const AD_PLACEMENTS = {
  homeTop: 123,
  homeMiddle: 124,
  homeBottom: 125,
  projectTop: 126,
  projectBottom: 127,
  postTop: 128,
  postBottom: 129,
  projects: 130,
} as const;

declare global {
  interface Window {
    ezstandalone?: {
      cmd: Array<() => void>;
      showAds: (...ids: number[]) => void;
      destroyPlaceholders: (...ids: number[]) => void;
    };
  }
}

/**
 * Queues a call until Ezoic's script has loaded. The queue is stubbed in the
 * root layout.
 */
export function runEzoic(fn: () => void) {
  window.ezstandalone?.cmd.push(fn);
}
