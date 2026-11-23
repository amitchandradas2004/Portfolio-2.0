import { getDb } from "./db";
import { defaultSkillsData, type SkillsData } from "./skills-types";

export * from "./skills-types";

type RawSkillsDoc = Partial<Omit<SkillsData, "_id">> & {
  _id?: { toString(): string } | string;
};

interface SkillsApiResponse {
  data?: RawSkillsDoc[];
}

export async function getSkillsData(): Promise<SkillsData> {
  // 1. Direct MongoDB fetch first
  try {
    const db = await getDb();
    if (db) {
      let skillsDoc = await db
        .collection("skills")
        .findOne({ categories: { $exists: true } });
      if (!skillsDoc) {
        skillsDoc = await db.collection("skills").findOne({});
      }
      if (skillsDoc) {
        const { _id, ...rest } = skillsDoc as unknown as RawSkillsDoc;
        const serialized = JSON.parse(
          JSON.stringify({
            ...defaultSkillsData,
            ...rest,
            ...(_id ? { _id: _id.toString() } : {}),
          }),
        ) as SkillsData;

        return serialized;
      }
    }
  } catch (dbErr) {
    console.error("Error fetching skills from Database:", dbErr);
  }

  // 2. Fallback to Dedicated Express Backend Server
  const rawBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.trim();
  const isDev = process.env.NODE_ENV === "development";
  const resolvedUrl = rawBackendUrl || (isDev ? "http://localhost:5000" : "");

  if (resolvedUrl && (isDev || !resolvedUrl.includes("localhost"))) {
    const backendUrl = resolvedUrl.replace(/\/+$/, "");
    try {
      const res = await fetch(`${backendUrl}/api/skills`, {
        cache: "no-store",
      });
      if (res.ok) {
        const payload = (await res.json()) as SkillsApiResponse & RawSkillsDoc;
        const mainDoc = Array.isArray(payload.data)
          ? (payload.data.find((d) => Array.isArray(d.categories)) ??
            payload.data[0])
          : payload;

        if (mainDoc && (mainDoc.categories || mainDoc.title)) {
          const { _id, ...restMainDoc } = mainDoc;
          return {
            ...defaultSkillsData,
            ...restMainDoc,
            ...(_id ? { _id: _id.toString() } : {}),
          };
        }
      }
    } catch (backendErr) {
      console.warn(
        "Backend server GET /api/skills fallback warning:",
        backendErr,
      );
    }
  }

  return defaultSkillsData;
}
