import type { Metadata } from "next";
import { ProjectTile } from "@/components/cards/project-tile";
import { Constrained } from "@/components/layout/constrained";
import { PageHeader, PageMain } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion";
import { TextLink } from "@/components/text-link";
import { libraries } from "@/content/works";
import { site } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/libraries" },
  title: "Open source libraries",
  description:
    "Open source libraries by vantezzen: AutoForm, libconsent, langfuse-eve and launchroom. MIT licensed and documented.",
};

export default function LibrariesPage() {
  return (
    <PageMain>
      <PageHeader title="Libraries">
        <p>
          Open source packages, mostly pulled out of our own projects. All MIT
          licensed.
        </p>
      </PageHeader>

      <div className="flex w-full justify-center">
        <Constrained className="gap-12">
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2">
            {libraries.map((work, index) => (
              <Reveal key={work.slug} delay={(index % 2) * 0.06}>
                <ProjectTile work={work} />
              </Reveal>
            ))}
          </div>
          <p className="text-sm leading-relaxed text-neutral-500">
            Bug reports and pull requests go to the repositories on{" "}
            <TextLink href={site.github} arrow>
              GitHub
            </TextLink>
            .
          </p>
        </Constrained>
      </div>
    </PageMain>
  );
}
