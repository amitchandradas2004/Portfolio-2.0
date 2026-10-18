"use client";

import React from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";
import { SkillCategory } from "@/lib/skills-types";
import { renderCategoryIcon } from "@/lib/skill-icons";

interface SkillsCategoriesTabProps {
  categories: SkillCategory[];
  isInputDisabled: boolean;
  onOpenAddCategory: () => void;
  onOpenEditCategory: (category: SkillCategory) => void;
  onOpenDeleteCategory: (categoryId: string, categoryTitle: string) => void;
}

export function SkillsCategoriesTab({
  categories,
  isInputDisabled,
  onOpenAddCategory,
  onOpenEditCategory,
  onOpenDeleteCategory,
}: SkillsCategoriesTabProps) {
  return (
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
          onClick={onOpenAddCategory}
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
        {categories.map((cat) => (
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
                onClick={() => onOpenEditCategory(cat)}
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
                  onOpenDeleteCategory(cat.id, cat.title);
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
  );
}
