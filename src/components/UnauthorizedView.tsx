"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  ShieldAlert,
  Lock,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  Compass,
  Sparkles,
  UserCheck,
  AlertTriangle,
  Terminal,
  ShieldCheck,
} from "lucide-react";

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

export default function UnauthorizedView() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-100 px-4 sm:px-6 lg:px-12 py-24 transition-colors duration-300">
      {/* Background Decorative Ambient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] md:w-[750px] h-[400px] sm:h-[600px] md:h-[750px] bg-gradient-to-tr from-rose-500/20 via-amber-500/15 to-purple-600/20 blur-[140px] rounded-full pointer-events-none -z-10"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
          x: [0, -25, 0],
          y: [0, 25, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-10 right-10 w-[280px] sm:w-[480px] h-[280px] sm:h-[480px] bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-rose-400/15 blur-[120px] rounded-full pointer-events-none -z-10"
      />

      {/* Floating Cyber / Security Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-24 left-[8%] text-rose-500/20 dark:text-rose-400/15 font-mono text-xs sm:text-sm font-bold flex items-center gap-2 bg-rose-500/5 dark:bg-rose-500/10 px-3 py-1.5 rounded-full border border-rose-500/20"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>HTTP 401 UNAUTHORIZED</span>
        </motion.div>

        <motion.div
          animate={{ y: [0, 18, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-[7%] text-amber-500/25 dark:text-amber-400/20 font-mono text-xs sm:text-sm font-semibold flex items-center gap-2 bg-amber-500/5 dark:bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20"
        >
          <Lock className="w-3.5 h-3.5" />
          <span>AUTH_STATE: DENIED</span>
        </motion.div>

        <motion.div
          animate={{ y: [0, -12, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-24 left-[12%] text-slate-500/25 dark:text-slate-400/20 font-mono text-xs hidden md:flex items-center gap-2 bg-slate-500/5 dark:bg-slate-500/10 px-3 py-1.5 rounded-full border border-slate-500/20"
        >
          <KeyRound className="w-3.5 h-3.5" />
          <span>Token: Null or Expired</span>
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl text-center relative z-10 flex flex-col items-center"
      >
        {/* Animated Lock & Shield Icon Header */}
        <motion.div variants={itemVariants} className="relative mb-6">
          <div className="relative flex items-center justify-center">
            {/* Pulsing Backglow Ring */}
            <motion.div
              animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-rose-500/20 dark:bg-rose-500/30 blur-xl"
            />

            {/* Icon Container */}
            <div className="relative p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-rose-500/30 dark:border-rose-500/40 shadow-xl shadow-rose-500/10 backdrop-blur-xl flex items-center justify-center">
              <ShieldAlert className="w-12 h-12 sm:w-14 sm:h-14 text-rose-600 dark:text-rose-500" />
            </div>

            {/* Lock Badge */}
            <motion.div
              animate={{ rotate: [0, -8, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/30 border border-amber-300"
            >
              <Lock className="w-4 h-4" />
            </motion.div>
          </div>
        </motion.div>

        {/* Status Pill */}
        <motion.div variants={itemVariants} className="mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/30 text-rose-700 dark:text-rose-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            <span>Error 401 &bull; Access Restricted</span>
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 text-slate-900 dark:text-white leading-tight">
            Authentication Required
          </h1>
        </motion.div>

        {/* Description */}
        <motion.div variants={itemVariants}>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg mx-auto mb-8 font-medium leading-relaxed">
            You are attempting to access a protected area of this portfolio. Please sign in with your account credentials or test the interactive demo mode.
          </p>
        </motion.div>

        {/* Key Info Card */}
        <motion.div variants={itemVariants} className="w-full mb-8">
          <div className="rounded-2xl p-5 sm:p-6 bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md shadow-lg text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-sky-500/10 dark:bg-sky-500/15 border border-sky-500/20 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5 sm:mt-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                  Looking to explore the admin features?
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Use our Demo Login to experience read-only admin capabilities without setup.
                </p>
              </div>
            </div>

            <Link
              href="/login?demo=true"
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30 text-xs sm:text-sm font-bold transition-all group"
            >
              <Compass className="w-4 h-4 text-sky-500 group-hover:rotate-45 transition-transform" />
              <span>Launch Demo Mode</span>
            </Link>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md"
        >
          <Link
            href="/login"
            className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-600 active:scale-[0.98] text-white text-sm font-bold shadow-lg shadow-sky-500/25 transition-all group"
          >
            <UserCheck className="w-4 h-4" />
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/"
            className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-[0.98] text-slate-700 dark:text-slate-200 text-sm font-bold border border-slate-200/80 dark:border-slate-800 backdrop-blur-md transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Home</span>
          </Link>
        </motion.div>

        {/* Decorative subtle footer note */}
        <motion.div variants={itemVariants} className="mt-10">
          <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500/70" />
            <span>Amit Chandra Das &bull; Portfolio Security Layer</span>
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
}
