import { revalidateTag } from "next/cache";
import { BLOG_TAG } from "@/lib/blog/posts";

/**
 * Refreshes the blog right away instead of waiting for the hourly cache.
 * Call it after publishing: `POST /api/revalidate-blog?secret=…`
 */
export async function POST(request: Request) {
  const secret = process.env.BLOG_REVALIDATE_SECRET;
  const given = new URL(request.url).searchParams.get("secret");
  if (!secret || given !== secret) {
    return new Response("Unauthorized", { status: 401 });
  }

  revalidateTag(BLOG_TAG, "max");
  return new Response("Blog refreshed", { status: 200 });
}
