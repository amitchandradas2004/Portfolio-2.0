import { getDb } from "./db";
import { type HeroData, defaultHeroData } from "./hero-types";

export * from "./hero-types";

export async function getHeroData(): Promise<HeroData> {
  // 1. Direct MongoDB fetch
  try {
    const db = await getDb();
    if (db) {
      const heroDoc = await db.collection("hero").findOne({});
      if (heroDoc) {
        const { _id, ...rest } = heroDoc;
        const serialized = JSON.parse(
          JSON.stringify({
            ...defaultHeroData,
            ...rest,
            ...(_id ? { _id: _id.toString() } : {}),
          }),
        ) as HeroData;

        return serialized;
      }
    }
  } catch (dbErr) {
    console.error("Error fetching hero from MongoDB:", dbErr);
  }

  // 2. Fallback to Express backend if configured
  const rawBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.trim();
  if (rawBackendUrl && !rawBackendUrl.includes("localhost")) {
    const backendUrl = rawBackendUrl.replace(/\/+$/, "");
    try {
      const res = await fetch(`${backendUrl}/api/hero`, {
        cache: "no-store",
      });
      if (res.ok) {
        const data = (await res.json()) as Partial<HeroData>;
        return {
          ...defaultHeroData,
          ...data,
        };
      }
    } catch {
      // Backend fetch failed; fall back to defaultHeroData
    }
  }

  return defaultHeroData;
}
