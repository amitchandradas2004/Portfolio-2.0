"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, X, Check, Loader2 } from "lucide-react";
import { SkillItem } from "@/lib/skills-types";
import { renderSkillIcon, SKILL_COLOR_PRESETS } from "@/lib/skill-icons";
import { NiceSelect, NiceSelectOption } from "@/components/dashboard/NiceSelect";

interface SkillModalProps {
  isOpen: boolean;
  mode: "add" | "edit";
  categoryId: string;
  skill: SkillItem;
  saving: boolean;
  iconSearchTerm: string;
  filteredPopularIcons: Array<{ key: string; name: string; defaultColor: string }>;
  categorySelectOptions: NiceSelectOption[];
  proficiencyLevelOptions: NiceSelectOption[];
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onSkillChange: (skill: SkillItem) => void;
  onCategoryChange: (categoryId: string) => void;
  onSearchIconChange: (term: string) => void;
}

export function SkillModal({
  isOpen,
  mode,
  categoryId,
  skill,
  saving,
  iconSearchTerm,
  filteredPopularIcons,
  categorySelectOptions,
  proficiencyLevelOptions,
  onClose,
  onSubmit,
  onSkillChange,
  onCategoryChange,
  onSearchIconChange,
}: SkillModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 shadow-2xl p-5 sm:p-7 space-y-5 my-auto max-h-[92vh] overflow-y-auto overscroll-contain"
          >
            <div className="flex items-start sm:items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-sky-500/10 text-sky-500 shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:base font-bold text-slate-900 dark:text-white truncate">
                    {mode === "add" ? "Add New Skill" : "Edit Skill"}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">
                    Configure skill details, icon, and visual accents
                  </p>
                </div>
              </div>

              <button
                type="button"
                disabled={saving}
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              {/* Row 1: Skill Name + Category side by side on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Skill Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Next.js, Docker, Python"
                    value={skill.name}
                    onChange={(e) =>
                      onSkillChange({
                        ...skill,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                  />
                </div>

                <NiceSelect
                  label="Category"
                  required
                  value={categoryId}
                  onChange={onCategoryChange}
                  options={categorySelectOptions}
                  placeholder="Select a category..."
                />
              </div>

              {/* Badge Preview */}
              <div className="p-3.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex flex-row items-center justify-between gap-3">
                <span className="text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 shrink-0">
                  Badge Preview:
                </span>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold shadow-xs max-w-full overflow-hidden">
                  <div className={`shrink-0 ${skill.iconColor || "text-sky-400"}`}>
                    {renderSkillIcon(skill.iconKey, "w-4 h-4")}
                  </div>
                  <span className="truncate max-w-[150px] xs:max-w-[200px]">
                    {skill.name || "Skill Name"}
                  </span>
                  {skill.level && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-200/60 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400 font-medium shrink-0">
                      {skill.level}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Icon Key ({skill.iconKey})
                  </label>
                  <span className="text-[10px] text-slate-400">Select or search</span>
                </div>

                <input
                  type="text"
                  placeholder="Search icons (e.g. react, python, docker, git)..."
                  value={iconSearchTerm}
                  onChange={(e) => onSearchIconChange(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                />

                <div className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-8 gap-1.5 sm:gap-2 max-h-40 overflow-y-auto p-2 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200/70 dark:border-slate-800">
                  {filteredPopularIcons.map((opt) => {
                    const isSelected = skill.iconKey === opt.key;
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() =>
                          onSkillChange({
                            ...skill,
                            iconKey: opt.key,
                            iconColor: skill.iconColor || opt.defaultColor,
                          })
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
                    const isSelected = skill.iconColor === color.value;
                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() =>
                          onSkillChange({
                            ...skill,
                            iconColor: color.value,
                          })
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <NiceSelect
                    label="Proficiency Level"
                    value={skill.level || "Advanced"}
                    onChange={(val) =>
                      onSkillChange({
                        ...skill,
                        level: val,
                      })
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
                      {skill.proficiency || 90}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={skill.proficiency || 90}
                    onChange={(e) =>
                      onSkillChange({
                        ...skill,
                        proficiency: parseInt(e.target.value),
                      })
                    }
                    className="w-full accent-sky-500 cursor-pointer mt-1 sm:mt-2.5 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1 sm:pt-2">
                <input
                  type="checkbox"
                  id="skill-enabled"
                  checked={skill.enabled !== false}
                  onChange={(e) =>
                    onSkillChange({
                      ...skill,
                      enabled: e.target.checked,
                    })
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

              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-5 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  disabled={saving}
                  onClick={onClose}
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
                      <span>{mode === "add" ? "Adding Skill..." : "Saving Changes..."}</span>
                    </>
                  ) : (
                    <span>{mode === "add" ? "Add & Save Skill" : "Update & Save Skill"}</span>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
