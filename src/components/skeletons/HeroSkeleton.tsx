import React from "react";

export default function HeroSkeleton() {
  return (
    <section
      id="hero-skeleton"
      className="relative overflow-hidden min-h-screen lg:min-h-[calc(100vh-5rem)] flex items-center justify-center pt-20 sm:pt-24 pb-12 sm:py-20 lg:py-28"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-16">
          {/* LEFT HERO SIDE */}
          <div className="w-full lg:w-[58%] min-h-[calc(100dvh-5rem)] sm:min-h-[calc(100dvh-6rem)] lg:min-h-0 flex flex-col items-center lg:items-start justify-center text-center lg:text-left py-6 sm:py-8 lg:py-0">
            {/* Greeting Badge Shimmer */}
            <div className="skeleton-shimmer w-28 sm:w-36 h-4 sm:h-5 rounded-full bg-slate-200 dark:bg-slate-800 mb-2.5 sm:mb-3" />

            {/* Title / Name Shimmer */}
            <div className="skeleton-shimmer skeleton-gradient w-full max-w-md sm:max-w-lg h-9 sm:h-14 lg:h-16 rounded-xl bg-gradient-to-r from-slate-200 via-sky-200/50 to-slate-200 dark:from-slate-800 dark:via-sky-900/40 dark:to-slate-800 mb-3" />

            {/* Designation Shimmer */}
            <div className="skeleton-shimmer skeleton-gradient skeleton-delay-1 w-64 sm:w-80 md:w-96 h-6 sm:h-8 lg:h-10 rounded-xl bg-gradient-to-r from-sky-200/60 via-blue-200/50 to-purple-200/60 dark:from-sky-900/40 dark:via-blue-900/30 dark:to-purple-900/40 mb-4 sm:mb-6" />

            {/* Bio Paragraph Shimmers */}
            <div className="space-y-2.5 w-full max-w-xl mb-6 sm:mb-8">
              <div className="skeleton-shimmer w-full h-3.5 sm:h-4 rounded-md bg-slate-200 dark:bg-slate-800/80" />
              <div className="skeleton-shimmer skeleton-delay-1 w-[92%] h-3.5 sm:h-4 rounded-md bg-slate-200 dark:bg-slate-800/80" />
              <div className="skeleton-shimmer skeleton-delay-2 w-[85%] h-3.5 sm:h-4 rounded-md bg-slate-200 dark:bg-slate-800/80" />
            </div>

            {/* Action Buttons Shimmers */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8 w-full sm:w-auto max-w-md sm:max-w-none">
              {/* Primary Button Shimmer */}
              <div className="skeleton-shimmer skeleton-gradient h-12 w-full sm:w-[210px] pl-5 pr-2 rounded-full bg-gradient-to-r from-sky-300/80 via-blue-300/70 to-indigo-300/80 dark:from-sky-900/60 dark:via-blue-900/50 dark:to-indigo-900/60 flex items-center justify-between sm:justify-center gap-3 shadow-md">
                <div className="w-28 h-4 rounded-md bg-white/60 dark:bg-white/20" />
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/50 dark:bg-white/25 shrink-0" />
              </div>
              {/* Secondary Button Shimmer */}
              <div className="skeleton-shimmer h-12 w-full sm:w-[170px] pl-5 pr-2 rounded-full bg-slate-100 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between shadow-sm">
                <div className="w-20 h-4 rounded-md bg-slate-200 dark:bg-slate-800" />
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-sky-200/60 dark:bg-sky-900/50 shrink-0" />
              </div>
            </div>

            {/* Social Icons Shimmers */}
            <div className="flex items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 flex-wrap">
              {[1, 2, 3, 4, 5].map((idx) => (
                <div
                  key={idx}
                  className={`skeleton-shimmer skeleton-delay-${(idx % 4) + 1} w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300/70 dark:border-slate-800`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT HERO SIDE - Portrait Photo Card */}
          <div className="w-full lg:w-[42%] min-h-[calc(100dvh-5rem)] sm:min-h-[calc(100dvh-6rem)] lg:min-h-0 flex flex-col items-center justify-center relative py-8 sm:py-12 lg:py-0 mt-4 lg:mt-0">
            <div className="relative w-full max-w-[260px] xs:max-w-[300px] sm:max-w-sm md:max-w-md lg:max-w-[420px] xl:max-w-[450px]">
              {/* Soft Background Glow Behind Image */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-sky-500/25 via-blue-500/20 to-purple-500/25 rounded-2xl blur-2xl -z-10 skeleton-glow" />

              {/* Floating Tech Badges Shimmers Around Image (Desktop sm+) */}
              <div className="skeleton-shimmer absolute -top-4 -right-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 shadow-lg">
                <div className="w-4 h-4 rounded-full bg-sky-400 dark:bg-sky-600 animate-pulse" />
                <div className="w-12 h-3 rounded bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="skeleton-shimmer skeleton-delay-1 absolute -top-4 -left-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 shadow-lg">
                <div className="w-4 h-4 rounded-full bg-sky-400 dark:bg-sky-600 animate-pulse" />
                <div className="w-14 h-3 rounded bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="skeleton-shimmer skeleton-delay-2 absolute top-1/2 -right-6 -translate-y-1/2 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 shadow-lg">
                <div className="w-4 h-4 rounded-full bg-sky-400 dark:bg-sky-600 animate-pulse" />
                <div className="w-16 h-3 rounded bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="skeleton-shimmer skeleton-delay-3 absolute -bottom-3 -left-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 shadow-lg">
                <div className="w-4 h-4 rounded-full bg-sky-400 dark:bg-sky-600 animate-pulse" />
                <div className="w-12 h-3 rounded bg-slate-200 dark:bg-slate-800" />
              </div>

              {/* Glassmorphism Card Wrapper around Profile Image */}
              <div className="relative p-3 sm:p-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 shadow-2xl">
                <div className="skeleton-shimmer skeleton-gradient relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-gradient-to-tr from-slate-200 via-sky-200/40 to-slate-200 dark:from-slate-800 dark:via-sky-900/30 dark:to-slate-800">
                  {/* Availability Overlay Shimmer */}
                  <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 p-2.5 sm:p-3 rounded-xl bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border border-slate-200/60 dark:border-white/20 space-y-1.5 shadow-lg">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                      </span>
                      <div className="skeleton-shimmer w-24 h-3 rounded bg-slate-300 dark:bg-slate-700" />
                    </div>
                    <div className="skeleton-shimmer skeleton-delay-1 w-28 h-2.5 rounded bg-slate-300/70 dark:bg-slate-700/70" />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Tech Badges Shimmer (< sm) */}
            <div className="flex sm:hidden flex-wrap items-center justify-center gap-2 mt-4 z-20 w-full px-2">
              {[1, 2, 3, 4].map((idx) => (
                <div
                  key={idx}
                  className={`skeleton-shimmer skeleton-delay-${(idx % 4) + 1} flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 shadow-md`}
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-sky-400 dark:bg-sky-600 animate-pulse" />
                  <div className="w-12 h-3 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
