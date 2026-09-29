const query = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date weekday contributionCount contributionLevel } }
      }
    }
  }
}`;

const levels: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

type Day = { date: string; weekday: number; contributionCount: number; contributionLevel: string };

type Calendar = { totalContributions: number; weeks: { contributionDays: Day[] }[] };

export async function GET() {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `bearer ${process.env.GITHUB_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { login: "harunkkhan" } }),
  });
  if (!res.ok) return new Response(`GitHub request failed: ${res.status}`, { status: 502 });

  const { data, errors } = (await res.json()) as {
    data?: { user: { contributionsCollection: { contributionCalendar: Calendar } } | null };
    errors?: { message: string }[];
  };
  if (errors || !data?.user) return new Response("GitHub query failed", { status: 502 });

  const calendar = data.user.contributionsCollection.contributionCalendar;
  return Response.json(
    {
      total: calendar.totalContributions,
      days: calendar.weeks.flatMap((week) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          weekday: day.weekday,
          count: day.contributionCount,
          level: levels[day.contributionLevel],
        })),
      ),
    },
    { headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400" } },
  );
}
