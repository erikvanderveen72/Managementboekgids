import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getAllCategories } from "@/lib/books";

export const metadata: Metadata = {
  title: "Categorieën",
  description: "Alle categorieën binnen Managementboekgids.",
  alternates: { canonical: "/categorieen" },
  openGraph: {
    title: "Categorieën, Managementboekgids",
    description: "Vind het juiste managementboek voor jouw vraagstuk.",
    type: "website",
    url: "/categorieen",
  },
};

export default function CategoriesPage() {
  const categories = getAllCategories();
  return (
    <>
      <header className="bg-paper-warm">
        <div className="container-wide pt-6 md:pt-10">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Categorieën" }]}
          />
        </div>
        <div className="container-wide pb-10 pt-6 md:pb-14 md:pt-10">
          <p className="font-serif text-xs uppercase tracking-[0.25em] text-ink-muted">
            Thema&apos;s
          </p>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl">
            Categorieën
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">
            Vind het juiste managementboek voor jouw vraagstuk.
          </p>
        </div>
      </header>
      <section className="container-wide py-12 md:py-16">
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/categorie/${c.slug}`}
                className="group flex items-baseline justify-between gap-3 border border-ink/10 bg-paper p-5 no-underline transition hover:border-accent/40 hover:bg-accent/5"
              >
                <span className="font-serif text-lg text-ink transition group-hover:text-accent">
                  {c.name}
                </span>
                <span className="rounded-full border border-ink/15 px-2 py-0.5 text-xs text-ink-muted">
                  {c.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
