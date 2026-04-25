import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookCard } from "@/components/BookCard";
import {
  categorySlug,
  getAllCategories,
  getBooksByCategorySlug,
  getCategoryName,
} from "@/lib/books";
import { getCategoryContent } from "@/lib/categories";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return getAllCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const name = getCategoryName(slug);
  if (!name) return {};
  const content = await getCategoryContent(slug);
  return {
    title: `Beste boeken over ${name.toLowerCase()}`,
    description:
      content?.intro ??
      `Managementboeken in de categorie ${name}.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const name = getCategoryName(slug);
  if (!name) notFound();
  const books = getBooksByCategorySlug(slug);
  const content = await getCategoryContent(slug);

  const topPickBook = content?.topPick
    ? books.find((b) => b.slug === content.topPick)
    : undefined;

  return (
    <>
      <header className="bg-paper-warm">
        <div className="container-wide py-16">
          <p className="font-serif text-xs uppercase tracking-[0.25em] text-ink-muted">
            Categorie
          </p>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl">
            Beste boeken over {name.toLowerCase()}
          </h1>
          {content?.intro && (
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-soft">
              {content.intro}
            </p>
          )}
          <p className="mt-6 text-sm text-ink-muted">
            {books.length} {books.length === 1 ? "bespreking" : "besprekingen"}{" "}
            in deze categorie
          </p>
        </div>
      </header>

      <div className="container-wide py-12">
        {content?.contentHtml && (
          <section className="prose-editorial mx-auto max-w-3xl">
            <div dangerouslySetInnerHTML={{ __html: content.contentHtml }} />
          </section>
        )}

        {content?.forWhom && content.forWhom.length > 0 && (
          <section className="mx-auto mt-12 max-w-3xl border-t border-ink/10 pt-10">
            <h2 className="font-serif text-2xl">Voor wie zijn deze boeken?</h2>
            <ul className="mt-4 space-y-2 text-ink-soft">
              {content.forWhom.map((x) => (
                <li key={x}>— {x}</li>
              ))}
            </ul>
          </section>
        )}

        {topPickBook && (
          <section className="mx-auto mt-12 max-w-3xl border-t border-ink/10 pt-10">
            <p className="font-serif text-xs uppercase tracking-[0.25em] text-ink-muted">
              Onze topkeuze
            </p>
            <h2 className="mt-3 font-serif text-2xl">
              <Link
                href={`/boeken/${topPickBook.slug}`}
                className="no-underline text-ink hover:text-accent"
              >
                {topPickBook.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              {topPickBook.authors.join(" & ")}
            </p>
            <p className="mt-3 text-ink-soft">{topPickBook.excerpt}</p>
          </section>
        )}

        <section className="mt-16">
          <h2 className="font-serif text-2xl">Alle boeken in deze categorie</h2>
          <div className="mt-8 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {books.map((b) => (
              <BookCard key={b.slug} book={b} />
            ))}
          </div>
        </section>

        {content?.relatedCategories && content.relatedCategories.length > 0 && (
          <section className="mt-16 border-t border-ink/10 pt-10">
            <h2 className="font-serif text-2xl">Verwante categorieën</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {content.relatedCategories.map((c) => (
                <Link
                  key={c}
                  href={`/categorie/${categorySlug(c)}`}
                  className="rounded-full border border-ink/15 px-3 py-1 text-sm text-ink-soft no-underline hover:border-ink/40 hover:text-ink"
                >
                  {c}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
