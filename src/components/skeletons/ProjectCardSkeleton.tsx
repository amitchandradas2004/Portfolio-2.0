"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

export const cardSkeletonVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function ProjectCardSkeleton() {
  return (
    <motion.div
      variants={cardSkeletonVariants}
      className="relative rounded-2xl overflow-hidden backdrop-blur-md bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-lg shadow-slate-900/5 dark:shadow-black/30 flex flex-col justify-between"
    >
      {/* Top Section: Image & Badges Placeholder */}
      <div>
        <div className="skeleton-shimmer skeleton-gradient relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-tr from-slate-200 via-sky-200/40 to-slate-200 dark:from-slate-800 dark:via-sky-900/30 dark:to-slate-800">
          {/* Skeleton Badges */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
            <div className="skeleton-shimmer h-6 w-20 rounded-full bg-slate-300/80 dark:bg-slate-700/80 backdrop-blur-md border border-slate-400/20 dark:border-slate-600/20" />
            <div className="skeleton-shimmer skeleton-delay-1 h-6 w-22 rounded-full bg-slate-300/60 dark:bg-slate-700/60 backdrop-blur-md border border-slate-400/20 dark:border-slate-600/20" />
          </div>
        </div>

        {/* Content Details Skeleton */}
        <div className="p-6">
          {/* Title Skeleton */}
          <div className="skeleton-shimmer h-6 w-3/4 rounded-lg bg-slate-300/80 dark:bg-slate-700/80 mb-3" />

          {/* Subtitle Skeleton */}
          <div className="skeleton-shimmer skeleton-delay-1 h-4 w-2/5 rounded-md bg-slate-200/90 dark:bg-slate-800/90 mb-4" />

          {/* Description Lines Skeleton */}
          <div className="space-y-2 mb-6">
            <div className="skeleton-shimmer h-3.5 w-full rounded-md bg-slate-200/70 dark:bg-slate-800/70" />
            <div className="skeleton-shimmer skeleton-delay-1 h-3.5 w-[92%] rounded-md bg-slate-200/70 dark:bg-slate-800/70" />
            <div className="skeleton-shimmer skeleton-delay-2 h-3.5 w-[75%] rounded-md bg-slate-200/70 dark:bg-slate-800/70" />
          </div>

          {/* Technology Badges Skeleton */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {[20, 16, 24, 18].map((w, idx) => (
              <div
                key={idx}
                className={`skeleton-shimmer skeleton-delay-${(idx % 4) + 1} h-6 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300/40 dark:border-slate-700/40`}
                style={{ width: `${w * 4}px` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer CTA Skeleton */}
      <div className="px-6 pb-6 pt-0">
        <div className="skeleton-shimmer h-10 w-full rounded-xl bg-slate-200/90 dark:bg-slate-800/90 border border-slate-300/60 dark:border-slate-700/60" />
      </div>
    </motion.div>
  );
}

export default ProjectCardSkeleton;
