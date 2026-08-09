"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter, FaReact, FaNodeJs } from "react-icons/fa6";
import { SiNextdotjs, SiTypescript, SiMongodb, SiLeetcode } from "react-icons/si";

export default function Hero() {
  return (
    <section
      id="home"
      className="scroll-mt-24 relative overflow-hidden bg-white dark:bg-[#020617] text-[#0F172A] dark:text-[#F8FAFC] min-h-[calc(100vh-5rem)] flex items-center justify-center py-25 lg:py-28 transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

          {/* LEFT SIDE (58% Width on Desktop) */}
          <div className="w-full lg:w-[58%] flex flex-col items-center lg:items-start text-center lg:text-left">

            {/* 1. Greeting Text */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs sm:text-sm md:text-xl font-semibold text-slate-500 dark:text-slate-400 tracking-widest uppercase mb-3"
            >
              Hi, I'm
            </motion.p>

            {/* 2. Developer Name - Strongest Visual Element */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-3 text-slate-900 dark:text-white leading-none"
            >
              Amit Chandra Das
            </motion.h1>

            {/* 3. Professional Designation - Gradient Text */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-6"
            >
              <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Full-Stack Developer
              </span>
            </motion.h2>

            {/* 4. Short Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 font-normal"
            >
              I build scalable and modern web applications using React, Next.js, Node.js, and MongoDB.
              <br className="hidden sm:inline" /> I love creating clean user experiences and solving real-world problems through technology.
            </motion.p>

            {/* 5. Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8 w-full sm:w-auto"
            >
              {/* Primary Button: Download Resume */}
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href="https://drive.google.com/file/d/1wxzmggV7-3glpq2SAco55zl2QpGYeTPT/view?usp=sharing"
                  target="_blank"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 cursor-pointer"
                  aria-label="Download Resume"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume</span>
                </Link>
              </motion.div>

              {/* Secondary Button: Contact Me */}
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href="#contact"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold border border-slate-300 dark:border-slate-700/80 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md text-[#0F172A] dark:text-[#F8FAFC] hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 shadow-xs cursor-pointer"
                  aria-label="Contact Me"
                >
                  <span>Contact Me</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* 6. Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-3.5"
            >
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/amitchandradas2004"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-11 h-11 rounded-full flex items-center justify-center border border-slate-300/70 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-800 dark:text-slate-200 hover:text-black dark:hover:text-white hover:border-slate-800 dark:hover:border-slate-200 transition-all duration-200 shadow-xs"
              >
                <FaGithub className="w-5 h-5" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/in/amitchandradas2004"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-11 h-11 rounded-full flex items-center justify-center border border-slate-300/70 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-[#0A66C2] hover:text-[#0A66C2] hover:border-[#0A66C2] dark:hover:border-[#0A66C2] transition-all duration-200 shadow-xs"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://leetcode.com/u/amitchandradas2004"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode Profile"
                className="w-11 h-11 rounded-full flex items-center justify-center border border-slate-300/70 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-[#FFA116] hover:text-[#FFA116] hover:border-[#FFA116] dark:hover:border-[#FFA116] transition-all duration-200 shadow-xs"
              >
                <SiLeetcode className="w-5 h-5" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://x.com/amitchandra2004"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter) Profile"
                className="w-11 h-11 rounded-full flex items-center justify-center border border-slate-300/70 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-[#1DA1F2] hover:text-[#1DA1F2] hover:border-[#1DA1F2] dark:hover:border-[#1DA1F2] transition-all duration-200 shadow-xs"
              >
                <FaXTwitter className="w-5 h-5" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:[amitchandradas950@gmail.com]"
                aria-label="Email Me"
                className="w-11 h-11 rounded-full flex items-center justify-center border border-slate-300/70 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-[#EA4335] hover:text-[#EA4335] hover:border-[#EA4335] dark:hover:border-[#EA4335] transition-all duration-200 shadow-xs"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </motion.div>

          </div>

          {/* RIGHT SIDE (42% Width on Desktop - Professional Image & Tech Badges) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full lg:w-[42%] flex items-center justify-center relative"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative group w-full max-w-xs sm:max-w-sm"
            >
              {/* Soft Background Glow Behind Image */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-sky-500/30 via-blue-500/20 to-purple-500/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              {/* FLOATING TECH BADGES AROUND PROFILE IMAGE */}

              {/* 1. React (Top Right) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-4 -right-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-lg"
              >
                <FaReact className="w-4 h-4 text-cyan-400 animate-spin-slow" />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  React
                </span>
              </motion.div>

              {/* 2. Next.js (Top Left) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute -top-4 -left-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-lg"
              >
                <SiNextdotjs className="w-4 h-4 text-slate-900 dark:text-white" />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Next.js
                </span>
              </motion.div>

              {/* 3. TypeScript (Mid Right) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="absolute top-1/2 -right-6 -translate-y-1/2 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-lg"
              >
                <SiTypescript className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  TypeScript
                </span>
              </motion.div>

              {/* 4. Node.js (Bottom Left) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-3 -left-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-lg"
              >
                <FaNodeJs className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Node.js
                </span>
              </motion.div>

              {/* 5. MongoDB (Bottom Right) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 }}
                className="absolute -bottom-3 -right-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-lg"
              >
                <SiMongodb className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  MongoDB
                </span>
              </motion.div>

              {/* Glassmorphism Card Wrapper around Profile Image */}
              <div className="relative p-3 sm:p-4 rounded-3xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 shadow-2xl shadow-sky-500/20 overflow-hidden">
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src="/Amit_Image_3.png"
                    alt="Amit Chandra Das - Full-Stack Developer Profile Portrait"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 380px"
                    priority
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
                  />
                  {/* Glass Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
