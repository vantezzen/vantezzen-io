import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Constrained } from "@/components/layout/constrained";
import { PageHeader, PageMain } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion";
import { ProjectSection } from "@/components/project/project-section";
import { Stat, StatRow } from "@/components/project/stat";
import { TechCard } from "@/components/project/tech-card";
import { TextLink } from "@/components/text-link";
import reportImage from "@/assets/projects/wrapped-tiktok/state-of-the-feed.png";

const REPORT_URL = "https://wrapped.vantezzen.io/state-of-the-feed";

export const metadata: Metadata = {
  title: "Research: State of the Feed",
  description:
    "Findings from 16,981 anonymized TikTok data donations: how fast people swipe, when they scroll, how long sessions last and how personal every feed is.",
};

const CHANGES = [
  {
    title: "Less patience per video",
    detail: "Median watch time before a swipe",
    from: "10 s",
    to: "6 s",
  },
  {
    title: "Younger content",
    detail: "Median age of a video when watched",
    from: "9.4 days",
    to: "5.5 days",
  },
  {
    title: "More, longer sessions",
    detail: "Sessions per active day / median length",
    from: "3.9 · 19 min",
    to: "4.7 · 26 min",
  },
  {
    title: "Later nights",
    detail: "Median time of the day’s last scroll",
    from: "10 pm",
    to: "11 pm",
  },
  {
    title: "More days in the feed",
    detail: "Share of days with any scrolling",
    from: "84%",
    to: "90%",
  },
];

const SHARING = [
  { label: "TikTok direct messages", value: 90.1 },
  { label: "Copy link", value: 4.0 },
  { label: "WhatsApp", value: 2.5 },
  { label: "Messenger and SMS", value: 0.8 },
  { label: "Instagram", value: 0.4 },
  { label: "Other", value: 2.2 },
];

export default function ResearchPage() {
  return (
    <PageMain>
      <PageHeader title="State of the Feed">
        <p>
          At the end of Wrapped for TikTok, people can donate an anonymized copy
          of their TikTok data for research. 16,981 people did. These are the
          first results.
        </p>
      </PageHeader>

      <div className="flex w-full justify-center px-4 sm:px-6">
        <Reveal delay={0.2} className="w-full max-w-5xl">
          <a href={REPORT_URL} target="_blank" rel="noopener" className="block">
            <Image
              src={reportImage}
              alt="The State of the Feed report on wrapped.vantezzen.io"
              sizes="(min-width: 1024px) 1024px, 100vw"
              preload
              className="w-full rounded-3xl border border-neutral-200/70 shadow-sm"
            />
          </a>
        </Reveal>
      </div>

      <ProjectSection title="The panel">
        <TechCard>
          <StatRow>
            <Stat tone="dark" value="16,981" label="donors from 83 countries" />
            <Stat tone="dark" value="464M" label="video views" />
            <Stat tone="dark" value="335 years" label="of combined feed time" />
          </StatRow>
          <p className="max-w-prose text-sm leading-relaxed text-neutral-400">
            Donations came in two waves, in December 2024 and from March to
            July 2026. The largest groups are from Brazil, the United States
            and Singapore. The panel contains 568 million events and 132
            million distinct videos. The report was generated in July 2026.
          </p>
        </TechCard>
      </ProjectSection>

      <ProjectSection title="Two years, one direction">
        <p className="max-w-prose leading-relaxed text-neutral-600">
          Donors from 2026 swipe faster, watch newer videos and scroll more
          often and later at night than donors from 2024. The two waves are
          different people, so these are changes in the panel, not in
          individuals.
        </p>
        <div className="grid gap-3">
          {CHANGES.map((change) => (
            <div
              key={change.title}
              className="grid gap-2 rounded-2xl bg-neutral-100 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-center"
            >
              <div className="flex flex-col">
                <span className="font-medium text-neutral-800">
                  {change.title}
                </span>
                <span className="text-sm text-neutral-500">
                  {change.detail}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm tabular-nums">
                <span className="text-neutral-400">2024: {change.from}</span>
                <span className="text-neutral-300">→</span>
                <span className="font-medium text-neutral-800">
                  2026: {change.to}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ProjectSection>

      <ProjectSection title="Key findings">
        <div className="writeup-prose max-w-prose">
          <h3>A 9-second audition</h3>
          <p>
            The median video is watched for 9 seconds before a swipe. 26% are
            dismissed within 3 seconds, and only 12% hold attention for more
            than a minute. Half of all videos are gone by the 10-second mark.
          </p>

          <h3>The feed has no memory</h3>
          <p>
            Half of everything watched was less than 9 days old, and 19% was
            less than a day old. Only 5% of views went to videos older than a
            year. Hit videos collect most of their views within two weeks.
          </p>

          <h3>The world scrolls on one clock</h3>
          <p>
            Adjusted to each person’s local time, watching peaks at 8 pm and is
            lowest at 4 am. 11% of all watching happens between midnight and 6
            am, and 27% of people have their busiest hour between 10 pm and 4
            am.
          </p>

          <h3>“One more video”</h3>
          <p>
            The median session is 30 videos or 20 minutes. Sessions longer
            than an hour are only 20% of sessions, but they account for 60% of
            all watch time.
          </p>

          <h3>Most videos get no reaction</h3>
          <p>
            For every 1,000 videos watched there are 88 likes, 14 shares and 3
            comments. 91% of videos are watched without a like. Likes received
            are concentrated: the top 1% of panelists receive 75% of all likes.
          </p>

          <h3>A feed of one</h3>
          <p>
            71% of all distinct videos were seen by exactly one person in the
            panel, and together they make up 23% of all views. The single
            most-watched video reached 29% of panelists.
          </p>
        </div>
      </ProjectSection>

      <ProjectSection title="Sharing is private">
        <p className="max-w-prose leading-relaxed text-neutral-600">
          Of 7.5 million shares, nine in ten go to one person in a TikTok
          direct message. Only 0.8% are shared to a story.
        </p>
        <div className="flex flex-col gap-3">
          {SHARING.map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-700">{label}</span>
                <span className="tabular-nums text-neutral-500">{value}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
                <div
                  className="h-full rounded-full bg-neutral-800"
                  style={{ width: `${Math.max(value, 0.6)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </ProjectSection>

      <ProjectSection title="Method and privacy">
        <div className="writeup-prose max-w-prose">
          <ul>
            <li>
              <strong>Consent:</strong> donating is optional and happens after
              people have seen their Wrapped. Donors confirm they are over 18
              and receive a code to withdraw their data later.
            </li>
            <li>
              <strong>Anonymization in the browser:</strong> before anything is
              sent, comments, searches, locations, device IDs and profile
              details are removed. Only an allowlist of fields is kept.
            </li>
            <li>
              <strong>Anonymization on the server:</strong> usernames are
              replaced with keyed hashes that change with every dataset
              release, and countries with fewer than five donors are
              suppressed.
            </li>
            <li>
              <strong>Aggregates only:</strong> the report publishes no
              individual data. Monthly statistics require at least 50
              contributing panelists.
            </li>
            <li>
              <strong>Inferred watch time:</strong> TikTok exports record when
              a video started, not how long it played. Gaps of up to five
              minutes to the next video count as watch time.
            </li>
            <li>
              <strong>Not representative:</strong> the panel consists of people
              curious about their own screen time and skews toward Wrapped’s
              largest audiences.
            </li>
          </ul>
        </div>
      </ProjectSection>

      <ProjectSection title="What comes next">
        <div className="flex max-w-prose flex-col gap-4 leading-relaxed text-neutral-600">
          <p>
            A full paper describing the dataset is in preparation together with
            academic researchers. It will cover a newer release with more than
            17,000 donations and 580 million records, including viewing
            history going back to 2022. Unlike most TikTok datasets, which are
            scraped from public content, this one shows the viewer’s side of
            the platform.
          </p>
          <p>
            The dataset is available for non-commercial scientific research
            under a data usage agreement. Researchers can ask for access at{" "}
            <TextLink href="mailto:research@vantezzen.io">
              research@vantezzen.io
            </TextLink>
            . To add your own data, create your{" "}
            <Link
              href="/project/wrapped-for-tiktok"
              className="text-neutral-800 underline decoration-neutral-300 underline-offset-[3px] hover:decoration-neutral-800"
            >
              Wrapped for TikTok
            </Link>{" "}
            and choose to donate at the end.
          </p>
        </div>
      </ProjectSection>

      <div className="flex w-full justify-center">
        <Constrained className="gap-0">
          <a
            href={REPORT_URL}
            target="_blank"
            rel="noopener"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-neutral-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
          >
            Read the full interactive report
            <ArrowUpRight className="size-4 opacity-60" aria-hidden />
          </a>
        </Constrained>
      </div>
    </PageMain>
  );
}
