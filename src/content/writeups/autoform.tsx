export function Body() {
  return (
    <>
      <h2>What it is</h2>
      <p>
        AutoForm renders a complete React form from a validation schema you
        already have. You pass it a Zod, Yup or Joi schema and get labeled
        inputs, default values, field types and validation messages, styled
        with the UI library your project uses. It is meant for internal tools,
        admin panels and settings pages: places where the data shape is
        already defined on the backend and writing every input by hand adds
        nothing.
      </p>
      <pre>
        <code>{`import { z } from "zod";
import { ZodProvider } from "@autoform/zod";
import { AutoForm } from "@autoform/mui/react-hook-form";

const schema = new ZodProvider(
  z.object({
    name: z.string(),
    birthday: z.coerce.date(),
    email: z.string().email(),
  }),
);

<AutoForm schema={schema} onSubmit={console.log} withSubmit />;`}</code>
      </pre>
      <p>
        AutoForm does not try to be a full form builder. When a form needs a
        custom layout or complex conditional logic, you write that form
        yourself. For the many forms that only mirror a schema, AutoForm
        replaces a few hundred lines with one component.
      </p>

      <h2>How it works</h2>
      <p>
        The library is split into four layers, each published as its own
        package, so a project only installs the parts it needs:
      </p>
      <ul>
        <li>
          <strong>Schema provider</strong> (<code>@autoform/zod</code>,{" "}
          <code>yup</code>, <code>joi</code>): walks the schema and turns it
          into a plain tree of fields with a key, type, required flag, default
          value, description and options.
        </li>
        <li>
          <strong>Core</strong> (<code>@autoform/core</code>): label
          generation, defaults and validation. It contains no React and no UI
          code.
        </li>
        <li>
          <strong>Form adapter</strong> (<code>@autoform/react</code>): binds
          every field to React Hook Form or TanStack Form.
        </li>
        <li>
          <strong>UI package</strong>: maps field types to components of a
          design system. Packages exist for shadcn/ui, MUI, Mantine, Ant Design
          and Chakra.
        </li>
      </ul>
      <p>
        Adding a new UI library means implementing a handful of components
        such as a text input, a checkbox and a select. A custom adapter fits in
        about a hundred lines. Per-field options (label overrides, input
        props, field order, a different field type) are attached to the
        schema as metadata, so the schema stays the single source of truth.
      </p>
      <p>
        The monorepo is built with Turborepo, tested with Cypress component
        tests and released with Changesets.
      </p>

      <h2>Why it exists</h2>
      <p>
        Admin forms kept being wired up by hand for schemas that already
        existed on the backend. Every field meant a label, an input, an error
        message and a default value that had to stay in sync with the schema.
        In July 2023 AutoForm started as a single shadcn/ui component that read
        a Zod schema and produced the form. People copied it into their projects, and pull
        requests for textareas, nested objects, arrays and field dependencies
        followed within weeks.
      </p>

      <h2>What happened</h2>
      <p>
        The component outgrew its copy-and-paste origins. In October 2024 it
        was rewritten as a standalone library that is independent of both the
        schema library and the UI library, and released as AutoForm v2.
        Since then the project added Mantine, Ant Design and Chakra
        integrations, Joi support, Zod 4 support and, in July 2026, an adapter
        for TanStack Form alongside React Hook Form. The repository also ships
        a skill that teaches AI coding agents how to use the library.
      </p>
      <p>
        AutoForm has around 3,500 stars on GitHub, contributions from 29
        people, and about 150,000 npm downloads per month for{" "}
        <code>@autoform/react</code> alone. Over the twelve months to July
        2026 it was downloaded about a million times.
      </p>
    </>
  );
}
