export default function HeroSkeleton() {
  return (
    <section
      id="hero-skeleton"
      className="scroll-mt-24 relative overflow-hidden bg-white dark:bg-[#020617] text-[#0F172A] dark:text-[#F8FAFC] min-h-screen lg:min-h-[calc(100vh-5rem)] flex items-center justify-center pt-20 sm:pt-24 pb-12 sm:py-20 lg:py-28 transition-colors duration-300"
    >
      {/* Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-16">

          {/* LEFT SIDE (58% Width on Desktop) */}
          <div className="w-full lg:w-[58%] flex flex-col items-center lg:items-start text-center lg:text-left min-h-[calc(100dvh-5rem)] sm:min-h-[calc(100dvh-6rem)] lg:min-h-0 justify-center py-6 sm:py-8 lg:py-0">

            {/* 1. Greeting Text Skeleton */}
            <div className="skeleton-shimmer h-3 sm:h-3.5 md:h-5 w-36 sm:w-48 md:w-52 rounded-full bg-slate-200 dark:bg-slate-800 mb-2.5 sm:mb-3" />

            {/* 2. Developer Name Skeleton */}
            <div className="skeleton-shimmer skeleton-gradient w-full max-w-lg lg:max-w-xl h-10 xs:h-12 sm:h-14 md:h-16 lg:h-20 rounded-xl bg-gradient-to-r from-slate-200 via-sky-200/50 to-slate-200 dark:from-slate-800 dark:via-sky-900/40 dark:to-slate-800 mb-3" />

            {/* 3. Professional Designation Skeleton */}
            <div className="skeleton-shimmer skeleton-gradient skeleton-delay-1 w-64 xs:w-72 sm:w-80 lg:w-[22rem] h-7 xs:h-8 sm:h-9 lg:h-10 rounded-lg bg-gradient-to-r from-sky-300/60 via-blue-300/50 to-purple-300/60 dark:from-sky-900/50 dark:via-blue-900/40 dark:to-purple-900/50 mb-4 sm:mb-6" />

            {/* 4. Short Introduction Paragraph Skeletons */}
            <div className="space-y-2.5 w-full max-w-xl lg:max-w-2xl mb-6 sm:mb-8">
              <div className="skeleton-shimmer h-3.5 sm:h-4 md:h-[1.125rem] w-full rounded-md bg-slate-200 dark:bg-slate-800/80" />
              <div className="skeleton-shimmer skeleton-delay-1 h-3.5 sm:h-4 md:h-[1.125rem] w-[96%] rounded-md bg-slate-200 dark:bg-slate-800/80" />
              <div className="skeleton-shimmer skeleton-delay-2 h-3.5 sm:h-4 md:h-[1.125rem] w-[88%] rounded-md bg-slate-200 dark:bg-slate-800/80" />
              <div className="skeleton-shimmer skeleton-delay-3 h-3.5 sm:h-4 md:h-[1.125rem] w-[93%] rounded-md bg-slate-200 dark:bg-slate-800/80" />
            </div>

            {/* 5. Action Buttons Skeletons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8 w-full sm:w-auto max-w-md sm:max-w-none">
              <div className="skeleton-shimmer skeleton-gradient h-12 w-full sm:w-[200px] pl-5 pr-1.5 sm:pl-6 sm:pr-2 rounded-full bg-gradient-to-r from-sky-400/70 via-blue-500/60 to-indigo-500/70 dark:from-sky-700/60 dark:via-blue-800/50 dark:to-indigo-800/60 border border-white/20 shadow-lg flex items-center justify-between gap-3.5">
                <div className="h-3.5 w-28 rounded-full bg-white/50 dark:bg-white/20" />
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/25 dark:bg-white/15 border border-white/25 shrink-0" />
              </div>
              <div className="skeleton-shimmer h-12 w-full sm:w-[170px] rounded-full bg-white/70 dark:bg-slate-900/70 border border-slate-300/80 dark:border-slate-800 shadow-sm flex items-center justify-between px-5">
                <div className="h-3.5 w-20 rounded-full bg-slate-300/70 dark:bg-slate-700/70" />
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-sky-500/10 dark:bg-sky-500/15 border border-sky-500/20 dark:border-sky-400/30 shrink-0" />
              </div>
            </div>

            {/* 6. Social Links Skeletons */}
            <div className="flex items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 flex-wrap">
              {[1, 2, 3, 4, 5].map((idx) => (
                <div
                  key={idx}
                  className={`skeleton-shimmer skeleton-delay-${(idx % 4) + 1} w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-300/70 dark:border-slate-800`}
                />
              ))}
            </div>

          </div>

          {/* RIGHT SIDE (42% Width on Desktop - Professional Image & Tech Badges) */}
          <div className="w-full lg:w-[42%] flex flex-col items-center justify-center relative mt-4 lg:mt-0 min-h-[calc(100dvh-5rem)] sm:min-h-[calc(100dvh-6rem)] lg:min-h-0 py-8 sm:py-12 lg:py-0">
            <div className="relative group w-full max-w-[260px] xs:max-w-[300px] sm:max-w-sm md:max-w-md lg:max-w-[420px] xl:max-w-[450px]">

              {/* Soft Background Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-sky-500/30 via-blue-500/20 to-purple-500/30 rounded-xl blur-2xl opacity-75 -z-10" />

              {/* FLOATING TECH BADGES (Matching exact desktop positions) */}
              {[
                "-top-4 -right-4",
                "-top-4 -left-4",
                "top-1/2 -right-6 -translate-y-1/2",
                "-bottom-3 -left-4",
                "-bottom-3 -right-4",
              ].map((posClass, idx) => (
                <div
                  key={idx}
                  className={`absolute ${posClass} z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-lg`}
                >
                  <div className="w-4 h-4 rounded-full bg-sky-400/40 dark:bg-sky-600/40 animate-pulse shrink-0" />
                  <div className="w-12 h-3 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              ))}

              {/* Glassmorphism Card Wrapper */}
              <div className="relative p-3 sm:p-4 rounded-xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 shadow-2xl shadow-sky-500/20 overflow-hidden">
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">

                  {/* Shimmer Placeholder replacing Image */}
                  <div className="skeleton-shimmer absolute inset-0 bg-gradient-to-tr from-slate-200/80 via-sky-100/40 to-slate-200/80 dark:from-slate-700/80 dark:via-sky-900/30 dark:to-slate-700/80" />

                  {/* Glass Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none z-10" />

                  {/* Floating Availability & Location Card Overlay */}
                  <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 z-30 p-2.5 sm:p-3 rounded-xl bg-slate-950/75 dark:bg-slate-900/85 backdrop-blur-xl border border-white/20 shadow-2xl space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                      </span>
                      <div className="skeleton-shimmer h-3 w-32 rounded bg-white/25 dark:bg-white/20" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded-sm bg-sky-400/70 dark:bg-sky-400/50 shrink-0" />
                      <div className="skeleton-shimmer skeleton-delay-1 h-2.5 w-28 rounded bg-white/20 dark:bg-white/15" />
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* FLOATING TECH BADGES FOR MOBILE (< sm) */}
            <div className="flex sm:hidden flex-wrap items-center justify-center gap-2 mt-4 z-20 w-full px-2">
              {[1, 2, 3, 4].map((idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-md"
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-sky-400/40 animate-pulse shrink-0" />
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