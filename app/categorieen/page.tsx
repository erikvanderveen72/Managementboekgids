import type { Metadata } from "next";
import Link from "next/link";
import { getAllCategories } from "@/lib/books";

export const metadata: Metadata = {
  title: "Categorieën",
  description: "Alle categorieën binnen Managementboekgids.",
};

export default function CategoriesPage() {
  const categories = getAllCategories();
  return (
    <section className="container-wide py-16">
      <p className="font-serif text-xs uppercase tracking-[0.25em] text-ink-muted">
        Thema&apos;s
      </p>
      <h1 className="mt-3 font-serif text-4xl">Categorieën</h1>
      <p className="mt-4 max-w-2xl text-ink-soft">
        Vind het juiste managementboek voor jouw vraagstuk.
      </p>
      <ul className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/categorie/${c.slug}`}
              className="block border border-ink/10 p-4 no-underline transition hover:border-ink/30"
            >
              <span className="font-serif text-lg text-ink">{c.name}</span>
              <span className="ml-2 text-sm text-ink-muted">
                ({c.count})
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
