import type { Metadata } from "next";
import { BookCard } from "@/components/BookCard";
import { getAllBooks } from "@/lib/books";

export const metadata: Metadata = {
  title: "Alle boeken",
  description:
    "Overzicht van alle besproken managementboeken op Managementboekgids.",
};

export default function BooksIndexPage() {
  const books = getAllBooks();

  return (
    <section className="container-wide py-16">
      <p className="font-serif text-xs uppercase tracking-[0.25em] text-ink-muted">
        Bibliotheek
      </p>
      <h1 className="mt-3 font-serif text-4xl">Alle boeken</h1>
      <p className="mt-4 max-w-2xl text-ink-soft">
        Overzicht van alle besproken managementboeken. Nieuwste eerst.
      </p>
      <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {books.map((b, i) => (
          <BookCard key={b.slug} book={b} rank={i + 1} />
        ))}
      </div>
    </section>
  );
}
