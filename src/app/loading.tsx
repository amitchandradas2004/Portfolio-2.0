"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-[#020617] text-[#0F172A] dark:text-[#F8FAFC] transition-colors duration-300 overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-gradient-to-tr from-sky-500/10 via-blue-500/5 to-purple-500/10 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-gradient-to-br from-indigo-500/10 via-sky-500/5 to-emerald-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* ================= 1. HERO SECTION SKELETON ================= */}
      <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-5rem)] flex items-center justify-center pt-24 pb-12 sm:py-20 lg:py-28 animate-pulse">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 w-full relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-16">
            
            {/* LEFT HERO SIDE */}
            <div className="w-full lg:w-[58%] flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
              {/* Greeting Badge Shimmer */}
              <div className="w-36 h-5 rounded-full bg-slate-200 dark:bg-slate-800" />
              
              {/* Title / Name Shimmer */}
              <div className="w-full max-w-lg h-12 sm:h-16 md:h-20 rounded-xl bg-gradient-to-r from-slate-200 via-sky-200/50 to-slate-200 dark:from-slate-800 dark:via-sky-900/30 dark:to-slate-800" />

              {/* Designation Shimmer */}
              <div className="w-3/4 max-w-md h-8 sm:h-10 rounded-xl bg-gradient-to-r from-sky-200/60 via-blue-200/50 to-purple-200/60 dark:from-sky-900/40 dark:via-blue-900/30 dark:to-purple-900/40" />

              {/* Bio Paragraph Shimmers */}
              <div className="space-y-2 w-full max-w-xl pt-2">
                <div className="w-full h-4 rounded-md bg-slate-200 dark:bg-slate-800/80" />
                <div className="w-11/12 h-4 rounded-md bg-slate-200 dark:bg-slate-800/80" />
                <div className="w-4/5 h-4 rounded-md bg-slate-200 dark:bg-slate-800/80" />
              </div>

              {/* Action Buttons Shimmers */}
              <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-4 w-full sm:w-auto">
                <div className="w-full xs:w-44 h-12 rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="w-full xs:w-36 h-12 rounded-full bg-slate-200 dark:bg-slate-800" />
              </div>

              {/* Social Icons Shimmers */}
              <div className="flex items-center justify-center lg:justify-start gap-3 pt-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>

            {/* RIGHT HERO SIDE - Portrait Photo Card */}
            <div className="w-full lg:w-[42%] flex items-center justify-center relative mt-4 lg:mt-0">
              <div className="relative w-full max-w-[260px] xs:max-w-[300px] sm:max-w-sm md:max-w-md lg:max-w-[420px]">
                <div className="p-3 sm:p-4 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl">
                  <div className="w-full aspect-[4/5] rounded-xl bg-gradient-to-tr from-slate-200 via-sky-200/30 to-slate-200 dark:from-slate-800 dark:via-sky-900/20 dark:to-slate-800" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 2. FEATURED PROJECTS SKELETON ================= */}
      <section className="py-16 sm:py-20 lg:py-24 border-t border-slate-200/60 dark:border-slate-800/60 animate-pulse">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 w-full">
          {/* Section Header Shimmer */}
          <div className="flex flex-col items-center text-center space-y-3 mb-12 sm:mb-16">
            <div className="w-40 h-6 rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="w-64 sm:w-80 h-9 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="w-full max-w-md h-4 rounded-md bg-slate-200 dark:bg-slate-800/70" />
          </div>

          {/* Project Cards Grid Shimmer */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="rounded-xl p-4 sm:p-5 bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 space-y-4 shadow-lg"
              >
                {/* Thumbnail Shimmer */}
                <div className="w-full aspect-[16/10] rounded-xl bg-gradient-to-r from-slate-200 via-sky-200/30 to-slate-200 dark:from-slate-800 dark:via-sky-900/20 dark:to-slate-800" />
                
                {/* Tech Tags Shimmers */}
                <div className="flex items-center gap-2 pt-1">
                  <div className="w-16 h-5 rounded-md bg-slate-200 dark:bg-slate-800" />
                  <div className="w-20 h-5 rounded-md bg-slate-200 dark:bg-slate-800" />
                  <div className="w-14 h-5 rounded-md bg-slate-200 dark:bg-slate-800" />
                </div>

                {/* Title & Description Shimmers */}
                <div className="space-y-2">
                  <div className="w-3/4 h-6 rounded-md bg-slate-200 dark:bg-slate-800" />
                  <div className="w-full h-3.5 rounded-md bg-slate-200/70 dark:bg-slate-800/70" />
                  <div className="w-4/5 h-3.5 rounded-md bg-slate-200/70 dark:bg-slate-800/70" />
                </div>

                {/* Card Footer Buttons Shimmer */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-slate-800/60">
                  <div className="w-24 h-8 rounded-lg bg-slate-200 dark:bg-slate-800" />
                  <div className="w-24 h-8 rounded-lg bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
