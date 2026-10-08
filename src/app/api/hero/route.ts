import { NextResponse } from "next/server";
import { defaultHeroData } from "@/lib/hero-types";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getDb } from "@/lib/db";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/hero`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({
        ...defaultHeroData,
        ...data,
      });
    }
  } catch (error) {
    console.warn("Backend server GET fallback to direct DB:", error);
  }

  try {
    const db = await getDb();
    if (db) {
      const heroDoc = await db.collection("hero").findOne({});
      if (heroDoc) {
        return NextResponse.json({
          ...defaultHeroData,
          ...heroDoc,
        });
      }
    }
  } catch (dbErr) {
    console.error("Direct MongoDB GET error:", dbErr);
  }

  return NextResponse.json(defaultHeroData);
}

export async function PUT(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in to perform this action." },
        { status: 401 }
      );
    }

    const userRole = (session.user as Record<string, any>)?.role || "demo";
    if (userRole !== "admin") {
      return NextResponse.json(
        { error: "Demo user mode is active. Editing is disabled for guest accounts." },
        { status: 403 }
      );
    }

    const body = await request.json();

    const updateDoc = {
      greeting: body.greeting,
      name: body.name,
      designation: body.designation,
      description: body.description,
      resumeUrl: body.resumeUrl,
      imageUrl: body.imageUrl,
      githubUrl: body.githubUrl,
      linkedinUrl: body.linkedinUrl,
      leetcodeUrl: body.leetcodeUrl,
      twitterUrl: body.twitterUrl,
      email: body.email,
      techBadges: body.techBadges || defaultHeroData.techBadges,
      updatedAt: new Date(),
    };

    // 1. Forward update to Express backend server
    try {
      await fetch(`${BACKEND_URL}/api/hero`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateDoc),
      });
    } catch (backendErr) {
      console.warn("Express backend server update notice:", backendErr);
    }

    // 2. Direct MongoDB update for fail-safe persistence
    const db = await getDb();
    if (db) {
      await db.collection("hero").updateOne({}, { $set: updateDoc }, { upsert: true });
    }

    return NextResponse.json({
      success: true,
      message: "Hero section updated successfully!",
      hero: updateDoc,
    });
  } catch (error: any) {
    console.error("PUT /api/hero error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update Hero section." },
      { status: 500 }
    );
  }
}
