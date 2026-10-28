import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Coffee } from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { Constrained } from "@/components/layout/constrained";
import { PageMain } from "@/components/layout/page-header";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { ProjectSection } from "@/components/project/project-section";
import { SectionTitle } from "@/components/layout/section";
import { TextLink } from "@/components/text-link";
import { site } from "@/content/site";
import headImage from "@/assets/head.jpeg";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About",
  description:
    "vantezzen is an independent software label from Berlin. It has made free web apps and open source libraries since 2019.",
};

const NUMBERS = [
  { value: "30M+", label: "visitors to Wrapped for TikTok" },
  { value: "8,000", label: "people using the Skip Silence extension" },
  { value: "150k", label: "monthly npm downloads of AutoForm" },
  { value: "2019", label: "first project released" },
];

const TIMELINE: { year: string; items: React.ReactNode[] }[] = [
  {
    year: "2019",
    items: [
      <>
        <Project slug="skip-silence">Skip Silence</Project> launches as a
        Chrome extension that speeds through silence in videos.
      </>,
    ],
  },
  {
    year: "2023",
    items: [
      <>
        <Project slug="wrapped-for-tiktok">Wrapped for TikTok</Project> launches
        in May and reaches 1.9 million visitors in its first December.
      </>,
      <>
        <Project slug="autoform">AutoForm</Project> starts as a single
        shadcn/ui component in July.
      </>,
      <>
        <Project slug="wrapped-for-doordash">Wrapped for DoorDash</Project>{" "}
        follows in November.
      </>,
    ],
  },
  {
    year: "2024",
    items: [
      <>
        <Project slug="infinite-craft-solver">Infinite Craft Solver</Project>{" "}
        launches in February.
      </>,
      <>
        Wrapped adds an optional, anonymized data donation for research in
        September.
      </>,
      <>Wrapped reaches 10.1 million visitors in December.</>,
    ],
  },
  {
    year: "2026",
    items: [
      <>
        The first <Link href="/research">State of the Feed</Link> report is
        published in July, together with Skip Silence 6 and its web app.
      </>,
      <>
        <Project slug="koi-photo">koi.photo</Project> and{" "}
        <Project slug="launchroom">launchroom</Project> are released in
        October.
      </>,
    ],
  },
];

const PRESS = [
  {
    outlet: "Business Insider",
    title: "How Spotify Wrapped Taught People to Love Giving Away Their Data",
    href: "https://www.businessinsider.com/spotify-wrapped-data-sharing-game-tinder-duolingo-starbucks-2024-12",
  },
  {
    outlet: "Dexerto",
    title: "TikTok Wrapped 2024: How to get your TikTok Wrapped stats",
    href: "https://www.dexerto.com/entertainment/tiktok-wrapped-2023-how-to-get-your-tiktok-wrapped-stats-2152284/",
  },
  {
    outlet: "CHIP",
    title: "TikTok Wrapped: Jahresrückblick ansehen – so geht’s",
    href: "https://www.chip.de/ratgeber/wifi-dsl-internet/tiktok-wrapped-jahresrueckblick-ansehen-so-geht-s_de0a8ff5-7cd8-4934-8dc6-8290c0601a3b.html",
  },
  {
    outlet: "TikTok",
    title: "Wrapped for TikTok, shown by @faisterr",
    href: "https://www.tiktok.com/@faisterr/video/7448987528885079298",
  },
];

export default function AboutPage() {
  return (
    <PageMain>
      <div className="flex w-full justify-center">
        <Constrained className="gap-0">
          <Stagger className="flex flex-col gap-6">
            <StaggerItem>
              <LogoMark className="size-14" />
            </StaggerItem>
            <StaggerItem>
              <h1 className="text-4xl font-medium tracking-tight text-neutral-800 sm:text-5xl">
                About vantezzen
              </h1>
            </StaggerItem>
            <StaggerItem>
              <div className="flex max-w-xl flex-col gap-4 text-lg leading-relaxed text-neutral-500 text-pretty">
                <p>
                  vantezzen is an independent software label from Berlin. It
                  makes free web apps like Wrapped for TikTok, koi.photo and
                  Skip Silence, and maintains open source libraries like
                  AutoForm.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
                {NUMBERS.map(({ value, label }) => (
                  <div key={label} className="flex flex-col gap-1">
                    <dd className="text-3xl font-medium tracking-tight text-neutral-800">
                      {value}
                    </dd>
                    <dt className="text-sm leading-snug text-neutral-500">
                      {label}
                    </dt>
                  </div>
                ))}
              </dl>
            </StaggerItem>
          </Stagger>
        </Constrained>
      </div>

      <ProjectSection title="Timeline">
        <ol className="flex flex-col gap-8">
          {TIMELINE.map(({ year, items }) => (
            <li
              key={year}
              className="grid gap-2 sm:grid-cols-[5rem_1fr] sm:gap-6"
            >
              <span className="font-medium tabular-nums text-neutral-800">
                {year}
              </span>
              <ul className="flex flex-col gap-2 leading-relaxed text-neutral-600 [&_a]:text-neutral-800 [&_a]:underline [&_a]:decoration-neutral-300 [&_a]:underline-offset-[3px] hover:[&_a]:decoration-neutral-800">
                {items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </ProjectSection>

      <ProjectSection title="In the press">
        <ul className="flex flex-col divide-y divide-neutral-100 border-y border-neutral-100">
          {PRESS.map(({ outlet, title, href }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener"
                className="group flex items-start justify-between gap-6 py-4"
              >
                <span className="flex flex-col gap-0.5">
                  <span className="text-sm text-neutral-400">{outlet}</span>
                  <span className="font-medium text-neutral-800 decoration-neutral-300 underline-offset-4 group-hover:underline">
                    {title}
                  </span>
                </span>
                <ArrowUpRight
                  className="mt-1 size-4 shrink-0 text-neutral-300 transition-colors group-hover:text-neutral-700"
                  aria-hidden
                />
              </a>
            </li>
          ))}
        </ul>
      </ProjectSection>

      <ProjectSection title="Research">
        <p className="max-w-prose leading-relaxed text-neutral-600">
          People who use Wrapped for TikTok can donate an anonymized copy of
          their data for research. More than 17,000 have. Together with
          academic researchers, vantezzen is preparing a paper on the dataset.
          The first results are published as{" "}
          <TextLink href="/research">State of the Feed</TextLink>.
        </p>
      </ProjectSection>

      <ProjectSection title="Funding">
        <div className="flex flex-col gap-5">
          <p className="max-w-prose leading-relaxed text-neutral-600">
            The apps are free to use. They are funded through ads and by people
            who support the work directly. What each site collects is listed in
            the <TextLink href="/legal/privacy">privacy policy</TextLink>.
          </p>
          <a
            href="https://buymeacoffee.com/vantezzen"
            target="_blank"
            rel="noopener"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-neutral-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
          >
            <Coffee className="size-4" aria-hidden />
            Buy vantezzen a coffee
            <ArrowUpRight className="size-4 opacity-60" aria-hidden />
          </a>
        </div>
      </ProjectSection>

      <div className="flex w-full justify-center">
        <Constrained className="gap-0">
          <Reveal>
            <SectionTitle>Who’s behind it</SectionTitle>
            <p className="mb-5 max-w-prose leading-relaxed text-neutral-600">
              vantezzen is a registered sole proprietorship in Berlin, Germany,
              owned and run by {site.author}. Legal details are in the{" "}
              <TextLink href="/legal/impressum">Impressum</TextLink>.
            </p>
            <a
              href={site.portfolio}
              target="_blank"
              rel="noopener"
              className="group flex items-center justify-between gap-6 rounded-3xl bg-neutral-100 p-6 transition-colors hover:bg-neutral-200/70 sm:p-8"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={headImage}
                  alt={`Portrait of ${site.author}`}
                  className="size-12 rounded-full object-cover"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium text-neutral-800">
                    {site.author}
                  </span>
                  <span className="text-sm text-neutral-500">
                    Developer in Berlin. Work and background on hollstein.io
                  </span>
                </div>
              </div>
              <ArrowUpRight className="size-5 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </Constrained>
      </div>
    </PageMain>
  );
}

function Project({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  return <Link href={`/project/${slug}`}>{children}</Link>;
}
