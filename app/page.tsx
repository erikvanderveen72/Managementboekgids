import Link from "next/link";
import { BookCard } from "@/components/BookCard";
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
        <section className="container-wide">
          <div className="rule" />
          <div className="grid gap-10 py-12 md:grid-cols-5">
            <div className="md:col-span-2">
              <p className="font-serif text-xs uppercase tracking-[0.25em] text-ink-muted">
                Nieuwste bespreking
              </p>
              <h2 className="mt-3 font-serif text-3xl leading-tight">
                <Link
                  href={`/boeken/${featured.slug}`}
                  className="no-underline text-ink hover:text-accent"
                >
                  {featured.title}
                </Link>
              </h2>
              {featured.subtitle && (
                <p className="mt-2 text-ink-muted">{featured.subtitle}</p>
              )}
              <p className="mt-2 text-sm text-ink-soft">
                {featured.authors.join(" & ")}
                {featured.year ? ` · ${featured.year}` : ""}
              </p>
            </div>
            <div className="md:col-span-3">
              <p className="font-serif text-xl leading-relaxed text-ink-soft">
                {featured.excerpt}
              </p>
              <Link
                href={`/boeken/${featured.slug}`}
                className="mt-6 inline-block text-sm text-accent no-underline hover:text-accent-soft"
              >
                Lees de bespreking →
              </Link>
            </div>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="container-wide py-12">
          <div className="rule" />
          <div className="flex items-baseline justify-between pt-10">
            <h2 className="font-serif text-2xl">Recente besprekingen</h2>
            <Link
              href="/boeken"
              className="text-sm text-ink-muted no-underline hover:text-ink"
            >
              Alle boeken →
            </Link>
          </div>
          <div className="mt-8 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((b) => (
              <BookCard key={b.slug} book={b} />
            ))}
          </div>
        </section>
      )}

      {categories.length > 0 && (
        <section className="container-wide py-12">
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
