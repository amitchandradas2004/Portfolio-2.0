"use client";

import React from "react";
import { Eye, ShieldAlert, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function ReadOnlyBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6 rounded-2xl p-4 sm:p-4.5 bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-blue-500/10 dark:from-amber-500/15 dark:via-sky-500/15 dark:to-indigo-500/15 border border-amber-500/30 dark:border-amber-500/30 backdrop-blur-xl shadow-lg shadow-amber-500/5 relative overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/15 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 shrink-0">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-black tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                Demo Visitor Mode
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 hidden md:inline">
                Read-Only Access
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
              You are logged in as a guest viewer (<code className="font-mono text-sky-600 dark:text-sky-400 font-bold">demouser</code>). All dashboard sections are fully viewable, but editing and saving changes is disabled.
            </p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 text-xs font-semibold text-slate-600 dark:text-slate-300 shrink-0">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
          <span>Edits Restricted</span>
        </div>
      </div>
    </motion.div>
  );
}
