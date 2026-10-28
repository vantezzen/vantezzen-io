import { renderMermaidSVG } from "beautiful-mermaid";
import { bundledLanguages, codeToHtml, type BundledLanguage } from "shiki";

/** Notion's language names that differ from Shiki's. */
const ALIASES: Record<string, string> = {
  "plain text": "text",
  "c++": "cpp",
  "c#": "csharp",
  "f#": "fsharp",
  shell: "bash",
  "objective-c": "objc",
  "java/c/c++/c#": "java",
  markup: "html",
  webassembly: "wasm",
  "vb.net": "vb",
};

function toLanguage(notionLanguage: string): BundledLanguage | "text" {
  const name = ALIASES[notionLanguage] ?? notionLanguage;
  return name in bundledLanguages ? (name as BundledLanguage) : "text";
}

/** Shiki reads the clock internally, so highlighting runs inside a cache scope. */
async function highlight(code: string, language: string) {
  "use cache";
  return codeToHtml(code, {
    lang: toLanguage(language),
    theme: "github-dark-default",
  });
}

/**
 * Renders a Mermaid diagram to an SVG string in the site's neutral palette.
 * The renderer adds a Google Fonts import for its font; it is removed so no
 * request leaves the site, and the text uses the self-hosted DM Sans instead.
 * All colors are passed explicitly: the renderer falls back to CSS variables
 * named --muted, --accent and --border, which the site's theme also defines.
 * Returns null when the diagram can't be parsed.
 */
async function renderDiagram(code: string) {
  "use cache";
  try {
    return renderMermaidSVG(code, {
      bg: "#ffffff",
      fg: "#262626",
      line: "#a3a3a3",
      accent: "#525252",
      muted: "#737373",
      surface: "#ffffff",
      border: "#d4d4d4",
      transparent: true,
      padding: 24,
    })
      .replace(/@import url\([^)]*\);?/g, "")
      .replace(
        /text \{ font-family:[^}]*\}/,
        "text { font-family: var(--font-dm-sans), system-ui, sans-serif; }",
      );
  } catch {
    return null;
  }
}

/** A highlighted code block. Highlighting happens on the server; no JS ships. */
export async function CodeBlock({
  code,
  language,
  caption,
}: {
  code: string;
  language: string;
  caption?: React.ReactNode;
}) {
  if (language === "mermaid") {
    const svg = await renderDiagram(code);
    if (svg) {
      return (
        <figure className="blog-mermaid">
          <div dangerouslySetInnerHTML={{ __html: svg }} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    }
  }

  const html = await highlight(code, language);

  return (
    <figure className="blog-code">
      <div dangerouslySetInnerHTML={{ __html: html }} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
