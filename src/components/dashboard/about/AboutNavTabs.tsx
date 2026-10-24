"use client";

import React from "react";
import { FileText, Sparkles, Zap, Code2, Eye } from "lucide-react";

export type AboutDashboardTab =
  | "narrative"
  | "traits"
  | "overviewCard"
  | "techs"
  | "preview";

interface AboutNavTabsProps {
  activeTab: AboutDashboardTab;
  onTabChange: (tab: AboutDashboardTab) => void;
  traitsCount: number;
  techsCount: number;
}

export function AboutNavTabs({
  activeTab,
  onTabChange,
  traitsCount,
  techsCount,
}: AboutNavTabsProps) {
  return (
    <div className="relative w-full max-w-full">
      <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 overflow-x-auto overflow-y-hidden touch-pan-x scroll-smooth no-scrollbar w-full">
        <button
          type="button"
          onClick={() => onTabChange("narrative")}
          className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer shrink-0 whitespace-nowrap ${
            activeTab === "narrative"
              ? "bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-md"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <FileText className="w-4 h-4 shrink-0" />
          <span>Bio Narrative & Story</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange("traits")}
          className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer shrink-0 whitespace-nowrap ${
            activeTab === "traits"
              ? "bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-md"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>Core Traits ({traitsCount})</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange("overviewCard")}
          className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer shrink-0 whitespace-nowrap ${
            activeTab === "overviewCard"
              ? "bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-md"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Zap className="w-4 h-4 shrink-0" />
          <span>Card Header & 4 Stats</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange("techs")}
          className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer shrink-0 whitespace-nowrap ${
            activeTab === "techs"
              ? "bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-md"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Code2 className="w-4 h-4 shrink-0" />
          <span>Technologies ({techsCount}) & Learning</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange("preview")}
          className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer shrink-0 whitespace-nowrap ${
            activeTab === "preview"
              ? "bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-md"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Eye className="w-4 h-4 shrink-0" />
          <span>Interactive Live Preview</span>
        </button>
      </div>
    </div>
  );
}
