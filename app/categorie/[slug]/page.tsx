import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookCard } from "@/components/BookCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  categorySlug,
  getAllCategories,
  getBooksByCategorySlug,
  getCategoryName,
} from "@/lib/books";
import { getCategoryContent } from "@/lib/categories";

const SITE_URL = "https://managementboekgids.nl";

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
  const description =
    content?.intro ?? `Managementboeken in de categorie ${name}.`;
  const url = `/categorie/${slug}`;
  return {
    title: `Beste boeken over ${name.toLowerCase()}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `Beste boeken over ${name.toLowerCase()}`,
      description,
      type: "website",
      url,
    },
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

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Categorieën",
        item: `${SITE_URL}/categorieen`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name,
        item: `${SITE_URL}/categorie/${slug}`,
      },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Beste boeken over ${name.toLowerCase()}`,
    numberOfItems: books.length,
    itemListElement: books.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/boeken/${b.slug}`,
      name: b.title,
    })),
  };

  return (
    <>
      <header className="bg-paper-warm">
        <div className="container-wide pt-6 md:pt-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Categorieën", href: "/categorieen" },
              { label: name },
            ]}
          />
        </div>
        <div className="container-wide pb-10 pt-6 md:pb-16 md:pt-10">
          <p className="font-serif text-xs uppercase tracking-[0.25em] text-ink-muted">
            Categorie
          </p>
          <h1 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
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
                <li key={x} className="flex gap-2">
                  <span aria-hidden="true" className="text-accent">·</span>
                  <span>{x}</span>
                </li>
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
                  className="rounded-full border border-ink/15 bg-paper px-3 py-1 text-sm text-ink-soft no-underline transition hover:border-ink/40 hover:text-ink"
                >
                  {c}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
    </>
  );
}
