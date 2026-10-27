import { cacheLife, cacheTag } from "next/cache";
import {
  fetchBlockTree,
  fetchPostRows,
  PROPERTIES,
  type BlockNode,
  type Decoration,
  type PostRow,
} from "./notion";

export type Post = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  /** ISO date (YYYY-MM-DD) the post was published. */
  date: string;
  /** ISO timestamp of the last edit in Notion. */
  updated: string;
  tags: string[];
};

export type PostWithContent = Post & {
  blocks: BlockNode[];
  /** Notion page ID (without dashes) to blog slug, for links between posts. */
  links: Record<string, string>;
};

/** Cache tag for everything that comes from Notion. */
export const BLOG_TAG = "blog";

/** The plain text of a property value. */
export function plainText(value: Decoration[] | undefined) {
  return (value ?? []).map(([text]) => text).join("");
}

/** The start date of a date property, as YYYY-MM-DD. */
function dateValue(value: Decoration[] | undefined) {
  for (const [, formats] of value ?? []) {
    for (const format of formats ?? []) {
      const date = format[1] as { start_date?: string } | undefined;
      if (format[0] === "d" && date?.start_date) return date.start_date;
    }
  }
  return undefined;
}

export function slugify(text: string) {
  return text
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/['\u2019]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function compactId(id: string) {
  return id.replaceAll("-", "");
}

function toPost(row: PostRow): Post | null {
  const props = row.properties;
  const title = plainText(props[PROPERTIES.title]).trim();
  if (!title) return null;
  if (plainText(props[PROPERTIES.public]) === "No") return null;

  return {
    id: row.id,
    slug: slugify(plainText(props[PROPERTIES.slug]) || title),
    title,
    description: plainText(props[PROPERTIES.description]).trim() || undefined,
    date:
      dateValue(props[PROPERTIES.published]) ??
      new Date(row.createdTime).toISOString().slice(0, 10),
    updated: new Date(row.lastEditedTime).toISOString(),
    tags: plainText(props[PROPERTIES.tags])
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
  };
}

/** All public posts, newest first. Cached for an hour and on the `blog` tag. */
export async function getPosts(): Promise<Post[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(BLOG_TAG);

  const rows = await fetchPostRows();
  return rows
    .map(toPost)
    .filter((post): post is Post => post !== null)
    .toSorted((a, b) => b.date.localeCompare(a.date));
}

/** One post with its full block tree, or null if no public post has this slug. */
export async function getPost(slug: string): Promise<PostWithContent | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(BLOG_TAG);

  const posts = await getPosts();
  const post = posts.find((candidate) => candidate.slug === slug);
  if (!post) return null;

  return {
    ...post,
    blocks: await fetchBlockTree(post.id),
    links: Object.fromEntries(posts.map((p) => [compactId(p.id), p.slug])),
  };
}

/** Rough reading time in minutes, from the text of the block tree. */
export function readingTime(blocks: BlockNode[]) {
  let words = 0;
  const visit = (nodes: BlockNode[]) => {
    for (const node of nodes) {
      if (node.type !== "code") {
        words += plainText(node.properties.title)
          .split(/\s+/)
          .filter(Boolean).length;
      }
      visit(node.children);
    }
  };
  visit(blocks);
  return Math.max(1, Math.round(words / 230));
}

export function formatPostDate(date: string) {
  return new Date(date).toLocaleDateString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
