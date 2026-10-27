import type { MetadataRoute } from "next";
import { works } from "@/content/works";
import { getPosts } from "@/lib/blog/posts";
import { site } from "@/content/site";

const PAGES = [
  { path: "", priority: 1 },
  { path: "/projects", priority: 0.9 },
  { path: "/libraries", priority: 0.8 },
  { path: "/research", priority: 0.8 },
  { path: "/blog", priority: 0.8 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.5 },
  { path: "/browserprivacy", priority: 0.3 },
  { path: "/browserprivacy/skip-silence", priority: 0.2 },
  { path: "/browserprivacy/dontbugme", priority: 0.2 },
  { path: "/browserprivacy/bangs", priority: 0.2 },
  { path: "/legal/privacy", priority: 0.2 },
  { path: "/legal/impressum", priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  return [
    ...PAGES.map(({ path, priority }) => ({
      url: `${site.url}${path}`,
      priority,
    })),
    ...works.map((work) => ({
      url: `${site.url}/project/${work.slug}`,
      priority: work.kind === "project" ? 0.8 : 0.7,
    })),
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: post.updated,
      priority: 0.7,
    })),
  ];
}
