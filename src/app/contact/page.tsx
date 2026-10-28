import type { Metadata } from "next";
import { Constrained } from "@/components/layout/constrained";
import { PageHeader, PageMain } from "@/components/layout/page-header";
import { SocialLinks } from "@/components/social-links";
import { TextLink } from "@/components/text-link";
import { site } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact",
  description: "How to reach vantezzen about its projects, libraries and research.",
};

export default function ContactPage() {
  return (
    <PageMain>
      <PageHeader title="Contact">
        <p>Questions, bug reports and ideas go to</p>
        <a
          href={`mailto:${site.email}`}
          className="w-fit text-xl font-medium text-neutral-800 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-800"
        >
          {site.email}
        </a>
      </PageHeader>

      <div className="flex w-full justify-center">
        <Constrained className="gap-12">
          <ul className="flex max-w-prose flex-col gap-3 text-[15px] leading-relaxed text-neutral-500">
            <li>
              For bugs in open source projects, an issue on{" "}
              <TextLink href={site.github} arrow>
                GitHub
              </TextLink>{" "}
              helps others with the same problem.
            </li>
            <li>
              Questions about the{" "}
              <TextLink href="/research">State of the Feed</TextLink> data:{" "}
              <TextLink href="mailto:research@vantezzen.io">
                research@vantezzen.io
              </TextLink>
            </li>
          </ul>

          <SocialLinks />
        </Constrained>
      </div>
    </PageMain>
  );
}
