"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { SkillCategory } from "@/lib/skills-types";
import { NiceSelect, NiceSelectOption } from "@/components/dashboard/NiceSelect";

interface CategoryModalProps {
  isOpen: boolean;
  mode: "add" | "edit";
  category: SkillCategory;
  saving: boolean;
  categoryIconSelectOptions: NiceSelectOption[];
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onCategoryChange: (category: SkillCategory) => void;
}

export function CategoryModal({
  isOpen,
  mode,
  category,
  saving,
  categoryIconSelectOptions,
  onClose,
  onSubmit,
  onCategoryChange,
}: CategoryModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 sm:p-6 space-y-4 my-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {mode === "add" ? "Add Category" : "Edit Category"}
              </h3>
              <button
                type="button"
                disabled={saving}
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                  Category Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mobile Development, DevOps & Cloud"
                  value={category.title}
                  onChange={(e) =>
                    onCategoryChange({
                      ...category,
                      title: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <NiceSelect
                  label="Category Icon"
                  value={category.iconKey}
                  onChange={(val) =>
                    onCategoryChange({
                      ...category,
                      iconKey: val,
                    })
                  }
                  options={categoryIconSelectOptions}
                  placeholder="Select an icon..."
                />
              </div>

              <div className="flex flex-col-reverse xs:flex-row items-stretch xs:items-center justify-end gap-2.5 sm:gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  disabled={saving}
                  onClick={onClose}
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
                      <span>{mode === "add" ? "Adding Category..." : "Saving Changes..."}</span>
                    </>
                  ) : (
                    <span>{mode === "add" ? "Add Category" : "Save Category"}</span>
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
