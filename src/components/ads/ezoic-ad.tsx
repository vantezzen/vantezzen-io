"use client";

import { useEffect } from "react";
import { runEzoic } from "@/lib/ezoic";
import { cn } from "@/lib/utils";

/**
 * One Ezoic display ad. The placeholder div itself stays unstyled so an
 * unfilled slot collapses instead of leaving a gap.
 */
export function EzoicAd({ id, className }: { id: number; className?: string }) {
  useEffect(() => {
    runEzoic(() => window.ezstandalone?.showAds(id));
    return () => runEzoic(() => window.ezstandalone?.destroyPlaceholders(id));
  }, [id]);

  return (
    <div className={cn("w-full text-center", className)}>
      <div id={`ezoic-pub-ad-placeholder-${id}`} />
    </div>
  );
}
