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
      <section className="relative overflow-hidden min-h-screen lg:min-h-[calc(100vh-5rem)] flex items-center justify-center pt-20 sm:pt-24 pb-12 sm:py-20 lg:py-28 animate-pulse">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 w-full relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-16">
            
            {/* LEFT HERO SIDE */}
            <div className="w-full lg:w-[58%] min-h-[calc(100dvh-5rem)] sm:min-h-[calc(100dvh-6rem)] lg:min-h-0 flex flex-col items-center lg:items-start justify-center text-center lg:text-left py-6 sm:py-8 lg:py-0">
              {/* Greeting Badge Shimmer */}
              <div className="w-28 sm:w-36 h-4 sm:h-5 rounded-full bg-slate-200 dark:bg-slate-800 mb-2.5 sm:mb-3" />
              
              {/* Title / Name Shimmer */}
              <div className="w-full max-w-md sm:max-w-lg h-9 sm:h-14 lg:h-16 rounded-xl bg-gradient-to-r from-slate-200 via-sky-200/40 to-slate-200 dark:from-slate-800 dark:via-sky-900/30 dark:to-slate-800 mb-3" />

              {/* Designation Shimmer */}
              <div className="w-64 sm:w-80 md:w-96 h-6 sm:h-8 lg:h-10 rounded-xl bg-gradient-to-r from-sky-200/60 via-blue-200/50 to-purple-200/60 dark:from-sky-900/40 dark:via-blue-900/30 dark:to-purple-900/40 mb-4 sm:mb-6" />

              {/* Bio Paragraph Shimmers */}
              <div className="space-y-2.5 w-full max-w-xl mb-6 sm:mb-8">
                <div className="w-full h-3.5 sm:h-4 rounded-md bg-slate-200 dark:bg-slate-800/80" />
                <div className="w-[92%] h-3.5 sm:h-4 rounded-md bg-slate-200 dark:bg-slate-800/80" />
                <div className="w-[85%] h-3.5 sm:h-4 rounded-md bg-slate-200 dark:bg-slate-800/80" />
              </div>

              {/* Action Buttons Shimmers */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8 w-full sm:w-auto max-w-md sm:max-w-none">
                {/* Primary Button Shimmer */}
                <div className="h-12 w-full sm:w-[210px] pl-5 pr-2 rounded-full bg-gradient-to-r from-sky-200/70 via-blue-200/60 to-indigo-200/70 dark:from-sky-900/50 dark:via-blue-900/40 dark:to-indigo-900/50 flex items-center justify-between sm:justify-center gap-3">
                  <div className="w-28 h-4 rounded-md bg-white/50 dark:bg-white/20" />
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/40 dark:bg-white/25 shrink-0" />
                </div>
                {/* Secondary Button Shimmer */}
                <div className="h-12 w-full sm:w-[170px] pl-5 pr-2 rounded-full bg-slate-100 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                  <div className="w-20 h-4 rounded-md bg-slate-200 dark:bg-slate-800" />
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-sky-200/50 dark:bg-sky-900/40 shrink-0" />
                </div>
              </div>

              {/* Social Icons Shimmers */}
              <div className="flex items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 flex-wrap">
                {[1, 2, 3, 4, 5].map((idx) => (
                  <div key={idx} className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300/70 dark:border-slate-800" />
                ))}
              </div>
            </div>

            {/* RIGHT HERO SIDE - Portrait Photo Card */}
            <div className="w-full lg:w-[42%] min-h-[calc(100dvh-5rem)] sm:min-h-[calc(100dvh-6rem)] lg:min-h-0 flex flex-col items-center justify-center relative py-8 sm:py-12 lg:py-0 mt-4 lg:mt-0">
              <div className="relative w-full max-w-[260px] xs:max-w-[300px] sm:max-w-sm md:max-w-md lg:max-w-[420px] xl:max-w-[450px]">
                {/* Soft Background Glow Behind Image */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-sky-500/20 via-blue-500/15 to-purple-500/20 rounded-xl blur-2xl -z-10" />

                {/* Floating Tech Badges Shimmers Around Image (Desktop sm+) */}
                <div className="absolute -top-4 -right-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 shadow-lg">
                  <div className="w-4 h-4 rounded-full bg-sky-300 dark:bg-sky-700" />
                  <div className="w-12 h-3 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="absolute -top-4 -left-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 shadow-lg">
                  <div className="w-4 h-4 rounded-full bg-sky-300 dark:bg-sky-700" />
                  <div className="w-14 h-3 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="absolute top-1/2 -right-6 -translate-y-1/2 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 shadow-lg">
                  <div className="w-4 h-4 rounded-full bg-sky-300 dark:bg-sky-700" />
                  <div className="w-16 h-3 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="absolute -bottom-3 -left-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 shadow-lg">
                  <div className="w-4 h-4 rounded-full bg-sky-300 dark:bg-sky-700" />
                  <div className="w-12 h-3 rounded bg-slate-200 dark:bg-slate-800" />
                </div>

                {/* Glassmorphism Card Wrapper around Profile Image */}
                <div className="relative p-3 sm:p-4 rounded-xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 shadow-2xl">
                  <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-gradient-to-tr from-slate-200 via-sky-200/30 to-slate-200 dark:from-slate-800 dark:via-sky-900/20 dark:to-slate-800">
                    {/* Availability Overlay Shimmer */}
                    <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 p-2.5 sm:p-3 rounded-xl bg-slate-950/75 dark:bg-slate-900/85 border border-white/20 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        <div className="w-24 h-3 rounded bg-slate-300/40" />
                      </div>
                      <div className="w-28 h-2.5 rounded bg-slate-400/30" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Tech Badges Shimmer (< sm) */}
              <div className="flex sm:hidden flex-wrap items-center justify-center gap-2 mt-4 z-20 w-full px-2">
                {[1, 2, 3, 4].map((idx) => (
                  <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 shadow-md">
                    <div className="w-3.5 h-3.5 rounded-full bg-sky-300 dark:bg-sky-700" />
                    <div className="w-12 h-3 rounded bg-slate-200 dark:bg-slate-800" />
                  </div>
                ))}
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
