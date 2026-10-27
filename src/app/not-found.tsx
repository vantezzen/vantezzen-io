import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Constrained } from "@/components/layout/constrained";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center pb-24">
      <Constrained className="gap-4 pt-[14vh]">
        <p className="text-sm text-neutral-400">404</p>
        <h1 className="text-3xl font-medium tracking-tight text-neutral-800 sm:text-4xl">
          This page doesn’t exist.
        </h1>
        <p className="max-w-md text-lg leading-relaxed text-neutral-500 text-balance">
          The address may be old, or the page has moved. All projects are
          listed on the start page.
        </p>
        <Link
          href="/"
          className="group mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-neutral-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          Back to the start
        </Link>
      </Constrained>
    </main>
  );
}
