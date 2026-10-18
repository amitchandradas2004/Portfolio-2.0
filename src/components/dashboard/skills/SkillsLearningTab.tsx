"use client";

import React from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";
import { LearningItem } from "@/lib/skills-types";
import { renderSkillIcon } from "@/lib/skill-icons";

interface SkillsLearningTabProps {
  learningItems: LearningItem[];
  isInputDisabled: boolean;
  onOpenAddLearning: () => void;
  onOpenEditLearning: (item: LearningItem) => void;
  onOpenDeleteLearning: (itemId: string, itemName: string) => void;
}

export function SkillsLearningTab({
  learningItems,
  isInputDisabled,
  onOpenAddLearning,
  onOpenEditLearning,
  onOpenDeleteLearning,
}: SkillsLearningTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3 p-4 rounded-xl bg-white/70 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            Currently Learning & Exploring
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Showcase your continuous growth mindset, upcoming technologies, and engineering focus.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenAddLearning}
          disabled={isInputDisabled}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${
            !isInputDisabled
              ? "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white cursor-pointer shadow-md shadow-sky-500/20"
              : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed opacity-60"
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Add Learning Item</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {(learningItems || []).map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl bg-white/80 dark:bg-slate-950/85 border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0 ${item.color}`}>
                {renderSkillIcon(item.iconKey, "w-4 h-4")}
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">{item.name}</h3>
                <span className="text-[10px] text-slate-400">Key: {item.iconKey}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => onOpenEditLearning(item)}
                disabled={isInputDisabled}
                className={`p-1.5 rounded-md text-slate-400 hover:text-sky-500 ${
                  isInputDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (isInputDisabled) return;
                  onOpenDeleteLearning(item.id || item.name, item.name);
                }}
                disabled={isInputDisabled}
                className={`p-1.5 rounded-md text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors ${
                  isInputDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                }`}
                title="Delete learning item"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
