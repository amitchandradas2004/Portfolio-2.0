"use client";

import React, { useEffect, useState, useMemo } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ExternalLink,
  GitCommit,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { useTheme } from "./ThemeProvider";

export interface ContributionDay {
  date: string;
  count: number;
  commits?: number;
}

export interface GithubContributionProps {
  username?: string;
}

function formatDateString(dateStr: string): string {
  try {
    const [year, month, day] = dateStr.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function GithubContribution({
  username = "amitchandradas2004",
}: GithubContributionProps) {
  const { theme, isMounted } = useTheme();
  const isDark = theme === "dark";

  const [daysData, setDaysData] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  // Hover state for interactive custom glassmorphism tooltip
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
    commits?: number;
    x: number;
    y: number;
  } | null>(null);

  // Tailored color themes for light & dark mode to match portfolio design system
  const calendarTheme = {
    light: ["#F1F5F9", "#BAE6FD", "#38BDF8", "#0284C7", "#0369A1"],
    dark: ["#0F172A", "#0C4A6E", "#0284C7", "#38BDF8", "#7DD3FC"],
  };

  // Map for fast O(1) date lookup
  const contributionMap = useMemo(() => {
    const map = new Map<string, ContributionDay>();
    daysData.forEach((day) => {
      map.set(day.date, day);
    });
    return map;
  }, [daysData]);

  // Fetch real GitHub contribution data from Next.js API route /api/github-stats
  const fetchContributionData = async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const res = await fetch(`/api/github-stats?username=${username}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.days) {
          setDaysData(data.days);
          setTotalContributions(data.totalContributions || 0);
          setIsLoading(false);
          return;
        }
      }
      throw new Error("Failed to fetch contribution data");
    } catch {
      setHasError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContributionData();
  }, [username]);

  // Mouse hover handlers for contribution blocks
  const handleMouseEnter = (
    event: React.MouseEvent,
    activity: { date: string; count: number }
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const dayData = contributionMap.get(activity.date) || {
      date: activity.date,
      count: activity.count,
      commits: activity.count > 0 ? activity.count : 0,
    };

    setHoveredDay({
      date: dayData.date,
      count: dayData.count,
      commits: dayData.commits ?? (dayData.count > 0 ? dayData.count : 0),
      x: rect.left + rect.width / 2,
      y: rect.top - 12,
    });
  };

  const handleMouseLeave = () => {
    setHoveredDay(null);
  };

  return (
    <section
      id="github-contributions"
      className="scroll-mt-24 relative overflow-hidden bg-white dark:bg-[#020617] text-[#0F172A] dark:text-[#F8FAFC] py-20 sm:py-24 transition-colors duration-300"
    >
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-sky-500/10 via-blue-500/5 to-purple-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-[#38BDF8] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4"
          >
            <FaGithub className="w-4 h-4 text-sky-500 dark:text-[#38BDF8]" />
            <span>Coding Activity</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight"
          >
            GitHub{" "}
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Contributions
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed"
          >
            My coding activity and continuous learning journey.
          </motion.p>
        </div>

        {/* GLASSMORPHISM GRAPH CONTAINER CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4 }}
          className="relative container mx-auto rounded-3xl p-6 sm:p-8 md:p-10 backdrop-blur-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl shadow-slate-900/5 dark:shadow-black/40 transition-all duration-300"
        >
          {/* Card Top Info Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-200/70 dark:bg-slate-800/80 border border-slate-300/60 dark:border-slate-700/60">
                <GitCommit className="w-5 h-5 text-sky-500" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  @{username}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {totalContributions > 0
                    ? `${totalContributions.toLocaleString()} total contributions in the last year`
                    : "Public commit history & pull requests"}
                </p>
              </div>
            </div>

            {/* Link to GitHub Profile */}
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-200/60 dark:bg-slate-800/80 hover:bg-slate-300/70 dark:hover:bg-slate-700 border border-slate-300/60 dark:border-slate-700/60 transition-all cursor-pointer group"
            >
              <span>View GitHub Profile</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* CALENDAR GRAPH / LOADING / ERROR STATES */}
          <div className="w-full overflow-x-auto flex justify-center items-center py-4 min-h-[170px]">
            {isLoading ? (
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-500 dark:text-slate-400 py-8">
                <Loader2 className="w-5 h-5 animate-spin text-sky-500" />
                <span>Loading GitHub activity...</span>
              </div>
            ) : hasError ? (
              <div className="flex flex-col items-center gap-3 text-sm font-semibold text-rose-500 py-6">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  <span>Unable to load GitHub activity</span>
                </div>
                <button
                  onClick={fetchContributionData}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retry</span>
                </button>
              </div>
            ) : isMounted ? (
              <GitHubCalendar
                username={username}
                blockSize={13}
                blockMargin={4}
                fontSize={14}
                colorScheme={isDark ? "dark" : "light"}
                theme={calendarTheme}
                renderBlock={(block, activity) =>
                  React.cloneElement(block, {
                    onMouseEnter: (e: React.MouseEvent) =>
                      handleMouseEnter(e, activity),
                    onMouseLeave: handleMouseLeave,
                    className: `${block.props.className || ""
                      } transition-transform duration-150 cursor-pointer`,
                  })
                }
                style={{
                  color: isDark ? "#94A3B8" : "#475569",
                  fontFamily: "inherit",
                }}
              />
            ) : null}
          </div>
        </motion.div>
      </div>

      {/* CUSTOM GLASSMORPHISM INTERACTIVE TOOLTIP */}
      <AnimatePresence>
        {hoveredDay && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 5 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{
              position: "fixed",
              left: `${hoveredDay.x}px`,
              top: `${hoveredDay.y}px`,
              transform: "translate(-50%, -100%)",
            }}
            className="z-50 pointer-events-none p-3.5 rounded-2xl backdrop-blur-xl bg-slate-900/95 dark:bg-slate-900/95 text-white border border-slate-700/80 shadow-2xl shadow-sky-500/20 min-w-[170px]"
          >
            <p className="text-xs font-bold text-slate-300 border-b border-slate-700/60 pb-1.5 mb-2">
              {formatDateString(hoveredDay.date)}
            </p>
            <div className="space-y-1.5 text-xs font-semibold">
              <p className="flex items-center gap-1.5 text-amber-400">
                <span>🔥</span>
                <span>{hoveredDay.count} Contributions</span>
              </p>
              <p className="flex items-center gap-1.5 text-sky-400">
                <span>💻</span>
                <span>{hoveredDay.commits ?? hoveredDay.count} Commits</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
