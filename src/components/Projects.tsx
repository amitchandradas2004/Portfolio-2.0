"use client";

import React, { useState, useMemo } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import ProjectsSkeleton from "@/components/skeletons/ProjectsSkeleton";
import { Project } from "@/lib/projectsData";

export interface ProjectsProps {
  projects: Project[];
  itemsPerPage?: number;
  isLoading?: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Projects({ projects, itemsPerPage = 6, isLoading }: ProjectsProps) {
  // Deduplicate projects to prevent duplicate keys or rendering bugs
  const uniqueProjects = useMemo(() => {
    return Array.from(
      new Map(projects.map((proj) => [proj.id || proj.slug, proj])).values()
    );
  }, [projects]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  if (isLoading) {
    return <ProjectsSkeleton count={itemsPerPage} />;
  }

  const totalPages = Math.ceil(uniqueProjects.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = uniqueProjects.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      const section = document.getElementById("projects");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="projects"
      className="scroll-mt-15 relative overflow-hidden bg-white dark:bg-[#020617] text-[#0F172A] dark:text-[#F8FAFC] py-10 transition-colors duration-300"
    >
      {/* Background Decorative Ambient Liquid Glass Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-sky-500/15 via-blue-500/10 to-purple-500/15 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 w-full relative z-10">

        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-white/10 text-sky-600 dark:text-[#38BDF8] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 shadow-lg shadow-sky-500/10"
          >
            <Sparkles className="w-4 h-4 text-sky-500 dark:text-[#38BDF8]" />
            <span>Complete Collection</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight"
          >
            All{" "}
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Projects
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed"
          >
            Explore my full library of applications, SaaS platforms, analytics tools, and open-source tools.
          </motion.p>
        </div>

        {/* RESPONSIVE PROJECTS GRID WITH ANIMATION KEY */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 xl:gap-10 mb-12"
          >
            {currentProjects.map((project) => (
              <ProjectCard key={project.id || project.slug} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* PAGINATION CONTROLS WITH LIQUID GLASS FINISH */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 px-6 py-4 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/30 dark:border-white/10 shadow-xl shadow-slate-900/5">
            {/* Results Counter Text */}
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Showing <span className="font-semibold text-slate-900 dark:text-white">{startIndex + 1}</span> to{" "}
              <span className="font-semibold text-slate-900 dark:text-white">
                {Math.min(endIndex, uniqueProjects.length)}
              </span>{" "}
              of <span className="font-semibold text-slate-900 dark:text-white">{uniqueProjects.length}</span> projects
            </p>

            {/* Pagination Action Row */}
            <div className="flex items-center gap-2">
              {/* Previous Page Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous Page"
                className="p-2.5 rounded-xl border border-white/40 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Numbered Page Buttons */}
              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-9 h-9 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${currentPage === page
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/25"
                    : "bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-slate-700 dark:text-slate-300 border border-white/40 dark:border-white/10 hover:bg-white dark:hover:bg-slate-700"
                    }`}
                >
                  {page}
                </button>
              ))}

              {/* Next Page Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next Page"
                className="p-2.5 rounded-xl border border-white/40 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}