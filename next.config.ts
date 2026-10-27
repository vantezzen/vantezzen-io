import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    // The blog used to live on its own subdomain. Point read.vantezzen.io at
    // this deployment and every old URL lands on the same post here.
    const oldBlog = [{ type: "host" as const, value: "read.vantezzen.io" }];
    return [
      { source: "/writing", destination: "/blog", permanent: true },
      {
        source: "/blog/building-liquid-glass-on-the-web",
        destination: "/blog/liquid-glass",
        permanent: true,
      },
      {
        source: "/feed",
        has: oldBlog,
        destination: "https://vantezzen.io/blog/feed.xml",
        permanent: true,
      },
      {
        source: "/",
        has: oldBlog,
        destination: "https://vantezzen.io/blog",
        permanent: true,
      },
      {
        source: "/:slug",
        has: oldBlog,
        destination: "https://vantezzen.io/blog/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
