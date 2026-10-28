"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ProjectCardSkeleton } from "./ProjectCardSkeleton";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ProjectsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <section
      id="projects-skeleton"
      className="scroll-mt-15 relative overflow-hidden bg-white dark:bg-[#020617] text-[#0F172A] dark:text-[#F8FAFC] py-10 transition-colors duration-300 min-h-screen"
    >
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-sky-500/15 via-blue-500/10 to-purple-500/15 blur-[130px] rounded-full pointer-events-none -z-10 skeleton-glow" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* SECTION HEADER SKELETON */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20 flex flex-col items-center">
          {/* Badge Skeleton */}
          <div className="skeleton-shimmer inline-flex items-center gap-2 px-6 py-4 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-[#38BDF8] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-sky-500 dark:text-[#38BDF8] animate-spin" />
            <div className="w-32 h-3.5 rounded bg-sky-500/30 dark:bg-sky-400/30" />
          </div>

          {/* Heading Skeleton */}
          <div className="skeleton-shimmer skeleton-gradient h-10 sm:h-12 md:h-14 w-64 sm:w-80 rounded-2xl bg-gradient-to-r from-slate-200 via-sky-200/50 to-slate-200 dark:from-slate-800 dark:via-sky-900/40 dark:to-slate-800 mb-4" />

          {/* Subtitle Skeleton */}
          <div className="flex flex-col items-center gap-2 max-w-xl mx-auto w-full">
            <div className="skeleton-shimmer w-full sm:w-4/5 h-4 rounded-md bg-slate-200 dark:bg-slate-800" />
            <div className="skeleton-shimmer skeleton-delay-1 h-4 w-3/4 sm:w-2/3 rounded-md bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>

        {/* RESPONSIVE PROJECTS GRID SKELETON */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {Array.from({ length: count }).map((_, idx) => (
            <ProjectCardSkeleton key={idx} />
          ))}
        </motion.div>

        {/* PAGINATION CONTROLS SKELETON */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="skeleton-shimmer h-4 w-48 rounded-md bg-slate-200 dark:bg-slate-800" />
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((btn) => (
              <div
                key={btn}
                className={`skeleton-shimmer skeleton-delay-${btn} w-9 h-9 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300/40 dark:border-slate-700/40`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
