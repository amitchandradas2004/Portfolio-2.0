import { HeroData, defaultHeroData } from "./hero-types";
import { getDb } from "./db";

export * from "./hero-types";

export async function getHeroData(): Promise<HeroData> {
  // 1. Direct MongoDB fetch
  try {
    const db = await getDb();
    if (db) {
      const heroDoc = await db.collection("hero").findOne({});
      if (heroDoc) {
        return {
          ...defaultHeroData,
          ...heroDoc,
          _id: heroDoc._id?.toString(),
        } as HeroData;
      }
    }
  } catch (dbErr) {
    console.error("Error fetching hero from MongoDB:", dbErr);
  }

  // 2. Fallback to Express backend if configured
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (backendUrl && !backendUrl.includes("localhost")) {
    try {
      const res = await fetch(`${backendUrl}/api/hero`, {
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        return {
          ...defaultHeroData,
          ...data,
        };
      }
    } catch (err) {
      // Backend fetch failed
    }
  }

  return defaultHeroData;
}
