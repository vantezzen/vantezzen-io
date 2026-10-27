import { Constrained } from "@/components/layout/constrained";
import { Stagger, StaggerItem } from "@/components/motion";

/** Title block for top-level pages: an optional eyebrow, the title and a lead paragraph. */
export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex w-full justify-center">
      <Constrained className="gap-0">
        <Stagger className="flex flex-col gap-5">
          {eyebrow && (
            <StaggerItem>
              <p className="text-sm text-neutral-400">{eyebrow}</p>
            </StaggerItem>
          )}
          <StaggerItem>
            <h1 className="text-4xl font-medium tracking-tight text-neutral-800 text-balance sm:text-5xl">
              {title}
            </h1>
          </StaggerItem>
          {children && (
            <StaggerItem>
              <div className="flex max-w-xl flex-col gap-4 text-lg leading-relaxed text-neutral-500 text-pretty">
                {children}
              </div>
            </StaggerItem>
          )}
        </Stagger>
      </Constrained>
    </div>
  );
}

/** Vertical rhythm shared by all top-level pages. */
export function PageMain({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col items-center gap-20 pt-16 pb-28 sm:gap-24 sm:pt-24">
      {children}
    </main>
  );
}
