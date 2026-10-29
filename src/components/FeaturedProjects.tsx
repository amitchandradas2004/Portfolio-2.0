"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { Project } from "@/lib/projectsData";

export interface FeaturedProjectsProps {
  projects: Project[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section
      id="projects"
      className="scroll-mt-24 relative overflow-hidden bg-white dark:bg-[#020617] text-[#0F172A] dark:text-[#F8FAFC] py-24 transition-colors duration-300"
    >
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-sky-500/10 via-blue-500/5 to-purple-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 w-full relative z-10">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-[#38BDF8] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4"
          >
            <Sparkles className="w-4 h-4 text-sky-500 dark:text-[#38BDF8]" />
            <span>Featured Portfolio</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight"
          >
            Featured{" "}
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Projects
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed"
          >
            A curated selection of my highest-impact full-stack and cloud applications.
          </motion.p>
        </div>

        {/* RESPONSIVE PROJECTS GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-8 xl:gap-10"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
        {/* VIEW ALL PROJECTS LINK */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 text-center flex justify-center"
        >
          <Link
            href="/projects"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:via-blue-500 hover:to-indigo-500 shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 border border-white/20 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer overflow-hidden"
          >
            {/* Subtle light sweep animation layer */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />

            <span className="relative z-10 tracking-wide">Explore All Projects</span>

            <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-white/20 backdrop-blur-md transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
