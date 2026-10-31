"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  Building2,
  BookOpen,
} from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export interface EducationItem {
  id: string;
  degree: string;
  field?: string;
  institution: string;
  duration: string;
  description: string;
  isCurrent?: boolean;
  badge?: string;
}

const educationData: EducationItem[] = [
  {
    id: "honours",
    degree: "Bachelor / Honours Degree",
    field: "English Literature",
    institution: "National University",
    duration: "2024 - Present",
    description:
      "Currently pursuing Honours in English Literature while continuously developing my programming and software development skills.",
    isCurrent: true,
    badge: "Undergraduate",
  },
  {
    id: "hsc",
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Milestone College",
    duration: "2023",
    description:
      "Completed higher secondary education and started my journey toward technology and software development.",
    isCurrent: false,
    badge: "High School",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardLeftVariants: Variants = {
  hidden: (isDesktop?: boolean) => ({
    opacity: 0,
    x: isDesktop ? -40 : 0,
    y: isDesktop ? 0 : -40,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardRightVariants: Variants = {
  hidden: (isDesktop?: boolean) => ({
    opacity: 0,
    x: isDesktop ? 40 : 0,
    y: isDesktop ? 0 : -40,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Education() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <section
      id="education"
      className="scroll-mt-24 relative overflow-hidden bg-slate-100 dark:bg-[#020617] text-[#0F172A] dark:text-[#F8FAFC] py-20 sm:py-24 transition-colors duration-300 w-full"
    >
      {/* =========================================================================
         BACKGROUND LIQUID LIGHT SOURCES (Crucial for Glass Refraction)
         ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {/* High-Contrast Neon Cyan Orb */}
        <div className="absolute top-10 left-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-sky-400/40 dark:bg-cyan-500/35 blur-[80px] rounded-full animate-pulse" />

        {/* Vibrant Magenta/Purple Liquid Orb */}
        <div className="absolute bottom-10 right-1/4 w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] bg-purple-500/35 dark:bg-indigo-600/35 blur-[90px] rounded-full animate-pulse" />

        {/* Glass Mesh Grid Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf818_1px,transparent_1px),linear-gradient(to_bottom,#38bdf818_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 w-full relative z-10">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 dark:bg-slate-900/50 border border-white/60 dark:border-white/10 backdrop-blur-xl text-sky-600 dark:text-[#38BDF8] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 shadow-lg shadow-sky-500/10"
          >
            <GraduationCap className="w-4 h-4 text-sky-500 dark:text-[#38BDF8]" />
            <span>Academic Journey</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight"
          >
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Education
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed"
          >
            My academic background and learning journey.
          </motion.p>
        </div>

        {/* TIMELINE CONTAINER */}
        <div className="relative w-full">
          {/* Vertical Central Line */}
          <div className="absolute top-0 bottom-0 left-6 lg:left-1/2 lg:-translate-x-1/2 w-0.5 bg-gradient-to-b from-sky-400 via-blue-500 to-purple-500 opacity-50 dark:opacity-70" />

          <motion.div
            variants={containerVariants}
            custom={isDesktop}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-12 lg:space-y-16"
          >
            {educationData.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className="relative flex flex-col lg:flex-row items-start lg:items-center"
                >
                  {/* TIMELINE NODE DOT */}
                  <div className="absolute left-6 lg:left-1/2 lg:-translate-x-1/2 top-1.5 lg:top-1/2 lg:-translate-y-1/2 z-20 -translate-x-1/2 flex items-center justify-center">
                    <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white/80 dark:bg-slate-900/80 border-2 border-sky-400 backdrop-blur-md shadow-lg shadow-sky-500/30">
                      <div
                        className={`w-3 h-3 rounded-full ${item.isCurrent
                          ? "bg-sky-400 animate-pulse shadow-[0_0_12px_#38bdf8]"
                          : "bg-blue-600 dark:bg-sky-400"
                          }`}
                      />
                    </div>
                  </div>

                  {/* Left Side Container */}
                  <div className="w-full lg:w-1/2 pl-14 lg:pl-0 lg:pr-12 lg:text-right">
                    {isEven && (
                      <motion.div
                        custom={isDesktop}
                        variants={cardLeftVariants}
                        whileHover={{ y: -6, scale: 1.01 }}
                        className="group relative rounded-xl overflow-hidden backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 border border-white/60 dark:border-white/10 hover:border-sky-400/60 dark:hover:border-sky-400/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] hover:shadow-[0_12px_40px_0_rgba(56,189,248,0.25)] transition-all duration-500 p-6 sm:p-8"
                      >
                        {/* Liquid Surface Light Reflection */}
                        <div className="absolute -top-24 -left-24 w-48 h-48 bg-gradient-to-br from-white/40 dark:from-sky-400/20 to-transparent rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />

                        <div className="relative z-10">
                          <div className="flex flex-wrap items-center gap-2 mb-3 lg:justify-end">
                            {item.badge && (
                              <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-400/30 backdrop-blur-md shadow-inner">
                                {item.badge}
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 border border-white/40 dark:border-slate-700/50 backdrop-blur-md shadow-sm">
                              <Calendar className="w-3.5 h-3.5 text-sky-500" />
                              <span>{item.duration}</span>
                            </span>
                          </div>

                          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors duration-200 mb-1">
                            {item.degree}
                          </h3>

                          {item.field && (
                            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 mb-2 lg:justify-end">
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>Field: {item.field}</span>
                            </div>
                          )}

                          <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 mb-4 lg:justify-end">
                            <Building2 className="w-4 h-4 text-slate-400 dark:text-slate-400" />
                            <span>{item.institution}</span>
                          </div>

                          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Right Side Container */}
                  <div className="w-full lg:w-1/2 pl-14 lg:pl-12 lg:text-left">
                    {!isEven && (
                      <motion.div
                        custom={isDesktop}
                        variants={cardRightVariants}
                        whileHover={{ y: -6, scale: 1.01 }}
                        className="group relative rounded-xl overflow-hidden backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 border border-white/60 dark:border-white/10 hover:border-sky-400/60 dark:hover:border-sky-400/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] hover:shadow-[0_12px_40px_0_rgba(56,189,248,0.25)] transition-all duration-500 p-6 sm:p-8"
                      >
                        {/* Liquid Surface Light Reflection */}
                        <div className="absolute -top-24 -left-24 w-48 h-48 bg-gradient-to-br from-white/40 dark:from-sky-400/20 to-transparent rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />

                        <div className="relative z-10">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            {item.badge && (
                              <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-400/30 backdrop-blur-md shadow-inner">
                                {item.badge}
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 border border-white/40 dark:border-slate-700/50 backdrop-blur-md shadow-sm">
                              <Calendar className="w-3.5 h-3.5 text-sky-500" />
                              <span>{item.duration}</span>
                            </span>
                          </div>

                          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors duration-200 mb-1">
                            {item.degree}
                          </h3>

                          {item.field && (
                            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 mb-2">
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>Field: {item.field}</span>
                            </div>
                          )}

                          <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 mb-4">
                            <Building2 className="w-4 h-4 text-slate-400 dark:text-slate-400" />
                            <span>{item.institution}</span>
                          </div>

                          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}