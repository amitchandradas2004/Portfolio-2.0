"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Calendar, RefreshCw } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { AboutData, AboutStat, StatType } from "@/lib/about-types";
import { FieldHeaderCompare } from "./FieldHeaderCompare";
import { renderStatIcon, STAT_ICON_OPTIONS } from "@/lib/about-icons";
import { NiceSelect, NiceSelectOption } from "@/components/dashboard/NiceSelect";

interface AboutOverviewCardTabProps {
  formData: AboutData;
  lastSavedData: AboutData;
  isInputDisabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStatChange: (index: number, field: keyof AboutStat, value: any) => void;
}

export function AboutOverviewCardTab({
  formData,
  lastSavedData,
  isInputDisabled,
  onChange,
  onStatChange,
}: AboutOverviewCardTabProps) {
  // Options for Stat Icon using NiceSelect
  const statIconOptions: NiceSelectOption[] = STAT_ICON_OPTIONS.map((opt) => ({
    value: opt.key,
    label: opt.label,
    icon: (
      <div className="p-1 rounded-md bg-slate-100 dark:bg-slate-700/80 text-sky-500">
        {renderStatIcon(opt.key, "w-3.5 h-3.5")}
      </div>
    ),
  }));

  // Stat type mode options
  const statTypeOptions: NiceSelectOption[] = [
    {
      value: "manual",
      label: "Manual Value",
      badge: "Static",
      badgeColor: "bg-slate-500/20 text-slate-600 dark:text-slate-400",
    },
    {
      value: "experience",
      label: "Auto Experience",
      badge: "Live",
      badgeColor: "bg-sky-500/20 text-sky-600 dark:text-sky-400",
    },
    {
      value: "projects",
      label: "Auto Project Count",
      badge: "DB",
      badgeColor: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
    },
    {
      value: "github-commits",
      label: "Live GitHub Commits",
      badge: "API",
      badgeColor: "bg-purple-500/20 text-purple-600 dark:text-purple-400",
    },
  ];

  // Options for Gradient Accent using NiceSelect
  const gradientOptions: NiceSelectOption[] = [
    {
      value: "from-sky-500 to-blue-600",
      label: "Sky to Blue",
      badge: "Sky",
      badgeColor: "bg-sky-500/20 text-sky-600 dark:text-sky-400",
    },
    {
      value: "from-blue-500 to-purple-600",
      label: "Blue to Purple",
      badge: "Indigo",
      badgeColor: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
    },
    {
      value: "from-purple-500 to-pink-600",
      label: "Purple to Pink",
      badge: "Purple",
      badgeColor: "bg-purple-500/20 text-purple-600 dark:text-purple-400",
    },
    {
      value: "from-emerald-500 to-teal-600",
      label: "Emerald to Teal",
      badge: "Green",
      badgeColor: "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400",
    },
    {
      value: "from-amber-500 to-orange-600",
      label: "Amber to Orange",
      badge: "Amber",
      badgeColor: "bg-amber-500/20 text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-6 lg:p-8 rounded-xl bg-white/70 dark:bg-slate-950/85 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl space-y-6"
    >
      <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          <Zap className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
            Developer Overview Card & 4 Metrics
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Customise the right-hand Liquid Glass card heading, status badge, GitHub username, and key metrics.
          </p>
        </div>
      </div>

      {/* Card Role & Availability Status */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Card Header & Status Badge
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <FieldHeaderCompare
              label="Role Designation"
              savedValue={lastSavedData.cardRole}
              currentValue={formData.cardRole}
            />
            <input
              type="text"
              name="cardRole"
              value={formData.cardRole}
              onChange={onChange}
              placeholder="e.g. Full Stack Developer"
              disabled={isInputDisabled}
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all disabled:opacity-60"
            />
          </div>

          <div className="space-y-1.5">
            <FieldHeaderCompare
              label="Status Badge Text"
              savedValue={lastSavedData.cardStatus}
              currentValue={formData.cardStatus}
            />
            <input
              type="text"
              name="cardStatus"
              value={formData.cardStatus}
              onChange={onChange}
              placeholder="e.g. Open to Work"
              disabled={isInputDisabled}
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all disabled:opacity-60"
            />
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1.5">
              Pulsing Green Indicator
            </span>
            <label className="inline-flex items-center gap-3 cursor-pointer pt-1">
              <input
                type="checkbox"
                name="cardStatusActive"
                checked={formData.cardStatusActive !== false}
                onChange={onChange}
                disabled={isInputDisabled}
                className="sr-only peer"
              />
              <div className="relative w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:after:border-slate-600 peer-checked:bg-emerald-500" />
              <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200">
                {formData.cardStatusActive !== false ? "Active Pulse Dot" : "Static Badge"}
              </span>
            </label>
          </div>
        </div>

        {/* GitHub Username */}
        <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800/80">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <FieldHeaderCompare
                label="GitHub Username (Powers Live Commit Count API)"
                savedValue={lastSavedData.githubUsername}
                currentValue={formData.githubUsername}
              />
              <div className="relative">
                <input
                  type="text"
                  name="githubUsername"
                  value={formData.githubUsername || ""}
                  onChange={onChange}
                  placeholder="e.g. amitchandradas2004"
                  disabled={isInputDisabled}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all disabled:opacity-60"
                />
                <FaGithub className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
              <p className="text-[11px] text-slate-400">
                Used to query the GitHub Commits Search API for real-time live commit badges.
              </p>
            </div>

            {/* Auto-count projects toggle */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1.5">
                Auto-Count Projects from DB
              </span>
              <label className="inline-flex items-center gap-3 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  name="autoCountProjects"
                  checked={formData.autoCountProjects !== false}
                  onChange={onChange}
                  disabled={isInputDisabled}
                  className="sr-only peer"
                />
                <div className="relative w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:after:border-slate-600 peer-checked:bg-blue-500" />
                <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200">
                  {formData.autoCountProjects !== false ? "Live DB Count" : "Use Static Value"}
                </span>
              </label>
              <p className="text-[11px] text-slate-400">
                When enabled, the Projects stat auto-fetches the count from your MongoDB projects collection.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Stat Boxes Editor */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            The 4 Metric Statistic Cards
          </h3>
          <span className="text-xs text-slate-400">Fixed 4-Grid Grid Layout</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {formData.stats.map((stat, idx) => {
            const effectiveType: StatType = stat.statType ??
              (stat.useLiveGithubCommits ? "github-commits" : "manual");
            const isAuto = effectiveType !== "manual";

            return (
              <div
                key={stat.id || idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-3"
              >
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-500 uppercase tracking-wider">
                    Slot #{idx + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    {isAuto && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        <RefreshCw className="w-2.5 h-2.5" />
                        Auto
                      </span>
                    )}
                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {renderStatIcon(stat.iconKey, "w-4 h-4")}
                    </div>
                  </div>
                </div>

                {/* Stat Type selector — controls how value is computed */}
                <NiceSelect
                  label="Data Source Mode"
                  value={effectiveType}
                  onChange={(val) => onStatChange(idx, "statType", val as StatType)}
                  options={statTypeOptions}
                  disabled={isInputDisabled}
                  buttonClassName="py-2 text-xs"
                />

                {/* Experience date picker — only visible in experience mode */}
                {effectiveType === "experience" && (
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase flex items-center gap-1.5 mb-1">
                      <Calendar className="w-3 h-3" />
                      Experience Start Date
                    </label>
                    <input
                      type="date"
                      value={stat.experienceStartDate || ""}
                      onChange={(e) => onStatChange(idx, "experienceStartDate", e.target.value)}
                      disabled={isInputDisabled}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all disabled:opacity-60"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      Months since this date are calculated and displayed live automatically.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase">
                      Label
                    </label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => onStatChange(idx, "label", e.target.value)}
                      disabled={isInputDisabled}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className={`text-[11px] font-bold uppercase ${
                      isAuto ? "text-slate-400 dark:text-slate-600" : "text-slate-600 dark:text-slate-400"
                    }`}>
                      Value {isAuto && <span className="normal-case font-normal">(auto)</span>}
                    </label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => onStatChange(idx, "value", e.target.value)}
                      disabled={isInputDisabled || isAuto}
                      placeholder={isAuto ? "Calculated automatically" : "e.g. 10+"}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase">
                      Sub-Title
                    </label>
                    <input
                      type="text"
                      value={stat.sub}
                      onChange={(e) => onStatChange(idx, "sub", e.target.value)}
                      disabled={isInputDisabled}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs font-normal text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <NiceSelect
                      label="Icon"
                      value={stat.iconKey}
                      onChange={(val) => onStatChange(idx, "iconKey", val)}
                      options={statIconOptions}
                      disabled={isInputDisabled}
                      buttonClassName="py-2 text-xs"
                    />
                  </div>
                </div>

                {/* Gradient preset using NiceSelect */}
                <div>
                  <NiceSelect
                    label="Gradient Accent Preset"
                    value={stat.color}
                    onChange={(val) => onStatChange(idx, "color", val)}
                    options={gradientOptions}
                    disabled={isInputDisabled}
                    buttonClassName="py-2 text-xs"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
