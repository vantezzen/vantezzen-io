import { fetchMediaUrl } from "@/lib/blog/notion";

/**
 * Serves files uploaded to Notion. Notion's own links expire after an hour,
 * so this route asks the API for a fresh one and passes the bytes through.
 * The `v` query parameter (the block's last edit time) busts the year-long
 * CDN cache when the file changes.
 */
export async function GET(
  _request: Request,
  { params }: RouteContext<"/blog/media/[id]">,
) {
  const { id } = await params;
  if (!/^[0-9a-f-]{32,36}$/i.test(id)) {
    return new Response("Not found", { status: 404 });
  }

  const url = await fetchMediaUrl(id).catch(() => null);
  if (!url) return new Response("Not found", { status: 404 });

  const upstream = await fetch(url);
  if (!upstream.ok || !upstream.body) {
    return new Response("Upstream error", { status: 502 });
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type":
        upstream.headers.get("content-type") ?? "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
