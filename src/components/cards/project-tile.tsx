import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PhoneFrame } from "@/components/project/phone-frame";
import type { Work } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * A project in the style of the portfolio's cards: the product on a quiet
 * grey stage, title and one line below. The stage and title open the
 * project; the writeup link sits above the stretched link, so both stay
 * clickable without nesting anchors.
 */
export function ProjectTile({
  work,
  className,
}: {
  work: Work;
  className?: string;
}) {
  return (
    <article className={cn("group relative flex flex-col", className)}>
      <div className="relative aspect-9/11 overflow-hidden rounded-4xl bg-neutral-100 transition-colors duration-250 group-hover:bg-neutral-200/60">
        <div className="size-full transition-transform duration-250 ease-out group-hover:scale-[1.03] motion-reduce:transition-none">
          <CardArt work={work} />
        </div>
      </div>

      <div className="mt-3 flex flex-col">
        <h3 className="font-medium text-neutral-800">
          <a
            href={work.url}
            target="_blank"
            rel="noopener"
            className="outline-none after:absolute after:inset-0 after:rounded-4xl focus-visible:after:ring-2 focus-visible:after:ring-neutral-300"
          >
            {work.name}
          </a>
        </h3>
        <p className="font-medium text-neutral-400">{work.tagline}</p>
      </div>

      <div className="mt-2 flex items-center gap-4 text-sm">
        <span className="inline-flex items-center gap-0.5 text-neutral-400">
          {work.host}
          <ArrowUpRight className="size-3.5" aria-hidden />
        </span>
        <Link
          href={`/project/${work.slug}`}
          className="relative z-10 text-neutral-600 underline decoration-neutral-300 underline-offset-[3px] transition-colors hover:text-neutral-900 hover:decoration-neutral-800"
        >
          How it works
        </Link>
      </div>
    </article>
  );
}

function CardArt({ work }: { work: Work }) {
  const { card } = work;

  if (card.style === "phone") {
    return (
      <div className="absolute inset-0 flex justify-center">
        <PhoneFrame className="absolute bottom-0 w-[62%] translate-y-[30%]">
          <Image
            src={card.image}
            alt=""
            sizes="(min-width: 1024px) 220px, 50vw"
            className="size-full object-cover object-top"
          />
        </PhoneFrame>
      </div>
    );
  }

  return (
    <div className="flex size-full items-center justify-end">
      <Image
        src={card.image}
        alt=""
        sizes="(min-width: 1024px) 260px, 70vw"
        className="h-3/5 w-4/5 rounded-l-xl object-cover object-top-left shadow-sm"
      />
    </div>
  );
}
