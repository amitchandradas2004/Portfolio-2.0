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
      className="relative overflow-hidden bg-white dark:bg-[#020617] text-[#0F172A] dark:text-[#F8FAFC] py-20 transition-colors duration-300"
    >

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
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
              <p>
                Hello! I&apos;m <strong className="text-slate-900 dark:text-white font-semibold">Amit Chandra Das</strong>, a full-stack developer passionate about building scalable, high-performance web applications with modern design aesthetics. I bridge the gap between complex engineering and intuitive user experiences.
              </p>

              {/* 2. Programming Journey */}
              <p>
                My programming journey started with curiosity about how interactive applications operate behind the screen. Over time, that curiosity evolved into a dedicated career path where I master modern JavaScript frameworks, design robust RESTful APIs, and construct efficient database architecture.
              </p>

              {/* 3. Current Interests & Personality */}
              <p>
                When I&apos;m not writing code, I enjoy exploring emerging web technologies, refining UI micro-interactions, and contributing to developer communities. I take pride in writing clean, maintainable code and solving complex technical challenges with elegant solutions.
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
                    Modularity, reusability, and maintainable codebase standards.
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

          {/* RIGHT COLUMN: Glassmorphism Information Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full lg:w-[45%] flex flex-col justify-between"
          >
            <div className="relative p-6 sm:p-8 rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 shadow-2xl shadow-sky-500/10 space-y-7">

              {/* Header Status inside Card */}
              <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-5">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-sky-500">
                    Developer Overview
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                    Full Stack Developer
                  </h3>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Open to Work
                </div>
              </div>

              {/* Developer Statistics Grid */}
              <div>
                <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                  Developer Statistics
                </h4>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -3, scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        className="p-3.5 sm:p-4 rounded-2xl bg-white/70 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 shadow-xs"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-xl sm:text-2xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                            {stat.value}
                          </span>
                          <Icon className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                        </div>
                        <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          {stat.label}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {stat.sub}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Current Technologies */}
              <div>
                <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                  Current Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentTechs.map((tech, idx) => {
                    const Icon = tech.icon;
                    return (
                      <motion.span
                        key={idx}
                        whileHover={{ scale: 1.06 }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 text-xs font-medium text-slate-800 dark:text-slate-200 transition-colors shadow-2xs"
                      >
                        <Icon className={`w-3.5 h-3.5 ${tech.color}`} />
                        {tech.name}
                      </motion.span>
                    );
                  })}
                </div>
              </div>

              {/* Learning Focus */}
              <div className="pt-2">
                <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                  Learning Focus
                </h4>
                <div className="space-y-2.5">
                  {learningFocus.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/40"
                      >
                        <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500 shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-900 dark:text-white">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
