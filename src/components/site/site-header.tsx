"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/logo";
import { Constrained } from "@/components/layout/constrained";
import { SiteNav } from "./site-nav";

/** Slim top bar on every page: the vantezzen logo and the main menu. */
export function SiteHeader() {
  const pathname = usePathname();
  const isIndex = pathname === "/";
  return (
    <header className="flex w-full justify-center pt-6 sm:pt-10">
      <Constrained className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {!isIndex ? (
          <Link href="/" aria-label="vantezzen home" className="w-fit text-sm">
            <Logo />
          </Link>
        ) : (
          <div />
        )}
        <SiteNav className="-mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0" />
      </Constrained>
    </header>
  );
}
