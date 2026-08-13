"use client";

import React from "react";
import { Sparkles, Shield, Eye } from "lucide-react";
import { useUserRole } from "@/hooks/useUserRole";

export default function DashboardPage() {
  const { user, isReadOnly } = useUserRole();

  return (
    <div>
      {/* Welcome Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-sky-500/10 via-blue-500/10 to-indigo-500/10 dark:from-sky-500/15 dark:via-blue-500/15 dark:to-indigo-500/15 border border-sky-500/20 backdrop-blur-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Overview</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2 text-slate-900 dark:text-white">
              Welcome, {user?.name || "Portfolio Manager"}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl font-medium">
              Manage your portfolio content, showcase projects, and update your personal skills and career milestones.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md shrink-0 flex flex-col gap-2 min-w-[220px]">
            <div className="flex items-center justify-between gap-3 text-xs font-semibold">
              <span className="text-slate-500 dark:text-slate-400">Current Role</span>
              {isReadOnly ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[11px] font-black uppercase">
                  <Eye className="w-3 h-3" />
                  Demo
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[11px] font-black uppercase">
                  <Shield className="w-3 h-3" />
                  Admin
                </span>
              )}
            </div>
            <div className="flex items-center justify-between gap-3 text-xs font-semibold">
              <span className="text-slate-500 dark:text-slate-400">Permissions</span>
              <span className="text-slate-900 dark:text-white font-bold">
                {isReadOnly ? "Read-Only (Visitor)" : "Full Edit Control"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
