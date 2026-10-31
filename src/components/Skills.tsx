"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Sparkles } from "lucide-react";
import { defaultSkillsData, SkillsData } from "@/lib/skills-types";
import { renderCategoryIcon, renderSkillIcon } from "@/lib/skill-icons";
import SkillsSkeleton from "@/components/skeletons/SkillsSkeleton";

interface SkillsProps {
  initialSkills?: SkillsData;
  isPreview?: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Skills({ initialSkills, isPreview = false }: SkillsProps) {
  const [skillsData, setSkillsData] = useState<SkillsData>(initialSkills || defaultSkillsData);
  const [loading, setLoading] = useState<boolean>(!initialSkills);

  // Sync with prop updates
  useEffect(() => {
    if (initialSkills) {
      setSkillsData(initialSkills);
      setLoading(false);
    }
  }, [initialSkills]);

  // Client-side fetch if initial data was not provided or for revalidation
  useEffect(() => {
    let isMounted = true;

    async function fetchSkills() {
      try {
        const res = await fetch("/api/skills", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setSkillsData(data);
          }
        }
      } catch (err) {
        console.error("Failed to load skills from database:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    if (!initialSkills) {
      fetchSkills();
    }

    // Real-time listener for instant updates from dashboard
    const handleSkillsUpdated = (event: Event) => {
      const customEvent = event as CustomEvent<SkillsData>;
      if (customEvent.detail) {
        setSkillsData(customEvent.detail);
      } else {
        fetchSkills();
      }
    };

    window.addEventListener("portfolio-skills-updated", handleSkillsUpdated);
    return () => {
      isMounted = false;
      window.removeEventListener("portfolio-skills-updated", handleSkillsUpdated);
    };
  }, [initialSkills]);

  if (loading && !isPreview) {
    return <SkillsSkeleton />;
  }

  const {
    badgeText = "Skills & Expertise",
    title = "Skills &",
    highlightedTitle = "Technologies",
    description = "Technologies and tools I use to build modern, scalable applications.",
    learningBadgeText = "Growth Mindset",
    learningSectionTitle = "Currently Learning & Exploring",
    learningSectionSubtitle = "Continuously expanding technical depth to build next-generation applications.",
    categories = [],
    learningItems = [],
  } = skillsData;

  return (
    <section
      id="skills"
      className={`scroll-mt-24 relative overflow-hidden bg-slate-100 dark:bg-[#020617] text-[#0F172A] dark:text-[#F8FAFC] ${isPreview ? "py-8" : "py-20 sm:py-24"
        } transition-colors duration-300 w-full`}
    >
      {/* =========================================================================
         BACKGROUND LIQUID LIGHT SOURCES (Provides Refraction for Glass)
         ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {/* High-Contrast Neon Cyan Orb */}
        <div className="absolute top-10 left-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-sky-400/35 dark:bg-cyan-500/30 blur-[90px] rounded-full animate-pulse" />

        {/* Vibrant Magenta/Purple Liquid Orb */}
        <div className="absolute bottom-10 right-1/4 w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] bg-purple-500/30 dark:bg-indigo-600/30 blur-[100px] rounded-full animate-pulse" />

        {/* Glass Mesh Grid Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf818_1px,transparent_1px),linear-gradient(to_bottom,#38bdf818_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 w-full relative z-10">
        {/* SECTION HEADING */}
        <div className="text-center max-w-5xl mx-auto mb-14 lg:mb-18">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 dark:bg-slate-900/50 border border-white/60 dark:border-white/10 backdrop-blur-xl text-sky-600 dark:text-[#38BDF8] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3 shadow-lg shadow-sky-500/10"
          >
            <Sparkles className="w-4 h-4 text-sky-500 dark:text-[#38BDF8]" />
            <span>{badgeText}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight"
          >
            {title}{" "}
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              &nbsp;{highlightedTitle}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        </div>

        {/* SKILLS CATEGORIES GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16"
        >
          {categories.map((cat) => {
            const visibleSkills = (cat.skills || []).filter((s) => s.enabled !== false);
            if (visibleSkills.length === 0 && !isPreview) return null;

            return (
              <motion.div
                key={cat.id}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-xl overflow-hidden backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 border border-white/60 dark:border-white/10 hover:border-sky-400/60 dark:hover:border-sky-400/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] hover:shadow-[0_12px_40px_0_rgba(56,189,248,0.25)] transition-all duration-500 p-6 sm:p-7 flex flex-col justify-between"
              >
                {/* Liquid Surface Light Reflection */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-gradient-to-br from-white/40 dark:from-sky-400/20 to-transparent rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />

                <div className="relative z-10">
                  {/* Category Header */}
                  <div className="flex items-center justify-between gap-2.5 mb-6 pb-4 border-b border-slate-200/50 dark:border-slate-800/60 min-w-0">
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div
                        className={`p-2 rounded-xl ${cat.badgeBg || "bg-white/60 dark:bg-slate-800/60 border-white/50 dark:border-slate-700/60 text-sky-600 dark:text-sky-400"
                          } border shrink-0 transition-transform duration-300 group-hover:scale-110 backdrop-blur-md shadow-sm`}
                      >
                        <div className={cat.iconColor || "text-sky-500"}>
                          {renderCategoryIcon(cat.iconKey, "w-4.5 h-4.5")}
                        </div>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                        {cat.title}
                      </h3>
                    </div>

                    <span className="shrink-0 whitespace-nowrap text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-white/40 dark:border-slate-700/50 backdrop-blur-md shadow-sm">
                      {visibleSkills.length} skills
                    </span>
                  </div>

                  {/* Skill Items Badges */}
                  <div className="flex flex-wrap gap-2.5">
                    {visibleSkills.map((skill) => (
                      <motion.div
                        key={skill.id}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-white/40 dark:border-slate-700/40 text-slate-800 dark:text-slate-200 text-xs font-semibold backdrop-blur-sm shadow-xs transition-all duration-200 hover:border-sky-400/50 hover:scale-105 cursor-default"
                      >
                        <div className={`shrink-0 ${skill.iconColor || "text-sky-400"}`}>
                          {renderSkillIcon(skill.iconKey, "w-4 h-4")}
                        </div>
                        <span>{skill.name}</span>
                        {skill.level && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-200/60 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400 font-medium">
                            {skill.level}
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CURRENTLY LEARNING SECTION */}
        {learningItems && learningItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-xl overflow-hidden backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 border border-white/60 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] p-6 sm:p-8 lg:p-10 w-full"
          >
            {/* Liquid Surface Light Reflection */}
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-br from-white/40 dark:from-sky-400/20 to-transparent rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <span className="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400 inline-flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5" /> {learningBadgeText}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {learningSectionTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
                  {learningSectionSubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 shrink-0 w-full sm:w-auto">
                {learningItems.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-white/40 dark:border-slate-700/40 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-xs hover:border-sky-400/50 backdrop-blur-sm transition-all"
                  >
                    <div className={item.color || "text-purple-400"}>
                      {renderSkillIcon(item.iconKey, "w-4 h-4")}
                    </div>
                    <span>{item.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}