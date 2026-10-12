import type { ReactNode } from "react";
import { Frame, Heatmap, RepoList, StatRow, WeeklyBars } from "@/components/lab/graph-variants";
import { realDays, realRepos } from "@/components/lab/real-contributions";
import { ContributionGraph } from "@/components/ui/contribution-graph";
import { MicroLabel } from "@/components/ui/micro-label";

const last26 = realDays.slice(-26 * 7);
const last12 = realDays.slice(-12 * 7);

function Variant({
  n,
  title,
  note,
  children,
}: {
  n: number;
  title: string;
  note: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg font-semibold tracking-tight text-fg">
        {n} · {title}
      </h2>
      <p className="mt-1 text-body text-fg-secondary">{note}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function GraphLab() {
  return (
    <div className="space-y-16">
      <div>
        <MicroLabel mono className="block">
          GitHub activity — picker
        </MicroLabel>
        <p className="mt-2 text-body text-fg-secondary">
          Your real numbers from GitHub (snapshot taken today). Toggle the theme to see both. Hover a square
          for its day. Say a number, or mix two.
        </p>
      </div>

      <Variant n={1} title="What the site has now" note="Round dots, GitHub's greens, the whole year.">
        <ContributionGraph days={realDays} />
      </Variant>

      <Variant
        n={2}
        title="GitHub classic"
        note="Small rounded squares like github.com, greens scaled to your own days so a 3-commit day isn't invisible, with a Less → More key."
      >
        <Frame>
          <Heatmap days={realDays} palette="green" shape="square" legend />
        </Frame>
      </Variant>

      <Variant
        n={3}
        title="Monochrome squares"
        note="Same grid, but in the site's own text colour instead of green, so it matches everything else on the page."
      >
        <Frame>
          <Heatmap days={realDays} palette="mono" shape="square" legend />
        </Frame>
      </Variant>

      <Variant
        n={4}
        title="Last six months, bigger"
        note="Only the last 26 weeks, with bigger squares, so the graph isn't mostly empty. Grows to a full year as you keep committing."
      >
        <Frame>
          <Heatmap days={last26} palette="green" shape="square" cell="18px" legend />
        </Frame>
      </Variant>

      <Variant
        n={5}
        title="Numbers + weekly bars"
        note="Three real numbers on top, then one bar per week for the year. Reads in two seconds; no grid of empty squares."
      >
        <Frame className="space-y-8">
          <StatRow days={realDays} />
          <WeeklyBars days={realDays} />
        </Frame>
      </Variant>

      <Variant
        n={6}
        title="Numbers + recent weeks + public repos"
        note="The three numbers, the last 12 weeks as a small monochrome grid, and which public repositories the commits went to."
      >
        <Frame className="space-y-8">
          <StatRow days={realDays} />
          <Heatmap days={last12} palette="mono" shape="square" cell="16px" footer={false} />
          <RepoList repos={realRepos} />
        </Frame>
      </Variant>
    </div>
  );
}
