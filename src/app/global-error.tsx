"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  RotateCcw,
  Home,
  Terminal,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Bug,
  Cpu,
  ShieldAlert,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { FaReact } from "react-icons/fa6";
import { SiNextdotjs, SiTypescript } from "react-icons/si";

export default function GlobalError({
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
    console.error("Global Layout Error:", error);
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
    const errorDetails = `[PORTFOLIO GLOBAL ERROR REPORT]
Timestamp: ${new Date().toISOString()}
Message: ${error?.message || "Unknown error"}
Digest: ${error?.digest || "N/A"}
Stack: ${error?.stack || "N/A"}`;

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(errorDetails).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }, [error]);

  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#020617] text-[#F8FAFC] font-sans transition-colors duration-300">
        <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-12 py-20 sm:py-24">
          {/* Background Orbs */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-tr from-rose-500/20 via-amber-500/15 to-purple-600/20 blur-[140px] rounded-full pointer-events-none -z-10" />

          {/* Main Card */}
          <div className="container mx-auto max-w-5xl z-10">
            <div className="relative rounded-3xl backdrop-blur-2xl bg-slate-900/60 border border-slate-800 shadow-2xl p-6 sm:p-10 md:p-14 overflow-hidden text-center flex flex-col items-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold tracking-wider uppercase mb-4">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                <span>Critical Global Error</span>
              </div>

              {/* Title */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-none bg-gradient-to-r from-rose-500 via-amber-500 to-rose-600 bg-clip-text text-transparent mb-3">
                Critical Exception
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-md mb-6 leading-relaxed">
                A critical error occurred in the root layout. You can attempt to recover the app session or reload the page.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3.5 mb-8">
                <button
                  onClick={handleReset}
                  disabled={isResetting}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-rose-500 via-amber-600 to-rose-600 hover:from-rose-600 hover:to-amber-700 shadow-lg shadow-rose-500/25 transition-all duration-200 cursor-pointer disabled:opacity-70"
                >
                  <RotateCcw className={`w-4 h-4 ${isResetting ? "animate-spin" : ""}`} />
                  <span>{isResetting ? "Recovering..." : "Try Again"}</span>
                </button>

                <button
                  onClick={handleHardReload}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all duration-200 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 text-amber-400" />
                  <span>Reload Application</span>
                </button>
              </div>

              {/* Log box */}
              <div className="w-full max-w-lg rounded-2xl bg-slate-950 border border-slate-800 text-left overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
                  <span className="font-mono text-xs text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-rose-400" />
                    global-error.log
                  </span>
                  <button
                    onClick={handleCopyLog}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono text-slate-300 hover:text-white bg-slate-800 border border-slate-700"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <div className="p-4 font-mono text-xs text-slate-300">
                  <div className="text-rose-400">Error: {error?.message || "Unknown root layout error"}</div>
                  {error?.digest && <div className="text-amber-400 mt-1">Digest: {error.digest}</div>}
                </div>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
