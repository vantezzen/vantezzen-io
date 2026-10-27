"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/content/site";
import { cn } from "@/lib/utils";

/** Main menu. The section the current page belongs to is darker. */
export function SiteNav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className={className}>
      <ul className="flex items-center gap-5">
        {navigation.map(({ href, label }) => {
          const isActive =
            pathname === href ||
            pathname.startsWith(`${href}/`) ||
            (href === "/projects" &&
              (pathname.startsWith("/project/") ||
                pathname === "/libraries"));
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "text-sm whitespace-nowrap transition-colors duration-150",
                  isActive
                    ? "text-neutral-900"
                    : "text-neutral-500 hover:text-neutral-900",
                )}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
