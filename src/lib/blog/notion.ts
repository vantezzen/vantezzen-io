import { NotionAPI } from "notion-client";
import type { Block, Collection, ExtendedRecordMap } from "notion-types";
import { parsePageId } from "notion-utils";

/**
 * The public Notion page that holds the blog: a page with an inline database
 * of posts. It is read through Notion's public (unofficial) API, the same one
 * the old read.vantezzen.io used, so the page only needs to be published to
 * the web. No token is required.
 */
export const BLOG_PAGE_ID =
  process.env.NOTION_BLOG_PAGE_ID ?? "313e32040c2a81e89296ec90cdf38c24";

/** Names of the database properties the blog reads. */
export const PROPERTIES = {
  title: "Name",
  slug: "Slug",
  description: "Description",
  published: "Published",
  tags: "Tags",
  /** Optional checkbox. Posts without it are public. */
  public: "Public",
} as const;

/**
 * Notion's rich text: a list of text runs, each with optional formats such
 * as `["b"]` (bold) or `["a", url]` (link).
 */
export type Decoration = [string, ([string] | [string, unknown])[]?];

/** A block with its children resolved, so the tree renders without lookups. */
export type BlockNode = {
  id: string;
  type: string;
  properties: Record<string, Decoration[]>;
  format: Record<string, unknown>;
  /** Last edit time, used to bust caches of uploaded files. */
  version: number;
  children: BlockNode[];
};

/** A row of the posts database: its page block and the property values by name. */
export type PostRow = {
  id: string;
  createdTime: number;
  lastEditedTime: number;
  properties: Record<string, Decoration[] | undefined>;
};

const notion = new NotionAPI({
  // Point at a mock server for local testing.
  apiBaseUrl: process.env.NOTION_API_BASE_URL,
});

/** Record maps wrap values once or twice depending on the endpoint. */
function unwrap<T>(record: unknown): T | undefined {
  const value = (record as { value?: { value?: T } & T } | undefined)?.value;
  return (value?.value ?? value) as T | undefined;
}

function getBlock(recordMap: Pick<ExtendedRecordMap, "block">, id: string) {
  return unwrap<Block>(recordMap.block[id]);
}

/** All rows the database's first view shows, in that view's order. */
export async function fetchPostRows(): Promise<PostRow[]> {
  const recordMap = await notion.getPage(BLOG_PAGE_ID, { signFileUrls: false });

  const [collectionId, collectionRecord] =
    Object.entries(recordMap.collection)[0] ?? [];
  const collection = unwrap<Collection>(collectionRecord);
  if (!collectionId || !collection) {
    throw new Error(`No database found on Notion page ${BLOG_PAGE_ID}`);
  }

  const views = Object.values(recordMap.collection_query[collectionId] ?? {});
  const blockIds: string[] =
    (views[0] as { collection_group_results?: { blockIds?: string[] } })
      ?.collection_group_results?.blockIds ?? [];

  const names = Object.fromEntries(
    Object.entries(collection.schema).map(([id, { name }]) => [id, name]),
  );

  return blockIds.flatMap((id) => {
    const block = getBlock(recordMap, id);
    if (!block || block.type !== "page" || !block.alive) return [];
    const properties = Object.fromEntries(
      Object.entries(block.properties ?? {}).map(([key, value]) => [
        names[key] ?? key,
        value as Decoration[],
      ]),
    );
    return [
      {
        id: block.id,
        createdTime: block.created_time,
        lastEditedTime: block.last_edited_time,
        properties,
      },
    ];
  });
}

/** The content of a post as a tree of blocks. */
export async function fetchBlockTree(pageId: string): Promise<BlockNode[]> {
  const recordMap = await notion.getPage(pageId, {
    fetchCollections: false,
    signFileUrls: false,
  });

  const build = (ids: string[] | undefined): BlockNode[] =>
    (ids ?? []).flatMap((id) => {
      const block = getBlock(recordMap, id);
      if (!block || !block.alive) return [];
      // Child pages and databases are separate documents.
      const descend = block.type !== "page" && block.type !== "collection_view";
      return [
        {
          id: block.id,
          type: block.type,
          properties: (block.properties ?? {}) as BlockNode["properties"],
          format: (block.format ?? {}) as BlockNode["format"],
          version: block.last_edited_time,
          children: descend ? build(block.content) : [],
        },
      ];
    });

  return build(getBlock(recordMap, pageId)?.content);
}

/**
 * A freshly signed URL for a file uploaded to a block, or null if the block
 * has no file or belongs to another workspace than the blog.
 */
export async function fetchMediaUrl(blockId: string) {
  const rootId = parsePageId(BLOG_PAGE_ID, { uuid: true });
  const id = parsePageId(blockId, { uuid: true });
  if (!rootId || !id) return null;

  const { recordMap } = await notion.getBlocks([rootId, id]);
  const root = getBlock(recordMap, rootId);
  const block = getBlock(recordMap, id);
  if (!root || !block || block.space_id !== root.space_id) return null;

  const source = (block.properties as { source?: string[][] } | undefined)
    ?.source?.[0]?.[0];
  if (!source) return null;
  if (/^https?:\/\//.test(source) && !source.includes("amazonaws.com")) {
    return source;
  }

  const { signedUrls } = await notion.getSignedFileUrls([
    { permissionRecord: { table: "block", id: block.id }, url: source },
  ]);
  return signedUrls[0] ?? null;
}
