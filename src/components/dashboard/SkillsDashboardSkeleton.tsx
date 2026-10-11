"use client";

import React from "react";
import { motion } from "framer-motion";

export function SkillsDashboardSkeleton() {
  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header Banner Skeleton */}
      <div className="rounded-xl p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-sky-500/10 via-blue-500/5 to-purple-500/10 border border-sky-500/20 backdrop-blur-xl relative overflow-hidden shadow-lg space-y-5 sm:space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-3 w-full max-w-xl">
            {/* Badges row shimmer */}
            <div className="flex items-center gap-2">
              <div className="w-40 h-5 rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="w-24 h-5 rounded-full bg-slate-200 dark:bg-slate-800" />
            </div>
            {/* Title Shimmer */}
            <motion.div
              animate={{ opacity: [0.4, 0.85, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-3/4 sm:w-80 h-8 sm:h-9 rounded-xl bg-gradient-to-r from-slate-200 via-sky-200/50 to-slate-200 dark:from-slate-800 dark:via-sky-900/30 dark:to-slate-800"
            />
            {/* Subtitle Lines Shimmer */}
            <div className="space-y-2 pt-1">
              <div className="w-full h-3.5 sm:h-4 rounded-md bg-slate-200 dark:bg-slate-800/70" />
              <div className="w-4/5 h-3.5 sm:h-4 rounded-md bg-slate-200 dark:bg-slate-800/70" />
            </div>
          </div>

          {/* Action Buttons Shimmer */}
          <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
            <div className="w-full xs:w-32 h-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="w-full xs:w-32 h-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>

        {/* Action bar shimmer */}
        <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-wrap gap-3">
          <div className="w-32 h-9 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="w-36 h-9 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="w-28 h-9 rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>

      {/* 2. Tabs Skeleton */}
      <div className="relative w-full max-w-full">
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 overflow-x-auto no-scrollbar w-full">
          <div className="w-28 h-9 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0" />
          <div className="w-36 h-9 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0" />
          <div className="w-40 h-9 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0" />
          <div className="w-32 h-9 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0" />
          <div className="w-28 h-9 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0" />
        </div>
      </div>

      {/* 3. Search and stats bar shimmer */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl">
        <div className="w-full sm:w-72 h-10 rounded-xl bg-slate-200/80 dark:bg-slate-800/80" />
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-24 h-8 rounded-lg bg-slate-200/80 dark:bg-slate-800/80" />
          <div className="w-24 h-8 rounded-lg bg-slate-200/80 dark:bg-slate-800/80" />
        </div>
      </div>

      {/* 4. Category Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[0, 1, 2, 3].map((idx) => (
          <motion.div
            key={idx}
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: idx * 0.15 }}
            className="p-5 sm:p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl space-y-5"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
                <div className="space-y-1.5">
                  <div className="w-36 h-4.5 rounded-md bg-slate-200 dark:bg-slate-800" />
                  <div className="w-20 h-3 rounded-md bg-slate-200 dark:bg-slate-800/60" />
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800" />
            </div>

            {/* Chips Grid */}
            <div className="flex flex-wrap gap-2.5">
              {Array.from({ length: 6 }).map((_, cIdx) => (
                <div
                  key={cIdx}
                  className="h-10 rounded-xl bg-slate-200/70 dark:bg-slate-800/60 border border-slate-300/40 dark:border-slate-700/40 px-3 flex items-center gap-2"
                  style={{ width: `${80 + ((cIdx * 23) % 40)}px` }}
                >
                  <div className="w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-700 shrink-0" />
                  <div className="h-3 w-12 rounded bg-slate-300 dark:bg-slate-700" />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
