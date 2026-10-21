"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Code2,
  Sparkles,
  Rocket,
  BrainCircuit,
  Terminal,
  FolderGit2,
  Zap,
  CheckCircle2,
} from "lucide-react";
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
} from "react-icons/fa6";
import {
  SiNextdotjs,
  SiTypescript,
  SiMongodb,
  SiTailwindcss,
  SiExpress,
} from "react-icons/si";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";

export default function About() {
  const [commitCount, setCommitCount] = useState<string>("1300+");

  useEffect(() => {
    async function fetchCommitCount() {
      try {
        const res = await fetch(
          "https://api.github.com/search/commits?q=author:amitchandradas2004",
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.total_count === "number" && data.total_count > 0) {
            setCommitCount(`${data.total_count.toLocaleString()}+`);
          }
        }
      } catch (error) {
        console.error("Failed to fetch live GitHub commit count:", error);
      }
    }

    fetchCommitCount();
  }, []);

  const stats = [
    {
      label: "Months Experience",
      value: "6+",
      sub: "Hands-on Building",
      icon: Terminal,
      color: "from-sky-500 to-blue-600",
    },
    {
      label: "Projects Built",
      value: "10+",
      sub: "Full-Stack & Web Apps",
      icon: Code2,
      color: "from-blue-500 to-purple-600",
    },
    {
      label: "Git Commits",
      value: commitCount,
      sub: "Live GitHub Count",
      icon: FolderGit2,
      color: "from-purple-500 to-pink-600",
    },
    {
      label: "Code Quality",
      value: "100%",
      sub: "Clean & Maintainable",
      icon: Zap,
      color: "from-emerald-500 to-teal-600",
    },
  ];

  const currentTechs = [
    { name: "React", icon: FaReact, color: "text-cyan-400" },
    { name: "Next.js", icon: SiNextdotjs, color: "text-slate-900 dark:text-white" },
    { name: "TypeScript", icon: SiTypescript, color: "text-blue-500" },
    { name: "Node.js", icon: FaNodeJs, color: "text-emerald-500" },
    { name: "Express", icon: SiExpress, color: "text-slate-700 dark:text-slate-300" },
    { name: "MongoDB", icon: SiMongodb, color: "text-emerald-600 dark:text-emerald-400" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-sky-400" },
    { name: "Git", icon: FaGitAlt, color: "text-orange-500" },
  ];

  const learningFocus = [
    {
      title: "AI Integration & LLMs",
      desc: "Integrating intelligent agents & API workflows into web apps.",
      icon: BrainCircuit,
    },
    {
      title: "Cloud & Microservices",
      desc: "Scalable serverless functions and modern container deployment.",
      icon: Rocket,
    },
    {
      title: "Web Performance",
      desc: "Optimizing Core Web Vitals, SSR, and rendering efficiency.",
      icon: Sparkles,
    },
  ];

  return (
    <section
      id="about"
      className="scroll-mt-24 relative overflow-hidden bg-white dark:bg-[#020617] text-[#0F172A] dark:text-[#F8FAFC] py-20 transition-colors duration-300"
    >

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-12 lg:gap-16">

          {/* LEFT COLUMN: Section Heading & Narrative */}
          <div className="w-full lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left">

            {/* Kicker Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4"
            >
              <User className="w-4 h-4 text-sky-500" />
              <span>About Me</span>
            </motion.div>

            {/* Main Section Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight"
            >
              Crafting Digital Solutions with{" "}
              <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Passion & Precision
              </span>
            </motion.h2>

            {/* 1. Professional Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-normal mb-8"
            >

              {/* 1. Introduction */}
              <p>
                Hello! I&apos;m{" "}
                <strong className="text-slate-900 dark:text-white font-semibold">
                  Amit Chandra Das
                </strong>
                , a full-stack developer passionate about building modern, scalable, and
                user-friendly web applications. I work with React, Next.js, TypeScript,
                Node.js, and MongoDB to create seamless digital experiences with clean,
                responsive interfaces and reliable backend systems.
              </p>

              {/* 2. Programming Journey */}
              <p>
                My journey into web development began with curiosity about how interactive
                applications work behind the scenes. Since then, I&apos;ve built real-world
                projects, developed RESTful APIs, implemented authentication and
                authorization, integrated payment systems, and worked with databases to
                deliver functional, full-stack solutions.
              </p>

              {/* 3. Current Interests & Personality */}
              <p>
                Beyond coding, I enjoy exploring modern web technologies, refining UI
                interactions, collaborating with other developers, and solving real-world
                problems through software. I value clean, maintainable code, continuous
                learning, and building intuitive user experiences while growing as a
                developer through hands-on projects and collaboration.
              </p>

            </motion.div>

            {/* Trait Highlight Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
            >
              <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-white/10 flex items-start gap-3.5 text-left shadow-xs">
                <div className="p-2 rounded-xl bg-sky-500/10 text-sky-500 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Clean Architecture
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Modularity, $eusability, and Maintainable CodeBase Standards.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-white/10 flex items-start gap-3.5 text-left shadow-xs">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    User-Centric Design
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Smooth micro-interactions and pixel-perfect responsiveness.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Liquid Glass Information Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full lg:w-[45%] flex flex-col justify-between"
          >
            <LiquidGlassCard
              borderRadius="28px"
              blurIntensity="xl"
              glowIntensity="lg"
              shadowIntensity="lg"
              className="w-full"
            >
              {/* ── Card inner padding wrapper ── */}
              <div className="p-6 sm:p-7 space-y-6">

                {/* ── Header ── */}
                <div className="flex items-start justify-between gap-3 pb-5 border-b border-slate-200/60 dark:border-white/8">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-sky-500 dark:text-sky-400 mb-1">
                      Developer Overview
                    </p>
                    <h3 className="text-[1.35rem] font-extrabold leading-tight text-slate-900 dark:text-white">
                      Full Stack Developer
                    </h3>
                  </div>
                  <div className="shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 dark:bg-emerald-400/10 border border-emerald-500/25 dark:border-emerald-400/20 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold tracking-wide">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    Open to Work
                  </div>
                </div>

                {/* ── Stats Grid ── */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500 mb-3">
                    Developer Statistics
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {stats.map((stat, idx) => {
                      const Icon = stat.icon;
                      return (
                        <motion.div
                          key={idx}
                          whileHover={{ y: -4, scale: 1.03 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="relative group p-4 rounded-2xl overflow-hidden bg-white dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700/50 shadow-sm cursor-default"
                        >
                          {/* Subtle gradient wash on hover */}
                          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${stat.color} [mask-image:none]`} style={{ opacity: 0.06 }} />
                          <div className="flex items-start justify-between mb-2">
                            <span className={`text-2xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent leading-none`}>
                              {stat.value}
                            </span>
                            <span className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700/60">
                              <Icon className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                            </span>
                          </div>
                          <p className="text-[12px] font-semibold text-slate-800 dark:text-slate-100 leading-tight">
                            {stat.label}
                          </p>
                          <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {stat.sub}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* ── Tech Stack ── */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500 mb-3">
                    Current Technologies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {currentTechs.map((tech, idx) => {
                      const Icon = tech.icon;
                      return (
                        <motion.span
                          key={idx}
                          whileHover={{ scale: 1.07, y: -1 }}
                          transition={{ duration: 0.15 }}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/50 text-[11.5px] font-medium text-slate-700 dark:text-slate-200 shadow-xs cursor-default"
                        >
                          <Icon className={`w-3.5 h-3.5 shrink-0 ${tech.color}`} />
                          <span>{tech.name}</span>
                        </motion.span>
                      );
                    })}
                  </div>
                </div>

                {/* ── Learning Focus ── */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500 mb-3">
                    Currently Learning
                  </p>
                  <div className="space-y-2">
                    {learningFocus.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={idx}
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.15 }}
                          className="flex items-center gap-3 p-3 rounded-xl bg-white/80 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/40 shadow-xs"
                        >
                          <div className="shrink-0 p-2 rounded-lg bg-gradient-to-br from-sky-500/15 to-blue-500/10 dark:from-sky-400/15 dark:to-blue-400/10 text-sky-600 dark:text-sky-400">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[12px] font-semibold text-slate-900 dark:text-white leading-tight">
                              {item.title}
                            </p>
                            <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug truncate">
                              {item.desc}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </LiquidGlassCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
