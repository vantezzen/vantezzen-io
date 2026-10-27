import { Fragment } from "react";
import { ArrowUpRight } from "lucide-react";
import type { BlockNode, Decoration } from "@/lib/blog/notion";
import { compactId, plainText, slugify } from "@/lib/blog/posts";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./code-block";

/** Lookups shared by every block of one post. */
type Context = {
  /** Notion page ID (no dashes) to blog slug. */
  links: Record<string, string>;
  /** Headings for the table of contents block. */
  headings: { id: string; text: string; level: 2 | 3 }[];
};

const LIST_TYPES = new Set(["bulleted_list", "numbered_list"]);
const HEADINGS: Record<string, 2 | 3> = {
  header: 2,
  sub_header: 2,
  sub_sub_header: 3,
  header_4: 3,
};
const MEDIA_TYPES = new Set(["image", "video", "audio", "file", "pdf"]);

/** Renders a post's block tree as plain, semantic HTML. */
export function NotionBlocks({
  blocks,
  links,
}: {
  blocks: BlockNode[];
  links: Record<string, string>;
}) {
  const context: Context = { links, headings: collectHeadings(blocks) };
  return <Blocks blocks={blocks} context={context} />;
}

function Blocks({ blocks, context }: { blocks: BlockNode[]; context: Context }) {
  return groupLists(blocks).map((group) => {
    if (Array.isArray(group)) {
      const List = group[0].type === "numbered_list" ? "ol" : "ul";
      return (
        <List key={group[0].id}>
          {group.map((item) => (
            <li key={item.id}>
              <RichText text={item.properties.title} context={context} />
              {item.children.length > 0 && (
                <Blocks blocks={item.children} context={context} />
              )}
            </li>
          ))}
        </List>
      );
    }
    return <Block key={group.id} block={group} context={context} />;
  });
}

function Block({ block, context }: { block: BlockNode; context: Context }) {
  const { properties, format } = block;
  const title = properties.title;
  const children =
    block.children.length > 0 ? (
      <Blocks blocks={block.children} context={context} />
    ) : null;

  const level = HEADINGS[block.type];
  if (level) {
    // The post title is the page's h1, so Notion's headings start at h2.
    const Tag = level === 2 ? "h2" : "h3";
    const heading = (
      <Tag id={slugify(plainText(title))} className="scroll-mt-8">
        <RichText text={title} context={context} />
      </Tag>
    );
    if (!format.toggleable) return heading;
    return (
      <details>
        <summary>{heading}</summary>
        {children}
      </details>
    );
  }

  if (MEDIA_TYPES.has(block.type)) {
    return <Media block={block} context={context} />;
  }

  switch (block.type) {
    case "text":
      if (!title?.length && !children) return null;
      return (
        <>
          <p>
            <RichText text={title} context={context} />
          </p>
          {children && <div className="pl-5">{children}</div>}
        </>
      );

    case "quote":
      return (
        <blockquote>
          <RichText text={title} context={context} />
          {children}
        </blockquote>
      );

    case "callout":
      return (
        <aside className="blog-callout">
          {typeof format.page_icon === "string" &&
            !format.page_icon.startsWith("http") && (
              <span aria-hidden>{format.page_icon}</span>
            )}
          <div>
            <RichText text={title} context={context} />
            {children}
          </div>
        </aside>
      );

    case "toggle":
      return (
        <details>
          <summary>
            <RichText text={title} context={context} />
          </summary>
          {children}
        </details>
      );

    case "to_do": {
      const checked = plainText(properties.checked) === "Yes";
      return (
        <div className="flex items-start gap-2.5">
          <input
            type="checkbox"
            checked={checked}
            readOnly
            disabled
            className="mt-1.5 accent-neutral-800"
          />
          <span className={cn(checked && "text-neutral-400 line-through")}>
            <RichText text={title} context={context} />
          </span>
        </div>
      );
    }

    case "code":
      return (
        <CodeBlock
          code={plainText(title)}
          language={plainText(properties.language).toLowerCase()}
          caption={
            properties.caption?.length ? (
              <RichText text={properties.caption} context={context} />
            ) : undefined
          }
        />
      );

    case "equation":
      return (
        <div className="blog-equation">
          <code>{plainText(title)}</code>
        </div>
      );

    case "divider":
      return <hr />;

    case "bookmark":
      return (
        <LinkCard
          url={plainText(properties.link)}
          label={plainText(title) || undefined}
        />
      );

    case "embed":
    case "tweet":
    case "codepen":
    case "figma":
    case "gist":
    case "maps": {
      const url =
        (format.display_source as string | undefined) ??
        plainText(properties.source);
      if (!url) return null;
      const embed = youtubeEmbed(url);
      return embed ? <VideoFrame src={embed} /> : <LinkCard url={url} />;
    }

    case "table": {
      const columns = (format.table_block_column_order as string[]) ?? [];
      return (
        <div className="blog-table">
          <table>
            <tbody>
              {block.children.map((row, rowIndex) => (
                <tr key={row.id}>
                  {columns.map((column, columnIndex) => {
                    const isHeader =
                      (format.table_block_column_header && rowIndex === 0) ||
                      (format.table_block_row_header && columnIndex === 0);
                    const Cell = isHeader ? "th" : "td";
                    return (
                      <Cell key={column}>
                        <RichText
                          text={row.properties[column]}
                          context={context}
                        />
                      </Cell>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    case "column_list":
      return (
        <div className="grid gap-6 sm:grid-flow-col sm:auto-cols-fr">
          {block.children.map((column) => (
            <div key={column.id} className="blog-column">
              <Blocks blocks={column.children} context={context} />
            </div>
          ))}
        </div>
      );

    case "table_of_contents":
      if (context.headings.length === 0) return null;
      return (
        <nav aria-label="Contents" className="blog-toc">
          <ul>
            {context.headings.map((heading) => (
              <li
                key={heading.id}
                className={cn(heading.level === 3 && "pl-4")}
              >
                <a href={`#${heading.id}`}>{heading.text}</a>
              </li>
            ))}
          </ul>
        </nav>
      );

    case "alias": {
      const target = (format.alias_pointer as { id?: string } | undefined)?.id;
      const slug = target && context.links[compactId(target)];
      return slug ? (
        <p>
          <a href={`/blog/${slug}`}>Read the related post</a>
        </p>
      ) : null;
    }

    case "transclusion_container":
    case "column":
      return children;

    default:
      // child pages, databases and block types without a web equivalent
      return null;
  }
}

function Media({ block, context }: { block: BlockNode; context: Context }) {
  const source =
    plainText(block.properties.source) ||
    (block.format.display_source as string | undefined) ||
    "";
  if (!source) return null;

  const external =
    /^https?:\/\//.test(source) && !source.includes("amazonaws.com");
  // Uploaded files only come with signed links that expire, so they are
  // served through our own route, which signs a fresh link on a cache miss.
  const src = external ? source : `/blog/media/${block.id}?v=${block.version}`;

  const caption = block.properties.caption?.length ? (
    <RichText text={block.properties.caption} context={context} />
  ) : null;
  const alt = plainText(block.properties.caption);

  if (block.type === "image") {
    return (
      <figure>
        {/* Sizes are unknown for Notion images, so next/image can't lay them out. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" decoding="async" />
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    );
  }

  if (block.type === "video") {
    const embed = external ? youtubeEmbed(source) : null;
    return (
      <figure>
        {embed ? (
          <VideoFrame src={embed} />
        ) : (
          <video src={src} controls playsInline preload="metadata" />
        )}
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    );
  }

  if (block.type === "audio") {
    return (
      <figure>
        <audio src={src} controls preload="metadata" className="w-full" />
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    );
  }

  return (
    <LinkCard
      url={src}
      label={plainText(block.properties.title) || alt || "Download file"}
    />
  );
}

function VideoFrame({ src }: { src: string }) {
  return (
    <div className="aspect-video overflow-hidden rounded-2xl bg-neutral-100">
      <iframe
        src={src}
        title="Embedded video"
        loading="lazy"
        allow="encrypted-media; picture-in-picture; fullscreen"
        className="size-full"
      />
    </div>
  );
}

function LinkCard({ url, label }: { url: string; label?: string }) {
  if (!url) return null;
  let host = url;
  try {
    host = new URL(url, "https://vantezzen.io").host;
  } catch {}
  return (
    <a href={url} target="_blank" rel="noopener" className="blog-link-card">
      <span className="flex min-w-0 flex-col">
        <span className="truncate font-medium text-neutral-800">
          {label ?? url.replace(/^https?:\/\//, "")}
        </span>
        <span className="text-sm text-neutral-400">{host}</span>
      </span>
      <ArrowUpRight className="size-4 shrink-0 text-neutral-400" aria-hidden />
    </a>
  );
}

/**
 * Notion's text runs. Mentions of other posts become blog links; mentions
 * the public API can't resolve (users, link previews) are left out.
 */
function RichText({
  text,
  context,
}: {
  text: Decoration[] | undefined;
  context: Context;
}) {
  return (text ?? []).map(([content, formats = []], index) => {
    let node: React.ReactNode = content;
    let href: string | null = null;

    for (const [type, value] of formats) {
      if (type === "p") {
        const slug = context.links[compactId(String(value))];
        if (!slug) return null;
        node = "the related post";
        href = `/blog/${slug}`;
      } else if (type === "d") {
        node = (value as { start_date?: string })?.start_date ?? "";
      } else if (type === "e") {
        node = <code>{String(value)}</code>;
      } else if (type === "lm") {
        const mention = value as { href?: string; title?: string };
        node = mention.title ?? mention.href ?? "";
        href = mention.href ?? null;
      } else if ((type === "eoi" || type === "u") && content === "‣") {
        return null;
      }
    }

    for (const [type, value] of formats) {
      if (type === "c") node = <code>{node}</code>;
      if (type === "b") node = <strong>{node}</strong>;
      if (type === "i") node = <em>{node}</em>;
      if (type === "s") node = <s>{node}</s>;
      if (type === "_") node = <u>{node}</u>;
      if (type === "h" && String(value).endsWith("_background")) {
        node = <mark>{node}</mark>;
      }
      if (type === "a") href = resolveHref(String(value), context);
    }

    if (href) {
      const external = /^https?:\/\//.test(href);
      node = (
        <a href={href} {...(external && { target: "_blank", rel: "noopener" })}>
          {node}
        </a>
      );
    }

    return <Fragment key={index}>{node}</Fragment>;
  });
}

/** Links to other Notion pages become blog links when that page is a post. */
function resolveHref(href: string, context: Context) {
  const pageId = href.match(/^\/([0-9a-f]{32})/)?.[1];
  if (!pageId) return href;
  const slug = context.links[pageId];
  return slug ? `/blog/${slug}` : null;
}

function youtubeEmbed(url: string) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/,
  );
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}` : null;
}

function collectHeadings(blocks: BlockNode[]): Context["headings"] {
  const headings: Context["headings"] = [];
  const visit = (nodes: BlockNode[]) => {
    for (const node of nodes) {
      const level = HEADINGS[node.type];
      if (level) {
        const text = plainText(node.properties.title);
        headings.push({ id: slugify(text), text, level });
      }
      if (node.type !== "toggle") visit(node.children);
    }
  };
  visit(blocks);
  return headings;
}

/** Consecutive list items of the same kind become one list. */
function groupLists(blocks: BlockNode[]) {
  const groups: (BlockNode | BlockNode[])[] = [];
  for (const block of blocks) {
    const last = groups.at(-1);
    if (
      LIST_TYPES.has(block.type) &&
      Array.isArray(last) &&
      last[0].type === block.type
    ) {
      last.push(block);
    } else {
      groups.push(LIST_TYPES.has(block.type) ? [block] : block);
    }
  }
  return groups;
}
