"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Layout,
  Server,
  Database,
  Wrench,
  Sparkles,
  BrainCircuit,
  Layers,
  Cloud,
  ShieldCheck,
  Globe,
} from "lucide-react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa6";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiDaisyui,
  SiExpress,
  SiJsonwebtokens,
  SiMongodb,
  SiFirebase,
  SiCloudinary,
  SiPostman,
  SiVercel,
  SiHeroui,
  SiFramer,
  SiBetterauth,
  SiZod,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { BsStripe } from "react-icons/bs";

interface SkillItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  badgeBg: string;
  glowColor: string;
  skills: SkillItem[];
}

export default function Skills() {
  const categories: SkillCategory[] = [
    {
      id: "frontend",
      title: "Frontend Development",
      icon: Layout,
      iconColor: "text-sky-500 dark:text-[#38BDF8]",
      badgeBg: "bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400",
      glowColor: "from-sky-500/20 via-blue-500/10 to-transparent",
      skills: [
        { name: "Next.js", icon: SiNextdotjs, iconColor: "text-slate-900 dark:text-white" },
        { name: "React.js", icon: FaReact, iconColor: "text-cyan-400 animate-spin-slow" },
        { name: "TypeScript", icon: SiTypescript, iconColor: "text-blue-500" },
        { name: "JavaScript", icon: FaJs, iconColor: "text-yellow-400" },
        { name: "O-Auth", icon: ShieldCheck, iconColor: "text-blue-500" },
        { name: "Better-Auth", icon: SiBetterauth, iconColor: "text-red-500" },
        { name: "Stripe", icon: BsStripe, iconColor: "text-sky-500" },
        { name: "Tailwind CSS", icon: SiTailwindcss, iconColor: "text-sky-400" },
        { name: "HTML5", icon: FaHtml5, iconColor: "text-orange-500" },
        { name: "CSS3", icon: FaCss3Alt, iconColor: "text-blue-500" },
        { name: "Framer Motion", icon: SiFramer, iconColor: "text-[#ff0055]" },
        { name: "DaisyUI", icon: SiDaisyui, iconColor: "text-yellow-400" },
        { name: "HeroUI", icon: SiHeroui, iconColor: "text-White-400" },
      ],
    },
    {
      id: "backend",
      title: "Backend Development",
      icon: Server,
      iconColor: "text-purple-500 dark:text-purple-400",
      badgeBg: "bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400",
      glowColor: "from-purple-500/20 via-indigo-500/10 to-transparent",
      skills: [
        { name: "Node.js", icon: FaNodeJs, iconColor: "text-emerald-500" },
        { name: "Express.js", icon: SiExpress, iconColor: "text-slate-700 dark:text-slate-300" },
        { name: "REST API", icon: Globe, iconColor: "text-sky-500" },
        { name: "Authentication", icon: ShieldCheck, iconColor: "text-amber-500" },
        { name: "ZOD", icon: SiZod, iconColor: "text-amber-500" },
        { name: "JWT", icon: SiJsonwebtokens, iconColor: "text-pink-500" },
      ],
    },
    {
      id: "database",
      title: "Database & Cloud",
      icon: Database,
      iconColor: "text-emerald-500 dark:text-emerald-400",
      badgeBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
      glowColor: "from-emerald-500/20 via-teal-500/10 to-transparent",
      skills: [
        { name: "MongoDB", icon: SiMongodb, iconColor: "text-emerald-500" },
        { name: "MongoDB Atlas", icon: SiMongodb, iconColor: "text-emerald-400" },
        { name: "Firebase", icon: SiFirebase, iconColor: "text-amber-500" },
        { name: "Cloudinary", icon: SiCloudinary, iconColor: "text-blue-400" },
      ],
    },
    {
      id: "tools",
      title: "Tools & Others",
      icon: Wrench,
      iconColor: "text-amber-500 dark:text-amber-400",
      badgeBg: "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400",
      glowColor: "from-amber-500/20 via-orange-500/10 to-transparent",
      skills: [
        { name: "Git", icon: FaGitAlt, iconColor: "text-orange-500" },
        { name: "GitHub", icon: FaGithub, iconColor: "text-slate-900 dark:text-white" },
        { name: "VS Code", icon: VscCode, iconColor: "text-blue-500" },
        { name: "Antigravity-IDE", icon: VscCode, iconColor: "text-blue-500" },
        { name: "Vercel", icon: SiVercel, iconColor: "text-slate-900 dark:text-white" },
        { name: "Postman", icon: SiPostman, iconColor: "text-orange-500" },
      ],
    },
  ];

  const learningItems = [
    { name: "AI Integration", icon: BrainCircuit, color: "text-purple-400" },
    { name: "System Design", icon: Layers, color: "text-sky-400" },
    { name: "Advanced TypeScript", icon: SiTypescript, color: "text-blue-500" },
    { name: "Cloud Technologies", icon: Cloud, color: "text-emerald-400" },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-white dark:bg-[#020617] text-[#0F172A] dark:text-[#F8FAFC] py-25 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">

        {/* SECTION HEADING */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-18">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-[#38BDF8] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3"
          >
            <Sparkles className="w-4 h-4 text-sky-500 dark:text-[#38BDF8]" />
            <span>Skills & Expertise</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight"
          >
            Skills &{" "}
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Technologies
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed"
          >
            Technologies and tools I use to build modern, scalable applications.
          </motion.p>
        </div>

        {/* SKILLS CATEGORIES GRID (1 Col Mobile, 2 Col Tablet, 4 Col Desktop) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16"
        >
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-2xl bg-white/70 dark:bg-[#0F172A]/60 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 p-6 shadow-xl shadow-sky-500/5 hover:shadow-2xl hover:shadow-sky-500/15 hover:border-sky-500/40 dark:hover:border-sky-400/40 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle Ambient Hover Glow */}
                <div
                  className={`absolute -inset-full bg-gradient-to-br ${cat.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl -z-10`}
                />

                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200/70 dark:border-slate-800">
                    <div className={`p-2.5 rounded-xl ${cat.badgeBg} border shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                      <CatIcon className={`w-5 h-5 ${cat.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      {cat.title}
                    </h3>
                  </div>

                  {/* Skill Items Grid / Badges */}
                  <div className="flex flex-wrap gap-2.5">
                    {cat.skills.map((skill, sIdx) => {
                      const SkillIcon = skill.icon;
                      return (
                        <motion.div
                          key={sIdx}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 text-slate-800 dark:text-slate-200 text-xs font-semibold shadow-2xs transition-all duration-200 hover:border-sky-400/50 hover:bg-white dark:hover:bg-slate-800"
                        >
                          <SkillIcon className={`w-4 h-4 shrink-0 ${skill.iconColor}`} />
                          <span>{skill.name}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* EXTRA PROFESSIONAL TOUCH: CURRENTLY LEARNING SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative rounded-2xl bg-gradient-to-r from-sky-500/10 via-purple-500/10 to-blue-500/10 backdrop-blur-xl border border-sky-500/20 dark:border-sky-400/20 p-6 sm:p-8 max-w-4xl mx-auto text-center shadow-lg"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

            <div className="text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-[#38BDF8] inline-flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Growth Mindset
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Currently Learning & Exploring
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                Continuously expanding technical depth to build next-generation applications.
              </p>
            </div>

            <div className="flex justify-center sm:grid sm:grid-cols-2 sm:justify-end gap-2.5 shrink-0">
              {learningItems.map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.06, y: -2 }}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-xs"
                  >
                    <ItemIcon className={`w-4 h-4 ${item.color}`} />
                    <span>{item.name}</span>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
