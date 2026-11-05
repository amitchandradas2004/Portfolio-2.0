"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { Eye, Sparkles, Loader2 } from "lucide-react";
import { Project } from "@/lib/projectsData";
import { RenderTechIcon } from "./RenderTechIcon";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";

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
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isNavigating) return;

    setIsNavigating(true);

    setTimeout(() => {
      router.push(`/projects/${project.slug}`);
    }, 600);
  };

  return (
    <motion.div
      key={project.id}
      variants={cardVariants}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex flex-col"
    >
      <LiquidGlassCard
        borderRadius="12px"
        blurIntensity="xl"
        glowIntensity="lg"
        shadowIntensity="lg"
        className="group relative w-full h-full overflow-hidden flex flex-col justify-between transition-all duration-500 !border-slate-300/40 dark:!border-slate-800/60 shadow-xl hover:shadow-2xl hover:shadow-sky-500/20"
      >
        {/* Specular Liquid Light Sweep on Hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-sky-400/15 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10" />

        {/* Top & Body Section */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {/* Center-Aligned Image Container */}
            <div className="px-3 pt-3">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-900/80 rounded-xl border border-slate-300/40 dark:border-slate-800/60 shadow-md">
                <Image
                  key={project.id}
                  src={project.images?.[0] || ""}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top rounded-xl group-hover:scale-105 transition-transform duration-700 ease-out select-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none rounded-xl" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2 z-10">
                  {project.badge && (
                    <div className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/75 text-sky-400 border border-sky-500/30 backdrop-blur-xl shadow-lg">
                      {project.badge}
                    </div>
                  )}

                  {project.isFeatured && (
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/90 text-slate-950 border border-amber-400/50 backdrop-blur-xl shadow-lg">
                      <Sparkles className="w-3 h-3 text-slate-950 shrink-0" />
                      <span>Featured</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 pt-4">
              <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors duration-200 mb-1.5">
                {project.title}
              </h3>

              <p className="text-xs font-semibold text-sky-600 dark:text-sky-400 mb-3 tracking-wide">
                {project.subtitle}
              </p>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 mb-5 font-normal">
                {project.description}
              </p>
            </div>
          </div>

          {/* Technology Badges */}
          <div className="px-6 pb-4">
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech.name}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white/40 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 border border-slate-300/40 dark:border-white/10 backdrop-blur-md shadow-xs flex items-center gap-1.5 transition-colors duration-200"
                >
                  <RenderTechIcon
                    iconKey={tech.iconKey}
                    className={`w-3.5 h-3.5 shrink-0 ${tech.iconColor || ""}`}
                  />
                  <span>{tech.name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Card Footer: Secondary Glass Pill Button with Loading State */}
        <div className="px-5 pb-6 pt-0 mt-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleViewDetails}
            disabled={isNavigating}
            aria-label={`View details for ${project.title}`}
            className="group/btn relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-slate-900 dark:text-white bg-slate-200/80 hover:bg-slate-300/90 dark:bg-slate-800/90 dark:hover:bg-slate-700/90 border border-slate-300/70 dark:border-slate-600/80 shadow-md backdrop-blur-xl transition-all duration-300 cursor-pointer overflow-hidden w-full disabled:opacity-80 disabled:cursor-wait"
          >
            <span className="pointer-events-none absolute inset-x-4 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-slate-400/40 dark:via-white/30 to-transparent" />

            {isNavigating ? (
              <>
                <Loader2 className="w-4 h-4 text-sky-600 dark:text-sky-400 animate-spin shrink-0" />
                <span>Viewing Details...</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 group-hover/btn:scale-110 transition-transform duration-200" />
                <span>View Details</span>
              </>
            )}
          </motion.button>
        </div>
      </LiquidGlassCard>
    </motion.div>
  );
}