import Image from "next/image";
import { cn } from "@/lib/utils";
import logoImage from "@/assets/logo.png";

/** The vantezzen fox mark. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src={logoImage}
      alt=""
      sizes="64px"
      className={cn("size-6 shrink-0 rounded-full", className)}
    />
  );
}

/** Mark and wordmark together. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark />
      <span className="font-medium tracking-tight text-neutral-800">
        vantezzen
      </span>
    </span>
  );
}
