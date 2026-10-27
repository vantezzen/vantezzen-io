import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { formatPostDate, getPosts } from "@/lib/blog/posts";

export const alt = "Blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.length > 0
    ? posts.map((post) => ({ slug: post.slug }))
    : [{ slug: "no-posts" }];
}

/** Social preview for a post: title and date on paper white. */
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = (await getPosts()).find((p) => p.slug === slug);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "96px 112px",
        background: "#ffffff",
        color: "#262626",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 28, color: "#737373", marginBottom: 32 }}>
        {post ? formatPostDate(post.date) : site.name}
      </div>
      <div
        style={{
          fontSize: 64,
          fontWeight: 500,
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          maxWidth: 980,
        }}
      >
        {post?.title ?? "Writing"}
      </div>
      <div style={{ fontSize: 28, color: "#737373", marginTop: 48 }}>
        {site.name}
      </div>
    </div>,
    size,
  );
}
