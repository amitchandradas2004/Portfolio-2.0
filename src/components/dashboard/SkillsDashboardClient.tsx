"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Save,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Eye,
  Plus,
  Trash2,
  Edit3,
  Lock,
  Loader2,
  Search,
  Cpu,
  Layers,
  BrainCircuit,
  Settings,
  X,
  Check,
} from "lucide-react";
import { ReadOnlyBanner } from "@/components/dashboard/ReadOnlyBanner";
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
  renderSkillIcon,
  POPULAR_SKILL_ICONS,
  SKILL_COLOR_PRESETS,
  CATEGORY_ICON_OPTIONS,
} from "@/lib/skill-icons";
import { NiceSelect, NiceSelectOption } from "@/components/dashboard/NiceSelect";
import Skills from "@/components/Skills";

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
  const [activeTab, setActiveTab] = useState<
    "overview" | "categories" | "learning" | "settings" | "preview"
  >("overview");
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
      {/* 1. TOP HEADER BANNER */}
      <div className="rounded-xl p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-sky-500/15 via-blue-500/10 to-purple-500/15 border border-sky-500/20 backdrop-blur-xl relative overflow-hidden shadow-xl shadow-sky-500/5 space-y-5 sm:space-y-6">
        <div className="space-y-3 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Skills & Expertise Management</span>
            </div>

            {isEditing && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                <Edit3 className="w-3.5 h-3.5 shrink-0" />
                <span>Live Database Sync Active</span>
              </div>
            )}

            {hasChanges ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider animate-pulse">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                <span>Unsaved Text Settings</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>All Saved to MongoDB</span>
              </div>
            )}

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-200/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 text-[10px] sm:text-xs font-semibold">
              <span>
                {totalSkillsCount} Skills • {formData.categories?.length || 0} Categories
              </span>
            </div>
          </div>

          <h1 className="text-xl xs:text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Skills & Tech Stack Settings
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-4xl">
            Add, update, or remove technical skills, frontend & backend frameworks, databases, tools,
            and growth mindset technologies. All operations persist directly to MongoDB and keep your
            homepage live and up-to-date.
          </p>
        </div>

        {/* Action Bar */}
        <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 relative z-10">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                if (!canEdit) {
                  setStatusMessage({
                    type: "error",
                    text: "Demo Visitor Mode: Editing is disabled for guest viewers.",
                  });
                  return;
                }
                setIsEditing((prev) => !prev);
              }}
              disabled={!canEdit}
              title={!canEdit ? "Demo Mode: Editing is disabled for guest viewers." : undefined}
              className={`w-full sm:w-auto px-4 py-2.5 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-sm ${
                !canEdit
                  ? "bg-slate-200 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500 border-slate-300/40 dark:border-slate-700/40 cursor-not-allowed opacity-60"
                  : isEditing
                  ? "bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-400 hover:bg-amber-500/25 ring-2 ring-amber-500/20 cursor-pointer"
                  : "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white border-transparent hover:opacity-90 shadow-md shadow-sky-500/20 cursor-pointer"
              }`}
            >
              {!canEdit ? (
                <>
                  <Lock className="w-4 h-4 shrink-0" />
                  <span>Edit Disabled (Demo)</span>
                </>
              ) : isEditing ? (
                <>
                  <Lock className="w-4 h-4 shrink-0" />
                  <span>Lock Editing</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-4 h-4 shrink-0" />
                  <span>Edit Skills</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => openAddSkillModal()}
              disabled={isInputDisabled}
              className={`w-full sm:w-auto px-4 py-2.5 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
                !isInputDisabled
                  ? "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white border-transparent shadow-md shadow-sky-500/20 cursor-pointer"
                  : "bg-slate-200 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500 border-slate-300/40 dark:border-slate-700/40 cursor-not-allowed opacity-60"
              }`}
            >
              <Plus className="w-4 h-4 shrink-0" />
              <span>Add New Skill</span>
            </button>

            <button
              type="button"
              onClick={handleSaveAll}
              disabled={isInputDisabled || saving || !hasChanges}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
                hasChanges && !isInputDisabled && !saving
                  ? "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white shadow-lg shadow-sky-500/25 cursor-pointer"
                  : "bg-slate-200 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500 border border-slate-300/40 dark:border-slate-700/40 cursor-not-allowed opacity-60"
              }`}
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                  <span>Saving to Database...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 shrink-0" />
                  <span>{hasChanges ? "Save Settings" : "All Changes Saved"}</span>
                </>
              )}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <Link
              href="/#skills"
              target="_blank"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <ExternalLink className="w-4 h-4 text-sky-500 shrink-0" />
              <span>View Live Section</span>
            </Link>

            <button
              type="button"
              onClick={() => setShowResetModal(true)}
              disabled={isInputDisabled || saving}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 hover:border-rose-400/50 dark:hover:border-rose-500/40 hover:bg-rose-50/60 dark:hover:bg-rose-950/25 hover:text-rose-600 dark:hover:text-rose-400 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs group"
            >
              <RotateCcw className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-rose-500 group-hover:-rotate-45 transition-all shrink-0" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. DEMO VISITOR MODE BANNER (Shown only if isReadOnly in prod) */}
      {isReadOnly && <ReadOnlyBanner />}

      {/* 3. STATUS NOTIFICATION MESSAGE */}
      <AnimatePresence>
        {statusMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-xl border flex items-center justify-between gap-3 text-sm font-semibold shadow-md ${
              statusMessage.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                : statusMessage.type === "error"
                ? "bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300"
                : "bg-sky-500/10 border-sky-500/30 text-sky-700 dark:text-sky-300"
            }`}
          >
            <div className="flex items-center gap-3">
              {statusMessage.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
              )}
              <span>{statusMessage.text}</span>
            </div>
            <button
              onClick={() => setStatusMessage(null)}
              className="text-xs opacity-70 hover:opacity-100 cursor-pointer"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. TAB NAVIGATION */}
      <div className="relative w-full max-w-full">
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 overflow-x-auto overflow-y-hidden touch-pan-x scroll-smooth no-scrollbar w-full">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer shrink-0 whitespace-nowrap ${
              activeTab === "overview"
                ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Cpu className="w-4 h-4 shrink-0" />
            <span>Skills Overview</span>
            <span className="px-1.5 py-0.2 rounded-md bg-sky-500/10 text-[10px] font-bold text-sky-600 dark:text-sky-400">
              {totalSkillsCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("categories")}
            className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer shrink-0 whitespace-nowrap ${
              activeTab === "categories"
                ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Layers className="w-4 h-4 shrink-0" />
            <span>Categories ({formData.categories?.length || 0})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("learning")}
            className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer shrink-0 whitespace-nowrap ${
              activeTab === "learning"
                ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <BrainCircuit className="w-4 h-4 shrink-0" />
            <span>Growth / Learning ({formData.learningItems?.length || 0})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("settings")}
            className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer shrink-0 whitespace-nowrap ${
              activeTab === "settings"
                ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Settings className="w-4 h-4 shrink-0" />
            <span>Section Content</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer shrink-0 whitespace-nowrap ${
              activeTab === "preview"
                ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Eye className="w-4 h-4 shrink-0" />
            <span>Live Section Preview</span>
          </button>
        </div>
      </div>

      {/* TAB 1: SKILLS OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Search & Category Filter Toolbar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-4 rounded-xl bg-white/70 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-sm">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search skills (e.g. React, Next, Mongo, Docker)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 text-xs sm:text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              <button
                type="button"
                onClick={() => setSelectedCategoryFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedCategoryFilter === "all"
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/20 border-transparent"
                    : "bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                All Categories ({totalSkillsCount})
              </button>
              {formData.categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    selectedCategoryFilter === cat.id
                      ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/20 border-transparent"
                      : "bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {cat.title} ({cat.skills?.length || 0})
                </button>
              ))}
            </div>
          </div>

          {/* Categories and Skill Chips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCategories.map((category) => (
              <motion.div
                key={category.id}
                layout
                className="group relative rounded-2xl bg-white/70 dark:bg-slate-950/85 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 p-5 sm:p-6 shadow-xl shadow-sky-500/5 hover:border-sky-500/40 dark:hover:border-sky-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-200/70 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2.5 rounded-xl ${
                          category.badgeBg || "bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400"
                        } border shrink-0`}
                      >
                        <div className={category.iconColor || "text-sky-500"}>
                          {renderCategoryIcon(category.iconKey, "w-5 h-5")}
                        </div>
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                          {category.title}
                        </h2>
                        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                          {category.skills.length} skills total
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => openAddSkillModal(category.id)}
                        disabled={isInputDisabled}
                        title="Add skill to this category"
                        className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                          !isInputDisabled
                            ? "bg-sky-500/10 border-sky-500/30 text-sky-600 dark:text-sky-400 hover:bg-sky-500 hover:text-white cursor-pointer"
                            : "opacity-40 cursor-not-allowed border-slate-300 dark:border-slate-700"
                        }`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {category.skills.length === 0 ? (
                    <div className="p-8 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
                      <Cpu className="w-8 h-8 mx-auto text-slate-400" />
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                        No skills in this category yet.
                      </p>
                      {!isInputDisabled && (
                        <button
                          type="button"
                          onClick={() => openAddSkillModal(category.id)}
                          className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-xs font-bold cursor-pointer shadow-sm shadow-sky-500/20"
                        >
                          Add First Skill
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2.5">
                      {category.skills.map((skill) => {
                        const isHidden = skill.enabled === false;
                        return (
                          <div
                            key={skill.id}
                            className={`group/chip relative inline-flex items-center gap-2 pl-3 pr-2 py-2 rounded-xl border transition-all ${
                              isHidden
                                ? "bg-slate-100/60 dark:bg-slate-900/40 border-slate-200/50 dark:border-slate-800/50 opacity-60 text-slate-400"
                                : "bg-white/80 dark:bg-slate-900/90 border-slate-200/90 dark:border-slate-800/80 text-slate-800 dark:text-slate-200 shadow-2xs hover:border-sky-400/50 hover:shadow-md"
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => handleToggleSkill(category.id, skill.id)}
                              title={isHidden ? "Click to enable & show on homepage" : "Click to hide from homepage"}
                              className={`shrink-0 cursor-pointer transition-transform hover:scale-110 ${skill.iconColor || "text-sky-400"}`}
                            >
                              {renderSkillIcon(skill.iconKey, "w-4 h-4")}
                            </button>
                            <span className="text-xs font-bold">{skill.name}</span>

                            {skill.level && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 font-semibold">
                                {skill.level}
                              </span>
                            )}

                            <div className="flex items-center gap-1 ml-1 pl-1 border-l border-slate-200 dark:border-slate-700">
                              <button
                                type="button"
                                onClick={() => openEditSkillModal(category.id, skill)}
                                disabled={isInputDisabled}
                                title="Edit skill"
                                className={`p-1 rounded-md text-slate-400 hover:text-sky-500 transition-colors ${
                                  isInputDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                                }`}
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  if (isInputDisabled) return;
                                  setDeleteSkillModal({
                                    isOpen: true,
                                    skillId: skill.id,
                                    skillName: skill.name,
                                    categoryId: category.id,
                                  });
                                }}
                                disabled={isInputDisabled}
                                title="Delete skill"
                                className={`p-1 rounded-md text-slate-400 hover:text-rose-500 transition-colors ${
                                  isInputDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                                }`}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CATEGORY MANAGEMENT */}
      {activeTab === "categories" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3 p-4 rounded-xl bg-white/70 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Skill Categories
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Organize your skills into logical functional groups (Frontend, Backend, Cloud, Mobile,
                DevOps, etc.).
              </p>
            </div>

            <button
              type="button"
              onClick={openAddCategoryModal}
              disabled={isInputDisabled}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${
                !isInputDisabled
                  ? "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white cursor-pointer shadow-md shadow-sky-500/20"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed opacity-60"
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Add Category</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.categories.map((cat) => (
              <div
                key={cat.id}
                className="p-5 rounded-xl bg-white/80 dark:bg-slate-950/85 border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`p-2.5 rounded-xl ${cat.badgeBg} border shrink-0`}>
                    <div className={cat.iconColor}>
                      {renderCategoryIcon(cat.iconKey, "w-5 h-5")}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{cat.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      ID: <code className="font-mono">{cat.id}</code> • {cat.skills.length} skills
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => openEditCategoryModal(cat)}
                    disabled={isInputDisabled}
                    className={`p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 ${
                      isInputDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (isInputDisabled) return;
                      setDeleteCategoryModal({
                        isOpen: true,
                        categoryId: cat.id,
                        categoryTitle: cat.title,
                      });
                    }}
                    disabled={isInputDisabled}
                    className={`p-2 rounded-lg border border-rose-500/30 text-rose-500 hover:bg-rose-500/10 ${
                      isInputDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CURRENTLY LEARNING */}
      {activeTab === "learning" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3 p-4 rounded-xl bg-white/70 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Currently Learning & Exploring
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Showcase your continuous growth mindset, upcoming technologies, and engineering focus.
              </p>
            </div>

            <button
              type="button"
              onClick={openAddLearningModal}
              disabled={isInputDisabled}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${
                !isInputDisabled
                  ? "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white cursor-pointer shadow-md shadow-sky-500/20"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed opacity-60"
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Add Learning Item</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {(formData.learningItems || []).map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-white/80 dark:bg-slate-950/85 border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0 ${item.color}`}>
                    {renderSkillIcon(item.iconKey, "w-4 h-4")}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">{item.name}</h3>
                    <span className="text-[10px] text-slate-400">Key: {item.iconKey}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => openEditLearningModal(item)}
                    disabled={isInputDisabled}
                    className={`p-1.5 rounded-md text-slate-400 hover:text-sky-500 ${
                      isInputDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (isInputDisabled) return;
                      setDeleteLearningModal({
                        isOpen: true,
                        itemId: item.id || item.name,
                        itemName: item.name,
                      });
                    }}
                    disabled={isInputDisabled}
                    className={`p-1.5 rounded-md text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors ${
                      isInputDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                    }`}
                    title="Delete learning item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SECTION CONTENT */}
      {activeTab === "settings" && (
        <div className="p-4 sm:p-6 lg:p-8 rounded-xl bg-white/70 dark:bg-slate-950/90 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl space-y-6">
          <div className="border-b border-slate-200/80 dark:border-slate-800/80 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Section Headlines & Descriptions
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Customize the titles and descriptions displayed on your homepage.
              </p>
            </div>
            <button
              type="button"
              onClick={handleSaveAll}
              disabled={isInputDisabled || saving}
              className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 shrink-0" />
                  <span>Save Section Content</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                Badge Headline
              </label>
              <input
                type="text"
                disabled={isInputDisabled}
                value={formData.badgeText || ""}
                onChange={(e) => setFormData((p) => ({ ...p, badgeText: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 disabled:opacity-60"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                Main Heading Prefix
              </label>
              <input
                type="text"
                disabled={isInputDisabled}
                value={formData.title || ""}
                onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 disabled:opacity-60"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                Highlighted Gradient Heading
              </label>
              <input
                type="text"
                disabled={isInputDisabled}
                value={formData.highlightedTitle || ""}
                onChange={(e) => setFormData((p) => ({ ...p, highlightedTitle: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 disabled:opacity-60"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                Growth Badge Text
              </label>
              <input
                type="text"
                disabled={isInputDisabled}
                value={formData.learningBadgeText || ""}
                onChange={(e) => setFormData((p) => ({ ...p, learningBadgeText: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 disabled:opacity-60"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                Section Description
              </label>
              <textarea
                rows={2}
                disabled={isInputDisabled}
                value={formData.description || ""}
                onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 disabled:opacity-60"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                Learning Section Title
              </label>
              <input
                type="text"
                disabled={isInputDisabled}
                value={formData.learningSectionTitle || ""}
                onChange={(e) => setFormData((p) => ({ ...p, learningSectionTitle: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 disabled:opacity-60"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: LIVE SECTION PREVIEW */}
      {activeTab === "preview" && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs text-sky-700 dark:text-sky-300 font-medium flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-sky-500 shrink-0" />
              <span>
                <strong>Live Preview:</strong> This reflects exactly how your skills appear on your live
                portfolio with your current saved data.
              </span>
            </div>
            <Link
              href="/#skills"
              target="_blank"
              className="font-bold underline text-sky-600 dark:text-sky-400 shrink-0"
            >
              Open Live Site
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-2xl bg-white dark:bg-[#020617]">
            <Skills isPreview={true} initialSkills={formData} />
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT SKILL */}
      <AnimatePresence>
        {skillModalState.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 shadow-2xl p-4 sm:p-6 lg:p-7 space-y-4 sm:space-y-5 my-auto max-h-[92vh] overflow-y-auto overscroll-contain"
            >
              <div className="flex items-start sm:items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-2 rounded-xl bg-sky-500/10 text-sky-500 shrink-0">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                      {skillModalState.mode === "add" ? "Add New Skill" : "Edit Skill"}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">
                      Configure skill details, icon, and visual accents
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={saving}
                  onClick={() => setSkillModalState((p) => ({ ...p, isOpen: false }))}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveSkillModal} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Skill Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Next.js, Docker, Python, PostgreSQL"
                    value={skillModalState.skill.name}
                    onChange={(e) =>
                      setSkillModalState((p) => ({
                        ...p,
                        skill: { ...p.skill, name: e.target.value },
                      }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                  />
                </div>

                <NiceSelect
                  label="Category"
                  required
                  value={skillModalState.categoryId}
                  onChange={(val) =>
                    setSkillModalState((p) => ({ ...p, categoryId: val }))
                  }
                  options={categorySelectOptions}
                  placeholder="Select a category..."
                />

                <div className="p-3 sm:p-3.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2">
                  <span className="text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 shrink-0">
                    Badge Preview:
                  </span>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold shadow-xs max-w-full overflow-hidden">
                    <div className={`shrink-0 ${skillModalState.skill.iconColor || "text-sky-400"}`}>
                      {renderSkillIcon(skillModalState.skill.iconKey, "w-4 h-4")}
                    </div>
                    <span className="truncate max-w-[150px] xs:max-w-[200px]">
                      {skillModalState.skill.name || "Skill Name"}
                    </span>
                    {skillModalState.skill.level && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-200/60 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400 font-medium shrink-0">
                        {skillModalState.skill.level}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Icon Key ({skillModalState.skill.iconKey})
                    </label>
                    <span className="text-[10px] text-slate-400">Select or search</span>
                  </div>

                  <input
                    type="text"
                    placeholder="Search icons (e.g. react, python, docker, git)..."
                    value={iconSearchTerm}
                    onChange={(e) => setIconSearchTerm(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                  />

                  <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-6 gap-1.5 sm:gap-2 max-h-36 sm:max-h-40 overflow-y-auto p-1.5 sm:p-2 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200/70 dark:border-slate-800">
                    {filteredPopularIcons.map((opt) => {
                      const isSelected = skillModalState.skill.iconKey === opt.key;
                      return (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() =>
                            setSkillModalState((p) => ({
                              ...p,
                              skill: {
                                ...p.skill,
                                iconKey: opt.key,
                                iconColor: p.skill.iconColor || opt.defaultColor,
                              },
                            }))
                          }
                          className={`p-1.5 sm:p-2 rounded-xl flex flex-col items-center justify-center gap-1 text-center transition-all cursor-pointer ${
                            isSelected
                              ? "bg-sky-500 text-white shadow-sm ring-2 ring-sky-400"
                              : "bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          <div className={isSelected ? "text-white" : opt.defaultColor}>
                            {renderSkillIcon(opt.key, "w-4 h-4")}
                          </div>
                          <span className="text-[9px] xs:text-[10px] font-bold truncate max-w-full px-0.5">
                            {opt.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Icon Color
                  </label>
                  <div className="flex flex-wrap gap-2 items-center">
                    {SKILL_COLOR_PRESETS.map((color) => {
                      const isSelected = skillModalState.skill.iconColor === color.value;
                      return (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() =>
                            setSkillModalState((p) => ({
                              ...p,
                              skill: { ...p.skill, iconColor: color.value },
                            }))
                          }
                          title={color.name}
                          className={`w-6.5 h-6.5 sm:w-6 sm:h-6 rounded-full ${color.bg} transition-all cursor-pointer flex items-center justify-center ${
                            isSelected ? "ring-2 ring-offset-2 ring-sky-500 scale-110" : "hover:scale-105"
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 text-white drop-shadow" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1.5">
                    <NiceSelect
                      label="Proficiency Level"
                      value={skillModalState.skill.level || "Advanced"}
                      onChange={(val) =>
                        setSkillModalState((p) => ({
                          ...p,
                          skill: { ...p.skill, level: val },
                        }))
                      }
                      options={proficiencyLevelOptions}
                      placeholder="Select level..."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        Proficiency %
                      </label>
                      <span className="text-xs font-bold text-sky-600 dark:text-sky-400 font-mono px-2 py-0.5 rounded bg-sky-500/10">
                        {skillModalState.skill.proficiency || 90}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      value={skillModalState.skill.proficiency || 90}
                      onChange={(e) =>
                        setSkillModalState((p) => ({
                          ...p,
                          skill: { ...p.skill, proficiency: parseInt(e.target.value) },
                        }))
                      }
                      className="w-full accent-sky-500 cursor-pointer mt-1 sm:mt-2.5 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-1 sm:pt-2">
                  <input
                    type="checkbox"
                    id="skill-enabled"
                    checked={skillModalState.skill.enabled !== false}
                    onChange={(e) =>
                      setSkillModalState((p) => ({
                        ...p,
                        skill: { ...p.skill, enabled: e.target.checked },
                      }))
                    }
                    className="w-4 h-4 rounded text-sky-500 focus:ring-sky-400 cursor-pointer"
                  />
                  <label
                    htmlFor="skill-enabled"
                    className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
                  >
                    Enabled & Visible on Homepage
                  </label>
                </div>

                <div className="flex flex-col-reverse xs:flex-row items-stretch xs:items-center justify-end gap-2 sm:gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => setSkillModalState((p) => ({ ...p, isOpen: false }))}
                    className="w-full xs:w-auto px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full xs:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-xs font-bold shadow-md shadow-sky-500/25 cursor-pointer text-center flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>{skillModalState.mode === "add" ? "Adding Skill..." : "Saving Changes..."}</span>
                      </>
                    ) : (
                      <span>{skillModalState.mode === "add" ? "Add & Save Skill" : "Update & Save Skill"}</span>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: DELETE SKILL CONFIRMATION */}
      <AnimatePresence>
        {deleteSkillModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 sm:p-6 space-y-4 my-auto"
            >
              <div className="flex items-center gap-3 text-rose-500">
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 shrink-0">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    Delete Skill
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Are you sure you want to remove this skill?
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                You are about to delete{" "}
                <strong className="text-slate-900 dark:text-white font-extrabold">
                  &quot;{deleteSkillModal.skillName}&quot;
                </strong>
                . This will be removed from the database immediately.
              </p>

              <div className="flex flex-col-reverse xs:flex-row items-stretch xs:items-center justify-end gap-2.5 sm:gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  disabled={saving}
                  onClick={() =>
                    setDeleteSkillModal({
                      isOpen: false,
                      skillId: "",
                      skillName: "",
                      categoryId: "",
                    })
                  }
                  className="w-full xs:w-auto px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={saving}
                  onClick={confirmDeleteSkill}
                  className="w-full xs:w-auto px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-md shadow-rose-500/25 cursor-pointer text-center flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Deleting Skill...</span>
                    </>
                  ) : (
                    <span>Confirm Delete</span>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: ADD / EDIT CATEGORY */}
      <AnimatePresence>
        {categoryModalState.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 sm:p-6 space-y-4 my-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  {categoryModalState.mode === "add" ? "Add Category" : "Edit Category"}
                </h3>
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => setCategoryModalState((p) => ({ ...p, isOpen: false }))}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveCategoryModal} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                    Category Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mobile Development, DevOps & Cloud"
                    value={categoryModalState.category.title}
                    onChange={(e) =>
                      setCategoryModalState((p) => ({
                        ...p,
                        category: { ...p.category, title: e.target.value },
                      }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <NiceSelect
                    label="Category Icon"
                    value={categoryModalState.category.iconKey}
                    onChange={(val) =>
                      setCategoryModalState((p) => ({
                        ...p,
                        category: { ...p.category, iconKey: val },
                      }))
                    }
                    options={categoryIconSelectOptions}
                    placeholder="Select an icon..."
                  />
                </div>

                <div className="flex flex-col-reverse xs:flex-row items-stretch xs:items-center justify-end gap-2.5 sm:gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => setCategoryModalState((p) => ({ ...p, isOpen: false }))}
                    className="w-full xs:w-auto px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 text-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full xs:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-xs font-bold shadow-md shadow-sky-500/20 text-center cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>{categoryModalState.mode === "add" ? "Adding Category..." : "Saving Changes..."}</span>
                      </>
                    ) : (
                      <span>{categoryModalState.mode === "add" ? "Add Category" : "Save Category"}</span>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: DELETE CATEGORY CONFIRMATION */}
      <AnimatePresence>
        {deleteCategoryModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 sm:p-6 space-y-4 my-auto"
            >
              <div className="flex items-center gap-3 text-rose-500">
                <Trash2 className="w-5 h-5 shrink-0" />
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">Delete Category</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Are you sure you want to delete category{" "}
                <strong>&quot;{deleteCategoryModal.categoryTitle}&quot;</strong> and all skills inside
                it?
              </p>
              <div className="flex flex-col-reverse xs:flex-row items-stretch xs:items-center justify-end gap-2.5 sm:gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  disabled={saving}
                  onClick={() =>
                    setDeleteCategoryModal({ isOpen: false, categoryId: "", categoryTitle: "" })
                  }
                  className="w-full xs:w-auto px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 text-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={saving}
                  onClick={confirmDeleteCategory}
                  className="w-full xs:w-auto px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold text-center flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Deleting Category...</span>
                    </>
                  ) : (
                    <span>Delete Category</span>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: ADD / EDIT LEARNING ITEM */}
      <AnimatePresence>
        {learningModalState.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 sm:p-6 space-y-4 my-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  {learningModalState.mode === "add" ? "Add Learning Item" : "Edit Learning Item"}
                </h3>
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => setLearningModalState((p) => ({ ...p, isOpen: false }))}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveLearningModal} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                    Topic / Technology *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AI Agents, Kubernetes, Rust"
                    value={learningModalState.item.name}
                    onChange={(e) =>
                      setLearningModalState((p) => ({
                        ...p,
                        item: { ...p.item, name: e.target.value },
                      }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                    Icon Key
                  </label>
                  <input
                    type="text"
                    placeholder="brain, layers, typescript, cloud, docker..."
                    value={learningModalState.item.iconKey}
                    onChange={(e) =>
                      setLearningModalState((p) => ({
                        ...p,
                        item: { ...p.item, iconKey: e.target.value },
                      }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex flex-col-reverse xs:flex-row items-stretch xs:items-center justify-end gap-2.5 sm:gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => setLearningModalState((p) => ({ ...p, isOpen: false }))}
                    className="w-full xs:w-auto px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 text-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full xs:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-xs font-bold shadow-md shadow-sky-500/20 text-center cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>{learningModalState.mode === "add" ? "Adding Item..." : "Saving Changes..."}</span>
                      </>
                    ) : (
                      <span>{learningModalState.mode === "add" ? "Add Item" : "Save Item"}</span>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: DELETE LEARNING ITEM CONFIRMATION */}
      <AnimatePresence>
        {deleteLearningModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 sm:p-6 space-y-4 my-auto"
            >
              <div className="flex items-center gap-3 text-rose-500">
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 shrink-0">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    Delete Learning Item
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Are you sure you want to remove this topic?
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                You are about to remove{" "}
                <strong className="text-slate-900 dark:text-white font-extrabold">
                  &quot;{deleteLearningModal.itemName}&quot;
                </strong>{" "}
                from your Growth &amp; Learning roadmap.
              </p>

              <div className="flex flex-col-reverse xs:flex-row items-stretch xs:items-center justify-end gap-2.5 sm:gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  disabled={saving}
                  onClick={() =>
                    setDeleteLearningModal({ isOpen: false, itemId: "", itemName: "" })
                  }
                  className="w-full xs:w-auto px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 text-center transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={saving}
                  onClick={confirmDeleteLearning}
                  className="w-full xs:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white text-xs font-bold shadow-md shadow-rose-500/25 cursor-pointer text-center transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Deleting Item...</span>
                    </>
                  ) : (
                    <span>Confirm Delete</span>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: RESET DEFAULTS CONFIRMATION */}
      <AnimatePresence>
        {showResetModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/90 shadow-2xl p-5 sm:p-6 space-y-4 my-auto"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 shrink-0">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Reset Skills Defaults?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    Are you sure you want to reset all skills, categories, and growth items to the default portfolio template?
                  </p>
                </div>
              </div>

              <div className="flex flex-col-reverse xs:flex-row items-stretch xs:items-center justify-end gap-2.5 sm:gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => setShowResetModal(false)}
                  className="w-full xs:w-auto px-4.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 text-center transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={saving}
                  onClick={confirmReset}
                  className="w-full xs:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 via-red-600 to-rose-600 hover:from-rose-600 hover:to-red-700 text-white text-xs font-bold shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 text-center transition-all cursor-pointer disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                      <span>Resetting Defaults...</span>
                    </>
                  ) : (
                    <>
                      <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                      <span>Yes, Reset Defaults</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
