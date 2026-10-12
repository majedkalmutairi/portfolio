import type { CSSProperties } from "react";
import { DashedCard } from "@/components/ui/dashed-card";
import type { ContributionDay } from "@/components/ui/contribution-graph";
import { MicroLabel } from "@/components/ui/micro-label";
import { cx } from "@/lib/cx";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const GREEN_LIGHT = ["", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
const GREEN_DARK = ["", "#0e4429", "#006d32", "#26a641", "#39d353"];
const MONO = ["", "18%", "38%", "62%", "90%"];

type Palette = "green" | "mono";

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

function cellStyle(level: number, palette: Palette): CSSProperties | undefined {
  if (!level) return undefined;
  if (palette === "green")
    return { backgroundColor: `light-dark(${GREEN_LIGHT[level]}, ${GREEN_DARK[level]})` };
  return { backgroundColor: `color-mix(in oklab, var(--fg) ${MONO[level]}, transparent)` };
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
  return labels;
}

export function stats(days: ContributionDay[]) {
  const total = days.reduce((s, d) => s + d.count, 0);
  const active = days.filter((d) => d.count > 0).length;
  let longest = 0;
  let run = 0;
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }
  let current = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) current++;
    else if (i === days.length - 1) continue;
    else break;
  }
  const best = days.reduce((m, d) => (d.count > m.count ? d : m), days[0] ?? { date: "", count: 0 });
  return { total, active, longest, current, best };
}

function Legend({ palette }: { palette: Palette }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-fg-muted" aria-hidden="true">
      Less
      {[0, 1, 2, 3, 4].map((l) => (
        <span key={l} className="size-2.5 rounded-[2px] bg-line" style={cellStyle(l, palette)} />
      ))}
      More
    </div>
  );
}

export function Heatmap({
  days,
  palette,
  shape,
  cell,
  legend = false,
  footer = true,
}: {
  days: ContributionDay[];
  palette: Palette;
  shape: "dot" | "square";
  cell?: string;
  legend?: boolean;
  footer?: boolean;
}) {
  const weeks = toWeeks(days);
  const labels = monthLabels(weeks);
  const t = thresholds(days);
  const total = days.reduce((s, d) => s + d.count, 0);
  const columns = { gridTemplateColumns: `repeat(${weeks.length}, ${cell ?? "minmax(0, 1fr)"})` };
  return (
    <div>
      <div className="overflow-x-auto">
        <div className={cx(!cell && "min-w-[640px]", cell && "w-max")}>
          <div className="grid gap-x-[3px] text-xs text-fg-muted" style={columns} aria-hidden="true">
            {labels.map(({ label, week }) => (
              <span key={label + week} className="whitespace-nowrap" style={{ gridColumnStart: week + 1 }}>
                {label}
              </span>
            ))}
          </div>
          <div
            role="img"
            aria-label={`${total} contributions`}
            className="mt-2 grid grid-flow-col gap-[3px]"
            style={{ gridTemplateRows: `repeat(7, ${cell ?? "minmax(0, 1fr)"})`, ...columns }}
          >
            {weeks.flatMap((week, w) =>
              Array.from({ length: 7 }, (_, d) => {
                const day = week[d] ?? null;
                return (
                  <span
                    key={`${w}-${d}`}
                    title={day ? `${day.count} on ${day.date}` : undefined}
                    className={cx(
                      "aspect-square w-full",
                      shape === "dot" ? "rounded-full" : "rounded-[3px]",
                      day ? "bg-line/60" : "invisible",
                    )}
                    style={day ? cellStyle(levelOf(day.count, t), palette) : undefined}
                  />
                );
              }),
            )}
          </div>
        </div>
      </div>
      {footer || legend ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          {footer ? (
            <p className="text-body text-fg-secondary">{total} contributions in the last year</p>
          ) : (
            <span />
          )}
          {legend ? <Legend palette={palette} /> : null}
        </div>
      ) : null}
    </div>
  );
}

export function WeeklyBars({ days }: { days: ContributionDay[] }) {
  const weeks = toWeeks(days);
  const totals = weeks.map((w) => w.reduce((s, d) => s + (d?.count ?? 0), 0));
  const max = Math.max(1, ...totals);
  const labels = monthLabels(weeks);
  const columns = { gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` };
  return (
    <div>
      <div
        role="img"
        aria-label="Contributions per week over the last year"
        className="grid h-28 items-end gap-[3px]"
        style={columns}
      >
        {totals.map((t, i) => (
          <span
            key={i}
            title={`${t} that week`}
            className={cx("w-full rounded-t-[2px]", t ? "bg-fg" : "bg-line")}
            style={{ height: t ? `${Math.max(6, (t / max) * 100)}%` : "2px", opacity: t ? 0.85 : 1 }}
          />
        ))}
      </div>
      <div className="mt-2 grid gap-[3px] text-xs text-fg-muted" style={columns} aria-hidden="true">
        {labels.map(({ label, week }) => (
          <span key={label + week} className="whitespace-nowrap" style={{ gridColumnStart: week + 1 }}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function StatRow({ days }: { days: ContributionDay[] }) {
  const s = stats(days);
  const items = [
    { label: "Contributions", value: s.total },
    { label: "Active days", value: s.active },
    { label: "Longest streak", value: `${s.longest} ${s.longest === 1 ? "day" : "days"}` },
  ];
  return (
    <dl className="grid grid-cols-3 gap-4">
      {items.map((it) => (
        <div key={it.label}>
          <dt>
            <MicroLabel>{it.label}</MicroLabel>
          </dt>
          <dd className="mt-1.5 text-title text-fg">{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function RepoList({ repos }: { repos: { name: string; count: number }[] }) {
  return (
    <ul className="divide-y divide-dashed divide-line">
      {repos.map((r) => (
        <li key={r.name} className="flex items-center justify-between py-2.5 text-body">
          <span className="font-mono text-fg">majedkalmutairi/{r.name}</span>
          <span className="text-fg-muted">
            {r.count} {r.count === 1 ? "commit" : "commits"}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Frame({ children, className }: { children: React.ReactNode; className?: string }) {
  return <DashedCard className={cx("p-6 sm:p-8", className)}>{children}</DashedCard>;
}
