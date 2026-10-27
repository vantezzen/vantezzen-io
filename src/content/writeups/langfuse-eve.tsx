export function Body() {
  return (
    <>
      <h2>What it is</h2>
      <p>
        langfuse-eve connects AI agents built with{" "}
        <a href="https://eve.dev" target="_blank" rel="noopener">
          Eve
        </a>{" "}
        to{" "}
        <a href="https://langfuse.com" target="_blank" rel="noopener">
          Langfuse
        </a>
        . Eve is Vercel’s open source framework for durable backend agents,
        where an agent is a folder of files for instructions, skills,
        subagents and instrumentation. Langfuse is an open source platform for
        LLM tracing and prompt management.
      </p>
      <p>
        The basic Langfuse setup only exports Eve’s traces. langfuse-eve makes
        Langfuse the place where the agent’s prompts live as well:
      </p>
      <ul>
        <li>Instructions are loaded from Langfuse prompts at runtime</li>
        <li>A folder of Langfuse prompts becomes a set of Eve skills</li>
        <li>
          Every model call is linked to the exact prompt version that produced
          it, including calls made by subagents
        </li>
        <li>Subagent traces are grouped under the root session</li>
        <li>Vercel AI Gateway generation IDs and costs are recorded</li>
      </ul>

      <h2>How it works</h2>
      <p>
        The package exposes three <code>define</code> functions that follow
        Eve’s file conventions. Each one goes into the matching folder of the
        agent:
      </p>
      <pre>
        <code>{`// agent/instrumentation/langfuse.ts
import { defineLangfuseInstrumentation } from "@vantezzen/langfuse-eve/instrumentation";
export default defineLangfuseInstrumentation();

// agent/instructions/identity.ts
import { defineLangfuseInstructions } from "@vantezzen/langfuse-eve/instructions";
export default defineLangfuseInstructions("agents/support", {
  fallback: "You are a concise support agent.",
  label: "production",
});

// agent/skills/company.ts
import { defineLangfuseSkills } from "@vantezzen/langfuse-eve/skills";
export default defineLangfuseSkills("skills/company", { tag: "skill" });`}</code>
      </pre>
      <p>
        Instructions are compiled with variables from Eve’s context before
        they reach the model. If Langfuse is unreachable, the agent uses the
        local fallback text, so a tracing outage never takes the agent down.
        Skills are read from a Langfuse prompt folder, and each prompt’s
        frontmatter provides the description Eve uses to decide when to load
        it.
      </p>
      <p>
        For tracing, the package builds on Eve’s OpenTelemetry pipeline and
        the official Langfuse span processor. It maps Eve’s spans to Langfuse
        observation types:
      </p>
      <ul>
        <li>Model calls become generations</li>
        <li>The root agent and each subagent become agent observations</li>
        <li>Tool and skill calls become tool observations</li>
        <li>Memory lookups become retriever observations</li>
      </ul>
      <p>
        The session ID is the root Eve session, so a conversation that fans out
        into several subagents shows up as one tree in Langfuse. The whole
        package is about a thousand lines of TypeScript with Bun tests and a
        demo agent that delegates to a researcher subagent.
      </p>

      <p>
        Prompts in Langfuse carry labels such as <code>production</code> or{" "}
        <code>latest</code>. Pointing a development environment at{" "}
        <code>latest</code> and production at <code>production</code> gives
        prompts their own release cycle: a change can be tested in a preview
        deployment and promoted without touching the agent’s code.
      </p>

      <h2>Why it exists</h2>
      <p>
        Teams building agents with Eve often keep their prompts in Langfuse,
        so prompts can change without a deploy. The official setup leaves you to
        write span processors, prompt loaders, context adapters and subagent
        propagation yourself. Without prompt-version attribution you cannot
        tell which prompt change caused a regression. langfuse-eve packages
        that integration layer so it is one dependency instead of a folder of
        glue code in every agent.
      </p>

      <h2>Where it is now</h2>
      <p>
        langfuse-eve 0.1.0 was published to npm in September 2026 as{" "}
        <code>@vantezzen/langfuse-eve</code>, with documentation on GitHub
        Pages. Eve itself is still evolving quickly, so the package tracks its
        releases and the API may change before 1.0.
      </p>
    </>
  );
}
