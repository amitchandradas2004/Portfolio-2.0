"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Edit3,
  CheckCircle2,
  Lock,
  Plus,
  Save,
  Loader2,
  ExternalLink,
  RotateCcw,
  AlertCircle,
} from "lucide-react";
import { ReadOnlyBanner } from "@/components/dashboard/ReadOnlyBanner";

interface SkillsHeaderProps {
  totalSkillsCount: number;
  categoriesCount: number;
  isEditing: boolean;
  hasChanges: boolean;
  canEdit: boolean;
  isInputDisabled: boolean;
  saving: boolean;
  statusMessage: {
    type: "success" | "error" | "info";
    text: string;
  } | null;
  isReadOnly: boolean;
  onToggleEditing: () => void;
  onOpenAddSkill: () => void;
  onSaveAll: () => void;
  onOpenReset: () => void;
  onDismissStatus: () => void;
}

export function SkillsHeader({
  totalSkillsCount,
  categoriesCount,
  isEditing,
  hasChanges,
  canEdit,
  isInputDisabled,
  saving,
  statusMessage,
  isReadOnly,
  onToggleEditing,
  onOpenAddSkill,
  onSaveAll,
  onOpenReset,
  onDismissStatus,
}: SkillsHeaderProps) {
  return (
    <>
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
                {totalSkillsCount} Skills • {categoriesCount} Categories
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
              onClick={onToggleEditing}
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
              onClick={onOpenAddSkill}
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
              onClick={onSaveAll}
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
              onClick={onOpenReset}
              disabled={isInputDisabled || saving}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 hover:border-rose-400/50 dark:hover:border-rose-500/40 hover:bg-rose-50/60 dark:hover:bg-rose-950/25 hover:text-rose-600 dark:hover:text-rose-400 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs group"
            >
              <RotateCcw className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-rose-500 group-hover:-rotate-45 transition-all shrink-0" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. DEMO VISITOR MODE BANNER */}
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
              onClick={onDismissStatus}
              className="text-xs opacity-70 hover:opacity-100 cursor-pointer"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
