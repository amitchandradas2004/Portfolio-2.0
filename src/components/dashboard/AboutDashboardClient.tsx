"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Lock, Edit3 } from "lucide-react";
import { useUserRole } from "@/hooks/useUserRole";

import {
  AboutData,
  defaultAboutData,
  AboutTrait,
  AboutStat,
  AboutTech,
  AboutLearning,
} from "@/lib/about-types";
import { broadcastAboutUpdate } from "@/lib/about-sync";
import {
  AboutHeader,
  AboutNavTabs,
  AboutDashboardTab,
  AboutNarrativeTab,
  AboutTraitsTab,
  AboutOverviewCardTab,
  AboutTechsTab,
  AboutPreviewTab,
  TraitModal,
  DeleteTraitModal,
  TechModal,
  DeleteTechModal,
  LearningModal,
  DeleteLearningModal,
  ResetAboutModal,
} from "@/components/dashboard/about";

interface AboutDashboardClientProps {
  initialData: AboutData;
}

export function AboutDashboardClient({ initialData }: AboutDashboardClientProps) {
  const router = useRouter();
  const { isAdmin, isReadOnly } = useUserRole();

  const [formData, setFormData] = useState<AboutData>(initialData || defaultAboutData);
  const [lastSavedData, setLastSavedData] = useState<AboutData>(initialData || defaultAboutData);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<AboutDashboardTab>("narrative");

  // Status notification message
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  // Modal states
  const [traitModal, setTraitModal] = useState<{
    isOpen: boolean;
    mode: "add" | "edit";
    data: AboutTrait;
  }>({
    isOpen: false,
    mode: "add",
    data: {
      id: "",
      title: "",
      description: "",
      iconKey: "check",
      iconColor: "text-sky-500",
      badgeBg: "bg-sky-500/10",
    },
  });

  const [deleteTraitModal, setDeleteTraitModal] = useState<{
    isOpen: boolean;
    trait: AboutTrait | null;
  }>({
    isOpen: false,
    trait: null,
  });

  const [techModal, setTechModal] = useState<{
    isOpen: boolean;
    mode: "add" | "edit";
    data: AboutTech;
  }>({
    isOpen: false,
    mode: "add",
    data: {
      id: "",
      name: "",
      iconKey: "react",
      color: "text-cyan-400",
      enabled: true,
    },
  });

  const [deleteTechModal, setDeleteTechModal] = useState<{
    isOpen: boolean;
    tech: AboutTech | null;
  }>({
    isOpen: false,
    tech: null,
  });

  const [learningModal, setLearningModal] = useState<{
    isOpen: boolean;
    mode: "add" | "edit";
    data: AboutLearning;
  }>({
    isOpen: false,
    mode: "add",
    data: {
      id: "",
      title: "",
      desc: "",
      iconKey: "brain",
    },
  });

  const [deleteLearningModal, setDeleteLearningModal] = useState<{
    isOpen: boolean;
    item: AboutLearning | null;
  }>({
    isOpen: false,
    item: null,
  });

  const [showResetModal, setShowResetModal] = useState(false);

  // Sync prop changes from server revalidation
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setLastSavedData(initialData);
    }
  }, [initialData]);

  // Listen to cross-tab updates in case updated elsewhere
  useEffect(() => {
    let channel: BroadcastChannel | null = null;
    try {
      if (typeof window !== "undefined" && "BroadcastChannel" in window) {
        channel = new BroadcastChannel("portfolio-sync");
        channel.onmessage = (event) => {
          if (event.data?.type === "ABOUT_UPDATED" && event.data?.data) {
            setFormData(event.data.data);
            setLastSavedData(event.data.data);
          }
        };
      }
    } catch (e) {}

    return () => {
      if (channel) channel.close();
    };
  }, []);

  // Demo users are read-only; admin can edit when unlocked
  const canEdit = isAdmin && !isReadOnly;
  const isInputDisabled = !canEdit || !isEditing;

  // Track differences for Save button
  const hasChanges = JSON.stringify(formData) !== JSON.stringify(lastSavedData);

  // Central persistence function that updates MongoDB, Next.js cache, state, and broadcasts
  const persistAbout = async (
    updatedDoc: AboutData,
    successMessage?: string
  ): Promise<boolean> => {
    if (!canEdit) {
      setStatusMessage({
        type: "error",
        text: "Demo Visitor Mode: Modifying the About section is disabled. Only administrators have write access.",
      });
      return false;
    }

    try {
      setSaving(true);
      setStatusMessage(null);

      const res = await fetch("/api/about", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(isReadOnly ? { "x-user-role": "demo" } : {}),
        },
        body: JSON.stringify(updatedDoc),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update About section in database.");
      }

      const savedAbout: AboutData = data.about
        ? { ...defaultAboutData, ...data.about }
        : updatedDoc;

      // Update local state immediately
      setFormData(savedAbout);
      setLastSavedData(savedAbout);

      // Instantly broadcast to homepage and other open tabs
      broadcastAboutUpdate(savedAbout);

      // Revalidate Next.js Server Components
      router.refresh();

      if (successMessage) {
        setStatusMessage({
          type: "success",
          text: successMessage,
        });
      }

      return true;
    } catch (err: any) {
      console.error("Save about error:", err);
      setStatusMessage({
        type: "error",
        text: err.message || "Something went wrong while saving to database.",
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  // Standard input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Stat item change
  const handleStatChange = (index: number, field: keyof AboutStat, value: any) => {
    const updatedStats = [...formData.stats];
    updatedStats[index] = {
      ...updatedStats[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      stats: updatedStats,
    }));
  };

  // Trait modal actions: directly persist and update immediately
  const handleSaveTrait = async (savedTrait: AboutTrait) => {
    if (!savedTrait.title.trim()) {
      setStatusMessage({ type: "error", text: "Trait title is required." });
      return;
    }

    let updatedTraits = [...formData.traits];
    if (traitModal.mode === "add") {
      const newTrait: AboutTrait = {
        ...savedTrait,
        id: "trait-" + Date.now(),
      };
      updatedTraits.push(newTrait);
    } else {
      updatedTraits = updatedTraits.map((t) =>
        t.id === savedTrait.id ? savedTrait : t
      );
    }

    const nextDoc: AboutData = {
      ...formData,
      traits: updatedTraits,
    };

    setFormData(nextDoc);
    setTraitModal((prev) => ({ ...prev, isOpen: false }));

    await persistAbout(
      nextDoc,
      traitModal.mode === "add"
        ? `Trait card "${savedTrait.title}" added and updated live!`
        : `Trait card "${savedTrait.title}" updated live!`
    );
  };

  const handleConfirmDeleteTrait = async () => {
    if (!deleteTraitModal.trait) return;
    const traitToDelete = deleteTraitModal.trait;
    const nextDoc: AboutData = {
      ...formData,
      traits: formData.traits.filter((t) => t.id !== traitToDelete.id),
    };

    setFormData(nextDoc);
    setDeleteTraitModal({ isOpen: false, trait: null });

    await persistAbout(
      nextDoc,
      `Trait card "${traitToDelete.title}" deleted and updated live!`
    );
  };

  // Tech chip actions: directly persist and update immediately
  const handleToggleTech = async (id: string) => {
    if (isInputDisabled) return;
    const nextDoc: AboutData = {
      ...formData,
      currentTechs: formData.currentTechs.map((t) =>
        t.id === id ? { ...t, enabled: t.enabled === false ? true : false } : t
      ),
    };

    setFormData(nextDoc);
    await persistAbout(nextDoc, "Technology visibility updated live!");
  };

  const handleSaveTech = async (savedTech: AboutTech) => {
    if (!savedTech.name.trim()) {
      setStatusMessage({ type: "error", text: "Technology name is required." });
      return;
    }

    let updatedTechs = [...formData.currentTechs];
    if (techModal.mode === "add") {
      const newTech: AboutTech = {
        ...savedTech,
        id: "tech-" + Date.now(),
      };
      updatedTechs.push(newTech);
    } else {
      updatedTechs = updatedTechs.map((t) =>
        t.id === savedTech.id ? savedTech : t
      );
    }

    const nextDoc: AboutData = {
      ...formData,
      currentTechs: updatedTechs,
    };

    setFormData(nextDoc);
    setTechModal((prev) => ({ ...prev, isOpen: false }));

    await persistAbout(
      nextDoc,
      techModal.mode === "add"
        ? `Technology "${savedTech.name}" added and updated live!`
        : `Technology "${savedTech.name}" updated live!`
    );
  };

  const handleConfirmDeleteTech = async () => {
    if (!deleteTechModal.tech) return;
    const techToDelete = deleteTechModal.tech;
    const nextDoc: AboutData = {
      ...formData,
      currentTechs: formData.currentTechs.filter((t) => t.id !== techToDelete.id),
    };

    setFormData(nextDoc);
    setDeleteTechModal({ isOpen: false, tech: null });

    await persistAbout(
      nextDoc,
      `Technology "${techToDelete.name}" removed and updated live!`
    );
  };

  // Learning focus actions: directly persist and update immediately
  const handleSaveLearning = async (savedItem: AboutLearning) => {
    if (!savedItem.title.trim()) {
      setStatusMessage({ type: "error", text: "Learning focus title is required." });
      return;
    }

    let updatedLearning = [...formData.learningFocus];
    if (learningModal.mode === "add") {
      const newItem: AboutLearning = {
        ...savedItem,
        id: "learning-" + Date.now(),
      };
      updatedLearning.push(newItem);
    } else {
      updatedLearning = updatedLearning.map((item) =>
        item.id === savedItem.id ? savedItem : item
      );
    }

    const nextDoc: AboutData = {
      ...formData,
      learningFocus: updatedLearning,
    };

    setFormData(nextDoc);
    setLearningModal((prev) => ({ ...prev, isOpen: false }));

    await persistAbout(
      nextDoc,
      learningModal.mode === "add"
        ? `Learning focus "${savedItem.title}" added and updated live!`
        : `Learning focus "${savedItem.title}" updated live!`
    );
  };

  const handleConfirmDeleteLearning = async () => {
    if (!deleteLearningModal.item) return;
    const itemToDelete = deleteLearningModal.item;
    const nextDoc: AboutData = {
      ...formData,
      learningFocus: formData.learningFocus.filter((item) => item.id !== itemToDelete.id),
    };

    setFormData(nextDoc);
    setDeleteLearningModal({ isOpen: false, item: null });

    await persistAbout(
      nextDoc,
      `Learning focus "${itemToDelete.title}" removed and updated live!`
    );
  };

  // Save changes from main Header button (for narrative paragraphs, card title, stats, etc.)
  const handleSubmit = async () => {
    if (isInputDisabled) {
      setStatusMessage({
        type: "error",
        text: isReadOnly
          ? "Demo mode: Editing and saving changes is disabled for guest visitors."
          : "Editing is currently locked. Click 'Edit About Section' to enable saving.",
      });
      return;
    }

    await persistAbout(
      formData,
      "About section updated successfully in MongoDB! Both homepage and dashboard reflect these changes."
    );
  };

  // Reset defaults
  const handleConfirmReset = async () => {
    setShowResetModal(false);
    await persistAbout(
      defaultAboutData,
      "About section reset to default configuration successfully!"
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header Card */}
      <AboutHeader
        isAdmin={isAdmin}
        isEditing={isEditing}
        isInputDisabled={isInputDisabled}
        saving={saving}
        hasChanges={hasChanges}
        onToggleEdit={() => setIsEditing((prev) => !prev)}
        onSave={handleSubmit}
        onReset={() => setShowResetModal(true)}
      />

      {/* Admin View Mode Banner */}
      {isAdmin && !isEditing && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-semibold text-sky-700 dark:text-sky-300 shadow-sm"
        >
          <div className="flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-sky-500 shrink-0" />
            <span>
              <strong className="font-extrabold text-sky-800 dark:text-sky-200">
                Admin View Mode:
              </strong>{" "}
              Form fields are currently locked to prevent accidental edits. Click{" "}
              <strong className="text-sky-800 dark:text-sky-200 font-bold">
                Edit About Section
              </strong>{" "}
              to unlock.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 shadow-md shadow-sky-500/20"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit About Section</span>
          </button>
        </motion.div>
      )}



      {/* Status Notification Message */}
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

      {/* Navigation Tabs */}
      <AboutNavTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        traitsCount={formData.traits?.length || 0}
        techsCount={formData.currentTechs?.length || 0}
      />

      {/* Main Tabs Area */}
      {activeTab === "narrative" && (
        <AboutNarrativeTab
          formData={formData}
          lastSavedData={lastSavedData}
          isInputDisabled={isInputDisabled}
          onChange={handleChange}
        />
      )}

      {activeTab === "traits" && (
        <AboutTraitsTab
          traits={formData.traits}
          isInputDisabled={isInputDisabled}
          onAddTrait={() =>
            setTraitModal({
              isOpen: true,
              mode: "add",
              data: {
                id: "",
                title: "",
                description: "",
                iconKey: "check",
                iconColor: "text-sky-500",
                badgeBg: "bg-sky-500/10",
              },
            })
          }
          onEditTrait={(trait) =>
            setTraitModal({
              isOpen: true,
              mode: "edit",
              data: { ...trait },
            })
          }
          onDeleteTrait={(trait) =>
            setDeleteTraitModal({
              isOpen: true,
              trait,
            })
          }
        />
      )}

      {activeTab === "overviewCard" && (
        <AboutOverviewCardTab
          formData={formData}
          lastSavedData={lastSavedData}
          isInputDisabled={isInputDisabled}
          onChange={handleChange}
          onStatChange={handleStatChange}
        />
      )}

      {activeTab === "techs" && (
        <AboutTechsTab
          currentTechs={formData.currentTechs}
          learningFocus={formData.learningFocus}
          isInputDisabled={isInputDisabled}
          onAddTech={() =>
            setTechModal({
              isOpen: true,
              mode: "add",
              data: {
                id: "",
                name: "",
                iconKey: "react",
                color: "text-cyan-400",
                enabled: true,
              },
            })
          }
          onEditTech={(tech) =>
            setTechModal({
              isOpen: true,
              mode: "edit",
              data: { ...tech },
            })
          }
          onDeleteTech={(tech) =>
            setDeleteTechModal({
              isOpen: true,
              tech,
            })
          }
          onToggleTech={handleToggleTech}
          onAddLearning={() =>
            setLearningModal({
              isOpen: true,
              mode: "add",
              data: {
                id: "",
                title: "",
                desc: "",
                iconKey: "brain",
              },
            })
          }
          onEditLearning={(item) =>
            setLearningModal({
              isOpen: true,
              mode: "edit",
              data: { ...item },
            })
          }
          onDeleteLearning={(item) =>
            setDeleteLearningModal({
              isOpen: true,
              item,
            })
          }
        />
      )}

      {activeTab === "preview" && <AboutPreviewTab formData={formData} />}

      {/* Modals */}
      <TraitModal
        isOpen={traitModal.isOpen}
        mode={traitModal.mode}
        trait={traitModal.data}
        onClose={() => setTraitModal((prev) => ({ ...prev, isOpen: false }))}
        onSave={handleSaveTrait}
      />

      <DeleteTraitModal
        isOpen={deleteTraitModal.isOpen}
        title={deleteTraitModal.trait?.title || ""}
        onClose={() => setDeleteTraitModal({ isOpen: false, trait: null })}
        onConfirm={handleConfirmDeleteTrait}
      />

      <TechModal
        isOpen={techModal.isOpen}
        mode={techModal.mode}
        tech={techModal.data}
        onClose={() => setTechModal((prev) => ({ ...prev, isOpen: false }))}
        onSave={handleSaveTech}
      />

      <DeleteTechModal
        isOpen={deleteTechModal.isOpen}
        tech={deleteTechModal.tech}
        onClose={() => setDeleteTechModal({ isOpen: false, tech: null })}
        onConfirm={handleConfirmDeleteTech}
      />

      <LearningModal
        isOpen={learningModal.isOpen}
        mode={learningModal.mode}
        item={learningModal.data}
        onClose={() => setLearningModal((prev) => ({ ...prev, isOpen: false }))}
        onSave={handleSaveLearning}
      />

      <DeleteLearningModal
        isOpen={deleteLearningModal.isOpen}
        item={deleteLearningModal.item}
        onClose={() => setDeleteLearningModal({ isOpen: false, item: null })}
        onConfirm={handleConfirmDeleteLearning}
      />

      <ResetAboutModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={handleConfirmReset}
      />
    </div>
  );
}
