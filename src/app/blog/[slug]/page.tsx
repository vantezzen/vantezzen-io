import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { NotionBlocks } from "@/components/blog/notion-blocks";
import { Constrained } from "@/components/layout/constrained";
import { Stagger, StaggerItem } from "@/components/motion";
import { TagList } from "@/components/project/tag-list";
import { TextLink } from "@/components/text-link";
import { site } from "@/content/site";
import {
  formatPostDate,
  getPost,
  getPosts,
  readingTime,
} from "@/lib/blog/posts";

export async function generateStaticParams() {
  const posts = await getPosts();
  // Cache Components needs at least one entry. If Notion returns no posts,
  // the placeholder renders the 404 page.
  return posts.length > 0
    ? posts.map((post) => ({ slug: post.slug }))
    : [{ slug: "no-posts" }];
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getPosts()).find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [site.author],
      tags: post.tags,
    },
  };
}

export default function PostPage({ params }: PageProps<"/blog/[slug]">) {
  return (
    <main className="flex flex-col items-center gap-14 pt-16 pb-28 sm:pt-24">
      <Suspense fallback={<div className="min-h-screen" />}>
        <Post params={params} />
      </Suspense>
    </main>
  );
}

async function Post({ params }: Pick<PageProps<"/blog/[slug]">, "params">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const posts = await getPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  const newer = posts[index - 1];
  const older = posts[index + 1];

  return (
    <>
      <div className="flex w-full justify-center">
        <Constrained className="gap-0">
          <Stagger className="flex flex-col gap-5">
            <StaggerItem>
              <p className="text-sm text-neutral-400">
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                {" · "}
                {readingTime(post.blocks)} min read
              </p>
            </StaggerItem>
            <StaggerItem>
              <h1 className="max-w-2xl text-4xl font-medium tracking-tight text-neutral-800 text-balance sm:text-5xl">
                {post.title}
              </h1>
            </StaggerItem>
            {post.description && (
              <StaggerItem>
                <p className="max-w-xl text-lg leading-relaxed text-neutral-500 text-pretty">
                  {post.description}
                </p>
              </StaggerItem>
            )}
            {post.tags.length > 0 && (
              <StaggerItem>
                <TagList tags={post.tags} />
              </StaggerItem>
            )}
          </Stagger>
        </Constrained>
      </div>

      <div className="flex w-full justify-center">
        <Constrained className="gap-0">
          <article className="writeup-prose max-w-prose [&>h2:first-child]:mt-0">
            <NotionBlocks blocks={post.blocks} links={post.links} />
          </article>
        </Constrained>
      </div>

      <footer className="flex w-full justify-center pt-10">
        <Constrained className="gap-4">
          {(newer || older) && (
            <div className="grid gap-4 sm:grid-cols-2">
              {older ? (
                <PostLink post={older} direction="older" />
              ) : (
                <span className="hidden sm:block" />
              )}
              {newer && <PostLink post={newer} direction="newer" />}
            </div>
          )}
          <p className="mt-4 text-sm text-neutral-500">
            Questions or corrections? Write to{" "}
            <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink>
            . More posts are in the{" "}
            <TextLink href="/blog">writing archive</TextLink>.
          </p>
        </Constrained>
      </footer>
    </>
  );
}

function PostLink({
  post,
  direction,
}: {
  post: { slug: string; title: string };
  direction: "older" | "newer";
}) {
  const Icon = direction === "older" ? ArrowLeft : ArrowRight;
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col gap-1 rounded-3xl bg-neutral-100 p-6 transition-colors hover:bg-neutral-200/70 sm:data-[direction=newer]:items-end sm:data-[direction=newer]:text-right"
      data-direction={direction}
    >
      <span className="inline-flex items-center gap-1.5 text-sm text-neutral-400">
        {direction === "older" && <Icon className="size-3.5" aria-hidden />}
        {direction === "older" ? "Previous post" : "Next post"}
        {direction === "newer" && <Icon className="size-3.5" aria-hidden />}
      </span>
      <span className="font-medium text-neutral-800">{post.title}</span>
    </Link>
  );
}
