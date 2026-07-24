"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  Building2,
  BookOpen,
  Sparkles,
  Award,
} from "lucide-react";

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
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardRightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Education() {
  return (
    <section
      id="education"
      className="scroll-mt-24 relative overflow-hidden bg-white dark:bg-[#020617] text-[#0F172A] dark:text-[#F8FAFC] py-20 sm:py-24 transition-colors duration-300"
    >
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-sky-500/10 via-blue-500/5 to-purple-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-[#38BDF8] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4"
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
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Central Line (Desktop center, Mobile left side) */}
          <div className="absolute top-0 bottom-0 left-6 lg:left-1/2 lg:-translate-x-1/2 w-0.5 bg-gradient-to-b from-sky-500 via-blue-600 to-purple-600 opacity-30 dark:opacity-40" />

          <motion.div
            variants={containerVariants}
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
                    <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white dark:bg-[#020617] border-2 border-sky-500 shadow-md shadow-sky-500/20">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          item.isCurrent
                            ? "bg-sky-500 animate-pulse"
                            : "bg-blue-600 dark:bg-sky-400"
                        }`}
                      />
                    </div>
                  </div>

                  {/* DESKTOP ALTERNATING CARD POSITIONS */}
                  {/* Left Side Container (For even items on desktop) */}
                  <div className="w-full lg:w-1/2 pl-14 lg:pl-0 lg:pr-12 lg:text-right">
                    {isEven && (
                      <motion.div
                        variants={cardLeftVariants}
                        whileHover={{ y: -6 }}
                        className="group relative rounded-2xl overflow-hidden backdrop-blur-md bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 hover:border-sky-500/40 dark:hover:border-sky-400/40 shadow-lg shadow-slate-900/5 dark:shadow-black/30 hover:shadow-2xl hover:shadow-sky-500/10 dark:hover:shadow-sky-400/10 transition-all duration-300 p-6 sm:p-7"
                      >
                        {/* Date & Badge Header */}
                        <div className="flex flex-wrap items-center gap-2 mb-3 lg:justify-end">
                          {item.badge && (
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                              {item.badge}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300/60 dark:border-slate-700/60">
                            <Calendar className="w-3.5 h-3.5 text-sky-500" />
                            <span>{item.duration}</span>
                          </span>
                        </div>

                        {/* Degree Title */}
                        <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors duration-200 mb-1">
                          {item.degree}
                        </h3>

                        {/* Field of Study */}
                        {item.field && (
                          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 mb-2 lg:justify-end">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Field: {item.field}</span>
                          </div>
                        )}

                        {/* Institution Name */}
                        <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 mb-4 lg:justify-end">
                          <Building2 className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                          <span>{item.institution}</span>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {item.description}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* Right Side Container (For odd items on desktop) */}
                  <div className="w-full lg:w-1/2 pl-14 lg:pl-12 lg:text-left">
                    {!isEven && (
                      <motion.div
                        variants={cardRightVariants}
                        whileHover={{ y: -6 }}
                        className="group relative rounded-2xl overflow-hidden backdrop-blur-md bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 hover:border-sky-500/40 dark:hover:border-sky-400/40 shadow-lg shadow-slate-900/5 dark:shadow-black/30 hover:shadow-2xl hover:shadow-sky-500/10 dark:hover:shadow-sky-400/10 transition-all duration-300 p-6 sm:p-7"
                      >
                        {/* Date & Badge Header */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          {item.badge && (
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                              {item.badge}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300/60 dark:border-slate-700/60">
                            <Calendar className="w-3.5 h-3.5 text-sky-500" />
                            <span>{item.duration}</span>
                          </span>
                        </div>

                        {/* Degree Title */}
                        <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors duration-200 mb-1">
                          {item.degree}
                        </h3>

                        {/* Field of Study */}
                        {item.field && (
                          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 mb-2">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Field: {item.field}</span>
                          </div>
                        )}

                        {/* Institution Name */}
                        <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 mb-4">
                          <Building2 className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                          <span>{item.institution}</span>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {item.description}
                        </p>
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
