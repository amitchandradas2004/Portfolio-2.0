"use client";

import React from "react";
import { Loader2, Save } from "lucide-react";
import { SkillsData } from "@/lib/skills-types";

interface SkillsSettingsTabProps {
  formData: SkillsData;
  setFormData: React.Dispatch<React.SetStateAction<SkillsData>>;
  isInputDisabled: boolean;
  saving: boolean;
  onSaveAll: () => void;
}

export function SkillsSettingsTab({
  formData,
  setFormData,
  isInputDisabled,
  saving,
  onSaveAll,
}: SkillsSettingsTabProps) {
  return (
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
          onClick={onSaveAll}
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
  );
}
