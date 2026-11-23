import { type AboutData, defaultAboutData } from "./about-types";
import { getDb } from "./db";

export * from "./about-types";

export async function getAboutData(): Promise<AboutData> {
  // 1. Direct MongoDB fetch
  try {
    const db = await getDb();
    if (db) {
      const aboutDoc = await db.collection("about").findOne({});
      if (aboutDoc) {
        const { _id, ...rest } = aboutDoc;
        const serialized = JSON.parse(
          JSON.stringify({
            ...defaultAboutData,
            ...rest,
            ...(_id ? { _id: _id.toString() } : {}),
          }),
        ) as AboutData;

        return serialized;
      }
    }
  } catch (dbErr) {
    console.error("Error fetching about data from MongoDB:", dbErr);
  }

  // 2. Fallback to Express backend if configured
  const rawBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.trim();
  if (rawBackendUrl && !rawBackendUrl.includes("localhost")) {
    const backendUrl = rawBackendUrl.replace(/\/+$/, "");
    try {
      const res = await fetch(`${backendUrl}/api/about`, {
        cache: "no-store",
      });
      if (res.ok) {
        const data = (await res.json()) as Partial<AboutData>;
        return {
          ...defaultAboutData,
          ...data,
        };
      }
    } catch {
      // Backend fetch failed; fall back to defaultAboutData
    }
  }

  return defaultAboutData;
}
