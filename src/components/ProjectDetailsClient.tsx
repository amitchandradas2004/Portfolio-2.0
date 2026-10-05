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
    <main className="relative overflow-hidden min-h-screen bg-white dark:bg-[#020617] text-[#0F172A] dark:text-[#F8FAFC] pt-28 pb-20 transition-colors duration-300">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-sky-500/10 via-blue-500/5 to-purple-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10"
      >
        {/* Back to Projects Button */}
        <motion.div variants={itemVariants} className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer group shadow-sm hover:scale-[1.02] active:scale-[0.98]"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back to Projects</span>
          </Link>
        </motion.div>

        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {project.badge && (
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="px-3.5 py-1 rounded-full text-xs font-semibold bg-sky-500/10 border border-sky-500/30 text-sky-600 dark:text-sky-400 backdrop-blur-md shadow-xs"
              >
                {project.badge}
              </motion.span>
            )}
            {project.isFeatured && (
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/90 text-slate-950 border border-amber-400/50 backdrop-blur-md shadow-xs"
              >
                <Sparkles className="w-3 h-3 text-slate-950" />
                <span>Featured Project</span>
              </motion.span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-2 text-slate-900 dark:text-white leading-tight">
            {project.title}
          </h1>
          <p className="text-lg sm:text-xl font-medium text-sky-600 dark:text-sky-400 mb-4">
            {project.subtitle}
          </p>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl font-normal">
            {project.description}
          </p>
        </motion.div>

        {/* Action Links Bar */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800"
        >
          {project.liveUrl && (
            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 shadow-md shadow-sky-500/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </motion.a>
          )}

          {project.githubUrl && (
            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-bold text-sm text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <FaGithub className="w-4 h-4 text-slate-800 dark:text-slate-200" />
              <span>{project.serverGithubUrl ? "Client Repository" : "GitHub Repository"}</span>
            </motion.a>
          )}

          {project.serverGithubUrl && (
            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href={project.serverGithubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-bold text-sm text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <FaGithub className="w-4 h-4 text-emerald-500" />
              <span>Server Repository</span>
            </motion.a>
          )}

          {project.individualDocsUrl && (
            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href={project.individualDocsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-bold text-sm text-sky-700 dark:text-sky-300 bg-sky-500/10 dark:bg-sky-500/20 hover:bg-sky-500/20 dark:hover:bg-sky-500/30 border border-sky-500/30 shadow-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-sky-500" />
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
        <motion.div variants={containerVariants} className="grid grid-cols-1 gap-10">
          {/* Detailed Overview */}
          <motion.div
            variants={itemVariants}
            className="bg-slate-50/70 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-lg shadow-slate-900/5 dark:shadow-black/20"
          >
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2.5">
              <Code2 className="w-5 h-5 text-sky-500" />
              <span>Full Project Description</span>
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line font-normal">
              {project.longDescription}
            </p>
          </motion.div>

          {/* Technologies Stack */}
          <motion.div variants={itemVariants}>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-sky-500" />
              <span>Technologies Stack</span>
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {project.technologies.map((tech) => (
                <motion.span
                  key={tech.name}
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 flex items-center gap-2 shadow-2xs transition-colors duration-200"
                >
                  <RenderTechIcon
                    iconKey={tech.iconKey}
                    className={`w-4 h-4 ${tech.iconColor || ""}`}
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
                <Rocket className="w-5 h-5 text-sky-500" />
                <span>Key Features & Functional Highlights</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {project.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.015, x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 text-sm text-slate-700 dark:text-slate-300 shadow-2xs transition-colors duration-200"
                  >
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-snug">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Technical Challenges Faced */}
          {project.challenges && project.challenges.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="bg-amber-500/5 dark:bg-amber-500/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-amber-500/20 shadow-lg shadow-amber-500/5"
            >
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-500" />
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
            </motion.div>
          )}

          {/* Future Roadmaps & Planned Improvements */}
          {project.futureImprovements && project.futureImprovements.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="bg-sky-500/5 dark:bg-sky-500/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-sky-500/20 shadow-lg shadow-sky-500/5"
            >
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-sky-500" />
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
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </main>
  );
}
