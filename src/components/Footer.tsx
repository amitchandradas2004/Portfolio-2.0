"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, ArrowUp, Send } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/#skills" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/amitchandradas2004",
    icon: <FaGithub className="w-4 h-4 shrink-0 text-slate-800 dark:text-slate-200" />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/amitchandradas2004",
    icon: <FaLinkedin className="w-4 h-4 shrink-0 text-[#0A66C2]" />,
  },
  {
    name: "LeetCode",
    href: "https://leetcode.com/u/amitchandradas2004",
    icon: <SiLeetcode className="w-4 h-4 shrink-0 text-[#FFA116]" />,
  },
  {
    name: "Twitter / X",
    href: "https://x.com/amitchandra2004",
    icon: <FaXTwitter className="w-4 h-4 shrink-0 text-[#1DA1F2]" />,
  },
];

export default function Footer() {
  const pathname = usePathname();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (pathname?.startsWith("/dashboard")) return null;

  return (
    <footer className="relative overflow-hidden bg-slate-100 dark:bg-[#020617] text-slate-900 dark:text-slate-100 pt-16 pb-10 transition-colors duration-300 w-full">
      {/* Ambient Liquid Light Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[300px] bg-sky-400/25 dark:bg-cyan-500/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-500/20 dark:bg-indigo-600/20 blur-[110px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf818_1px,transparent_1px),linear-gradient(to_bottom,#38bdf818_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* SINGLE OUTER GLASS CARD CONTAINER WITH ROUNDED-XL BORDER */}
      <div className="container mx-auto px-4 md:px-4 xl:px-0 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full rounded-xl border border-slate-300/40 dark:border-slate-800/60 backdrop-blur-xl bg-slate-50/70 dark:bg-slate-900/50 shadow-2xl shadow-slate-900/5 dark:shadow-black/40 overflow-hidden"
        >
          <div className="p-6 sm:p-8 md:p-10 relative z-10">
            {/* Top Section: Brand, Navigation & Contact Action */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-8 border-b border-slate-300/40 dark:border-slate-800/60">
              {/* Left: Brand / Logo & Description */}
              <div className="text-center lg:text-left max-w-md">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2.5 text-xl font-bold tracking-tight mb-2 group"
                >
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-r from-sky-500 via-sky-400 to-sky-600 text-white shadow-md shadow-sky-500/25 group-hover:rotate-6 transition-transform duration-300 border border-sky-300/30">
                    <Sparkles className="w-4 h-4 shrink-0" />
                  </div>
                  <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent font-black text-2xl">
                    Amit Chandra Das
                  </span>
                </Link>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed mt-1">
                  Full Stack Software Engineer building modern, scalable, and responsive web applications.
                </p>
              </div>

              {/* Middle: Navigation Links */}
              <nav aria-label="Footer Navigation">
                <ul className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="relative text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors duration-200 py-1"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Right: Social Media Icons & Scroll To Top */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.name}
                      className="p-2.5 rounded-xl bg-slate-200/50 dark:bg-slate-800/50 hover:bg-slate-300/60 dark:hover:bg-slate-700/60 border border-slate-300/40 dark:border-slate-700/40 backdrop-blur-md shadow-xs transition-all duration-200 cursor-pointer"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>

                {/* Scroll To Top Button */}
                <motion.button
                  onClick={scrollToTop}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Scroll to top"
                  type="button"
                  className="p-2.5 rounded-xl bg-gradient-to-r from-sky-500 via-sky-400 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white shadow-md shadow-sky-500/25 border border-sky-300/30 transition-all duration-200 cursor-pointer"
                >
                  <ArrowUp className="w-4 h-4 shrink-0" />
                </motion.button>
              </div>
            </div>

            {/* Bottom Section: Copyright & Contact Page Link */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 text-center sm:text-left">
              <p>© 2026 Amit Chandra Das. All rights reserved.</p>

              <div className="flex items-center gap-3">
                <p className="flex items-center gap-1">
                  Crafted with <span className="text-rose-500">♥</span> using Next.js & Tailwind CSS
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 border border-sky-300/30 shadow-xs backdrop-blur-md transition-all active:scale-[0.98]"
                >
                  <Send className="w-3 h-3 shrink-0" />
                  <span>Contact</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}