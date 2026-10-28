import React from "react";
import { User } from "lucide-react";

export default function AboutSkeleton() {
  return (
    <section
      id="about-skeleton"
      className="scroll-mt-24 relative overflow-hidden bg-white dark:bg-[#020617] text-[#0F172A] dark:text-[#F8FAFC] py-20 transition-colors duration-300 border-t border-slate-200/60 dark:border-slate-800/60"
    >
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-sky-500/15 via-blue-500/10 to-purple-500/15 blur-[140px] rounded-full pointer-events-none -z-10 skeleton-glow" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-12 lg:gap-16">
          {/* LEFT COLUMN: Section Heading & Narrative */}
          <div className="w-full lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Kicker Badge Shimmer */}
            <div className="skeleton-shimmer inline-flex items-center gap-2 px-6 py-4 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4 shadow-sm">
              <User className="w-4 h-4 text-sky-500 opacity-60" />
              <div className="w-20 h-3.5 rounded bg-sky-500/30 dark:bg-sky-400/30" />
            </div>

            {/* Main Section Heading Shimmer */}
            <div className="space-y-2 mb-6 w-full flex flex-col items-center lg:items-start">
              <div className="skeleton-shimmer skeleton-gradient w-full max-w-md h-9 sm:h-12 lg:h-14 rounded-2xl bg-gradient-to-r from-slate-200 via-sky-200/50 to-slate-200 dark:from-slate-800 dark:via-sky-900/40 dark:to-slate-800" />
              <div className="skeleton-shimmer skeleton-gradient skeleton-delay-1 w-3/4 max-w-sm h-9 sm:h-12 lg:h-14 rounded-2xl bg-gradient-to-r from-sky-200/60 via-blue-200/50 to-purple-200/60 dark:from-sky-900/40 dark:via-blue-900/30 dark:to-purple-900/40" />
            </div>

            {/* Narrative Paragraphs Shimmers */}
            <div className="space-y-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-normal mb-8 w-full max-w-xl">
              <div className="space-y-2">
                <div className="skeleton-shimmer w-full h-4 rounded-md bg-slate-200 dark:bg-slate-800/80" />
                <div className="skeleton-shimmer skeleton-delay-1 w-[96%] h-4 rounded-md bg-slate-200 dark:bg-slate-800/80" />
                <div className="skeleton-shimmer skeleton-delay-2 w-[88%] h-4 rounded-md bg-slate-200 dark:bg-slate-800/80" />
              </div>
              <div className="space-y-2">
                <div className="skeleton-shimmer w-[98%] h-4 rounded-md bg-slate-200 dark:bg-slate-800/80" />
                <div className="skeleton-shimmer skeleton-delay-1 w-[92%] h-4 rounded-md bg-slate-200 dark:bg-slate-800/80" />
                <div className="skeleton-shimmer skeleton-delay-2 w-[75%] h-4 rounded-md bg-slate-200 dark:bg-slate-800/80" />
              </div>
              <div className="space-y-2">
                <div className="skeleton-shimmer w-[94%] h-4 rounded-md bg-slate-200 dark:bg-slate-800/80" />
                <div className="skeleton-shimmer skeleton-delay-1 w-[82%] h-4 rounded-md bg-slate-200 dark:bg-slate-800/80" />
              </div>
            </div>

            {/* Trait Highlight Cards Shimmers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {[1, 2, 3, 4].map((trait) => (
                <div
                  key={trait}
                  className={`skeleton-shimmer skeleton-delay-${(trait % 4) + 1} p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-white/10 flex items-start gap-3.5 text-left shadow-xs`}
                >
                  <div className="w-9 h-9 rounded-xl bg-sky-500/15 dark:bg-sky-500/20 shrink-0" />
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="w-24 h-4 rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="w-full h-3 rounded bg-slate-200/70 dark:bg-slate-800/70" />
                    <div className="w-4/5 h-3 rounded bg-slate-200/70 dark:bg-slate-800/70" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Liquid Glass Information Card Shimmer */}
          <div className="w-full lg:w-[45%] flex flex-col justify-between">
            <div className="rounded-[28px] border border-slate-200/80 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl shadow-2xl p-6 sm:p-7 space-y-6">
              {/* Header Shimmer */}
              <div className="flex items-start justify-between gap-3 pb-5 border-b border-slate-200/60 dark:border-white/8">
                <div className="space-y-2">
                  <div className="skeleton-shimmer w-28 h-3 rounded bg-sky-200/60 dark:bg-sky-900/50" />
                  <div className="skeleton-shimmer w-48 h-6 rounded-lg bg-slate-200 dark:bg-slate-800" />
                </div>
                {/* Active Status Badge Indicator */}
                <div className="skeleton-shimmer inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 dark:bg-emerald-400/10 border border-emerald-500/25 dark:border-emerald-400/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <div className="w-16 h-3 rounded bg-emerald-500/30" />
                </div>
              </div>

              {/* Stats Grid Shimmer */}
              <div>
                <div className="skeleton-shimmer w-32 h-3 rounded bg-slate-300 dark:bg-slate-700 mb-3" />
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((statIdx) => (
                    <div
                      key={statIdx}
                      className="p-4 rounded-2xl bg-white dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700/50 shadow-sm space-y-2"
                    >
                      <div className="flex items-start justify-between">
                        <div
                          className={`skeleton-shimmer skeleton-gradient skeleton-delay-${(statIdx % 4) + 1} w-16 h-7 rounded-md bg-gradient-to-r from-sky-300 to-blue-300 dark:from-sky-900/60 dark:to-blue-900/60`}
                        />
                        <div className="skeleton-shimmer w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-700/60" />
                      </div>
                      <div className="skeleton-shimmer w-20 h-3.5 rounded bg-slate-200 dark:bg-slate-800" />
                      <div className="skeleton-shimmer skeleton-delay-1 w-16 h-2.5 rounded bg-slate-200/70 dark:bg-slate-800/70" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Technologies Shimmer */}
              <div>
                <div className="skeleton-shimmer w-36 h-3 rounded bg-slate-300 dark:bg-slate-700 mb-3" />
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((tIdx) => (
                    <div
                      key={tIdx}
                      className={`skeleton-shimmer skeleton-delay-${(tIdx % 4) + 1} h-8 px-3 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/50 flex items-center gap-2`}
                    >
                      <div className="w-3.5 h-3.5 rounded-full bg-sky-400 dark:bg-sky-600 animate-pulse shrink-0" />
                      <div
                        className="h-3 rounded bg-slate-200 dark:bg-slate-700"
                        style={{ width: `${36 + ((tIdx * 11) % 28)}px` }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Focus Shimmer */}
              <div>
                <div className="skeleton-shimmer w-32 h-3 rounded bg-slate-300 dark:bg-slate-700 mb-3" />
                <div className="space-y-2">
                  {[1, 2].map((lIdx) => (
                    <div
                      key={lIdx}
                      className={`skeleton-shimmer skeleton-delay-${lIdx} flex items-center gap-3 p-3 rounded-xl bg-white/80 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/40`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-sky-500/20 dark:bg-sky-400/20 shrink-0" />
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="w-28 h-3.5 rounded bg-slate-200 dark:bg-slate-800" />
                        <div className="w-48 h-2.5 rounded bg-slate-200/70 dark:bg-slate-800/70" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
