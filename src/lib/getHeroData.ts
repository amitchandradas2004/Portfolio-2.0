import { HeroData, defaultHeroData } from "./hero-types";

export * from "./hero-types";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export async function getHeroData(): Promise<HeroData> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/hero`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return defaultHeroData;
    }

    const data = await res.json();
    return {
      ...defaultHeroData,
      ...data,
    };
  } catch (error) {
    console.error("Error fetching hero data from Express backend server:", error);
    return defaultHeroData;
  }
}
