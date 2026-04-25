import Link from "next/link";
import type { BookMeta } from "@/lib/types";
import { BookCover } from "./BookCover";

type Props = {
  book: BookMeta;
  rank?: number;
};

export function BookCard({ book, rank }: Props) {
  return (
    <article className="group relative flex flex-col border-t border-ink/10 pt-6">
      {rank !== undefined && (
        <span className="mb-3 font-serif text-xs uppercase tracking-widest text-ink-muted">
          #{rank.toString().padStart(2, "0")}
        </span>
      )}
      {book.coverImage && (
        <Link href={`/boeken/${book.slug}`} className="mb-5 block">
          <div className="flex justify-center bg-paper-warm py-4">
            <BookCover
              src={book.coverImage}
              alt={`Cover van ${book.title}`}
              sizeClass="max-h-[200px] sm:max-h-[220px]"
            />
          </div>
        </Link>
      )}
      <h3 className="font-serif text-xl leading-snug">
        <Link
          href={`/boeken/${book.slug}`}
          className="no-underline text-ink group-hover:text-accent"
        >
          {book.title}
        </Link>
      </h3>
      {book.subtitle && (
        <p className="mt-1 text-sm text-ink-muted">{book.subtitle}</p>
      )}
      <p className="mt-2 text-sm text-ink-soft">
        {book.authors.join(" & ")}
        {book.year ? ` · ${book.year}` : ""}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft line-clamp-3">
        {book.excerpt}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {book.categories.slice(0, 3).map((cat) => (
          <span
            key={cat}
            className="rounded-full border border-ink/15 px-2.5 py-0.5 text-xs text-ink-muted"
          >
            {cat}
          </span>
        ))}
      </div>
    </article>
  );
}
