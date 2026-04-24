import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-ink/10 bg-paper">
      <div className="container-wide flex items-center justify-between py-5">
        <Link href="/" className="no-underline">
          <span className="font-serif text-xl tracking-tight text-ink">
            Managementboekgids
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-ink-soft">
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
