"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
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
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isNavigating) return;

    setIsNavigating(true);

    setTimeout(() => {
      router.push("/projects");
    }, 600);
  };

  return (
    <section
      id="projects"
      className="scroll-mt-24 relative overflow-hidden bg-slate-100 dark:bg-[#020617] text-slate-900 dark:text-slate-100 py-24 transition-colors duration-300 w-full"
    >
      {/* Background Ambient Liquid Lighting Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] sm:w-[750px] h-[450px] bg-sky-400/25 dark:bg-cyan-500/20 blur-[130px] rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-500/20 dark:bg-indigo-600/20 blur-[110px] rounded-full pointer-events-none" />
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200/50 dark:bg-slate-900/50 border border-slate-300/40 dark:border-slate-800/60 backdrop-blur-xl text-sky-600 dark:text-[#38BDF8] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-sky-500 dark:text-[#38BDF8] shrink-0" />
            <span>Featured Portfolio</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight text-slate-900 dark:text-white"
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
            A curated selection of my highest-impact full-stack applications, SaaS products, and enterprise tools.
          </motion.p>
        </div>

        {/* RESPONSIVE PROJECTS GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 xl:gap-10"
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={index === 2 ? "md:col-span-2 lg:col-span-1" : ""}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </motion.div>

        {/* VIEW ALL PROJECTS LINK */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 sm:mt-16 text-center flex justify-center"
        >
          <Link
            href="/projects"
            onClick={handleExploreClick}
            aria-label="Explore All Projects"
            className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm text-white bg-gradient-to-r from-sky-500 via-sky-400 to-sky-600 hover:from-sky-400 hover:to-sky-500 shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 border border-sky-300/30 backdrop-blur-xl transition-all duration-300 active:scale-[0.98] cursor-pointer overflow-hidden ${isNavigating ? "opacity-90 cursor-wait" : ""
              }`}
          >
            {/* Top Specular Edge Shine Overlay */}
            <span className="pointer-events-none absolute inset-x-4 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent" />

            {/* Subtle light sweep animation layer */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />

            {isNavigating ? (
              <>
                <span className="relative z-10 tracking-wide">Exploring Projects...</span>
                <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-white/20 backdrop-blur-md">
                  <Loader2 className="w-3.5 h-3.5 text-white animate-spin shrink-0" />
                </div>
              </>
            ) : (
              <>
                <span className="relative z-10 tracking-wide">Explore All Projects</span>
                <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-white/20 backdrop-blur-md transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5 text-white shrink-0" />
                </div>
              </>
            )}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}