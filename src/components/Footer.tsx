"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowUp } from "lucide-react";
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
    icon: <FaGithub className="w-5 h-5 text-slate-800 dark:text-slate-200" />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/amitchandradas2004",
    icon: <FaLinkedin className="w-5 h-5 text-[#0A66C2]" />,
  },
  {
    name: "LeetCode",
    href: "https://leetcode.com/u/amitchandradas2004",
    icon: <SiLeetcode className="w-5 h-5 text-[#FFA116]" />,
  },
  {
    name: "Twitter / X",
    href: "https://x.com/amitchandra2004",
    icon: <FaXTwitter className="w-5 h-5 text-[#1DA1F2]" />,
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-white dark:bg-[#020617] text-[#0F172A] dark:text-[#F8FAFC] pt-12 pb-8 border-t border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-tr from-sky-500/10 via-blue-500/5 to-purple-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Glassmorphism Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl p-8 sm:p-10 md:p-12 backdrop-blur-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl shadow-slate-900/5 dark:shadow-black/40"
        >
          {/* Top Section: Logo, Nav, Socials */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-8 border-b border-slate-200/80 dark:border-slate-800/80">
            {/* Left: Brand / Logo & Description */}
            <div className="text-center lg:text-left max-w-md">
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 text-xl font-bold tracking-tight mb-3 group"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 group-hover:rotate-6 transition-transform duration-300">
                  <Sparkles className="w-4.5 h-4.5" />
                </div>
                <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent font-extrabold text-2xl">
                  Amit Chandra Das
                </span>
              </Link>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
                Full Stack Developer building modern, scalable, and user-friendly web applications.
              </p>
            </div>

            {/* Middle: Navigation Links */}
            <nav aria-label="Footer Navigation">
              <ul className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
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

            {/* Right: Social Media Icons & Back-to-top */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2.5">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                    className="p-3 rounded-xl bg-slate-200/70 dark:bg-slate-800/80 hover:bg-slate-300/80 dark:hover:bg-slate-700 border border-slate-300/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-200 shadow-sm transition-all duration-200 cursor-pointer"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>

              {/* Scroll To Top Button */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Scroll to top"
                type="button"
                className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 transition-all duration-200 cursor-pointer"
              >
                <ArrowUp className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Bottom Section: Copyright */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 text-center sm:text-left">
            <p>© 2026 Amit Chandra Das. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Crafted with <span className="text-red-500">♥</span> using Next.js & Tailwind CSS
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
