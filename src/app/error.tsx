"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
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
  LifeBuoy,
  RefreshCw,
  Sparkles,
  ExternalLink,
  Code2,
} from "lucide-react";
import { FaReact, FaNodeJs } from "react-icons/fa6";
import { SiNextdotjs, SiTypescript } from "react-icons/si";

// Stagger animation container
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

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
    // Log the error to an error reporting service or console
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
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#F8FAFC] dark:bg-[#020617] text-[#0F172A] dark:text-[#F8FAFC] px-4 sm:px-6 lg:px-12 py-20 sm:py-24 transition-colors duration-300">
      {/* Background Decorative Ambient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.2, 0.45, 0.2],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[580px] md:w-[750px] h-[380px] sm:h-[580px] md:h-[750px] bg-gradient-to-tr from-rose-500/20 via-amber-500/15 to-purple-600/20 blur-[130px] rounded-full pointer-events-none -z-10"
      />

      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.15, 0.35, 0.15],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-10 right-10 w-[260px] sm:w-[460px] h-[260px] sm:h-[460px] bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-rose-400/15 blur-[110px] rounded-full pointer-events-none -z-10"
      />

      {/* Floating Ambient Diagnostics */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{ y: [0, -18, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[8%] text-rose-500/25 dark:text-rose-400/20 font-mono text-xs sm:text-sm font-bold flex items-center gap-2 bg-rose-500/5 dark:bg-rose-500/10 px-3.5 py-1.5 rounded-full border border-rose-500/20 backdrop-blur-sm"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>HTTP 500 | RUNTIME_EXCEPTION</span>
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-[7%] text-amber-500/25 dark:text-amber-400/20 font-mono text-xs sm:text-sm font-semibold flex items-center gap-2 bg-amber-500/5 dark:bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20 backdrop-blur-sm"
        >
          <Bug className="w-3.5 h-3.5 text-amber-500" />
          <span>STATUS: UNHANDLED_REJECTION</span>
        </motion.div>

        <motion.div
          animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-24 left-[12%] text-slate-500/25 dark:text-slate-400/20 font-mono text-xs hidden md:flex items-center gap-2 bg-slate-500/5 dark:bg-slate-500/10 px-3.5 py-1.5 rounded-full border border-slate-500/20 backdrop-blur-sm"
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>NEXT_APP_ROUTER_BOUNDARY</span>
        </motion.div>
      </div>

      {/* Main Glassmorphic Container Card */}
      <div className="container mx-auto max-w-6xl z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative rounded-3xl backdrop-blur-2xl bg-white/75 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl shadow-slate-900/5 dark:shadow-black/50 p-6 sm:p-10 md:p-14 overflow-hidden"
        >
          {/* Subtle Inner Lighting Gradients */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-rose-500/10 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

          {/* TWO COLUMN LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* LEFT CONTENT COLUMN */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
              {/* Status Pill Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold tracking-wider uppercase mb-4"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                <span>System Exception Caught</span>
              </motion.div>

              {/* Main Typography */}
              <motion.div variants={itemVariants} className="relative mb-2 select-none">
                <motion.h1
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-none bg-gradient-to-r from-rose-500 via-amber-500 to-rose-600 bg-clip-text text-transparent drop-shadow-sm"
                >
                  System Glitch
                </motion.h1>
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 via-amber-500/20 to-purple-500/20 blur-2xl rounded-full -z-10 opacity-70 pointer-events-none" />
              </motion.div>

              {/* Subheading */}
              <motion.h2
                variants={itemVariants}
                className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3"
              >
                Something went wrong on our end.
              </motion.h2>

              {/* Error Message Summary */}
              <motion.p
                variants={itemVariants}
                className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed mb-6 max-w-lg"
              >
                An unhandled error occurred while processing this component. Don&apos;t worry — your data is safe and our diagnostic boundaries captured the event.
              </motion.p>

              {/* ACTION BUTTONS GROUP */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 mb-8 w-full sm:w-auto"
              >
                {/* Try Again / Recover Button */}
                <button
                  onClick={handleReset}
                  disabled={isResetting}
                  className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-rose-500 via-amber-600 to-rose-600 hover:from-rose-600 hover:to-amber-700 shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/35 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-75 disabled:pointer-events-none w-full sm:w-auto"
                >
                  <RotateCcw
                    className={`w-4 h-4 transition-transform ${
                      isResetting ? "animate-spin" : "group-hover:-rotate-45"
                    }`}
                  />
                  <span>{isResetting ? "Recovering..." : "Try Again"}</span>
                </button>

                {/* Hard Reload Button */}
                <button
                  onClick={handleHardReload}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium text-sm text-slate-700 dark:text-slate-200 bg-slate-100/90 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer w-full sm:w-auto"
                >
                  <RefreshCw className="w-4 h-4 text-amber-500" />
                  <span>Reload Page</span>
                </button>

                {/* Back To Home Link */}
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium text-sm text-slate-700 dark:text-slate-200 bg-slate-100/90 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer w-full sm:w-auto"
                >
                  <Home className="w-4 h-4 text-sky-500" />
                  <span>Back To Home</span>
                </Link>
              </motion.div>

              {/* INTERACTIVE DEVELOPER TERMINAL / STACK TRACE BOX */}
              <motion.div variants={itemVariants} className="w-full max-w-xl">
                <div className="rounded-2xl bg-slate-950 border border-slate-800 shadow-xl overflow-hidden text-left">
                  {/* Terminal Header Bar */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="ml-2 font-mono text-xs text-slate-400 flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-rose-400" />
                        error.log
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyLog}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-colors cursor-pointer"
                        title="Copy diagnostic report"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                            <span>Copy Log</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-colors cursor-pointer"
                      >
                        <span>Details</span>
                        {showDetails ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Terminal Log Body */}
                  <div className="p-4 font-mono text-xs text-slate-300 space-y-2 overflow-x-auto max-h-48 scrollbar-thin scrollbar-thumb-slate-800">
                    <div className="flex items-start gap-2 text-rose-400">
                      <span className="select-none text-slate-600">&gt;</span>
                      <span className="font-semibold">
                        Error: {error?.message || "An unexpected error occurred during execution."}
                      </span>
                    </div>

                    {error?.digest && (
                      <div className="flex items-center gap-2 text-amber-300/90">
                        <span className="select-none text-slate-600">&gt;</span>
                        <span>Digest Code:</span>
                        <code className="px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300">
                          {error.digest}
                        </code>
                      </div>
                    )}

                    <AnimatePresence>
                      {showDetails && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-2 border-t border-slate-800/80 space-y-2 text-slate-400"
                        >
                          <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
                            Stack Trace / Context:
                          </div>
                          <pre className="text-[11px] text-slate-400 leading-relaxed overflow-x-auto whitespace-pre-wrap break-all p-2 rounded bg-slate-900/60 border border-slate-800 font-mono">
                            {error?.stack || "No additional stack trace available in production environment."}
                          </pre>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              {/* Tech Stack Pills */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-8"
              >
                <span className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60 backdrop-blur-md flex items-center gap-1.5">
                  <SiNextdotjs className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
                  <span>Next.js 16</span>
                </span>
                <span className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60 backdrop-blur-md flex items-center gap-1.5">
                  <FaReact className="w-3.5 h-3.5 text-cyan-400" />
                  <span>React 19</span>
                </span>
                <span className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60 backdrop-blur-md flex items-center gap-1.5">
                  <SiTypescript className="w-3.5 h-3.5 text-blue-500" />
                  <span>TypeScript</span>
                </span>
                <span className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60 backdrop-blur-md flex items-center gap-1.5">
                  <LifeBuoy className="w-3.5 h-3.5 text-rose-500" />
                  <span>Error Boundary</span>
                </span>
              </motion.div>
            </div>

            {/* RIGHT COLUMN ILLUSTRATION (Animated Debugger & Server Scene) */}
            <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-md aspect-square flex items-center justify-center p-4"
              >
                {/* Glowing Outer Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-dashed border-rose-500/30 dark:border-rose-400/20"
                />

                {/* Counter Rotating Inner Grid */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-6 rounded-full border border-dotted border-amber-500/20 dark:border-amber-400/15"
                />

                {/* Central Glass Core Card */}
                <div className="relative z-10 w-64 h-64 rounded-3xl bg-gradient-to-b from-white/90 to-slate-100/80 dark:from-slate-800/90 dark:to-slate-900/90 border border-rose-500/30 shadow-2xl flex flex-col items-center justify-center p-6 text-center backdrop-blur-xl">
                  {/* Glowing Core Orb */}
                  <motion.div
                    animate={{
                      scale: [1, 1.15, 1],
                      boxShadow: [
                        "0 0 20px rgba(244,63,94,0.3)",
                        "0 0 40px rgba(244,63,94,0.6)",
                        "0 0 20px rgba(244,63,94,0.3)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white mb-4 shadow-lg"
                  >
                    <Bug className="w-10 h-10 animate-pulse" />
                  </motion.div>

                  <h3 className="font-mono text-sm font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                    DEBUGGER_ACTIVE
                  </h3>
                  <p className="font-mono text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Fault Isolated & Context Saved
                  </p>

                  {/* Circuit Indicator Dots */}
                  <div className="flex items-center gap-1.5 mt-4">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                </div>

                {/* Orbiting Satellite Badges */}
                <motion.div
                  animate={{ y: [0, -10, 0], x: [0, 6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-6 left-6 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-rose-500/30 text-rose-500 text-xs font-mono font-semibold shadow-md flex items-center gap-1.5"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>500 ERROR</span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0], x: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-6 right-6 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-amber-500/30 text-amber-500 text-xs font-mono font-semibold shadow-md flex items-center gap-1.5"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>CPU: STABLE</span>
                </motion.div>

                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute top-1/2 -right-4 -translate-y-1/2 p-2.5 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xl"
                >
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
