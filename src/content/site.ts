import { Github } from "@thesvg/react";

export const site = {
  name: "vantezzen",
  /** The person behind vantezzen, for authorship metadata and the legal pages. */
  author: "Bennett Hollstein",
  handle: "@vantezzen",
  url: "https://vantezzen.io",
  title: "vantezzen: Free web apps, open source libraries and research",
  tagline:
    "vantezzen makes free web apps and open source libraries, and publishes research and writing from building them.",
  location: "Berlin, Germany",
  email: "hello@vantezzen.io",
  github: "https://github.com/vantezzen",
  portfolio: "https://hollstein.io",
  adsenseClient: "ca-pub-8508732166185621",
  socials: [
    { label: "GitHub", href: "https://github.com/vantezzen", icon: Github },
  ],
};

export const navigation = [
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/blog", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
