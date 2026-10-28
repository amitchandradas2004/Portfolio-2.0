import React from "react";
import { Sparkles } from "lucide-react";

export default function FeaturedProjectsSkeleton() {
  return (
    <section
      id="projects-skeleton"
      className="scroll-mt-24 relative overflow-hidden bg-white dark:bg-[#020617] text-[#0F172A] dark:text-[#F8FAFC] py-24 transition-colors duration-300 border-t border-slate-200/60 dark:border-slate-800/60"
    >
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-sky-500/15 via-blue-500/10 to-purple-500/15 blur-[130px] rounded-full pointer-events-none -z-10 skeleton-glow" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 w-full relative z-10">
        {/* SECTION HEADER SHIMMER */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20 flex flex-col items-center">
          <div className="skeleton-shimmer inline-flex items-center gap-2 px-6 py-4 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-[#38BDF8] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-sky-500 opacity-60" />
            <div className="w-32 h-3.5 rounded bg-sky-500/30 dark:bg-sky-400/30" />
          </div>

          <div className="skeleton-shimmer skeleton-gradient w-64 sm:w-80 h-10 sm:h-12 md:h-14 rounded-2xl bg-gradient-to-r from-sky-400/50 via-blue-500/50 to-purple-500/50 mb-4" />
          <div className="skeleton-shimmer w-full max-w-md h-4 rounded-md bg-slate-200 dark:bg-slate-800/80 mb-2" />
          <div className="skeleton-shimmer skeleton-delay-1 w-3/4 max-w-sm h-4 rounded-md bg-slate-200 dark:bg-slate-800/80" />
        </div>

        {/* RESPONSIVE PROJECTS GRID SHIMMER */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {[1, 2, 3].map((idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden backdrop-blur-md bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-lg p-0 flex flex-col justify-between"
            >
              {/* Thumbnail Shimmer */}
              <div className="skeleton-shimmer skeleton-gradient relative aspect-[16/10] w-full bg-gradient-to-tr from-slate-200 via-sky-200/40 to-slate-200 dark:from-slate-800 dark:via-sky-900/30 dark:to-slate-800 overflow-hidden">
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
                  <div className="skeleton-shimmer h-6 w-20 rounded-full bg-slate-300/80 dark:bg-slate-700/80 shadow-sm" />
                  <div className="skeleton-shimmer skeleton-delay-1 h-6 w-24 rounded-full bg-slate-300/60 dark:bg-slate-700/60 shadow-sm" />
                </div>
              </div>

              {/* Content Shimmer */}
              <div className="p-6 space-y-4">
                <div className={`skeleton-shimmer skeleton-delay-${idx} w-3/4 h-6 rounded-lg bg-slate-300/80 dark:bg-slate-700/80`} />
                <div className={`skeleton-shimmer skeleton-delay-${idx + 1} w-2/5 h-4 rounded-md bg-slate-200/90 dark:bg-slate-800/90`} />
                <div className="space-y-2">
                  <div className="skeleton-shimmer w-full h-3.5 rounded bg-slate-200/70 dark:bg-slate-800/70" />
                  <div className="skeleton-shimmer skeleton-delay-1 w-5/6 h-3.5 rounded bg-slate-200/70 dark:bg-slate-800/70" />
                </div>

                {/* Tech Badges Shimmer */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {[20, 16, 24, 18].map((w, t) => (
                    <div
                      key={t}
                      className={`skeleton-shimmer skeleton-delay-${t + 1} h-6 rounded-lg bg-slate-200/80 dark:bg-slate-800/80`}
                      style={{ width: `${w * 4}px` }}
                    />
                  ))}
                </div>
              </div>

              {/* Card Footer Button Shimmer */}
              <div className="px-6 pb-6 pt-0">
                <div className="skeleton-shimmer h-10 w-full rounded-xl bg-slate-200/90 dark:bg-slate-800/90" />
              </div>
            </div>
          ))}
        </div>

        {/* VIEW ALL PROJECTS BUTTON SHIMMER */}
        <div className="mt-14 flex justify-center">
          <div className="skeleton-shimmer skeleton-gradient w-48 h-12 rounded-2xl bg-gradient-to-r from-sky-400/50 via-blue-500/50 to-purple-500/50 shadow-md" />
        </div>
      </div>
    </section>
  );
}
