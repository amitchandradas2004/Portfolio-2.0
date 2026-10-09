"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  Sparkles,
  Shield,
  Eye,
  FolderGit2,
  Cpu,
  Briefcase,
  GitBranch,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  ExternalLink,
  Activity,
  Layers,
  Wrench,
  GraduationCap,
  Mail,
  FileText,
} from "lucide-react";
import { useUserRole } from "@/hooks/useUserRole";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const quickShortcuts = [
  {
    title: "Hero Section",
    description: "Update headline, bio summary & CTA links",
    href: "/dashboard/hero",
    icon: Sparkles,
    color: "from-amber-500/15 to-amber-500/5 text-amber-500 border-amber-500/20",
  },
  {
    title: "Technical Skills",
    description: "Organize tech stacks, frameworks & categories",
    href: "/dashboard/skills",
    icon: Cpu,
    color: "from-purple-500/15 to-indigo-500/5 text-purple-500 border-purple-500/20",
  },
  {
    title: "Experiences",
    description: "Milestones, work history & job titles",
    href: "/dashboard/experiences",
    icon: Briefcase,
    color: "from-emerald-500/15 to-teal-500/5 text-emerald-500 border-emerald-500/20",
  },
  {
    title: "Featured Projects",
    description: "Manage portfolio project cards & live links",
    href: "/dashboard/projects",
    icon: FolderGit2,
    color: "from-sky-500/15 to-blue-500/5 text-sky-500 border-sky-500/20",
  },
  {
    title: "Education",
    description: "Academic degrees, courses & certifications",
    href: "/dashboard/education",
    icon: GraduationCap,
    color: "from-blue-500/15 to-cyan-500/5 text-blue-500 border-blue-500/20",
  },
];

export default function DashboardPage() {
  const { user, isReadOnly } = useUserRole();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Banner */}
      <motion.div
        variants={itemVariants}
        className="rounded-xl p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-sky-500/15 via-blue-500/10 to-indigo-500/15 border border-sky-500/25 backdrop-blur-xl relative overflow-hidden shadow-xl shadow-sky-500/5 space-y-5 sm:space-y-6"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Admin Dashboard Overview</span>
            </div>
            <h1 className="text-xl xs:text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Welcome back, {user?.name || "Portfolio Manager"}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              Full control center to manage your portfolio content, showcase projects, and keep your tech skills and experience updated.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md shrink-0 flex flex-col gap-3 min-w-[240px] w-full sm:w-auto shadow-lg">
            <div className="flex items-center justify-between gap-3 text-xs font-semibold">
              <span className="text-slate-500 dark:text-slate-400">Current Session</span>
              {isReadOnly ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[11px] font-black uppercase">
                  <Eye className="w-3 h-3" />
                  Demo Mode
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[11px] font-black uppercase">
                  <Shield className="w-3 h-3" />
                  Administrator
                </span>
              )}
            </div>

            <div className="h-px bg-slate-200/80 dark:bg-slate-800/80" />

            <div className="flex items-center justify-between gap-3 text-xs font-semibold">
              <span className="text-slate-500 dark:text-slate-400">Access Privileges</span>
              <span className="text-slate-900 dark:text-white font-extrabold">
                {isReadOnly ? "Read-Only Visitor" : "Full Write Access"}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Section Shortcuts Grid */}
      <motion.div variants={itemVariants} className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-sky-500" />
            <span>Section Managers</span>
          </h2>
          <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold">
            Click to manage section
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickShortcuts.map((shortcut) => {
            const Icon = shortcut.icon;
            return (
              <motion.div
                key={shortcut.href}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={shortcut.href}
                  className="group block p-5 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 hover:border-sky-500/40 dark:hover:border-sky-500/40 backdrop-blur-xl shadow-lg shadow-slate-900/5 dark:shadow-black/20 transition-all h-full"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-br border ${shortcut.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                    {shortcut.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                    {shortcut.description}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
