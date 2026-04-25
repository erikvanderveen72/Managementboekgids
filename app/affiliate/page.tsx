import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate disclosure",
  description:
    "Hoe Managementboekgids omgaat met affiliate links en transparantie.",
  alternates: { canonical: "/affiliate" },
  openGraph: {
    title: "Affiliate disclosure",
    description:
      "Hoe Managementboekgids omgaat met affiliate links en transparantie.",
    type: "website",
    url: "/affiliate",
  },
};

export default function AffiliatePage() {
  return (
    <section className="container-prose py-16">
      <p className="font-serif text-xs uppercase tracking-[0.25em] text-ink-muted">
        Transparantie
      </p>
      <h1 className="mt-3 font-serif text-4xl">Affiliate disclosure</h1>
      <div className="prose-editorial mt-8">
        <p>
          Managementboekgids bevat affiliate links. Dat betekent dat we een
          kleine vergoeding kunnen ontvangen als je via een link op deze site
          een boek koopt bij onder andere Managementboek.nl. Jij betaalt nooit
          een hogere prijs dan wanneer je direct naar de winkel gaat.
        </p>
        <h2>Waarom affiliate links</h2>
        <p>
          Deze site is gratis toegankelijk, zonder advertenties en zonder
          tracking voor reclame. Affiliate inkomsten helpen ons om nieuwe
          besprekingen te schrijven, boeken aan te schaffen en de site te
          onderhouden.
        </p>
        <h2>Onze belofte</h2>
        <ul>
          <li>
            Onze mening is niet te koop. We schrijven geen positievere
            beoordeling omdat een boek meer oplevert.
          </li>
          <li>
            We labelen affiliate links duidelijk en gebruiken waar mogelijk{" "}
            <code>rel=&quot;nofollow sponsored&quot;</code>.
          </li>
          <li>
            We raden ook boeken af als ze niet bij je situatie passen.
          </li>
        </ul>
        <p>
          Vragen? Mail ons via het adres op de <a href="/over">over-pagina</a>.
        </p>
      </div>
    </section>
  );
}
