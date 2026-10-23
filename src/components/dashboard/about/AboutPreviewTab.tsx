"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, ExternalLink } from "lucide-react";
import { AboutData } from "@/lib/about-types";
import About from "@/components/About";

interface AboutPreviewTabProps {
  formData: AboutData;
}

export function AboutPreviewTab({ formData }: AboutPreviewTabProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-semibold text-sky-700 dark:text-sky-300">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-sky-500 shrink-0" />
          <span>
            This preview renders the actual live component in real time with your current form data.
          </span>
        </div>
        <Link
          href="/#about"
          target="_blank"
          className="px-3 py-1.5 rounded-lg bg-sky-500 text-white font-bold hover:bg-sky-600 transition-all flex items-center gap-1 shrink-0"
        >
          <span>Open in Home View</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl bg-white dark:bg-[#020617]">
        <About aboutData={formData} />
      </div>
    </motion.div>
  );
}
