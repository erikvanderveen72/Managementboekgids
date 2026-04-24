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
      <section className="container-wide pt-16 pb-10">
        <p className="font-serif text-xs uppercase tracking-[0.25em] text-ink-muted">
          Managementboekgids
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight md:text-5xl">
          De beste managementboeken van Nederland,{" "}
          <span className="text-accent">vertaald naar de praktijk</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Elke dag een nieuw boek: een originele samenvatting, de belangrijkste
          lessen en concrete toepassingen voor managers, ondernemers en
          professionals.
        </p>
      </section>

      {featured && (
        <section className="bg-paper-warm">
          <div className="container-wide py-16">
            <div className="grid gap-12 md:grid-cols-12 md:items-center">
              <div className="order-2 md:order-1 md:col-span-7">
                <p className="font-serif text-xs uppercase tracking-[0.25em] text-ink-muted">
                  Nieuwste bespreking
                </p>
                <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
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
                <p className="mt-6 text-lg leading-relaxed text-ink-soft">
                  {featured.excerpt}
                </p>
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
                        maxHeight={460}
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
        <section className="container-wide py-16">
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif text-2xl">Recente besprekingen</h2>
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
        <section className="container-wide py-12 pb-16">
          <div className="rule" />
          <h2 className="pt-10 font-serif text-2xl">Categorieën</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/categorie/${c.slug}`}
                className="rounded-full border border-ink/15 px-3 py-1 text-sm text-ink-soft no-underline hover:border-ink/40 hover:text-ink"
              >
                {c.name}{" "}
                <span className="text-ink-muted">({c.count})</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
