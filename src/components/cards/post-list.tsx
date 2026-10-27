import Link from "next/link";
import { formatPostDate, type Post } from "@/lib/blog/posts";

/** Posts as a quiet list: title, one line of description, date on the right. */
export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="flex flex-col gap-7">
      {posts.map((post) => (
        <li key={post.id}>
          <Link
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
          >
            <span className="flex flex-col gap-1">
              <span className="font-medium text-neutral-800 decoration-neutral-300 underline-offset-4 group-hover:underline">
                {post.title}
              </span>
              {post.description && (
                <span className="max-w-prose text-sm leading-relaxed text-neutral-500">
                  {post.description}
                </span>
              )}
            </span>
            <time
              dateTime={post.date}
              className="shrink-0 text-sm tabular-nums text-neutral-400 sm:order-last"
            >
              {formatPostDate(post.date)}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  );
}
