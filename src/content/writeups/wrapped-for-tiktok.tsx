import Link from "next/link";
import { StoryPlayer } from "@/app/project/[slug]/_wrapped/story-player";
import { TrafficChart } from "@/app/project/[slug]/_wrapped/traffic-chart";
import { screens } from "@/app/project/[slug]/_wrapped/screens";

export function Showcase() {
  return <StoryPlayer screens={screens} className="max-w-5xl" />;
}

export function Body() {
  return (
    <>
      <h2>What it is</h2>
      <p>
        TikTok lets you download everything it knows about you, but the export
        is a large JSON file that few people ever open. Wrapped for TikTok
        turns it into the kind of story Spotify shows every December: how many
        videos you watched, how many hours you spent in the feed, your longest
        session, your busiest weekday, who you followed and what you searched
        for. It ends with a viewer type, such as “The Nocturnal Lurker”, and a
        summary card to share.
      </p>
      <p>
        The slides comment on your numbers, for example: “One push-up per video
        and you’d be shredded. You are the opposite.”
      </p>

      <h2>How it works</h2>
      <p>
        You request your data from TikTok’s privacy settings in JSON format,
        and TikTok emails a download link a few hours or days later. You drop
        the ZIP or JSON file onto the site. Everything after that happens in
        your browser:
      </p>
      <ol>
        <li>JSZip unpacks the archive and the JSON is parsed in memory</li>
        <li>
          A set of statistics classes computes watch time, sessions, likes,
          comments, shares, searches, follows and live views
        </li>
        <li>
          The results feed a story player with animated slides built in
          Framer Motion
        </li>
      </ol>
      <p>
        TikTok’s exports are inconsistent. Some files contain the same JSON
        twice in a row, which makes them invalid, so the parser detects this
        and reads the first half. TikTok also changed the export schema in
        2025, and the parser supports both versions. Schema validation errors
        are logged instead of shown, so an unexpected field never blocks a
        Wrapped.
      </p>
      <p>
        Watch time is not in the export. TikTok only records when each video
        started, so Wrapped measures the gap to the next video and treats long
        gaps as the end of a session.
      </p>
      <p>
        Because the export never leaves the device, the server only delivers
        static files. In December 2024 the site served about 10 million
        visitors for roughly $20 in infrastructure.
      </p>

      <h2>Why it exists</h2>
      <p>
        Wrapped launched in May 2023. Spotify Wrapped had
        shown that people like seeing their habits as a story, and TikTok
        already handed out the raw data in its export.
      </p>

      <h2>What happened</h2>
      <p>
        A few TikToks about Wrapped went viral, and the site has had one huge
        month every year since. The rest of the year it idles at a few tens of
        thousands of visitors. The chart shows unique visitors per month:
      </p>
      <TrafficChart />
      <p>
        The first December showed what a viral consumer site does to
        bandwidth limits. The heavy assets moved to Cloudflare in the middle of
        the spike, with a few minutes of downtime. December 2024 peaked at
        10.1 million visitors, and December 2025 brought another 5.4 million.
        In total more than 30 million people have visited.
      </p>
      <p>
        In September 2024 Wrapped added an optional data donation. After seeing their
        Wrapped, users can donate an anonymized copy of their export for
        research. The anonymization runs in the browser before anything is
        sent: comments, searches, locations and device IDs are removed. Almost
        17,000 people have donated so far, and the first results are published
        as <Link href="/research">State of the Feed</Link>.
      </p>
      <p>
        Since 2026 there is also a paid Deep Dive report with more than 40
        additional statistics and a comparison against the donated panel. It
        runs on a separate Python service with DuckDB, and uploaded files are
        deleted right after processing.
      </p>
    </>
  );
}
