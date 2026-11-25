"use client";

import { LiquidGlassCard } from "@/components/ui/liquid-glass";
import {
  type HeroData,
  defaultHeroData,
  formatImageUrl,
} from "@/lib/hero-types";
import { Code, Download, Mail, MapPin, Send } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
  FaGithub,
  FaLinkedinIn,
  FaNodeJs,
  FaReact,
  FaXTwitter,
} from "react-icons/fa6";
import {
  SiLeetcode,
  SiMongodb,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

interface HeroProps {
  heroData?: HeroData;
  isPreview?: boolean;
}

const renderBadgeIcon = (iconKey: string, colorClass: string) => {
  const key = iconKey.toLowerCase();
  if (key.includes("react"))
    return (
      <FaReact className={`w-4 h-4 animate-spin-slow shrink-0 ${colorClass}`} />
    );
  if (key.includes("next"))
    return <SiNextdotjs className={`w-4 h-4 shrink-0 ${colorClass}`} />;
  if (key.includes("type") || key.includes("ts"))
    return <SiTypescript className={`w-3.5 h-3.5 shrink-0 ${colorClass}`} />;
  if (key.includes("node"))
    return <FaNodeJs className={`w-4 h-4 shrink-0 ${colorClass}`} />;
  if (key.includes("mongo"))
    return <SiMongodb className={`w-4 h-4 shrink-0 ${colorClass}`} />;
  if (key.includes("tailwind"))
    return <SiTailwindcss className={`w-4 h-4 shrink-0 ${colorClass}`} />;
  return <Code className={`w-3.5 h-3.5 shrink-0 ${colorClass}`} />;
};

export default function Hero({
  heroData: initialData,
  isPreview = false,
}: HeroProps) {
  const [liveData, setLiveData] = React.useState<Partial<HeroData> | null>(
    null,
  );
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [failedImageUrl, setFailedImageUrl] = React.useState<string | null>(
    null,
  );

  React.useEffect(() => {
    const handleUpdate = async (e?: Event) => {
      try {
        const customDetail = (e as CustomEvent<Partial<HeroData>>)?.detail;
        if (customDetail) {
          setLiveData(customDetail);
          return;
        }
        const res = await fetch("/api/hero", { cache: "no-store" });
        if (res.ok) {
          const freshData = (await res.json()) as Partial<HeroData>;
          setLiveData(freshData);
        }
      } catch (err) {
        console.error("Failed to re-fetch hero data:", err);
      }
    };

    window.addEventListener("portfolio-hero-updated", handleUpdate);
    return () => {
      window.removeEventListener("portfolio-hero-updated", handleUpdate);
    };
  }, []);

  const data: HeroData = {
    ...defaultHeroData,
    ...initialData,
    ...liveData,
  };

  const activeImageUrl = formatImageUrl(data.imageUrl);
  const resolvedImgSrc =
    failedImageUrl === activeImageUrl
      ? "/Amit_Image_3.png"
      : activeImageUrl || "/Amit_Image_3.png";

  const formattedDescription =
    data.description && data.description.length > 300
      ? data.description.slice(0, 300).trim() + "..."
      : data.description;

  const enabledBadges =
    data.techBadges && data.techBadges.length > 0
      ? data.techBadges.filter((b) => b.enabled !== false)
      : defaultHeroData.techBadges;

  const handleResumeDownload = () => {
    if (!data.resumeUrl || isDownloading) return;

    setIsDownloading(true);

    setTimeout(() => {
      const link = document.createElement("a");
      link.href = data.resumeUrl!;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.download = "Amit_Chandra_Das_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        setIsDownloading(false);
      }, 1200);
    }, 800);
  };

  return (
    <section
      id="home"
      className={`scroll-mt-24 relative overflow-hidden bg-slate-100 dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300 w-full ${
        isPreview
          ? "py-8 sm:py-12 lg:py-16 min-h-0"
          : "min-h-screen lg:min-h-[calc(100vh-5rem)] flex items-center justify-center pt-24 sm:pt-32 pb-16 sm:py-20 lg:py-28"
      }`}
    >
      {/* Ambient Liquid Light Orbs (static to avoid continuous blur repaint cost) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-10 left-1/4 w-87.5 sm:w-125 h-87.5 sm:h-125 bg-sky-400/35 dark:bg-cyan-500/30 blur-[90px] rounded-full" />
        <div className="absolute bottom-10 right-1/4 w-100 sm:w-137.5 h-100 sm:h-137.5 bg-purple-500/30 dark:bg-indigo-600/30 blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf818_1px,transparent_1px),linear-gradient(to_bottom,#38bdf818_1px,transparent_1px)] bg-size-[3rem_3rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-16">
          {/* LEFT SIDE (58% Width on Desktop) */}
          <div
            className={`w-full lg:w-[58%] flex flex-col items-center lg:items-start text-center lg:text-left ${
              !isPreview
                ? "min-h-[calc(100dvh-5rem)] sm:min-h-[calc(100dvh-6rem)] lg:min-h-0 justify-center py-6 sm:py-8 lg:py-0"
                : ""
            }`}
          >
            {/* 1. Greeting Text */}
            <p className="text-xs sm:text-sm md:text-xl font-semibold text-slate-500 dark:text-slate-400 tracking-widest uppercase mb-2.5 sm:mb-3">
              {data.greeting}
            </p>

            {/* 2. Developer Name */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-3 text-slate-900 dark:text-white leading-tight sm:leading-none wrap-break-word w-full">
              {data.name}
            </h1>

            {/* 3. Professional Designation */}
            <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4 sm:mb-6">
              <span className="bg-linear-to-r from-sky-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                {data.designation}
              </span>
            </h2>

            {/* 4. Short Introduction */}
            <p className="max-w-xl lg:max-w-2xl text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6 sm:mb-8 font-normal whitespace-pre-line line-clamp-5 sm:line-clamp-none">
              {formattedDescription}
            </p>
            {/* 5. Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8 w-full sm:w-auto max-w-md sm:max-w-none">
              {/* Primary Button: Download Resume */}
              {data.resumeUrl && (
                <button
                  type="button"
                  onClick={handleResumeDownload}
                  disabled={isDownloading}
                  aria-label="Download Resume"
                  className="group relative inline-flex h-12 sm:h-14 items-center justify-center gap-2.5 px-5 sm:px-8 rounded-full font-bold text-xs sm:text-base text-white bg-linear-to-r from-sky-500 via-sky-400 to-sky-600 hover:from-sky-400 hover:to-sky-500 scale-100 hover:scale-[1.03] active:scale-[0.94] shadow-lg shadow-sky-500/25 border border-sky-300/30 backdrop-blur-xl will-change-transform transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] touch-manipulation cursor-pointer overflow-hidden w-full sm:w-auto disabled:opacity-80 disabled:cursor-wait disabled:hover:scale-100 disabled:active:scale-100 shrink-0"
                >
                  <span className="pointer-events-none absolute inset-x-4 top-0 h-[1.5px] bg-linear-to-r from-transparent via-white/80 to-transparent" />

                  {isDownloading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
                      <span className="tracking-wide">
                        Downloading Resume...
                      </span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-white shrink-0 group-hover:translate-y-0.5 transition-transform duration-300" />
                      <span className="tracking-wide">Download Resume</span>
                    </>
                  )}
                </button>
              )}

              {/* Secondary Button: Contact Me */}
              <a
                href="/contact"
                aria-label="Contact Me"
                className="group relative inline-flex h-12 sm:h-14 items-center justify-center gap-2.5 px-5 sm:px-8 rounded-full font-bold text-xs sm:text-base text-slate-900 dark:text-white bg-slate-200/80 hover:bg-slate-300/90 dark:bg-slate-800/90 dark:hover:bg-slate-700/90 scale-100 hover:scale-[1.03] active:scale-[0.94] border border-slate-300/70 dark:border-slate-600/80 shadow-md backdrop-blur-xl will-change-transform transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] touch-manipulation cursor-pointer overflow-hidden w-full sm:w-auto shrink-0"
              >
                <span className="pointer-events-none absolute inset-x-4 top-0 h-[1.5px] bg-linear-to-r from-transparent via-slate-400/40 dark:via-white/30 to-transparent" />
                <Send className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 group-hover:translate-x-0.5 transition-transform duration-300" />
                <span className="tracking-wide">Contact me</span>
              </a>
            </div>

            {/* 6. Social Links with Tooltips */}
            <div className="flex items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 flex-wrap">
              {[
                {
                  name: "GitHub",
                  url: data.githubUrl,
                  ariaLabel: "GitHub Profile",
                  icon: <FaGithub className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />,
                  colorClass:
                    "text-slate-800 dark:text-slate-200 hover:text-black dark:hover:text-white hover:border-slate-800 dark:hover:border-slate-200",
                  external: true,
                },
                {
                  name: "LinkedIn",
                  url: data.linkedinUrl,
                  ariaLabel: "LinkedIn Profile",
                  icon: (
                    <FaLinkedinIn className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  ),
                  colorClass:
                    "text-[#0A66C2] hover:text-[#0A66C2] hover:border-[#0A66C2] dark:hover:border-[#0A66C2]",
                  external: true,
                },
                {
                  name: "LeetCode",
                  url: data.leetcodeUrl,
                  ariaLabel: "LeetCode Profile",
                  icon: (
                    <SiLeetcode className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  ),
                  colorClass:
                    "text-[#FFA116] hover:text-[#FFA116] hover:border-[#FFA116] dark:hover:border-[#FFA116]",
                  external: true,
                },
                {
                  name: "Twitter / X",
                  url: data.twitterUrl,
                  ariaLabel: "Twitter / X Profile",
                  icon: (
                    <FaXTwitter className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  ),
                  colorClass:
                    "text-[#1DA1F2] hover:text-[#1DA1F2] hover:border-[#1DA1F2] dark:hover:border-[#1DA1F2]",
                  external: true,
                },
                {
                  name: "Gmail",
                  url: data.email
                    ? `mailto:${data.email.replace(/[\[\]]/g, "")}`
                    : "",
                  ariaLabel: "Email Me via Gmail",
                  icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />,
                  colorClass:
                    "text-[#EA4335] hover:text-[#EA4335] hover:border-[#EA4335] dark:hover:border-[#EA4335]",
                  external: false,
                },
              ]
                .filter((item) => Boolean(item.url))
                .map((item) => (
                  <div
                    key={item.name}
                    className="relative group flex flex-col items-center"
                  >
                    <a
                      href={item.url}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      aria-label={item.ariaLabel}
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center border border-slate-300/40 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md hover:scale-110 hover:-translate-y-0.5 active:scale-95 ${item.colorClass} transition-all duration-200 shadow-xs cursor-pointer`}
                    >
                      {item.icon}
                    </a>

                    {/* Tooltip */}
                    <div
                      role="tooltip"
                      className="absolute top-full mt-2.5 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none opacity-0 scale-95 translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-200 ease-out z-30"
                    >
                      <div className="w-2 h-2 rotate-45 bg-slate-900 dark:bg-slate-800 border-t border-l border-slate-700/80 dark:border-slate-600/80 -mb-1 z-10" />
                      <div className="px-2.5 py-1 rounded-md bg-slate-900/95 dark:bg-slate-800/95 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold tracking-wide whitespace-nowrap shadow-xl border border-slate-700/80 dark:border-slate-600/80">
                        {item.name}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* RIGHT SIDE (42% Width on Desktop) */}
          <div
            className={`w-full lg:w-[42%] flex flex-col items-center justify-center relative mt-4 lg:mt-0 ${
              !isPreview
                ? "min-h-[calc(100dvh-5rem)] sm:min-h-[calc(100dvh-6rem)] lg:min-h-0 py-8 sm:py-12 lg:py-0"
                : ""
            }`}
          >
            <div className="relative group w-full max-w-65 xs:max-w-75 sm:max-w-sm md:max-w-md lg:max-w-105 xl:max-w-112.5">
              {/* Soft Background Glow Behind Image */}
              <div className="absolute -inset-4 bg-linear-to-tr from-sky-500/30 via-blue-500/20 to-purple-500/30 rounded-xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              {/* FLOATING TECH BADGES (Desktop/Tablet >= sm) */}
              {enabledBadges.map((badge, idx) => {
                const positions = [
                  "-top-4 -right-4",
                  "-top-4 -left-4",
                  "top-1/2 -right-6 -translate-y-1/2",
                  "-bottom-3 -left-4",
                  "-bottom-3 -right-4",
                ];
                const posClass = positions[idx % positions.length];

                return (
                  <div
                    key={badge.name + idx}
                    className={`absolute ${posClass} z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-200/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-300/40 dark:border-slate-700/40 shadow-lg`}
                  >
                    {renderBadgeIcon(
                      badge.iconKey || badge.name,
                      badge.colorClass || "text-sky-400",
                    )}
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {badge.name}
                    </span>
                  </div>
                );
              })}

              {/* Glassmorphism Card Wrapper around Profile Image */}
              <LiquidGlassCard
                borderRadius="16px"
                blurIntensity="xl"
                glowIntensity="lg"
                shadowIntensity="lg"
                className="w-full relative overflow-hidden group border-slate-300/40! dark:border-slate-800/60! p-3 sm:p-4"
              >
                <div className="relative w-full aspect-4/5 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={resolvedImgSrc}
                    alt={`${data.name} Full-Stack Developer Profile Portrait`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 380px"
                    priority
                    unoptimized={Boolean(
                      resolvedImgSrc.startsWith("data:") ||
                      resolvedImgSrc.startsWith("http"),
                    )}
                    onError={() => setFailedImageUrl(activeImageUrl)}
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 select-none"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Glassmorphism Availability & Location Card Overlay */}
                  {(data.availabilityStatus || data.locationText) && (
                    <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 z-30 p-2.5 sm:p-3 rounded-xl bg-slate-950/75 dark:bg-slate-900/85 backdrop-blur-xl border border-white/20 shadow-2xl space-y-1">
                      {data.availabilityStatus && (
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-2.5 w-2.5 shrink-0">
                            {data.isAvailable !== false && (
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            )}
                            <span
                              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                                data.isAvailable !== false
                                  ? "bg-emerald-500"
                                  : "bg-slate-400"
                              }`}
                            />
                          </span>
                          <span className="text-xs font-bold text-white tracking-wide truncate">
                            {data.availabilityStatus}
                          </span>
                        </div>
                      )}

                      {data.locationText && (
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300">
                          <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                          <span className="truncate">{data.locationText}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </LiquidGlassCard>
            </div>

            {/* FLOATING TECH BADGES FOR MOBILE (< sm) */}
            {enabledBadges.length > 0 && (
              <div className="flex sm:hidden flex-wrap items-center justify-center gap-2 mt-4 z-20 w-full px-2">
                {enabledBadges.map((badge, idx) => (
                  <div
                    key={badge.name + idx}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-300/40 dark:border-slate-700/40 shadow-md text-xs font-semibold text-slate-800 dark:text-slate-200"
                  >
                    {renderBadgeIcon(
                      badge.iconKey || badge.name,
                      badge.colorClass || "text-sky-400",
                    )}
                    <span>{badge.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
