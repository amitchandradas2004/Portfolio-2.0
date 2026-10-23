import { AboutData, defaultAboutData } from "./about-types";
import { getDb } from "./db";

export * from "./about-types";

export async function getAboutData(): Promise<AboutData> {
  // 1. Direct MongoDB fetch
  try {
    const db = await getDb();
    if (db) {
      let aboutDoc = await db.collection("about").findOne({});
      if (aboutDoc) {
        const { _id, ...rest } = aboutDoc;
        return {
          ...defaultAboutData,
          ...rest,
          _id: _id?.toString(),
        } as AboutData;
      }
    }
  } catch (dbErr) {
    console.error("Error fetching about data from MongoDB:", dbErr);
  }

  // 2. Fallback to Express backend if configured
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (backendUrl && !backendUrl.includes("localhost")) {
    try {
      const res = await fetch(`${backendUrl}/api/about`, {
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        return {
          ...defaultAboutData,
          ...data,
        };
      }
    } catch (err) {
      // Backend fetch failed
    }
  }

  return defaultAboutData;
}
