"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, BrainCircuit, Plus, Check, X, Edit3, Trash2 } from "lucide-react";
import { AboutTech, AboutLearning } from "@/lib/about-types";
import { renderAboutTechIcon, renderLearningIcon } from "@/lib/about-icons";

interface AboutTechsTabProps {
  currentTechs: AboutTech[];
  learningFocus: AboutLearning[];
  isInputDisabled: boolean;
  onAddTech: () => void;
  onEditTech: (tech: AboutTech) => void;
  onDeleteTech: (tech: AboutTech) => void;
  onToggleTech: (id: string) => void;
  onAddLearning: () => void;
  onEditLearning: (item: AboutLearning) => void;
  onDeleteLearning: (item: AboutLearning) => void;
}

export function AboutTechsTab({
  currentTechs,
  learningFocus,
  isInputDisabled,
  onAddTech,
  onEditTech,
  onDeleteTech,
  onToggleTech,
  onAddLearning,
  onEditLearning,
  onDeleteLearning,
}: AboutTechsTabProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-6 lg:p-8 rounded-xl bg-white/70 dark:bg-slate-950/85 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl space-y-8"
    >
      {/* Current Technologies Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-500 border border-sky-500/20">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Current Technologies Chips ({currentTechs?.length || 0})
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                The technology badges shown in the middle of your developer overview card.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onAddTech}
            disabled={isInputDisabled}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-sky-500/20 hover:opacity-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Technology</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2.5 pt-2">
          {currentTechs.map((tech) => (
            <div
              key={tech.id}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border transition-all text-xs font-semibold ${
                tech.enabled !== false
                  ? "bg-white dark:bg-slate-900/90 border-slate-200/80 dark:border-slate-800/80 text-slate-800 dark:text-slate-100 shadow-xs"
                  : "bg-slate-100 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60 line-through"
              }`}
            >
              <span className={tech.color}>
                {renderAboutTechIcon(tech.iconKey, "w-4 h-4")}
              </span>
              <span>{tech.name}</span>

              <div className="flex items-center gap-1 ml-1 pl-1.5 border-l border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => onToggleTech(tech.id)}
                  disabled={isInputDisabled}
                  title={tech.enabled !== false ? "Disable" : "Enable"}
                  className="p-1 hover:text-sky-500 disabled:opacity-40 cursor-pointer"
                >
                  {tech.enabled !== false ? (
                    <Check className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <X className="w-3 h-3 text-slate-400" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => onEditTech(tech)}
                  disabled={isInputDisabled}
                  title="Edit Tech"
                  className="p-1 hover:text-sky-500 disabled:opacity-40 cursor-pointer"
                >
                  <Edit3 className="w-3 h-3 text-slate-400 hover:text-sky-500" />
                </button>

                <button
                  type="button"
                  onClick={() => onDeleteTech(tech)}
                  disabled={isInputDisabled}
                  title="Delete Tech"
                  className="p-1 hover:text-rose-500 disabled:opacity-40 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3 text-slate-400 hover:text-rose-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Currently Learning Focus Items Section */}
      <div className="space-y-4 pt-6 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Currently Learning Focus ({learningFocus?.length || 0})
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                The cards at the bottom of your overview card displaying your technical growth goals.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onAddLearning}
            disabled={isInputDisabled}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-purple-500/20 hover:opacity-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Learning Focus</span>
          </button>
        </div>

        <div className="space-y-3">
          {learningFocus.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-white dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="shrink-0 p-2 rounded-xl bg-gradient-to-br from-sky-500/15 to-blue-500/10 dark:from-sky-400/15 dark:to-blue-400/10 text-sky-600 dark:text-sky-400">
                  {renderLearningIcon(item.iconKey, "w-4 h-4")}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => onEditLearning(item)}
                  disabled={isInputDisabled}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 hover:bg-sky-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  onClick={() => onDeleteLearning(item)}
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
      </div>
    </motion.div>
  );
}
