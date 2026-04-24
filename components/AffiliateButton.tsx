type Props = {
  href: string;
  label?: string;
  vendor?: string;
};

export function AffiliateButton({
  href,
  label = "Bekijk bij Managementboek.nl",
  vendor = "Managementboek.nl",
}: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener"
      className="inline-flex items-center justify-center gap-2 rounded-sm bg-ink px-5 py-3 text-sm font-medium text-paper no-underline transition hover:bg-accent"
      aria-label={`Koop dit boek bij ${vendor} (affiliate link)`}
    >
      {label}
      <span aria-hidden="true">→</span>
    </a>
  );
}
