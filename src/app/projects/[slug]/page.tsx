import React from "react";
import ProjectImageGallery from "@/components/ProjectImageGallery";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  Code2,
  Rocket,
  AlertCircle,
  Sparkles,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { getProjectBySlug } from "@/lib/getProjectBySlug";
import { getProjects } from "@/lib/getProjects";
import { Metadata } from "next";
import { RenderTechIcon } from "@/components/RenderTechIcon";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} - ${project.subtitle} | Portfolio Case Study`,
    description: project.description,
  };
}

export default async function ProjectDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="relative overflow-hidden min-h-screen bg-white dark:bg-[#020617] text-[#0F172A] dark:text-[#F8FAFC] pt-28 pb-20 transition-colors duration-300">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-sky-500/10 via-blue-500/5 to-purple-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Projects Button */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Projects</span>
          </Link>
        </div>

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {project.badge && (
              <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-sky-500/10 border border-sky-500/30 text-sky-600 dark:text-sky-400">
                {project.badge}
              </span>
            )}
            {project.isFeatured && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/90 text-slate-950 border border-amber-400/50">
                <Sparkles className="w-3 h-3 text-slate-950" />
                <span>Featured Project</span>
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-2 text-slate-900 dark:text-white">
            {project.title}
          </h1>
          <p className="text-lg sm:text-xl font-medium text-sky-600 dark:text-sky-400 mb-4">
            {project.subtitle}
          </p>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {project.description}
          </p>
        </div>

        {/* Action Links Bar */}
        <div className="flex flex-wrap items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-md shadow-sky-500/20 flex items-center gap-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-bold text-sm text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 flex items-center gap-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <FaGithub className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
          )}
        </div>

        {/* Project Screenshots & Image Gallery */}
        <div className="mb-12">
          <ProjectImageGallery
            images={project.images}
            title={project.title}
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-12">
          {/* Detailed Overview */}
          <div className="bg-slate-50/70 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800/80">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2.5">
              <Code2 className="w-5 h-5 text-sky-500" />
              <span>Full Project Description</span>
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {project.longDescription}
            </p>
          </div>

          {/* Technologies Stack */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-sky-500" />
              <span>Technologies Stack</span>
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech.name}
                  className="px-4 py-2 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center gap-2 shadow-sm"
                >
                  <RenderTechIcon
                    iconKey={tech.iconKey}
                    className={`w-4 h-4 ${tech.iconColor || ""}`}
                  />
                  <span>{tech.name}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2.5">
                <Rocket className="w-5 h-5 text-sky-500" />
                <span>Key Features & Functional Highlights</span>
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 text-sm text-slate-700 dark:text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenges Faced */}
          {project.challenges && project.challenges.length > 0 && (
            <div className="bg-amber-500/5 rounded-2xl p-6 sm:p-8 border border-amber-500/20">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                <span>Technical Challenges Faced</span>
              </h2>
              <ul className="space-y-3">
                {project.challenges.map((challenge, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                    <span className="leading-relaxed">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Future Improvements */}
          {project.futureImprovements && project.futureImprovements.length > 0 && (
            <div className="bg-sky-500/5 rounded-2xl p-6 sm:p-8 border border-sky-500/20">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-sky-500" />
                <span>Future Roadmaps & Planned Improvements</span>
              </h2>
              <ul className="space-y-3">
                {project.futureImprovements.map((improvement, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 mt-2" />
                    <span className="leading-relaxed">{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
