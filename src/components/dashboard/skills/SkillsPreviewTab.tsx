"use client";

import React from "react";
import Link from "next/link";
import { Eye } from "lucide-react";
import { SkillsData } from "@/lib/skills-types";
import Skills from "@/components/Skills";

interface SkillsPreviewTabProps {
  formData: SkillsData;
}

export function SkillsPreviewTab({ formData }: SkillsPreviewTabProps) {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs text-sky-700 dark:text-sky-300 font-medium flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-sky-500 shrink-0" />
          <span>
            <strong>Live Preview:</strong> This reflects exactly how your skills appear on your live
            portfolio with your current saved data.
          </span>
        </div>
        <Link
          href="/#skills"
          target="_blank"
          className="font-bold underline text-sky-600 dark:text-sky-400 shrink-0"
        >
          Open Live Site
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-2xl bg-white dark:bg-[#020617]">
        <Skills isPreview={true} initialSkills={formData} />
      </div>
    </div>
  );
}
