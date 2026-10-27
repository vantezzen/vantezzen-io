import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { Constrained } from "@/components/layout/constrained";
import { PageMain } from "@/components/layout/page-header";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionTitle } from "@/components/layout/section";
import { site } from "@/content/site";
import headImage from "@/assets/head.jpeg";

export const metadata: Metadata = {
  title: "About",
  description:
    "vantezzen is an independent software label from Berlin that makes free web apps and open source libraries.",
};

export default function AboutPage() {
  return (
    <PageMain>
      <div className="flex w-full justify-center">
        <Constrained className="gap-0">
          <Stagger className="flex flex-col gap-6">
            <StaggerItem>
              <LogoMark className="size-14" />
            </StaggerItem>
            <StaggerItem>
              <h1 className="text-4xl font-medium tracking-tight text-neutral-800 sm:text-5xl">
                About vantezzen
              </h1>
            </StaggerItem>
            <StaggerItem>
              <div className="flex max-w-xl flex-col gap-4 text-lg leading-relaxed text-neutral-500 text-pretty">
                <p>
                  vantezzen is an independent software label from Berlin. It
                  makes free web apps like Wrapped for TikTok, koi.photo and
                  Skip Silence, and maintains open source libraries like
                  AutoForm.
                </p>
              </div>
            </StaggerItem>
          </Stagger>
        </Constrained>
      </div>

      <div className="flex w-full justify-center">
        <Constrained className="gap-0">
          <Reveal>
            <SectionTitle>Who’s behind it</SectionTitle>
            <a
              href={site.portfolio}
              target="_blank"
              rel="noopener"
              className="group flex items-center justify-between gap-6 rounded-3xl bg-neutral-100 p-6 transition-colors hover:bg-neutral-200/70 sm:p-8"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={headImage}
                  alt={`Portrait of ${site.author}`}
                  className="size-12 rounded-full object-cover"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium text-neutral-800">
                    {site.author}
                  </span>
                  <span className="text-sm text-neutral-500">
                    Developer in Berlin. Work and background on hollstein.io
                  </span>
                </div>
              </div>
              <ArrowUpRight className="size-5 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </Constrained>
      </div>
    </PageMain>
  );
}
