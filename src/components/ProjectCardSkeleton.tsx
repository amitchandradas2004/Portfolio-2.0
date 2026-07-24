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
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-200/80 dark:bg-slate-800/80">
          {/* Framer Motion Shimmer Sweep Overlay */}
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-slate-700/50 to-transparent pointer-events-none"
          />

          {/* Skeleton Badges */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
            <motion.div
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-6 w-20 rounded-full bg-slate-300/80 dark:bg-slate-700/80 backdrop-blur-md border border-slate-400/20 dark:border-slate-600/20"
            />
            <motion.div
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              className="h-6 w-22 rounded-full bg-slate-300/60 dark:bg-slate-700/60 backdrop-blur-md border border-slate-400/20 dark:border-slate-600/20"
            />
          </div>
        </div>

        {/* Content Details Skeleton */}
        <div className="p-6">
          {/* Title Skeleton */}
          <motion.div
            animate={{ opacity: [0.4, 0.85, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-6 w-3/4 rounded-lg bg-slate-300/80 dark:bg-slate-700/80 mb-3"
          />

          {/* Subtitle Skeleton */}
          <motion.div
            animate={{ opacity: [0.4, 0.85, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
            className="h-4 w-2/5 rounded-md bg-slate-200/90 dark:bg-slate-800/90 mb-4"
          />

          {/* Description Lines Skeleton */}
          <div className="space-y-2 mb-6">
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
              className="h-3.5 w-full rounded-md bg-slate-200/70 dark:bg-slate-800/70"
            />
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.25 }}
              className="h-3.5 w-[92%] rounded-md bg-slate-200/70 dark:bg-slate-800/70"
            />
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              className="h-3.5 w-[75%] rounded-md bg-slate-200/70 dark:bg-slate-800/70"
            />
          </div>

          {/* Technology Badges Skeleton */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {[20, 16, 24, 18].map((w, idx) => (
              <motion.div
                key={idx}
                animate={{ opacity: [0.4, 0.85, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: idx * 0.1 }}
                className="h-6 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300/40 dark:border-slate-700/40"
                style={{ width: `${w * 4}px` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer CTA Skeleton */}
      <div className="px-6 pb-6 pt-0">
        <motion.div
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          className="h-10 w-full rounded-xl bg-slate-200/90 dark:bg-slate-800/90 border border-slate-300/60 dark:border-slate-700/60"
        />
      </div>
    </motion.div>
  );
}
