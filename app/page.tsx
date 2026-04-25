import Link from "next/link";
import { BookCard } from "@/components/BookCard";
import { BookCover } from "@/components/BookCover";
import { getAllBooks, getAllCategories } from "@/lib/books";

export default function HomePage() {
  const books = getAllBooks();
  const featured = books.slice(0, 1)[0];
  const rest = books.slice(1, 7);
  const categories = getAllCategories();

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-paper-warm/70 to-transparent"
        />
        <div className="container-wide pb-10 pt-12 md:pb-14 md:pt-20">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            <p className="font-serif text-xs uppercase tracking-[0.25em] text-ink-muted">
              Managementboekgids
            </p>
          </div>
          <h1 className="mt-5 max-w-3xl font-serif text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            De beste managementboeken van Nederland,{" "}
            <span className="text-accent">vertaald naar de praktijk</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Elke dag een nieuw boek: een originele samenvatting, de
            belangrijkste lessen en concrete toepassingen voor managers,
            ondernemers en professionals.
          </p>
          <dl className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-3 text-sm">
            <div>
              <dt className="text-ink-muted">Besprekingen</dt>
              <dd className="font-serif text-2xl text-ink">{books.length}</dd>
            </div>
            <div>
              <dt className="text-ink-muted">Categorieën</dt>
              <dd className="font-serif text-2xl text-ink">
                {categories.length}
              </dd>
            </div>
            <div>
              <dt className="text-ink-muted">Frequentie</dt>
              <dd className="font-serif text-2xl text-ink">Dagelijks</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/boeken"
              className="inline-flex items-center gap-2 rounded-sm bg-ink px-5 py-3 text-sm font-medium text-paper no-underline transition hover:bg-accent"
            >
              Bekijk alle besprekingen
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/categorieen"
              className="inline-flex items-center gap-2 rounded-sm border border-ink/15 bg-paper px-5 py-3 text-sm font-medium text-ink no-underline transition hover:border-ink/40"
            >
              Verken op thema
            </Link>
          </div>
        </div>
      </section>

      {featured && (
        <section className="border-y border-ink/10 bg-paper-warm">
          <div className="container-wide py-12 md:py-20">
            <div className="grid gap-8 md:grid-cols-12 md:items-center md:gap-12">
              <div className="order-2 md:order-1 md:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Nieuwste bespreking
                </div>
                <h2 className="mt-5 font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
                  <Link
                    href={`/boeken/${featured.slug}`}
                    className="no-underline text-ink hover:text-accent"
                  >
                    {featured.title}
                  </Link>
                </h2>
                {featured.subtitle && (
                  <p className="mt-3 font-serif text-xl text-ink-soft">
                    {featured.subtitle}
                  </p>
                )}
                <p className="mt-4 text-sm text-ink-muted">
                  {featured.authors.join(" & ")}
                  {featured.publisher ? ` · ${featured.publisher}` : ""}
                  {featured.year ? ` · ${featured.year}` : ""}
                </p>
                {featured.coreIdea ? (
                  <blockquote className="mt-6 border-l-2 border-accent pl-5 font-serif text-lg italic leading-relaxed text-ink">
                    “{featured.coreIdea}”
                  </blockquote>
                ) : (
                  <p className="mt-6 text-lg leading-relaxed text-ink-soft">
                    {featured.excerpt}
                  </p>
                )}
                <Link
                  href={`/boeken/${featured.slug}`}
                  className="mt-8 inline-flex items-center gap-2 rounded-sm bg-ink px-6 py-3 text-sm font-medium text-paper no-underline transition hover:bg-accent"
                >
                  Lees de bespreking
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
              {featured.coverImage && (
                <div className="order-1 md:order-2 md:col-span-5">
                  <Link
                    href={`/boeken/${featured.slug}`}
                    className="block"
                    aria-label={`Bespreking van ${featured.title}`}
                  >
                    <div className="flex justify-center">
                      <BookCover
                        src={featured.coverImage}
                        alt={`Cover van ${featured.title}`}
                        sizeClass="max-h-[280px] sm:max-h-[360px] md:max-h-[460px]"
                      />
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="container-wide py-16 md:py-20">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <p className="font-serif text-xs uppercase tracking-[0.25em] text-ink-muted">
                Recent
              </p>
              <h2 className="mt-2 font-serif text-2xl md:text-3xl">
                Recente besprekingen
              </h2>
            </div>
            <Link
              href="/boeken"
              className="text-sm text-ink-muted no-underline hover:text-ink"
            >
              Alle boeken →
            </Link>
          </div>
          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((b) => (
              <BookCard key={b.slug} book={b} />
            ))}
          </div>
        </section>
      )}

      {categories.length > 0 && (
        <section className="container-wide pb-20">
          <div className="rule" />
          <div className="pt-12">
            <p className="font-serif text-xs uppercase tracking-[0.25em] text-ink-muted">
              Op thema
            </p>
            <h2 className="mt-2 font-serif text-2xl md:text-3xl">
              Categorieën
            </h2>
            <p className="mt-2 max-w-xl text-ink-soft">
              Vind het juiste managementboek voor jouw vraagstuk.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/categorie/${c.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-paper px-3 py-1.5 text-sm text-ink-soft no-underline transition hover:border-accent/40 hover:bg-accent/5 hover:text-ink"
              >
                <span>{c.name}</span>
                <span className="text-xs text-ink-muted">{c.count}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
