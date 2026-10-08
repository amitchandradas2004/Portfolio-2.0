"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Layers } from "lucide-react";

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 pb-12 animate-pulse">
      {/* 1. Header Banner Skeleton */}
      <div className="rounded-3xl p-6 sm:p-8 bg-slate-100 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl relative overflow-hidden shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 w-full max-w-xl">
            {/* Badge Shimmer */}
            <div className="w-44 h-6 rounded-full bg-slate-200 dark:bg-slate-800" />
            {/* Title Shimmer */}
            <div className="w-3/4 sm:w-96 h-9 rounded-2xl bg-gradient-to-r from-slate-200 via-sky-200/40 to-slate-200 dark:from-slate-800 dark:via-sky-900/30 dark:to-slate-800" />
            {/* Subtitle Lines Shimmer */}
            <div className="space-y-2 pt-1">
              <div className="w-full h-4 rounded-md bg-slate-200 dark:bg-slate-800/70" />
              <div className="w-4/5 h-4 rounded-md bg-slate-200 dark:bg-slate-800/70" />
            </div>
          </div>

          {/* Action Buttons Shimmer */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-28 h-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="w-32 h-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      </div>

      {/* 2. Tabs Skeleton */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 w-fit">
        <div className="w-28 h-9 rounded-xl bg-slate-200 dark:bg-slate-800" />
        <div className="w-36 h-9 rounded-xl bg-slate-200 dark:bg-slate-800" />
        <div className="w-36 h-9 rounded-xl bg-slate-200 dark:bg-slate-800" />
        <div className="w-36 h-9 rounded-xl bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* 3. Main Form / Content Card Skeleton */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
          <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0" />
          <div className="space-y-2 w-full max-w-sm">
            <div className="w-48 h-5 rounded-md bg-slate-200 dark:bg-slate-800" />
            <div className="w-72 h-3.5 rounded-md bg-slate-200 dark:bg-slate-800/60" />
          </div>
        </div>

        {/* Input Fields Grid Shimmer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="w-28 h-4 rounded-md bg-slate-200 dark:bg-slate-800" />
            <div className="w-full h-12 rounded-xl bg-slate-200/80 dark:bg-slate-800/60" />
          </div>

          <div className="space-y-2">
            <div className="w-36 h-4 rounded-md bg-slate-200 dark:bg-slate-800" />
            <div className="w-full h-12 rounded-xl bg-slate-200/80 dark:bg-slate-800/60" />
          </div>

          <div className="space-y-2 md:col-span-2">
            <div className="w-44 h-4 rounded-md bg-slate-200 dark:bg-slate-800" />
            <div className="w-full h-12 rounded-xl bg-slate-200/80 dark:bg-slate-800/60" />
          </div>

          <div className="space-y-2 md:col-span-2">
            <div className="w-36 h-4 rounded-md bg-slate-200 dark:bg-slate-800" />
            <div className="w-full h-28 rounded-xl bg-slate-200/80 dark:bg-slate-800/60" />
          </div>
        </div>
      </div>
    </div>
  );
}
