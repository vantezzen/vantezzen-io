"use client";

type GoogleFc = {
  callbackQueue?: Array<() => void>;
  showRevocationMessage?: () => void;
};

declare global {
  interface Window {
    googlefc?: GoogleFc;
  }
}

/**
 * Reopens the consent banner of Google's consent management platform, so
 * visitors can change or withdraw their choice at any time.
 */
export function ConsentSettingsButton() {
  function openSettings() {
    window.googlefc ??= {};
    window.googlefc.callbackQueue ??= [];
    window.googlefc.callbackQueue.push(() =>
      window.googlefc?.showRevocationMessage?.(),
    );
  }

  return (
    <button
      type="button"
      onClick={openSettings}
      className="transition-colors hover:text-neutral-700"
    >
      Cookie settings
    </button>
  );
}
