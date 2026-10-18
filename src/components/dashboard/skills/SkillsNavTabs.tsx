"use client";

import React from "react";
import { Cpu, Layers, BrainCircuit, Settings, Eye } from "lucide-react";

export type SkillDashboardTab =
  | "overview"
  | "categories"
  | "learning"
  | "settings"
  | "preview";

interface SkillsNavTabsProps {
  activeTab: SkillDashboardTab;
  onTabChange: (tab: SkillDashboardTab) => void;
  totalSkillsCount: number;
  categoriesCount: number;
  learningCount: number;
}

export function SkillsNavTabs({
  activeTab,
  onTabChange,
  totalSkillsCount,
  categoriesCount,
  learningCount,
}: SkillsNavTabsProps) {
  return (
    <div className="relative w-full max-w-full">
      <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 overflow-x-auto overflow-y-hidden touch-pan-x scroll-smooth no-scrollbar w-full">
        <button
          type="button"
          onClick={() => onTabChange("overview")}
          className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer shrink-0 whitespace-nowrap ${
            activeTab === "overview"
              ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-md"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Cpu className="w-4 h-4 shrink-0" />
          <span>Skills Overview</span>
          <span className="px-1.5 py-0.2 rounded-md bg-sky-500/10 text-[10px] font-bold text-sky-600 dark:text-sky-400">
            {totalSkillsCount}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange("categories")}
          className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer shrink-0 whitespace-nowrap ${
            activeTab === "categories"
              ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-md"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Layers className="w-4 h-4 shrink-0" />
          <span>Categories ({categoriesCount})</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange("learning")}
          className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer shrink-0 whitespace-nowrap ${
            activeTab === "learning"
              ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-md"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <BrainCircuit className="w-4 h-4 shrink-0" />
          <span>Growth / Learning ({learningCount})</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange("settings")}
          className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer shrink-0 whitespace-nowrap ${
            activeTab === "settings"
              ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-md"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Settings className="w-4 h-4 shrink-0" />
          <span>Section Content</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange("preview")}
          className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer shrink-0 whitespace-nowrap ${
            activeTab === "preview"
              ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-md"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Eye className="w-4 h-4 shrink-0" />
          <span>Live Section Preview</span>
        </button>
      </div>
    </div>
  );
}
