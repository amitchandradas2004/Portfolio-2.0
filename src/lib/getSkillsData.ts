import { defaultSkillsData, SkillsData } from "./skills-types";
import { getDb } from "./db";

export * from "./skills-types";

export async function getSkillsData(): Promise<SkillsData> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  // 1. Fetch from Dedicated Express Backend Server
  try {
    const res = await fetch(`${backendUrl}/api/skills`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      const mainDoc = Array.isArray(data.data)
        ? data.data.find((d: any) => Array.isArray(d.categories)) || data.data[0]
        : data;
      if (mainDoc && (mainDoc.categories || mainDoc.title)) {
        return {
          ...defaultSkillsData,
          ...mainDoc,
          _id: mainDoc._id?.toString(),
        };
      }
    }
  } catch (backendErr) {
    console.warn("Backend server GET /api/skills fallback warning:", backendErr);
  }

  // 2. Direct MongoDB fallback
  try {
    const db = await getDb();
    if (db) {
      const skillsDoc = await db.collection("skills").findOne({});
      if (skillsDoc) {
        return {
          ...defaultSkillsData,
          ...skillsDoc,
          _id: skillsDoc._id?.toString(),
        } as SkillsData;
      }
    }
  } catch (dbErr) {
    console.error("Error fetching skills from MongoDB:", dbErr);
  }

  return defaultSkillsData;
}
