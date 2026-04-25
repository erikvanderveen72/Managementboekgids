import type { Metadata } from "next";
import { BookCard } from "@/components/BookCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getAllBooks, getAllCategories } from "@/lib/books";

export const metadata: Metadata = {
  title: "Alle boeken",
  description:
    "Overzicht van alle besproken managementboeken op Managementboekgids.",
  alternates: { canonical: "/boeken" },
  openGraph: {
    title: "Alle boeken, Managementboekgids",
    description:
      "Overzicht van alle besproken managementboeken, nieuwste eerst.",
    type: "website",
    url: "/boeken",
  },
};

export default function BooksIndexPage() {
  const books = getAllBooks();
  const categories = getAllCategories();

  return (
    <>
      <header className="bg-paper-warm">
        <div className="container-wide pt-6 md:pt-10">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Alle boeken" }]}
          />
        </div>
        <div className="container-wide pb-10 pt-6 md:pb-14 md:pt-10">
          <p className="font-serif text-xs uppercase tracking-[0.25em] text-ink-muted">
            Bibliotheek
          </p>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl">
            Alle boeken
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">
            Alle besproken managementboeken, nieuwste eerst. {books.length}{" "}
            {books.length === 1 ? "bespreking" : "besprekingen"} verdeeld over{" "}
            {categories.length} categorieën.
          </p>
        </div>
      </header>
      <section className="container-wide py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {books.map((b, i) => (
            <BookCard key={b.slug} book={b} rank={i + 1} />
          ))}
        </div>
      </section>
    </>
  );
}
