import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { defaultAboutData, AboutData } from "@/lib/about-types";
import { getDb } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

/**
 * Check if the request is from an authenticated admin.
 * Demo visitors and unauthenticated users are restricted from performing mutations.
 */
async function checkAdminAuth(request: Request): Promise<{ authorized: boolean; reason?: string }> {
  try {
    // 1. Explicit demo client header
    const roleHeader = request.headers.get("x-user-role");
    if (roleHeader === "demo") {
      return {
        authorized: false,
        reason: "Demo Visitor Mode: Editing or modifying the About section is restricted to admin.",
      };
    }

    // 2. Active user session from Better-Auth
    const reqHeaders = await headers();
    const session = await auth.api.getSession({
      headers: reqHeaders,
    });

    if (session && session.user) {
      const role = (session.user as any).role || "demo";
      if (role !== "admin") {
        return {
          authorized: false,
          reason: "Demo Visitor Mode: Editing or modifying the About section is restricted to admin.",
        };
      }
      return { authorized: true };
    }

    // 3. Fallback for local development if no session and no demo header
    if (process.env.NODE_ENV === "development") {
      return { authorized: true };
    }

    return { authorized: false, reason: "Unauthorized: Please log in as an administrator." };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      return { authorized: true };
    }
    console.error("Auth check error in /api/about:", error);
    return { authorized: false, reason: "Authentication verification failed." };
  }
}

// GET /api/about - Fetch dynamic about data
export async function GET() {
  // 1. Direct MongoDB fetch
  try {
    const db = await getDb();
    if (db) {
      let aboutDoc = await db.collection("about").findOne({});
      if (!aboutDoc) {
        // Seed initial default document if empty
        const { _id, ...cleanData } = defaultAboutData;
        const seedDoc = {
          ...cleanData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        const insertRes = await db.collection("about").insertOne(seedDoc as any);
        aboutDoc = { ...seedDoc, _id: insertRes.insertedId };
      }

      const { _id, ...rest } = aboutDoc as any;
      return NextResponse.json(
        {
          ...defaultAboutData,
          ...rest,
          _id: _id?.toString(),
        },
        {
          headers: {
            "Cache-Control": "no-store, max-age=0, must-revalidate",
          },
        }
      );
    }
  } catch (dbErr) {
    console.error("Direct MongoDB GET /api/about error:", dbErr);
  }

  // 2. Fallback to Express backend server if available
  try {
    const res = await fetch(`${BACKEND_URL}/api/about`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(
        {
          ...defaultAboutData,
          ...data,
        },
        {
          headers: {
            "Cache-Control": "no-store, max-age=0, must-revalidate",
          },
        }
      );
    }
  } catch (error) {
    console.warn("Backend server GET /api/about warning:", error);
  }

  return NextResponse.json(defaultAboutData, {
    headers: {
      "Cache-Control": "no-store, max-age=0, must-revalidate",
    },
  });
}

// PUT /api/about - Update entire about data (Admin only)
export async function PUT(request: Request) {
  try {
    const authCheck = await checkAdminAuth(request);
    if (!authCheck.authorized) {
      return NextResponse.json({ error: authCheck.reason }, { status: 403 });
    }

    const body = await request.json();

    const updateDoc: AboutData = {
      badgeText: body.badgeText ?? defaultAboutData.badgeText,
      title: body.title ?? defaultAboutData.title,
      highlightedTitle: body.highlightedTitle ?? defaultAboutData.highlightedTitle,
      paragraph1: body.paragraph1 ?? defaultAboutData.paragraph1,
      paragraph2: body.paragraph2 ?? defaultAboutData.paragraph2,
      paragraph3: body.paragraph3 ?? defaultAboutData.paragraph3,
      traits: Array.isArray(body.traits) ? body.traits : defaultAboutData.traits,
      cardRole: body.cardRole ?? defaultAboutData.cardRole,
      cardStatus: body.cardStatus ?? defaultAboutData.cardStatus,
      cardStatusActive: body.cardStatusActive !== undefined ? body.cardStatusActive : defaultAboutData.cardStatusActive,
      githubUsername: body.githubUsername ?? defaultAboutData.githubUsername,
      autoCountProjects: body.autoCountProjects !== undefined ? body.autoCountProjects : defaultAboutData.autoCountProjects,
      stats: Array.isArray(body.stats)
        ? body.stats.map((s: any) => ({
            id: s.id ?? "",
            label: s.label ?? "",
            value: s.value ?? "",
            sub: s.sub ?? "",
            iconKey: s.iconKey ?? "zap",
            color: s.color ?? "from-sky-500 to-blue-600",
            statType: s.statType ?? "manual",
            experienceStartDate: s.experienceStartDate ?? undefined,
            useLiveGithubCommits: s.useLiveGithubCommits ?? false,
          }))
        : defaultAboutData.stats,
      currentTechs: Array.isArray(body.currentTechs) ? body.currentTechs : defaultAboutData.currentTechs,
      learningFocus: Array.isArray(body.learningFocus) ? body.learningFocus : defaultAboutData.learningFocus,
      updatedAt: new Date().toISOString(),
    };

    // 1. Direct MongoDB update
    const db = await getDb();
    if (db) {
      await db.collection("about").updateOne({}, { $set: updateDoc }, { upsert: true });
    }

    // 2. Forward to Express backend if reachable
    try {
      await fetch(`${BACKEND_URL}/api/about`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateDoc),
      });
    } catch (backendErr) {
      // Backend is optional
    }

    // 3. Immediately revalidate Next.js cache so both homepage & dashboard reflect changes
    revalidatePath("/", "layout");
    revalidatePath("/");
    revalidatePath("/dashboard/about");

    return NextResponse.json({
      success: true,
      message: "About section updated successfully in database!",
      about: updateDoc,
    });
  } catch (error: any) {
    console.error("PUT /api/about error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update About section." },
      { status: 500 }
    );
  }
}

// PATCH /api/about - Partial update (Admin only)
export async function PATCH(request: Request) {
  return PUT(request);
}

// DELETE /api/about - Reset about section to defaults (Admin only)
export async function DELETE(request: Request) {
  try {
    const authCheck = await checkAdminAuth(request);
    if (!authCheck.authorized) {
      return NextResponse.json({ error: authCheck.reason }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const reset = searchParams.get("reset") === "true";

    const db = await getDb();
    if (db) {
      if (reset) {
        await db.collection("about").updateOne(
          {},
          { $set: { ...defaultAboutData, updatedAt: new Date().toISOString() } },
          { upsert: true }
        );
      } else {
        await db.collection("about").deleteMany({});
      }
    }

    // Revalidate paths
    revalidatePath("/", "layout");
    revalidatePath("/");
    revalidatePath("/dashboard/about");

    return NextResponse.json({
      success: true,
      message: "About section reset to default configuration.",
      about: defaultAboutData,
    });
  } catch (error: any) {
    console.error("DELETE /api/about error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to reset About section." },
      { status: 500 }
    );
  }
}
