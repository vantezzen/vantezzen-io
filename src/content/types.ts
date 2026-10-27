import type { StaticImageData } from "next/image";

export type Fact = {
  label: string;
  value: string;
  href?: string;
};

export type Work = {
  slug: string;
  kind: "project" | "library";
  name: string;
  /** Where the thing itself lives. */
  url: string;
  /** Short host shown on cards, e.g. "ics.vantezzen.io". */
  host: string;
  /** One line for cards. */
  tagline: string;
  /** Two or three sentences for the card body and the page description. */
  summary: string;
  icon: StaticImageData;
  /** Screenshot shown on the writeup page. */
  image?: StaticImageData;
  imageAlt?: string;
  /** What the card shows: a phone screen or a screenshot bleeding off the edge. */
  card: { style: "phone" | "screenshot"; image: StaticImageData };
  tags: string[];
  facts: Fact[];
  /** Label of the button that opens the project. */
  cta: string;
  github?: string;
  /** npm package name, for libraries. */
  npm?: string;
};
