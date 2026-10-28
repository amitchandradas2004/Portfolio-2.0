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
      className={`scroll-mt-24 relative overflow-hidden bg-white dark:bg-[#020617] text-[#0F172A] dark:text-[#F8FAFC] ${isPreview ? "py-8" : "py-25"
        } transition-colors duration-300`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 w-full relative z-10">
        {/* SECTION HEADING */}
        <div className="text-center max-w-5xl mx-auto mb-14 lg:mb-18">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3"
          >
            <Sparkles className="w-4 h-4 text-sky-500 dark:text-sky-400" />
            <span>{badgeText}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight"
          >
            {title}{" "} &
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

        {/* SKILLS CATEGORIES GRID (1 Col Mobile, 2 Col Tablet & Desktop) */}
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
                whileHover={{ y: -6, scale: 1.012 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-2xl bg-white/70 dark:bg-slate-950/85 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-7 shadow-xl shadow-sky-500/5 hover:shadow-2xl hover:shadow-sky-500/15 hover:border-sky-500/40 dark:hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle Ambient Hover Glow */}
                <div
                  className={`absolute -inset-full bg-gradient-to-br ${cat.glowColor || "from-sky-500/20 via-blue-500/10 to-transparent"
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl -z-10`}
                />

                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200/70 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2.5 rounded-xl ${cat.badgeBg || "bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400"
                          } border shrink-0 transition-transform duration-300 group-hover:scale-110`}
                      >
                        <div className={cat.iconColor || "text-sky-500"}>
                          {renderCategoryIcon(cat.iconKey, "w-5 h-5")}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                        {cat.title}
                      </h3>
                    </div>

                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                      {visibleSkills.length} skills
                    </span>
                  </div>

                  {/* Skill Items Badges */}
                  <div className="flex flex-wrap gap-2.5">
                    {visibleSkills.map((skill) => {
                      return (
                        <motion.div
                          key={skill.id}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 text-slate-800 dark:text-slate-200 text-xs font-semibold shadow-2xs transition-all duration-200 hover:border-sky-400/50 hover:bg-white dark:hover:bg-slate-800 dark:hover:text-white cursor-default"
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
                      );
                    })}
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
            className="relative rounded-2xl bg-gradient-to-r from-sky-500/10 via-purple-500/10 to-blue-500/10 dark:bg-slate-950/80 backdrop-blur-xl border border-sky-500/20 dark:border-sky-500/30 p-6 sm:p-8 lg:p-10 shadow-lg w-full"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
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
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/80 dark:bg-slate-950/90 border border-slate-200/80 dark:border-slate-800/80 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-xs hover:border-sky-500/30 hover:bg-slate-50 dark:hover:bg-slate-900 dark:hover:text-white transition-colors"
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
