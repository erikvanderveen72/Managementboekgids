import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-prose py-24 text-center">
      <p className="font-serif text-xs uppercase tracking-[0.25em] text-ink-muted">
        404
      </p>
      <h1 className="mt-3 font-serif text-4xl">Pagina niet gevonden</h1>
      <p className="mt-4 text-ink-soft">
        Deze pagina bestaat niet of is verplaatst.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block text-sm text-accent no-underline"
      >
        Terug naar de homepage →
      </Link>
    </section>
  );
}
