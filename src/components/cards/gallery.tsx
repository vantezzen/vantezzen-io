import { Reveal } from "@/components/motion";
import type { Work } from "@/content/types";
import { ProjectTile } from "./project-tile";

/** Horizontally scrolling row of project cards, edge to edge, as on the portfolio. */
export function Gallery({ works }: { works: Work[] }) {
  return (
    <div className="flex w-full snap-x gap-6 overflow-x-auto overflow-y-clip px-6 pb-2 scroll-px-6 sm:px-10 sm:scroll-px-10 md:gap-8 md:px-24 md:scroll-px-24 xl:justify-center-safe">
      {works.map((work, index) => (
        <Reveal
          key={work.slug}
          delay={index * 0.06}
          className="flex shrink-0 snap-start"
        >
          <ProjectTile work={work} className="w-72 sm:w-80" />
        </Reveal>
      ))}
    </div>
  );
}
