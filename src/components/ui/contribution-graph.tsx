import { DashedCard } from "@/components/ui/dashed-card";
import { cx } from "@/lib/cx";

export type ContributionDay = {
  /** ISO date, e.g. "2026-03-14". */
  date: string;
  count: number;
};

type ContributionGraphProps = {
  /** One entry per day, oldest first, covering the last year. Whoever fetches this passes it in. */
  days: ContributionDay[];
  className?: string;
};

// GitHub's own graph greens — the colour belongs to GitHub, like a logo.
const LEVEL_LIGHT = ["", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
const LEVEL_DARK = ["", "#0e4429", "#006d32", "#26a641", "#39d353"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function levelOf(count: number, max: number) {
  if (count <= 0 || max <= 0) return 0;
  const q = count / max;
  if (q <= 0.25) return 1;
  if (q <= 0.5) return 2;
  if (q <= 0.75) return 3;
  return 4;
}

// A year of contributions as a 53-week grid of rounded dots, month axis above, total below.
// Pure display: it fetches nothing. Scrolls sideways on narrow screens instead of shrinking.
export function ContributionGraph({ days, className }: ContributionGraphProps) {
  const total = days.reduce((sum, d) => sum + d.count, 0);
  const max = days.reduce((m, d) => Math.max(m, d.count), 0);

  // Group into weeks (columns). The first column is padded so Sunday is always row 0.
  const firstDow = days.length ? new Date(days[0].date + "T00:00:00Z").getUTCDay() : 0;
  const cells: Array<ContributionDay | null> = [...Array<null>(firstDow).fill(null), ...days];
  const weeks: Array<Array<ContributionDay | null>> = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  // A month label sits over the first week that contains the 1st of that month.
  const monthLabels: Array<{ label: string; week: number }> = [];
  let lastMonth = -1;
  weeks.forEach((week, w) => {
    const firstReal = week.find((d) => d !== null);
    if (!firstReal) return;
    const m = new Date(firstReal.date + "T00:00:00Z").getUTCMonth();
    if (m !== lastMonth) {
      monthLabels.push({ label: MONTHS[m], week: w });
      lastMonth = m;
    }
  });
  // The first month is usually a stub of a week or two; drop its label if the next is close.
  if (monthLabels.length > 1 && monthLabels[1].week - monthLabels[0].week < 3) monthLabels.shift();

  return (
    <DashedCard className={cx("p-6 sm:p-8", className)}>
      <div className="overflow-x-auto">
        <div className="min-w-[640px]">
          <div className="grid gap-x-[3px] text-body text-fg-muted" style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }} aria-hidden="true">
            {monthLabels.map(({ label, week }) => (
              <span key={label + week} className="whitespace-nowrap" style={{ gridColumnStart: week + 1 }}>
                {label}
              </span>
            ))}
          </div>
          <div
            role="img"
            aria-label={`${total.toLocaleString("en")} contributions in the last year`}
            className="mt-2 grid grid-flow-col gap-[3px]"
            style={{ gridTemplateRows: "repeat(7, minmax(0, 1fr))", gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}
          >
            {weeks.flatMap((week, w) =>
              Array.from({ length: 7 }, (_, d) => {
                const day = week[d] ?? null;
                const level = day ? levelOf(day.count, max) : 0;
                return (
                  <span
                    key={`${w}-${d}`}
                    className={cx("aspect-square w-full rounded-full", day ? "bg-line" : "invisible")}
                    style={
                      level
                        ? ({ backgroundColor: `light-dark(${LEVEL_LIGHT[level]}, ${LEVEL_DARK[level]})` } as React.CSSProperties)
                        : undefined
                    }
                  />
                );
              }),
            )}
          </div>
        </div>
      </div>
      <p className="mt-5 text-body text-fg-secondary">
        {total.toLocaleString("en")} contributions in the last year
      </p>
    </DashedCard>
  );
}
