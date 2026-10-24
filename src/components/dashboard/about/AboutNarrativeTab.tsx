"use client";

import React from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { AboutData } from "@/lib/about-types";
import { FieldHeaderCompare } from "./FieldHeaderCompare";

interface AboutNarrativeTabProps {
  formData: AboutData;
  lastSavedData: AboutData;
  isInputDisabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function AboutNarrativeTab({
  formData,
  lastSavedData,
  isInputDisabled,
  onChange,
}: AboutNarrativeTabProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-6 lg:p-8 rounded-xl bg-white/70 dark:bg-slate-950/85 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl space-y-6"
    >
      <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
        <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-500 border border-sky-500/20">
          <User className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
            Section Headings & Bio Narrative
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Configure the primary section badge, headline, and multi-paragraph story that introduces you.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Badge Text */}
        <div className="space-y-2">
          <FieldHeaderCompare
            label="Badge Pill Text"
            savedValue={lastSavedData.badgeText}
            currentValue={formData.badgeText}
          />
          <input
            type="text"
            name="badgeText"
            value={formData.badgeText}
            onChange={onChange}
            placeholder="e.g. About Me"
            disabled={isInputDisabled}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all disabled:opacity-60"
          />
          <p className="text-[11px] text-slate-400">
            Small uppercase badge displayed with user icon at the top of the section.
          </p>
        </div>

        {/* Title Prefix */}
        <div className="space-y-2">
          <FieldHeaderCompare
            label="Main Heading Prefix"
            savedValue={lastSavedData.title}
            currentValue={formData.title}
          />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={onChange}
            placeholder="e.g. Crafting Digital Solutions with"
            disabled={isInputDisabled}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all disabled:opacity-60"
          />
          <p className="text-[11px] text-slate-400">
            The initial solid text before the gradient highlight phrase.
          </p>
        </div>

        {/* Highlighted Title */}
        <div className="space-y-2 md:col-span-2">
          <FieldHeaderCompare
            label="Gradient Highlighted Phrase"
            savedValue={lastSavedData.highlightedTitle}
            currentValue={formData.highlightedTitle}
          />
          <div className="relative">
            <input
              type="text"
              name="highlightedTitle"
              value={formData.highlightedTitle}
              onChange={onChange}
              placeholder="e.g. Passion & Precision"
              disabled={isInputDisabled}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all disabled:opacity-60"
            />
          </div>
          <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
            <span>Live Gradient Preview:</span>
            <span className="font-extrabold bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500 bg-clip-text text-transparent text-sm">
              {formData.highlightedTitle || "Sample Gradient Text"}
            </span>
          </div>
        </div>

        {/* Paragraph 1 */}
        <div className="space-y-2 md:col-span-2">
          <FieldHeaderCompare
            label="Paragraph 1: Professional Introduction & Core Tech"
            savedValue={lastSavedData.paragraph1}
            currentValue={formData.paragraph1}
            extraRight={
              <span className="text-xs font-mono font-medium text-slate-400">
                {formData.paragraph1?.length || 0} characters
              </span>
            }
          />
          <textarea
            name="paragraph1"
            rows={4}
            value={formData.paragraph1}
            onChange={onChange}
            placeholder="Hello! I'm Amit Chandra Das, a full-stack developer passionate about..."
            disabled={isInputDisabled}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-sm font-normal text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all disabled:opacity-60 leading-relaxed"
          />
          <p className="text-[11px] text-slate-400">
            Introduce yourself, your primary job identity, and main tech stack.
          </p>
        </div>

        {/* Paragraph 2 */}
        <div className="space-y-2 md:col-span-2">
          <FieldHeaderCompare
            label="Paragraph 2: Developer Journey & Hands-on Experience"
            savedValue={lastSavedData.paragraph2}
            currentValue={formData.paragraph2}
            extraRight={
              <span className="text-xs font-mono font-medium text-slate-400">
                {formData.paragraph2?.length || 0} characters
              </span>
            }
          />
          <textarea
            name="paragraph2"
            rows={4}
            value={formData.paragraph2}
            onChange={onChange}
            placeholder="My journey into web development began with curiosity about..."
            disabled={isInputDisabled}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-sm font-normal text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all disabled:opacity-60 leading-relaxed"
          />
          <p className="text-[11px] text-slate-400">
            Describe how you started coding, real-world systems built, and backend/frontend capabilities.
          </p>
        </div>

        {/* Paragraph 3 */}
        <div className="space-y-2 md:col-span-2">
          <FieldHeaderCompare
            label="Paragraph 3: Mindset, Values & Continuous Growth"
            savedValue={lastSavedData.paragraph3}
            currentValue={formData.paragraph3}
            extraRight={
              <span className="text-xs font-mono font-medium text-slate-400">
                {formData.paragraph3?.length || 0} characters
              </span>
            }
          />
          <textarea
            name="paragraph3"
            rows={4}
            value={formData.paragraph3}
            onChange={onChange}
            placeholder="Beyond coding, I enjoy exploring modern web technologies..."
            disabled={isInputDisabled}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-sm font-normal text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all disabled:opacity-60 leading-relaxed"
          />
          <p className="text-[11px] text-slate-400">
            Highlight what you care about: clean code, collaboration, user experience, and growth.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
