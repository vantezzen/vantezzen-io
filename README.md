# vantezzen.io

The website of vantezzen, an independent software label from Berlin: web apps, open source libraries, research and the blog. Live at [vantezzen.io](https://vantezzen.io). vantezzen is run by Bennett Hollstein, whose personal portfolio at [hollstein.io](https://hollstein.io) shares this site’s design.

## Stack

- Next.js 16 (App Router) with Cache Components and Partial Prefetching
- React 19 with the React Compiler
- Tailwind CSS 4
- Motion for entrance animations
- Notion (public page, read with `notion-client`) for blog posts, Shiki for code highlighting, beautiful-mermaid for diagrams
- Bun as package manager

## Getting started

```bash
bun install
bun run dev
```

No environment variables are required.

| Command         | What it does                 |
| --------------- | ---------------------------- |
| `bun run dev`   | Development server           |
| `bun run build` | Production build             |
| `bun run start` | Serve the production build   |
| `bun run lint`  | ESLint                       |

After editing `src/app/globals.css`, run `rm -rf .next` before the next build. The Turbopack cache does not always pick up CSS changes from the Tailwind loader.

## Pages

| Route                   | Content                                                    |
| ----------------------- | ---------------------------------------------------------- |
| `/`                     | Intro, featured project, project gallery, research, libraries, latest posts |
| `/projects`             | All projects and libraries                                 |
| `/libraries`            | Libraries only                                             |
| `/project/<slug>`       | Writeup for a project or library                           |
| `/research`             | State of the Feed findings                                 |
| `/blog`, `/blog/<slug>` | Blog posts from Notion                                     |
| `/blog/feed.xml`        | RSS feed                                                   |
| `/about`, `/contact`    | Short intro and contact                                    |
| `/legal/*`              | Impressum and privacy policy (German)                      |
| `/browserprivacy/*`     | Privacy policies of the browser extensions                 |
| `/get/*`                | Store redirects for the browser extensions                 |
| `/ads.txt`              | Ad network list, merged from Ezoic’s ads.txt manager and the AdSense line |

## Project structure

```
src/
  app/                 routes
  assets/              images (projects/<slug>/ for icons and screenshots)
  components/
    blog/              Notion block renderer and code highlighting
    cards/             project cards, gallery, featured card, post list
    layout/            Constrained column, sections, page headers
    project/           pieces shared with the portfolio (phone frame, tags, stats)
    site/              header, navigation, footer, consent settings link
  content/
    site.ts            name, URLs, email, navigation
    works.ts           all projects and libraries
    writeups/          one file per writeup
  lib/
    blog/              Notion client and post loading
```

## Editing content

### Projects and libraries

Each project or library is one entry in `src/content/works.ts`: name, URL, tagline, summary, icon, card image, facts and tags. The writeup is a component in `src/content/writeups/<slug>.tsx` that exports `Body` and, optionally, `Showcase` (replaces the screenshot under the header). Register new writeups in `src/content/writeups/index.ts`.

The first entry in `projects` is the featured project on the home page.

### Blog

Posts are written in Notion. The blog reads the published Notion page `313e32040c2a81e89296ec90cdf38c24` through Notion’s public API with `notion-client`, so no token is needed. The page must stay published to the web.

The posts database on that page needs these properties:

- `Name` (title): post title
- `Slug` (text): URL, `/blog/<slug>`. Falls back to the title
- `Description` (text): lead and RSS description
- `Published` (date): publish date and sort order
- `Tags` (multi-select)
- `Public` (checkbox): unchecked hides the post

The blog shows the rows of the database’s first view. Property names are set in `src/lib/blog/notion.ts`.

Code blocks with the language set to **Mermaid** render as diagrams, using [beautiful-mermaid](https://github.com/lukilabs/beautiful-mermaid) on the server. Flowcharts, state, sequence, class, ER and XY charts are supported; anything the renderer can’t parse shows as a code block.

Link previews (“mention” chips) can’t be read through the public API and are left out of the text; use plain links instead.

## Caching

- Pages are prerendered at build time.
- Blog data is cached for an hour under the `blog` tag. `POST /api/revalidate-blog?secret=…` invalidates it immediately.
- Files uploaded to Notion are served through `/blog/media/<block-id>` with a one-year cache, because Notion’s own links expire.

## Redirects

`next.config.ts` redirects:

- `/writing` to `/blog`
- every URL on `read.vantezzen.io` to the matching post under `/blog`, once that domain points at this project

## Ads, analytics and consent

The root layout loads Google AdSense, Simple Analytics and a self-hosted Umami script. Consent for ads is handled by Google’s consent management platform, configured in the AdSense dashboard under **Privacy & messaging**. The “Cookie settings” link in the footer reopens it. The privacy policy at `/legal/privacy` describes all of this; update it when adding services.

## Environment variables

See [.env.example](./.env.example).

| Variable                 | Purpose                                               |
| ------------------------ | ----------------------------------------------------- |
| `NOTION_BLOG_PAGE_ID`    | Optional, Notion page holding the posts database      |
| `BLOG_REVALIDATE_SECRET` | Optional, enables `/api/revalidate-blog`              |
| `NOTION_API_BASE_URL`    | Local testing only, sends Notion requests to a mock   |
