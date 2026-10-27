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
  const html = await highlight(code, language);

  return (
    <figure className="blog-code">
      <div dangerouslySetInnerHTML={{ __html: html }} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
