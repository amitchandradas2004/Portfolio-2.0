"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, Sparkles } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme, isMounted } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  // Track active scroll section on homepage
  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = ["home", "about", "skills", "projects", "contact"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Smooth scroll handler reading --scroll-duration from globals.css
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.includes("#")) return;

    const targetId = href.split("#")[1];
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      e.preventDefault();

      const cssDurationStr = getComputedStyle(document.documentElement)
        .getPropertyValue("--scroll-duration")
        .trim();
      const duration = parseFloat(cssDurationStr) || 800;

      const targetPosition =
        targetElement.getBoundingClientRect().top + window.scrollY - 90;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      let startTime: number | null = null;

      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * easedProgress);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          window.history.pushState(null, "", `#${targetId}`);
        }
      };

      requestAnimationFrame(animation);
    }
  };

  // Close mobile menu on window resize if larger than laptop screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isDark = theme === "dark";

  const isNavItemActive = (itemHref: string) => {
    if (itemHref.includes("#")) {
      const targetId = itemHref.split("#")[1];
      return pathname === "/" && activeSection === targetId;
    }
    if (itemHref === "/") return pathname === "/";
    return pathname === itemHref || pathname.startsWith(`${itemHref}/`);
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 sm:px-6 lg:px-8 pointer-events-none"
    >
      <div className="container mx-auto pointer-events-auto">
        <nav
          aria-label="Main Navigation"
          style={{
            backgroundColor: isDark
              ? "rgba(15, 23, 42, 0.65)"
              : "rgba(255, 255, 255, 0.65)",
            borderColor: isDark
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.08)",
            color: isDark ? "#F8FAFC" : "#0F172A",
          }}
          className="relative flex items-center justify-between h-16 px-4 sm:px-6 rounded-2xl transition-colors duration-300 backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/20 border"
        >
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="group flex items-center gap-2 text-lg sm:text-xl font-bold tracking-tight transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-cyan-500/50 rounded-lg p-1"
            >
              <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 group-hover:rotate-6 transition-transform duration-300">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent group-hover:from-cyan-500 group-hover:to-blue-600 dark:group-hover:from-cyan-400 dark:group-hover:to-blue-400 transition-all duration-300">
                Amit Chandra Das
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation (Shown on lg: 1024px+) */}
          <div className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
            <ul className="flex items-center space-x-1 bg-slate-200/50 dark:bg-slate-800/50 p-1.5 rounded-full border border-slate-300/40 dark:border-slate-700/40 backdrop-blur-sm">
              {navItems.map((item) => {
                const isActive = isNavItemActive(item.href);

                return (
                  <li key={item.href} className="relative">
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`relative z-10 px-4 lg:px-5 py-2 text-sm font-medium transition-colors duration-200 rounded-full block focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${isActive
                        ? "text-slate-950 dark:text-white font-semibold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                    >
                      {item.name}
                      {isActive && (
                        <motion.div
                          layoutId="activeNavbarIndicator"
                          className="absolute inset-0 z-[-1] rounded-full bg-white dark:bg-slate-900 shadow-sm border border-black/5 dark:border-white/10"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: Theme Toggle & Mobile/Tablet Menu Trigger */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
              type="button"
              className="relative p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 active:scale-95 cursor-pointer"
            >
              {isMounted ? (
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="flex items-center justify-center"
                >
                  {isDark ? (
                    <Sun className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-slate-700" />
                  )}
                </motion.div>
              ) : (
                <div className="w-4 h-4" />
              )}
            </button>

            {/* Mobile/Tablet Hamburger Button (Shown up to lg) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-dropdown-menu"
              aria-label="Toggle navigation menu"
              type="button"
              className="lg:hidden p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 active:scale-95 cursor-pointer"
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </motion.div>
            </button>
          </div>
        </nav>

        {/* Mobile/Tablet Dropdown Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-dropdown-menu"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 8, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                backgroundColor: isDark
                  ? "rgba(15, 23, 42, 0.85)"
                  : "rgba(255, 255, 255, 0.85)",
                borderColor: isDark
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.08)",
                color: isDark ? "#F8FAFC" : "#0F172A",
              }}
              className="lg:hidden rounded-2xl p-3 border backdrop-blur-xl shadow-xl shadow-black/10 dark:shadow-black/40"
            >
              <ul className="flex flex-col space-y-1">
                {navItems.map((item) => {
                  const isActive = isNavItemActive(item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={(e) => {
                          handleNavClick(e, item.href);
                          setMobileMenuOpen(false);
                        }}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${isActive
                          ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                          }`}
                      >
                        <span>{item.name}</span>
                        {isActive && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 rounded-full bg-cyan-500"
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
