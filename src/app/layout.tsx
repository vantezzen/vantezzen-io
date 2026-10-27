import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.tagline,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: "./",
    types: { "application/rss+xml": "/blog/feed.xml" },
  },
  openGraph: { type: "website", siteName: site.name, locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

/** Tells search engines that vantezzen is an organization, and who runs it. */
const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/icon.png`,
  email: site.email,
  sameAs: [site.github],
  founder: { "@type": "Person", name: site.author, url: site.portfolio },
};

const ezoicScript = `
  window.ezstandalone = window.ezstandalone || {};
  ezstandalone.cmd = ezstandalone.cmd || [];`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased font-sans",
        dmSans.variable,
        geistMono.variable,
      )}
    >
      <head>
        {/*<Script
          data-cfasync="false"
          src="https://cmp.gatekeeperconsent.com/min.js"
        />
        <Script
          data-cfasync="false"
          src="https://the.gatekeeperconsent.com/cmp.min.js"
        />
        <Script async src="//www.ezojs.com/ezoic/sa.min.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: ezoicScript,
          }}
        />
        <Script src="//ezoicanalytics.com/analytics.js" />*/}
      </head>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
        <SiteHeader />
        {children}
        <SiteFooter />

        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${site.adsenseClient}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          src="https://scripts.simpleanalyticscdn.com/latest.js"
          data-skip-dnt="true"
          strategy="afterInteractive"
        />
        <script
          defer
          src="https://a.vantezzen.io/script.js"
          data-website-id="98fcfa82-c3e6-46c7-8802-dd1fbb786ab4"
        ></script>
      </body>
    </html>
  );
}
