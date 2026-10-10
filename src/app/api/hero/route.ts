import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { defaultHeroData, HeroData } from "@/lib/hero-types";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export async function GET() {
  // 1. Fetch live data directly from MongoDB database
  try {
    const db = await getDb();
    if (db) {
      const heroDoc = await db.collection("hero").findOne({});
      if (heroDoc) {
        const { _id, ...rest } = heroDoc;
        return NextResponse.json(
          {
            ...defaultHeroData,
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
    }
  } catch (dbErr) {
    console.error("Direct MongoDB GET error:", dbErr);
  }

  // 2. Fallback to Express backend server if configured
  try {
    const res = await fetch(`${BACKEND_URL}/api/hero`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(
        {
          ...defaultHeroData,
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
    console.warn("Backend server GET fallback warning:", error);
  }

  return NextResponse.json(defaultHeroData, {
    headers: {
      "Cache-Control": "no-store, max-age=0, must-revalidate",
    },
  });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const updateDoc: HeroData = {
      greeting: body.greeting ?? defaultHeroData.greeting,
      name: body.name ?? defaultHeroData.name,
      designation: body.designation ?? defaultHeroData.designation,
      description: body.description ?? defaultHeroData.description,
      availabilityStatus: body.availabilityStatus ?? defaultHeroData.availabilityStatus,
      isAvailable: body.isAvailable ?? defaultHeroData.isAvailable,
      locationText: body.locationText ?? defaultHeroData.locationText,
      resumeUrl: body.resumeUrl ?? defaultHeroData.resumeUrl,
      imageUrl: body.imageUrl ?? defaultHeroData.imageUrl,
      githubUrl: body.githubUrl ?? defaultHeroData.githubUrl,
      linkedinUrl: body.linkedinUrl ?? defaultHeroData.linkedinUrl,
      leetcodeUrl: body.leetcodeUrl ?? defaultHeroData.leetcodeUrl,
      twitterUrl: body.twitterUrl ?? defaultHeroData.twitterUrl,
      email: body.email ?? defaultHeroData.email,
      techBadges: body.techBadges || defaultHeroData.techBadges,
      updatedAt: new Date().toISOString(),
    };

    // 1. Direct MongoDB database update
    const db = await getDb();
    if (db) {
      await db.collection("hero").updateOne({}, { $set: updateDoc }, { upsert: true });
    }

    // 2. Forward update to Express backend server if available
    try {
      await fetch(`${BACKEND_URL}/api/hero`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateDoc),
      });
    } catch (backendErr) {
      // Express backend optional
    }

    // 3. Immediately revalidate Next.js cache so both homepage & dashboard reflect changes
    revalidatePath("/", "layout");
    revalidatePath("/");
    revalidatePath("/dashboard/hero");

    return NextResponse.json({
      success: true,
      message: "Hero section updated successfully in database!",
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

export async function PATCH(request: Request) {
  return PUT(request);
}

export async function DELETE() {
  try {
    const db = await getDb();
    if (db) {
      await db.collection("hero").deleteMany({});
    }

    revalidatePath("/", "layout");
    revalidatePath("/");
    revalidatePath("/dashboard/hero");

    return NextResponse.json({
      success: true,
      message: "Hero section reset in database.",
      hero: defaultHeroData,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to reset Hero section." },
      { status: 500 }
    );
  }
}
