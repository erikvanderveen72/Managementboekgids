import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/85 backdrop-blur supports-[backdrop-filter]:bg-paper/70">
      <div className="container-wide flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-4 sm:py-5">
        <Link href="/" className="group flex items-center gap-2 no-underline">
          <span
            aria-hidden="true"
            className="inline-block h-2 w-2 rounded-full bg-accent transition group-hover:bg-ink"
          />
          <span className="font-serif text-base tracking-tight text-ink sm:text-xl">
            Managementboekgids
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-ink-soft sm:gap-6">
          <Link href="/boeken" className="no-underline hover:text-ink">
            Boeken
          </Link>
          <Link href="/categorieen" className="no-underline hover:text-ink">
            Categorieën
          </Link>
          <Link href="/over" className="no-underline hover:text-ink">
            Over
          </Link>
        </nav>
      </div>
    </header>
  );
}
