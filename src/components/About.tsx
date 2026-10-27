"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { User, Sparkles } from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { AboutData, defaultAboutData } from "@/lib/about-types";
import {
  renderTraitIcon,
  renderStatIcon,
  renderLearningIcon,
  renderAboutTechIcon,
} from "@/lib/about-icons";

interface AboutProps {
  aboutData?: AboutData;
}

const rightCardVariants: Variants = {
  hidden: (isDesktop?: boolean) => ({
    opacity: 0,
    x: isDesktop ? 40 : 0,
    y: isDesktop ? 0 : -40,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.7, delay: 0.2 },
  },
};

export default function About({ aboutData: propAboutData }: AboutProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [data, setData] = useState<AboutData>(propAboutData || defaultAboutData);
  const [liveCommitCount, setLiveCommitCount] = useState<string>("1300+");
  const [liveProjectCount, setLiveProjectCount] = useState<string | null>(null);

  // Calculates experience value live from a start date string
  function calcExperienceValue(startDate?: string): string {
    if (!startDate) return "—";
    const start = new Date(startDate);
    if (isNaN(start.getTime())) return "—";
    const now = new Date();
    const months =
      (now.getFullYear() - start.getFullYear()) * 12 +
      (now.getMonth() - start.getMonth());
    return `${Math.max(0, months)}+`;
  }

  // Keep state updated if server-passed prop changes
  useEffect(() => {
    if (propAboutData) {
      setData(propAboutData);
    }
  }, [propAboutData]);

  // Support instant updates from admin panel across tabs and windows
  useEffect(() => {
    // 1. Same-window custom event
    const handleUpdate = (e: CustomEvent<AboutData>) => {
      if (e.detail) {
        setData(e.detail);
      }
    };
    window.addEventListener("portfolio-about-updated" as any, handleUpdate);

    // 2. Cross-tab BroadcastChannel
    let channel: BroadcastChannel | null = null;
    try {
      if (typeof window !== "undefined" && "BroadcastChannel" in window) {
        channel = new BroadcastChannel("portfolio-sync");
        channel.onmessage = (event) => {
          if (event.data?.type === "ABOUT_UPDATED" && event.data?.data) {
            setData(event.data.data);
          }
        };
      }
    } catch (e) {}

    // 3. Cross-tab localStorage event fallback
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "portfolio-about-updated" && event.newValue) {
        try {
          const parsed = JSON.parse(event.newValue);
          if (parsed?.data) {
            setData(parsed.data);
          }
        } catch (err) {}
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("portfolio-about-updated" as any, handleUpdate);
      window.removeEventListener("storage", handleStorage);
      if (channel) {
        channel.close();
      }
    };
  }, []);

  // Fetch live GitHub commit count if any stat relies on it
  const username = data.githubUsername || "amitchandradas2004";
  const hasLiveCommits = data.stats?.some(
    (s) => s.useLiveGithubCommits || s.statType === "github-commits"
  );

  useEffect(() => {
    if (!hasLiveCommits) return;

    let isMounted = true;
    async function fetchCommitCount() {
      try {
        const res = await fetch(
          `https://api.github.com/search/commits?q=author:${username}`,
          { headers: { Accept: "application/vnd.github.v3+json" } }
        );
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json && typeof json.total_count === "number" && json.total_count > 0) {
            setLiveCommitCount(`${json.total_count.toLocaleString()}+`);
          }
        }
      } catch (error) {
        console.error("Failed to fetch live GitHub commit count:", error);
      }
    }

    fetchCommitCount();
    return () => { isMounted = false; };
  }, [username, hasLiveCommits]);

  // Auto-fetch project count from API when any stat uses statType "projects"
  const hasAutoProjects = data.autoCountProjects !== false &&
    data.stats?.some((s) => s.statType === "projects" || s.id === "projects");

  useEffect(() => {
    if (!hasAutoProjects) return;
    let isMounted = true;
    async function fetchProjectCount() {
      try {
        const res = await fetch("/api/projects", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          const list: any[] = Array.isArray(json)
            ? json
            : Array.isArray(json.data)
            ? json.data
            : Array.isArray(json.projects)
            ? json.projects
            : [];
          if (isMounted && list.length > 0) {
            setLiveProjectCount(`${list.length}+`);
          }
        }
      } catch (err) {
        // Silently fall back to static value
      }
    }
    fetchProjectCount();
    return () => { isMounted = false; };
  }, [hasAutoProjects]);

  const traits = data.traits?.length ? data.traits : defaultAboutData.traits;
  const stats = data.stats?.length ? data.stats : defaultAboutData.stats;
  const currentTechs = data.currentTechs?.length ? data.currentTechs : defaultAboutData.currentTechs;
  const learningFocus = data.learningFocus?.length ? data.learningFocus : defaultAboutData.learningFocus;

  return (
    <section
      id="about"
      className="scroll-mt-24 relative overflow-hidden bg-white dark:bg-[#020617] text-[#0F172A] dark:text-[#F8FAFC] py-20 transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-12 lg:gap-16">
          {/* LEFT COLUMN: Section Heading & Narrative */}
          <div className="w-full lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Kicker Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4"
            >
              <User className="w-4 h-4 text-sky-500" />
              <span>{data.badgeText || "About Me"}</span>
            </motion.div>

            {/* Main Section Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight"
            >
              {data.title}{" "}
              <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                {data.highlightedTitle}
              </span>
            </motion.h2>

            {/* Narrative Paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-normal mb-8"
            >
              {data.paragraph1 && <p className="whitespace-pre-line">{data.paragraph1}</p>}
              {data.paragraph2 && <p className="whitespace-pre-line">{data.paragraph2}</p>}
              {data.paragraph3 && <p className="whitespace-pre-line">{data.paragraph3}</p>}
            </motion.div>

            {/* Trait Highlight Cards */}
            {traits.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
              >
                {traits.map((trait) => (
                  <div
                    key={trait.id}
                    className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-white/10 flex items-start gap-3.5 text-left shadow-xs"
                  >
                    <div
                      className={`p-2 rounded-xl shrink-0 ${
                        trait.badgeBg || "bg-sky-500/10"
                      } ${trait.iconColor || "text-sky-500"}`}
                    >
                      {renderTraitIcon(trait.iconKey, "w-5 h-5")}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                        {trait.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                        {trait.description}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* RIGHT COLUMN: Liquid Glass Information Card */}
          <motion.div
            custom={isDesktop}
            variants={rightCardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full lg:w-[45%] flex flex-col justify-between"
          >
            <LiquidGlassCard
              borderRadius="28px"
              blurIntensity="xl"
              glowIntensity="lg"
              shadowIntensity="lg"
              className="w-full"
            >
              {/* Card inner padding wrapper */}
              <div className="p-6 sm:p-7 space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 pb-5 border-b border-slate-200/60 dark:border-white/8">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-sky-500 dark:text-sky-400 mb-1">
                      Developer Overview
                    </p>
                    <h3 className="text-[1.35rem] font-extrabold leading-tight text-slate-900 dark:text-white">
                      {data.cardRole || "Full Stack Developer"}
                    </h3>
                  </div>

                  {data.cardStatus && (
                    <div className="shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 dark:bg-emerald-400/10 border border-emerald-500/25 dark:border-emerald-400/20 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold tracking-wide">
                      {data.cardStatusActive !== false && (
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                      )}
                      <span>{data.cardStatus}</span>
                    </div>
                  )}
                </div>

                {/* Stats Grid */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500 mb-3">
                    Developer Statistics
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {stats.map((stat) => {
                      const effectiveType = stat.statType ||
                        (stat.useLiveGithubCommits ? "github-commits" : "manual");

                      let displayVal: string;
                      if (effectiveType === "github-commits") {
                        displayVal = liveCommitCount;
                      } else if (effectiveType === "experience") {
                        displayVal = calcExperienceValue(stat.experienceStartDate);
                      } else if (effectiveType === "projects" && liveProjectCount) {
                        displayVal = liveProjectCount;
                      } else {
                        displayVal = stat.value;
                      }
                      return (
                        <motion.div
                          key={stat.id}
                          whileHover={{ y: -4, scale: 1.03 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="relative group p-4 rounded-2xl overflow-hidden bg-white dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700/50 shadow-sm cursor-default"
                        >
                          {/* Subtle gradient wash on hover */}
                          <div
                            className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${stat.color} [mask-image:none]`}
                            style={{ opacity: 0.06 }}
                          />
                          <div className="flex items-start justify-between mb-2">
                            <span
                              className={`text-2xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent leading-none`}
                            >
                              {displayVal}
                            </span>
                            <span className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400">
                              {renderStatIcon(stat.iconKey, "w-3.5 h-3.5")}
                            </span>
                          </div>
                          <p className="text-[12px] font-semibold text-slate-800 dark:text-slate-100 leading-tight">
                            {stat.label}
                          </p>
                          <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {stat.sub}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Tech Stack */}
                {currentTechs.length > 0 && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500 mb-3">
                      Current Technologies
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {currentTechs
                        .filter((t) => t.enabled !== false)
                        .map((tech) => (
                          <motion.span
                            key={tech.id}
                            whileHover={{ scale: 1.07, y: -1 }}
                            transition={{ duration: 0.15 }}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/50 text-[11.5px] font-medium text-slate-700 dark:text-slate-200 shadow-xs cursor-default"
                          >
                            <span className={tech.color}>
                              {renderAboutTechIcon(tech.iconKey, "w-3.5 h-3.5 shrink-0")}
                            </span>
                            <span>{tech.name}</span>
                          </motion.span>
                        ))}
                    </div>
                  </div>
                )}

                {/* Learning Focus */}
                {learningFocus.length > 0 && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500 mb-3">
                      Currently Learning
                    </p>
                    <div className="space-y-2">
                      {learningFocus.map((item) => (
                        <motion.div
                          key={item.id}
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.15 }}
                          className="flex items-center gap-3 p-3 rounded-xl bg-white/80 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/40 shadow-xs"
                        >
                          <div className="shrink-0 p-2 rounded-lg bg-gradient-to-br from-sky-500/15 to-blue-500/10 dark:from-sky-400/15 dark:to-blue-400/10 text-sky-600 dark:text-sky-400">
                            {renderLearningIcon(item.iconKey, "w-4 h-4")}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[12px] font-semibold text-slate-900 dark:text-white leading-tight">
                              {item.title}
                            </p>
                            <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug truncate">
                              {item.desc}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </LiquidGlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
