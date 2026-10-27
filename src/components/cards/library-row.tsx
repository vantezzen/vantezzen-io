import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Work } from "@/content/types";

/** A library as an entry, styled like the portfolio's work history. */
export function LibraryRow({ work }: { work: Work }) {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="flex flex-wrap items-center gap-x-1.5 font-medium text-neutral-800">
        <a
          href={work.url}
          target="_blank"
          rel="noopener"
          className="group inline-flex items-center gap-1.5"
        >
          <Image
            src={work.icon}
            alt=""
            sizes="16px"
            className="size-4 rounded-sm object-contain"
          />
          {work.name}
          <ArrowUpRight className="size-3.5 text-neutral-400 transition-colors group-hover:text-neutral-800" />
        </a>
        {work.npm && (
          <code className="font-mono text-xs font-normal text-neutral-400">
            {work.npm}
          </code>
        )}
      </h3>
      <p className="max-w-prose text-sm leading-relaxed text-neutral-500">
        {work.tagline}.{" "}
        <Link
          href={`/project/${work.slug}`}
          className="text-neutral-600 underline decoration-neutral-300 underline-offset-[3px] transition-colors hover:text-neutral-900 hover:decoration-neutral-800"
        >
          How it works
        </Link>
      </p>
    </div>
  );
}
