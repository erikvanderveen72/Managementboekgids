import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Over Managementboekgids",
  description:
    "Managementboekgids bespreekt de beste managementboeken van Nederland en vertaalt ze naar praktische lessen.",
  alternates: { canonical: "/over" },
  openGraph: {
    title: "Over Managementboekgids",
    description:
      "Managementboekgids bespreekt de beste managementboeken van Nederland.",
    type: "website",
    url: "/over",
  },
};

export default function AboutPage() {
  return (
    <section className="container-prose py-16">
      <p className="font-serif text-xs uppercase tracking-[0.25em] text-ink-muted">
        Over
      </p>
      <h1 className="mt-3 font-serif text-4xl">Over Managementboekgids</h1>
      <div className="prose-editorial mt-8">
        <p>
          Managementboekgids is een onafhankelijke gids bij de beste
          managementboeken van Nederland. Elke dag bespreken we een nieuw boek
          in eigen woorden en vertalen we de belangrijkste ideeën naar
          praktische lessen voor managers, ondernemers en professionals.
        </p>
        <p>
          We schrijven geen samenvattingen om het boek te vervangen, maar om je
          te helpen kiezen. Na elke bespreking weet je waar het boek over gaat,
          wat de belangrijkste lessen zijn, voor wie het geschikt is, en of het
          de investering waard is.
        </p>
        <h2>Onze werkwijze</h2>
        <ul>
          <li>
            We baseren besprekingen op het boek zelf, openbare bronnen en onze
            eigen analyse.
          </li>
          <li>
            We citeren kort en functioneel, nooit hele hoofdstukken.
          </li>
          <li>
            We voegen altijd praktische toepassing, kritische beoordeling en
            koopadvies toe.
          </li>
        </ul>
        <h2>Affiliate</h2>
        <p>
          Sommige links op deze site zijn affiliate links naar onder andere
          Managementboek.nl. Koop je via zo&apos;n link, dan ontvangen wij een
          kleine vergoeding, jij betaalt niets extra. Dat helpt ons om deze
          site onafhankelijk en advertentievrij te houden. Meer hierover lees je
          in onze <a href="/affiliate">affiliate disclosure</a>.
        </p>
      </div>
    </section>
  );
}
