"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Sparkles } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function SkillsSkeleton() {
  return (
    <section
      id="skills-skeleton"
      className="scroll-mt-24 relative overflow-hidden bg-white dark:bg-[#020617] text-[#0F172A] dark:text-[#F8FAFC] py-25 transition-colors duration-300"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-sky-500/10 via-blue-500/5 to-purple-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 w-full relative z-10">
        {/* SECTION HEADING SKELETON */}
        <div className="text-center max-w-5xl mx-auto mb-14 lg:mb-18">
          {/* Badge Skeleton */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3"
          >
            <Sparkles className="w-4 h-4 text-sky-500 dark:text-sky-400 animate-spin" />
            <span>Loading Skills...</span>
          </motion.div>

          {/* Heading Skeleton with Gradient Shimmer */}
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{ opacity: [0.4, 0.85, 0.4] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="h-10 sm:h-12 md:h-14 w-72 sm:w-96 rounded-2xl bg-gradient-to-r from-slate-200 via-sky-200/50 to-slate-200 dark:from-slate-800 dark:via-sky-900/30 dark:to-slate-800"
            />
          </div>

          {/* Subtitle Skeleton */}
          <div className="flex flex-col items-center gap-2 max-w-lg mx-auto">
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
              className="h-4 w-full rounded-md bg-slate-200 dark:bg-slate-800"
            />
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              className="h-4 w-3/4 rounded-md bg-slate-200 dark:bg-slate-800"
            />
          </div>
        </div>

        {/* SKILLS CATEGORIES GRID SKELETON */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16"
        >
          {[0, 1, 2, 3].map((catIdx) => (
            <motion.div
              key={catIdx}
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: catIdx * 0.15,
              }}
              className="rounded-2xl bg-white/70 dark:bg-slate-950/85 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-xl space-y-6"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200/70 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0" />
                <div className="w-44 h-5 rounded-md bg-slate-200 dark:bg-slate-800" />
              </div>

              {/* Skill Items Badges Skeleton */}
              <div className="flex flex-wrap gap-2.5">
                {Array.from({ length: 8 + (catIdx % 3) * 2 }).map((_, sIdx) => (
                  <motion.div
                    key={sIdx}
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: (catIdx + sIdx) * 0.08,
                    }}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60"
                  >
                    <div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0" />
                    <div
                      className="h-3 rounded-md bg-slate-200 dark:bg-slate-700"
                      style={{ width: `${45 + ((sIdx * 17) % 45)}px` }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CURRENTLY LEARNING SKELETON */}
        <motion.div
          animate={{ opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-2xl bg-gradient-to-r from-sky-500/10 via-purple-500/10 to-blue-500/10 backdrop-blur-xl border border-sky-500/20 dark:border-sky-400/20 p-6 sm:p-8 lg:p-10 shadow-lg"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left w-full max-w-sm">
              <div className="w-28 h-3.5 rounded-full bg-sky-500/20" />
              <div className="w-56 h-6 rounded-md bg-slate-200 dark:bg-slate-800" />
              <div className="w-72 h-3.5 rounded-md bg-slate-200 dark:bg-slate-800/70" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 shrink-0 w-full sm:w-auto">
              {[0, 1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80"
                >
                  <div className="w-4 h-4 rounded-full bg-purple-500/30 shrink-0" />
                  <div className="w-24 h-3.5 rounded-md bg-slate-200 dark:bg-slate-700" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
