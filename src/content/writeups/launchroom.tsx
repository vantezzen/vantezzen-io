export function Body() {
  return (
    <>
      <h2>What it is</h2>
      <p>
        launchroom is a self-hosted deployment platform. It gives your own
        server the workflow of a managed host like Vercel or Railway: pick a
        repository, a domain and a database, and launchroom builds the app,
        gets the TLS certificate, passes it the database credentials and
        deploys every push without downtime. It is free and MIT licensed, with
        every feature included and no account required.
      </p>
      <pre>
        <code>{`curl -fsSL https://launchroom.vantezzen.io/install | sh -s -- --domain dash.example.com`}</code>
      </pre>
      <p>Features include:</p>
      <ul>
        <li>
          Builds without a Dockerfile for Next.js, Laravel, Django, FastAPI,
          Node and static sites
        </li>
        <li>
          Managed Postgres, MySQL, Valkey, MongoDB and ClickHouse, with backups
          to your own S3 bucket
        </li>
        <li>A preview deployment with its own database for every pull request</li>
        <li>Health-checked rollouts and instant rollback</li>
        <li>
          More servers joined with one command over a private WireGuard mesh,
          including a home machine that builds images for a small VPS
        </li>
      </ul>

      <h2>How it works</h2>
      <p>
        launchroom has two parts. The control plane is the dashboard: a
        Laravel 13 and React 19 app on FrankenPHP, with Postgres as the source
        of truth, queue workers for the deployment state machine, websockets
        for live updates and a private container registry.
      </p>
      <p>
        Every server runs <code>launchroomd</code>, a small Go daemon. The
        dashboard never logs into servers over SSH. Instead, a deploy freezes
        the staged changes into an immutable revision, a scheduler decides
        which server runs what, and each server receives a signed, versioned
        description of its desired state. The daemon pulls that state over
        mutually authenticated HTTPS and reconciles Docker, the Caddy reverse
        proxy and the firewall until reality matches it. Builds run in
        rootless BuildKit with Railpack.
      </p>
      <p>
        This design means apps keep running when the dashboard is down, and it
        avoids building shell commands from strings, which is the source of
        many security bugs in comparable tools.
      </p>

      <h2>Why it exists</h2>
      <p>
        Most vantezzen projects run on their own servers. Existing
        self-hosting dashboards felt like a cheaper step down from managed platforms: the
        deploy experience was worse, and rollbacks or previews were missing or
        fragile. launchroom’s guiding principle is that it should be the best
        place to deploy, which happens to run on your own hardware.
      </p>
      <p>
        Before any code was written, the source of Coolify and Dokploy was
        studied for what to avoid: SSH with shell strings, mounting the Docker
        socket in the dashboard, routing through container labels, rollbacks to{" "}
        <code>:latest</code>, and marking a deploy successful before it is
        healthy. The design documents run to more than 7,000 lines and a log
        of over sixty architecture decisions.
      </p>

      <h2>Where it is now</h2>
      <p>
        A first version in 2025 was a simpler Laravel tool for Next.js and
        Laravel apps. The current launchroom is a full rewrite, released as
        public release candidates in October 2026. Releases are signed with
        cosign and the installer verifies the signature before running.
        Expect rough edges until 1.0.
      </p>
    </>
  );
}
