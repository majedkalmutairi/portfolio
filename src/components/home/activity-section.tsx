import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContributionGraph, type ContributionDay } from "@/components/ui/contribution-graph";
import { site } from "@/content/site";

const USER = "majedkalmutairi";

const QUERY = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar { weeks { contributionDays { date contributionCount } } }
    }
  }
}`;

type CalendarResponse = {
  data?: {
    user?: {
      contributionsCollection: {
        contributionCalendar: {
          weeks: { contributionDays: { date: string; contributionCount: number }[] }[];
        };
      };
    };
  };
};

async function fetchContributions(): Promise<ContributionDay[] | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;
  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY, variables: { login: USER } }),
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!response.ok) return null;
    const json = (await response.json()) as CalendarResponse;
    const weeks = json.data?.user?.contributionsCollection.contributionCalendar.weeks;
    if (!weeks) return null;
    return weeks.flatMap((week) =>
      week.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount })),
    );
  } catch {
    return null;
  }
}

export async function ActivitySection() {
  if (!site.flags.showActivityGraph) return null;
  const days = await fetchContributions();
  if (!days || days.length === 0) return null;
  return (
    <Container>
      <Section id="activity" heading="GitHub Activity">
        <ContributionGraph days={days} />
      </Section>
    </Container>
  );
}
