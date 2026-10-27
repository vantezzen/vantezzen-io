import * as autoform from "./autoform";
import * as howLoudIsMyHotel from "./how-loud-is-my-hotel";
import * as infiniteCraftSolver from "./infinite-craft-solver";
import * as koiPhoto from "./koi-photo";
import * as langfuseEve from "./langfuse-eve";
import * as launchroom from "./launchroom";
import * as libconsent from "./libconsent";
import * as skipSilence from "./skip-silence";
import * as wrappedForDoordash from "./wrapped-for-doordash";
import * as wrappedForTiktok from "./wrapped-for-tiktok";

export type Writeup = {
  Body: () => React.ReactNode;
  /** Replaces the screenshot under the header with something interactive. */
  Showcase?: () => React.ReactNode;
};

export const writeups: Record<string, Writeup> = {
  "wrapped-for-tiktok": wrappedForTiktok,
  "koi-photo": koiPhoto,
  "infinite-craft-solver": infiniteCraftSolver,
  "skip-silence": skipSilence,
  "how-loud-is-my-hotel": howLoudIsMyHotel,
  "wrapped-for-doordash": wrappedForDoordash,
  autoform,
  libconsent,
  "langfuse-eve": langfuseEve,
  launchroom,
};
