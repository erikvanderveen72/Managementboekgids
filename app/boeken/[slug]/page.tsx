import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AffiliateButton } from "@/components/AffiliateButton";
import { BookCover } from "@/components/BookCover";
import { ScoreBar } from "@/components/ScoreBar";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  categorySlug,
  getAllBookSlugs,
  getBook,
} from "@/lib/books";

const SITE_URL = "https://managementboekgids.nl";

type Params = { slug: string };

function avgScore(s: {
  practicalValue: number;
  readability: number;
  originality: number;
  beginnerFriendly: number;
}) {
  return (
    (s.practicalValue + s.readability + s.originality + s.beginnerFriendly) / 4
  );
}

export async function generateStaticParams(): Promise<Params[]> {
  return getAllBookSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = await getBook(slug);
  if (!book) return {};
  const url = `/boeken/${book.slug}`;
  const title = `${book.title}, samenvatting, review en belangrijkste lessen`;
  const ogImage = book.coverImage;
  return {
    title,
    description: book.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: `${book.title}, Managementboekgids`,
      description: book.excerpt,
      type: "article",
      url,
      images: ogImage ? [{ url: ogImage, alt: `Cover van ${book.title}` }] : undefined,
      authors: book.authors,
      publishedTime: book.publishedAt || undefined,
      modifiedTime: book.updatedAt || book.publishedAt || undefined,
      tags: book.categories,
    },
    twitter: {
      card: "summary_large_image",
      title: book.title,
      description: book.excerpt,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const book = await getBook(slug);
  if (!book) notFound();

  const rating = avgScore(book.scores);
  const url = `${SITE_URL}/boeken/${book.slug}`;

  const bookJsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: book.authors.map((a) => ({ "@type": "Person", name: a })),
    publisher: book.publisher
      ? { "@type": "Organization", name: book.publisher }
      : undefined,
    datePublished: book.year ? String(book.year) : undefined,
    numberOfPages: book.pages,
    isbn: book.isbn,
    inLanguage: "nl",
    image: book.coverImage,
    about: book.categories,
    description: book.excerpt,
    url,
    review: {
      "@type": "Review",
      author: { "@type": "Organization", name: "Managementboekgids" },
      datePublished: book.publishedAt || undefined,
      reviewBody: book.excerpt,
      reviewRating: {
        "@type": "Rating",
        ratingValue: rating.toFixed(1),
        bestRating: 10,
        worstRating: 0,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating.toFixed(1),
      bestRating: 10,
      worstRating: 0,
      ratingCount: 1,
      reviewCount: 1,
    },
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Boeken",
        item: `${SITE_URL}/boeken`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: book.title,
        item: url,
      },
    ],
  };

  return (
    <article>
      <header className="border-b border-ink/10 bg-paper-warm">
        <div className="container-wide pt-6 md:pt-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Boeken", href: "/boeken" },
              { label: book.title },
            ]}
          />
        </div>
        <div className="container-wide pt-6 md:pt-10">
          <div className="grid gap-8 md:grid-cols-5 md:gap-10">
            <div className="min-w-0 md:col-span-3">
              <p className="font-serif text-xs uppercase tracking-[0.25em] text-ink-muted">
                {book.categories[0] ?? "Bespreking"}
              </p>
              <h1 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl md:mt-4 md:text-5xl">
                {book.title}
              </h1>
              {book.subtitle && (
                <p className="mt-3 font-serif text-lg text-ink-soft sm:text-xl">
                  {book.subtitle}
                </p>
              )}
              <p className="mt-5 text-sm text-ink-muted md:mt-6">
                {book.authors.join(" & ")}
                {book.publisher ? ` · ${book.publisher}` : ""}
                {book.year ? ` · ${book.year}` : ""}
                {book.pages ? ` · ${book.pages} pagina's` : ""}
              </p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-3 py-1 text-xs text-ink-soft">
                <span aria-hidden="true" className="text-accent">★</span>
                <span>
                  <span className="font-medium text-ink">{rating.toFixed(1)}</span>
                  <span className="text-ink-muted">/10 redactiescore</span>
                </span>
              </div>
            </div>
            {book.coverImage && (
              <div className="flex items-start justify-center md:col-span-2 md:justify-end">
                <BookCover
                  src={book.coverImage}
                  alt={`Cover van ${book.title}`}
                  sizeClass="max-h-[240px] sm:max-h-[320px] md:max-h-[420px]"
                />
              </div>
            )}
          </div>
          {book.affiliate.managementboek && (
            <div className="mt-6 pb-10 md:hidden">
              <AffiliateButton href={book.affiliate.managementboek} />
              <p className="mt-2 text-center text-xs text-ink-muted">
                Partnerlink. Jij betaalt niets extra.
              </p>
            </div>
          )}
          <div className="hidden md:block md:pb-16" />
        </div>
      </header>

      <div className="container-wide grid gap-10 py-10 md:grid-cols-3 md:gap-12 md:py-14">
        <div className="min-w-0 md:col-span-2">
          <section>
            <h2 className="font-serif text-xl">In het kort</h2>
            <p className="mt-3 text-lg leading-relaxed text-ink-soft">
              {book.excerpt}
            </p>
          </section>

          {book.coreIdea && (
            <section className="mt-12">
              <h2 className="font-serif text-xl">De kern</h2>
              <blockquote className="mt-4 border-l-2 border-accent bg-paper-warm/60 px-5 py-4 font-serif text-xl leading-relaxed text-ink">
                <span aria-hidden="true" className="mr-1 text-accent">“</span>
                {book.coreIdea}
                <span aria-hidden="true" className="ml-1 text-accent">”</span>
              </blockquote>
            </section>
          )}

          {book.infographic && (
            <section className="mt-12">
              <h2 className="font-serif text-xl">Infographic</h2>
              <p className="mt-2 text-sm text-ink-muted">
                Het boek in één oogopslag.
              </p>
              <figure className="mt-6 overflow-hidden rounded-sm border border-ink/10 bg-paper-warm">
                <img
                  src={book.infographic}
                  alt={`Infographic, samenvatting van ${book.title}`}
                  loading="lazy"
                  className="block w-full h-auto"
                />
              </figure>
            </section>
          )}

          {book.lessons.length > 0 && (
            <section className="mt-12">
              <h2 className="font-serif text-xl">De belangrijkste lessen</h2>
              <ol className="mt-4 space-y-6">
                {book.lessons.map((l, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-serif text-2xl text-accent">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-serif text-lg">{l.title}</p>
                      <p className="mt-1 text-ink-soft leading-relaxed">
                        {l.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {book.contentHtml && (
            <section className="mt-12">
              <div
                className="prose-editorial"
                dangerouslySetInnerHTML={{ __html: book.contentHtml }}
              />
            </section>
          )}

          {(book.forWhom.length > 0 || book.notForWhom.length > 0) && (
            <section className="mt-12 grid gap-8 border-t border-ink/10 pt-10 md:grid-cols-2">
              {book.forWhom.length > 0 && (
                <div>
                  <h3 className="font-serif text-lg">Wel geschikt voor</h3>
                  <ul className="mt-3 space-y-2 text-ink-soft">
                    {book.forWhom.map((x) => (
                      <li key={x} className="flex gap-2">
                        <span aria-hidden="true" className="text-accent">✓</span>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {book.notForWhom.length > 0 && (
                <div>
                  <h3 className="font-serif text-lg">Minder geschikt voor</h3>
                  <ul className="mt-3 space-y-2 text-ink-soft">
                    {book.notForWhom.map((x) => (
                      <li key={x} className="flex gap-2">
                        <span aria-hidden="true" className="text-ink-muted">−</span>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {(book.strongPoints.length > 0 || book.weakPoints.length > 0) && (
            <section className="mt-12 grid gap-8 md:grid-cols-2">
              {book.strongPoints.length > 0 && (
                <div>
                  <h3 className="font-serif text-lg">Sterke punten</h3>
                  <ul className="mt-3 space-y-2 text-ink-soft">
                    {book.strongPoints.map((x) => (
                      <li key={x} className="flex gap-2">
                        <span aria-hidden="true" className="text-accent">+</span>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {book.weakPoints.length > 0 && (
                <div>
                  <h3 className="font-serif text-lg">Zwakke punten</h3>
                  <ul className="mt-3 space-y-2 text-ink-soft">
                    {book.weakPoints.map((x) => (
                      <li key={x} className="flex gap-2">
                        <span aria-hidden="true" className="text-ink-muted">−</span>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {book.similarBooks.length > 0 && (
            <section className="mt-12 border-t border-ink/10 pt-10">
              <h3 className="font-serif text-lg">Vergelijkbare boeken</h3>
              <ul className="mt-3 space-y-1 text-ink-soft">
                {book.similarBooks.map((x) => (
                  <li key={x}>: {x}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="min-w-0 md:col-span-1">
          <div className="space-y-8 border border-ink/10 bg-white p-6 shadow-sm md:sticky md:top-8">
            <div>
              <p className="font-serif text-xs uppercase tracking-[0.2em] text-ink-muted">
                Koop dit boek
              </p>
              {book.affiliate.managementboek ? (
                <div className="mt-3">
                  <AffiliateButton href={book.affiliate.managementboek} />
                  <p className="mt-3 text-xs text-ink-muted">
                    Partnerlink. Jij betaalt niets extra.
                  </p>
                </div>
              ) : (
                <p className="mt-3 text-sm text-ink-muted">
                  Link volgt binnenkort.
                </p>
              )}
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <p className="font-serif text-xs uppercase tracking-[0.2em] text-ink-muted">
                  Beoordeling
                </p>
                <p className="font-serif text-sm">
                  <span className="text-ink">{rating.toFixed(1)}</span>
                  <span className="text-ink-muted">/10</span>
                </p>
              </div>
              <div className="mt-4 space-y-3">
                <ScoreBar
                  label="Praktisch toepasbaar"
                  value={book.scores.practicalValue}
                />
                <ScoreBar label="Leesbaarheid" value={book.scores.readability} />
                <ScoreBar
                  label="Originaliteit"
                  value={book.scores.originality}
                />
                <ScoreBar
                  label="Voor beginners"
                  value={book.scores.beginnerFriendly}
                />
              </div>
            </div>

            {book.categories.length > 0 && (
              <div>
                <p className="font-serif text-xs uppercase tracking-[0.2em] text-ink-muted">
                  Categorieën
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {book.categories.map((c) => (
                    <Link
                      key={c}
                      href={`/categorie/${categorySlug(c)}`}
                      className="rounded-full border border-ink/15 px-2.5 py-0.5 text-xs text-ink-soft no-underline hover:border-ink/40 hover:text-ink"
                    >
                      {c}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
    </article>
  );
}
