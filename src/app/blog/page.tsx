import type { Metadata } from "next";
import { Constrained } from "@/components/layout/constrained";
import { PageHeader, PageMain } from "@/components/layout/page-header";
import { PostList } from "@/components/cards/post-list";
import { TextLink } from "@/components/text-link";
import { getPosts } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Articles from vantezzen on web development, browser APIs, reverse engineering and the projects behind it.",
  alternates: {
    types: { "application/rss+xml": "/blog/feed.xml" },
  },
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <PageMain>
      <PageHeader title="Writing">
        <p>
          Notes from building the projects, and from taking other things apart.
        </p>
      </PageHeader>

      <div className="flex w-full justify-center">
        <Constrained className="gap-10">
          {posts.length > 0 ? (
            <PostList posts={posts} />
          ) : (
            <p className="text-neutral-500">No posts yet.</p>
          )}
          <p className="text-sm text-neutral-500">
            Follow new posts with the{" "}
            <TextLink href="/blog/feed.xml">RSS feed</TextLink>.
          </p>
        </Constrained>
      </div>
    </PageMain>
  );
}
