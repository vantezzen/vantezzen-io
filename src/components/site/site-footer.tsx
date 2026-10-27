import Link from "next/link";
import { cacheLife } from "next/cache";
import { Constrained } from "@/components/layout/constrained";
import { SocialLinks } from "@/components/social-links";
import { site } from "@/content/site";
import { ConsentSettingsButton } from "./consent-settings-button";

const LINKS = [
  { href: "/libraries", label: "Libraries" },
  { href: "/browserprivacy", label: "Extension privacy" },
  { href: "/legal/impressum", label: "Impressum" },
  { href: "/legal/privacy", label: "Privacy" },
];

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

/** One line of small print, the same as on the portfolio. */
export function SiteFooter() {
  return (
    <footer className="mt-auto flex w-full justify-center pb-12">
      <Constrained className="gap-0">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 pt-6 text-sm text-neutral-400">
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <li>
              © <CurrentYear /> {site.name}
            </li>
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="transition-colors hover:text-neutral-700"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <ConsentSettingsButton />
            </li>
          </ul>
          <SocialLinks />
        </div>
      </Constrained>
    </footer>
  );
}
