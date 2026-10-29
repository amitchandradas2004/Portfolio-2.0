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
      className="group relative rounded-3xl overflow-hidden backdrop-blur-3xl bg-gradient-to-br from-white/40 via-white/10 to-white/5 dark:from-slate-900/70 dark:via-slate-900/20 dark:to-slate-950/60 border border-white/30 dark:border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] hover:border-sky-400/70 dark:hover:border-sky-400/50 hover:shadow-sky-500/20 transition-all duration-500 flex flex-col justify-between"
    >
      {/* Specular Liquid Light Sweep on Hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-sky-400/15 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10" />

      {/* Top Section: Image & Badges */}
      <div>
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-900/80 m-2.5 rounded-2xl border border-white/20 dark:border-white/5 shadow-inner">
          <Image
            key={project.id}
            src={project.images?.[0] || ""}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />

          {/* Badges Container */}
          <div className="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-2 z-10">
            {project.badge && (
              <div className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/75 text-sky-400 border border-sky-500/30 backdrop-blur-xl shadow-lg">
                {project.badge}
              </div>
            )}

            {project.isFeatured && (
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/90 text-slate-950 border border-amber-400/50 backdrop-blur-xl shadow-lg">
                <Sparkles className="w-3 h-3 text-slate-950" />
                <span>Featured</span>
              </div>
            )}
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 pt-3">
          <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors duration-200 mb-1.5">
            {project.title}
          </h3>

          <p className="text-xs font-semibold text-sky-600 dark:text-sky-400 mb-3 tracking-wide">
            {project.subtitle}
          </p>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 mb-5 font-normal">
            {project.description}
          </p>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.technologies.map((tech) => (
              <span
                key={tech.name}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white/40 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 border border-white/30 dark:border-white/10 backdrop-blur-md shadow-xs flex items-center gap-1.5 transition-colors duration-200"
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

      {/* Card Footer: Fully Rounded Spinning Gradient Button CTA */}
      <div className="px-5 pb-6 pt-0">
        <Link
          href={`/projects/${project.slug}`}
          className="group/btn relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-hidden focus:ring-2 focus:ring-sky-500/50 dark:focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full shadow-lg shadow-sky-500/15 hover:shadow-xl hover:shadow-sky-500/30"
        >
          {/* Animated Spinning Border */}
          <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#38bdf8_0%,#2563eb_50%,#38bdf8_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

          {/* Inner Button Body */}
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white/90 dark:bg-[#070e41]/90 hover:bg-white dark:hover:bg-[#0c155c] px-6 py-1 text-sm font-semibold text-slate-800 dark:text-white backdrop-blur-3xl gap-2 transition-colors duration-200">
            <Eye className="w-4 h-4 text-sky-600 dark:text-sky-400 transition-transform duration-300 group-hover/btn:scale-110" />
            <span>View Details</span>
          </span>
        </Link>
      </div>
    </motion.div>
  );
}