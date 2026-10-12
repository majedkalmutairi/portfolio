import type { CSSProperties } from "react";
import { DashedCard } from "@/components/ui/dashed-card";
import { cx } from "@/lib/cx";

export type ContributionDay = {
  date: string;
  count: number;
};

type ContributionGraphProps = {
  days: ContributionDay[];
  className?: string;
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const SHADE = ["", "18%", "38%", "62%", "90%"];
const PHONE_WEEKS = 26;

function thresholds(days: ContributionDay[]) {
  const counts = days
    .map((d) => d.count)
    .filter((c) => c > 0)
    .sort((a, b) => a - b);
  if (!counts.length) return [1, 1, 1];
  const q = (p: number) => counts[Math.min(counts.length - 1, Math.floor(p * counts.length))];
  return [q(0.25), q(0.5), q(0.75)];
}

function levelOf(count: number, t: number[]) {
  if (count <= 0) return 0;
  if (count <= t[0]) return 1;
  if (count <= t[1]) return 2;
  if (count <= t[2]) return 3;
  return 4;
}

function shade(level: number): CSSProperties | undefined {
  return level
    ? { backgroundColor: `color-mix(in oklab, var(--fg) ${SHADE[level]}, transparent)` }
    : undefined;
}

function toWeeks(days: ContributionDay[]) {
  const firstDow = days.length ? new Date(days[0].date + "T00:00:00Z").getUTCDay() : 0;
  const cells: Array<ContributionDay | null> = [...Array<null>(firstDow).fill(null), ...days];
  const weeks: Array<Array<ContributionDay | null>> = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

function monthLabels(weeks: Array<Array<ContributionDay | null>>) {
  const labels: Array<{ label: string; week: number }> = [];
  let last = -1;
  weeks.forEach((week, w) => {
    const first = week.find((d) => d !== null);
    if (!first) return;
    const m = new Date(first.date + "T00:00:00Z").getUTCMonth();
    if (m !== last) {
      labels.push({ label: MONTHS[m], week: w });
      last = m;
    }
  });
  if (labels.length > 1 && labels[1].week - labels[0].week < 3) labels.shift();
  if (labels.length && weeks.length - labels[labels.length - 1].week < 2) labels.pop();
  return labels;
}

function Grid({ days, t, className }: { days: ContributionDay[]; t: number[]; className?: string }) {
  const weeks = toWeeks(days);
  const columns = { gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` };
  return (
    <div className={className}>
      <div
        className="grid gap-x-0.75 overflow-hidden text-xs text-fg-muted"
        style={columns}
        aria-hidden="true"
      >
        {monthLabels(weeks).map(({ label, week }) => (
          <span key={label + week} className="whitespace-nowrap" style={{ gridColumnStart: week + 1 }}>
            {label}
          </span>
        ))}
      </div>
      <div
        className="mt-2 grid grid-flow-col gap-0.75"
        style={{ gridTemplateRows: "repeat(7, minmax(0, 1fr))", ...columns }}
      >
        {weeks.flatMap((week, w) =>
          Array.from({ length: 7 }, (_, d) => {
            const day = week[d] ?? null;
            return (
              <span
                key={`${w}-${d}`}
                title={day ? `${day.count} on ${day.date}` : undefined}
                className={cx("aspect-square w-full rounded-[3px]", day ? "bg-line/60" : "invisible")}
                style={day ? shade(levelOf(day.count, t)) : undefined}
              />
            );
          }),
        )}
      </div>
    </div>
  );
}

export function ContributionGraph({ days, className }: ContributionGraphProps) {
  const total = days.reduce((sum, d) => sum + d.count, 0);
  const t = thresholds(days);
  return (
    <DashedCard className={cx("p-5 sm:p-8", className)}>
      <div role="img" aria-label={`${total.toLocaleString("en")} contributions in the last year`}>
        <Grid days={days} t={t} className="hidden sm:block" />
        <Grid days={days.slice(-PHONE_WEEKS * 7)} t={t} className="sm:hidden" />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-body text-fg-secondary">
          {total.toLocaleString("en")} contributions in the last year
        </p>
        <div className="flex items-center gap-1.5 text-xs text-fg-muted" aria-hidden="true">
          Less
          {[0, 1, 2, 3, 4].map((l) => (
            <span key={l} className="size-2.5 rounded-xs bg-line/60" style={shade(l)} />
          ))}
          More
        </div>
      </div>
    </DashedCard>
  );
}
