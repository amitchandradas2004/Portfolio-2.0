"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Save,
  RotateCcw,
  ExternalLink,
  Upload,
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle,
  Eye,
  User,
  FileText,
  Globe,
  ImageIcon,
  Loader2,
  Trash2,
  Plus,
  Layers,
  ShieldAlert,
  Clock,
  Edit3,
  Lock,
  MapPin,
  Briefcase,
} from "lucide-react";
import { ReadOnlyBanner } from "@/components/dashboard/ReadOnlyBanner";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { useUserRole } from "@/hooks/useUserRole";
import { HeroData, defaultHeroData, TechBadge, formatImageUrl } from "@/lib/hero-types";
import Hero from "@/components/Hero";

function FieldHeaderCompare({
  label,
  savedValue,
  currentValue,
  extraRight,
}: {
  label: string;
  savedValue?: string;
  currentValue?: string;
  extraRight?: React.ReactNode;
}) {
  const isDifferent = savedValue !== undefined && currentValue !== undefined && savedValue !== currentValue;

  return (
    <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 mb-1.5">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          {label}
        </span>
        {savedValue !== undefined && (
          <span
            className={`inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-mono font-medium px-2 py-0.5 rounded-md border transition-all ${
              isDifferent
                ? "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400"
                : "bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
            }`}
            title={`Last saved in database: ${savedValue || "(empty)"}`}
          >
            <Clock className="w-3 h-3 shrink-0" />
            <span className="font-semibold hidden xs:inline">{isDifferent ? "Saved:" : "Last Saved:"}</span>
            <span className="max-w-[90px] xs:max-w-[140px] sm:max-w-[200px] truncate italic">
              &quot;{savedValue || "Empty"}&quot;
            </span>
            {isDifferent && (
              <span className="ml-0.5 text-[9px] font-extrabold uppercase tracking-tight bg-amber-500/20 text-amber-700 dark:text-amber-300 px-1 rounded">
                Edited
              </span>
            )}
          </span>
        )}
      </div>
      {extraRight}
    </div>
  );
}

export default function HeroDashboardPage() {
  const { isAdmin, isReadOnly } = useUserRole();

  const [formData, setFormData] = useState<HeroData>(defaultHeroData);
  const [lastSavedData, setLastSavedData] = useState<HeroData>(defaultHeroData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "links" | "image" | "preview">("info");

  // Effective state determining if inputs are locked
  const isInputDisabled = !isEditing;
  
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if form data is different from last saved database data
  const hasChanges = JSON.stringify(formData) !== JSON.stringify(lastSavedData);

  // Fetch initial hero data from database
  useEffect(() => {
    async function fetchHero() {
      try {
        setLoading(true);
        const res = await fetch("/api/hero");
        if (res.ok) {
          const data = await res.json();
          const merged = {
            ...defaultHeroData,
            ...data,
          };
          setFormData(merged);
          setLastSavedData(merged);
        }
      } catch (err) {
        console.error("Failed to fetch hero data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchHero();
  }, []);

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

  const handleBadgeChange = (index: number, field: keyof TechBadge, value: any) => {
    const updatedBadges = [...formData.techBadges];
    updatedBadges[index] = {
      ...updatedBadges[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      techBadges: updatedBadges,
    }));
  };

  const handleAddBadge = () => {
    setFormData((prev) => ({
      ...prev,
      techBadges: [
        ...prev.techBadges,
        { name: "", iconKey: "code", colorClass: "text-sky-400", enabled: true },
      ],
    }));
  };

  const handleRemoveBadge = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      techBadges: prev.techBadges.filter((_, i) => i !== index),
    }));
  };

  // Image Upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (isInputDisabled) {
      setStatusMessage({
        type: "error",
        text: isReadOnly
          ? "Demo user mode is active. Image upload is restricted."
          : "Editing is currently locked. Click 'Edit Hero Section' to make changes.",
      });
      return;
    }

    try {
      setUploading(true);
      setStatusMessage(null);

      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to upload image.");
      }

      setFormData((prev) => ({
        ...prev,
        imageUrl: result.url,
      }));

      setStatusMessage({
        type: "success",
        text: "Image uploaded successfully! Remember to click Save Changes.",
      });
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err.message || "Failed to upload image.",
      });
    } finally {
      setUploading(false);
    }
  };

  // Save changes to database
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isInputDisabled) {
      setStatusMessage({
        type: "error",
        text: isReadOnly
          ? "Demo mode: Editing and saving changes is disabled for guest users."
          : "Editing is currently locked. Click 'Edit Hero Section' to enable saving.",
      });
      return;
    }

    try {
      setSaving(true);
      setStatusMessage(null);

      const res = await fetch("/api/hero", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update Hero section.");
      }

      const savedHero = data.hero ? { ...defaultHeroData, ...data.hero } : formData;
      setFormData(savedHero);
      setLastSavedData(savedHero);

      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("portfolio-hero-updated", { detail: savedHero })
        );
      }

      setStatusMessage({
        type: "success",
        text: "Hero section updated successfully in database! Your main website is now live with these changes.",
      });
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err.message || "Something went wrong while saving.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setShowResetModal(true);
  };

  const confirmReset = () => {
    setFormData(defaultHeroData);
    setShowResetModal(false);
    setStatusMessage({
      type: "info",
      text: "Form fields reset to default template. Click 'Save Changes' to apply.",
    });
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header Card */}
      <div className="rounded-xl p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-sky-500/15 via-blue-500/10 to-purple-500/15 border border-sky-500/20 backdrop-blur-xl relative overflow-hidden shadow-xl shadow-sky-500/5 space-y-5 sm:space-y-6">
        <div className="space-y-3 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Dynamic Section Management</span>
            </div>

            {isAdmin && isEditing && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                <Edit3 className="w-3.5 h-3.5 shrink-0" />
                <span>Editing Mode Active</span>
              </div>
            )}

            {hasChanges ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider animate-pulse">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                <span>Unsaved Changes</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>All Saved</span>
              </div>
            )}
          </div>

          <h1 className="text-xl xs:text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Hero Section Settings
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-4xl">
            Update your hero banner headline, professional designation, introduction bio, resume link, social handles, and profile portrait image.
          </p>
        </div>

        {/* Structured Action Bar */}
        <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 relative z-10">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            {isAdmin && (
              <button
                type="button"
                onClick={() => setIsEditing((prev) => !prev)}
                className={`w-full sm:w-auto px-4 py-2.5 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                  isEditing
                    ? "bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-400 hover:bg-amber-500/25 ring-2 ring-amber-500/20"
                    : "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white border-transparent hover:opacity-90 shadow-md shadow-sky-500/20"
                }`}
              >
                {isEditing ? (
                  <>
                    <Lock className="w-4 h-4 shrink-0" />
                    <span>Lock Form</span>
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4 shrink-0" />
                    <span>Edit Hero Section</span>
                  </>
                )}
              </button>
            )}

            <button
              type="submit"
              onClick={handleSubmit}
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
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 shrink-0" />
                  <span>{hasChanges ? "Save Changes" : "No Changes to Save"}</span>
                </>
              )}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <Link
              href="/#home"
              target="_blank"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <ExternalLink className="w-4 h-4 text-sky-500 shrink-0" />
              <span>View Live Banner</span>
            </Link>

            <button
              type="button"
              onClick={handleReset}
              disabled={isInputDisabled || saving}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>
      </div>

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
              <strong className="font-extrabold text-sky-800 dark:text-sky-200">Admin View Mode:</strong> Form fields are currently locked to prevent accidental edits. Click <strong className="text-sky-800 dark:text-sky-200 font-bold">Edit Hero Section</strong> to unlock.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 shadow-md shadow-sky-500/20"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Hero Section</span>
          </button>
        </motion.div>
      )}

      {/* Read Only Banner if guest */}
      {isReadOnly && <ReadOnlyBanner />}

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

      {/* Tab Navigation */}
      <div className="relative w-full max-w-full">
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 overflow-x-auto overflow-y-hidden touch-pan-x scroll-smooth no-scrollbar w-full">
          <button
            type="button"
            onClick={() => setActiveTab("info")}
            className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer shrink-0 whitespace-nowrap ${
              activeTab === "info"
                ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <User className="w-4 h-4 shrink-0" />
            <span>Basic Bio Info</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("links")}
            className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer shrink-0 whitespace-nowrap ${
              activeTab === "links"
                ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span>Resume & Social Links</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("image")}
            className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer shrink-0 whitespace-nowrap ${
              activeTab === "image"
                ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <ImageIcon className="w-4 h-4 shrink-0" />
            <span>Image & Floating Badges</span>
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
            <span>Interactive Live Preview</span>
          </button>
        </div>
      </div>

      {/* Main Form Body */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* TAB 1: BASIC BIO INFO */}
        {activeTab === "info" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 sm:p-6 lg:p-8 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-500 border border-sky-500/20">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  Basic Hero Information
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Configure your primary greeting, main header title, job title, and bio summary.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Availability Status Text & Toggle */}
              <div className="space-y-2 md:col-span-2 p-4 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Work Availability Status & Badge
                    </span>
                  </div>

                  <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="isAvailable"
                      checked={formData.isAvailable !== false}
                      onChange={handleChange}
                      disabled={isInputDisabled}
                      className="sr-only peer"
                    />
                    <div className="relative w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:after:border-slate-600 peer-checked:bg-emerald-500" />
                    <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200">
                      {formData.isAvailable !== false ? "🟢 Status: Active Available" : "⚪ Status: Inactive / Busy"}
                    </span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <FieldHeaderCompare
                      label="Availability Text"
                      savedValue={lastSavedData.availabilityStatus}
                      currentValue={formData.availabilityStatus}
                    />
                    <input
                      type="text"
                      name="availabilityStatus"
                      value={formData.availabilityStatus || ""}
                      onChange={handleChange}
                      placeholder="e.g. Available for Freelance & Full-Time Roles"
                      disabled={isInputDisabled}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all disabled:opacity-60"
                    />
                    <p className="text-[11px] text-slate-400">
                      Headline shown in the green pulsing badge.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <FieldHeaderCompare
                      label="Location & Remote Preference"
                      savedValue={lastSavedData.locationText}
                      currentValue={formData.locationText}
                    />
                    <div className="relative">
                      <input
                        type="text"
                        name="locationText"
                        value={formData.locationText || ""}
                        onChange={handleChange}
                        placeholder="e.g. Dhaka, Bangladesh • Remote Worldwide"
                        disabled={isInputDisabled}
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all disabled:opacity-60"
                      />
                      <MapPin className="w-4 h-4 text-sky-500 absolute left-3 top-3" />
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Displayed next to your availability status.
                    </p>
                  </div>
                </div>
              </div>

              {/* Greeting Text */}
              <div className="space-y-2">
                <FieldHeaderCompare
                  label="Greeting Prefix"
                  savedValue={lastSavedData.greeting}
                  currentValue={formData.greeting}
                />
                <input
                  type="text"
                  name="greeting"
                  value={formData.greeting}
                  onChange={handleChange}
                  placeholder="e.g. Hi, I'm"
                  disabled={isInputDisabled}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all disabled:opacity-60"
                />
                <p className="text-[11px] text-slate-400">
                  Appears as small uppercase tracking text above your main name.
                </p>
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <FieldHeaderCompare
                  label="Full Name / Main Title"
                  savedValue={lastSavedData.name}
                  currentValue={formData.name}
                />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Amit Chandra Das"
                  disabled={isInputDisabled}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all disabled:opacity-60"
                />
                <p className="text-[11px] text-slate-400">
                  The primary large heading of your hero section.
                </p>
              </div>

              {/* Professional Designation */}
              <div className="space-y-2 md:col-span-2">
                <FieldHeaderCompare
                  label="Professional Designation / Job Title"
                  savedValue={lastSavedData.designation}
                  currentValue={formData.designation}
                />
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="e.g. Full-Stack Developer"
                  disabled={isInputDisabled}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all disabled:opacity-60"
                />
                <p className="text-[11px] text-slate-400">
                  Displayed with a sleek gradient highlight under your name.
                </p>
              </div>

              {/* Short Description / Bio */}
              <div className="space-y-2 md:col-span-2">
                <FieldHeaderCompare
                  label="Hero Introduction Bio"
                  savedValue={lastSavedData.description}
                  currentValue={formData.description}
                  extraRight={
                    <span
                      className={`text-xs font-mono font-bold ${
                        (formData.description?.length || 0) >= 290
                          ? "text-rose-500"
                          : (formData.description?.length || 0) >= 250
                          ? "text-amber-500"
                          : "text-slate-400"
                      }`}
                    >
                      {formData.description?.length || 0} / 300 characters
                    </span>
                  }
                />
                <textarea
                  name="description"
                  rows={4}
                  maxLength={300}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your tech stack, passion, and expertise (max 300 characters)..."
                  disabled={isInputDisabled}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-sm font-normal text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all disabled:opacity-60 leading-relaxed"
                />
                <p className="text-[11px] text-slate-400">
                  Paragraph text displayed under your job title. Enforced to 300 characters maximum for optimal responsiveness across all devices.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: RESUME & SOCIAL LINKS */}
        {activeTab === "links" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 sm:p-6 lg:p-8 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  Resume & Social Media Links
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Manage your resume download URL, contact email, and public social profile links.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Resume URL */}
              <div className="space-y-2 md:col-span-2">
                <FieldHeaderCompare
                  label="Resume Download Link (URL)"
                  savedValue={lastSavedData.resumeUrl}
                  currentValue={formData.resumeUrl}
                  extraRight={
                    formData.resumeUrl ? (
                      <a
                        href={formData.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-500 text-[11px] hover:underline flex items-center gap-1 font-semibold"
                      >
                        <span>Test Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : null
                  }
                />
                <div className="relative">
                  <input
                    type="url"
                    name="resumeUrl"
                    value={formData.resumeUrl}
                    onChange={handleChange}
                    placeholder="https://drive.google.com/file/d/..."
                    disabled={isInputDisabled}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all disabled:opacity-60"
                  />
                  <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
                <p className="text-[11px] text-slate-400">
                  Link to your Google Drive PDF, Dropbox file, or hosted resume document.
                </p>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <FieldHeaderCompare
                  label="Contact Email Address"
                  savedValue={lastSavedData.email}
                  currentValue={formData.email}
                />
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="youremail@example.com"
                    disabled={isInputDisabled}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all disabled:opacity-60"
                  />
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              {/* GitHub */}
              <div className="space-y-2">
                <FieldHeaderCompare
                  label="GitHub Profile URL"
                  savedValue={lastSavedData.githubUrl}
                  currentValue={formData.githubUrl}
                />
                <div className="relative">
                  <input
                    type="url"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleChange}
                    placeholder="https://github.com/username"
                    disabled={isInputDisabled}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all disabled:opacity-60"
                  />
                  <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              {/* LinkedIn */}
              <div className="space-y-2">
                <FieldHeaderCompare
                  label="LinkedIn Profile URL"
                  savedValue={lastSavedData.linkedinUrl}
                  currentValue={formData.linkedinUrl}
                />
                <div className="relative">
                  <input
                    type="url"
                    name="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                    disabled={isInputDisabled}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all disabled:opacity-60"
                  />
                  <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              {/* LeetCode */}
              <div className="space-y-2">
                <FieldHeaderCompare
                  label="LeetCode Profile URL"
                  savedValue={lastSavedData.leetcodeUrl}
                  currentValue={formData.leetcodeUrl}
                />
                <div className="relative">
                  <input
                    type="url"
                    name="leetcodeUrl"
                    value={formData.leetcodeUrl}
                    onChange={handleChange}
                    placeholder="https://leetcode.com/u/username"
                    disabled={isInputDisabled}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all disabled:opacity-60"
                  />
                  <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              {/* X / Twitter */}
              <div className="space-y-2 md:col-span-2">
                <FieldHeaderCompare
                  label="X (Twitter) Profile URL"
                  savedValue={lastSavedData.twitterUrl}
                  currentValue={formData.twitterUrl}
                />
                <div className="relative">
                  <input
                    type="url"
                    name="twitterUrl"
                    value={formData.twitterUrl}
                    onChange={handleChange}
                    placeholder="https://x.com/username"
                    disabled={isInputDisabled}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all disabled:opacity-60"
                  />
                  <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: IMAGE & FLOATING BADGES */}
        {activeTab === "image" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Image Section Card */}
            <div className="p-4 sm:p-6 lg:p-8 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    Profile Portrait Image
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Upload a new photo or provide an external image URL.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Image Preview Box */}
                <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 relative group">
                  <div className="relative w-40 aspect-[4/5] rounded-xl overflow-hidden shadow-lg border border-slate-300 dark:border-slate-700">
                    <Image
                      src={formatImageUrl(formData.imageUrl)}
                      alt="Hero Profile Preview"
                      fill
                      unoptimized={formatImageUrl(formData.imageUrl).startsWith("data:") || formatImageUrl(formData.imageUrl).startsWith("http")}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-2">
                    Current Active Image
                  </span>
                </div>

                {/* Upload & URL Controls */}
                <div className="md:col-span-2 space-y-5">
                  {/* File Upload Button */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Option A: Upload Image File from Computer
                    </label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isInputDisabled || uploading}
                      className="w-full py-3.5 px-4 rounded-xl border-2 border-dashed border-sky-500/40 hover:border-sky-500 bg-sky-500/5 hover:bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Uploading File...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          <span>Choose & Upload Image (PNG, JPG, WebP)</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
                    <span>OR</span>
                    <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
                  </div>

                  {/* External URL Input */}
                  <div className="space-y-2">
                    <FieldHeaderCompare
                      label="Option B: Image URL / Path"
                      savedValue={lastSavedData.imageUrl}
                      currentValue={formData.imageUrl}
                    />
                    <input
                      type="text"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleChange}
                      placeholder="/Amit_Image_3.png or https://drive.google.com/file/d/..."
                      disabled={isInputDisabled}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all disabled:opacity-60"
                    />
                    <p className="text-[11px] text-slate-400">
                      Supports direct image links (PNG, JPG, WebP) and Google Drive view links (e.g. <code className="font-mono text-sky-500">https://drive.google.com/file/d/...</code>) which are automatically converted to direct image streams.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Badges Section Card */}
            <div className="p-4 sm:p-6 lg:p-8 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl space-y-6">
              <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                      Floating Tech Badges
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Manage badges displayed around your hero portrait image.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddBadge}
                  disabled={isInputDisabled}
                  className="px-3 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 shrink-0 self-end xs:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Badge</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.techBadges.map((badge, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80"
                  >
                    <div className="flex items-center gap-2 w-full sm:w-1/3">
                      <input
                        type="checkbox"
                        checked={badge.enabled !== false}
                        onChange={(e) => handleBadgeChange(idx, "enabled", e.target.checked)}
                        disabled={isInputDisabled}
                        className="w-4 h-4 rounded text-sky-500 focus:ring-sky-500 cursor-pointer shrink-0"
                      />
                      <input
                        type="text"
                        value={badge.name}
                        onChange={(e) => handleBadgeChange(idx, "name", e.target.value)}
                        placeholder="Badge Label"
                        disabled={isInputDisabled}
                        className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 w-full sm:w-1/2">
                      <input
                        type="text"
                        value={badge.iconKey}
                        onChange={(e) => handleBadgeChange(idx, "iconKey", e.target.value)}
                        placeholder="Icon (react, next, ts, node)"
                        disabled={isInputDisabled}
                        className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300 outline-none truncate"
                      />
                      <input
                        type="text"
                        value={badge.colorClass}
                        onChange={(e) => handleBadgeChange(idx, "colorClass", e.target.value)}
                        placeholder="Color (text-cyan-400)"
                        disabled={isInputDisabled}
                        className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300 outline-none truncate"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveBadge(idx)}
                      disabled={isInputDisabled}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer disabled:opacity-50 self-end sm:self-center shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: INTERACTIVE LIVE PREVIEW */}
        {activeTab === "preview" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="p-3 sm:p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-600 dark:text-sky-400">
                <Eye className="w-4 h-4 shrink-0" />
                <span>Real-Time Preview (Includes unsaved form changes)</span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                Switch tabs to make further adjustments
              </span>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-[#020617] w-full">
              <Hero heroData={formData} isPreview />
            </div>
          </motion.div>
        )}
      </form>

      {/* RESET CONFIRMATION MODAL */}
      <AnimatePresence>
        {showResetModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResetModal(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md p-6 sm:p-7 rounded-xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-950/40 space-y-6 z-10"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 shrink-0">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    Reset Hero Section Defaults?
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    Are you sure you want to reset all input fields (greeting, name, job title, bio summary, links, and profile image) to default settings?
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/25 text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                <span className="font-bold text-rose-600 dark:text-rose-400">Important Note:</span> This will reset your editor inputs and live preview. Your live website won't change until you click <strong className="text-slate-900 dark:text-white font-bold">Save Changes</strong>.
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowResetModal(false)}
                  className="px-4.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={confirmReset}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 via-red-600 to-rose-600 hover:from-rose-600 hover:to-red-700 text-white text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-rose-500/25 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Yes, Reset Fields</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
