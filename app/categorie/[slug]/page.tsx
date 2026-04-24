import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookCard } from "@/components/BookCard";
import {
  getAllCategories,
  getBooksByCategorySlug,
  getCategoryName,
} from "@/lib/books";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return getAllCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const name = getCategoryName(params.slug);
  if (!name) return {};
  return {
    title: `Beste boeken over ${name.toLowerCase()}`,
    description: `Managementboeken in de categorie ${name}.`,
  };
}

export default function CategoryPage({ params }: { params: Params }) {
  const name = getCategoryName(params.slug);
  if (!name) notFound();
  const books = getBooksByCategorySlug(params.slug);

  return (
    <section className="container-wide py-16">
      <p className="font-serif text-xs uppercase tracking-[0.25em] text-ink-muted">
        Categorie
      </p>
      <h1 className="mt-3 font-serif text-4xl">
        Beste boeken over {name.toLowerCase()}
      </h1>
      <p className="mt-4 max-w-2xl text-ink-soft">
        {books.length} {books.length === 1 ? "bespreking" : "besprekingen"} in
        deze categorie.
      </p>
      <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {books.map((b) => (
          <BookCard key={b.slug} book={b} />
        ))}
      </div>
    </section>
  );
}
