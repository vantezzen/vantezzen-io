/** Vertical list of entries, spaced like the portfolio's work history. */
export function EntryList({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-8">{children}</div>;
}
