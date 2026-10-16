import { defaultSkillsData, SkillsData } from "./skills-types";
import { getDb } from "./db";

export * from "./skills-types";

export async function getSkillsData(): Promise<SkillsData> {
  // 1. Direct MongoDB fetch first
  try {
    const db = await getDb();
    if (db) {
      let skillsDoc = await db.collection("skills").findOne({ categories: { $exists: true } });
      if (!skillsDoc) {
        skillsDoc = await db.collection("skills").findOne({});
      }
      if (skillsDoc) {
        const { _id, ...rest } = skillsDoc as any;
        return {
          ...defaultSkillsData,
          ...rest,
          _id: _id?.toString(),
        };
      }
    }
  } catch (dbErr) {
    console.error("Error fetching skills from Database:", dbErr);
  }

  // 2. Fallback to Dedicated Express Backend Server
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
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

  return defaultSkillsData;
}

