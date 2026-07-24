import { NextResponse } from "next/server";

export interface ContributionDay {
  date: string;
  count: number;
  commits?: number;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "amitchandradas2004";
  const token = process.env.GITHUB_TOKEN;

  // GraphQL query to fetch user contribution calendar from GitHub API
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  try {
    if (token && token !== "your_github_token") {
      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { username },
        }),
        next: { revalidate: 3600 }, // Cache for 1 hour
      });

      if (response.ok) {
        const json = await response.json();
        const calendar =
          json?.data?.user?.contributionsCollection?.contributionCalendar;

        if (calendar) {
          const days: ContributionDay[] = [];
          calendar.weeks.forEach(
            (week: {
              contributionDays: Array<{
                date: string;
                contributionCount: number;
              }>;
            }) => {
              week.contributionDays.forEach((day) => {
                days.push({
                  date: day.date,
                  count: day.contributionCount,
                  commits: day.contributionCount > 0 ? day.contributionCount : 0,
                });
              });
            }
          );

          return NextResponse.json({
            success: true,
            username,
            totalContributions: calendar.totalContributions,
            days,
          });
        }
      }
    }

    // Public REST fallback API if GITHUB_TOKEN is not configured
    const fallbackRes = await fetch(
      `https://github-contributions-api.jasonet.co/v1/${username}`,
      { next: { revalidate: 3600 } }
    );

    if (fallbackRes.ok) {
      const data = await fallbackRes.json();
      if (data && data.contributions) {
        const days: ContributionDay[] = data.contributions.map(
          (item: { date: string; count: number }) => ({
            date: item.date,
            count: item.count,
            commits: item.count > 0 ? item.count : 0,
          })
        );

        const total = days.reduce((sum, d) => sum + d.count, 0);

        return NextResponse.json({
          success: true,
          username,
          totalContributions: total,
          days,
        });
      }
    }

    return NextResponse.json(
      { success: false, error: "Unable to fetch GitHub data" },
      { status: 500 }
    );
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}
