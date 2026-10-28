import React from "react";

export default function ProjectDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] pt-24 pb-16 px-4 sm:px-6 lg:px-12">
      <div className="container mx-auto max-w-5xl space-y-10">
        {/* Top Back Link & Badge Skeleton */}
        <div className="flex items-center justify-between">
          <div className="skeleton-shimmer w-28 h-6 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="skeleton-shimmer skeleton-delay-1 w-32 h-6 rounded-full bg-slate-200 dark:bg-slate-800" />
        </div>

        {/* Hero Title & Subtitle Skeleton */}
        <div className="space-y-4 max-w-3xl">
          <div className="skeleton-shimmer skeleton-gradient w-3/4 sm:w-2/3 h-12 rounded-2xl bg-gradient-to-r from-slate-200 via-sky-200/50 to-slate-200 dark:from-slate-800 dark:via-sky-900/40 dark:to-slate-800" />
          <div className="skeleton-shimmer skeleton-delay-1 w-full sm:w-4/5 h-6 rounded-lg bg-slate-200 dark:bg-slate-800/70" />
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex items-center gap-4">
          <div className="skeleton-shimmer skeleton-gradient w-36 h-12 rounded-full bg-gradient-to-r from-sky-400/50 via-blue-500/50 to-purple-500/50" />
          <div className="skeleton-shimmer w-36 h-12 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300/40 dark:border-slate-700/40" />
        </div>

        {/* Large Featured Image Skeleton */}
        <div className="skeleton-shimmer skeleton-gradient w-full aspect-[16/9] rounded-3xl bg-gradient-to-tr from-slate-200 via-sky-200/40 to-slate-200 dark:from-slate-800 dark:via-sky-900/30 dark:to-slate-800 border border-slate-300/40 dark:border-slate-700/40 overflow-hidden shadow-2xl" />

        {/* Tech Badges Shimmer Grid */}
        <div className="space-y-3 pt-4">
          <div className="skeleton-shimmer w-36 h-4 rounded-md bg-slate-200 dark:bg-slate-800" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className={`skeleton-shimmer skeleton-delay-${(idx % 4) + 1} w-24 h-8 rounded-xl bg-slate-200 dark:bg-slate-800`}
              />
            ))}
          </div>
        </div>

        {/* Overview & Key Features Skeleton Paragraphs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="skeleton-shimmer w-48 h-7 rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="space-y-2">
              <div className="skeleton-shimmer w-full h-4 rounded-md bg-slate-200 dark:bg-slate-800/70" />
              <div className="skeleton-shimmer skeleton-delay-1 w-full h-4 rounded-md bg-slate-200 dark:bg-slate-800/70" />
              <div className="skeleton-shimmer skeleton-delay-2 w-4/5 h-4 rounded-md bg-slate-200 dark:bg-slate-800/70" />
            </div>
            <div className="space-y-2 pt-4">
              <div className="skeleton-shimmer w-full h-4 rounded-md bg-slate-200 dark:bg-slate-800/70" />
              <div className="skeleton-shimmer skeleton-delay-1 w-3/4 h-4 rounded-md bg-slate-200 dark:bg-slate-800/70" />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="skeleton-shimmer w-32 h-6 rounded-md bg-slate-200 dark:bg-slate-800" />
            <div className="space-y-3">
              <div className="skeleton-shimmer w-full h-5 rounded-md bg-slate-200 dark:bg-slate-800/70" />
              <div className="skeleton-shimmer skeleton-delay-1 w-full h-5 rounded-md bg-slate-200 dark:bg-slate-800/70" />
              <div className="skeleton-shimmer skeleton-delay-2 w-3/4 h-5 rounded-md bg-slate-200 dark:bg-slate-800/70" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
