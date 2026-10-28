import type { Metadata } from "next";
import { EntryList } from "@/components/entry";
import { FeaturedProject } from "@/components/cards/featured-project";
import { LibraryRow } from "@/components/cards/library-row";
import { ProjectTile } from "@/components/cards/project-tile";
import { Constrained } from "@/components/layout/constrained";
import { PageHeader, PageMain } from "@/components/layout/page-header";
import { SectionTitle } from "@/components/layout/section";
import { Reveal } from "@/components/motion";
import {
  featured,
  featuredHighlights,
  libraries,
  projects,
} from "@/content/works";

export const metadata: Metadata = {
  alternates: { canonical: "/projects" },
  title: "Projects",
  description:
    "Free web apps by vantezzen: Wrapped for TikTok, the koi.photo editor, Infinite Craft Solver, Skip Silence and more.",
};

export default function ProjectsPage() {
  return (
    <PageMain>
      <PageHeader title="Projects">
        <p>
          Free web apps. Most of them run entirely in your browser, so your
          files never leave your device.
        </p>
      </PageHeader>

      <div className="flex w-full justify-center">
        <Constrained className="gap-20">
          <Reveal>
            <FeaturedProject work={featured} highlights={featuredHighlights} />
          </Reveal>

          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2">
            {projects
              .filter((work) => work.slug !== featured.slug)
              .map((work, index) => (
                <Reveal key={work.slug} delay={(index % 2) * 0.06}>
                  <ProjectTile work={work} />
                </Reveal>
              ))}
          </div>

          <Reveal>
            <SectionTitle>Libraries for developers</SectionTitle>
            <EntryList>
              {libraries.map((work) => (
                <LibraryRow key={work.slug} work={work} />
              ))}
            </EntryList>
          </Reveal>
        </Constrained>
      </div>
    </PageMain>
  );
}
