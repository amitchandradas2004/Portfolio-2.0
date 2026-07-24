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
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-sky-500/10 via-blue-500/5 to-purple-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* SECTION HEADER SKELETON */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          {/* Badge Skeleton */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-[#38BDF8] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4"
          >
            <Sparkles className="w-4 h-4 text-sky-500 dark:text-[#38BDF8] animate-spin" />
            <span>Loading Projects...</span>
          </motion.div>

          {/* Heading Skeleton */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center mb-4"
          >
            <motion.div
              animate={{ opacity: [0.4, 0.85, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-10 sm:h-12 md:h-14 w-64 sm:w-80 rounded-2xl bg-gradient-to-r from-slate-200 via-sky-200/50 to-slate-200 dark:from-slate-800 dark:via-sky-900/30 dark:to-slate-800"
            />
          </motion.div>

          {/* Subtitle Skeleton */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-2 max-w-xl mx-auto"
          >
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
              className="h-4 w-full sm:w-4/5 rounded-md bg-slate-200 dark:bg-slate-800"
            />
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              className="h-4 w-3/4 sm:w-2/3 rounded-md bg-slate-200 dark:bg-slate-800"
            />
          </motion.div>
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
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-4 w-48 rounded-md bg-slate-200 dark:bg-slate-800"
          />
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((btn) => (
              <motion.div
                key={btn}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: btn * 0.1 }}
                className="w-9 h-9 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300/40 dark:border-slate-700/40"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
