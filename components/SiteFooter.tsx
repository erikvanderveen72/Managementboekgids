import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-ink/10 bg-paper-warm">
      <div className="container-wide grid gap-8 py-12 md:grid-cols-3">
        <div>
          <p className="font-serif text-lg text-ink">Managementboekgids</p>
          <p className="mt-2 max-w-sm text-sm text-ink-muted">
            De beste managementboeken van Nederland, samengevat en vertaald
            naar praktische lessen voor managers, ondernemers en professionals.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-medium text-ink">Navigatie</p>
          <ul className="space-y-2 text-ink-muted">
            <li><Link href="/boeken" className="no-underline hover:text-ink">Alle boeken</Link></li>
            <li><Link href="/categorieen" className="no-underline hover:text-ink">Categorieën</Link></li>
            <li><Link href="/over" className="no-underline hover:text-ink">Over deze site</Link></li>
            <li><Link href="/affiliate" className="no-underline hover:text-ink">Affiliate disclosure</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-medium text-ink">Transparantie</p>
          <p className="text-ink-muted">
            Sommige links op deze site zijn affiliate links. Als je via zo&apos;n
            link een boek koopt, ontvangen wij mogelijk een kleine vergoeding.
            Jij betaalt niets extra.
          </p>
        </div>
      </div>
      <div className="border-t border-ink/10">
        <div className="container-wide py-4 text-xs text-ink-muted">
          © {new Date().getFullYear()} Managementboekgids.nl
        </div>
      </div>
    </footer>
  );
}
