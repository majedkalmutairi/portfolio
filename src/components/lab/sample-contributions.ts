import type { ContributionDay } from "@/components/ui/contribution-graph";

// SAMPLE DATA for /lab only — invented numbers so the graph's design can be judged.
// Never passed to a real page. Deterministic (same picture every reload).
export function sampleContributions(): ContributionDay[] {
  const days: ContributionDay[] = [];
  const end = new Date(Date.UTC(2026, 8, 22)); // fixed so screenshots stay comparable
  let seed = 7;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };
  for (let i = 364; i >= 0; i--) {
    const d = new Date(end);
    d.setUTCDate(end.getUTCDate() - i);
    const dow = d.getUTCDay();
    const weekend = dow === 0 || dow === 6;
    const r = rand();
    const count = r < (weekend ? 0.7 : 0.35) ? 0 : Math.ceil(r * (weekend ? 4 : 9));
    days.push({ date: d.toISOString().slice(0, 10), count });
  }
  return days;
}
