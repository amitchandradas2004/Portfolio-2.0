import React from "react";
import { GraduationCap } from "lucide-react";

export default function EducationSkeleton() {
  return (
    <section
      id="education-skeleton"
      className="scroll-mt-24 relative overflow-hidden bg-white dark:bg-[#020617] text-[#0F172A] dark:text-[#F8FAFC] py-20 sm:py-24 transition-colors duration-300 border-t border-slate-200/60 dark:border-slate-800/60"
    >
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-sky-500/15 via-blue-500/10 to-purple-500/15 blur-[130px] rounded-full pointer-events-none -z-10 skeleton-glow" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 w-full relative z-10">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20 flex flex-col items-center">
          <div className="skeleton-shimmer inline-flex items-center gap-2 px-6 py-4 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-[#38BDF8] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 shadow-sm">
            <GraduationCap className="w-4 h-4 text-sky-500 opacity-60" />
            <div className="w-32 h-3.5 rounded bg-sky-500/30 dark:bg-sky-400/30" />
          </div>

          <div className="skeleton-shimmer skeleton-gradient w-48 sm:w-64 h-10 sm:h-12 md:h-14 rounded-2xl bg-gradient-to-r from-sky-400/50 via-blue-500/50 to-purple-500/50 mb-4" />
          <div className="skeleton-shimmer w-full max-w-md h-4 rounded-md bg-slate-200 dark:bg-slate-800/80 mb-2" />
          <div className="skeleton-shimmer skeleton-delay-1 w-3/4 max-w-xs h-4 rounded-md bg-slate-200 dark:bg-slate-800/80" />
        </div>

        {/* TIMELINE CONTAINER */}
        <div className="relative w-full">
          <div className="absolute top-0 bottom-0 left-6 lg:left-1/2 lg:-translate-x-1/2 w-0.5 bg-gradient-to-b from-sky-500 via-blue-600 to-purple-600 opacity-30 dark:opacity-40" />

          <div className="space-y-12 lg:space-y-16">
            {/* Education Item 1 - Left on desktop */}
            <div className="relative flex flex-col lg:flex-row items-start lg:items-center">
              <div className="absolute left-6 lg:left-1/2 lg:-translate-x-1/2 top-1.5 lg:top-1/2 lg:-translate-y-1/2 z-20 -translate-x-1/2 flex items-center justify-center">
                <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white dark:bg-[#020617] border-2 border-sky-500 shadow-md">
                  <div className="w-3 h-3 rounded-full bg-sky-500" />
                </div>
              </div>

              <div className="w-full lg:w-1/2 pl-14 lg:pl-0 lg:pr-12">
                <div className="rounded-2xl backdrop-blur-md bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-7 space-y-4 shadow-lg">
                  <div className="flex flex-wrap items-center gap-2 mb-3 lg:justify-end">
                    <div className="skeleton-shimmer w-24 h-6 rounded-full bg-sky-500/15" />
                    <div className="skeleton-shimmer skeleton-delay-1 w-28 h-6 rounded-full bg-slate-200 dark:bg-slate-800" />
                  </div>
                  <div className="skeleton-shimmer w-60 h-6 rounded-lg bg-slate-200 dark:bg-slate-800 lg:ml-auto" />
                  <div className="skeleton-shimmer skeleton-delay-1 w-40 h-4 rounded bg-sky-200/60 dark:bg-sky-900/40 lg:ml-auto" />
                  <div className="space-y-2">
                    <div className="skeleton-shimmer w-full h-3.5 rounded bg-slate-200/70 dark:bg-slate-800/70" />
                    <div className="skeleton-shimmer skeleton-delay-1 w-4/5 h-3.5 rounded bg-slate-200/70 dark:bg-slate-800/70 lg:ml-auto" />
                  </div>
                </div>
              </div>
            </div>

            {/* Education Item 2 - Right on desktop */}
            <div className="relative flex flex-col lg:flex-row items-start lg:items-center">
              <div className="absolute left-6 lg:left-1/2 lg:-translate-x-1/2 top-1.5 lg:top-1/2 lg:-translate-y-1/2 z-20 -translate-x-1/2 flex items-center justify-center">
                <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white dark:bg-[#020617] border-2 border-blue-500 shadow-md">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                </div>
              </div>

              <div className="w-full lg:w-1/2 pl-14 lg:pl-12 lg:ml-auto">
                <div className="rounded-2xl backdrop-blur-md bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-7 space-y-4 shadow-lg">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <div className="skeleton-shimmer w-24 h-6 rounded-full bg-sky-500/15" />
                    <div className="skeleton-shimmer skeleton-delay-1 w-20 h-6 rounded-full bg-slate-200 dark:bg-slate-800" />
                  </div>
                  <div className="skeleton-shimmer w-64 h-6 rounded-lg bg-slate-200 dark:bg-slate-800" />
                  <div className="skeleton-shimmer skeleton-delay-1 w-40 h-4 rounded bg-sky-200/60 dark:bg-sky-900/40" />
                  <div className="space-y-2">
                    <div className="skeleton-shimmer w-full h-3.5 rounded bg-slate-200/70 dark:bg-slate-800/70" />
                    <div className="skeleton-shimmer skeleton-delay-1 w-4/5 h-3.5 rounded bg-slate-200/70 dark:bg-slate-800/70" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
