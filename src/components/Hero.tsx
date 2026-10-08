"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download, Mail, Code, Terminal, Database, Cpu } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter, FaReact, FaNodeJs } from "react-icons/fa6";
import { SiNextdotjs, SiTypescript, SiMongodb, SiLeetcode, SiTailwindcss } from "react-icons/si";
import { HeroData, defaultHeroData, formatImageUrl } from "@/lib/hero-types";

interface HeroProps {
  heroData?: HeroData;
}

const renderBadgeIcon = (iconKey: string, colorClass: string) => {
  const key = iconKey.toLowerCase();
  if (key.includes("react")) return <FaReact className={`w-4 h-4 animate-spin-slow ${colorClass}`} />;
  if (key.includes("next")) return <SiNextdotjs className={`w-4 h-4 ${colorClass}`} />;
  if (key.includes("type") || key.includes("ts")) return <SiTypescript className={`w-3.5 h-3.5 ${colorClass}`} />;
  if (key.includes("node")) return <FaNodeJs className={`w-4 h-4 ${colorClass}`} />;
  if (key.includes("mongo")) return <SiMongodb className={`w-4 h-4 ${colorClass}`} />;
  if (key.includes("tailwind")) return <SiTailwindcss className={`w-4 h-4 ${colorClass}`} />;
  return <Code className={`w-3.5 h-3.5 ${colorClass}`} />;
};

export default function Hero({ heroData: initialData }: HeroProps) {
  const data = {
    ...defaultHeroData,
    ...initialData,
  };

  const activeImageUrl = formatImageUrl(data.imageUrl);
  const [imgSrc, setImgSrc] = React.useState(activeImageUrl);

  const formattedDescription =
    data.description && data.description.length > 300
      ? data.description.slice(0, 300).trim() + "..."
      : data.description;

  React.useEffect(() => {
    setImgSrc(activeImageUrl);
  }, [activeImageUrl]);

  const enabledBadges = (data.techBadges && data.techBadges.length > 0)
    ? data.techBadges.filter((b) => b.enabled !== false)
    : defaultHeroData.techBadges;

  return (
    <section
      id="home"
      className="scroll-mt-24 relative overflow-hidden bg-white dark:bg-[#020617] text-[#0F172A] dark:text-[#F8FAFC] min-h-[calc(100vh-5rem)] flex items-center justify-center py-25 lg:py-28 transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

          {/* LEFT SIDE (58% Width on Desktop) */}
          <div className="w-full lg:w-[58%] flex flex-col items-center lg:items-start text-center lg:text-left">

            {/* 1. Greeting Text */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs sm:text-sm md:text-xl font-semibold text-slate-500 dark:text-slate-400 tracking-widest uppercase mb-3"
            >
              {data.greeting}
            </motion.p>

            {/* 2. Developer Name - Strongest Visual Element */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-3 text-slate-900 dark:text-white leading-none"
            >
              {data.name}
            </motion.h1>

            {/* 3. Professional Designation - Gradient Text */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-6"
            >
              <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                {data.designation}
              </span>
            </motion.h2>

            {/* 4. Short Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-xl lg:max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 font-normal whitespace-pre-line line-clamp-5 sm:line-clamp-none"
            >
              {formattedDescription}
            </motion.p>

            {/* 5. Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8 w-full sm:w-auto"
            >
              {/* Primary Button: Download Resume */}
              {data.resumeUrl && (
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Link
                    href={data.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 cursor-pointer"
                    aria-label="Download Resume"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Resume</span>
                  </Link>
                </motion.div>
              )}

              {/* Secondary Button: Contact Me */}
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href="#contact"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold border border-slate-300 dark:border-slate-700/80 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md text-[#0F172A] dark:text-[#F8FAFC] hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 shadow-xs cursor-pointer"
                  aria-label="Contact Me"
                >
                  <span>Contact Me</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* 6. Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-3.5 flex-wrap"
            >
              {data.githubUrl && (
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={data.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="w-11 h-11 rounded-full flex items-center justify-center border border-slate-300/70 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-800 dark:text-slate-200 hover:text-black dark:hover:text-white hover:border-slate-800 dark:hover:border-slate-200 transition-all duration-200 shadow-xs"
                >
                  <FaGithub className="w-5 h-5" />
                </motion.a>
              )}

              {data.linkedinUrl && (
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={data.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="w-11 h-11 rounded-full flex items-center justify-center border border-slate-300/70 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-[#0A66C2] hover:text-[#0A66C2] hover:border-[#0A66C2] dark:hover:border-[#0A66C2] transition-all duration-200 shadow-xs"
                >
                  <FaLinkedinIn className="w-5 h-5" />
                </motion.a>
              )}

              {data.leetcodeUrl && (
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={data.leetcodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LeetCode Profile"
                  className="w-11 h-11 rounded-full flex items-center justify-center border border-slate-300/70 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-[#FFA116] hover:text-[#FFA116] hover:border-[#FFA116] dark:hover:border-[#FFA116] transition-all duration-200 shadow-xs"
                >
                  <SiLeetcode className="w-5 h-5" />
                </motion.a>
              )}

              {data.twitterUrl && (
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={data.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter) Profile"
                  className="w-11 h-11 rounded-full flex items-center justify-center border border-slate-300/70 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-[#1DA1F2] hover:text-[#1DA1F2] hover:border-[#1DA1F2] dark:hover:border-[#1DA1F2] transition-all duration-200 shadow-xs"
                >
                  <FaXTwitter className="w-5 h-5" />
                </motion.a>
              )}

              {data.email && (
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={`mailto:${data.email.replace(/[\[\]]/g, '')}`}
                  aria-label="Email Me"
                  className="w-11 h-11 rounded-full flex items-center justify-center border border-slate-300/70 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-[#EA4335] hover:text-[#EA4335] hover:border-[#EA4335] dark:hover:border-[#EA4335] transition-all duration-200 shadow-xs"
                >
                  <Mail className="w-5 h-5" />
                </motion.a>
              )}
            </motion.div>

          </div>

          {/* RIGHT SIDE (42% Width on Desktop - Professional Image & Tech Badges) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full lg:w-[42%] flex items-center justify-center relative"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative group w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[420px] xl:max-w-[450px]"
            >
              {/* Soft Background Glow Behind Image */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-sky-500/30 via-blue-500/20 to-purple-500/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              {/* FLOATING TECH BADGES AROUND PROFILE IMAGE */}
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
                  <motion.div
                    key={badge.name + idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className={`absolute ${posClass} z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-lg`}
                  >
                    {renderBadgeIcon(badge.iconKey || badge.name, badge.colorClass || "text-sky-400")}
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {badge.name}
                    </span>
                  </motion.div>
                );
              })}

              {/* Glassmorphism Card Wrapper around Profile Image */}
              <div className="relative p-3 sm:p-4 rounded-3xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 shadow-2xl shadow-sky-500/20 overflow-hidden">
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={imgSrc || "/Amit_Image_3.png"}
                    alt={`${data.name} - Full-Stack Developer Profile Portrait`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 380px"
                    priority
                    unoptimized={Boolean(imgSrc?.startsWith("data:") || imgSrc?.startsWith("http"))}
                    onError={() => setImgSrc("/Amit_Image_3.png")}
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
                  />
                  {/* Glass Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
