"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  Home,
  Sparkles,
  Compass,
  Code2,
  Terminal,
  FileQuestion,
} from "lucide-react";
import { FaReact, FaNodeJs } from "react-icons/fa6";
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
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function NotFound() {
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
        className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] md:w-[700px] h-[350px] sm:h-[550px] md:h-[700px] bg-gradient-to-tr from-sky-500/20 via-blue-500/15 to-purple-600/20 blur-[130px] rounded-full pointer-events-none -z-10"
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

      {/* Floating Code & Math Symbols in Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{ y: [0, -18, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[10%] text-sky-500/25 dark:text-sky-400/20 font-mono text-xl sm:text-2xl font-bold"
        >
          &lt;/&gt;
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-[8%] text-purple-500/25 dark:text-purple-400/20 font-mono text-2xl sm:text-3xl font-bold"
        >
          {`{ }`}
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-24 left-[15%] text-indigo-500/25 dark:text-indigo-400/20 font-mono text-sm sm:text-base font-semibold"
        >
          const route = undefined;
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0], x: [0, -12, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-32 right-[18%] text-blue-500/25 dark:text-blue-400/20 font-mono text-lg sm:text-xl font-bold"
        >
          [ 404 ]
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
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-sky-500/10 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />

          {/* TWO COLUMN COMPOSITION (Desktop: Left Text / Right Scene; Mobile: Stacked) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* LEFT CONTENT COLUMN */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
              {/* Status Pill Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-[#38BDF8] text-xs font-semibold tracking-wider uppercase mb-4"
              >
                <Compass className="w-3.5 h-3.5 text-sky-500 animate-spin-slow" />
                <span>Lost in Digital Space</span>
              </motion.div>

              {/* Huge 404 Typography */}
              <motion.div variants={itemVariants} className="relative mb-2 select-none">
                <motion.h1
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter leading-none bg-gradient-to-r from-sky-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm"
                >
                  404
                </motion.h1>
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 via-blue-500/20 to-purple-500/20 blur-2xl rounded-full -z-10 opacity-80 pointer-events-none" />
              </motion.div>

              {/* Main Heading */}
              <motion.h2
                variants={itemVariants}
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3"
              >
                Oops! This page went missing.
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed mb-6 max-w-md"
              >
                The page you are looking for does not exist. Let&apos;s get you back to the main journey.
              </motion.p>

              {/* Floating Technology Glass Badges */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-8"
              >
                <span className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60 backdrop-blur-md flex items-center gap-1.5">
                  <SiNextdotjs className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
                  <span>Next.js</span>
                </span>
                <span className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60 backdrop-blur-md flex items-center gap-1.5">
                  <FaReact className="w-3.5 h-3.5 text-cyan-400" />
                  <span>React</span>
                </span>
                <span className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60 backdrop-blur-md flex items-center gap-1.5">
                  <SiTypescript className="w-3.5 h-3.5 text-blue-500" />
                  <span>TypeScript</span>
                </span>
                <span className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60 backdrop-blur-md flex items-center gap-1.5">
                  <FaNodeJs className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Node.js</span>
                </span>
              </motion.div>

              {/* Back To Home Button */}
              <motion.div variants={itemVariants}>
                <Link
                  href="/"
                  className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-sky-500 via-blue-600 to-purple-600 hover:from-sky-600 hover:to-purple-700 shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/35 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Home className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-0.5" />
                  <span>Back To Home</span>
                </Link>
              </motion.div>
            </div>

            {/* RIGHT ILLUSTRATION COLUMN (Animated Developer Walking Scene) */}
            <div className="lg:col-span-6 flex justify-center order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, x: 30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-md aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center p-2"
              >
                {/* SVG Animated Developer & Digital World Scene */}
                <svg
                  viewBox="0 0 500 380"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full drop-shadow-xl"
                >
                  <defs>
                    {/* Radial glow for digital portal */}
                    <radialGradient id="portalGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
                      <stop offset="60%" stopColor="#818CF8" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#020617" stopOpacity="0" />
                    </radialGradient>

                    {/* Gradient for broken digital road */}
                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.8" />
                      <stop offset="65%" stopColor="#6366F1" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#EC4899" stopOpacity="0.2" />
                    </linearGradient>

                    {/* Character hoodie gradient */}
                    <linearGradient id="hoodieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0284C7" />
                      <stop offset="100%" stopColor="#4F46E5" />
                    </linearGradient>

                    {/* Laptop Screen Glow */}
                    <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38BDF8" />
                      <stop offset="100%" stopColor="#C084FC" />
                    </linearGradient>
                  </defs>

                  {/* Ambient Background Digital Portal Halo */}
                  <circle cx="250" cy="190" r="160" fill="url(#portalGlow)" />

                  {/* Perspective Grid Ground Lines */}
                  <g opacity="0.3" stroke="currentColor" className="text-slate-400 dark:text-slate-600" strokeWidth="1">
                    <line x1="50" y1="310" x2="450" y2="310" />
                    <line x1="90" y1="270" x2="410" y2="270" opacity="0.7" />
                    <line x1="140" y1="230" x2="360" y2="230" opacity="0.4" />
                    <line x1="50" y1="310" x2="180" y2="200" />
                    <line x1="180" y1="310" x2="220" y2="200" />
                    <line x1="320" y1="310" x2="280" y2="200" />
                    <line x1="450" y1="310" x2="320" y2="200" />
                  </g>

                  {/* Broken Digital Path (Road where page missing) */}
                  <g>
                    {/* Left half of path */}
                    <path
                      d="M 50 300 L 220 230 L 210 230 L 30 300 Z"
                      fill="url(#pathGradient)"
                    />
                    {/* Broken Gap Edge Sparkles */}
                    <circle cx="220" cy="230" r="3" fill="#38BDF8" className="animate-ping" />

                    {/* Broken Route Signpost */}
                    <g transform="translate(230, 170)">
                      {/* Sign Pole */}
                      <line x1="15" y1="60" x2="15" y2="10" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
                      {/* Sign Box */}
                      <rect x="-15" y="-15" width="60" height="28" rx="6" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
                      <text x="15" y="3" textAnchor="middle" fill="#38BDF8" fontSize="10" fontFamily="monospace" fontWeight="bold">
                        ERR 404
                      </text>
                      {/* Broken Alert Light */}
                      <circle cx="35" cy="-15" r="3" fill="#EF4444" className="animate-pulse" />
                    </g>
                  </g>

                  {/* ANIMATED DEVELOPER / STUDENT CHARACTER */}
                  <motion.g
                    animate={{
                      y: [0, -4, 0],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Character Shadow on Ground */}
                    <ellipse cx="140" cy="290" rx="35" ry="7" fill="#000000" opacity="0.25" />

                    {/* LEFT LEG (Walking motion loop) */}
                    <motion.g
                      animate={{
                        rotate: [-14, 14, -14],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{ transformOrigin: "135px 240px" }}
                    >
                      <path d="M 135 240 L 125 285 L 115 285" stroke="#1E293B" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                      {/* Shoe */}
                      <path d="M 115 285 L 105 285" stroke="#0EA5E9" strokeWidth="8" strokeLinecap="round" />
                    </motion.g>

                    {/* RIGHT LEG (Walking motion loop opposing) */}
                    <motion.g
                      animate={{
                        rotate: [14, -14, 14],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{ transformOrigin: "145px 240px" }}
                    >
                      <path d="M 145 240 L 155 285 L 165 285" stroke="#334155" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                      {/* Shoe */}
                      <path d="M 165 285 L 175 285" stroke="#38BDF8" strokeWidth="8" strokeLinecap="round" />
                    </motion.g>

                    {/* TORSO & HOODIE */}
                    <path
                      d="M 125 185 Q 140 180 155 185 L 155 240 Q 140 245 125 240 Z"
                      fill="url(#hoodieGrad)"
                    />

                    {/* BACKPACK */}
                    <rect x="110" y="190" width="18" height="38" rx="6" fill="#475569" stroke="#1E293B" strokeWidth="2" />
                    <line x1="125" y1="195" x2="128" y2="230" stroke="#94A3B8" strokeWidth="3" />

                    {/* HEAD & HAIR / HOOD */}
                    <circle cx="140" cy="160" r="16" fill="#FDBA74" />
                    {/* Hair / Cap */}
                    <path d="M 124 158 Q 140 140 156 158 Q 156 148 140 144 Q 124 148 124 158 Z" fill="#0F172A" />
                    {/* Headphones */}
                    <path d="M 123 158 Q 140 138 157 158" stroke="#38BDF8" strokeWidth="3" fill="none" />
                    <circle cx="123" cy="160" r="4" fill="#38BDF8" />
                    <circle cx="157" cy="160" r="4" fill="#38BDF8" />

                    {/* ARMS & OPEN LAPTOP */}
                    {/* Left Arm holding laptop */}
                    <path d="M 132 195 L 148 215 L 165 210" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Laptop Body */}
                    <polygon points="160,205 182,205 178,218 156,218" fill="#64748B" />
                    {/* Laptop Screen */}
                    <polygon points="162,188 184,188 182,205 160,205" fill="url(#screenGrad)" />
                    {/* Code lines on screen */}
                    <line x1="165" y1="192" x2="178" y2="192" stroke="#FFFFFF" strokeWidth="1.5" />
                    <line x1="165" y1="196" x2="174" y2="196" stroke="#38BDF8" strokeWidth="1.5" />
                    <line x1="165" y1="200" x2="180" y2="200" stroke="#F43F5E" strokeWidth="1.5" />
                  </motion.g>

                  {/* FLOATING CODE & TECH PARTICLES AROUND CHARACTER */}
                  <motion.g
                    animate={{
                      y: [0, -12, 0],
                      opacity: [0.4, 0.9, 0.4],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Code bubble 1 */}
                    <rect x="270" y="110" width="65" height="24" rx="8" fill="#0F172A" stroke="#38BDF8" strokeWidth="1" opacity="0.9" />
                    <text x="302" y="125" textAnchor="middle" fill="#38BDF8" fontSize="10" fontFamily="monospace" fontWeight="bold">
                      GET 404
                    </text>

                    {/* Code bubble 2 */}
                    <rect x="70" y="100" width="75" height="24" rx="8" fill="#0F172A" stroke="#A855F7" strokeWidth="1" opacity="0.9" />
                    <text x="107" y="115" textAnchor="middle" fill="#C084FC" fontSize="9" fontFamily="monospace" fontWeight="bold">
                      null_pointer
                    </text>
                  </motion.g>

                  {/* Floating Glowing Orbs in Scene */}
                  <circle cx="210" cy="90" r="3" fill="#38BDF8" className="animate-pulse" />
                  <circle cx="340" cy="180" r="2.5" fill="#A855F7" className="animate-ping" />
                  <circle cx="90" cy="220" r="4" fill="#34D399" className="animate-pulse" />
                </svg>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
