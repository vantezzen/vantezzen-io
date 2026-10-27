export function Body() {
  return (
    <>
      <h2>What it is</h2>
      <p>
        libconsent gives React apps one API for cookie consent, whichever
        consent banner runs on the page. Components ask a single question,
        such as whether marketing cookies are allowed, and libconsent
        translates it to the consent platform you use.
      </p>
      <pre>
        <code>{`import { ConsentProvider, CookieService } from "@libconsent/core";
import { usercentrics } from "@libconsent/usercentrics";

<ConsentProvider adapter={usercentrics({ settingsId: "AbCdEf123" })}>
  <CookieService id="google-analytics">
    <GoogleAnalytics gaId="G-XXXXXXX" />
  </CookieService>
</ConsentProvider>;

// Anywhere below the provider:
const ads = useHasConsent("marketing");`}</code>
      </pre>
      <p>
        The consent platform is named in exactly one place, the adapter passed
        to <code>ConsentProvider</code>. Switching from Cookiebot to OneTrust
        is a one-line change.
      </p>

      <h2>How it works</h2>
      <p>
        Every consent management platform (CMP) exposes consent differently.
        With OneTrust you poll <code>window.OnetrustActiveGroups</code> for a
        group ID like <code>C0004</code> and hook into{" "}
        <code>OptanonWrapper</code>. Cookiebot needs four window events and{" "}
        <code>window.Cookiebot.consent.marketing</code>. libconsent wraps each
        of these in an adapter of 100 to 200 lines that maps the platform’s
        state to four categories: essential, functional, analytics and
        marketing.
      </p>
      <p>Adapters exist for:</p>
      <ul>
        <li>Usercentrics, Cookiebot, OneTrust, Didomi and iubenda</li>
        <li>Osano, TrustArc, consentmanager.net and Klaro</li>
        <li>
          The IAB TCF v2.2 standard, which covers Google’s CMP, Sourcepoint,
          Quantcast Choice and others
        </li>
        <li>
          The IAB GPP standard for US state privacy signals, including Global
          Privacy Control
        </li>
      </ul>
      <p>
        Projects without a consent platform can use the built-in local mode,
        which stores the choice in the browser. A ready-made consent banner
        installs as a shadcn/ui registry item with one command. libconsent
        also writes Google Consent Mode v2 signals from the same state, unless
        the CMP already does.
      </p>
      <p>
        A built-in catalog describes common services such as Google Analytics
        with their category and the name each consent platform uses for them.
        Wrapping a script in <code>CookieService</code> renders it only after
        consent and registers it in the consent dialog, so the list of
        services shown to visitors stays in sync with the code.
      </p>
      <p>
        On the server nothing counts as consented, so the server render and
        the first client render always match and hydration stays stable. The
        choice can be stored in localStorage or in a cookie that middleware
        and server components can read. The core has no runtime dependencies
        and supports React 18 and 19.
      </p>

      <h2>Why it exists</h2>
      <p>
        Consent banners are built to satisfy a law, not to be pleasant to
        program against. Each one has its own globals, events and category
        names, and code that depends on them breaks when a company switches
        vendors. The same glue code to check whether a script may run kept
        coming back in every project. libconsent is that glue code
        as a library.
      </p>

      <h2>Where it is now</h2>
      <p>
        libconsent was published in August 2026 as version 0.1.0, with the
        core package and eleven adapters on npm under the{" "}
        <code>@libconsent</code> scope. It is built with Bun workspaces,
        Turborepo and Changesets, the same setup as AutoForm, and documented
        with a live demo on GitHub Pages. It is a young project: feedback from
        people running it against their own consent platform is the most
        useful contribution right now.
      </p>
    </>
  );
}
