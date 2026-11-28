"use client";

import { LiquidGlassCard } from "@/components/ui/liquid-glass";
import {
  AlertTriangle,
  Bug,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Cpu,
  Home,
  LifeBuoy,
  RefreshCw,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FaReact } from "react-icons/fa6";
import { SiNextdotjs, SiTypescript } from "react-icons/si";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    console.error("Application Runtime Error:", error);
  }, [error]);

  const handleReset = useCallback(() => {
    setIsResetting(true);
    setTimeout(() => {
      reset();
      setIsResetting(false);
    }, 400);
  }, [reset]);

  const handleHardReload = useCallback(() => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  }, []);

  const handleCopyLog = useCallback(() => {
    const errorDetails = `[PORTFOLIO ERROR REPORT]
Timestamp: ${new Date().toISOString()}
Message: ${error?.message || "Unknown error"}
Digest: ${error?.digest || "N/A"}
Stack: ${error?.stack || "N/A"}
UserAgent: ${typeof navigator !== "undefined" ? navigator.userAgent : "N/A"}
URL: ${typeof window !== "undefined" ? window.location.href : "N/A"}`;

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(errorDetails).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }, [error]);

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-100 dark:bg-[#020617] text-[#0F172A] dark:text-[#F8FAFC] pt-28 pb-20 transition-colors duration-300">
      {/* BACKGROUND LIQUID LIGHT SOURCES (Matches Portfolio Palette) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-10 left-1/4 w-87.5 sm:w-125 h-87.5 sm:h-125 bg-sky-400/35 dark:bg-cyan-500/30 blur-[90px] rounded-full" />
        <div className="absolute bottom-10 right-1/4 w-100 sm:w-137.5 h-100 sm:h-137.5 bg-purple-500/30 dark:bg-indigo-600/30 blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf818_1px,transparent_1px),linear-gradient(to_bottom,#38bdf818_1px,transparent_1px)] bg-size-[3rem_3rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* Main Liquid Glass Container Card */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10 w-full">
        <LiquidGlassCard
          borderRadius="16px"
          blurIntensity="xl"
          glowIntensity="lg"
          shadowIntensity="lg"
          className="w-full relative overflow-hidden bg-white/40! dark:bg-slate-900/40! border-white/60! dark:border-white/10!"
        >
          {/* Specular Liquid Light Reflection */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-linear-to-br from-white/40 dark:from-sky-400/20 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="p-6 sm:p-10 md:p-14 relative z-10">
            {/* TWO COLUMN LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* LEFT CONTENT COLUMN */}
              <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
                {/* Status Pill Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 backdrop-blur-xl text-rose-600 dark:text-rose-400 text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                  </span>
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>System Exception Caught</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mb-3 text-slate-900 dark:text-white">
                  System{" "}
                  <span className="bg-linear-to-r from-rose-500 via-amber-500 to-purple-500 bg-clip-text text-transparent">
                    Glitch
                  </span>
                </h1>

                {/* Subheading */}
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight mb-3">
                  Something went wrong on our end.
                </h2>

                {/* Error Message Summary */}
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed mb-7 max-w-xl">
                  An unhandled error occurred while rendering this section. Your
                  session and data are safe, and our error boundary isolated the
                  fault.
                </p>

                {/* ACTION BUTTONS GROUP */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 mb-8 w-full sm:w-auto">
                  {/* Try Again / Recover Button (Portfolio Primary Gradient Pill) */}
                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={isResetting}
                    className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white bg-linear-to-r from-sky-500 via-sky-400 to-sky-600 hover:from-sky-400 hover:to-sky-500 scale-100 hover:scale-[1.03] active:scale-[0.94] shadow-lg shadow-sky-500/25 border border-sky-300/30 backdrop-blur-xl will-change-transform transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] touch-manipulation cursor-pointer overflow-hidden disabled:opacity-70 disabled:pointer-events-none w-full sm:w-auto"
                  >
                    <span className="pointer-events-none absolute inset-x-4 top-0 h-[1.5px] bg-linear-to-r from-transparent via-white/80 to-transparent" />
                    <RotateCcw
                      className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                        isResetting ? "animate-spin" : "group-hover:-rotate-45"
                      }`}
                    />
                    <span>{isResetting ? "Recovering..." : "Try Again"}</span>
                  </button>

                  {/* Hard Reload Button */}
                  <button
                    type="button"
                    onClick={handleHardReload}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-sm text-slate-800 dark:text-slate-200 bg-white/40 dark:bg-slate-900/40 hover:bg-white/70 dark:hover:bg-slate-800/70 border border-white/60 dark:border-white/10 backdrop-blur-xl shadow-xs scale-100 hover:scale-[1.03] active:scale-[0.94] will-change-transform transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] touch-manipulation cursor-pointer w-full sm:w-auto"
                  >
                    <RefreshCw className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Reload Page</span>
                  </button>

                  {/* Back To Home Link */}
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-sm text-slate-800 dark:text-slate-200 bg-white/40 dark:bg-slate-900/40 hover:bg-white/70 dark:hover:bg-slate-800/70 border border-white/60 dark:border-white/10 backdrop-blur-xl shadow-xs scale-100 hover:scale-[1.03] active:scale-[0.94] will-change-transform transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] touch-manipulation cursor-pointer w-full sm:w-auto"
                  >
                    <Home className="w-4 h-4 text-sky-500 dark:text-[#38BDF8] shrink-0" />
                    <span>Back To Home</span>
                  </Link>
                </div>

                {/* INTERACTIVE DEVELOPER TERMINAL / STACK TRACE BOX */}
                <div className="w-full max-w-xl">
                  <div className="rounded-xl bg-slate-950/90 backdrop-blur-xl border border-white/15 shadow-xl overflow-hidden text-left">
                    {/* Terminal Header Bar */}
                    <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800/80">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                        <span className="ml-2 font-mono text-xs text-slate-400 flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                          <span>error.log</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleCopyLog}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 active:scale-[0.95] transition-all cursor-pointer"
                          title="Copy diagnostic report"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>Copy Log</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => setShowDetails((prev) => !prev)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 active:scale-[0.95] transition-all cursor-pointer"
                        >
                          <span>Details</span>
                          {showDetails ? (
                            <ChevronUp className="w-3.5 h-3.5 shrink-0" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 shrink-0" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Terminal Log Body */}
                    <div className="p-4 font-mono text-xs text-slate-300 space-y-2 overflow-x-auto max-h-52">
                      <div className="flex items-start gap-2 text-rose-400">
                        <span className="select-none text-slate-600">&gt;</span>
                        <span className="font-semibold">
                          Error:{" "}
                          {error?.message ||
                            "An unexpected error occurred during execution."}
                        </span>
                      </div>

                      {error?.digest && (
                        <div className="flex items-center gap-2 text-amber-300/90">
                          <span className="select-none text-slate-600">
                            &gt;
                          </span>
                          <span>Digest Code:</span>
                          <code className="px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300">
                            {error.digest}
                          </code>
                        </div>
                      )}

                      {showDetails && (
                        <div className="pt-2 border-t border-slate-800/80 space-y-2 text-slate-400">
                          <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
                            Stack Trace / Context:
                          </div>
                          <pre className="text-[11px] text-slate-400 leading-relaxed overflow-x-auto whitespace-pre-wrap break-all p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 font-mono">
                            {error?.stack ||
                              "No additional stack trace available in production environment."}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-7">
                  <span className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/40 dark:bg-slate-900/40 text-slate-800 dark:text-slate-200 border border-white/60 dark:border-white/10 backdrop-blur-md flex items-center gap-1.5 shadow-xs">
                    <SiNextdotjs className="w-3.5 h-3.5 text-slate-900 dark:text-white shrink-0" />
                    <span>Next.js 16</span>
                  </span>
                  <span className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/40 dark:bg-slate-900/40 text-slate-800 dark:text-slate-200 border border-white/60 dark:border-white/10 backdrop-blur-md flex items-center gap-1.5 shadow-xs">
                    <FaReact className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                    <span>React 19</span>
                  </span>
                  <span className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/40 dark:bg-slate-900/40 text-slate-800 dark:text-slate-200 border border-white/60 dark:border-white/10 backdrop-blur-md flex items-center gap-1.5 shadow-xs">
                    <SiTypescript className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>TypeScript</span>
                  </span>
                  <span className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/40 dark:bg-slate-900/40 text-slate-800 dark:text-slate-200 border border-white/60 dark:border-white/10 backdrop-blur-md flex items-center gap-1.5 shadow-xs">
                    <LifeBuoy className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>Error Boundary</span>
                  </span>
                </div>
              </div>

              {/* RIGHT COLUMN ILLUSTRATION (Liquid Glass Diagnostic Scene) */}
              <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
                <div className="relative w-full max-w-sm aspect-square flex items-center justify-center p-4">
                  {/* Static Decorative Rings */}
                  <div className="absolute inset-2 rounded-full border border-dashed border-sky-400/35 dark:border-sky-400/20 pointer-events-none" />
                  <div className="absolute inset-8 rounded-full border border-dotted border-purple-400/35 dark:border-purple-400/20 pointer-events-none" />

                  {/* Central Liquid Glass Core Card */}
                  <div className="relative z-10 w-64 h-64 rounded-2xl bg-white/50 dark:bg-slate-900/60 border border-white/60 dark:border-white/10 shadow-[0_8px_32px_0_rgb(31_38_135/0.15)] dark:shadow-[0_8px_32px_0_rgb(0_0_0/0.5)] flex flex-col items-center justify-center p-6 text-center backdrop-blur-2xl">
                    <div className="w-18 h-18 rounded-2xl bg-linear-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-rose-500/25">
                      <Bug className="w-9 h-9" />
                    </div>

                    <h3 className="font-mono text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                      DEBUGGER_ACTIVE
                    </h3>
                    <p className="font-mono text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                      Fault Isolated &amp; Context Saved
                    </p>

                    {/* Status Indicator Dots */}
                    <div className="flex items-center gap-1.5 mt-4">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                  </div>

                  {/* Satellite Diagnostic Badges */}
                  <div className="absolute top-6 left-4 px-3 py-1.5 rounded-xl bg-white/60 dark:bg-slate-900/70 border border-white/60 dark:border-white/10 text-rose-600 dark:text-rose-400 text-xs font-mono font-semibold shadow-md backdrop-blur-xl flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                    <span>500 ERROR</span>
                  </div>

                  <div className="absolute bottom-6 right-4 px-3 py-1.5 rounded-xl bg-white/60 dark:bg-slate-900/70 border border-white/60 dark:border-white/10 text-sky-600 dark:text-[#38BDF8] text-xs font-mono font-semibold shadow-md backdrop-blur-xl flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 shrink-0" />
                    <span>BOUNDARY: SAFE</span>
                  </div>

                  <div className="absolute top-1/2 -right-2 -translate-y-1/2 p-2.5 rounded-xl bg-white/60 dark:bg-slate-900/70 border border-white/60 dark:border-white/10 shadow-lg backdrop-blur-xl">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LiquidGlassCard>
      </div>
    </main>
  );
}
