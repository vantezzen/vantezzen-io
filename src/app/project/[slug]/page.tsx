import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Github } from "@thesvg/react";
import { Constrained } from "@/components/layout/constrained";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { TagList } from "@/components/project/tag-list";
import { TextLink } from "@/components/text-link";
import { site } from "@/content/site";
import { getNext, getWork, works } from "@/content/works";
import { writeups } from "@/content/writeups";

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/project/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return {};
  return {
    title: `${work.name}: ${work.tagline}`,
    description: work.summary,
    alternates: { canonical: `/project/${work.slug}` },
    openGraph: { type: "article", images: work.image ? [work.image.src] : [] },
  };
}

export default function ProjectPage({ params }: PageProps<"/project/[slug]">) {
  return (
    <main className="flex flex-col items-center gap-20 pt-16 pb-28 sm:gap-24 sm:pt-24">
      <Suspense fallback={<div className="min-h-screen" />}>
        <Writeup params={params} />
      </Suspense>
    </main>
  );
}

async function Writeup({
  params,
}: Pick<PageProps<"/project/[slug]">, "params">) {
  const { slug } = await params;
  const work = getWork(slug);
  const writeup = writeups[slug];
  if (!work || !writeup) notFound();

  const { Body, Showcase } = writeup;
  const next = getNext(work.slug);

  return (
    <>
      <div className="flex w-full justify-center">
        <Constrained className="gap-0">
          <Stagger className="flex flex-col gap-5">
            <StaggerItem>
              <h1 className="text-4xl font-medium tracking-tight text-neutral-800 sm:text-5xl">
                {work.name}
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="max-w-xl text-lg leading-relaxed text-neutral-500 text-pretty">
                {work.summary}
              </p>
            </StaggerItem>
            <StaggerItem>
              <dl className="mt-2 flex flex-wrap gap-x-10 gap-y-4 text-sm">
                {[
                  ...work.facts,
                  { label: "Try it", value: work.host, href: work.url },
                ].map(({ label, value, href }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <dt className="text-neutral-400">{label}</dt>
                    <dd className="font-medium text-neutral-700">
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener"
                          className="inline-flex items-center gap-0.5 hover:underline"
                        >
                          {value}
                          <ArrowUpRight className="size-3.5 text-neutral-400" />
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </StaggerItem>
          </Stagger>
        </Constrained>
      </div>

      {Showcase ? (
        <div className="flex w-full justify-center px-4 sm:px-6">
          <Reveal delay={0.25} className="flex w-full justify-center">
            <Showcase />
          </Reveal>
        </div>
      ) : (
        work.image && (
          <div className="flex w-full justify-center px-4 sm:px-6">
            <Reveal delay={0.25} className="w-full max-w-5xl">
              <Image
                src={work.image}
                alt={work.imageAlt ?? `Screenshot of ${work.name}`}
                sizes="(min-width: 1024px) 1024px, 100vw"
                preload
                className="w-full rounded-3xl border border-neutral-200/70 shadow-sm"
              />
            </Reveal>
          </div>
        )
      )}

      <div className="flex w-full justify-center">
        <Constrained className="gap-0">
          <article className="writeup-prose max-w-prose [&>h2:first-child]:mt-0">
            <Body />
          </article>
          <div className="mt-10">
            <TagList tags={work.tags} />
          </div>
        </Constrained>
      </div>

      <footer className="flex w-full justify-center pt-8">
        <Constrained className="gap-4">
          <div className="flex flex-col gap-5 rounded-3xl bg-neutral-100 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex flex-col gap-1">
              <span className="text-xl font-medium tracking-tight text-neutral-800">
                Try {work.name}
              </span>
              <span className="text-sm text-neutral-500">{work.tagline}</span>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {work.github && (
                <a
                  href={work.github}
                  target="_blank"
                  rel="noopener"
                  aria-label="Source code on GitHub"
                  className="rounded-full p-3 text-neutral-700 transition-colors hover:bg-neutral-200"
                >
                  <Github className="size-4" />
                </a>
              )}
              <a
                href={work.url}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
              >
                {work.cta}
                <ArrowUpRight className="size-4 opacity-60" aria-hidden />
              </a>
            </div>
          </div>

          <Link
            href={`/project/${next.slug}`}
            className="group flex items-center justify-between gap-6 rounded-3xl bg-neutral-100 p-6 transition-[background-color,transform] duration-150 ease-out hover:bg-neutral-200/70 active:scale-[0.99] sm:p-8"
          >
            <div className="flex flex-col gap-1">
              <span className="text-sm text-neutral-400">
                Next {next.kind === "library" ? "library" : "project"}
              </span>
              <span className="text-xl font-medium tracking-tight text-neutral-800">
                {next.name}
              </span>
              <span className="text-sm text-neutral-500">{next.tagline}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden size-16 items-center justify-center overflow-hidden rounded-2xl bg-white sm:flex">
                <Image
                  src={next.icon}
                  alt=""
                  sizes="40px"
                  className="size-9 rounded-lg object-contain"
                />
              </div>
              <ArrowRight className="size-5 text-neutral-400 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          <p className="mt-4 text-sm text-neutral-500">
            Questions about {work.name}? Write to{" "}
            <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink>.
          </p>
        </Constrained>
      </footer>
    </>
  );
}
