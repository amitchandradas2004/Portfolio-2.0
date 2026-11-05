"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Code2,
  Rocket,
  AlertCircle,
  Sparkles,
  Layers,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { Project } from "@/lib/projectsData";
import { RenderTechIcon } from "@/components/RenderTechIcon";
import ProjectImageGallery from "@/components/ProjectImageGallery";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";

interface ProjectDetailsClientProps {
  project: Project;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function ProjectDetailsClient({ project }: ProjectDetailsClientProps) {
  return (
    <main className="relative overflow-hidden min-h-screen bg-slate-100 dark:bg-[#020617] text-slate-900 dark:text-slate-100 pt-28 pb-20 transition-colors duration-300 w-full">
      {/* Ambient background lighting blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[850px] h-[550px] bg-sky-400/25 dark:bg-cyan-500/20 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-purple-500/20 dark:bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf818_1px,transparent_1px),linear-gradient(to_bottom,#38bdf818_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10 w-full"
      >
        {/* Back to Projects Glass Pill Button */}
        <motion.div variants={itemVariants} className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/40 dark:bg-slate-900/40 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 border border-slate-300/40 dark:border-slate-800/60 backdrop-blur-xl shadow-xs transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200 text-sky-500" />
            <span>Back to Projects</span>
          </Link>
        </motion.div>

        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {project.badge && (
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="px-3.5 py-1 rounded-full text-xs font-semibold bg-sky-500/10 border border-sky-500/30 text-sky-600 dark:text-sky-400 backdrop-blur-xl shadow-xs"
              >
                {project.badge}
              </motion.span>
            )}
            {project.isFeatured && (
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/90 text-slate-950 border border-amber-400/50 backdrop-blur-xl shadow-xs"
              >
                <Sparkles className="w-3 h-3 text-slate-950 shrink-0" />
                <span>Featured Project</span>
              </motion.span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-2 text-slate-900 dark:text-white leading-tight">
            {project.title}
          </h1>
          <p className="text-lg sm:text-xl font-semibold text-sky-600 dark:text-sky-400 mb-4 tracking-wide">
            {project.subtitle}
          </p>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl font-normal">
            {project.description}
          </p>
        </motion.div>

        {/* Action Links Bar */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-4 mb-10 pb-6 border-b border-slate-300/40 dark:border-slate-800/60"
        >
          {project.liveUrl && (
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white bg-gradient-to-r from-sky-500 via-sky-400 to-sky-600 hover:from-sky-400 hover:to-sky-500 shadow-lg shadow-sky-500/25 border border-sky-300/30 backdrop-blur-xl transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <span className="pointer-events-none absolute inset-x-4 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent" />
              <ExternalLink className="w-4 h-4 text-white shrink-0" />
              <span>Live Demo</span>
            </motion.a>
          )}

          {project.githubUrl && (
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full font-semibold text-sm text-slate-800 dark:text-slate-200 bg-white/40 dark:bg-slate-900/40 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 border border-slate-300/40 dark:border-slate-800/60 backdrop-blur-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <FaGithub className="w-4 h-4 text-slate-800 dark:text-slate-200 shrink-0" />
              <span>{project.serverGithubUrl ? "Client Repository" : "GitHub Repository"}</span>
            </motion.a>
          )}

          {project.serverGithubUrl && (
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={project.serverGithubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full font-semibold text-sm text-slate-800 dark:text-slate-200 bg-white/40 dark:bg-slate-900/40 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 border border-slate-300/40 dark:border-slate-800/60 backdrop-blur-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <FaGithub className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Server Repository</span>
            </motion.a>
          )}

          {project.individualDocsUrl && (
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={project.individualDocsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full font-semibold text-sm text-sky-600 dark:text-sky-400 bg-sky-500/10 border border-sky-500/30 backdrop-blur-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-sky-500 shrink-0" />
              <span>Individual Documentation</span>
            </motion.a>
          )}
        </motion.div>

        {/* Project Screenshots & Image Gallery */}
        <motion.div variants={itemVariants} className="mb-12">
          <ProjectImageGallery
            images={project.images}
            title={project.title}
          />
        </motion.div>

        {/* Content Grid */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 gap-8 sm:gap-10">
          {/* Detailed Overview Card */}
          <motion.div variants={itemVariants}>
            <LiquidGlassCard
              borderRadius="12px"
              blurIntensity="xl"
              glowIntensity="lg"
              shadowIntensity="lg"
              className="w-full relative overflow-hidden !border-slate-300/40 dark:!border-slate-800/60 p-6 sm:p-8"
            >
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2.5">
                <Code2 className="w-5 h-5 text-sky-500 shrink-0" />
                <span>Full Project Description</span>
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line font-normal">
                {project.longDescription}
              </p>
            </LiquidGlassCard>
          </motion.div>

          {/* Technologies Stack */}
          <motion.div variants={itemVariants}>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-sky-500 shrink-0" />
              <span>Technologies Stack</span>
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {project.technologies.map((tech) => (
                <motion.span
                  key={tech.name}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-white/40 dark:bg-slate-900/40 text-slate-800 dark:text-slate-200 border border-slate-300/40 dark:border-slate-800/60 backdrop-blur-md flex items-center gap-2 shadow-xs transition-colors duration-200"
                >
                  <RenderTechIcon
                    iconKey={tech.iconKey}
                    className={`w-4 h-4 shrink-0 ${tech.iconColor || ""}`}
                  />
                  <span>{tech.name}</span>
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <motion.div variants={itemVariants}>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2.5">
                <Rocket className="w-5 h-5 text-sky-500 shrink-0" />
                <span>Key Features & Functional Highlights</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {project.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.015, x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/40 dark:bg-slate-900/40 border border-slate-300/40 dark:border-slate-800/60 backdrop-blur-md text-sm text-slate-700 dark:text-slate-300 shadow-xs transition-colors duration-200"
                  >
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-snug">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Technical Challenges Faced Card */}
          {project.challenges && project.challenges.length > 0 && (
            <motion.div variants={itemVariants}>
              <LiquidGlassCard
                borderRadius="12px"
                blurIntensity="xl"
                glowIntensity="lg"
                shadowIntensity="lg"
                className="w-full relative overflow-hidden !border-amber-500/30 dark:!border-amber-500/20 p-6 sm:p-8"
              >
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2.5">
                  <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>Technical Challenges Faced</span>
                </h2>
                <ul className="space-y-3">
                  {project.challenges.map((challenge, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-2" />
                      <span className="leading-relaxed">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </LiquidGlassCard>
            </motion.div>
          )}

          {/* Future Roadmaps Card */}
          {project.futureImprovements && project.futureImprovements.length > 0 && (
            <motion.div variants={itemVariants}>
              <LiquidGlassCard
                borderRadius="12px"
                blurIntensity="xl"
                glowIntensity="lg"
                shadowIntensity="lg"
                className="w-full relative overflow-hidden !border-sky-500/30 dark:!border-sky-500/20 p-6 sm:p-8"
              >
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-sky-500 shrink-0" />
                  <span>Future Roadmaps & Planned Improvements</span>
                </h2>
                <ul className="space-y-3">
                  {project.futureImprovements.map((improvement, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0 mt-2" />
                      <span className="leading-relaxed">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </LiquidGlassCard>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </main>
  );
}