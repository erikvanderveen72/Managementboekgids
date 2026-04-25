import Link from "next/link";
import type { BookMeta } from "@/lib/types";
import { BookCover } from "./BookCover";

type Props = {
  book: BookMeta;
  rank?: number;
};

function avgScore(s: BookMeta["scores"]) {
  return (
    (s.practicalValue + s.readability + s.originality + s.beginnerFriendly) / 4
  );
}

export function BookCard({ book, rank }: Props) {
  const score = avgScore(book.scores);

  return (
    <article className="group relative flex flex-col border-t border-ink/10 pt-6">
      {rank !== undefined && (
        <span className="mb-3 font-serif text-xs uppercase tracking-widest text-ink-muted">
          #{rank.toString().padStart(2, "0")}
        </span>
      )}
      {book.coverImage && (
        <Link
          href={`/boeken/${book.slug}`}
          className="relative mb-5 block"
          aria-label={`Bespreking van ${book.title}`}
        >
          <div className="flex justify-center bg-paper-warm py-5 transition group-hover:bg-paper-warm/70">
            <div className="transition-transform duration-300 group-hover:-translate-y-0.5">
              <BookCover
                src={book.coverImage}
                alt={`Cover van ${book.title}`}
                sizeClass="max-h-[200px] sm:max-h-[220px]"
                eager={false}
              />
            </div>
          </div>
          {score > 0 && (
            <span
              className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-ink/10 bg-paper/95 px-2 py-0.5 text-[11px] font-medium text-ink shadow-sm backdrop-blur"
              aria-label={`Redactiescore ${score.toFixed(1)} van 10`}
            >
              <span aria-hidden="true" className="text-accent">★</span>
              <span>{score.toFixed(1)}</span>
            </span>
          )}
        </Link>
      )}
      <h3 className="font-serif text-xl leading-snug">
        <Link
          href={`/boeken/${book.slug}`}
          className="no-underline text-ink transition group-hover:text-accent"
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
