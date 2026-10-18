"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useUserRole } from "@/hooks/useUserRole";
import {
  defaultSkillsData,
  SkillsData,
  SkillItem,
  SkillCategory,
  LearningItem,
} from "@/lib/skills-types";
import {
  renderCategoryIcon,
  POPULAR_SKILL_ICONS,
  CATEGORY_ICON_OPTIONS,
} from "@/lib/skill-icons";
import { NiceSelectOption } from "@/components/dashboard/NiceSelect";
import {
  SkillsHeader,
  SkillsNavTabs,
  SkillDashboardTab,
  SkillsOverviewTab,
  SkillsCategoriesTab,
  SkillsLearningTab,
  SkillsSettingsTab,
  SkillsPreviewTab,
  SkillModal,
  DeleteSkillModal,
  CategoryModal,
  DeleteCategoryModal,
  LearningModal,
  DeleteLearningModal,
  ResetDefaultsModal,
} from "@/components/dashboard/skills";

interface SkillsDashboardClientProps {
  initialData: SkillsData;
}

export function SkillsDashboardClient({ initialData }: SkillsDashboardClientProps) {
  const { isAdmin, isReadOnly } = useUserRole();

  const [formData, setFormData] = useState<SkillsData>(initialData || defaultSkillsData);
  const [lastSavedData, setLastSavedData] = useState<SkillsData>(initialData || defaultSkillsData);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(true);

  // Notifications
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  // Navigation & Filtering
  const [activeTab, setActiveTab] = useState<SkillDashboardTab>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");

  // Modals state
  const [skillModalState, setSkillModalState] = useState<{
    isOpen: boolean;
    mode: "add" | "edit";
    categoryId: string;
    skill: SkillItem;
  }>({
    isOpen: false,
    mode: "add",
    categoryId: "",
    skill: {
      id: "",
      name: "",
      iconKey: "code",
      iconColor: "text-sky-400",
      proficiency: 90,
      level: "Advanced",
      enabled: true,
    },
  });

  const [deleteSkillModal, setDeleteSkillModal] = useState<{
    isOpen: boolean;
    skillId: string;
    skillName: string;
    categoryId: string;
  }>({
    isOpen: false,
    skillId: "",
    skillName: "",
    categoryId: "",
  });

  const [categoryModalState, setCategoryModalState] = useState<{
    isOpen: boolean;
    mode: "add" | "edit";
    category: SkillCategory;
  }>({
    isOpen: false,
    mode: "add",
    category: {
      id: "",
      title: "",
      iconKey: "layout",
      iconColor: "text-sky-500",
      badgeBg: "bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400",
      glowColor: "from-sky-500/20 via-blue-500/10 to-transparent",
      skills: [],
    },
  });

  const [deleteCategoryModal, setDeleteCategoryModal] = useState<{
    isOpen: boolean;
    categoryId: string;
    categoryTitle: string;
  }>({
    isOpen: false,
    categoryId: "",
    categoryTitle: "",
  });

  const [learningModalState, setLearningModalState] = useState<{
    isOpen: boolean;
    mode: "add" | "edit";
    item: LearningItem;
  }>({
    isOpen: false,
    mode: "add",
    item: {
      id: "",
      name: "",
      iconKey: "brain",
      color: "text-purple-400",
    },
  });

  const [deleteLearningModal, setDeleteLearningModal] = useState<{
    isOpen: boolean;
    itemId: string;
    itemName: string;
  }>({
    isOpen: false,
    itemId: "",
    itemName: "",
  });

  const [showResetModal, setShowResetModal] = useState(false);
  const [iconSearchTerm, setIconSearchTerm] = useState("");

  // Lock status: Only administrator users can modify skills; demo role visitors are strictly read-only
  const canEdit = isAdmin && !isReadOnly;
  const isInputDisabled = !canEdit || !isEditing;

  // Track differences for Save button
  const hasChanges = JSON.stringify(formData) !== JSON.stringify(lastSavedData);

  // Sync prop changes if initialData changes on server revalidation
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setLastSavedData(initialData);
    }
  }, [initialData]);

  // Total count stats
  const totalSkillsCount = useMemo(() => {
    return (formData.categories || []).reduce((acc, cat) => acc + (cat.skills?.length || 0), 0);
  }, [formData.categories]);

  // Filtered skills view
  const filteredCategories = useMemo(() => {
    let list = formData.categories || [];

    if (selectedCategoryFilter !== "all") {
      list = list.filter((cat) => cat.id === selectedCategoryFilter);
    }

    if (!searchQuery.trim()) {
      return list;
    }

    const q = searchQuery.toLowerCase().trim();
    return list
      .map((cat) => ({
        ...cat,
        skills: (cat.skills || []).filter(
          (s) =>
            s.name.toLowerCase().includes(q) ||
            s.iconKey.toLowerCase().includes(q) ||
            (s.level && s.level.toLowerCase().includes(q))
        ),
      }))
      .filter((cat) => cat.skills.length > 0 || cat.title.toLowerCase().includes(q));
  }, [formData.categories, selectedCategoryFilter, searchQuery]);

  // Central Persistence Function: Persists any updated skills document to MongoDB & backend
  const persistSkills = async (
    updatedData: SkillsData,
    successMessage?: string
  ): Promise<boolean> => {
    if (!canEdit) {
      setStatusMessage({
        type: "error",
        text: "Demo Visitor Mode: Modifying skills is disabled. Only administrators have write access.",
      });
      return false;
    }

    try {
      setSaving(true);
      setStatusMessage(null);

      const res = await fetch("/api/skills", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(isReadOnly ? { "x-user-role": "demo" } : {}),
        },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update skills in database.");
      }

      const savedDoc = data.skills ? { ...defaultSkillsData, ...data.skills } : updatedData;
      setFormData(savedDoc);
      setLastSavedData(savedDoc);

      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("portfolio-skills-updated", { detail: savedDoc })
        );
      }

      if (successMessage) {
        setStatusMessage({
          type: "success",
          text: successMessage,
        });
      }
      return true;
    } catch (err: any) {
      console.error("Save skills error:", err);
      setStatusMessage({
        type: "error",
        text: err.message || "Failed to save changes to database.",
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  // Save all changes explicitly (e.g., from header Save button)
  const handleSaveAll = async () => {
    if (!canEdit) {
      setStatusMessage({
        type: "error",
        text: "Demo Visitor Mode: Saving changes is restricted to administrators.",
      });
      return;
    }

    if (isInputDisabled) {
      setStatusMessage({
        type: "error",
        text: "Editing is locked. Click 'Unlock Editing' to enable saving.",
      });
      return;
    }

    await persistSkills(
      formData,
      "Skills updated successfully in MongoDB! Homepage skills section is now live with these changes."
    );
  };

  // Open Add Skill Modal
  const openAddSkillModal = (catId?: string) => {
    if (!canEdit) {
      setStatusMessage({
        type: "error",
        text: "Demo Visitor Mode: Adding skills is restricted. Only administrators can make changes.",
      });
      return;
    }

    const defaultCatId = catId || formData.categories[0]?.id || "frontend";
    setSkillModalState({
      isOpen: true,
      mode: "add",
      categoryId: defaultCatId,
      skill: {
        id: "",
        name: "",
        iconKey: "code",
        iconColor: "text-sky-400",
        proficiency: 90,
        level: "Advanced",
        enabled: true,
      },
    });
    setIconSearchTerm("");
  };

  // Open Edit Skill Modal
  const openEditSkillModal = (catId: string, skill: SkillItem) => {
    if (!canEdit) {
      setStatusMessage({
        type: "error",
        text: "Demo Visitor Mode: Editing skills is restricted. Only administrators can make changes.",
      });
      return;
    }

    setSkillModalState({
      isOpen: true,
      mode: "edit",
      categoryId: catId,
      skill: { ...skill },
    });
    setIconSearchTerm("");
  };

  // Save Skill (from modal) - immediately persists to DB
  const handleSaveSkillModal = async (e: React.FormEvent) => {
    e.preventDefault();
    const { mode, categoryId, skill } = skillModalState;

    if (!skill.name.trim()) {
      setStatusMessage({ type: "error", text: "Skill name cannot be empty." });
      return;
    }

    const skillId =
      skill.id || skill.name.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Date.now();
    const finalSkill: SkillItem = {
      ...skill,
      id: skillId,
      name: skill.name.trim(),
    };

    let updatedCategories = [...formData.categories];

    if (mode === "add") {
      updatedCategories = updatedCategories.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            skills: [...(cat.skills || []), finalSkill],
          };
        }
        return cat;
      });
    } else {
      let oldCatId = "";
      for (const cat of updatedCategories) {
        if (cat.skills.some((s) => s.id === finalSkill.id)) {
          oldCatId = cat.id;
          break;
        }
      }

      if (oldCatId && oldCatId !== categoryId) {
        updatedCategories = updatedCategories.map((cat) => {
          if (cat.id === oldCatId) {
            return { ...cat, skills: cat.skills.filter((s) => s.id !== finalSkill.id) };
          }
          if (cat.id === categoryId) {
            return { ...cat, skills: [...cat.skills, finalSkill] };
          }
          return cat;
        });
      } else {
        updatedCategories = updatedCategories.map((cat) => {
          if (cat.id === categoryId) {
            return {
              ...cat,
              skills: cat.skills.map((s) => (s.id === finalSkill.id ? finalSkill : s)),
            };
          }
          return cat;
        });
      }
    }

    const updatedFormData: SkillsData = {
      ...formData,
      categories: updatedCategories,
    };

    setFormData(updatedFormData);

    const success = await persistSkills(
      updatedFormData,
      mode === "add"
        ? `Skill "${finalSkill.name}" added and saved to database successfully!`
        : `Skill "${finalSkill.name}" updated and saved to database successfully!`
    );

    if (success) {
      setSkillModalState((prev) => ({ ...prev, isOpen: false }));
    }
  };

  // Toggle Skill visibility directly - immediately persists to DB
  const handleToggleSkill = async (catId: string, skillId: string) => {
    let toggledSkillName = "";
    const updatedCategories = formData.categories.map((cat) => {
      if (cat.id === catId) {
        return {
          ...cat,
          skills: cat.skills.map((s) => {
            if (s.id === skillId) {
              toggledSkillName = s.name;
              return { ...s, enabled: s.enabled === false ? true : false };
            }
            return s;
          }),
        };
      }
      return cat;
    });

    const updatedFormData: SkillsData = { ...formData, categories: updatedCategories };
    setFormData(updatedFormData);

    await persistSkills(
      updatedFormData,
      `Skill "${toggledSkillName || skillId}" visibility updated in database!`
    );
  };

  // Delete Skill confirmation - immediately persists to DB
  const confirmDeleteSkill = async () => {
    const { skillId, skillName, categoryId } = deleteSkillModal;
    const updatedCategories = formData.categories.map((cat) => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          skills: cat.skills.filter((s) => s.id !== skillId),
        };
      }
      return cat;
    });

    const updatedFormData: SkillsData = { ...formData, categories: updatedCategories };
    setFormData(updatedFormData);

    const success = await persistSkills(
      updatedFormData,
      `Skill "${skillName}" deleted from database successfully!`
    );

    if (success) {
      setDeleteSkillModal({ isOpen: false, skillId: "", skillName: "", categoryId: "" });
    }
  };

  // Reset defaults - immediately persists to DB
  const confirmReset = async () => {
    if (!canEdit) {
      setStatusMessage({
        type: "error",
        text: "Demo Visitor Mode: Resetting skills is disabled. Only administrators have write access.",
      });
      return;
    }
    const success = await persistSkills(
      defaultSkillsData,
      "Skills reset to default template and saved to database."
    );
    if (success) {
      setShowResetModal(false);
    }
  };

  // Category Modal Handlers
  const openAddCategoryModal = () => {
    if (!canEdit) {
      setStatusMessage({
        type: "error",
        text: "Demo Visitor Mode: Adding categories is restricted. Only administrators can make changes.",
      });
      return;
    }
    if (isInputDisabled) setIsEditing(true);
    setCategoryModalState({
      isOpen: true,
      mode: "add",
      category: {
        id: "",
        title: "",
        iconKey: "layout",
        iconColor: "text-sky-500",
        badgeBg: "bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400",
        glowColor: "from-sky-500/20 via-blue-500/10 to-transparent",
        skills: [],
      },
    });
  };

  const openEditCategoryModal = (category: SkillCategory) => {
    if (!canEdit) {
      setStatusMessage({
        type: "error",
        text: "Demo Visitor Mode: Editing categories is restricted. Only administrators can make changes.",
      });
      return;
    }
    if (isInputDisabled) setIsEditing(true);
    setCategoryModalState({
      isOpen: true,
      mode: "edit",
      category: { ...category },
    });
  };

  const handleSaveCategoryModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canEdit) {
      setStatusMessage({
        type: "error",
        text: "Demo Visitor Mode: Saving categories is restricted. Only administrators can make changes.",
      });
      return;
    }
    const { mode, category } = categoryModalState;
    if (!category.title.trim()) return;

    const catId =
      category.id || category.title.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Date.now();
    const finalCategory: SkillCategory = {
      ...category,
      id: catId,
      title: category.title.trim(),
    };

    let updated = [...formData.categories];
    if (mode === "add") {
      updated.push(finalCategory);
    } else {
      updated = updated.map((c) => (c.id === finalCategory.id ? finalCategory : c));
    }

    const updatedFormData: SkillsData = { ...formData, categories: updated };
    setFormData(updatedFormData);

    const success = await persistSkills(
      updatedFormData,
      `Category "${finalCategory.title}" saved to database successfully!`
    );

    if (success) {
      setCategoryModalState((prev) => ({ ...prev, isOpen: false }));
    }
  };

  const confirmDeleteCategory = async () => {
    if (!canEdit) {
      setStatusMessage({
        type: "error",
        text: "Demo Visitor Mode: Deleting categories is restricted. Only administrators can make changes.",
      });
      return;
    }
    const { categoryId, categoryTitle } = deleteCategoryModal;
    const updated = formData.categories.filter((c) => c.id !== categoryId);
    const updatedFormData: SkillsData = { ...formData, categories: updated };

    setFormData(updatedFormData);

    const success = await persistSkills(
      updatedFormData,
      `Category "${categoryTitle}" removed from database successfully!`
    );

    if (success) {
      setDeleteCategoryModal({ isOpen: false, categoryId: "", categoryTitle: "" });
    }
  };

  // Learning Modal Handlers
  const openAddLearningModal = () => {
    if (!canEdit) {
      setStatusMessage({
        type: "error",
        text: "Demo Visitor Mode: Adding learning items is restricted. Only administrators can make changes.",
      });
      return;
    }
    if (isInputDisabled) setIsEditing(true);
    setLearningModalState({
      isOpen: true,
      mode: "add",
      item: { id: "", name: "", iconKey: "brain", color: "text-purple-400" },
    });
  };

  const openEditLearningModal = (item: LearningItem) => {
    if (!canEdit) {
      setStatusMessage({
        type: "error",
        text: "Demo Visitor Mode: Editing learning items is restricted. Only administrators can make changes.",
      });
      return;
    }
    if (isInputDisabled) setIsEditing(true);
    setLearningModalState({
      isOpen: true,
      mode: "edit",
      item: { ...item },
    });
  };

  const handleSaveLearningModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canEdit) {
      setStatusMessage({
        type: "error",
        text: "Demo Visitor Mode: Saving learning items is restricted. Only administrators can make changes.",
      });
      return;
    }
    const { mode, item } = learningModalState;
    if (!item.name.trim()) return;

    const itemId =
      item.id || item.name.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Date.now();
    const finalItem: LearningItem = { ...item, id: itemId, name: item.name.trim() };

    let updated = [...(formData.learningItems || [])];
    if (mode === "add") {
      updated.push(finalItem);
    } else {
      updated = updated.map((i) => (i.id === finalItem.id ? finalItem : i));
    }

    const updatedFormData: SkillsData = { ...formData, learningItems: updated };
    setFormData(updatedFormData);

    const success = await persistSkills(
      updatedFormData,
      `Learning item "${finalItem.name}" saved to database successfully!`
    );

    if (success) {
      setLearningModalState((prev) => ({ ...prev, isOpen: false }));
    }
  };

  const confirmDeleteLearning = async () => {
    if (!canEdit) {
      setStatusMessage({
        type: "error",
        text: "Demo Visitor Mode: Deleting learning items is restricted. Only administrators can make changes.",
      });
      return;
    }
    const { itemId, itemName } = deleteLearningModal;
    const updated = (formData.learningItems || []).filter(
      (i) => (i.id ? i.id !== itemId : i.name !== itemName)
    );
    const updatedFormData: SkillsData = { ...formData, learningItems: updated };

    setFormData(updatedFormData);

    const success = await persistSkills(
      updatedFormData,
      `Learning item "${itemName}" removed from database successfully!`
    );

    if (success) {
      setDeleteLearningModal({ isOpen: false, itemId: "", itemName: "" });
    }
  };

  // Filtered popular icons for modal
  const filteredPopularIcons = useMemo(() => {
    if (!iconSearchTerm.trim()) return POPULAR_SKILL_ICONS;
    const t = iconSearchTerm.toLowerCase().trim();
    return POPULAR_SKILL_ICONS.filter(
      (opt) => opt.name.toLowerCase().includes(t) || opt.key.toLowerCase().includes(t)
    );
  }, [iconSearchTerm]);

  // NiceSelect options for category picker
  const categorySelectOptions = useMemo<NiceSelectOption[]>(() => {
    return formData.categories.map((c) => ({
      value: c.id,
      label: c.title,
      icon: (
        <div className={c.iconColor || "text-sky-500"}>
          {renderCategoryIcon(c.iconKey, "w-4 h-4")}
        </div>
      ),
      badge: `${c.skills?.length || 0} skills`,
      badgeColor: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    }));
  }, [formData.categories]);

  // NiceSelect options for proficiency level
  const proficiencyLevelOptions = useMemo<NiceSelectOption[]>(
    () => [
      {
        value: "Expert",
        label: "Expert",
        description: "Mastery of advanced concepts & architectures",
        badge: "90-100%",
        badgeColor: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
      },
      {
        value: "Advanced",
        label: "Advanced",
        description: "Solid daily production & scalable architecture",
        badge: "80-90%",
        badgeColor: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
      },
      {
        value: "Proficient",
        label: "Proficient",
        description: "Confident building feature sets independently",
        badge: "70-80%",
        badgeColor: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
      },
      {
        value: "Familiar",
        label: "Familiar",
        description: "Working knowledge and understanding",
        badge: "60-70%",
        badgeColor: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
      },
      {
        value: "Learning",
        label: "Learning",
        description: "Actively studying & exploring hands-on",
        badge: "<60%",
        badgeColor: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400",
      },
    ],
    []
  );

  // NiceSelect options for category icons
  const categoryIconSelectOptions = useMemo<NiceSelectOption[]>(() => {
    return CATEGORY_ICON_OPTIONS.map((opt) => ({
      value: opt.key,
      label: opt.name,
      icon: (
        <div className="text-sky-500">
          {renderCategoryIcon(opt.key, "w-4 h-4")}
        </div>
      ),
    }));
  }, []);

  return (
    <div className="space-y-6 pb-12">
      {/* 1. TOP HEADER BANNER & ACTIONS & NOTIFICATIONS */}
      <SkillsHeader
        totalSkillsCount={totalSkillsCount}
        categoriesCount={formData.categories?.length || 0}
        isEditing={isEditing}
        hasChanges={hasChanges}
        canEdit={canEdit}
        isInputDisabled={isInputDisabled}
        saving={saving}
        statusMessage={statusMessage}
        isReadOnly={isReadOnly}
        onToggleEditing={() => {
          if (!canEdit) {
            setStatusMessage({
              type: "error",
              text: "Demo Visitor Mode: Editing is disabled for guest viewers.",
            });
            return;
          }
          setIsEditing((prev) => !prev);
        }}
        onOpenAddSkill={() => openAddSkillModal()}
        onSaveAll={handleSaveAll}
        onOpenReset={() => setShowResetModal(true)}
        onDismissStatus={() => setStatusMessage(null)}
      />

      {/* 2. TAB NAVIGATION */}
      <SkillsNavTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        totalSkillsCount={totalSkillsCount}
        categoriesCount={formData.categories?.length || 0}
        learningCount={formData.learningItems?.length || 0}
      />

      {/* TAB 1: SKILLS OVERVIEW */}
      {activeTab === "overview" && (
        <SkillsOverviewTab
          categories={formData.categories}
          filteredCategories={filteredCategories}
          totalSkillsCount={totalSkillsCount}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategoryFilter={selectedCategoryFilter}
          onCategoryFilterChange={setSelectedCategoryFilter}
          isInputDisabled={isInputDisabled}
          onOpenAddSkill={openAddSkillModal}
          onToggleSkill={handleToggleSkill}
          onOpenEditSkill={openEditSkillModal}
          onOpenDeleteSkill={(skillId, skillName, categoryId) => {
            setDeleteSkillModal({
              isOpen: true,
              skillId,
              skillName,
              categoryId,
            });
          }}
        />
      )}

      {/* TAB 2: CATEGORY MANAGEMENT */}
      {activeTab === "categories" && (
        <SkillsCategoriesTab
          categories={formData.categories}
          isInputDisabled={isInputDisabled}
          onOpenAddCategory={openAddCategoryModal}
          onOpenEditCategory={openEditCategoryModal}
          onOpenDeleteCategory={(categoryId, categoryTitle) => {
            setDeleteCategoryModal({
              isOpen: true,
              categoryId,
              categoryTitle,
            });
          }}
        />
      )}

      {/* TAB 3: CURRENTLY LEARNING */}
      {activeTab === "learning" && (
        <SkillsLearningTab
          learningItems={formData.learningItems || []}
          isInputDisabled={isInputDisabled}
          onOpenAddLearning={openAddLearningModal}
          onOpenEditLearning={openEditLearningModal}
          onOpenDeleteLearning={(itemId, itemName) => {
            setDeleteLearningModal({
              isOpen: true,
              itemId,
              itemName,
            });
          }}
        />
      )}

      {/* TAB 4: SECTION CONTENT */}
      {activeTab === "settings" && (
        <SkillsSettingsTab
          formData={formData}
          setFormData={setFormData}
          isInputDisabled={isInputDisabled}
          saving={saving}
          onSaveAll={handleSaveAll}
        />
      )}

      {/* TAB 5: LIVE SECTION PREVIEW */}
      {activeTab === "preview" && (
        <SkillsPreviewTab formData={formData} />
      )}

      {/* MODAL: ADD / EDIT SKILL */}
      <SkillModal
        isOpen={skillModalState.isOpen}
        mode={skillModalState.mode}
        categoryId={skillModalState.categoryId}
        skill={skillModalState.skill}
        saving={saving}
        iconSearchTerm={iconSearchTerm}
        filteredPopularIcons={filteredPopularIcons}
        categorySelectOptions={categorySelectOptions}
        proficiencyLevelOptions={proficiencyLevelOptions}
        onClose={() => setSkillModalState((p) => ({ ...p, isOpen: false }))}
        onSubmit={handleSaveSkillModal}
        onSkillChange={(skill) => setSkillModalState((p) => ({ ...p, skill }))}
        onCategoryChange={(categoryId) => setSkillModalState((p) => ({ ...p, categoryId }))}
        onSearchIconChange={setIconSearchTerm}
      />

      {/* MODAL: DELETE SKILL CONFIRMATION */}
      <DeleteSkillModal
        isOpen={deleteSkillModal.isOpen}
        skillName={deleteSkillModal.skillName}
        saving={saving}
        onClose={() =>
          setDeleteSkillModal({
            isOpen: false,
            skillId: "",
            skillName: "",
            categoryId: "",
          })
        }
        onConfirm={confirmDeleteSkill}
      />

      {/* MODAL: ADD / EDIT CATEGORY */}
      <CategoryModal
        isOpen={categoryModalState.isOpen}
        mode={categoryModalState.mode}
        category={categoryModalState.category}
        saving={saving}
        categoryIconSelectOptions={categoryIconSelectOptions}
        onClose={() => setCategoryModalState((p) => ({ ...p, isOpen: false }))}
        onSubmit={handleSaveCategoryModal}
        onCategoryChange={(category) => setCategoryModalState((p) => ({ ...p, category }))}
      />

      {/* MODAL: DELETE CATEGORY CONFIRMATION */}
      <DeleteCategoryModal
        isOpen={deleteCategoryModal.isOpen}
        categoryTitle={deleteCategoryModal.categoryTitle}
        saving={saving}
        onClose={() =>
          setDeleteCategoryModal({ isOpen: false, categoryId: "", categoryTitle: "" })
        }
        onConfirm={confirmDeleteCategory}
      />

      {/* MODAL: ADD / EDIT LEARNING ITEM */}
      <LearningModal
        isOpen={learningModalState.isOpen}
        mode={learningModalState.mode}
        item={learningModalState.item}
        saving={saving}
        onClose={() => setLearningModalState((p) => ({ ...p, isOpen: false }))}
        onSubmit={handleSaveLearningModal}
        onItemChange={(item) => setLearningModalState((p) => ({ ...p, item }))}
      />

      {/* MODAL: DELETE LEARNING ITEM CONFIRMATION */}
      <DeleteLearningModal
        isOpen={deleteLearningModal.isOpen}
        itemName={deleteLearningModal.itemName}
        saving={saving}
        onClose={() =>
          setDeleteLearningModal({ isOpen: false, itemId: "", itemName: "" })
        }
        onConfirm={confirmDeleteLearning}
      />

      {/* MODAL: RESET DEFAULTS CONFIRMATION */}
      <ResetDefaultsModal
        isOpen={showResetModal}
        saving={saving}
        onClose={() => setShowResetModal(false)}
        onConfirm={confirmReset}
      />
    </div>
  );
}
