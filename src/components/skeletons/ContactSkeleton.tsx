import React from "react";
import { Sparkles } from "lucide-react";

export default function ContactSkeleton() {
  return (
    <section
      id="contact-skeleton"
      className="scroll-mt-24 relative overflow-hidden bg-white dark:bg-[#020617] text-[#0F172A] dark:text-[#F8FAFC] py-20 sm:py-24 transition-colors duration-300 border-t border-slate-200/60 dark:border-slate-800/60"
    >
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-sky-500/15 via-blue-500/10 to-purple-500/15 blur-[140px] rounded-full pointer-events-none -z-10 skeleton-glow" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 w-full relative z-10">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20 flex flex-col items-center">
          <div className="skeleton-shimmer inline-flex items-center gap-2 px-6 py-4 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-[#38BDF8] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-sky-500 opacity-60" />
            <div className="w-28 h-3.5 rounded bg-sky-500/30 dark:bg-sky-400/30" />
          </div>

          <div className="skeleton-shimmer skeleton-gradient w-64 sm:w-80 md:w-96 h-10 sm:h-12 md:h-14 rounded-2xl bg-gradient-to-r from-sky-400/50 via-blue-500/50 to-purple-500/50 mb-4" />
          <div className="skeleton-shimmer w-full max-w-lg h-4 rounded-md bg-slate-200 dark:bg-slate-800/80 mb-2" />
          <div className="skeleton-shimmer skeleton-delay-1 w-3/4 max-w-md h-4 rounded-md bg-slate-200 dark:bg-slate-800/80" />
        </div>

        {/* TWO COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          {/* Left Column: Contact Methods & Socials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className={`skeleton-shimmer skeleton-delay-${item} p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-4 shadow-sm`}
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-500/15 dark:bg-sky-500/20 shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="w-20 h-3 rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="w-44 h-4 rounded bg-slate-200 dark:bg-slate-800" />
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links Shimmer */}
            <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 space-y-3 shadow-sm">
              <div className="skeleton-shimmer w-28 h-3 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`skeleton-shimmer skeleton-delay-${s} w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Form Skeleton */}
          <div className="lg:col-span-7 rounded-3xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 space-y-5 shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="skeleton-shimmer w-20 h-3 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="skeleton-shimmer w-full h-11 rounded-xl bg-slate-200/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/60" />
              </div>
              <div className="space-y-2">
                <div className="skeleton-shimmer w-20 h-3 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="skeleton-shimmer skeleton-delay-1 w-full h-11 rounded-xl bg-slate-200/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/60" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="skeleton-shimmer w-20 h-3 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="skeleton-shimmer w-full h-11 rounded-xl bg-slate-200/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/60" />
            </div>
            <div className="space-y-2">
              <div className="skeleton-shimmer w-20 h-3 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="skeleton-shimmer w-full h-28 rounded-xl bg-slate-200/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/60" />
            </div>
            <div className="skeleton-shimmer skeleton-gradient w-full h-12 rounded-xl bg-gradient-to-r from-sky-400/50 via-blue-500/50 to-purple-500/50 shadow-md" />
          </div>
        </div>
      </div>
    </section>
  );
}
