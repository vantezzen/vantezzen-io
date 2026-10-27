import Link from "next/link";
import { LogoMark } from "@/components/brand/logo";
import { EntryList } from "@/components/entry";
import { FeaturedProject } from "@/components/cards/featured-project";
import { Gallery } from "@/components/cards/gallery";
import { LibraryRow } from "@/components/cards/library-row";
import { PostList } from "@/components/cards/post-list";
import { Constrained } from "@/components/layout/constrained";
import { Section, SectionTitle } from "@/components/layout/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { ResearchTeaser } from "@/components/research/research-teaser";
import { SocialLinks } from "@/components/social-links";
import { site } from "@/content/site";
import {
  featured,
  featuredHighlights,
  libraries,
  projects,
} from "@/content/works";
import { getPosts } from "@/lib/blog/posts";

export default async function Home() {
  const posts = (await getPosts()).slice(0, 4);

  return (
    <main className="flex flex-col items-center pt-[8vh] pb-32 md:pt-[10vh]">
      <Hero />

      <div className="mt-14 flex w-full flex-col gap-28 md:mt-20 md:gap-36">
        <Section id="featured">
          <Constrained className="gap-0">
            <Reveal>
              <SectionTitle>Most popular</SectionTitle>
              <FeaturedProject
                work={featured}
                highlights={featuredHighlights}
              />
            </Reveal>
          </Constrained>
        </Section>

        <Section id="projects" className="flex-col items-center">
          <Constrained className="gap-0">
            <Reveal>
              <TitleRow
                title="More projects"
                href="/projects"
                label="All projects"
              />
            </Reveal>
          </Constrained>
          <Gallery
            works={projects.filter((work) => work.slug !== featured.slug)}
          />
        </Section>

        <Section id="research">
          <Constrained className="gap-0">
            <Reveal>
              <SectionTitle>Research</SectionTitle>
              <ResearchTeaser />
            </Reveal>
          </Constrained>
        </Section>

        <Section id="libraries">
          <Constrained className="gap-0">
            <Reveal>
              <TitleRow
                title="Libraries"
                href="/libraries"
                label="All libraries"
              />
              <EntryList>
                {libraries.map((work) => (
                  <LibraryRow key={work.slug} work={work} />
                ))}
              </EntryList>
            </Reveal>
          </Constrained>
        </Section>

        {posts.length > 0 && (
          <Section id="writing">
            <Constrained className="gap-0">
              <Reveal>
                <TitleRow title="Writing" href="/blog" label="All posts" />
                <PostList posts={posts} />
              </Reveal>
            </Constrained>
          </Section>
        )}

        <Section id="contact">
          <Constrained className="gap-0">
            <Reveal>
              <SectionTitle>Get in touch</SectionTitle>
              <p className="max-w-md leading-relaxed text-neutral-500">
                Questions, bug reports and ideas go to
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-4 inline-block w-fit text-lg font-medium text-neutral-800 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-800"
              >
                {site.email}
              </a>
            </Reveal>
          </Constrained>
        </Section>
      </div>
    </main>
  );
}

function Hero() {
  return (
    <Section id="home">
      <Constrained className="gap-0">
        <Stagger className="flex flex-col">
          <StaggerItem>
            <div className="flex items-center gap-3">
              <LogoMark className="size-9" />
              <div className="grid">
                <span className="text-[15px] font-medium text-neutral-800">
                  {site.name}
                </span>
                <span className="text-[12px] text-neutral-500">
                  Independent software from {site.location.split(",")[0]}
                </span>
              </div>
            </div>
          </StaggerItem>
        </Stagger>
      </Constrained>
    </Section>
  );
}

function TitleRow({
  title,
  href,
  label,
}: {
  title: string;
  href: string;
  label: string;
}) {
  return (
    <div className="mb-5 flex items-baseline justify-between gap-4">
      <h2 className="text-xl font-medium tracking-tight text-neutral-800">
        {title}
      </h2>
      <Link
        href={href}
        className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
      >
        {label}
      </Link>
    </div>
  );
}
