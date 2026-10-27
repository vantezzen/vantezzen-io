import Link from "next/link";
import { ArrowRight } from "lucide-react";

const NUMBERS = [
  { value: "16,981", label: "data donations" },
  { value: "464M", label: "video views" },
  { value: "9 s", label: "median watch before a swipe" },
];

/** Dark card leading to the research page, in the style of the portfolio's tech cards. */
export function ResearchTeaser() {
  return (
    <Link
      href="/research"
      className="group flex flex-col gap-8 rounded-3xl bg-neutral-900 p-6 text-neutral-300 transition-colors hover:bg-neutral-800 sm:p-8"
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-medium text-white">State of the Feed</h3>
        <p className="max-w-prose text-sm leading-relaxed text-neutral-400">
          What 16,981 anonymized TikTok data donations from Wrapped users show
          about how people scroll.
        </p>
      </div>
      <dl className="grid gap-6 sm:grid-cols-3">
        {NUMBERS.map(({ value, label }) => (
          <div key={label} className="flex flex-col gap-1">
            <dd className="text-3xl font-medium tracking-tight text-white">
              {value}
            </dd>
            <dt className="text-sm text-neutral-400">{label}</dt>
          </div>
        ))}
      </dl>
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white">
        Read the findings
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
