import { site } from "@/content/site";
import { getPosts } from "@/lib/blog/posts";

function escape(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** RSS 2.0 feed of all public posts. */
export async function GET() {
  const posts = await getPosts();
  const items = posts
    .map((post) => {
      const url = `${site.url}/blog/${post.slug}`;
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>${
        post.description
          ? `\n      <description>${escape(post.description)}</description>`
          : ""
      }
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(`${site.name}: Writing`)}</title>
    <link>${site.url}/blog</link>
    <description>Articles from ${site.name} on web development and the projects behind it.</description>
    <language>en</language>
    <atom:link href="${site.url}/blog/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
