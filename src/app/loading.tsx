"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Sparkles,
  Code2,
  FolderGit2,
  Layers,
  Cpu,
  Terminal,
} from "lucide-react";
import { FaReact, FaNodeJs, FaNpm } from "react-icons/fa6";
import { SiNextdotjs, SiTypescript } from "react-icons/si";

// Stagger animation container
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
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

export default function Loading() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#F8FAFC] dark:bg-[#020617] text-[#0F172A] dark:text-[#F8FAFC] px-4 sm:px-6 lg:px-12 py-20 sm:py-24 transition-colors duration-300">
      {/* Background Decorative Ambient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.45, 0.25],
          x: [0, 25, 0],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] md:w-[700px] h-[350px] sm:h-[550px] md:h-[700px] bg-gradient-to-tr from-sky-500/20 via-blue-500/15 to-purple-600/20 blur-[130px] rounded-full pointer-events-none -z-10"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
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
        className="absolute bottom-10 right-10 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] bg-gradient-to-br from-purple-500/15 via-indigo-500/10 to-sky-400/15 blur-[110px] rounded-full pointer-events-none -z-10"
      />

      {/* Floating Code & Tech Symbols in Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{ y: [0, -16, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[10%] text-sky-500/25 dark:text-sky-400/20 font-mono text-xl sm:text-2xl font-bold"
        >
          &lt;/&gt;
        </motion.div>

        <motion.div
          animate={{ y: [0, 18, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-[8%] text-purple-500/25 dark:text-purple-400/20 font-mono text-2xl sm:text-3xl font-bold"
        >
          {`{ }`}
        </motion.div>

        <motion.div
          animate={{ y: [0, -14, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-24 left-[12%] text-indigo-500/25 dark:text-indigo-400/20 font-mono text-xs sm:text-sm font-semibold"
        >
          npm run build
        </motion.div>

        <motion.div
          animate={{ y: [0, 15, 0], x: [0, -12, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-32 right-[15%] text-blue-500/25 dark:text-blue-400/20 font-mono text-sm sm:text-base font-bold"
        >
          [ compiling... ]
        </motion.div>
      </div>

      {/* Main Glassmorphic Container Card */}
      <div className="container mx-auto max-w-4xl z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative rounded-3xl backdrop-blur-2xl bg-white/75 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl shadow-slate-900/5 dark:shadow-black/50 p-6 sm:p-10 md:p-12 text-center overflow-hidden flex flex-col items-center justify-center"
        >
          {/* Subtle Inner Lighting Gradients */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-sky-500/10 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />

          {/* TOP STATUS BADGE */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-[#38BDF8] text-xs font-semibold tracking-wider uppercase mb-6"
          >
            <Cpu className="w-3.5 h-3.5 text-sky-500 animate-pulse" />
            <span>Developer Workspace</span>
          </motion.div>

          {/* DEVELOPER BUILDING SVG ANIMATED SCENE */}
          <motion.div
            variants={itemVariants}
            className="relative w-full max-w-md aspect-[16/10] flex items-center justify-center mb-6"
          >
            {/* Floating Glassmorphic Status Cards Around Character */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-1 left-2 sm:left-4 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/90 dark:bg-slate-900/90 text-sky-600 dark:text-sky-400 border border-sky-500/30 backdrop-blur-md shadow-lg shadow-sky-500/5 flex items-center gap-2 z-20"
            >
              <FolderGit2 className="w-3.5 h-3.5 text-sky-500" />
              <span>Fetching Projects...</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-1 right-2 sm:right-4 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/90 dark:bg-slate-900/90 text-purple-600 dark:text-purple-400 border border-purple-500/30 backdrop-blur-md shadow-lg shadow-purple-500/5 flex items-center gap-2 z-20"
            >
              <Layers className="w-3.5 h-3.5 text-purple-500" />
              <span>Loading Components...</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-1/2 -right-3 sm:-right-6 -translate-y-1/2 hidden sm:flex px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/90 dark:bg-slate-900/90 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 backdrop-blur-md shadow-lg shadow-emerald-500/5 items-center gap-2 z-20"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>Preparing Portfolio...</span>
            </motion.div>

            {/* SVG Developer Workspace Scene */}
            <svg
              viewBox="0 0 500 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-xl"
            >
              <defs>
                {/* Radial glow around developer workspace */}
                <radialGradient id="workGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.35" />
                  <stop offset="60%" stopColor="#818CF8" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#020617" stopOpacity="0" />
                </radialGradient>

                {/* Desk Surface Gradient */}
                <linearGradient id="deskGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#334155" />
                  <stop offset="50%" stopColor="#475569" />
                  <stop offset="100%" stopColor="#1E293B" />
                </linearGradient>

                {/* Hoodie Gradient */}
                <linearGradient id="devHoodie" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284C7" />
                  <stop offset="100%" stopColor="#4F46E5" />
                </linearGradient>

                {/* Laptop Screen Glow */}
                <linearGradient id="lapScreen" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#A855F7" />
                </linearGradient>
              </defs>

              {/* Ambient Workspace Glow Halo */}
              <circle cx="250" cy="160" r="140" fill="url(#workGlow)" />

              {/* DESK SURFACE */}
              <rect x="80" y="240" width="340" height="12" rx="6" fill="url(#deskGrad)" />
              <rect x="120" y="252" width="16" height="50" rx="4" fill="#334155" />
              <rect x="364" y="252" width="16" height="50" rx="4" fill="#334155" />

              {/* COFFEE MUG ON DESK WITH ANIMATED STEAM */}
              <rect x="115" y="218" width="18" height="22" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
              <path d="M 133 223 Q 140 228 133 233" stroke="#94A3B8" strokeWidth="2" fill="none" />
              {/* Coffee Steam */}
              <motion.path
                animate={{ y: [-2, -8, -2], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                d="M 120 214 Q 124 208 120 202"
                stroke="#38BDF8"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              <motion.path
                animate={{ y: [-2, -8, -2], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                d="M 128 214 Q 132 208 128 202"
                stroke="#A855F7"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* SEATED DEVELOPER CHARACTER */}
              <motion.g
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Chair Backrest */}
                <rect x="220" y="150" width="60" height="80" rx="10" fill="#1E293B" />
                <line x1="250" y1="230" x2="250" y2="260" stroke="#0F172A" strokeWidth="8" />

                {/* Torso & Hoodie */}
                <path
                  d="M 220 160 Q 250 155 280 160 L 280 240 Q 250 245 220 240 Z"
                  fill="url(#devHoodie)"
                />

                {/* Head & Hair */}
                <circle cx="250" cy="130" r="18" fill="#FDBA74" />
                {/* Hair */}
                <path d="M 232 128 Q 250 110 268 128 Q 268 118 250 114 Q 232 118 232 128 Z" fill="#0F172A" />
                {/* Headphones */}
                <path d="M 231 128 Q 250 108 269 128" stroke="#38BDF8" strokeWidth="3" fill="none" />
                <circle cx="231" cy="130" r="4.5" fill="#38BDF8" />
                <circle cx="269" cy="130" r="4.5" fill="#38BDF8" />

                {/* ANIMATED TYPING HANDS & ARMS */}
                <motion.path
                  animate={{
                    d: [
                      "M 230 180 L 245 210 L 260 218",
                      "M 230 180 L 245 208 L 262 216",
                      "M 230 180 L 245 210 L 260 218",
                    ],
                  }}
                  transition={{ duration: 0.25, repeat: Infinity, ease: "easeInOut" }}
                  stroke="#0284C7"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <motion.path
                  animate={{
                    d: [
                      "M 270 180 L 258 210 L 242 218",
                      "M 270 180 L 258 208 L 240 216",
                      "M 270 180 L 258 210 L 242 218",
                    ],
                  }}
                  transition={{ duration: 0.25, repeat: Infinity, ease: "easeInOut", delay: 0.12 }}
                  stroke="#0284C7"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </motion.g>

              {/* LAPTOP ON DESK */}
              {/* Laptop Screen */}
              <polygon points="215,160 285,160 275,220 225,220" fill="url(#lapScreen)" />
              {/* Screen Glow Halo */}
              <polygon points="210,155 290,155 280,222 220,222" fill="#38BDF8" opacity="0.15" />
              {/* Laptop Base */}
              <polygon points="205,220 295,220 305,228 195,228" fill="#64748B" />

              {/* CODE LINES FLOWING UP FROM LAPTOP SCREEN */}
              <motion.g
                animate={{
                  y: [-5, -25, -5],
                  opacity: [0.2, 0.9, 0.2],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <line x1="230" y1="170" x2="260" y2="170" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                <line x1="230" y1="178" x2="250" y2="178" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
                <line x1="230" y1="186" x2="270" y2="186" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" />
                <line x1="230" y1="194" x2="245" y2="194" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
                <line x1="230" y1="202" x2="265" y2="202" stroke="#C084FC" strokeWidth="2" strokeLinecap="round" />
              </motion.g>

              {/* FLOATING MINI TECH CHIPS AROUND LAPTOP */}
              <motion.g
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <circle cx="170" cy="130" r="14" fill="#0F172A" stroke="#38BDF8" strokeWidth="1" />
                <text x="170" y="134" textAnchor="middle" fill="#38BDF8" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
                  &lt;/&gt;
                </text>

                <circle cx="330" cy="120" r="14" fill="#0F172A" stroke="#A855F7" strokeWidth="1" />
                <text x="330" y="124" textAnchor="middle" fill="#C084FC" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
                  {`{ }`}
                </text>
              </motion.g>
            </svg>
          </motion.div>

          {/* LOADING TITLE */}
          <motion.h1
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-2 bg-gradient-to-r from-sky-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
          >
            Building Experience...
          </motion.h1>

          {/* SUBTITLE */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed mb-6 max-w-md mx-auto"
          >
            Preparing something amazing for you.
          </motion.p>

          {/* PROGRESS LINE ANIMATION INDICATOR */}
          <motion.div variants={itemVariants} className="w-full max-w-xs mx-auto">
            {/* Progress Track */}
            <div className="relative h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden border border-slate-300/40 dark:border-slate-700/40">
              {/* Shimmer Bar */}
              <motion.div
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-sky-500 to-purple-600 rounded-full shadow-sm shadow-sky-500/50"
              />
            </div>

            {/* Bottom Status Text */}
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono mt-3 px-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
                <span>compiling</span>
              </span>
              <span>100% ready soon</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
