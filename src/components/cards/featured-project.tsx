import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PhoneFrame } from "@/components/project/phone-frame";
import type { Work } from "@/content/types";
import screenA from "@/assets/projects/wrapped-tiktok/flow/2.png";
import screenB from "@/assets/projects/wrapped-tiktok/flow/5.png";
import screenC from "@/assets/projects/wrapped-tiktok/flow/15.png";

/**
 * The most visited project, a size up from the other cards: three phones on
 * the grey stage, and the key facts underneath like a project header.
 */
export function FeaturedProject({
  work,
  highlights,
}: {
  work: Work;
  highlights: { value: string; label: string }[];
}) {
  return (
    <article className="group relative flex flex-col">
      <a
        href={work.url}
        target="_blank"
        rel="noopener"
        aria-label={`Open ${work.name}`}
        className="relative block h-80 overflow-hidden rounded-4xl bg-neutral-100 transition-colors duration-250 outline-none group-hover:bg-neutral-200/60 focus-visible:ring-2 focus-visible:ring-neutral-300 sm:h-[420px]"
      >
        <div
          aria-hidden
          className="absolute inset-0 transition-transform duration-250 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
        >
          <Phone image={screenB} className="left-[6%] w-[30%] translate-y-[38%] sm:left-[14%] sm:w-[22%]" />
          <Phone image={screenA} className="left-[35%] w-[30%] translate-y-[22%] sm:left-[39%] sm:w-[22%]" />
          <Phone image={screenC} className="left-[64%] w-[30%] translate-y-[38%] sm:w-[22%]" />
        </div>
      </a>

      <div className="mt-3 flex flex-col">
        <h3 className="font-medium text-neutral-800">{work.name}</h3>
        <p className="max-w-xl font-medium text-neutral-400">{work.summary}</p>
      </div>

      <dl className="mt-5 flex flex-wrap gap-x-10 gap-y-4 text-sm">
        {highlights.map(({ value, label }) => (
          <div key={label} className="flex flex-col gap-0.5">
            <dt className="text-neutral-400">{label}</dt>
            <dd className="font-medium text-neutral-700">{value}</dd>
          </div>
        ))}
        <div className="flex flex-col gap-0.5">
          <dt className="text-neutral-400">Try it</dt>
          <dd className="font-medium text-neutral-700">
            <a
              href={work.url}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-0.5 hover:underline"
            >
              {work.host}
              <ArrowUpRight className="size-3.5 text-neutral-400" />
            </a>
          </dd>
        </div>
        <div className="flex flex-col gap-0.5">
          <dt className="text-neutral-400">Writeup</dt>
          <dd className="font-medium text-neutral-700">
            <Link href={`/project/${work.slug}`} className="hover:underline">
              How it works
            </Link>
          </dd>
        </div>
      </dl>
    </article>
  );
}

function Phone({
  image,
  className,
}: {
  image: typeof screenA;
  className: string;
}) {
  return (
    <PhoneFrame className={`absolute bottom-0 max-w-[220px] ${className}`}>
      <Image
        src={image}
        alt=""
        sizes="220px"
        className="size-full object-contain object-top"
      />
    </PhoneFrame>
  );
}
