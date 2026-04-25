import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-ink/10 bg-paper">
      <div className="container-wide flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-4 sm:py-5">
        <Link href="/" className="no-underline">
          <span className="font-serif text-base tracking-tight text-ink sm:text-xl">
            Managementboekgids
          </span>
          <span className="ml-2 rounded bg-accent px-2 py-0.5 text-xs font-bold text-paper">
            Erik2
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
