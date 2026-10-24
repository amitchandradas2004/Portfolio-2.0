"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Save,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  Loader2,
  Edit3,
  Lock,
} from "lucide-react";

interface AboutHeaderProps {
  isAdmin: boolean;
  isEditing: boolean;
  isInputDisabled: boolean;
  saving: boolean;
  hasChanges: boolean;
  onToggleEdit: () => void;
  onSave: () => void;
  onReset: () => void;
}

export function AboutHeader({
  isAdmin,
  isEditing,
  isInputDisabled,
  saving,
  hasChanges,
  onToggleEdit,
  onSave,
  onReset,
}: AboutHeaderProps) {
  return (
    <div className="rounded-xl p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-sky-500/15 via-blue-500/10 to-purple-500/15 dark:bg-slate-950/80 border border-sky-500/20 backdrop-blur-xl relative overflow-hidden shadow-xl shadow-sky-500/5 space-y-5 sm:space-y-6">
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
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
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
          About Section Settings
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-4xl">
          Manage your personal biography, narrative story, core development traits, developer statistics card, technologies, and active learning pursuits.
        </p>
      </div>

      {/* Action Bar */}
      <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 relative z-10">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
          {isAdmin && (
            <button
              type="button"
              onClick={onToggleEdit}
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
                  <span>Edit About Section</span>
                </>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={onSave}
            disabled={isInputDisabled || saving || !hasChanges}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
              hasChanges && !isInputDisabled && !saving
                ? "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white shadow-lg shadow-sky-500/25 cursor-pointer"
                : "bg-slate-200 dark:bg-slate-900/80 text-slate-400 dark:text-slate-500 border border-slate-300/40 dark:border-slate-800/60 cursor-not-allowed opacity-60"
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
            href="/#about"
            target="_blank"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
          >
            <ExternalLink className="w-4 h-4 text-sky-500 shrink-0" />
            <span>View Live Section</span>
          </Link>

          <button
            type="button"
            onClick={onReset}
            disabled={isInputDisabled || saving}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>
    </div>
  );
}
