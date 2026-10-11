import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { defaultSkillsData, SkillsData, SkillItem, SkillCategory, LearningItem } from "@/lib/skills-types";
import { getDb } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

/**
 * Check if the current request is from an authenticated admin.
 * If user session has role === 'admin', allows full access.
 * If role is 'demo' or not authenticated, denies modifying operations.
 */
async function checkAdminAuth(request: Request): Promise<{ authorized: boolean; reason?: string }> {
  try {
    const reqHeaders = await headers();
    const session = await auth.api.getSession({
      headers: reqHeaders,
    });

    if (session && session.user) {
      const role = (session.user as any).role || "demo";
      if (role !== "admin") {
        return {
          authorized: false,
          reason: "Demo Visitor Mode: Editing, adding, or deleting skills is restricted to admin.",
        };
      }
      return { authorized: true };
    }

    // Check optional client role header
    const roleHeader = request.headers.get("x-user-role");
    if (roleHeader === "demo") {
      return { authorized: false, reason: "Demo Visitor Mode: Editing skills is disabled." };
    }

    // In local development, permit if no explicit demo header
    if (process.env.NODE_ENV === "development") {
      return { authorized: true };
    }

    return { authorized: false, reason: "Unauthorized: Please log in as an administrator." };
  } catch (error) {
    console.error("Auth check error in /api/skills:", error);
    return { authorized: false, reason: "Authentication verification failed." };
  }
}

// 1. GET /api/skills - Prioritize Dedicated Express Backend Server
export async function GET() {
  // 1. Fetch from Dedicated Express Backend Server
  try {
    const res = await fetch(`${BACKEND_URL}/api/skills`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      const mainDoc = Array.isArray(data.data)
        ? data.data.find((d: any) => Array.isArray(d.categories)) || data.data[0]
        : data;
      if (mainDoc && (mainDoc.categories || mainDoc.title)) {
        return NextResponse.json(
          {
            ...defaultSkillsData,
            ...mainDoc,
            _id: mainDoc._id?.toString(),
          },
          {
            headers: {
              "Cache-Control": "no-store, max-age=0, must-revalidate",
            },
          }
        );
      }
    }
  } catch (backendErr) {
    console.warn("Express backend GET /api/skills warning:", backendErr);
  }

  // 2. Fallback to Direct MongoDB if backend server unreachable
  try {
    const db = await getDb();
    if (db) {
      let skillsDoc = await db.collection("skills").findOne({});

      if (!skillsDoc) {
        const { _id, ...cleanData } = defaultSkillsData;
        const seedDoc = {
          ...cleanData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        const insertRes = await db.collection("skills").insertOne(seedDoc);
        skillsDoc = { ...seedDoc, _id: insertRes.insertedId };
      }

      const { _id, ...rest } = skillsDoc as any;
      return NextResponse.json(
        {
          ...defaultSkillsData,
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
    console.error("Direct MongoDB GET /api/skills error:", dbErr);
  }

  return NextResponse.json(defaultSkillsData, {
    headers: {
      "Cache-Control": "no-store, max-age=0, must-revalidate",
    },
  });
}

// 2. PUT /api/skills - Maintain update on Dedicated Express Backend Server
export async function PUT(request: Request) {
  try {
    const authCheck = await checkAdminAuth(request);
    if (!authCheck.authorized) {
      return NextResponse.json({ error: authCheck.reason }, { status: 403 });
    }

    const body = await request.json();

    const updateDoc: SkillsData = {
      badgeText: body.badgeText ?? defaultSkillsData.badgeText,
      title: body.title ?? defaultSkillsData.title,
      highlightedTitle: body.highlightedTitle ?? defaultSkillsData.highlightedTitle,
      description: body.description ?? defaultSkillsData.description,
      learningBadgeText: body.learningBadgeText ?? defaultSkillsData.learningBadgeText,
      learningSectionTitle: body.learningSectionTitle ?? defaultSkillsData.learningSectionTitle,
      learningSectionSubtitle: body.learningSectionSubtitle ?? defaultSkillsData.learningSectionSubtitle,
      categories: body.categories ?? defaultSkillsData.categories,
      learningItems: body.learningItems ?? defaultSkillsData.learningItems,
      updatedAt: new Date().toISOString(),
    };

    // 1. Forward CRUD update directly to dedicated Express backend server
    try {
      await fetch(`${BACKEND_URL}/api/skills`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateDoc),
      });
    } catch (backendErr) {
      console.warn("Backend server PUT forwarding failed:", backendErr);
    }

    // 2. Direct MongoDB update
    const db = await getDb();
    if (db) {
      await db.collection("skills").updateOne({}, { $set: updateDoc }, { upsert: true });
    }

    // Revalidate pages so homepage and dashboard reflect immediately
    revalidatePath("/", "layout");
    revalidatePath("/");
    revalidatePath("/dashboard/skills");

    return NextResponse.json({
      success: true,
      message: "Skills updated successfully on backend server and database!",
      skills: updateDoc,
    });
  } catch (error: any) {
    console.error("PUT /api/skills error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update skills." },
      { status: 500 }
    );
  }
}

// 3. POST /api/skills - Add a new skill or new category
export async function POST(request: Request) {
  try {
    const authCheck = await checkAdminAuth(request);
    if (!authCheck.authorized) {
      return NextResponse.json({ error: authCheck.reason }, { status: 403 });
    }

    const body = await request.json();
    const { action, skill, categoryId, category, learningItem } = body;

    // 1. Forward request to Dedicated Express Backend Server
    try {
      await fetch(`${BACKEND_URL}/api/skills`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (backendErr) {
      console.warn("Backend server POST forwarding failed:", backendErr);
    }

    const db = await getDb();
    if (!db) {
      return NextResponse.json({ error: "Database unavailable." }, { status: 500 });
    }

    let skillsDoc = (await db.collection("skills").findOne({})) as unknown as SkillsData | null;
    if (!skillsDoc) {
      skillsDoc = { ...defaultSkillsData };
    }

    // Action A: Add a new skill to a specific category
    if (action === "add-skill" || (!action && skill)) {
      if (!skill || !skill.name) {
        return NextResponse.json({ error: "Skill name is required." }, { status: 400 });
      }

      const newSkill: SkillItem = {
        id: skill.id || skill.name.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Date.now(),
        name: skill.name,
        iconKey: skill.iconKey || "code",
        iconColor: skill.iconColor || "text-sky-400",
        proficiency: typeof skill.proficiency === "number" ? skill.proficiency : 85,
        level: skill.level || "Proficient",
        enabled: skill.enabled !== false,
      };

      const targetCatId = categoryId || skill.categoryId || skillsDoc.categories[0]?.id || "frontend";
      let categoryFound = false;

      const updatedCategories = skillsDoc.categories.map((cat) => {
        if (cat.id === targetCatId) {
          categoryFound = true;
          return {
            ...cat,
            skills: [...cat.skills, newSkill],
          };
        }
        return cat;
      });

      if (!categoryFound && updatedCategories.length > 0) {
        updatedCategories[0].skills.push(newSkill);
      }

      await db.collection("skills").updateOne(
        {},
        {
          $set: {
            categories: updatedCategories,
            updatedAt: new Date().toISOString(),
          },
        },
        { upsert: true }
      );

      revalidatePath("/", "layout");
      revalidatePath("/");
      revalidatePath("/dashboard/skills");

      return NextResponse.json({
        success: true,
        message: `Skill "${newSkill.name}" added successfully!`,
        skill: newSkill,
        categories: updatedCategories,
      });
    }

    // Action B: Add a new category
    if (action === "add-category" || category) {
      if (!category || !category.title) {
        return NextResponse.json({ error: "Category title is required." }, { status: 400 });
      }

      const newCategory: SkillCategory = {
        id: category.id || category.title.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Date.now(),
        title: category.title,
        iconKey: category.iconKey || "layout",
        iconColor: category.iconColor || "text-sky-500",
        badgeBg: category.badgeBg || "bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400",
        glowColor: category.glowColor || "from-sky-500/20 via-blue-500/10 to-transparent",
        skills: category.skills || [],
      };

      const updatedCategories = [...skillsDoc.categories, newCategory];

      await db.collection("skills").updateOne(
        {},
        {
          $set: {
            categories: updatedCategories,
            updatedAt: new Date().toISOString(),
          },
        },
        { upsert: true }
      );

      revalidatePath("/", "layout");
      revalidatePath("/");
      revalidatePath("/dashboard/skills");

      return NextResponse.json({
        success: true,
        message: `Category "${newCategory.title}" created successfully!`,
        category: newCategory,
        categories: updatedCategories,
      });
    }

    // Action C: Add a new Learning item
    if (action === "add-learning" || learningItem) {
      if (!learningItem || !learningItem.name) {
        return NextResponse.json({ error: "Learning item name is required." }, { status: 400 });
      }

      const newItem: LearningItem = {
        id: learningItem.id || learningItem.name.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Date.now(),
        name: learningItem.name,
        iconKey: learningItem.iconKey || "brain",
        color: learningItem.color || "text-purple-400",
      };

      const updatedLearning = [...(skillsDoc.learningItems || []), newItem];

      await db.collection("skills").updateOne(
        {},
        {
          $set: {
            learningItems: updatedLearning,
            updatedAt: new Date().toISOString(),
          },
        },
        { upsert: true }
      );

      revalidatePath("/", "layout");
      revalidatePath("/");
      revalidatePath("/dashboard/skills");

      return NextResponse.json({
        success: true,
        message: `Learning item "${newItem.name}" added successfully!`,
        learningItem: newItem,
        learningItems: updatedLearning,
      });
    }

    return NextResponse.json({ error: "Invalid POST request body." }, { status: 400 });
  } catch (error: any) {
    console.error("POST /api/skills error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create skill." },
      { status: 500 }
    );
  }
}

// 4. PATCH /api/skills - Update a single skill or category or learning item
export async function PATCH(request: Request) {
  try {
    const authCheck = await checkAdminAuth(request);
    if (!authCheck.authorized) {
      return NextResponse.json({ error: authCheck.reason }, { status: 403 });
    }

    const body = await request.json();
    const { action, skillId, skillData, categoryId, categoryData, learningId, learningData } = body;

    const db = await getDb();
    if (!db) {
      return NextResponse.json({ error: "Database unavailable." }, { status: 500 });
    }

    let skillsDoc = (await db.collection("skills").findOne({})) as unknown as SkillsData | null;
    if (!skillsDoc) {
      skillsDoc = { ...defaultSkillsData };
    }

    // Action A: Update a single skill
    if (skillId && skillData) {
      let skillUpdated = false;
      let targetCatId = categoryId; // Optional category change

      // If categoryId was changed, remove from old category and add to new category
      let foundSkill: SkillItem | null = null;
      let originalCatId = "";

      for (const cat of skillsDoc.categories) {
        const found = cat.skills.find((s) => s.id === skillId);
        if (found) {
          foundSkill = found;
          originalCatId = cat.id;
          break;
        }
      }

      if (!foundSkill) {
        return NextResponse.json({ error: `Skill with ID "${skillId}" not found.` }, { status: 404 });
      }

      const mergedSkill: SkillItem = {
        ...foundSkill,
        ...skillData,
        id: skillId,
      };

      let updatedCategories = skillsDoc.categories;

      if (targetCatId && targetCatId !== originalCatId) {
        // Move to target category
        updatedCategories = updatedCategories.map((cat) => {
          if (cat.id === originalCatId) {
            return { ...cat, skills: cat.skills.filter((s) => s.id !== skillId) };
          }
          if (cat.id === targetCatId) {
            return { ...cat, skills: [...cat.skills, mergedSkill] };
          }
          return cat;
        });
      } else {
        // Update in place
        updatedCategories = updatedCategories.map((cat) => ({
          ...cat,
          skills: cat.skills.map((s) => (s.id === skillId ? mergedSkill : s)),
        }));
      }

      await db.collection("skills").updateOne(
        {},
        {
          $set: {
            categories: updatedCategories,
            updatedAt: new Date().toISOString(),
          },
        },
        { upsert: true }
      );

      revalidatePath("/", "layout");
      revalidatePath("/");
      revalidatePath("/dashboard/skills");

      return NextResponse.json({
        success: true,
        message: `Skill "${mergedSkill.name}" updated successfully!`,
        skill: mergedSkill,
        categories: updatedCategories,
      });
    }

    // Action B: Update a category
    if (categoryId && categoryData) {
      const updatedCategories = skillsDoc.categories.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            ...categoryData,
            id: categoryId,
          };
        }
        return cat;
      });

      await db.collection("skills").updateOne(
        {},
        {
          $set: {
            categories: updatedCategories,
            updatedAt: new Date().toISOString(),
          },
        },
        { upsert: true }
      );

      revalidatePath("/", "layout");
      revalidatePath("/");
      revalidatePath("/dashboard/skills");

      return NextResponse.json({
        success: true,
        message: `Category updated successfully!`,
        categories: updatedCategories,
      });
    }

    // Action C: Update a learning item
    if (learningId && learningData) {
      const updatedLearning = (skillsDoc.learningItems || []).map((item) => {
        if (item.id === learningId) {
          return { ...item, ...learningData, id: learningId };
        }
        return item;
      });

      await db.collection("skills").updateOne(
        {},
        {
          $set: {
            learningItems: updatedLearning,
            updatedAt: new Date().toISOString(),
          },
        },
        { upsert: true }
      );

      revalidatePath("/", "layout");
      revalidatePath("/");
      revalidatePath("/dashboard/skills");

      return NextResponse.json({
        success: true,
        message: `Learning item updated successfully!`,
        learningItems: updatedLearning,
      });
    }

    return NextResponse.json({ error: "Invalid PATCH request payload." }, { status: 400 });
  } catch (error: any) {
    console.error("PATCH /api/skills error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update skill item." },
      { status: 500 }
    );
  }
}

// 5. DELETE /api/skills - Delete a skill, category, or reset all
export async function DELETE(request: Request) {
  try {
    const authCheck = await checkAdminAuth(request);
    if (!authCheck.authorized) {
      return NextResponse.json({ error: authCheck.reason }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const skillId = searchParams.get("skillId");
    const categoryId = searchParams.get("categoryId");
    const learningId = searchParams.get("learningId");
    const reset = searchParams.get("reset") === "true";

    // 1. Forward delete request to Dedicated Express Backend Server
    try {
      const q = reset ? "?reset=true" : skillId ? `/${skillId}` : "";
      await fetch(`${BACKEND_URL}/api/skills${q}`, {
        method: "DELETE",
      });
    } catch (backendErr) {
      console.warn("Backend server DELETE forwarding failed:", backendErr);
    }

    const db = await getDb();
    if (!db) {
      return NextResponse.json({ error: "Database unavailable." }, { status: 500 });
    }

    // A. Reset all to defaults
    if (reset) {
      const resetDoc = {
        ...defaultSkillsData,
        updatedAt: new Date().toISOString(),
      };
      await db.collection("skills").updateOne({}, { $set: resetDoc }, { upsert: true });

      revalidatePath("/", "layout");
      revalidatePath("/");
      revalidatePath("/dashboard/skills");

      return NextResponse.json({
        success: true,
        message: "Skills reset to default configuration successfully.",
        skills: resetDoc,
      });
    }

    let skillsDoc = (await db.collection("skills").findOne({})) as unknown as SkillsData | null;
    if (!skillsDoc) {
      skillsDoc = { ...defaultSkillsData };
    }

    // B. Delete a skill by skillId
    if (skillId) {
      let skillName = "";
      const updatedCategories = skillsDoc.categories.map((cat) => {
        const found = cat.skills.find((s) => s.id === skillId);
        if (found) skillName = found.name;
        return {
          ...cat,
          skills: cat.skills.filter((s) => s.id !== skillId),
        };
      });

      await db.collection("skills").updateOne(
        {},
        {
          $set: {
            categories: updatedCategories,
            updatedAt: new Date().toISOString(),
          },
        },
        { upsert: true }
      );

      revalidatePath("/", "layout");
      revalidatePath("/");
      revalidatePath("/dashboard/skills");

      return NextResponse.json({
        success: true,
        message: skillName ? `Skill "${skillName}" deleted successfully.` : "Skill deleted successfully.",
        categories: updatedCategories,
      });
    }

    // C. Delete an entire category by categoryId
    if (categoryId) {
      const categoryToDelete = skillsDoc.categories.find((c) => c.id === categoryId);
      const updatedCategories = skillsDoc.categories.filter((cat) => cat.id !== categoryId);

      await db.collection("skills").updateOne(
        {},
        {
          $set: {
            categories: updatedCategories,
            updatedAt: new Date().toISOString(),
          },
        },
        { upsert: true }
      );

      revalidatePath("/", "layout");
      revalidatePath("/");
      revalidatePath("/dashboard/skills");

      return NextResponse.json({
        success: true,
        message: `Category "${categoryToDelete?.title || categoryId}" deleted successfully.`,
        categories: updatedCategories,
      });
    }

    // D. Delete a learning item by learningId
    if (learningId) {
      const updatedLearning = (skillsDoc.learningItems || []).filter((item) => item.id !== learningId);

      await db.collection("skills").updateOne(
        {},
        {
          $set: {
            learningItems: updatedLearning,
            updatedAt: new Date().toISOString(),
          },
        },
        { upsert: true }
      );

      revalidatePath("/", "layout");
      revalidatePath("/");
      revalidatePath("/dashboard/skills");

      return NextResponse.json({
        success: true,
        message: "Learning item deleted successfully.",
        learningItems: updatedLearning,
      });
    }

    return NextResponse.json(
      { error: "Provide a skillId, categoryId, learningId, or reset=true parameter." },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("DELETE /api/skills error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete item." },
      { status: 500 }
    );
  }
}
