import React from "react";

export default function LoginLoading() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-white dark:bg-[#020617]">
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-gradient-to-tr from-sky-500/10 via-blue-500/5 to-purple-500/10 blur-[150px] rounded-full skeleton-glow" />
      </div>

      {/* Card skeleton */}
      <div className="w-full max-w-md mx-auto px-4">
        <div className="rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xl p-8 space-y-6">
          {/* Logo / icon */}
          <div className="flex flex-col items-center gap-3">
            <div className="skeleton-shimmer w-12 h-12 rounded-xl bg-gradient-to-br from-sky-300/60 to-blue-400/60 dark:from-sky-900/60 dark:to-blue-900/60" />
            <div className="skeleton-shimmer w-36 h-6 rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="skeleton-shimmer w-52 h-4 rounded-md bg-slate-200 dark:bg-slate-800" />
          </div>
          {/* Fields */}
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <div className="skeleton-shimmer w-16 h-3.5 rounded bg-slate-200 dark:bg-slate-800" />
              <div className={`skeleton-shimmer skeleton-delay-${i} w-full h-11 rounded-xl bg-slate-200/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/60`} />
            </div>
          ))}
          {/* Submit button */}
          <div className="skeleton-shimmer skeleton-gradient w-full h-11 rounded-xl bg-gradient-to-r from-sky-300/70 via-blue-300/60 to-indigo-300/70 dark:from-sky-900/60 dark:via-blue-900/50 dark:to-indigo-900/60" />
        </div>
      </div>
    </div>
  );
}
