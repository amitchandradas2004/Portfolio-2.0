"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Plus, Edit3, Trash2 } from "lucide-react";
import { AboutTrait } from "@/lib/about-types";
import { renderTraitIcon } from "@/lib/about-icons";

interface AboutTraitsTabProps {
  traits: AboutTrait[];
  isInputDisabled: boolean;
  onAddTrait: () => void;
  onEditTrait: (trait: AboutTrait) => void;
  onDeleteTrait: (trait: AboutTrait) => void;
}

export function AboutTraitsTab({
  traits,
  isInputDisabled,
  onAddTrait,
  onEditTrait,
  onDeleteTrait,
}: AboutTraitsTabProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-6 lg:p-8 rounded-xl bg-white/70 dark:bg-slate-950/85 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl space-y-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Core Developer Traits ({traits?.length || 0})
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              The highlighted feature cards shown directly beneath your narrative paragraphs.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onAddTrait}
          disabled={isInputDisabled}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-sky-500/20 hover:opacity-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Trait Card</span>
        </button>
      </div>

      {traits.length === 0 ? (
        <div className="p-8 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
          <p className="text-sm font-semibold text-slate-500">
            No trait cards configured yet. Click &quot;Add New Trait Card&quot; to create one.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {traits.map((trait) => (
            <div
              key={trait.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-col justify-between gap-4 group hover:border-sky-500/40 transition-all"
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`p-2.5 rounded-xl shrink-0 ${
                    trait.badgeBg || "bg-sky-500/10"
                  } ${trait.iconColor || "text-sky-500"}`}
                >
                  {renderTraitIcon(trait.iconKey, "w-5 h-5")}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {trait.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {trait.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <button
                  type="button"
                  onClick={() => onEditTrait(trait)}
                  disabled={isInputDisabled}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 hover:bg-sky-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  onClick={() => onDeleteTrait(trait)}
                  disabled={isInputDisabled}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 bg-rose-500/10 hover:bg-rose-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
