import type { Work } from "./types";

import wrappedIcon from "@/assets/projects/wrapped-tiktok/icon.png";
import wrappedScreen from "@/assets/projects/wrapped-tiktok/screenshot-1.png";
import koiIcon from "@/assets/projects/koi/icon.png";
import koiImage from "@/assets/projects/koi/screenshot-1.png";
import icsIcon from "@/assets/projects/infinite-craft-solver/icon.png";
import icsImage from "@/assets/projects/infinite-craft-solver/screenshot-1.png";
import silenceIcon from "@/assets/projects/skip-silence/icon.png";
import silenceImage from "@/assets/projects/skip-silence/screenshot-1.png";
import noiseIcon from "@/assets/projects/hotel-noise/icon.png";
import noiseImage from "@/assets/projects/hotel-noise/screenshot-1.png";
import doordashIcon from "@/assets/projects/wrapped-doordash/icon.png";
import doordashImage from "@/assets/projects/wrapped-doordash/screenshot-1.png";
import doordashScreen from "@/assets/projects/wrapped-doordash/screenshot-2.png";
import autoformIcon from "@/assets/projects/autoform/icon.png";
import autoformImage from "@/assets/projects/autoform/screenshot-1.png";
import launchroomIcon from "@/assets/projects/launchroom/icon.png";
import launchroomImage from "@/assets/projects/launchroom/screenshot-1.png";
import langfuseEveIcon from "@/assets/projects/langfuse-eve/icon.png";
import langfuseEveImage from "@/assets/projects/langfuse-eve/screenshot-1.png";
import libconsentIcon from "@/assets/projects/libconsent/icon.png";
import libconsentImage from "@/assets/projects/libconsent/screenshot-1.png";

export const projects: Work[] = [
  {
    slug: "wrapped-for-tiktok",
    kind: "project",
    name: "Wrapped for TikTok",
    url: "https://wrapped.vantezzen.io",
    host: "wrapped.vantezzen.io",
    tagline: "Spotify Wrapped, but for your year on TikTok",
    summary:
      "Your year on TikTok as a story: how many videos you watched, how long you scrolled, and what kind of viewer you are. Built from your own data export and processed in your browser.",
    icon: wrappedIcon,
    card: { style: "phone", image: wrappedScreen },
    tags: ["Next.js", "TypeScript", "JSZip", "Framer Motion", "DuckDB", "Vercel"],
    facts: [
      { label: "Peak month", value: "10.1M visitors" },
      { label: "Visitors since 2023", value: "30M+" },
      { label: "Launched", value: "May 2023" },
      { label: "Data donations", value: "16,981" },
    ],
    cta: "Get your Wrapped",
  },
  {
    slug: "koi-photo",
    kind: "project",
    name: "koi.photo",
    url: "https://koi.photo",
    host: "koi.photo",
    tagline: "A layered photo and vector editor in your browser",
    summary:
      "A free photo editor with layers, masks, RAW development, PSD import and on-device AI cut-outs. It runs in a browser tab, needs no account and keeps your photos on your device.",
    icon: koiIcon,
    image: koiImage,
    imageAlt: "The koi.photo editor with a photo, layers panel and tools",
    card: { style: "screenshot", image: koiImage },
    tags: ["WebGPU", "WebGL2", "Web Workers", "Loro CRDT", "WebAssembly", "transformers.js"],
    facts: [
      { label: "Launched", value: "October 2026" },
      { label: "Rendering", value: "WebGPU + WebGL2" },
      { label: "Price", value: "Free" },
    ],
    cta: "Open the editor",
  },
  {
    slug: "infinite-craft-solver",
    kind: "project",
    name: "Infinite Craft Solver",
    url: "https://ics.vantezzen.io",
    host: "ics.vantezzen.io",
    tagline: "The shortest way to craft any item in Infinite Craft",
    summary:
      "Type an item from neal.fun’s Infinite Craft and get a step-by-step recipe from Water, Fire, Wind and Earth. The search runs in your browser over more than 200,000 crawled recipes.",
    icon: icsIcon,
    image: icsImage,
    imageAlt: "Infinite Craft Solver showing a 20-step recipe for Lady Gaga",
    card: { style: "screenshot", image: icsImage },
    tags: ["Next.js", "TypeScript", "Dijkstra", "PostgreSQL", "Prisma", "Turborepo"],
    facts: [
      { label: "Recipes", value: "205,626" },
      { label: "Items", value: "31,646" },
      { label: "Launched", value: "February 2024" },
      {
        label: "Source",
        value: "GitHub",
        href: "https://github.com/vantezzen/infinite-craft-solver",
      },
    ],
    cta: "Find a recipe",
    github: "https://github.com/vantezzen/infinite-craft-solver",
  },
  {
    slug: "skip-silence",
    kind: "project",
    name: "Skip Silence",
    url: "https://silence.vantezzen.io",
    host: "silence.vantezzen.io",
    tagline: "Remove silence from audio and video automatically",
    summary:
      "Drop in a recording and Skip Silence speeds through or cuts the quiet parts, then exports a new file. A browser extension does the same live for videos on any website.",
    icon: silenceIcon,
    image: silenceImage,
    imageAlt: "The Skip Silence web app with a file drop area",
    card: { style: "screenshot", image: silenceImage },
    tags: ["Web Audio API", "AudioWorklet", "WebCodecs", "Mediabunny", "WXT", "React"],
    facts: [
      { label: "Extension users", value: "8,000+" },
      { label: "GitHub stars", value: "470" },
      { label: "Since", value: "2019" },
      {
        label: "Extension",
        value: "Get it",
        href: "/get/skipsilence",
      },
    ],
    cta: "Remove silence",
    github: "https://github.com/vantezzen/skip-silence",
  },
  {
    slug: "how-loud-is-my-hotel",
    kind: "project",
    name: "How loud is my Hotel",
    url: "https://noise.vantezzen.io",
    host: "noise.vantezzen.io",
    tagline: "Check how noisy a hotel is before you book",
    summary:
      "Enter a hotel, Airbnb or apartment and get a quiet score from 0 to 100. It scans OpenStreetMap for roads, railways, airports, nightlife and other noise sources around the address.",
    icon: noiseIcon,
    image: noiseImage,
    imageAlt: "How loud is my Hotel landing page with a map and address search",
    card: { style: "screenshot", image: noiseImage },
    tags: ["OpenStreetMap", "Overpass API", "TanStack Start", "deck.gl", "MapLibre", "Postgres"],
    facts: [
      { label: "Data", value: "OpenStreetMap" },
      { label: "Search radius", value: "Up to 4 km" },
      { label: "Launched", value: "June 2026" },
    ],
    cta: "Check a hotel",
  },
  {
    slug: "wrapped-for-doordash",
    kind: "project",
    name: "Wrapped for DoorDash",
    url: "https://doordash.vantezzen.io",
    host: "doordash.vantezzen.io",
    tagline: "Your year of food deliveries, wrapped",
    summary:
      "See how much you spent on DoorDash, how long you waited for deliveries and which store you ordered from most. Your order export is analyzed in your browser.",
    icon: doordashIcon,
    image: doordashImage,
    imageAlt: "Wrapped for DoorDash landing page",
    card: { style: "phone", image: doordashScreen },
    tags: ["Next.js", "TypeScript", "PapaParse", "JSZip"],
    facts: [
      { label: "Launched", value: "November 2023" },
      { label: "License", value: "MIT" },
      {
        label: "Source",
        value: "GitHub",
        href: "https://github.com/vantezzen/doordash-wrapped",
      },
    ],
    cta: "Get your Wrapped",
    github: "https://github.com/vantezzen/doordash-wrapped",
  },
];

export const libraries: Work[] = [
  {
    slug: "autoform",
    kind: "library",
    name: "AutoForm",
    url: "https://autoform.vantezzen.io",
    host: "autoform.vantezzen.io",
    tagline: "Turn Zod, Yup or Joi schemas into complete React forms",
    summary:
      "An open source library that renders validated React forms from the schemas you already have, for React Hook Form or TanStack Form and any UI library.",
    icon: autoformIcon,
    image: autoformImage,
    imageAlt: "AutoForm documentation with a live schema-to-form demo",
    card: { style: "screenshot", image: autoformImage },
    tags: ["TypeScript", "React", "Zod", "React Hook Form", "TanStack Form", "Turborepo"],
    facts: [
      { label: "Monthly downloads", value: "150k+" },
      { label: "GitHub stars", value: "3.5k" },
      { label: "Since", value: "2023" },
      { label: "License", value: "MIT" },
    ],
    cta: "Read the docs",
    github: "https://github.com/vantezzen/autoform",
    npm: "@autoform/react",
  },
  {
    slug: "libconsent",
    kind: "library",
    name: "libconsent",
    url: "https://vantezzen.github.io/libconsent/",
    host: "vantezzen.github.io/libconsent",
    tagline: "Handle cookie consent the React way, with any consent banner",
    summary:
      "One React API for cookie consent. Ask whether marketing cookies are allowed and libconsent answers for Usercentrics, Cookiebot, OneTrust, IAB TCF and eight other platforms.",
    icon: libconsentIcon,
    image: libconsentImage,
    imageAlt: "libconsent documentation with a consent banner demo",
    card: { style: "screenshot", image: libconsentImage },
    tags: ["TypeScript", "React", "IAB TCF", "Consent Mode v2", "shadcn/ui"],
    facts: [
      { label: "Adapters", value: "11" },
      { label: "Since", value: "August 2026" },
      { label: "License", value: "MIT" },
    ],
    cta: "Read the docs",
    github: "https://github.com/vantezzen/libconsent",
    npm: "@libconsent/core",
  },
  {
    slug: "langfuse-eve",
    kind: "library",
    name: "langfuse-eve",
    url: "https://vantezzen.github.io/langfuse-eve/docs/",
    host: "vantezzen.github.io/langfuse-eve",
    tagline: "Eve agent tracing, Langfuse prompts, subagents and skills",
    summary:
      "Connects Vercel’s Eve agent framework to Langfuse: instructions and skills load from Langfuse prompts, and every model call is traced with the prompt version that produced it.",
    icon: langfuseEveIcon,
    image: langfuseEveImage,
    imageAlt: "langfuse-eve documentation",
    card: { style: "screenshot", image: langfuseEveImage },
    tags: ["TypeScript", "Eve", "Langfuse", "OpenTelemetry", "AI agents"],
    facts: [
      { label: "Since", value: "September 2026" },
      { label: "License", value: "MIT" },
    ],
    cta: "Read the docs",
    github: "https://github.com/vantezzen/langfuse-eve",
    npm: "@vantezzen/langfuse-eve",
  },
  {
    slug: "launchroom",
    kind: "library",
    name: "launchroom",
    url: "https://launchroom.vantezzen.io",
    host: "launchroom.vantezzen.io",
    tagline: "A self-hosted deployment dashboard for your apps",
    summary:
      "Deploy apps and databases to your own servers with previews, rollbacks and zero-downtime releases. Free, open source and installed with one command.",
    icon: launchroomIcon,
    image: launchroomImage,
    imageAlt: "launchroom dashboard showing a project canvas",
    card: { style: "screenshot", image: launchroomImage },
    tags: ["Laravel", "React", "Go", "Docker", "Caddy", "WireGuard"],
    facts: [
      { label: "Status", value: "Release candidate" },
      { label: "Since", value: "October 2026" },
      { label: "License", value: "MIT" },
    ],
    cta: "Visit launchroom",
    github: "https://github.com/vantezzen/launchroom",
  },
];

export const works = [...projects, ...libraries];

export const featured = projects[0];

export const featuredHighlights = [
  { label: "Peak month", value: "10.1M visitors" },
  { label: "Since 2023", value: "30M+ visitors" },
];

export function getWork(slug: string) {
  return works.find((work) => work.slug === slug);
}

/** The work after `slug` in its own list, wrapping around at the end. */
export function getNext(slug: string) {
  const list = projects.some((work) => work.slug === slug) ? projects : libraries;
  const index = list.findIndex((work) => work.slug === slug);
  return list[(index + 1) % list.length];
}
