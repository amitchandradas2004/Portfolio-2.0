"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Eye, Sparkles } from "lucide-react";
import { Project } from "@/lib/projectsData";
import { RenderTechIcon } from "./RenderTechIcon";

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      key={project.id}
      variants={cardVariants}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-2xl overflow-hidden backdrop-blur-md bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 hover:border-sky-500/40 dark:hover:border-sky-400/40 shadow-lg shadow-slate-900/5 dark:shadow-black/30 hover:shadow-2xl hover:shadow-sky-500/10 dark:hover:shadow-sky-400/10 transition-all duration-300 flex flex-col justify-between"
    >
      {/* Top Section: Image & Badges */}
      <div>
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
          <Image
            key={project.id}
            src={project.images?.[0] || ""}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

          {/* Badges Container */}
          <div className="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-2 z-10">
            {/* Category / Custom Badge */}
            {project.badge && (
              <div className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/80 dark:bg-slate-950/80 text-sky-400 border border-sky-500/30 backdrop-blur-md shadow-md">
                {project.badge}
              </div>
            )}

            {/* Featured Badge (only shown if isFeatured === true) */}
            {project.isFeatured && (
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/90 text-slate-950 border border-amber-400/50 backdrop-blur-md shadow-md">
                <Sparkles className="w-3 h-3 text-slate-950" />
                <span>Featured</span>
              </div>
            )}
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6">
          <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors duration-200 mb-2">
            {project.title}
          </h3>

          <p className="text-xs font-medium text-sky-600 dark:text-sky-400 mb-3">
            {project.subtitle}
          </p>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 mb-5">
            {project.description}
          </p>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.technologies.map((tech) => (
              <span
                key={tech.name}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-200/60 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-300/60 dark:border-slate-700/60 flex items-center gap-1.5 transition-colors duration-200"
              >
                <RenderTechIcon
                  iconKey={tech.iconKey}
                  className={`w-3.5 h-3.5 ${tech.iconColor || ""}`}
                />
                <span>{tech.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer: View Details CTA */}
      <div className="px-6 pb-6 pt-0">
        <Link
          href={`/projects/${project.slug}`}
          className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-100 bg-slate-200/70 dark:bg-slate-800/70 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 dark:hover:text-white border border-slate-300/70 dark:border-slate-700/70 hover:border-sky-500 dark:hover:border-sky-500 flex items-center justify-center gap-2 transition-all duration-200 shadow-sm active:scale-[0.98] cursor-pointer"
        >
          <Eye className="w-4 h-4" />
          <span>View Details</span>
        </Link>
      </div>
    </motion.div>
  );
}
