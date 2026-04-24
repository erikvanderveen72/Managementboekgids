type Props = {
  label: string;
  value: number;
  max?: number;
};

export function ScoreBar({ label, value, max = 10 }: Props) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-ink-soft">{label}</span>
        <span className="font-serif text-sm text-ink">
          {value}
          <span className="text-ink-muted">/{max}</span>
        </span>
      </div>
      <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-ink/10">
        <div
          className="h-full rounded-full bg-accent"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
