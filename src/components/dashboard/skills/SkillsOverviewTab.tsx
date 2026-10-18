"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Plus, Cpu, Edit3, Trash2 } from "lucide-react";
import { SkillCategory, SkillItem } from "@/lib/skills-types";
import { renderCategoryIcon, renderSkillIcon } from "@/lib/skill-icons";

interface SkillsOverviewTabProps {
  categories: SkillCategory[];
  filteredCategories: SkillCategory[];
  totalSkillsCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategoryFilter: string;
  onCategoryFilterChange: (filter: string) => void;
  isInputDisabled: boolean;
  onOpenAddSkill: (categoryId?: string) => void;
  onToggleSkill: (categoryId: string, skillId: string) => void;
  onOpenEditSkill: (categoryId: string, skill: SkillItem) => void;
  onOpenDeleteSkill: (skillId: string, skillName: string, categoryId: string) => void;
}

export function SkillsOverviewTab({
  categories,
  filteredCategories,
  totalSkillsCount,
  searchQuery,
  onSearchChange,
  selectedCategoryFilter,
  onCategoryFilterChange,
  isInputDisabled,
  onOpenAddSkill,
  onToggleSkill,
  onOpenEditSkill,
  onOpenDeleteSkill,
}: SkillsOverviewTabProps) {
  return (
    <div className="space-y-6">
      {/* Search & Category Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-4 rounded-xl bg-white/70 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-sm">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search skills (e.g. React, Next, Mongo, Docker)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 text-xs sm:text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            type="button"
            onClick={() => onCategoryFilterChange("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedCategoryFilter === "all"
                ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/20 border-transparent"
                : "bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            All Categories ({totalSkillsCount})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategoryFilterChange(cat.id)}
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
                    onClick={() => onOpenAddSkill(category.id)}
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
                      onClick={() => onOpenAddSkill(category.id)}
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
                          onClick={() => onToggleSkill(category.id, skill.id)}
                          title={
                            isHidden
                              ? "Click to enable & show on homepage"
                              : "Click to hide from homepage"
                          }
                          className={`shrink-0 cursor-pointer transition-transform hover:scale-110 ${
                            skill.iconColor || "text-sky-400"
                          }`}
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
                            onClick={() => onOpenEditSkill(category.id, skill)}
                            disabled={isInputDisabled}
                            title="Edit skill"
                            className={`p-1 rounded-md text-slate-400 hover:text-sky-500 transition-colors ${
                              isInputDisabled
                                ? "cursor-not-allowed opacity-50"
                                : "cursor-pointer"
                            }`}
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (isInputDisabled) return;
                              onOpenDeleteSkill(skill.id, skill.name, category.id);
                            }}
                            disabled={isInputDisabled}
                            title="Delete skill"
                            className={`p-1 rounded-md text-slate-400 hover:text-rose-500 transition-colors ${
                              isInputDisabled
                                ? "cursor-not-allowed opacity-50"
                                : "cursor-pointer"
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
  );
}
